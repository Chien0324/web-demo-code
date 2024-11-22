document.addEventListener('DOMContentLoaded', function () {
    let Orders = JSON.parse(localStorage.getItem('Orders')) || {};  // Dùng let để có thể cập nhật Orders

    const productsContainer = document.querySelector('.products');

    // Populate products from localStorage
    const orders = Object.keys(Orders); // Lấy tất cả tên sản phẩm trong Orders
    orders.forEach(productName => {
        const product = Orders[productName]; // Lấy thông tin sản phẩm từ Orders

        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.setAttribute('data-category', product.category);

        productItem.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}">
                <button class="remove-product" data-name="${productName}">X</button> <!-- Nút X di chuyển sang bên phải của ảnh -->
            </div>
            <h3>${product.name}</h3>
            <p class="price">${product.price.toLocaleString()} VND</p>
            <button class="add-to-cart">Add to Cart</button>
        `;
        productsContainer.appendChild(productItem);
    });

    // Add event listeners to product "Remove" buttons
    const removeButtons = document.querySelectorAll('.remove-product');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.getAttribute('data-name');
            
            // Xóa sản phẩm khỏi Orders trong localStorage
            delete Orders[productName];

            // Lọc bỏ tất cả các giá trị null trong Orders
            Orders = Object.fromEntries(Object.entries(Orders).filter(([key, value]) => value !== null));

            // Nếu không còn sản phẩm nào trong Orders, xóa Orders khỏi localStorage
            if (Object.keys(Orders).length === 0) {
                localStorage.removeItem('Orders');  // Xóa key Orders khỏi localStorage nếu giỏ hàng trống
            } else {
                // Nếu còn sản phẩm, cập nhật lại Orders trong localStorage
                localStorage.setItem('Orders', JSON.stringify(Orders));
            }

            // Cập nhật giao diện giỏ hàng sau khi xóa sản phẩm
            updateCart();
            // Xóa sản phẩm khỏi giao diện
            this.closest('.product-item').remove();
        });
    });

    // Add event listeners to product "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productItem = this.parentElement;
            const productName = productItem.querySelector('h3').textContent;
            const productPrice = parseInt(productItem.querySelector('.price').textContent.replace(/\D/g, ''));

            if (Orders[productName]) {
                Orders[productName].quantity++;
            } else {
                Orders[productName] = { name: productName, price: productPrice, quantity: 1 };
            }

            updateCart();
        });
    });

    // Function to update the cart UI
    function updateCart() {
        const orderList = document.getElementById('order-list');
        const subtotalElement = document.getElementById('subtotal');
        const vatElement = document.getElementById('vat');
        const shippingElement = document.getElementById('shipping');
        const totalElement = document.getElementById('total');

        orderList.innerHTML = '';
        let subtotal = 0;

        Object.entries(Orders).forEach(([productName, product]) => {
            // Bỏ qua các sản phẩm không hợp lệ
            if (!productName || !product.price || !product.quantity) {
                return;
            }

            const productTotal = product.price * product.quantity;
            subtotal += productTotal;

            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${productName} - ${product.price.toLocaleString()}đ x 
                <button class="decrease" data-name="${productName}">-</button>
                ${product.quantity}
                <button class="increase" data-name="${productName}">+</button>
                = ${productTotal.toLocaleString()}đ
            `;
            orderList.appendChild(listItem);
        });

        const vat = subtotal * 0.1;
        const total = subtotal + vat + 30000; // Shipping fee

        subtotalElement.textContent = subtotal.toLocaleString();
        vatElement.textContent = vat.toLocaleString();
        shippingElement.textContent = '30,000 VND';
        totalElement.textContent = total.toLocaleString();

        // Cập nhật lại localStorage
        localStorage.setItem('Orders', JSON.stringify(Orders));
        addQuantityButtonsEventListeners();
    }

    // Function to update quantity of items in cart
    function addQuantityButtonsEventListeners() {
        const increaseButtons = document.querySelectorAll('.increase');
        const decreaseButtons = document.querySelectorAll('.decrease');

        increaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const name = button.getAttribute('data-name');
                Orders[name].quantity++;
                updateCart();
            });
        });

        decreaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const name = button.getAttribute('data-name');
                if (Orders[name].quantity > 1) {
                    Orders[name].quantity--;
                } else {
                    delete Orders[name];
                }
                updateCart();
            });
        });
    }

    // Initial cart UI update
    updateCart();
});
