# 01 - Tanpa Module (Global Scope Collision)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami bahaya pencemaran ruang lingkup global (*global scope pollution*) saat memuat banyak file JavaScript tanpa sistem modul.
> * **Kapan Digunakan**: Sebagai studi kasus historis mengapa ES Modules diciptakan dan distandarkan untuk JavaScript modern.
> * **Aturan Praktis**: Hindari mendeklarasikan variabel di scope global; selalu gunakan modul modern dengan atribut `type="module"`.

## 1. 🎯 Tujuan Belajar
- Mengetahui masalah tabrakan variabel (*name collision*) ketika tidak menggunakan JavaScript Modules.
- Memahami mengapa JavaScript modern membutuhkan sistem module native yang terisolasi.
- Mengamati bagaimana variabel global dari file berbeda saling menimpa satu sama lain.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **papan tulis bersama di ruang publik**: Jika dua orang menulis catatan di papan tulis yang sama tanpa sekat kotak batas (`var name`), tulisan orang kedua akan langsung menimpa dan menghapus catatan orang pertama tanpa memunculkan peringatan.

Sebelum ES6 Modules diperkenalkan, memuat beberapa file JavaScript di HTML menggunakan tag `<script>` biasa akan menempatkan seluruh variabel dan fungsi ke dalam satu ruang lingkup global (`window`):
1. **Global Scope Pollution**: Semua variabel `var` atau function declaration menjadi properti objek `window`.
2. **Name Collision (Tabrakan Nama)**: Jika file `first.js` dan file `second.js` sama-sama memiliki variabel `name`, file yang dimuat belakangan akan menimpa nilai file sebelumnya secara diam-diam (*silent overwrite*).
3. **Sulit Di-maintain**: Dalam proyek besar dengan puluhan file script, developer tidak bisa mengetahui dari file mana suatu variabel global berasal.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// first.js
var name = 'Joko';

function sayHello() {
  console.log(`Halo, nama saya ${name} dari first.js`);
}

// second.js
var name = 'Budi'; // Menimpa variabel di global scope yang dideklarasikan oleh first.js!

function sayHello() {
  console.log(`Halo, nama saya ${name} dari second.js`);
}

sayHello(); // Output: Halo, nama saya Budi dari second.js (fungsi first.js tertimpa!)
```

---

## 4. 🖥️ Output yang Diharapkan
```text
Halo, nama saya Budi dari second.js
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
Menghindari tabrakan nama library pihak ketiga pada aplikasi web legacy yang memuat banyak script eksternal.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Silent Variable Overwriting**: Perubahan nilai variabel global tidak menghasilkan error, sehingga bug logika sangat sulit dilacak.
* **Ketergantungan Urutan Script Tag**: Jika urutan pemuatan file `<script src="first.js">` dan `<script src="second.js">` dibalik di HTML, perilaku aplikasi bisa berubah total.

### 🌟 Best Practice
* Selalu gunakan JavaScript Modules (`type="module"`) untuk seluruh proyek web modern.
* Jika terpaksa bekerja pada kode warisan (*legacy code*), bungkus kode di dalam IIFE (*Immediately Invoked Function Expression*) untuk menciptakan scope privat lokal.

---

## 6. ✍️ Latihan Mandiri
1. Buat dua file `fileA.js` dan `fileB.js`, deklarasikan variabel `let counter = 0` di kedua file tanpa modul, amati pesan error apa yang muncul di browser console.
2. Tambahkan atribut `type="module"` pada kedua tag `<script>` di HTML dan buktikan bahwa browser mengisolasi kedua file secara independen.

---

## 7. 🧭 Navigasi
- ➡️ **Selanjutnya:** [02 - Export dan Import](../02-export-and-import/README.md)
- 🏠 **Daftar Isi Modul 04:** [README Modul 04](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
