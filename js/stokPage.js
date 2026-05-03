import { dataBahanAjar as _dataBahanAjar } from "../data/data.js";
import { toggleModal, readFileAsBase64 } from "./utility.js"

const dataBahanAjar = [..._dataBahanAjar];

const tableBody = document.getElementById('table-body');

const showDetailBahanAjar = (kodeBarang) => {
    const bahanAjar = dataBahanAjar.find(bahanAjar => bahanAjar.kodeBarang === kodeBarang);

    const imgStok = document.getElementById("imgStok");
    imgStok.innerHTML = `<img src="${bahanAjar.cover}" alt="Bahan Ajar">`;

    const dataStok = document.getElementById("stokInfoValue");
    dataStok.innerHTML = `
        <div class="stok-value">${bahanAjar.kodeBarang}</div>
        <div class="stok-value">${bahanAjar.namaBarang}</div>
        <div class="stok-value">${bahanAjar.jenisBarang}</div>
        <div class="stok-value">Edisi ke-${bahanAjar.edisi}</div>
        <div class="stok-value">${bahanAjar.kodeLokasi}</div>
        <div class="stok-value badge">${bahanAjar.stok}</div>
    `;

    toggleModal("modalDetailBahanAjar", "open");
}

const renderTable = () => {
    tableBody.innerHTML = '';

    dataBahanAjar.forEach((item, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td><strong>${item.kodeBarang}</strong></td>
            <td>${item.namaBarang}</td>
            <td>${item.jenisBarang}</td>
            <td>Edisi ke-${item.edisi}</td>
            <td>${item.kodeLokasi}</td>
            <td class="td-right"><span class="stok-badge">${item.stok}</span></td>
        `;

        const tdAksi = document.createElement('td');

        const actionGroup = document.createElement('div');
        actionGroup.className = 'action-group';

        const btnDetail = document.createElement('a');
        btnDetail.textContent = 'Detail';
        btnDetail.dataset.kodeBarang = item.kodeBarang;

        btnDetail.addEventListener('click', (e) => {            
            e.preventDefault();

            showDetailBahanAjar(e.target.dataset.kodeBarang);
        });

        actionGroup.appendChild(btnDetail);
        tdAksi.appendChild(actionGroup);
        tr.appendChild(tdAksi);

        tableBody.appendChild(tr);
    });
}

const initTambahBahanAjarFormAction = async () => {
    const tambahBahanAjarForm = document.getElementById("tambahBahanAjarForm");

    tambahBahanAjarForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const coverFile = tambahBahanAjarForm.cover.files[0];
            let coverSrc = "";

            if (coverFile) {
                coverSrc = await readFileAsBase64(coverFile);
            }
    
            const bahanAjarBaru = {
                kodeBarang: tambahBahanAjarForm.kodeBarang.value,
                namaBarang: tambahBahanAjarForm.namaBarang.value,
                jenisBarang: tambahBahanAjarForm.jenisBarang.value,
                edisi: tambahBahanAjarForm.edisi.value,
                kodeLokasi: tambahBahanAjarForm.kodeLokasi.value,
                stok: Number(tambahBahanAjarForm.stok.value),
                cover: coverSrc
            };

            dataBahanAjar.push(bahanAjarBaru);
            renderTable();

            tambahBahanAjarForm.reset();
            toggleModal("modalTambahBahanAjar", "close");
        });
}

const batalTambahBahanAjar = () => {
    document.getElementById("tambahBahanAjarForm").reset();

    toggleModal("modalTambahBahanAjar", "close")
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("tambahBahanAjar").addEventListener("click", () => {
        toggleModal("modalTambahBahanAjar", "open");
    });

    document.getElementById("btnBatalTambahBahanAjar").addEventListener("click", batalTambahBahanAjar);

    renderTable();
    initTambahBahanAjarFormAction();
});