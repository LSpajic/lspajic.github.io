function initializeCart() {
    const cartItems = document.getElementById('cart-items');

    cartItems.innerHTML = '';

    if (Object.keys(cart).length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td colspan="2" style="text-align: center;">Vaša košarica je prazna</td>';
        cartItems.appendChild(emptyRow);
        return;
    }

    for (const [productName, quantity] of Object.entries(cart)) {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = productName;

        const quantityCell = document.createElement('td');
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'quantity-controls';

        const minusBtn = document.createElement('button');
        minusBtn.className = 'quantity-btn';
        minusBtn.textContent = '–';

        const quantityDisplay = document.createElement('span');
        quantityDisplay.className = 'quantity-value';
        quantityDisplay.textContent = quantity;

        const plusBtn = document.createElement('button');
        plusBtn.className = 'quantity-btn';
        plusBtn.textContent = '+';

        minusBtn.addEventListener('click', () => updateQuantity(productName, -1));
        plusBtn.addEventListener('click', () => updateQuantity(productName, 1));

        controlsDiv.appendChild(minusBtn);
        controlsDiv.appendChild(quantityDisplay);
        controlsDiv.appendChild(plusBtn);
        quantityCell.appendChild(controlsDiv);

        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        cartItems.appendChild(row);
    }
}

function updateQuantity(productName, change) {
    const newValue = cart[productName] + change;

    if (newValue <= 0) {
        delete cart[productName];
    } else {
        cart[productName] = newValue;
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    initializeCart();
    updateCartCounter(true);
}

window.addEventListener('DOMContentLoaded', initializeCart);