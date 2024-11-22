document.getElementById('order-button').addEventListener('click', function () {
    const orderListItems = document.querySelectorAll('#order-list li'); // Danh sách sản phẩm trong Order Details
    const orderDetails = {
        products: [], // Danh sách sản phẩm
        summary: {}, // Phần tổng kết (subtotal, vat, shipping, total)
    };

    // Lấy thông tin từng sản phẩm trong Order Details
    orderListItems.forEach(item => {
        const productName = item.childNodes[0].textContent.trim().split(' - ')[0]; // Tên sản phẩm
        const productPrice = parseInt(item.childNodes[0].textContent.trim().split(' - ')[1].replace(/\D/g, '')); // Giá sản phẩm
        const productQuantity = parseInt(item.querySelector('.decrease').nextSibling.textContent.trim()); // Số lượng
        const productTotal = parseInt(item.textContent.split('=')[1].replace(/\D/g, '')); // Tổng tiền sản phẩm

        // Thêm sản phẩm vào danh sách
        orderDetails.products.push({
            name: productName,
            price: productPrice,
            quantity: productQuantity,
            total: productTotal,
        });
    });

    // Lấy thông tin từ phần tổng kết
    orderDetails.summary.subtotal = parseInt(document.getElementById('subtotal').textContent.replace(/\D/g, ''));
    orderDetails.summary.vat = parseInt(document.getElementById('vat').textContent.replace(/\D/g, ''));
    orderDetails.summary.shipping = parseInt(document.getElementById('shipping').textContent.replace(/\D/g, ''));
    orderDetails.summary.total = parseInt(document.getElementById('total').textContent.replace(/\D/g, ''));

    // Lưu thông tin vào Application với key là 'orderDetails'
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    // Xác nhận
    alert('Order details have been saved successfully!');
});
