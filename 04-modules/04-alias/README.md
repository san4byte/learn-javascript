# 04 - Alias (Kata Kunci as)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengubah nama pengenal (_identifier_) suatu fungsi, variabel, atau class saat diekspor maupun saat diimpor menggunakan kata kunci `as`.
> - **Kapan Digunakan**: Menyelesaikan tabrakan nama (_name collision_) ketika dua modul berbeda mengekspor fungsi dengan nama yang sama, atau memperjelas konteks penamaan pada file pengimpor.
> - **Aturan Praktis**: Gunakan format `import { namaAsli as namaBaru } from './modul.js'`; nama asli tidak lagi terdaftar di scope file pengimpor.

---

## 1. 🎯 Tujuan Belajar

- Memahami peran kata kunci **`as`** untuk mengubah nama identifier pada ES Modules.
- Menguasai pembuatan **Import Alias** untuk mencegah tabrakan nama dari dua modul berbeda.
- Menguasai pembuatan **Export Alias** (`export { namaInternal as namaPublik }`) untuk mengekspos Public API yang lebih bersih.
- Mengetahui bahwa nama asli yang telah di-alias tidak lagi tersedia di ruang lingkup (_scope_) file pengimpor.
- Memahami teknik alias berganda (_multiple aliasing_) dalam satu pernyataan import.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **dua orang teman bernama 'Budi' di satu kantor**: Jika resepsionis hanya memanggil "Budi!", kedua orang tersebut akan bingung atau salah merespons (_name collision_). Oleh karena itu, kantor memberi nama panggilan (_alias_) yang berbeda: Budi dari divisi Keuangan dipanggil `BudiFinance` (`import { Budi as BudiFinance }`), sedangkan Budi dari divisi IT dipanggil `BudiDeveloper` (`import { Budi as BudiDeveloper }`).

---

### 1. Tabel Ringkasan Fitur Alias (Cheat-Sheet)

| Konteks Pemakaian   | Sintaks                                  | Perilaku & Manfaat                 | Ketersediaan Nama Asli                              |
| :------------------ | :--------------------------------------- | :--------------------------------- | :-------------------------------------------------- |
| **Import Alias**    | `import { fn as aliasFn } from ...`      | Menghindari benturan nama lokal    | Nama asli tidak dapat dipanggil (`ReferenceError`). |
| **Export Alias**    | `export { localFn as publicFn }`         | Mengubah nama publik saat diekspor | Modul luar hanya mengenali `publicFn`.              |
| **Multiple Alias**  | `import { a as x, b as y } from ...`     | Mengubah beberapa nama sekaligus   | Masing-masing terikat ke alias barunya.             |
| **Re-export Alias** | `export { fn as newFn } from './mod.js'` | Meneruskan ekspor dengan nama baru | Berguna untuk membuat fasad / barrel module.        |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja alias beserta skenario kasusnya:

---

#### 1. Sintaks Alias pada Import: `import { asli as baru }`

Digunakan ketika nama yang diekspor oleh modul luar ingin diubah agar lebih deskriptif di file pengimpor:

```javascript
import { hitungLuas as luasLingkaran } from "./math.js";

console.log(luasLingkaran(7)); // Memanggil via nama baru
```

---

#### 2. Menyelesaikan Tabrakan Nama (_Name Collision Resolution_)

Skenario paling umum adalah ketika dua modul independen memiliki nama fungsi yang sama persis:

```javascript
// Mengimpor 'hitungLuas' dari dua berkas berbeda:
import { hitungLuas as luasLingkaran } from "./math.js";
import { hitungLuas as luasPersegiPanjang } from "./geometry.js";

console.log(luasLingkaran(5)); // Milik modul math.js
console.log(luasPersegiPanjang(4, 6)); // Milik modul geometry.js
```

---

#### 3. Sintaks Alias pada Export: `export { internal as publik }`

Pengekspor dapat menjaga nama fungsi internal tetap teknis atau deskriptif, tetapi mengekspos nama pendek ke publik:

```javascript
// string-util.js
function bersihkanSpasiDariKarakter(str) {
  return str.trim();
}

// Diekspor dengan nama publik yang ringkas:
export { bersihkanSpasiDariKarakter as trim };
```

---

#### 4. Multiple Aliasing dalam Satu Perintah

Anda dapat mengganti beberapa nama pengenal sekaligus di dalam kurung kurawal yang sama:

```javascript
import {
  tambah as add,
  kurang as subtract,
  kali as multiply,
} from "./calculator.js";
```

---

#### 5. Proteksi Scope: Penolakan Akses ke Nama Asli

Setelah identifier di-alias pada import, nama aslinya **tidak pernah dideklarasikan** di file pengimpor. Mencoba memanggil nama asli akan memicu `ReferenceError`:

```javascript
import { hitungLuas as hitungArea } from "./math.js";

hitungArea(10); // ✅ Bekerja dengan baik
// hitungLuas(10); // 💥 ReferenceError: hitungLuas is not defined!
```

---

#### 6. Penerapan Ekspor Ulang dengan Alias (_Re-exporting with Alias_)

Digunakan dalam arsitektur agregasi (_barrel export_) untuk menyatukan beberapa modul dan mengubah namanya:

```javascript
// index.js
export { hitungLuas as hitungLuasGeometri } from "./geometry.js";
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep alias—mulai dari resolusi tabrakan nama dua modul (`math.js` dan `geometry.js`), pemanggilan fungsi yang di-alias saat ekspor, hingga pembuktian isolasi scope dari nama asli—telah dirangkum dalam script laboratorium terpadu:

📁 File: [`example.js`](./example.js), [`math.js`](./math.js), [`geometry.js`](./geometry.js)

```bash
# Jalankan langsung dari terminal:
node 04-modules/04-alias/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Integrasi Dua Library UI/Grafik**: Mengimpor fungsi render dari React DOM (`import { render as renderDOM }`) dan canvas chart (`import { render as renderChart }`) dalam file yang sama.
2. **Refactoring Bertahap (Backward Compatibility)**: Mengganti nama fungsi usang (`export { fungsiBaru as fungsiLama }`) agar kode pengguna lama tidak langsung rusak.
3. **Penyederhanaan Nama Terlalu Panjang**: Mengubah fungsi API verbose seperti `fetchEnterpriseBillingTransactionsByAccountId` menjadi `fetchBilling`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Alias Terlalu Singkat/Kriptik**: Mengganti `validasiNomorKtp` menjadi `val` atau `v` membuat pembaca kode kesulitan memahami maksud fungsinya.
- **Lupa Bahwa Nama Asli Hilang**: Mencoba menggunakan nama asli setelah memberikan alias, yang berakibat fatal `ReferenceError`.

### 🌟 Best Practice

- Gunakan alias pada import jika benturan nama hanya terjadi di satu file konsumen tertentu.
- Gunakan alias pada export jika Anda ingin menyembunyikan detail implementasi internal library dari publik.

---

## 5. ✍️ Latihan Mandiri

1. Buat file `fisika.js` dengan fungsi `hitungKecepatan(jarak, waktu)`. Buat juga file `internet.js` dengan fungsi `hitungKecepatan(megaByte, detik)`.
2. Impor kedua fungsi tersebut ke dalam `example.js` menggunakan alias yang jelas (`kecepatanFisika` dan `kecepatanInternet`).
3. Buat file modul yang mengekspor fungsi privat `_prosesInternal()` dengan nama alias publik `proses()`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [03 - Variable dan Class di Module](../03-variables-and-classes/README.md)
- ➡️ **Selanjutnya:** [05 - Export Default](../05-export-default/README.md)
- 🏠 **Daftar Isi Modul 04:** [README Modul 04](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
