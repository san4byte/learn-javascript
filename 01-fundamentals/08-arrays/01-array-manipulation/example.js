// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Operasi di Ujung Array (push, pop, shift, unshift) ---");
const antreanKlinik = ["Budi", "Siti"];

// Menambah pasien di akhir antrean
antreanKlinik.push("Joko");
console.log("Setelah push('Joko')     :", antreanKlinik);

// Pasien pertama dipanggil dokter (dihapus dari awal)
const pasienDipanggil = antreanKlinik.shift();
console.log(`Pasien dipanggil dokter  : ${pasienDipanggil}`);
console.log("Sisa antrean             :", antreanKlinik);

console.log("\n--- 2. Operasi Tengah Array: splice() vs slice() ---");
const daftarKota = ["Jakarta", "Bandung", "Surabaya", "Yogyakarta"];

// slice(1, 3): Mengambil elemen dari index 1 sampai sebelum index 3 (tanpa mutasi)
const kotaPilihan = daftarKota.slice(1, 3);
console.log("Hasil slice(1, 3)        :", kotaPilihan);
console.log("Array asli tetap utuh    :", daftarKota);

// splice(2, 1, 'Semarang'): Di index 2, hapus 1 elemen ('Surabaya'), ganti dengan 'Semarang'
daftarKota.splice(2, 1, "Semarang");
console.log("Setelah splice(2, 1, 'Semarang'):", daftarKota);

console.log("\n--- 3. Pencarian & Penggabungan ---");
console.log("Apakah ada 'Bandung'?    :", daftarKota.includes("Bandung"));
console.log("Format Teks Rapi (join)  :", daftarKota.join(" -> "));
