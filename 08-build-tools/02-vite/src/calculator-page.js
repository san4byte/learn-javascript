import { AlertService } from './services/alert.service.js';
import { CalculatorService } from './services/calculator.service.js';
import { cekInputValid } from './utils/cek-input-valid.js';
import { parseInput } from './utils/parse-input.js';

const alert = new AlertService();
const calculator = new CalculatorService();

alert.sembunyikanError();

// Fungsi perhitungan terpadu
const hitungPenjumlahan = () => {
  alert.sembunyikanError();

  const inpString = calculator.getInput();
  const inpNumber = parseInput(...inpString);

  if (cekInputValid(...inpNumber)) {
    const [angka1, angka2] = inpNumber;
    calculator.setResult(angka1, angka2);
  } else {
    calculator.setResult('', '');
    alert.tampilkanErrorPenjumlahan(inpString, inpNumber);
  }
};

// Listener klik tombol
calculator.onClick(hitungPenjumlahan);

// Listener tombol Enter di keyboard
calculator.onEnter(hitungPenjumlahan);
