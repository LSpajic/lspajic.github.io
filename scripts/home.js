document.addEventListener('DOMContentLoaded', function () {
    // Search button handler
    document.querySelector('.search-btn').addEventListener('click', function (e) {
        e.preventDefault();
        alert('Search feature coming soon!');
    });

    // Cart button handler
    document.querySelector('.cart-btn').addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'cart.html';
    });

    // Load sidebar categories
    const sidebarCategories = document.getElementById('sidebar-categories');

    // Make sure data.categories exists and has items
    if (data && data.categories && data.categories.length > 0) {
        data.categories.forEach((category, index) => {
            const sidebarItem = document.createElement('li');
            const sidebarLink = document.createElement('a');
            sidebarLink.href = '#';
            sidebarLink.textContent = category.name;

            // Mark second category as active by default
            if (index === 1) {
                sidebarLink.classList.add('active');
                updateCurrentCategory(category);
                loadFeaturedProducts(category);
            }

            sidebarItem.appendChild(sidebarLink);
            sidebarCategories.appendChild(sidebarItem);

            // Add click handler
            sidebarLink.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove active class from all links
                document.querySelectorAll('#sidebar-categories a').forEach(a => {
                    a.classList.remove('active');
                });

                // Add active class to clicked link
                sidebarLink.classList.add('active');

                // Update the current category display
                updateCurrentCategory(category);

                // Load products for this category
                loadFeaturedProducts(category);
            });
        });
    } else {
        console.error('No categories data found!');
    }

    // Subscribe button handler
    document.querySelector('.subscribe-btn').addEventListener('click', function (e) {
        e.preventDefault();
        alert('Hvala na pretplati!');
    });

    // Function to update current category display
    function updateCurrentCategory(category) {
        const currentCategoryElement = document.querySelector('.current-category');
        if (currentCategoryElement) {
            currentCategoryElement.textContent = category.name.toUpperCase();
        }
    }

    // Function to load featured products
    function loadFeaturedProducts(category) {
        const productsGrid = document.getElementById('featured-products-grid');
        if (!productsGrid) {
            console.error('Products grid element not found!');
            return;
        }

        productsGrid.innerHTML = '';

        // Check if category has products
        if (!category.products || category.products.length === 0) {
            productsGrid.innerHTML = '<p>No products available in this category</p>';
            return;
        }

        // Show first 5 products
        const productsToShow = category.products.slice(0, 5);

        productsToShow.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-category">${category.name}</p>
                </div>
                <button class="add-to-cart" data-product="${product.name}"></button>
            `;

            // Add quantity indicator if item exists in cart
            updateCartIndicator(productCard, product.name);

            productsGrid.appendChild(productCard);
        });

        // Add event listeners to all add-to-cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function () {
                const productName = this.getAttribute('data-product');
                addToCart(productName);

                // Find the parent product card
                const productCard = this.closest('.product-card');

                // Update the visual indicator
                updateCartIndicator(productCard, productName);
            });
        });
    }

    // Helper function to update cart indicators
    function updateCartIndicator(productCard, productName) {
        // Remove existing indicator if it exists
        const existingIndicator = productCard.querySelector('.numberCircle');
        if (existingIndicator) {
            existingIndicator.remove();
        }

        // Add new indicator if item is in cart
        if (cart[productName] > 0) {
            const quantity = cart[productName];
            const indicator = document.createElement('div');
            indicator.className = 'numberCircle';
            indicator.textContent = quantity;
            productCard.appendChild(indicator);
        }
    }
});
