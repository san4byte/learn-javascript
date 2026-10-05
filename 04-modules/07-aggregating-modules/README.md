# 07 - Aggregating Modules (Re-Export / Barrel Pattern)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Mengumpulkan dan mengekspor ulang (*re-export*) beberapa modul terpisah melalui satu titik masuk tunggal (*barrel file*).
> * **Kapan Digunakan**: Menyederhanakan struktur import bagi konsumen folder modul sehingga path import tidak berceceran.
> * **Aturan Praktis**: Gunakan sintaks `export { nama } from './file.js'` di dalam berkas index penampung.

## 1. 🎯 Tujuan Belajar
- Memahami konsep agregasi module (re-export) menggunakan `export { ... } from '...'`.
- Menyederhanakan titik masuk modul menggunakan *Barrel File Pattern* (`index.js`).
- Membuat arsitektur struktur folder modul yang bersih dan modular.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **meja resepsionis di lobi gedung perkantoran**: Pengunjung luar tidak perlu repot naik turun tangga mencari ruangan terpisah di lantai 2, 3, dan 4. Pengunjung cukup mendatangi meja resepsionis di lantai 1 (`index.js`), dan staf resepsionis langsung menghubungkan ke semua departemen yang dituju.

Dalam aplikasi berskala besar, kode dipecah ke dalam banyak file kecil:
1. **Masalah Import Berceceran**: Tanpa agregasi, file lain harus menulis 5 baris import dari file-file yang berbeda:
   `import { user } from "./user.js";`
   `import { auth } from "./auth.js";`
2. **Re-Exporting**: Kita bisa mengekspor ulang entitas dari file lain tanpa harus mengimpornya terlebih dahulu ke variabel lokal:
   `export { user } from "./user.js";`
3. **Barrel File (`index.js`)**: Pola desain standar di industri di mana folder menyediakan satu file `index.js` sebagai pintu gerbang resmi seluruh modul di folder tersebut.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// user.js
export const user = 'Joko Santoso';

// auth.js
export const isAuthenticated = true;

// index.js (Pintu Masuk Agregasi / Barrel File)
export { user } from './user.js';
export { isAuthenticated } from './auth.js';

// example.js
// Konsumen cukup mengimpor dari satu file pintu masuk index.js
import { user, isAuthenticated } from './index.js';

console.log(`User: ${user}, Logged In: ${isAuthenticated}`);
```

---

## 4. 🖥️ Output yang Diharapkan
```text
User: Joko Santoso, Logged In: true
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
Titik masuk paket pustaka npm, atau folder `components/` yang mengekspor puluhan elemen UI (Button, Modal, Navbar, Footer) dari satu pintu `components/index.js`.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Circular Dependency Loop**: Hati-hati saat mere-export antar modul yang saling mereferensikan satu sama lain secara melingkar, karena dapat menghasilkan nilai `undefined` saat runtime.
* **Performa Bundle**: Menaruh terlalu banyak re-export berat di satu barrel file raksasa dapat memperlambat loading jika bundler tidak mengaktifkan optimasi tree-shaking.

### 🌟 Best Practice
* Gunakan pola Barrel File (`index.js`) untuk merapikan public interface suatu folder paket modul.
* Jaga agar file agregasi hanya berisi perintah re-export tanpa menambahkan logika operasional berat di dalamnya.

---

## 6. ✍️ Latihan Mandiri
1. Buat folder `layanan` berisi file `email.js` (fungsi `kirimEmail`) dan `sms.js` (fungsi `kirimSMS`).
2. Buat file `layanan/index.js` yang mere-export kedua fungsi tersebut.
3. Impor kedua fungsi dalam satu baris import di `main.js`.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [06 - Module Object](../06-module-object/README.md)
- ➡️ **Selanjutnya:** [08 - Dynamic Module Loading](../08-dynamic-module-loading/README.md)
- 🏠 **Daftar Isi Modul 04:** [README Modul 04](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
