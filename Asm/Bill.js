document.addEventListener("DOMContentLoaded", function () {
    // Lấy thông tin từ localStorage
    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    if (!orderDetails || !orderDetails.products) {
      alert("No order details found! Please check your localStorage.");
      return;
    }
  
    // Lấy phần tử div để hiển thị sản phẩm
    const cartItemsDiv = document.getElementById("cart-items");
  
    // Dùng reduce để lọc sản phẩm trùng lặp
    const uniqueProducts = orderDetails.products.reduce((acc, item) => {
      const existingProduct = acc.find(p => p.name === item.name);
      if (existingProduct) {
        // Cộng dồn số lượng và cập nhật tổng cho sản phẩm đã có
        existingProduct.quantity += item.quantity;
        existingProduct.total = existingProduct.quantity * existingProduct.price;
      } else {
        // Nếu sản phẩm chưa có, thêm vào danh sách
        acc.push({ ...item });
      }
      return acc;
    }, []);
  
    // Hiển thị thông tin sản phẩm không bị trùng lặp
    uniqueProducts.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");
  
      itemDiv.innerHTML = `
        <span>Product Name: ${item.name}</span><br>
        <span>Price: ${item.price.toLocaleString()}₫</span><br>
        <span>Quantity: ${item.quantity}</span><br>
        <span>Subtotal: ${item.total.toLocaleString()}₫</span>
      `;
  
      cartItemsDiv.appendChild(itemDiv);
    });
  
    // Hiển thị tổng hợp thông tin (subtotal, VAT, shipping, total)
    const summary = orderDetails.summary;
    document.getElementById("subtotal").textContent = summary.subtotal.toLocaleString() + "₫";
    document.getElementById("vat").textContent = summary.vat.toLocaleString() + "₫";
    document.getElementById("shipping").textContent = summary.shipping.toLocaleString() + "₫";
    document.getElementById("total").textContent = summary.total.toLocaleString() + "₫";
  });

  document.getElementById('confirm-btn').addEventListener('click', function() {
    // Lấy giá trị của tất cả các trường
    var buyerName = document.getElementById('buyer-name').value;
    var buyerPhone = document.getElementById('buyer-phone').value;
    var buyerEmail = document.getElementById('buyer-email').value;
    var buyerAddress = document.getElementById('buyer-address').value;
    var receiverName = document.getElementById('receiver-name').value;
    var receiverPhone = document.getElementById('receiver-phone').value;
    var receiverAddress = document.getElementById('receiver-address').value;
    var deliveryDate = document.getElementById('delivery-date').value;

    // Kiểm tra xem tất cả các trường có được điền đầy đủ không
    if (buyerName && buyerPhone && buyerEmail && buyerAddress && receiverName && receiverPhone && receiverAddress && deliveryDate) {
        // Hiển thị thông báo thành công
        document.getElementById('success-message').style.display = 'block';
    } else {
        alert('Please fill in all information.');
    }
});