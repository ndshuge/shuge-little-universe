(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let toastTimeout;
  function toast(message) { const e=$('#toast'); e.textContent=message;e.classList.add('show');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>e.classList.remove('show'),3400); }
  $('#year').textContent=String(new Date().getFullYear());
  // Local theme preference. Storage failures leave the page fully usable.
  let dark = false;
  try {dark=localStorage.getItem('shuge-theme')==='dark';}catch{}
  function setTheme(value){dark=value;document.body.dataset.theme=dark?'dark':'light';const b=$('#theme-toggle');b.setAttribute('aria-pressed',String(dark));b.textContent=dark?'浅色外观 ◐':'深色外观 ◐';b.setAttribute('aria-label',dark?'切换到浅色外观':'切换到深色外观');document.querySelector('meta[name="theme-color"]').content=dark?'#22241f':'#f4f4ef';}
  setTheme(dark);
  $('#theme-toggle').addEventListener('click',()=>{setTheme(!dark);try{localStorage.setItem('shuge-theme',dark?'dark':'light');}catch{}drawHero();});
  $$('.filters button').forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;$$('.filters button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));let count=0;$$('.project').forEach(p=>{p.hidden=filter!=='all'&&p.dataset.category!==filter;if(!p.hidden)count++;});$('#projects').classList.toggle('is-filtered',filter!=='all');$('#filter-status').textContent=`显示 ${count} 个作品`; }));
  const dialog=$('#project-dialog');let opener;
  $$('[data-open]').forEach(button=>button.addEventListener('click',()=>{const p=window.SHUGE_PROJECTS[button.dataset.open];if(!p)return;opener=button;$('#dialog-category').textContent=p.category;$('#dialog-title').textContent=p.title;$('#dialog-description').textContent=p.description;$('#dialog-features').replaceChildren(...p.features.map(f=>{const li=document.createElement('li');li.textContent=f;return li;}));$('#dialog-note').textContent=p.note;$('#dialog-live').href=p.live;$('#dialog-live').textContent=p.liveLabel||'立即体验 ↗';$('#dialog-source').href=p.source;dialog.showModal();}));
  $('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
  dialog.addEventListener('close',()=>opener?.focus({preventScroll:true}));
  $('#copy-github').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('https://github.com/ndshuge');toast('GitHub 地址已复制');}catch{toast('GitHub 地址：https://github.com/ndshuge');}});
  const canvas=$('#hero-canvas'), ctx=canvas.getContext('2d');
  let width=0,height=0,dpr=1,angleX=-.48,angleY=.2,phaseTime=0,paused=reduced.matches,visible=true,drag=null,lastFrame=0,frame=0;
  let shape='ring';const points=[],target=[],TAU=Math.PI*2;
  const N=4200;
  // Uniform deterministic parametric surfaces; no image or remote dependency.
  function shapePoint(type,i){const u=(i%140)/140*TAU,v=Math.floor(i/140)/30*TAU;
    if(type==='ring'){const r=1.12+.48*Math.cos(v);return [r*Math.cos(u),r*Math.sin(u),.48*Math.sin(v)];}
    if(type==='knot'){const t=i/N*TAU*37;const a=i/N*TAU;const r=.82+.32*Math.cos(3*a);return [r*Math.cos(2*a)+.17*Math.cos(t),r*Math.sin(2*a)+.17*Math.sin(t),.56*Math.sin(3*a)+.17*Math.cos(t+1)];}
    const z=1-2*((i%140)+.5)/140,a=Math.floor(i/140)*2.39996322972865,rr=Math.sqrt(1-z*z);let x=rr*Math.cos(a),y=z,zz=rr*Math.sin(a);
    const part=i%10;if(part<3){return [x*.46+(part===0?-.7:.7),y*.46+.77,zz*.28];}
    if(part===3){return [x*.22,y*.19-.34,zz*.25+.65];}
    return [x*.84,y*.8-.05,zz*.6];
  }
  function makeShape(type,instant=false){shape=type;canvas.dataset.shape=type;for(let i=0;i<N;i++){target[i]=shapePoint(type,i);if(!points[i]||instant)points[i]=target[i].slice();}drawHero();}
  function sizeHero(){const r=canvas.getBoundingClientRect();width=r.width;height=r.height;dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx?.setTransform(dpr,0,0,dpr,0,0);drawHero();}
  function drawHero(){if(!ctx||!width)return;ctx.clearRect(0,0,width,height);const cX=Math.cos(angleX),sX=Math.sin(angleX),cY=Math.cos(angleY),sY=Math.sin(angleY);const scale=Math.min(width/3.9,height/3.9),cloud=[];const dt=dark?[214,220,202]:[48,55,40];
    for(let i=0;i<N;i++){const p=points[i],t=target[i];if(!p||!t)continue;for(let j=0;j<3;j++)p[j]+=(t[j]-p[j])*.105;const x=p[0]*cY-p[2]*sY,z1=p[0]*sY+p[2]*cY,y=p[1]*cX-z1*sX,z=p[1]*sX+z1*cX;const perspective=5/(5-z);cloud.push([width/2+x*scale*perspective,height/2+y*scale*perspective,z,i,perspective]);}
    cloud.sort((a,b)=>a[2]-b[2]);for(const [x,y,z,i,p] of cloud){const depth=Math.max(.17,Math.min(.9,(z+2.1)/4));const orange=i%107===0;ctx.fillStyle=orange?`rgba(223,76,40,${depth})`:`rgba(${dt.join(',')},${depth})`;const radius=(orange?1.7:.65+depth*.55)*p;ctx.beginPath();ctx.arc(x,y,radius,0,TAU);ctx.fill();}
  }
  const motion=$('#motion-toggle');function updateMotion(){motion.setAttribute('aria-pressed',String(paused));motion.innerHTML=paused?'播放动画 <span aria-hidden="true">▷</span>':'暂停动画 <span aria-hidden="true">Ⅱ</span>';canvas.dataset.paused=String(paused);}
  motion.addEventListener('click',()=>{paused=!paused;updateMotion();});
  $$('.shape-controls button').forEach(b=>b.addEventListener('click',()=>{$$('.shape-controls button').forEach(c=>c.setAttribute('aria-pressed',String(b===c)));makeShape(b.dataset.shape,reduced.matches||paused);$('#shape-announcement').textContent='当前形态：'+b.textContent;}));
  canvas.addEventListener('pointerdown',e=>{drag={id:e.pointerId,x:e.clientX,y:e.clientY};if(e.pointerType==='mouse'){canvas.setPointerCapture(e.pointerId);}});
  canvas.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;angleY+=(e.clientX-drag.x)*.012;angleX+=(e.clientY-drag.y)*.009;drag.x=e.clientX;drag.y=e.clientY;drawHero();});
  function endDrag(){drag=null;}canvas.addEventListener('pointerup',endDrag);canvas.addEventListener('pointercancel',endDrag);canvas.addEventListener('lostpointercapture',endDrag);canvas.addEventListener('pointerleave',e=>{if(e.buttons===0)endDrag();});
  canvas.addEventListener('keydown',e=>{const deltas={ArrowLeft:[0,-.15],ArrowRight:[0,.15],ArrowUp:[-.15,0],ArrowDown:[.15,0]};if(deltas[e.key]){e.preventDefault();angleX+=deltas[e.key][0];angleY+=deltas[e.key][1];drawHero();}if(e.code==='Space'){e.preventDefault();motion.click();}});
  new ResizeObserver(sizeHero).observe(canvas);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{threshold:0}).observe(canvas);
  reduced.addEventListener('change',()=>{paused=reduced.matches;updateMotion();drawHero();});
  makeShape('ring',true);updateMotion();
  const lab=$('#lab-canvas'),lctx=lab.getContext('2d');let lw=500,lh=500;let f=3,ph=90;
  function drawLab(){if(!lctx)return;const r=lab.getBoundingClientRect();lw=r.width;lh=r.height;const ratio=Math.min(devicePixelRatio||1,2);if(lab.width!==Math.round(lw*ratio)||lab.height!==Math.round(lh*ratio)){lab.width=Math.round(lw*ratio);lab.height=Math.round(lh*ratio);}lctx.setTransform(ratio,0,0,ratio,0,0);lctx.fillStyle='#20221f';lctx.fillRect(0,0,lw,lh);const cx=lw/2,cy=lh/2,s=Math.min(lw,lh)*.38;lctx.strokeStyle='#3b4035';lctx.lineWidth=.6;for(let n=-2;n<=2;n++){lctx.beginPath();lctx.moveTo(cx+n*s/2,cy-s*1.2);lctx.lineTo(cx+n*s/2,cy+s*1.2);lctx.stroke();lctx.beginPath();lctx.moveTo(cx-s*1.2,cy+n*s/2);lctx.lineTo(cx+s*1.2,cy+n*s/2);lctx.stroke();}
    for(let ribbon=0;ribbon<22;ribbon++){lctx.beginPath();lctx.strokeStyle=`rgba(${ribbon%6===0?'235,130,89':'203,213,187'},${.16+ribbon*.019})`;lctx.lineWidth=.75;const offset=ribbon*.018;for(let i=0;i<=720;i++){const t=i/720*TAU,x=cx+Math.sin(f*t+ph/180*Math.PI+offset)*s,y=cy+Math.sin(2*t+offset)*s;(i?lctx.lineTo(x,y):lctx.moveTo(x,y));}lctx.stroke();}
    $('#frequency-value').textContent=`${f} : 2`;$('#phase-value').textContent=ph+'°';$('#equation').textContent=`x = sin(${f}t + ${ph}°) · y = sin(2t)`;lab.dataset.frequency=String(f);lab.dataset.phase=String(ph);
  }
  $('#frequency').addEventListener('input',e=>{f=Number(e.target.value);drawLab();});$('#phase').addEventListener('input',e=>{ph=Number(e.target.value);drawLab();});
  let randomStep=0;$('#lab-random').addEventListener('click',()=>{const presets=[[5,45],[7,115],[4,60],[9,135],[3,90]];[f,ph]=presets[randomStep++%presets.length];$('#frequency').value=f;$('#phase').value=ph;drawLab();});
  $('#lab-save').addEventListener('click',()=>{drawLab();lab.toBlob(blob=>{if(!blob){toast('保存失败，请重试');return;}const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`SHUGE-Lissajous-${f}-2-${ph}.png`;a.click();setTimeout(()=>URL.revokeObjectURL(url),3000);toast('曲线图片已生成');},'image/png');});
  new ResizeObserver(drawLab).observe(lab);drawLab();
  // One bounded animation loop; pause on hidden tabs, offscreen and reduced-motion.
  function animate(now){frame=requestAnimationFrame(animate);if(document.hidden||!visible||paused||drag)return;if(now-lastFrame<33)return;const elapsed=Math.min(60,now-(lastFrame||now));lastFrame=now;phaseTime+=elapsed;angleY+=elapsed*.00013;drawHero();}
  frame=requestAnimationFrame(animate);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(frame));
  window.addEventListener('pageshow',e=>{if(e.persisted)frame=requestAnimationFrame(animate);});
})();
