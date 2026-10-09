# 02 - Export dan Import (ES Modules)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Berbagi dan mengonsumsi variabel, konstanta, fungsi, dan class antar-file JavaScript menggunakan kata kunci standar `export` dan `import`.
> - **Kapan Digunakan**: Mengorganisasi kode proyek menjadi komponen-komponen mandiri, modular, dan dapat digunakan kembali (_reusable_).
> - **Aturan Praktis**: Gunakan kurung kurawal `{ namaItem }` untuk mengimpor _Named Exports_, sertakan relative path lengkap dengan ekstensi file (misal `./say.js`), dan gunakan atribut `type="module"` pada HTML.

---

## 1. 🎯 Tujuan Belajar

- Menguasai teknik **Named Export** langsung pada baris deklarasi (`export const / function`).
- Menguasai teknik **Export Clause** terpisah di bagian akhir file (`export { a, b }`).
- Menguasai teknik **Named Import** menggunakan kurung kurawal `{ ... }`.
- Memahami aturan spesifikasi path file relatif (`./` dan `../`) serta ekstensi wajib `.js`.
- Memahami implementasi atribut `type="module"` pada browser.
- Mengetahui bahwa setiap ES Module berjalan dalam **Strict Mode** secara otomatis.
- Mengetahui perilaku nilai top-level **`this`** di dalam modul bernilai `undefined`.
- Memahami kebijakan keamanan **CORS** di browser saat menjalankan modul tanpa web server.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **sistem perdagangan ekspor dan impor antarnegara**: Setiap negara memiliki kedaulatan wilayah tertutup (_file scope_). Suatu komoditas hanya dapat keluar dari negara asal jika telah diberi stempel lisensi resmi (`export const beras`). Negara tetangga yang ingin menggunakannya harus membuat formulir permohonan resmi (`import { beras } from 'negaraA'`). Barang yang tidak diekspor tetap menjadi rahasia internal negara asal.

---

### 1. Tabel Ringkasan Fitur Export dan Import (Cheat-Sheet)

| Fitur / Sintaks          | Contoh Kode                      | Peran / Dampak                  | Karakteristik Utama                                       |
| :----------------------- | :------------------------------- | :------------------------------ | :-------------------------------------------------------- |
| **Inline Named Export**  | `export function run() {}`       | Mengekspor saat deklarasi       | Nama ekspor terikat langsung pada nama fungsi/variabel.   |
| **Clause Named Export**  | `export { run, stop };`          | Mengekspor daftar variabel      | Memisahkan logika definisi dengan deklarasi ekspor.       |
| **Named Import**         | `import { run } from './app.js'` | Mengimpor komponen tertentu     | Nama di dalam `{}` harus cocok persis dengan nama ekspor. |
| **Strict Mode Otomatis** | `"use strict"` bawaan            | Mencegah bug deklarasi variabel | Variabel tanpa `let`/`const`/`var` langsung error.        |
| **Top-Level `this`**     | `console.log(this)`              | Menghasilkan `undefined`        | Tidak mengikat ke objek `window` atau `global`.           |
| **Module Tag (HTML)**    | `<script type="module">`         | Mengaktifkan parser ESM         | Kode di-defer otomatis hingga parsing DOM selesai.        |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja export dan import beserta skenario kasusnya:

---

#### 1. Sintaks Inline Named Export

Anda dapat menambahkan kata kunci `export` tepat sebelum deklarasi `const`, `let`, `function`, atau `class`:

```javascript
// math.js
export const PI = 3.14159;

export function luasLingkaran(r) {
  return PI * r * r;
}
```

---

#### 2. Sintaks Klausa Ekspor Terpisah (_Export Clause_)

Anda dapat mendefinisikan fungsi secara privat terlebih dahulu, lalu mengekspornya di bagian akhir file:

```javascript
// util.js
function enkripsi(teks) {
  return Buffer.from(teks).toString("base64");
}
function dekripsi(kode) {
  return Buffer.from(kode, "base64").toString();
}

// Diekspor sekaligus dalam satu blok:
export { enkripsi, dekripsi };
```

---

#### 3. Sintaks Named Import

Untuk menggunakan item yang diekspor, sebutkan nama-namanya di dalam kurung kurawal `{}`:

```javascript
// app.js
import { PI, luasLingkaran } from "./math.js";

console.log(luasLingkaran(7)); // Menghitung luas lingkaran
```

---

#### 4. Aturan Penulisan Path File (Relatif & Wajib Ekstensi)

Pada standar ECMAScript asli (khususnya di browser), path wajib menyertakan `./` atau `../` dan diakhiri dengan ekstensi `.js`:

```javascript
// ✅ BENAR (Standar Native ES Modules):
import { sayHello } from "./say.js";
import { formatData } from "../utils/helper.js";

// ❌ SALAH (Browser akan menolak tanpa build tool):
// import { sayHello } from "say";
// import { sayHello } from "./say";
```

---

#### 5. Atribut `<script type="module">` di HTML

Untuk memuat berkas modul utama di browser, tambahkan atribut `type="module"`:

```html
<!-- Otomatis di-defer dan berjalan dalam lingkungan modul terisolasi -->
<script type="module" src="./example.js"></script>
```

---

#### 6. Strict Mode Otomatis di Dalam Modul

Semua kode di dalam ES Module secara otomatis berjalan di bawah aturan `"use strict"`. Anda tidak perlu menuliskan `"use strict"` secara manual:

```javascript
// Di dalam file modul (.js dengan type="module"):
angka = 10;
// 💥 ReferenceError: angka is not defined (Strict mode mencegah kebocoran variabel global)
```

---

#### 7. Perilaku Top-Level `this`

Di script biasa, `this` di tingkat teratas menunjuk ke objek global (`window` di browser). Di dalam ES Module, nilainya selalu `undefined`:

```javascript
console.log(this); // undefined
```

---

#### 8. Kebijakan Keamanan CORS pada Browser

Browser memblokir pemuatan modul lewat protokol file lokal (`file:///C:/proyek/index.html`) demi mencegah eksploitasi keamanan _cross-origin_:

```text
Access to script at 'file:///.../say.js' from origin 'null' has been blocked by CORS policy.
```

> **Solusi**: Selalu jalankan file melalui server HTTP lokal (misal: ekstensi Live Server VS Code, Vite, atau perintah `npx serve .`).

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep import-export di atas—mulai dari pemanggilan named export, pengeksporan via export clause, verifikasi strict mode otomatis, hingga pembuktian top-level `this` bernilai `undefined`—telah dirangkum dalam script laboratorium terpadu:

📁 File: [`example.js`](./example.js) & [`say.js`](./say.js)

```bash
# Jalankan langsung dari terminal:
node 04-modules/02-export-and-import/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Modul Layanan API**: Memisahkan request jaringan ke dalam `api.js` (`export function fetchProducts() { ... }`).
2. **Modul Format & Validasi**: Membuat `formatter.js` (`export function formatRupiah() { ... }`) yang dipakai di seluruh modul checkout dan invoice.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Lupa Ekstensi `.js`**: Menulis `import { a } from './utils'` tanpa ekstensi `.js` sering menyebabkan error 404 saat dijalankan langsung di browser modern.
- **Membuka HTML Langsung via File Explorer**: Menghasilkan error CORS. Gunakan web server lokal.
- **Nama Import Tidak Cocok**: Menulis `import { sayhello }` padahal yang diekspor adalah `sayHello` (bersifat _case-sensitive_).

### 🌟 Best Practice

- Kelompokkan ekspor fungsi-fungsi terkait dalam satu modul tematik (misal: utilitas tanggal, utilitas matematika).
- Jangan mengekspor variabel atau fungsi yang hanya menjadi helper internal modul tersebut.

---

## 5. ✍️ Latihan Mandiri

1. Buat file `kalkulator.js` yang mengekspor fungsi `tambah(a, b)` dan `kurang(a, b)`.
2. Impor kedua fungsi tersebut di `example.js`, jalankan menggunakan terminal Node.js, dan pastikan outputnya sesuai.
3. Coba hapus ekstensi `.js` pada path import di lingkungan browser dan amati pesan error network yang muncul.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [01 - Tanpa Module](../01-without-module/README.md)
- ➡️ **Selanjutnya:** [03 - Variable dan Class di Module](../03-variables-and-classes/README.md)
- 🏠 **Daftar Isi Modul 04:** [README Modul 04](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
