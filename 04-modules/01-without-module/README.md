# 01 - Tanpa Module (Global Scope Collision & Module Scope)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memahami bahaya pencemaran ruang lingkup global (_global scope pollution_) dan tabrakan variabel (_name collision_) saat memuat file script biasa tanpa sistem modul.
> - **Kapan Digunakan**: Sebagai studi kasus historis fundamental mengapa standar ES Modules (`type="module"`) diciptakan untuk JavaScript modern.
> - **Aturan Praktis**: Hindari meletakkan variabel di scope global; selalu gunakan modularitas modern untuk mengisolasi logika antar file.

---

## 1. 🎯 Tujuan Belajar

- Memahami bahaya pencemaran ruang lingkup global (_Global Scope Pollution_) di JavaScript.
- Mengamati bagaimana tabrakan nama (_Name Collision_) menimpa variabel dan fungsi tanpa memunculkan pesan error (_silent overwrite_).
- Mengetahui kerentanan ketergantungan urutan eksekusi tag `<script>` di dokumen HTML.
- Mengenal solusi historis era pra-ESM: pola **IIFE** (_Immediately Invoked Function Expression_).
- Mengenal solusi historis era pra-ESM: pola **Namespace Object Pattern**.
- Memahami bagaimana **Module Scope** pada JavaScript modern mengisolasi setiap file secara otomatis.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **papan tulis bersama di aula publik tanpa sekat**: Jika dua kelompok orang menulis catatan di papan tulis yang sama tanpa pembatas ruang, tulisan dari kelompok kedua akan langsung menghapus dan menimpa diagram milik kelompok pertama. Sebaliknya, sistem modul ibarat memberikan masing-masing kelompok **buku catatan pribadi dengan sampul tertutup**; mereka hanya membagikan lembaran yang ingin diperlihatkan secara sengaja.

---

### 1. Tabel Ringkasan Masalah vs Solusi Modularitas (Cheat-Sheet)

| Karakteristik / Pola             | Ruang Lingkup (Scope)        | Risiko Tabrakan Nama               | Enkapsulasi Data                 | Standar Digunakan                |
| :------------------------------- | :--------------------------- | :--------------------------------- | :------------------------------- | :------------------------------- |
| **Script Biasa (`<script>`)**    | Global (`window` / `global`) | Sangat Tinggi (_Silent Overwrite_) | Tidak ada (Semua data bocor)     | Legacy Web (Sebelum ES2015).     |
| **IIFE Pattern**                 | Function Closure             | Rendah (Privat di dalam fungsi)    | Manual via return object         | Solusi transisi era jQuery.      |
| **Namespace Pattern**            | Objek Root Tunggal           | Sedang (Tergantung nama root)      | Dikelompokkan dalam properti     | Digunakan library klasik.        |
| **ES Modules (`type="module"`)** | File-Level Module Scope      | Nol (Terisolasi per file)          | Sempurna via `export` & `import` | Standar resmi JavaScript modern. |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap kendala ketiadaan modul beserta teknik mitigasinya:

---

#### 1. Pencemaran Ruang Lingkup Global (_Global Scope Pollution_)

Saat tag `<script>` biasa digunakan di browser, setiap deklarasi `var` atau fungsi otomatis menjadi properti objek global `window`:

```javascript
// first.js dimuat via <script src="first.js">:
var namaAplikasi = "Toko Online";

// Otomatis mencemari objek window:
console.log(window.namaAplikasi); // "Toko Online"
```

---

#### 2. Tabrakan Nama Variabel (_Name Collision / Silent Overwrite_)

Jika file script lain yang dimuat kemudian memiliki variabel bernama sama, file kedua akan menimpa nilai file pertama tanpa error:

```javascript
// second.js dimuat setelah first.js:
var namaAplikasi = "Portal Berita"; // Menimpa variabel di window secara diam-diam!

console.log(window.namaAplikasi); // "Portal Berita" (Nilai dari first.js musnah!)
```

---

#### 3. Ketergantungan Urutan Script Tag di HTML

Logika aplikasi bergantung penuh pada urutan penulisan tag `<script>` di file HTML. Membalik urutan script dapat merusak alur aplikasi seketika:

```html
<!-- Jika urutan dibalik, perilaku fungsi bisa berubah 180 derajat -->
<script src="second.js"></script>
<script src="first.js"></script>
```

---

#### 4. Pola Solusi Era Klasik 1: IIFE Pattern

Sebelum ES6, developer mengisolasi variabel dengan membungkus kode di dalam _Immediately Invoked Function Expression_:

```javascript
const ModulPengguna = (function () {
  const secretKey = "KUNCI-RAHASIA"; // Variabel privat di dalam closure

  return {
    getNama: () => "Joko",
  };
})();

console.log(ModulPengguna.secretKey); // undefined (Aman dari luar!)
```

---

#### 5. Pola Solusi Era Klasik 2: Namespace Object Pattern

Pola ini membatasi pencemaran global dengan hanya membuat 1 objek global induk (_root namespace_):

```javascript
var MyCompanyApp = MyCompanyApp || {};

MyCompanyApp.Auth = {
  login: function () {
    /* ... */
  },
};

MyCompanyApp.Billing = {
  bayar: function () {
    /* ... */
  },
};
```

---

#### 6. Paradigma Modern: Module-Level Scope Isolation

Dengan menambahkan atribut `type="module"`, engine JavaScript memperlakukan setiap file sebagai **pulau terisolasi**. Variabel tingkat atas tidak akan pernah bocor ke `window`:

```html
<script type="module" src="first.js"></script>
<script type="module" src="second.js"></script>
```

```javascript
// first.js (di dalam ES Module)
const user = "Joko"; // Hanya hidup di first.js!
// window.user bernilai undefined
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh simulasi tabrakan ruang lingkup global, teknik IIFE klasik, implementasi namespace pattern, dan isolasi module modern telah dirangkum dalam script laboratorium terpadu:

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 04-modules/01-without-module/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Refactoring Aplikasi Legacy**: Mengidentifikasi variabel global pemicu bug pada website lama dan membungkusnya ke dalam arsitektur modul terisolasi.
2. **Integrasi Script Pihak Ketiga (Third-Party CDN)**: Menghindari tabrakan antara script tracking analitik (seperti Google Analytics / Pixel) dengan variabel internal toko online Anda.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Silent Logic Bugs**: Mengira nilai variabel bernilai A, padahal telah ditimpa oleh file library yang dimuat di bagian bawah HTML.
- **Accidental Global Variables**: Lupa kata kunci deklarasi (`nama = "Joko"`) di dalam script biasa otomatis membuat variabel global di `window`, bahkan jika ditulis di dalam fungsi.

### 🌟 Best Practice

- Selalu sertakan `type="module"` pada tag `<script>` untuk aplikasi web modern.
- Jangan pernah mengandalkan objek `window` untuk berbagi data antar file; gunakan mekanisme resmi `export` dan `import`.

---

## 5. ✍️ Latihan Mandiri

1. Buka file [`index.html`](./index.html) di browser Anda, buka tab Developer Tools Console, dan amati nilai variabel `name` yang tercetak.
2. Tambahkan variabel `let skor = 100` di [`first.js`](./first.js) dan `let skor = 200` di [`second.js`](./second.js), amati pesan error `Identifier 'skor' has already been declared` yang muncul.
3. Ubah kedua tag script di `index.html` menjadi `<script type="module">` dan jelaskan mengapa error tabrakan nama tersebut langsung hilang.

---

## 6. 🧭 Navigasi

- ➡️ **Selanjutnya:** [02 - Export dan Import](../02-export-and-import/README.md)
- 🏠 **Daftar Isi Modul 04:** [README Modul 04](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
