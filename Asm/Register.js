// Lấy các thành phần từ form
const inputUsernameRegister = document.querySelector("#register-email");
const inputPasswordRegister = document.querySelector("#register-password");
const btnRegister = document.querySelector("button[type='submit']");

// Xử lý sự kiện click vào nút đăng ký
btnRegister.addEventListener("click", (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form

    // Kiểm tra xem các trường có để trống không
    if (inputUsernameRegister.value === "" || inputPasswordRegister.value === "") {
        alert("Please enter email and password!");
    } else {
        // Tạo đối tượng user
        const user = {
            email: inputUsernameRegister.value,
            password: inputPasswordRegister.value,
        };

        // Lưu dữ liệu vào Local Storage
        let json = JSON.stringify(user);
        localStorage.setItem(inputUsernameRegister.value, json);

        // Hiển thị thông báo và chuyển hướng
        alert("Registration Successful!");
        window.location.href = "login.html"; // Chuyển đến trang đăng nhập
    }
});
