import { toggleModal, authenticate } from "./utility.js";

const initModalEventsLogin = () => {    
    document.getElementById("btnLupaPassword").addEventListener("click", (e) => {
        e.preventDefault();
        toggleModal("modalLupaPassword", "open");
    });

    document.getElementById("btnDaftar").addEventListener("click", (e) => {
        e.preventDefault();
        toggleModal("modalDaftar", "open");
    });
}

const initLoginFormAction = () => {
    const loginForm = document.getElementById("loginForm");
    
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        sessionStorage.clear();

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        const user = authenticate(email, password);
        if (user) {
            sessionStorage.setItem("user", user.nama);

            window.location.href = "dashboard.html";
        } else {
            loginForm.email.value = '';
            loginForm.password.value = '';
            
            toggleModal("modalGagalLogin", "open");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initModalEventsLogin();
    initLoginFormAction();
});