// ---------- 2) Fourier Series Epicycles ----------
document.addEventListener('DOMContentLoaded', () => {
  const canvas=document.getElementById('fwCanvas'); const ctx=canvas.getContext('2d');
  const typeSel=document.getElementById('fwType'); const harm=document.getElementById('fwHarm'); const harmLabel=document.getElementById('fwHarmLabel');
  const center={x:220, y:canvas.height/2}; let t=0; const waveform=[]; const loop=createLoop(); loops.push(loop);
  function coeffSquare(n){return 4/(Math.PI*n);} // odd n
  function coeffTriangle(n){return (8/(Math.PI*Math.PI*n*n))*(((n%4)===1)?1:-1);} // odd n with sign
  function coeffSaw(n){return 2/(Math.PI*n)*((n%2)?1:-1);} // all n
  function draw(dt){ t+=dt/1000; ctx.clearRect(0,0,canvas.width,canvas.height);
    let x=center.x, y=center.y, px=x, py=y; const H=Number(harm.value); harmLabel.textContent=H;
    ctx.strokeStyle='#384056'; ctx.beginPath(); ctx.arc(x,y,70,0,Math.PI*2); ctx.stroke();
    for(let k=1,used=0; used<H; k++){
      let n, amp; const type=typeSel.value;
      if(type==='square'){ n=2*k-1; amp=coeffSquare(n)*70; }
      else if(type==='triangle'){ n=2*k-1; amp=coeffTriangle(n)*200; }
      else { n=k; amp=coeffSaw(n)*120; }
      used++;
      const angle=n*t*2*Math.PI*0.2; ctx.strokeStyle='#2a2f40'; ctx.beginPath(); ctx.arc(px,py,Math.abs(amp),0,Math.PI*2); ctx.stroke();
      x=px+amp*Math.cos(angle); y=py+amp*Math.sin(angle); ctx.strokeStyle='#8fb3ff'; ctx.beginPath(); ctx.moveTo(px,py); ctx.lineTo(x,y); ctx.stroke(); px=x; py=y;
    }
    waveform.unshift(y); if(waveform.length>700) waveform.pop();
    ctx.strokeStyle='#9ef3c2'; ctx.beginPath(); ctx.moveTo(420, waveform[0]||0); for(let i=1;i<waveform.length;i++) ctx.lineTo(420+i, waveform[i]); ctx.stroke();
    ctx.strokeStyle='#48506a'; ctx.beginPath(); ctx.moveTo(px,py); ctx.lineTo(420, waveform[0]||py); ctx.stroke();
  }
  document.getElementById('fwStart').addEventListener('click',()=>loop.start(draw));
  document.getElementById('fwStop').addEventListener('click',()=>loop.stop());
});