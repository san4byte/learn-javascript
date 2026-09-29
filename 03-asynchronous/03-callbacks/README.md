# 03 - Callbacks dan Masalah Callback Hell

## 1. 🎯 Tujuan Belajar
- Memahami konsep Callback sebagai fungsi yang dijadikan argumen fungsi lain.
- Memahami perbedaan Synchronous Callback dan Asynchronous Callback.
- Memahami masalah Callback Hell (Pyramid of Doom) saat menangani operasi bertingkat.
- Mengetahui mengapa industri beralih dari Callback ke Promise.

---

## 2. 📖 Penjelasan Konsep
**Callback** adalah fungsi yang dilewatkan (*passed*) sebagai argumen ke dalam fungsi lain, untuk kemudian dipanggil (*called back*) pada waktu tertentu.

### Dua Jenis Callback:
1. **Synchronous Callback**: Langsung dieksekusi seketika saat fungsi pemanggil berjalan (contoh: callback pada `array.map()` atau `array.forEach()`).
2. **Asynchronous Callback**: Dieksekusi setelah operasi asynchronous selesai (contoh: callback pada event listener, timer, atau pembacaan file).

### 🌋 Masalah Callback Hell (Pyramid of Doom)
Sebelum era ES6, ketika kita harus melakukan beberapa tugas asinkron yang saling bergantung secara berurutan (misal: Login -> Ambil Profil -> Ambil Daftar Belanja -> Ambil Rincian Pembayaran), kode akan bersarang (*nested*) ke dalam membentuk piramida horizontal yang sangat sulit dibaca dan rentan bug error handling.

---

## 3. 💻 Contoh Kode (`contoh.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Asynchronous Callback Dasar ---");
function ambilDataPengguna(id, callbackSukses, callbackGagal) {
  setTimeout(() => {
    if (id > 0) {
      callbackSukses({ id: id, nama: "Joko Santoso", email: "joko@example.com" });
    } else {
      callbackGagal(new Error("ID pengguna tidak valid!"));
    }
  }, 200);
}

ambilDataPengguna(1, 
  (user) => console.log("Berhasil ambil user:", user.nama),
  (err) => console.error("Gagal:", err.message)
);

console.log("\n--- 2. Ilustrasi Callback Hell (Pyramid of Doom) ---");
// Simulasi proses berantai zaman dulu (sebelum ada Promise):
function ambilPesanan(userId, callback) {
  setTimeout(() => callback(["Order #101", "Order #102"]), 200);
}

function ambilDetailOrder(orderId, callback) {
  setTimeout(() => callback({ orderId, status: "Terkirim", kurir: "JNE" }), 200);
}

// Nested Callback bertingkat:
ambilDataPengguna(1, (user) => {
  console.log(`[Piramida Step 1] User didapat: ${user.nama}`);
  
  ambilPesanan(user.id, (daftarOrder) => {
    console.log(`[Piramida Step 2] Jumlah pesanan: ${daftarOrder.length}`);
    
    ambilDetailOrder(daftarOrder[0], (detail) => {
      console.log(`[Piramida Step 3] Status pesanan pertama: ${detail.status}`);
      // Jika butuh 5 langkah lagi, kode akan menjorok sangat jauh ke kanan!
    }, (err) => console.error(err));
  }, (err) => console.error(err));
}, (err) => console.error(err));
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Asynchronous Callback Dasar ---

--- 2. Ilustrasi Callback Hell (Pyramid of Doom) ---
Berhasil ambil user: Joko Santoso
[Piramida Step 1] User didapat: Joko Santoso
[Piramida Step 2] Jumlah pesanan: 2
[Piramida Step 3] Status pesanan pertama: Terkirim
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> Callback seperti **meninggalkan nomor telepon Anda di resepsionis restoran**: Anda tidak perlu berdiri mematung di depan pintu (non-blocking). Begitu meja kosong tersedia, resepsionis akan menelepon Anda kembali (*calling back*). Sedangkan **Callback Hell** seperti Anda harus menelepon resepsionis restoran, yang kemudian menyuruh Anda menelepon koki, yang menyuruh Anda menelepon tukang pasar, saling bersarang tanpa henti.

### 🏢 Real-World Use Case
1. **Node.js Legacy APIs**: Banyak library lama Node.js (seperti modul `fs.readFile(path, (err, data) => {})`) menggunakan pola *error-first callback*.
2. **Event Handling**: `button.addEventListener('click', () => {})` adalah implementasi callback asinkron paling populer di browser.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Error Handling Terlupakan**: Pada callback bertingkat, developer sering lupa menangani error di setiap tingkatan, sehingga jika ada request yang gagal di tengah jalan, aplikasi hang tanpa pesan kesalahan.
* **Inversion of Control**: Menyerahkan callback ke library pihak ketiga berarti Anda mempercayakan sepenuhnya eksekusi fungsi Anda kepada mereka (apakah dipanggil 2 kali, atau tidak dipanggil sama sekali).

### 🌟 Best Practice
* Hindari menulis callback bersarang lebih dari 2 tingkat.
* Ubah fungsi berbasis callback menjadi berbasis Promise menggunakan `util.promisify` (di Node.js) atau membungkusnya secara manual dengan `new Promise()`.

---

## 6. ✍️ Latihan Mandiri
1. Buatlah fungsi `cekKetersediaanBarang(namaBarang, callback)` yang mensimulasikan pengecekan stok dengan delay 300ms. Jika barang bernilai 'Laptop', kirim `true` ke callback; jika lainnya, kirim `false`.
2. Panggil fungsi tersebut dan cetak pesan ketersediaannya.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [02 - Timing Events](../02-timing-events/README.md)
- ➡️ **Selanjutnya:** [04 - Promise (Konsep Pending, Fulfilled, Rejected)](../04-promise/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
