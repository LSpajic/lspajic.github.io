// Initialize cart display
function initializeCart() {
    const cartItems = document.getElementById('cart-items');

    // Clear existing items
    cartItems.innerHTML = '';

    // Check if cart is empty
    if (Object.keys(cart).length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td colspan="2" style="text-align: center;">Vaša košarica je prazna</td>';
        cartItems.appendChild(emptyRow);
        return;
    }

    // Populate cart items
    for (const [productName, quantity] of Object.entries(cart)) {
        const row = document.createElement('tr');

        // Product name column
        const nameCell = document.createElement('td');
        nameCell.textContent = productName;

        // Quantity controls column
        const quantityCell = document.createElement('td');
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'quantity-controls';

        // Minus button
        const minusBtn = document.createElement('button');
        minusBtn.className = 'quantity-btn';
        minusBtn.textContent = '–';

        // Quantity display
        const quantityDisplay = document.createElement('span');
        quantityDisplay.className = 'quantity-value';
        quantityDisplay.textContent = quantity;

        // Plus button
        const plusBtn = document.createElement('button');
        plusBtn.className = 'quantity-btn';
        plusBtn.textContent = '+';

        // Event listeners
        minusBtn.addEventListener('click', () => updateQuantity(productName, -1));
        plusBtn.addEventListener('click', () => updateQuantity(productName, 1));

        // Assemble controls
        controlsDiv.appendChild(minusBtn);
        controlsDiv.appendChild(quantityDisplay);
        controlsDiv.appendChild(plusBtn);
        quantityCell.appendChild(controlsDiv);

        // Assemble row
        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        cartItems.appendChild(row);
    }
}

// Update quantity function
function updateQuantity(productName, change) {
    const newValue = cart[productName] + change;

    if (newValue <= 0) {
        // Remove item if quantity reaches 0
        delete cart[productName];
    } else {
        cart[productName] = newValue;
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Refresh display
    initializeCart();
    updateCartCounter(true);
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', initializeCart);