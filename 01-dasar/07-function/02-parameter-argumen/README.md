# 07.2 - Parameter, Argumen, Default Parameter & Arguments Object

## 1. 🎯 Tujuan Belajar
- Memahami perbedaan konsep antara Parameter (definisi) dan Argumen (nilai riil).
- Menggunakan Default Parameter (ES6) untuk mencegah nilai `undefined`.
- Memahami objek semu `arguments` pada fungsi tradisional.

---

## 2. 📖 Penjelasan Konsep
Seringkali istilah parameter dan argumen dianggap sama, padahal keduanya memiliki perbedaan konseptual:
* **Parameter**: Variabel penampung yang dituliskan di dalam tanda kurung saat fungsi **didefinisikan**.
* **Argumen**: Nilai data nyata yang dikirimkan saat fungsi **dipanggil**.

### Fitur Parameter Modern:
1. **Default Parameter (ES6)**: Menentukan nilai bawaan jika argumen tidak diberikan atau bernilai `undefined`.
   ```javascript
   function salam(nama = "Tamu") { ... }
   ```
2. **Objek `arguments` (ES5 Legacy)**: Variabel lokal di dalam fungsi biasa (*bukan arrow function*) yang menampung seluruh argumen yang dikirim dalam bentuk *array-like object*.

---

## 3. 💻 Contoh Kode (`contoh.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Default Parameter (Mencegah Nilai Undefined) ---");
function buatPesananKopi(jenisKopi = "Americano", ukuran = "Regular", gula = false) {
  return `Pesanan: Kopi ${jenisKopi} | Ukuran: ${ukuran} | Tambah Gula: ${gula ? "Ya" : "Tidak"}`;
}

// Memanggil tanpa argumen (menggunakan default penuh)
console.log(buatPesananKopi());

// Memanggil dengan argumen spesifik
console.log(buatPesananKopi("Latte", "Large", true));

console.log("\n--- 2. Objek 'arguments' (Argumen Dinamis Tradisional) ---");
function jumlahkanSemuaAngka() {
  let total = 0;
  // arguments adalah array-like object yang menampung semua argumen
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

console.log("Jumlah 2 angka :", jumlahkanSemuaAngka(10, 20));
console.log("Jumlah 5 angka :", jumlahkanSemuaAngka(5, 10, 15, 20, 25));
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Default Parameter (Mencegah Nilai Undefined) ---
Pesanan: Kopi Americano | Ukuran: Regular | Tambah Gula: Tidak
Pesanan: Kopi Latte | Ukuran: Large | Tambah Gula: Ya

--- 2. Objek 'arguments' (Argumen Dinamis Tradisional) ---
Jumlah 2 angka : 30
Jumlah 5 angka : 75
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> Parameter seperti **slot lubang koin di mesin vending**: mesin dirancang memiliki slot koin ukuran 500 dan 1000. Argumen adalah **koin fisik uang rupiah** yang dimasukkan oleh pembeli ke dalam slot tersebut.

### 🏢 Real-World Use Case
1. **Konfigurasi API Client**: Fungsi `fetchData(endpoint, options = { method: 'GET' })` menyetel method default ke 'GET' jika user tidak mengisinya.
2. **Kalkulator Diskon Bertingkat**: Mengirimkan berapapun jumlah voucher diskon yang dimiliki pengguna.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Objek `arguments` Bukanlah Array Asli**: Objek `arguments` tidak memiliki method array seperti `.map()`, `.filter()`, atau `.forEach()`. Di JavaScript modern, lebih disarankan menggunakan **Rest Parameter (`...args`)**.

### 🌟 Best Practice
* Gunakan Default Parameter daripada menulis logika manual `nama = nama || 'Default'`.
* Batasi jumlah parameter dalam satu fungsi maksimal 3 atau 4 parameter. Jika membutuhkan lebih dari itu, bungkus ke dalam satu objek konfigurasi (*Options Object*).

---

## 6. ✍️ Latihan Mandiri
1. Buatlah fungsi `hitungTotalHarga(harga, pajak = 0.11, ongkir = 10000)` yang menghitung total pembayaran belanja.
2. Uji fungsi tersebut dengan hanya memasukkan argumen harga `200000`.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [07.1 - Pengenalan Function](../01-intro/README.md)
- ➡️ **Selanjutnya:** [07.3 - Variable Scope](../03-scope/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
