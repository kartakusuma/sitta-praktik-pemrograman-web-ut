import { dataTracking } from '../data/data.js';
import { toggleModal } from './utility.js';

const trackingResult = document.querySelector('.tracking-result');

const renderDataTracking = (nomorDO) => {
  const data = dataTracking[nomorDO];
  if (!data) {
    setTimeout(() => {
      showTrackingInfoModal("Data pengiriman tidak ditemukan.");
    }, 250);

    return;
  }

  document.getElementById('ui-status').textContent = data.status;
  document.getElementById('ui-nomorDO').textContent = data.nomorDO;
  document.getElementById('ui-nama').textContent = data.nama;
  document.getElementById('ui-ekspedisi').textContent = data.ekspedisi;
  document.getElementById('ui-tanggal').textContent = data.tanggalKirim;
  document.getElementById('ui-paket').textContent = data.paket;
  document.getElementById('ui-total').textContent = data.total;

  const timelineElement = document.getElementById('ui-timeline');
  const riwayatPerjalanan = [...data.perjalanan].reverse();
  timelineElement.innerHTML = '';

  riwayatPerjalanan.forEach(item => {
    const li = document.createElement('li');
    li.className = 'timeline-item';

    li.innerHTML = `
        <div class="timeline-time">${item.waktu}</div>
        <div class="timeline-desc">${item.keterangan}</div>
      `;

    timelineElement.appendChild(li);
  });

  trackingResult.classList.add('show');
}

const initTrackingFeature = () => {
  const btnTracking = document.getElementById('btnTracking');
  btnTracking.addEventListener('click', () => {
    trackingResult.classList.remove('show');

    const trackingNumberInput = document.getElementById('trackingNumber');
    const trackingNumber = trackingNumberInput.value.trim();
    if (trackingNumber === '') {
      setTimeout(() => {
        showTrackingInfoModal("Nomor delivery order harus diisi!");
      }, 250);

      return;
    }

    renderDataTracking(trackingNumber);
  });
}

const showTrackingInfoModal = (message) => {
  const trackingMessage = document.getElementById("trackingMessage");
  trackingMessage.innerText = message;

  toggleModal("modalTracking", "open");
}

document.addEventListener('DOMContentLoaded', () => {
  initTrackingFeature();
});
