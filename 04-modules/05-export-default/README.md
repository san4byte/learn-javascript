# 05 - Export Default

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menetapkan satu entitas utama (fungsi, class, atau objek) sebagai nilai ekspor bawaan dari sebuah berkas modul JavaScript.
> - **Kapan Digunakan**: Saat suatu berkas modul memiliki satu fokus tanggung jawab utama (misal satu class entity atau satu komponen UI per file).
> - **Aturan Praktis**: Hanya boleh ada SATU `export default` per file, dan diimpor tanpa tanda kurung kurawal `{}` dengan nama pengenal yang bebas ditentukan oleh pengimpor.

---

## 1. 🎯 Tujuan Belajar

- Memahami perbedaan mendasar antara **Named Export** dan **Default Export**.
- Menguasai pembuatan Default Export untuk fungsi, class, dan objek ekspresi.
- Mengimpor nilai default tanpa menggunakan tanda kurung kurawal `{}`.
- Menggabungkan _default import_ dan _named import_ dalam satu baris pernyataan impor.
- Menguasai ekspor dan impor default menggunakan klausa alias (`export { x as default }` dan `import { default as x }`).
- Mengetahui batasan mutlak: Mengapa hanya diperbolehkan satu `export default` per berkas modul.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **kapten tim sepak bola**: Sebuah kesebelasan memiliki 11 pemain di lapangan, namun hanya ada 1 orang yang ditunjuk sebagai kapten utama (_Default_). Saat wasit memanggil perwakilan tim untuk pengundian koin, kaptenlah yang maju secara otomatis tanpa perlu disebutkan nomor punggungnya satu per satu. Namun jika pelatih membutuhkan pemain lain secara spesifik, nama mereka dipanggil dengan tanda kurung khusus (_Named Exports_).

---

### 1. Tabel Ringkasan Fitur Export Default (Cheat-Sheet)

| Skenario / Sintaks       | Format Ekspor                       | Format Impor                          | Kebutuhan Kurung `{}`                |
| :----------------------- | :---------------------------------- | :------------------------------------ | :----------------------------------- |
| **Class Default**        | `export default class App {}`       | `import App from './app.js'`          | **Tidak Ada** (Langsung sebut nama). |
| **Function Default**     | `export default function run() {}`  | `import run from './run.js'`          | **Tidak Ada**.                       |
| **Ekspresi / Objek**     | `export default { port: 8080 };`    | `import config from './conf.js'`      | **Tidak Ada**.                       |
| **Kombinasi Ekspor**     | `export default A; export const B;` | `import A, { B } from './mod.js'`     | Hanya untuk named export (`B`).      |
| **Klausa Alias Default** | `export { item as default };`       | `import { default as item } from ...` | Menggunakan kurung kurawal `{}`.     |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja default export beserta skenario kasusnya:

---

#### 1. Sintaks Default Export pada Fungsi dan Class

Anda dapat langsung menyematkan `export default` di depan deklarasi fungsi atau class:

```javascript
// Logger.js
export default class Logger {
  log(pesan) {
    console.log(`[LOG]: ${pesan}`);
  }
}
```

---

#### 2. Sintaks Default Export pada Nilai Ekspresi Langsung

Tidak seperti named export yang mewajibkan deklarasi variabel, default export dapat langsung mengekspor nilai literal anonim:

```javascript
// config.js
export default {
  host: "localhost",
  port: 3000,
};
```

---

#### 3. Sintaks Default Export via Export Clause

Anda dapat mendeklarasikan variabel secara normal terlebih dahulu, lalu menetapkannya sebagai default di bagian akhir:

```javascript
// helper.js
function formatUang(nominal) {
  return `Rp${nominal.toLocaleString()}`;
}

export { formatUang as default };
```

---

#### 4. Mengimpor Default Export Tanpa Tanda Kurung Kurawal `{}`

Pengimpor tidak perlu menggunakan `{}` dan bebas memberi nama apa pun pada entitas yang diterima:

```javascript
// main.js
import FormatRupiah from "./helper.js"; // Bebas menamai, tidak harus 'formatUang'

console.log(FormatRupiah(50000)); // "Rp50.000"
```

---

#### 5. Menggabungkan Default dan Named Import dalam Satu Pernyataan

Sebuah file dapat mengekspor satu default item dan banyak named items sekaligus. Di file konsumen, keduanya dapat diimpor bersamaan:

```javascript
// Di file logger.js:
// export default class Logger {}
// export const APP_VERSION = "1.0.0";

// Di file app.js:
import Logger, { APP_VERSION } from "./logger.js";
```

---

#### 6. Mengimpor Default Export Menggunakan Alias `{ default as Name }`

Di balik layar, default export sebenarnya adalah ekspor bernama khusus dengan nama identifier `default`:

```javascript
import { default as CustomLogger } from "./logger.js";
// Identik dengan: import CustomLogger from "./logger.js";
```

---

#### 7. Aturan Tunggal: Maksimal Satu Default Export per Berkas

JavaScript melarang keras penulisan dua pernyataan `export default` dalam satu file yang sama:

```javascript
// ❌ ILEGAL:
export default function satu() {}
export default function dua() {}
// 💥 SyntaxError: Only one default export allowed per module.
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep default export di atas—mulai dari ekspor class utama, named constants pendamping, penggabungan default dan named import, hingga sintaks alias `{ default as ... }`—telah dirangkum dalam script laboratorium terpadu:

📁 File: [`example.js`](./example.js) & [`logger.js`](./logger.js)

```bash
# Jalankan langsung dari terminal:
node 04-modules/05-export-default/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Komponen Frontend Framework**: Komponen React/Vue/Svelte biasanya diekspor secara default (`export default function Header() {}`) per file komponen.
2. **Konfigurasi Lingkungan (Config File)**: File konfigurasi aplikasi (`database.config.js`) yang mengekspor satu objek koneksi utama.
3. **Service Class Singleton**: Mengekspor satu class service terpusat seperti `export default class PaymentGatewayService {}`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Menggunakan Kurung Kurawal untuk Default Import**: Menulis `import { Logger } from './logger.js'` saat modul mengekspor `export default Logger` akan menghasilkan nilai `undefined`.
- **Nama Import Tidak Konsisten di Seluruh Proyek**: Karena nama default import bebas, developer A menamainya `import Service`, sedangkan developer B menamainya `import AppService`, yang dapat membingungkan saat pencarian kode (_grep/search_).

### 🌟 Best Practice

- Gunakan `export default` jika berkas modul memiliki satu entitas utama yang sangat dominan.
- Sebisa mungkin gunakan penamaan import default yang konsisten dengan nama file modulnya.
- Utamakan _named exports_ jika sebuah modul berisi kumpulan fungsi utilitas yang setara (misal `math.js` atau `string-helpers.js`).

---

## 5. ✍️ Latihan Mandiri

1. Buat file `kalkulator.js` yang memiliki default export class `Kalkulator` dan named export konstanta `NAMA_APLIKASI = "CalcPro"`.
2. Impor class tersebut di `example.js` tanpa tanda kurung kurawal, buat instansinya, dan panggil salah satu method penjumlahannya.
3. Coba tulis dua kali `export default` di dalam file `kalkulator.js` dan amati pesan error spesifik yang muncul saat kode dievaluasi.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [04 - Alias](../04-alias/README.md)
- ➡️ **Selanjutnya:** [06 - Module Object](../06-module-object/README.md)
- 🏠 **Daftar Isi Modul 04:** [README Modul 04](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
