// Shared cart object - initialize with empty or default data
const cart = JSON.parse(localStorage.getItem('cart')) || {};
let nCartItems = localStorage.getItem('nCartItems') || 0;

// Global function to handle add to cart
function addToCart(productName) {
    if (cart.hasOwnProperty(productName)) {
        cart[productName] += 1;
    } else {
        cart[productName] = 1;
        nCartItems++;
    }
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} dodano u košaricu!\nTrenutna količina: ${cart[productName]}`);
}

