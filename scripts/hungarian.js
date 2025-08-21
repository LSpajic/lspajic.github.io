// ---------- 1) Hungarian Algorithm (4×4) ----------
document.addEventListener('DOMContentLoaded', () => {
    const tbl = document.getElementById('huTable');
    const N = 4;
    const defaultM = [[4, 1, 3, 2], [2, 0, 5, 3], [3, 2, 2, 3], [3, 3, 2, 2]];
    const inputs = [];

    for (let r = 0; r < N; r++) {
        const tr = document.createElement('tr');
        inputs[r] = [];
        
        for (let c = 0; c < N; c++) {
            const td = document.createElement('td');
            const inp = document.createElement('input');
            
            inp.type = 'number';
            inp.step = '1';
            inp.value = defaultM[r][c];
            
            inputs[r][c] = inp;
            td.appendChild(inp);
            tr.appendChild(td);
        }
        
        tbl.appendChild(tr);
    }

    function readM() {
        return inputs.map(row => row.map(inp => Number(inp.value)));
    }

    function clearHi() {
        Array.from(tbl.querySelectorAll('td')).forEach(td => td.classList.remove('highlight'));
    }

    function setAssign(assign) {
        clearHi();
        let sum = 0;
        
        assign.forEach(([r, c]) => {
            tbl.rows[r].cells[c].classList.add('highlight');
            sum += Number(inputs[r][c].value);
        });
        
        document.getElementById('huTotal').textContent = 'Total: ' + sum;
    }

    function hungarian(a) {
        const n = a.length;
        const u = Array(n + 1).fill(0);
        const v = Array(n + 1).fill(0);
        const p = Array(n + 1).fill(0);
        const way = Array(n + 1).fill(0);
        
        for (let i = 1; i <= n; i++) {
            p[0] = i;
            let j0 = 0;
            const minv = Array(n + 1).fill(Infinity);
            const used = Array(n + 1).fill(false);
            
            do {
                used[j0] = true;
                const i0 = p[j0];
                let delta = Infinity;
                let j1 = 0;
                
                for (let j = 1; j <= n; j++) {
                    if (!used[j]) {
                        const cur = a[i0 - 1][j - 1] - u[i0] - v[j];
                        
                        if (cur < minv[j]) {
                            minv[j] = cur;
                            way[j] = j0;
                        }
                        
                        if (minv[j] < delta) {
                            delta = minv[j];
                            j1 = j;
                        }
                    }
                }
                
                for (let j = 0; j <= n; j++) {
                    if (used[j]) {
                        u[p[j]] += delta;
                        v[j] -= delta;
                    } else {
                        minv[j] -= delta;
                    }
                }
                
                j0 = j1;
            } while (p[j0] != 0);
            
            do {
                const j1 = way[j0];
                p[j0] = p[j1];
                j0 = j1;
            } while (j0 != 0);
        }
        
        const res = [];
        
        for (let j = 1; j <= n; j++) {
            res.push([p[j] - 1, j - 1]);
        }
        
        return res;
    }

    document.getElementById('huCompute').addEventListener('click', () => {
        const M = readM();
        const A = hungarian(M);
        setAssign(A);
    });

    document.getElementById('huRandom').addEventListener('click', () => {
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                inputs[r][c].value = Math.floor(Math.random() * 9);
            }
        }
        
        clearHi();
        document.getElementById('huTotal').textContent = 'Total: —';
    });
});