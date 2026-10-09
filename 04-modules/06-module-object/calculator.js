// calculator.js - Modul utilitas aritmetika lengkap
export const add = (a, b) => a + b;
export const sub = (a, b) => a - b;
export const mul = (a, b) => a * b;
export const div = (a, b) => (b === 0 ? NaN : a / b);

export const PI = 3.14159;

// Default export yang ikut terkandung di dalam namespace object
export default function infoKalkulator() {
  return 'Kalkulator Aritmetika Standar ES Modules';
}
