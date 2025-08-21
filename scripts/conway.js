// ---------- 4) Conway's Game of Life ----------
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('cvCanvas');
    const ctx = canvas.getContext('2d');
    const cell = 10;
    const cols = Math.floor(canvas.width / cell);
    const rows = Math.floor(canvas.height / cell);
    
    const dens = document.getElementById('cvDensity');
    const dLabel = document.getElementById('cvDLabel');
    const loop = createLoop();
    
    loops.push(loop);
    
    let grid = [];
    
    function seed() {
        const d = parseFloat(dens.value);
        dLabel.textContent = d.toFixed(2);
        grid = Array.from({ length: rows }, () => 
            Array.from({ length: cols }, () => Math.random() < d ? 1 : 0)
        );
    }
    
    function step() {
        const next = grid.map(r => r.slice());
        
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                let n = 0;
                
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        if (dx || dy) {
                            const yy = y + dy;
                            const xx = x + dx;
                            
                            if (xx >= 0 && xx < cols && yy >= 0 && yy < rows) {
                                n += grid[yy][xx];
                            }
                        }
                    }
                }
                
                next[y][x] = grid[y][x] ? ((n === 2 || n === 3) ? 1 : 0) : (n === 3 ? 1 : 0);
            }
        }
        
        grid = next;
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#9ef3c2';
        
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (grid[y][x]) {
                    ctx.fillRect(x * cell, y * cell, cell, cell);
                }
            }
        }
        
        step();
    }
    
    document.getElementById('cvStart').addEventListener('click', () => loop.start(() => draw()));
    document.getElementById('cvStop').addEventListener('click', () => loop.stop());
    document.getElementById('cvRandom').addEventListener('click', seed);
    
    dens.addEventListener('input', seed);
    
    seed();
});