// ---------- 5) Prime Number Visualization (Non-Sieve Approach) ----------
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('svContainer');
    const nInput = document.getElementById('svN');
    const nLabel = document.getElementById('svNLabel');
    const speedInput = document.getElementById('svSpeed');
    const startBtn = document.getElementById('svStart');
    const pauseBtn = document.getElementById('svPause');
    const resetBtn = document.getElementById('svReset');
    const statusEl = document.getElementById('svStatus');
    
    let numbers = [];
    let primes = [];
    let currentNumberIndex = 0; // Start checking from the first number (2)
    let currentDivisorIndex = 0;
    let animationSpeed = 500;
    let animationId = null;
    let isPaused = false;
    let maxNumber = 100;
    let currentDivisor = null;
    let checkingNumber = null;
    
    // Update the displayed value when range input changes
    nInput.addEventListener('input', function() {
        maxNumber = parseInt(this.value);
        nLabel.textContent = maxNumber;
        if (!animationId) {
            resetVisualization();
        }
    });
    
    speedInput.addEventListener('input', function() {
        // Map the speed value (1-10) to a delay between 1000ms and 100ms
        animationSpeed = 1100 - (this.value * 100);
        if (animationId) {
            clearInterval(animationId);
            if (!isPaused) {
                startAnimation();
            }
        }
    });
    
    startBtn.addEventListener('click', function() {
        if (animationId) {
            clearInterval(animationId);
        }
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        isPaused = false;
        startAnimation();
    });
    
    pauseBtn.addEventListener('click', function() {
        if (isPaused) {
            // Resume animation
            isPaused = false;
            pauseBtn.textContent = 'Pause';
            startAnimation();
        } else {
            // Pause animation
            isPaused = true;
            pauseBtn.textContent = 'Resume';
            clearInterval(animationId);
            animationId = null;
        }
    });
    
    resetBtn.addEventListener('click', function() {
        resetVisualization();
    });
    
    function initializeNumbers(max) {
        numbers = [];
        primes = [];
        container.innerHTML = '';
        currentNumberIndex = 0;
        currentDivisorIndex = 0;
        currentDivisor = null;
        checkingNumber = null;
        
        // Create number elements (starting from 2)
        for (let i = 2; i <= max; i++) {
            numbers.push({
                value: i,
                isPrime: null, // null means not checked yet
                element: null
            });
        }
        
        // Create visual elements
        numbers.forEach(num => {
            const numEl = document.createElement('div');
            numEl.className = 'number neutral';
            numEl.textContent = num.value;
            numEl.dataset.value = num.value;
            container.appendChild(numEl);
            num.element = numEl;
        });
        
        statusEl.textContent = 'Initialized. Click Start to begin.';
    }
    
    function startAnimation() {
        if (numbers.length === 0) {
            initializeNumbers(maxNumber);
        }
        
        animationId = setInterval(performAlgorithmStep, animationSpeed);
    }
    
    function performAlgorithmStep() {
        // If we've processed all numbers, finish
        if (currentNumberIndex >= numbers.length) {
            clearInterval(animationId);
            animationId = null;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            statusEl.textContent = 'Algorithm completed! Found ' + primes.length + ' prime numbers.';
            return;
        }
        
        const currentNumber = numbers[currentNumberIndex];
        
        // If we're just starting to check this number
        if (checkingNumber === null) {
            checkingNumber = currentNumber;
            checkingNumber.element.className = 'number checking';
            statusEl.textContent = 'Checking if ' + checkingNumber.value + ' is prime';
            
            // Reset any previous divisor highlighting
            if (currentDivisor) {
                currentDivisor.element.className = currentDivisor.isPrime ? 'number prime' : 'number neutral';
                currentDivisor = null;
            }
            
            // For numbers 2 and 3, they're automatically prime
            if (checkingNumber.value <= 3) {
                checkingNumber.isPrime = true;
                primes.push(checkingNumber);
                checkingNumber.element.className = 'number prime';
                statusEl.textContent = checkingNumber.value + ' is prime!';
                checkingNumber = null;
                currentNumberIndex++;
                return;
            }
            
            // Start checking divisors from the first prime
            currentDivisorIndex = 0;
            return;
        }
        
        // If we're checking divisors for the current number
        if (currentDivisorIndex < primes.length) {
            const divisor = primes[currentDivisorIndex];
            
            // Highlight the current divisor
            if (currentDivisor) {
                currentDivisor.element.className = currentDivisor.isPrime ? 'number prime' : 'number neutral';
            }
            currentDivisor = divisor;
            currentDivisor.element.className = 'number divisor';
            
            // Check if the divisor divides the current number
            if (checkingNumber.value % divisor.value === 0) {
                // Number is not prime
                checkingNumber.isPrime = false;
                checkingNumber.element.className = 'number non-prime';
                statusEl.textContent = checkingNumber.value + ' is not prime (divisible by ' + divisor.value + ')';
                
                // Reset and move to the next number
                if (currentDivisor) {
                    currentDivisor.element.className = 'number prime';
                }
                checkingNumber = null;
                currentDivisor = null;
                currentNumberIndex++;
                return;
            }
            
            // Check if we've reached the square root of the number (no need to check further)
            if (divisor.value * divisor.value > checkingNumber.value) {
                // Number is prime
                checkingNumber.isPrime = true;
                primes.push(checkingNumber);
                checkingNumber.element.className = 'number prime';
                statusEl.textContent = checkingNumber.value + ' is prime!';
                
                // Reset and move to the next number
                if (currentDivisor) {
                    currentDivisor.element.className = 'number prime';
                }
                checkingNumber = null;
                currentDivisor = null;
                currentNumberIndex++;
                return;
            }
            
            statusEl.textContent = 'Checking if ' + checkingNumber.value + ' is divisible by ' + divisor.value;
            currentDivisorIndex++;
            return;
        }
        
        // If we've checked all divisors and found no factors
        if (currentDivisorIndex >= primes.length) {
            // Number is prime
            checkingNumber.isPrime = true;
            primes.push(checkingNumber);
            checkingNumber.element.className = 'number prime';
            statusEl.textContent = checkingNumber.value + ' is prime!';
            
            // Reset and move to the next number
            if (currentDivisor) {
                currentDivisor.element.className = 'number prime';
            }
            checkingNumber = null;
            currentDivisor = null;
            currentNumberIndex++;
        }
    }
    
    function resetVisualization() {
        clearInterval(animationId);
        animationId = null;
        isPaused = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        pauseBtn.textContent = 'Pause';
        
        initializeNumbers(maxNumber);
    }
    
    // Initialize with default values
    maxNumber = parseInt(nInput.value);
    nLabel.textContent = maxNumber;
    initializeNumbers(maxNumber);
    
    // Add to global loops array for the stopAll functionality
    const sieveLoop = {
        stop: function() {
            clearInterval(animationId);
            animationId = null;
            isPaused = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            pauseBtn.textContent = 'Pause';
            statusEl.textContent = 'Stopped';
            
            // Reset highlighting
            if (currentDivisor) {
                currentDivisor.element.className = currentDivisor.isPrime ? 'number prime' : 'number neutral';
            }
            if (checkingNumber) {
                checkingNumber.element.className = 'number neutral';
            }
        }
    };
    loops.push(sieveLoop);
});