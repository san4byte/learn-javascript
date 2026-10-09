# 06 - Module Object (import \* as Namespace)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengimpor seluruh isi ekspor suatu modul sekaligus ke dalam satu objek namespace terkelompok menggunakan sintaks `import * as NamaObjek`.
> - **Kapan Digunakan**: Saat suatu berkas modul menyediakan banyak fungsi utilitas terkait (misal kumpulan formula matematika atau helper string) yang ingin diakses rapi di bawah satu namespace tanpa mengotori baris impor.
> - **Aturan Praktis**: Gunakan `import * as Namespace from './modul.js'`; objek modul bersifat _sealed_ dan _read-only_ dengan prototype `null`.

---

## 1. 🎯 Tujuan Belajar

- Menguasai teknik **Namespace Import** menggunakan sintaks `import * as Namespace from './path.js'`.
- Mengakses seluruh _named exports_ menggunakan notasi titik (_dot notation_) maupun kurung siku dinamis (_bracket notation_).
- Mengetahui bagaimana _default export_ terpetakan di dalam objek namespace sebagai properti `.default`.
- Memahami struktur anatomi internal objek modul (`[object Module]`, prototype `null`, dan _non-extensible_).
- Mengetahui sifat kebekuan (_immutability_) objek modul terhadap upaya penulisan ulang properti.
- Memahami trade-off efisiensi antara _namespace import_ vs _named import_ pada proses _tree-shaking_ bundler.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **membeli satu kotak perkakas lengkap (_Toolbox_)**: Alih-alih membawa obeng kembang, tang buaya, palu, dan kunci pas satu per satu secara terpisah di tangan Anda, Anda membawa satu kotak perkakas berlabel rapi (`* as Toolbox`). Saat Anda butuh memutar baut, Anda cukup mengambil obeng dari dalam kotak tersebut (`Toolbox.obeng()`).

---

### 1. Tabel Ringkasan Fitur Module Namespace Object (Cheat-Sheet)

| Fitur / Karakteristik      | Sintaks / Representasi          | Nilai / Perilaku      | Deskripsi Singkat                                                   |
| :------------------------- | :------------------------------ | :-------------------- | :------------------------------------------------------------------ |
| **Namespace Import**       | `import * as MathUtil from ...` | Objek modul tunggal   | Membungkus seluruh ekspor ke dalam identifier `MathUtil`.           |
| **Akses Dot Notation**     | `MathUtil.tambah(a, b)`         | Memanggil fungsi      | Cara pemanggilan standar yang bersih dan terorganisir.              |
| **Akses Bracket Dinamis**  | `MathUtil[namaOperasi](a, b)`   | Evaluasi nama runtime | Memanggil ekspor secara fleksibel berdasarkan string variabel.      |
| **Default Mapping**        | `MathUtil.default`              | Nilai default export  | Jika modul asal memiliki default export, ia menjadi key `.default`. |
| **Prototipe Objek**        | `Object.getPrototypeOf(Mod)`    | `null`                | Objek murni tanpa rantai prototipe bawaan `Object.prototype`.       |
| **Status Ekstensibilitas** | `Object.isExtensible(Mod)`      | `false`               | Tidak dapat menambah, mengubah, atau menghapus properti.            |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja module namespace object beserta skenario kasusnya:

---

#### 1. Sintaks Dasar: `import * as Namespace`

Mengambil semua ekspor dari file target dan menamainya ke dalam satu variabel namespace:

```javascript
// Mengimpor seluruh kalkulator:
import * as Calculator from "./calculator.js";

console.log(Calculator.add(10, 5)); // 15
console.log(Calculator.mul(4, 2)); // 8
```

---

#### 2. Akses Properti Dinamis Menggunakan Bracket Notation

Karena representasinya adalah objek JavaScript, Anda dapat mengakses fungsi menggunakan string dinamis pada runtime:

```javascript
const aksi = "div";
const hasil = Calculator[aksi](20, 4); // Memanggil Calculator.div(20, 4)
console.log(hasil); // 5
```

---

#### 3. Kemunculan Default Export pada Properti `.default`

Jika modul asal mendefinisikan `export default`, entitas tersebut tetap dapat diakses melalui properti bernama `default`:

```javascript
// Jika calculator.js memiliki: export default function info() { ... }
console.log(Calculator.default()); // Memanggil default export dari modul
```

---

#### 4. Karakteristik Internal Objek Namespace

Objek modul memiliki sifat unik yang berbeda dari objek JavaScript biasa (`{}`):

- Bertipe string tag: `[object Module]`
- Prototype bernilai `null` (tidak mewarisi method `toString` atau `hasOwnProperty` dari `Object.prototype`)
- Bersifat non-extensible (terkunci rapat)

```javascript
console.log(Object.prototype.toString.call(Calculator)); // "[object Module]"
console.log(Object.getPrototypeOf(Calculator)); // null
console.log(Object.isExtensible(Calculator)); // false
```

---

#### 5. Sifat Immutabilitas Objek Modul

Anda tidak bisa menambah, menghapus, atau menimpa properti di dalam objek namespace:

```javascript
try {
  Calculator.add = () => 0; // 💥 TypeError: Cannot assign to read only property
} catch (e) {
  console.log("Objek modul tidak dapat dimodifikasi!");
}
```

---

#### 6. Pertimbangan Optimasi Bundler & Tree-Shaking

- **Kelebihan**: Sangat rapi untuk pustaka utilitas yang saling berhubungan (seperti `* as DateFns` atau `* as Icons`).
- **Kekurangan**: Pada bundler generasi lama, `import * as` dapat menyulitkan algoritma _dead code elimination_ (tree-shaking) untuk membuang fungsi yang tidak pernah dipanggil, menghasilkan ukuran bundle akhir yang lebih besar.

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep module namespace object di atas—mulai dari pemanggilan operasi, akses default via `.default`, evaluasi nama dinamis via kurung siku, verifikasi struktur internal prototype `null`, hingga pembuktian error penugasan properti—telah dirangkum dalam script laboratorium terpadu:

📁 File: [`example.js`](./example.js) & [`calculator.js`](./calculator.js)

```bash
# Jalankan langsung dari terminal:
node 04-modules/06-module-object/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Kumpulan Ikon Grafis (Icon Library)**: Mengimpor ratusan ikon SVG (`import * as Icons from './icons.js'`) dan me-render ikon tertentu via `Icons[iconName]`.
2. **Paket Algoritma Matematika / Enkripsi**: Mengelompokkan fungsi hashing (`import * as Crypto from './crypto.js'`).
3. **Dispatcher Strategi Dinamis**: Menjalankan algoritma pemrosesan yang bervariasi bergantung pada tipe input request pengguna.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Menimpa Properti Namespace**: Mengira objek namespace bisa dimodifikasi seperti objek JavaScript biasa (`Calculator.newProp = 1`), yang memicu lemparan `TypeError`.
- **Mencari Method di Prototype**: Memanggil `Calculator.hasOwnProperty('add')` akan melempar `TypeError: Calculator.hasOwnProperty is not a function` karena prototipenya bernilai `null`. Gunakan `Object.hasOwn(Calculator, 'add')`.

### 🌟 Best Practice

- Gunakan penamaan PascalCase (misal `Calculator`, `StringUtils`) untuk objek namespace agar membedakannya dengan instance objek biasa.
- Jika hanya membutuhkan 1 atau 2 fungsi spesifik dari modul besar, lebih baik gunakan _Named Import_ `{ add }` agar proses _tree-shaking_ berjalan optimal.

---

## 5. ✍️ Latihan Mandiri

1. Buat file `konversi-suhu.js` dengan fungsi `celsiusToFahrenheit(c)`, `celsiusToKelvin(c)`, dan `kelvinToCelsius(k)`.
2. Impor seluruh fungsi di `example.js` menggunakan objek namespace `import * as Suhu from './konversi-suhu.js'`.
3. Buat fungsi dinamis `jalankanKonversi(namaFormula, nilai)` yang memanggil formula suhu menggunakan _bracket notation_ `Suhu[namaFormula](nilai)`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [05 - Export Default](../05-export-default/README.md)
- ➡️ **Selanjutnya:** [07 - Aggregating Modules](../07-aggregating-modules/README.md)
- 🏠 **Daftar Isi Modul 04:** [README Modul 04](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
