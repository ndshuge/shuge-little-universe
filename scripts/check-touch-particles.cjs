// Mobile interaction regression for the two reported iPhone bugs.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const path=require('node:path'),fs=require('node:fs'),assert=require('node:assert/strict');
const base=process.env.BASE_URL||'http://127.0.0.1:5206/';
const out=path.resolve(__dirname,'../evidence');
const reports=[];
async function test(name,fn){try{const data=await fn();reports.push({name,pass:true,data});}catch(e){reports.push({name,pass:false,error:String(e.stack||e).slice(0,450)});}}
async function touch(cdp,start,end,steps=6){
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:start.x,y:start.y,id:1}]});
 for(let i=1;i<=steps;i++){
  const p=i/steps;
  await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:start.x+(end.x-start.x)*p,y:start.y+(end.y-start.y)*p,id:1}]});
  await new Promise(r=>setTimeout(r,32));
 }
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
}
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.EDGE_PATH||'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',args:['--enable-webgl']});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},screen:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:3});
  const page=await context.newPage();const cdp=await context.newCDPSession(page);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base,{waitUntil:'domcontentloaded',timeout:25000});
  await page.waitForFunction(()=>document.querySelector('#scene')?.dataset.ready==='true',null,{timeout:22000});
  await test('star touch-action disables vertical browser pan',async()=>{
    const value=await page.locator('#scene').evaluate(e=>getComputedStyle(e).touchAction);
    assert.equal(value,'none');return value;
  });
  await test('one-finger diagonal planet drag rotates without page scrolling',async()=>{
    await page.evaluate(()=>window.scrollTo(0,0));
    const before=await page.evaluate(()=>({scrollY:window.scrollY,rot:parseFloat(document.querySelector('#scene').dataset.rotation)}));
    const r=await page.locator('#scene').boundingBox();
    await touch(cdp,{x:r.x+r.width*.59,y:r.y+r.height*.62},{x:r.x+r.width*.77,y:r.y+r.height*.33});
    await page.waitForTimeout(650);
    const after=await page.evaluate(()=>({scrollY:window.scrollY,rot:parseFloat(document.querySelector('#scene').dataset.rotation)}));
    assert(Math.abs(after.rot-before.rot)>.1,JSON.stringify({before,after}));
    assert(Math.abs(after.scrollY-before.scrollY)<=1,JSON.stringify({before,after}));
    return {before,after};
  });
  await page.goto(base+'#lab',{waitUntil:'domcontentloaded'});
  await page.waitForSelector('#page-lab:not([hidden])');
  await page.locator('[data-lab="particles"]').click();
  await test('restored dense 4200-particle renderer',async()=>{
    await page.waitForFunction(()=>document.querySelector('#particle-canvas')?.dataset.renderedCount==='4200');
    const el=page.locator('#particle-canvas');
    return await el.evaluate(e=>({count:e.dataset.renderedCount,width:e.width,height:e.height}));
  });
  await test('mouse, knot and ring render 4200 points each',async()=>{
    const v=[];
    for(const shape of ['ring','knot','mouse']){
      await page.locator('button[data-shape="'+shape+'"]').click();
      await page.waitForFunction(s=>document.querySelector('#particle-canvas')?.dataset.shape===s&&document.querySelector('#particle-canvas')?.dataset.renderedCount==='4200',shape);
      await page.waitForTimeout(450);
      await page.locator('#particle-canvas').screenshot({path:path.join(out,'repair-'+shape+'-mobile.png'),animations:'disabled'});
      v.push({shape,points:await page.locator('#particle-canvas').getAttribute('data-rendered-count')});
    }
    return v;
  });
  await test('touch rotates particle sculpture without scrolling its panel',async()=>{
    await page.locator('#particle-pause').click();
    const rect=await page.locator('#particle-canvas').boundingBox();
    assert(rect&&rect.width>100);
    const before=await page.evaluate(()=>({panel:document.querySelector('#panel-content').scrollTop,rot:+document.querySelector('#particle-canvas').dataset.rotationY}));
    await touch(cdp,{x:rect.x+rect.width*.43,y:rect.y+rect.height*.55},{x:rect.x+rect.width*.65,y:rect.y+rect.height*.39});
    await page.waitForTimeout(160);
    const after=await page.evaluate(()=>({panel:document.querySelector('#panel-content').scrollTop,rot:+document.querySelector('#particle-canvas').dataset.rotationY}));
    assert(Math.abs(after.rot-before.rot)>.15,JSON.stringify({before,after}));
    assert(Math.abs(after.panel-before.panel)<=1,JSON.stringify({before,after}));
    return {before,after};
  });
  await test('normal content panel still scrolls by touch',async()=>{
    await page.goto(base+'#contact',{waitUntil:'domcontentloaded'});
    await page.waitForSelector('#page-contact:not([hidden])');
    const panel=page.locator('#panel-content');
    await panel.evaluate(e=>e.scrollTop=0);
    const rect=await panel.boundingBox();
    await touch(cdp,{x:rect.x+rect.width*.55,y:rect.y+rect.height*.78},{x:rect.x+rect.width*.55,y:rect.y+rect.height*.3});
    await page.waitForTimeout(400);
    const y=await panel.evaluate(e=>e.scrollTop);
    assert(y>25,'panel not scrollable: '+y);
    return y;
  });
  await test('no Javascript exceptions',()=>{assert.equal(errors.length,0,errors.join(';'));return 'no exceptions';});
  await context.close();
 } finally {await browser.close();}
 const summary={date:new Date().toISOString(),target:base,scope:'Emulated mobile touchscreen in Windows Edge / real pointer input, not hardware Safari',passed:reports.filter(x=>x.pass).length,failed:reports.filter(x=>!x.pass).length,reports};
 fs.writeFileSync(path.join(out,'mobile-regression.json'),JSON.stringify(summary,null,2));
 console.log(JSON.stringify(summary,null,2));if(summary.failed)process.exitCode=1;
})().catch(e=>{console.error('FATAL '+(e.stack||e));process.exitCode=1;});
