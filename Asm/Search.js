document.querySelector('.form-control').addEventListener('input', filterProducts);

function filterProducts() {
    const query = document.querySelector('.form-control').value.toLowerCase();
    const products = document.querySelectorAll('.product-item');

    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        
        // Lấy giá sản phẩm, loại bỏ ký tự không phải số và chuyển sang kiểu số
        let productPriceText = product.querySelector('.price').textContent;
        productPriceText = productPriceText.replace(/[^\d]/g, ''); // Loại bỏ ký tự không phải số
        const productPrice = parseFloat(productPriceText);

        // Kiểm tra điều kiện lọc theo tên hoặc giá
        const matchesName = productName.includes(query);
        const matchesPrice = productPrice.toString().includes(query); // Tìm kiếm nếu query khớp với giá

        if (matchesName || matchesPrice) {
            product.style.display = 'block'; // Hiển thị sản phẩm phù hợp
        } else {
            product.style.display = 'none'; // Ẩn sản phẩm không phù hợp
        }
    });
}
