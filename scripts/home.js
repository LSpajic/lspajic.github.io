

document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('.search-btn').addEventListener('click', function (e) {
        e.preventDefault();
        // Add search functionality here
        alert('Search feature coming soon!');
    });

    document.querySelector('.cart-btn').addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'cart.html';
    });
    // Load sidebar categories
    const sidebarCategories = document.getElementById('sidebar-categories');

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

    // Subscribe button handler
    document.querySelector('.subscribe-btn').addEventListener('click', function (e) {
        e.preventDefault();
        alert('Hvala na pretplati!');
    });

    // Function to update current category display
    function updateCurrentCategory(category) {
        document.querySelector('.current-category').textContent = category.name.toUpperCase();
    }

    // Function to load featured products
    function loadFeaturedProducts(category) {
        const productsGrid = document.getElementById('featured-products-grid');
        productsGrid.innerHTML = '';

        // Show first 4 products
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
            <button class="add-to-cart" onclick="addToCart('${product.name}')"></button>
            `;

            productsGrid.appendChild(productCard);
        });
    }
});

// Global function to handle add to cart
