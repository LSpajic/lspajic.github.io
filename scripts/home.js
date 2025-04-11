document.addEventListener('DOMContentLoaded', function () {
    updateCartCounter();
    updateCartIndicator();

    document.querySelector('.search-btn').addEventListener('click', function (e) {
        e.preventDefault();
        alert('Search feature coming soon!');
    });

    document.querySelector('.cart-btn').addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'cart.html';
    });

    const sidebarCategories = document.getElementById('sidebar-categories');

    if (data && data.categories && data.categories.length > 0) {
        data.categories.forEach((category, index) => {
            const sidebarItem = document.createElement('li');
            const sidebarLink = document.createElement('a');
            sidebarLink.href = '#';
            sidebarLink.textContent = category.name;

            if (index === 1) {
                sidebarLink.classList.add('active');
                updateCurrentCategory(category);
                loadFeaturedProducts(category);
            }

            sidebarItem.appendChild(sidebarLink);
            sidebarCategories.appendChild(sidebarItem);

            sidebarLink.addEventListener('click', (e) => {
                e.preventDefault();

                document.querySelectorAll('#sidebar-categories a').forEach(a => {
                    a.classList.remove('active');
                });

                sidebarLink.classList.add('active');

                updateCurrentCategory(category);

                loadFeaturedProducts(category);
            });
        });
    } else {
        console.error('No categories data found!');
    }

    document.querySelector('.subscribe-btn').addEventListener('click', function (e) {
        e.preventDefault();
        alert('Hvala na pretplati!');
    });

    function updateCurrentCategory(category) {
        const currentCategoryElement = document.querySelector('.current-category h1');
        if (currentCategoryElement) {
            currentCategoryElement.textContent = category.name.toUpperCase();
        }
    }

    function loadFeaturedProducts(category) {
        const productsGrid = document.getElementById('featured-products-grid');
        if (!productsGrid) {
            console.error('Products grid element not found!');
            return;
        }

        productsGrid.innerHTML = '';

        if (!category.products || category.products.length === 0) {
            productsGrid.innerHTML = '<p>No products available in this category</p>';
            return;
        }

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

            updateCartIndicator(productCard, product.name);

            productsGrid.appendChild(productCard);
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function () {
                const productName = this.getAttribute('data-product');
                addToCart(productName);

                const productCard = this.closest('.product-card');

                updateCartIndicator(productCard, productName);
            });
        });
    }

    function updateCartIndicator(productCard, productName) {
        const existingIndicator = productCard.querySelector('.numberCircle');
        if (existingIndicator) {
            existingIndicator.remove();
        }

        if (cart[productName] > 0) {
            const quantity = cart[productName];
            const indicator = document.createElement('div');
            indicator.className = 'numberCircle';
            indicator.textContent = quantity;
            productCard.appendChild(indicator);

            indicator.classList.add('update');

            setTimeout(() => {
                indicator.classList.remove('update');
            }, 300);
        }
    }
});

