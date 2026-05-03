import { toggleModal } from "./utility.js";

const initModalEventsDashboard = () => {
    document.getElementById("menuInformasiBahanAjar").addEventListener("click", () => {
        window.location.href = "stok.html";
    });

    document.getElementById("menuTrackingPengiriman").addEventListener("click", () => {
        window.location.href = "tracking.html";
    });
    
    document.getElementById("menuLaporan").addEventListener("click", () => {
        toggleModal("modalMenuLaporan", "open");
    });
    
    document.getElementById("menuLaporan").addEventListener("click", () => {
        toggleModal("modalMenuLaporan", "open");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initModalEventsDashboard();
});