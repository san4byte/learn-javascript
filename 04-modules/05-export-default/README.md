# 05 - Export Default

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Menentukan satu entitas utama sebagai nilai ekspor default dari sebuah berkas modul.
> * **Kapan Digunakan**: Saat suatu file modul bertugas mengekspor satu komponen atau class utama.
> * **Aturan Praktis**: Hanya boleh ada SATU `export default` per file, dan diimpor tanpa kurung kurawal `{}`.

## 1. 🎯 Tujuan Belajar
- Memahami perbedaan Named Export dengan Default Export.
- Mengimpor nilai default tanpa tanda kurung kurawal `{}`.
- Mengkombinasikan export default dengan named export dalam satu modul yang sama.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **kapten tim sepak bola**: Sebuah tim memiliki 11 pemain, namun hanya ada 1 orang yang ditunjuk sebagai kapten utama (*Default*). Saat perwakilan tim dipanggil maju, kaptenlah yang maju pertama kali secara otomatis.

JavaScript Modules mendukung dua cara ekspor:
1. **Named Export**: Bisa lebih dari satu per file, wajib diimpor menggunakan tanda kurung kurawal `{}` dan nama yang sama persis.
2. **Default Export**: Hanya boleh **maksimal satu** per file menggunakan sintaks `export default`.
3. **Fleksibilitas Nama Import**: Pengimpor bebas memberi nama apa saja tanpa kurung kurawal:
   `import logger from "./logger.js";` atau `import customLog from "./logger.js";`.
4. **Kombinasi**: Satu file modul dapat memiliki satu default export dan beberapa named export sekaligus.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// logger.js
// Export default: entitas utama dari file modul ini
export default function log(message) {
  console.log(`[LOGGER]: ${new Date().toLocaleTimeString()} - ${message}`);
}

// Named export: konstanta pembantu pendukung
export const APP_VERSION = "2.0.0";

// example.js
// Mengimpor default tidak memerlukan {}, namanya bebas ditentukan
import customLogger, { APP_VERSION } from "./logger.js";

customLogger(`Aplikasi berjalan pada versi ${APP_VERSION}`);
```

---

## 4. 🖥️ Output yang Diharapkan
```text
[LOGGER]: 10:00:00 AM - Aplikasi berjalan pada versi 2.0.0
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
Pola standar komponen antarmuka web modern di React, Vue, dan Svelte di mana setiap file mengekspor satu komponen utama via `export default`.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Lebih dari Satu Default**: Menulis dua pernyataan `export default` dalam file yang sama akan memicu `SyntaxError: Only one default export allowed per module`.
* **Menggunakan Kurung Kurawal untuk Default**: Menulis `import { customLogger } from "./logger.js"` jika logger diekspor secara default akan menghasilkan nilai `undefined`.

### 🌟 Best Practice
* Gunakan `export default` jika file modul tersebut memiliki satu peran utama yang sangat dominan.
* Gunakan named export jika file modul berisi sekumpulan fungsi utilitas yang setara (misal `math.js`).

---

## 6. ✍️ Latihan Mandiri
1. Buat file `kalkulator.js` yang memiliki `export default class Kalkulator` dan named export `const AUTHOR = "Joko"`.
2. Impor class kalkulator tersebut tanpa `{}` dan panggil salah satu method-nya di `app.js`.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [04 - Alias](../04-alias/README.md)
- ➡️ **Selanjutnya:** [06 - Module Object](../06-module-object/README.md)
- 🏠 **Daftar Isi Modul 04:** [README Modul 04](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
