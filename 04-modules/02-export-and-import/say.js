// say.js - Modul penyedia utilitas salam dan informasi
// 1. Named export saat deklarasi
export function sayHello(name) {
  return `Halo, ${name}! Selamat datang di ES Modules.`;
}

export const author = 'JavaScript Developer';
export const version = '1.0.0';

// Fungsi internal privat (tidak diekspor)
function createTimestamp() {
  return new Date().toLocaleTimeString('id-ID');
}

// 2. Named export menggunakan export clause di bagian bawah
function sayWithTime(name) {
  return `[${createTimestamp()}] Halo, ${name}!`;
}

export { sayWithTime };
