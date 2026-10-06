export class CalculatorService {
  constructor() {
    this.operand1 = document.querySelector('#operand1');
    this.operand2 = document.querySelector('#operand2');
    this.tombolTambah = document.querySelector('#tombol-tambah');
    this.hasil = document.querySelector('#hasil');
  }

  getInput = () => {
    return [this.operand1.value, this.operand2.value];
  };

  setResult = (angka1, angka2) => {
    if (angka1 === '' || angka2 === '') {
      this.hasil.textContent = '-';
      return;
    }

    // Mengatasi masalah presisi pecahan desimal di JavaScript (misal 0.1 + 0.2)
    const total = Number((angka1 + angka2).toFixed(6));
    this.hasil.textContent = String(total);
  };

  onClick = (callback) => {
    if (this.tombolTambah) {
      this.tombolTambah.addEventListener('click', callback);
    }
  };

  onEnter = (callback) => {
    const handleKey = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        callback();
      }
    };

    if (this.operand1) this.operand1.addEventListener('keydown', handleKey);
    if (this.operand2) this.operand2.addEventListener('keydown', handleKey);
  };
}
