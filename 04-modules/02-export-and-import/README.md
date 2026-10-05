# 02 - Export dan Import

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Berbagi fungsi, variabel, dan class antar-file JavaScript menggunakan kata kunci `export` dan `import`.
> * **Kapan Digunakan**: Standar utama memecah kode program menjadi modul-modul independen yang rapi dan dapat digunakan kembali (*reusable*).
> * **Aturan Praktis**: Gunakan atribut `<script type="module">` di HTML dan cantumkan relative path lengkap (misal `./say.js`).

## 1. 🎯 Tujuan Belajar
- Mengetahui cara mengekspor fungsi dan konstanta dengan keyword `export`.
- Mengimpor komponen module menggunakan keyword `import { ... } from './path.js'`.
- Memahami atribut `type="module"` pada tag `<script>` di HTML browser.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **pos pemeriksaan ekspor-impor bea cukai**: Setiap negara (file JavaScript) memiliki wilayah tertutup. Hanya barang yang diberi izin stempel `export` yang boleh dikirim keluar, dan negara tetangga harus mengajukan permohonan resmi `import { barang }` untuk menerimanya.

JavaScript ES6 menghadirkan sistem module resmi (*native ES Modules*):
1. **Scope Terisolasi**: Setiap file modul memiliki cakupan (*scope*) sendiri. Variabel di dalam file modul tidak mencemari objek global `window`.
2. **Keyword `export`**: Menandai fungsi, konstanta, atau class agar tersedia untuk diimpor oleh berkas lain (*Named Export*).
3. **Keyword `import`**: Mengambil komponen yang diekspor menggunakan kurung kurawal `{ namaItem }` dari relative path yang ditentukan.
4. **Atribut `type="module"`**: Memberi tahu browser agar menjalankan file dalam lingkungan modul (otomatis berjalan dalam *Strict Mode* dan di-defer sampai HTML selesai diparsing).

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// say.js
export function sayHello(name) {
  return `Halo, ${name}! Selamat datang di ES Modules.`;
}

export const author = 'JavaScript Developer';

// example.js
import { sayHello, author } from './say.js';

const greeting = sayHello('Joko Santoso');
console.log(greeting);
console.log(`Penulis materi: ${author}`);
```

---

## 4. 🖥️ Output yang Diharapkan
```text
Halo, Joko Santoso! Selamat datang di ES Modules.
Penulis materi: JavaScript Developer
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
Membuat file helper terpisah (seperti `date-helper.js` atau `api.js`) yang dapat digunakan kembali di seluruh halaman aplikasi web.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Error CORS jika dibuka lewat `file:///`**: Browser modern memblokir ES Modules jika dibuka langsung melalui file explorer (`file:///index.html`). Anda wajib menjalankannya lewat web server lokal (seperti ekstensi Live Server VS Code atau `npx serve`).
* **Lupa Ekstensi `.js`**: Pada ES Modules native di browser, path file wajib eksplisit lengkap dengan ekstensinya: `./say.js` (bukan `./say`).

### 🌟 Best Practice
* Selalu tuliskan relative path yang jelas (`./` atau `../`) dan akhiri dengan ekstensi `.js`.
* Jangan mengekspor variabel yang mudah berubah tanpa pembungkus method enkapsulasi.

---

## 6. ✍️ Latihan Mandiri
1. Buat file `kalkulator.js` yang mengekspor fungsi `tambah(a, b)` dan `kurang(a, b)`.
2. Impor kedua fungsi tersebut di `main.js`, jalankan di browser melalui web server lokal, dan tampilkan hasilnya di console.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [01 - Tanpa Module](../01-without-module/README.md)
- ➡️ **Selanjutnya:** [03 - Variable dan Class di Module](../03-variables-and-classes/README.md)
- 🏠 **Daftar Isi Modul 04:** [README Modul 04](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
