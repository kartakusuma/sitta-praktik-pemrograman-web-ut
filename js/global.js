import { toggleModal } from "./utility.js";

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".modal .close-btn, .close-modal-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-target");
            toggleModal(target, "close");
        })
    })
})
