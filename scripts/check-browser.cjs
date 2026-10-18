/* Optional real-browser QA using an existing local Playwright installation.
   PLAYWRIGHT_MODULE_PATH: absolute folder path to Playwright. EDGE_PATH: local msedge.exe. */
const path = require('node:path');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const target = process.env.BASE_URL || 'https://ndshuge.github.io/shuge-little-universe/';
const edge = process.env.EDGE_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const evidence = path.join(__dirname,'../evidence');
const results = [];
async function check(name, fn) { try {await fn();results.push({name,pass:true});} catch(e) {results.push({name,pass:false,error:String(e.message).slice(0,260)});}}
(async () => {
  fs.mkdirSync(evidence,{recursive:true});
  const errors=[];
  const browser=await chromium.launch({headless:true,executablePath:edge, args:['--enable-webgl']});
  try {
    for(const width of [1440,390]) {
      const context=await browser.newContext({viewport:{width,height:width===1440?900:844}, deviceScaleFactor:1, reducedMotion:'no-preference'});
      const page=await context.newPage();
      page.on('pageerror',error=>errors.push('pageerror: '+error.message));
      page.on('console',m=>{if(m.type()==='error')errors.push('console: '+m.text());});
      const resp=await page.goto(target,{waitUntil:'domcontentloaded',timeout:25000});
      await check(width+' HTTP 200',()=>assert.equal(resp.status(),200));
      await check(width+' scene initializing',async()=>{
        await page.waitForFunction(()=>['true','fallback'].includes(document.querySelector('#scene')?.dataset.ready),null,{timeout:25000});
        assert.equal(await page.locator('#scene').getAttribute('data-ready'),'true','WebGL fallback triggered');
      });
      await check(width+' canvas drawn',async()=>{
        const a=await page.locator('#scene').evaluate(el=>({
          ready:el.dataset.ready,
          calls:Number(el.dataset.drawCalls||0),
          width:el.querySelector('canvas')?.width||0,
          height:el.querySelector('canvas')?.height||0
        }));
        assert.equal(a.ready,'true'); assert(a.calls>0); assert(a.width>0 && a.height>0);
        console.log('WEBGL '+width,JSON.stringify(a));
      });
      await page.screenshot({path:path.join(evidence,width===1440?'live-ready-desktop.png':'live-ready-mobile.png'), animations:'disabled'});
      for(const hash of ['#contact','#work','#lab','#campus','#life']) {
        await check(width+' navigation '+hash, async()=>{
          await page.goto(target+hash,{waitUntil:'domcontentloaded'});
          await page.waitForFunction(h=>{const el=document.querySelector('#page-'+h.slice(1));return el && !el.hidden && el.getBoundingClientRect().height>0},hash,{timeout:10000});
        });
      }
      await check(width+' classic route',async()=>{
        const response=await page.goto(new URL('classic.html',target).href,{waitUntil:'domcontentloaded'});
        assert.equal(response.status(),200);
        await assert.doesNotReject(page.locator('body').waitFor({state:'visible',timeout:4000}));
      });
      await context.close();
    }
    await check('No JavaScript console exceptions',()=>{
      if(errors.length)throw Error(errors.join(' | ').slice(0,350));
    });
  } finally { await browser.close(); }
  const report={url:target,date:new Date().toISOString(),passed:results.filter(x=>x.pass).length,failed:results.filter(x=>!x.pass).length,results,notes:'Headless Edge on Windows; not a real-touch-device test. Screenshots taken after WebGL readiness.'};
  fs.writeFileSync(path.join(evidence,'remote-browser-qa.json'),JSON.stringify(report,null,2));
  console.log('RESULT',JSON.stringify({passed:report.passed,failed:report.failed,failures:results.filter(x=>!x.pass)}));
  if(report.failed)process.exitCode=1;
})().catch(e=>{console.error('FATAL',e.stack||e);process.exitCode=1;});