const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
     
        const productItem = this.closest('.product-item'); 
        const productName = productItem.querySelector('h3').textContent; 
        const productPriceText = productItem.querySelector('.price').textContent; 
        const productImage = productItem.querySelector('img').src; 
        const productCategory = productItem.getAttribute('data-category'); 

        // Lấy giá trị số từ chuỗi giá, loại bỏ chữ "VND" và dấu cách
        const productPrice = parseInt(productPriceText.replace(/[^\d]/g, ''), 10);

        // Kiểm tra nếu giá không hợp lệ (kết quả NaN), khởi tạo giá mặc định là 0
        if (isNaN(productPrice)) {
            alert('Invalid price!');
            return; // Dừng xử lý nếu giá không hợp lệ
        }

        const newOrder = {
            name: productName,
            price: productPrice,
            image: productImage,
            category: productCategory,
        };

        // Lấy danh sách đơn hàng từ localStorage, nếu không có thì khởi tạo mảng trống
        let currentOrders = JSON.parse(localStorage.getItem('Orders'));

        // Kiểm tra xem currentOrders có phải là mảng hay không
        if (!Array.isArray(currentOrders)) {
            currentOrders = []; // Nếu không phải mảng, tạo mảng mới
        }

        // Thêm sản phẩm mới vào giỏ hàng
        currentOrders.push(newOrder);

        // Lưu lại giỏ hàng vào localStorage
        localStorage.setItem('Orders', JSON.stringify(currentOrders));

        // Thông báo đã thêm sản phẩm vào giỏ hàng
        alert(`Added "${productName}" to the cart.`);
    });
});
