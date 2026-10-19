// Real CDP touch-event regression for free 360-degree, low-latency planet control.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const base=process.env.BASE_URL||'http://127.0.0.1:5206/';
const results=[];
async function check(name,fn){try{results.push({name,pass:true,details:await fn()});}catch(e){results.push({name,pass:false,error:String(e.message||e)});}}
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:process.env.EDGE_PATH||'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',args:['--enable-webgl']});
  try{
    const context=await browser.newContext({viewport:{width:390,height:844},screen:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:3});
    const page=await context.newPage(),cdp=await context.newCDPSession(page);const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base,{waitUntil:'domcontentloaded',timeout:25000});
    await page.waitForFunction(()=>document.querySelector('#scene')?.dataset.ready==='true',null,{timeout:22000});
    const read=()=>page.locator('#scene').evaluate(el=>({yaw:+el.dataset.rotation,pitch:+el.dataset.tilt,scroll:window.scrollY}));
    const sleep=ms=>new Promise(r=>setTimeout(r,ms));
    const reset=async()=>{await page.locator('#reset-view').click();await page.evaluate(()=>window.scrollTo(0,0));await sleep(700)};
    const touch=async ({dx=0,dy=0,steps=6,wait=35,fx=.59,fy=.62}={})=>{
      const rect=await page.locator('#scene').boundingBox(),x=rect.x+rect.width*fx,y=rect.y+rect.height*fy;
      await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:4}]});
      for(let i=1;i<=steps;i++){
        await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+dx*i/steps,y:y+dy*i/steps,id:4}]});
        await sleep(wait);
      }
      const during=await read();
      await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
      await sleep(50);
      return {during,after:await read()};
    };
    for(const dir of [{name:'left',dx:-100,dy:0,axis:'yaw'},{name:'right',dx:100,dy:0,axis:'yaw'},
      {name:'up',dx:0,dy:-100,axis:'pitch'},{name:'down',dx:0,dy:100,axis:'pitch'},
      {name:'diagonal',dx:85,dy:-85,axis:'both'}]){
      await check('direction '+dir.name+' stays responsive',async()=>{
        await reset();const before=await read(),out=await touch({dx:dir.dx,dy:dir.dy});
        const dyaw=out.during.yaw-before.yaw,dpitch=out.during.pitch-before.pitch;
        if(dir.axis==='yaw')assert(Math.sign(dyaw)===Math.sign(dir.dx)&&Math.abs(dyaw)>.95,'yaw '+dyaw);
        if(dir.axis==='pitch')assert(Math.sign(dpitch)===Math.sign(dir.dy)&&Math.abs(dpitch)>.95,'pitch '+dpitch);
        if(dir.axis==='both')assert(dyaw>.85&&dpitch<-.85,'diagonal '+dyaw+' '+dpitch);
        assert.equal(out.after.scroll,before.scroll,'touch must not scroll document');
        return {dyaw:+dyaw.toFixed(3),dpitch:+dpitch.toFixed(3),scroll:out.after.scroll};
      });
    }
    await check('middle of canvas accepts touch instead of leaking scroll',async()=>{
      await reset();const before=await read(),out=await touch({dx:70,dy:55,fx:.47,fy:.5});
      const dyaw=out.during.yaw-before.yaw,dpitch=out.during.pitch-before.pitch;
      assert(dyaw>.70&&dpitch>.55,'touch blocked '+JSON.stringify({before,out}));
      assert.equal(out.after.scroll,before.scroll);
      return {dyaw:+dyaw.toFixed(3),dpitch:+dpitch.toFixed(3)};
    });
    await check('quick 25px touch immediately updates planet, not delayed ease',async()=>{
      await reset();const before=await read();
      const rect=await page.locator('#scene').boundingBox(),x=rect.x+rect.width*.59,y=rect.y+rect.height*.62;
      await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:5}]});
      await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+25,y:y+25,id:5}]});
      await sleep(75);const during=await read();await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
      const yaw=during.yaw-before.yaw,pitch=during.pitch-before.pitch;
      assert(yaw>.20&&pitch>.20,'unexpected latency '+JSON.stringify({before,during}));
      return {yaw,pitch};
    });
    await check('vertical swipes can rotate well beyond previous tilt clamp',async()=>{
      await reset();const before=await read();
      for(let k=0;k<3;k++)await touch({dy:125,steps:8,wait:22});
      const after=await read();
      assert(after.pitch-before.pitch>3,'blocked rotation '+JSON.stringify({before,after}));
      assert.equal(after.scroll,before.scroll);return {deltaPitch:+(after.pitch-before.pitch).toFixed(3)};
    });
    await check('normal content panel still accepts touch scroll',async()=>{
      await page.goto(base+'#contact',{waitUntil:'domcontentloaded'});
      await page.waitForSelector('#page-contact:not([hidden])');
      await page.waitForFunction(()=>document.querySelector('#panel').getBoundingClientRect().left<10);
      const panel=page.locator('#panel-content');await panel.evaluate(e=>e.scrollTop=0);
      const rect=await panel.boundingBox(),x=rect.x+rect.width*.55,y=rect.y+rect.height*.78;
      await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:6}]});
      for(let i=1;i<=6;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:y-i*40,id:6}]});await sleep(28);}
      await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
      await sleep(500);const pos=await panel.evaluate(e=>e.scrollTop);
      assert(pos>20,'panel scroll blocked '+pos);return pos;
    });
    await check('hotspot remains tappable when not dragging',async()=>{
      await page.goto(base,{waitUntil:'domcontentloaded'});
      await page.waitForFunction(()=>document.querySelector('#scene')?.dataset.ready==='true');
      await page.waitForSelector('[data-hotspot="work"].visible',{timeout:12000});
      await page.locator('[data-hotspot="work"]').tap();
      await page.waitForFunction(()=>location.hash==='#work',null,{timeout:4000});
      return await page.evaluate(()=>location.hash);
    });
    await check('no page JS error',async()=>{assert.equal(errors.length,0,errors.join(' | '));return '0 errors';});
    await context.close();
  }finally{await browser.close();}
  const report={time:new Date().toISOString(),url:base,method:'real CDP dispatchTouchEvent in emulated-mobile Edge; not physical iPhone Safari',passed:results.filter(x=>x.pass).length,failed:results.filter(x=>!x.pass).length,results};
  fs.writeFileSync(path.resolve(__dirname,'../evidence/drag-feel-qa.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report));if(report.failed)process.exitCode=1;
})().catch(e=>{console.error(String(e.stack||e));process.exitCode=1;});
