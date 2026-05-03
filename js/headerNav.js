import { initSubmenuToggle, getGreeting, toggleModal } from "./utility.js";

const initLogoutFeature = () => {
    document.getElementById("btnLogout").addEventListener("click", (e) => {
        e.preventDefault();

        toggleModal("modalLogout", "open");
    });

    const logoutForm = document.getElementById("logoutForm");

    logoutForm.addEventListener("submit", (e) => {
        e.preventDefault();

        sessionStorage.clear();

        window.location.href = 'index.html';

        toggleModal("modalLogout", "close");
    });
}

const batalLogout = () => {
    toggleModal("modalLogout", "close");
}

document.addEventListener("DOMContentLoaded", () => {
    initLogoutFeature();
    initSubmenuToggle();

    let greeting = getGreeting();

    const user = sessionStorage.getItem("user");
    if (!user) {
        window.location.href = 'index.html';
    }

    const greetingEl = document.getElementById("greeting");
    if (greetingEl) {
        greeting += `, ${user.split(' ')[0]}`;
        greetingEl.innerText = greeting;
    }

    const btnLogout = document.getElementById("btnLogout");
    btnLogout.classList.add("show");

    document.getElementById("btnBatalLogout").addEventListener("click", batalLogout);
});