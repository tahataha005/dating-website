const login_container = document.getElementById("login-content")
const signup_container = document.getElementById("signup-content")
const login_content_btn = document.getElementById("login-content-button");
const signup_content_btn = document.getElementById("signup-content-btn");
console.log(login_content_btn);

const registration_content = () => {
    login_container.classList.toggle("hide");
    signup_container.classList.toggle("hide");
}

signup_content_btn.addEventListener("click",registration_content);
login_content_btn.addEventListener("click",registration_content);