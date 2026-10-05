// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Inisialisasi BigInt (Literal n vs BigInt()) ---');
const saldoAwal = 9007199254740991n; // Literal n di batas maksimal Number aman
const transferMasuk = BigInt('5000000000000000'); // Dari string angka raksasa
const biayaAdmin = 1000; // Tipe Number biasa

console.log('Saldo Awal              :', saldoAwal);
console.log('Transfer Masuk          :', transferMasuk);
console.log('Biaya Admin (Number)    :', biayaAdmin);

console.log('\n--- 2. Operasi Aritmetika & Konversi Eksplisit ---');
const totalSaldo = saldoAwal + transferMasuk;
console.log('Total Saldo Akumulasi   :', totalSaldo);

// Wajib konversi biayaAdmin dari Number ke BigInt agar tidak melempar TypeError
const saldoSetelahAdmin = totalSaldo - BigInt(biayaAdmin);
console.log('Saldo Setelah Biaya Admin:', saldoSetelahAdmin);

// Pembagian bulat ke 2 rekening (desimal otomatis dibuang)
const saldoBagiDua = saldoSetelahAdmin / 2n;
console.log('Saldo Dibagi Rata (2 Rek):', saldoBagiDua);

console.log('\n--- 3. Inspeksi Tipe Data & Perbandingan Identik ---');
console.log('Tipe data saldoBagiDua  :', typeof saldoBagiDua);
console.log('Apakah identik BigInt?  :', totalSaldo === BigInt(totalSaldo));
