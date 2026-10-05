// Nullish Coalescing, Optional Chaining, Strict Mode & Debugger
'use strict'; // Mengaktifkan strict mode untuk mencegah penulisan kode sembarangan

// 1. Optional Chaining (?.)
const user = {
  profile: {
    name: 'Joko',
    address: {
      city: 'Jakarta'
    }
  }
};

// Mengakses properti bersarang tanpa khawatir error TypeError
console.log('Kota user:', user?.profile?.address?.city); // Jakarta
console.log('Kode pos :', user?.profile?.contact?.zipCode); // undefined (tidak crash!)

// 2. Nullish Coalescing Operator (??)
// Hanya mengevaluasi fallback jika nilainya null atau undefined (bukan 0 atau "")
let jumlahPengunjung = 0;

// Menggunakan OR (||): 0 dianggap falsy, sehingga keliru memilih default!
const hasilOR = jumlahPengunjung || 10;
console.log('Hasil dengan || (keliru) :', hasilOR); // 10

// Menggunakan Nullish Coalescing (??): 0 dipertahankan karena bukan null/undefined
const hasilNullish = jumlahPengunjung ?? 10;
console.log('Hasil dengan ?? (benar)  :', hasilNullish); // 0

// 3. Debugger Statement
function hitungTotal(harga, kuantitas) {
  // debugger; // Uncomment saat debugging di Chrome DevTools / VS Code Debugger
  return harga * kuantitas;
}

console.log('Total belanja:', hitungTotal(15000, 3));
