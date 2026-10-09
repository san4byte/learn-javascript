/**
 * 01 - Tanpa Module (Global Scope Collision & Module Scope)
 *
 * Demonstrasi masalah historis sebelum ES Modules:
 * 1. Simulasi Name Collision (Tabrakan variabel di scope global)
 * 2. Ketergantungan urutan eksekusi script (Script loading order)
 * 3. Pola solusi era pra-ESM: IIFE (Immediately Invoked Function Expression)
 * 4. Pola solusi era pra-ESM: Namespace Object Pattern
 * 5. Isolasi Module Scope di era modern (Setiap file adalah pulau terisolasi)
 */

console.log('=== 1. Simulasi Name Collision di Scope Global ===');
// Sebelum ES Module, dua script yang dimuat di HTML membagikan ruang lingkup global:
const globalScopeSimulasi = {};

// Script 1 (first.js) dieksekusi:
globalScopeSimulasi.pengguna = 'Joko Santoso';
globalScopeSimulasi.sapa = function () {
  return `Halo dari first.js, nama saya ${globalScopeSimulasi.pengguna}`;
};
console.log('Setelah first.js dimuat :');
console.log('- Pengguna:', globalScopeSimulasi.pengguna);
console.log('- Sapa    :', globalScopeSimulasi.sapa());

// Script 2 (second.js) dimuat dan secara tidak sengaja memakai nama variabel yang sama:
globalScopeSimulasi.pengguna = 'Budi Hartono'; // Overwrite tanpa peringatan!
globalScopeSimulasi.sapa = function () {
  return `Halo dari second.js, nama saya ${globalScopeSimulasi.pengguna}`;
};

console.log('\nSetelah second.js dimuat (terjadi overwrite):');
console.log('- Pengguna:', globalScopeSimulasi.pengguna); // "Budi Hartono" (Joko tertimpa!)
console.log('- Sapa    :', globalScopeSimulasi.sapa()); // Logika first.js hilang tertimpa!
console.log();

console.log('=== 2. Solusi Era Klasik: IIFE Pattern ===');
// Developer era pra-ESM membungkus kode dalam IIFE untuk menciptakan scope privat
const ModulA = (function () {
  const privateName = 'Data Rahasia Modul A';
  return {
    getName: () => privateName,
  };
})();

const ModulB = (function () {
  const privateName = 'Data Rahasia Modul B'; // Aman! Tidak bentrok dengan privateName Modul A
  return {
    getName: () => privateName,
  };
})();

console.log('Modul A:', ModulA.getName());
console.log('Modul B:', ModulB.getName());
console.log();

console.log('=== 3. Solusi Era Klasik: Namespace Object Pattern ===');
// Membungkus seluruh aplikasi ke dalam 1 root namespace global
const MyShopApp = {};

MyShopApp.User = {
  nama: 'Joko',
  getProfil: () => 'Profil Joko',
};

MyShopApp.Cart = {
  items: ['Buku JS', 'Mouse'],
  hitungTotal: () => 2,
};

console.log('Namespace App User:', MyShopApp.User.getProfil());
console.log('Namespace App Cart:', MyShopApp.Cart.hitungTotal(), 'barang');
console.log();

console.log('=== 4. Isolasi Module Scope Modern ===');
console.log("Di era modern ES Modules (<script type='module'>):");
console.log('- Setiap file memiliki top-level scope terisolasi otomatis.');
console.log("- Variabel 'const nama' di fileA tidak pernah mencemari fileB.");
console.log(
  '- Hanya data yang diekspor eksplisit (export) yang bisa diakses (import).',
);
