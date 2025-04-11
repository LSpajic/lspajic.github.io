const cart = JSON.parse(localStorage.getItem('cart')) || {};
let nCartItems = localStorage.getItem('nCartItems') || 0;

function addToCart(productName) {
    if (cart.hasOwnProperty(productName)) {
        cart[productName] += 1;
    } else {
        cart[productName] = 1;
        nCartItems++;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter(true)
    // alert(`${productName} dodano u košaricu!\nTrenutna količina: ${cart[productName]}`);

}


function updateCartCounter(shouldAnimate = false) {
    const counter = document.getElementById('cart-counter');
    if (counter) {
        const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
        counter.textContent = totalItems;

        if (totalItems > 0) {
            counter.style.display = 'flex';
            if (shouldAnimate) {
                // Add pulse 
                counter.classList.add('pulse');
                setTimeout(() => counter.classList.remove('pulse'), 300);
            }
        } else {
            counter.style.display = 'none';
        }
    }
}



document.addEventListener('DOMContentLoaded', function () {
    updateCartCounter();
});