import { cekInputValid } from '../utils/cek-input-valid.js';

export class AlertService {
  constructor() {
    this.errorBox = document.querySelector('#error');
  }

  tampilkanErrorPenjumlahan = (inputs, angka) => {
    const pesanSalah = inputs.reduce((pesan, nilai, index) => {
      if (cekInputValid(angka[index])) {
        return pesan;
      }
      const labelNilai = nilai.trim() === '' ? '(kolom kosong)' : `"${nilai}"`;
      return `${pesan} ${labelNilai} bukan angka!`;
    }, 'Perhatian:');

    if (this.errorBox) {
      this.errorBox.textContent = pesanSalah;
      this.errorBox.classList.remove('hidden');
    }
  };

  sembunyikanError = () => {
    if (this.errorBox) {
      this.errorBox.classList.add('hidden');
    }
  };
}
