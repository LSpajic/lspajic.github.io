// ---------- Shared helpers ----------
function createLoop(){
  let id=null, last=0, running=false, cb=null;
  function start(fn){ cb=fn; if(running) return; running=true; const tick=t=>{ if(!running) return; const dt=last? t-last:16; last=t; try{cb&&cb(dt);}catch(e){console.error(e);} id=requestAnimationFrame(tick); }; id=requestAnimationFrame(tick); }
  function stop(){ if(id) cancelAnimationFrame(id); id=null; running=false; last=0; }
  return { start, stop };
}

// Initialize loops array and stopAll button
const loops = [];
document.addEventListener('DOMContentLoaded', () => {
  const stopAllBtn = document.getElementById('stopAll');
  if (stopAllBtn) {
    stopAllBtn.addEventListener('click', () => loops.forEach(L => L.stop()));
  }
  
  // Add subtle animation to preview boxes on index page
  document.querySelectorAll('.preview-content').forEach(preview => {
    preview.addEventListener('mouseover', () => {
      preview.style.transform = 'scale(1.1)';
      preview.style.transition = 'transform 0.3s ease';
    });
    
    preview.addEventListener('mouseout', () => {
      preview.style.transform = 'scale(1)';
    });
  });
});