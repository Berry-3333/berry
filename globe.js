(()=>{'use strict';
const canvas=document.getElementById('globalNetwork');if(!canvas)return;
const ctx=canvas.getContext('2d',{alpha:true});const tex=new Image();tex.src='earth-texture.png';let pixels=null,tw=0,th=0;
tex.onload=()=>{const t=document.createElement('canvas');t.width=tex.naturalWidth;t.height=tex.naturalHeight;const x=t.getContext('2d',{willReadFrequently:true});x.drawImage(tex,0,0);pixels=x.getImageData(0,0,t.width,t.height).data;tw=t.width;th=t.height;};
let w=0,h=0,size=0,buf,bc,angle=1.35,last=0,drag=false,px=0,playing=true;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const pts=[[-6.2,106.8,1],[28.6,77.2,0],[35.7,139.7,1],[39.9,116.4,0],[51.5,-.1,1],[40.7,-74,0],[34,-118,1],[-23.5,-46.6,0],[-33.9,151.2,1],[30,31,0],[48.9,2.35,1],[1.3,103.8,0],[19,72.8,1],[55.7,37.6,0],[-1.3,36.8,1],[37.5,127,0],[41,29,1],[-6.9,107.6,0],[14.6,121,1],[24.7,46.7,0]];
function resize(){const r=canvas.getBoundingClientRect();w=r.width;h=r.height;size=Math.max(140,Math.min(w>850?h*.83:h*.74,w>850?w*.44:w*.83,620));let s=Math.min(450,Math.round(size));buf=document.createElement('canvas');buf.width=buf.height=s;bc=buf.getContext('2d');}
function project(lat,lon){let a=lon*Math.PI/180+angle,p=lat*Math.PI/180,z=Math.cos(p)*Math.cos(a);return {x:Math.cos(p)*Math.sin(a),y:-Math.sin(p),z};}
function drawGlobe(){const s=buf.width,im=bc.createImageData(s,s),data=im.data,rad=s/2;for(let y=0;y<s;y++){let ny=(y+.5-rad)/rad;for(let x=0;x<s;x++){let nx=(x+.5-rad)/rad,rr=nx*nx+ny*ny;if(rr>1)continue;let z=Math.sqrt(1-rr),lat=Math.asin(-ny),lon=Math.atan2(nx,z)-angle;let u=((lon/(2*Math.PI)+.5)%1+1)%1,v=.5-lat/Math.PI;let ti=(Math.min(th-1,Math.max(0,Math.floor(v*th)))*tw+Math.min(tw-1,Math.floor(u*tw)))*4;let k=(y*s+x)*4,light=.52+.48*Math.max(0,z*.85-nx*.23+ny*.2);data[k]=pixels?pixels[ti]*light:4;data[k+1]=pixels?pixels[ti+1]*light:8;data[k+2]=pixels?pixels[ti+2]*light:40;data[k+3]=255;}}bc.putImageData(im,0,0);}
function render(now){if(!last)last=now;let dt=Math.min(60,now-last);last=now;if(playing&&!drag&&!reduce)angle+=dt*.00012;
ctx.clearRect(0,0,w,h);let cx=w>850?w*.69:w*.5,cy=h*.51,r=size/2;
let glow=ctx.createRadialGradient(cx,cy,r*.85,cx,cy,r*1.35);glow.addColorStop(0,'rgba(42,104,188,.23)');glow.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(cx,cy,r*1.35,0,Math.PI*2);ctx.fill();
drawGlobe();ctx.drawImage(buf,cx-r,cy-r,size,size);
ctx.strokeStyle='rgba(111,155,209,.4)';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke();
let projected=pts.map(([lat,lon,type])=>({...project(lat,lon),type}));
for(let i=0;i<projected.length;i++){let p=projected[i];if(p.z<.04)continue;for(let j=i+1;j<projected.length;j++){let q=projected[j];if(q.z<.04||(i*7+j*11)%5>1)continue;let x1=cx+p.x*r,y1=cy+p.y*r,x2=cx+q.x*r,y2=cy+q.y*r;ctx.beginPath();ctx.moveTo(x1,y1);ctx.quadraticCurveTo((x1+x2)/2,Math.min(y1,y2)-r*.12,x2,y2);ctx.strokeStyle='rgba(131,182,219,.22)';ctx.lineWidth=.7;ctx.stroke();}}
for(const p of projected){if(p.z<.03)continue;let x=cx+p.x*r,y=cy+p.y*r,rr=(p.type?8:6)*(0.45+.55*p.z);ctx.fillStyle=p.type?'rgba(197,79,216,.33)':'rgba(248,57,52,.36)';ctx.beginPath();ctx.arc(x,y,rr*2.1,0,Math.PI*2);ctx.fill();ctx.fillStyle=p.type?'#d96bec':'#fa4847';ctx.beginPath();ctx.arc(x,y,rr*.55,0,Math.PI*2);ctx.fill();}
requestAnimationFrame(render)}
canvas.style.touchAction='pan-y';canvas.addEventListener('pointerdown',e=>{drag=true;px=e.clientX;canvas.setPointerCapture(e.pointerId)});canvas.addEventListener('pointermove',e=>{if(drag){angle+=(e.clientX-px)*.008;px=e.clientX}});canvas.addEventListener('pointerup',()=>drag=false);canvas.addEventListener('pointercancel',()=>drag=false);
window.addEventListener('resize',resize,{passive:true});resize();requestAnimationFrame(render);
})();
