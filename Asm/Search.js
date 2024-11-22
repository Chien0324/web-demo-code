document.querySelector('.form-control').addEventListener('input', function (e) {
    const query = e.target.value.toLowerCase();
    const products = document.querySelectorAll('.product-item');

    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(query)) {
            product.style.display = 'block'; // Hiển thị sản phẩm phù hợp
        } else {
            product.style.display = 'none'; // Ẩn sản phẩm không phù hợp
        }
    });
});
