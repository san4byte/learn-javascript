# 10 - Sintaks Modern ES2020 - ES2023 & Strict Mode

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menguasai sintaks modern JavaScript standar ECMAScript terkini (ES2020 hingga ES2023) untuk kode yang lebih ringkas, aman dari crash runtime, mendukung prinsip *immutability*, dan bebas dari bug warisan (*Strict Mode*).
> - **Kapan Digunakan**: Mengakses data bersarang (*nested response*) dari REST API tanpa fatal error, menyediakan nilai bawaan (*fallback*) yang akurat untuk angka nol dan string kosong, menyalin objek secara mandiri (*deep clone*), serta memanipulasi array tanpa merusak state asli.
> - **Aturan Praktis**: Gunakan `?.` untuk navigasi properti dinamis dan padukan dengan `??` untuk nilai default. Gunakan `structuredClone()` untuk duplikasi data bertingkat, gunakan `toSorted()` / `toReversed()` alih-alih `sort()` / `reverse()` untuk menjaga integritas data sumber, dan terapkan `'use strict'` untuk mencegah kebocoran variabel global.

---

## 1. 🎯 Tujuan Belajar

- Menguasai operator **Optional Chaining (`?.`)** pada akses properti, pemanggilan method opsional, dan indeks array.
- Memahami perbedaan mendasar antara **Nullish Coalescing (`??`)** dan **Logical OR (`||`)**.
- Menguasai operator penugasan logika modern (*Logical Assignment Operators*): `??=`, `||=`, dan `&&=`.
- Memahami cara kerja fungsi bawaan **`structuredClone()`** untuk kloning mendalam (*deep clone*) tanpa merusak referensi asli.
- Menguasai 4 method array *immutable* standar ES2023: `toSorted()`, `toReversed()`, `toSpliced()`, dan `with()`.
- Memahami aturan pengamanan kode pada **Strict Mode (`'use strict'`)** dan teknik debugging menggunakan instruksi `debugger`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **Optional Chaining (`?.`)**: Seperti **mengetuk pintu pagar secara sopan**. Jika rumah ternyata tidak memiliki pintu samping (**undefined**), Anda langsung melangkah mundur dengan tenang dan selamat (**mengembalikan `undefined`**) tanpa mendobrak dinding dan memicu alarm darurat (**crash `TypeError: Cannot read properties of undefined`**).
> - **Nullish Coalescing (`??`)**: Seperti **kasir toko yang teliti**. Jika pelanggan membawa kupon diskon bernilai Rp 0 (`diskon = 0`) atau nama kosong (`""`), kasir tetap menghargai nilai tersebut. Operator lama `||` bertindak ceroboh dengan menganggap angka 0 sama dengan "tidak ada uang" lalu membatalkan transaksi.
> - **`structuredClone()`**: Seperti **mesin cetak printer 3D replika mandiri**. Mencetak miniatur replika baru yang terpisah total dari objek asli. Anda bebas mengecat replika baru tanpa merusak miniatur asli di lemari.

---

### Tabel Ringkasan Fitur Modern ES2020 - ES2023

| Fitur / Operator | Standar ECMAScript | Perilaku & Manfaat | Contoh Penggunaan |
| :--- | :--- | :--- | :--- |
| **`obj?.prop`** | ES2020 | Mengembalikan `undefined` jika sisi kiri bernilai `null`/`undefined` | `user?.address?.city` |
| **`a ?? b`** | ES2020 | Mengambil `b` HANYA jika `a` bernilai `null` atau `undefined` | `cfg.port ?? 3000` |
| **`a ??= b`** | ES2021 | Mengisi variabel `a` dengan nilai `b` jika saat ini bernilai *nullish* | `config.host ??= 'localhost'` |
| **`structuredClone(obj)`** | HTML Spec / Node 17+ | Mengkloning objek bertingkat secara mendalam (*deep clone*) | `const copy = structuredClone(src)` |
| **`arr.toSorted()`** | ES2023 | Mengurutkan array dan mengembalikan **array baru** | `const sorted = arr.toSorted()` |
| **`arr.toReversed()`** | ES2023 | Membalik urutan array dan mengembalikan **array baru** | `const reversed = arr.toReversed()` |
| **`arr.with(idx, val)`** | ES2023 | Mengganti satu elemen pada indeks tertentu tanpa mutasi | `const updated = arr.with(0, 99)` |
| **`arr.toSpliced()`** | ES2023 | Memotong/menyisipkan elemen dan mengembalikan array baru | `const spliced = arr.toSpliced(1, 2)` |

---

### Pembahasan Mendalam Fitur & Sintaks

#### 1. Optional Chaining (`?.`)

Menghentikan evaluasi ekspresi dan segera menghasilkan `undefined` jika nilai sebelum tanda `?.` bernilai `null` atau `undefined`:

```javascript
const user = { name: 'Joko' };

// Properti bersarang
const kota = user?.address?.city; // undefined (aman tanpa TypeError)

// Pemanggilan method opsional
user.kirimEmail?.(); // Aman jika method tidak ada

// Akses indeks array opsional
const itemPertama = user?.pesanan?.[0]; // undefined
```

#### 2. Nullish Coalescing (`??`) vs Logical OR (`||`)

Operator `||` menganggap angka `0`, string kosong `""`, dan boolean `false` sebagai nilai falsy. Sedangkan `??` **hanya** mendeteksi `null` dan `undefined`:

```javascript
const setting = { volume: 0, judul: '' };

console.log(setting.volume || 100); // 100 (❌ SALAH: volume 0 tertimpa 100)
console.log(setting.volume ?? 100); // 0   (✅ BENAR: volume 0 dipertahankan)

console.log(setting.judul || 'Draft'); // 'Draft' (string kosong tertimpa)
console.log(setting.judul ?? 'Draft'); // ''      (string kosong dipertahankan)
```

#### 3. Logical Assignment Operators (`??=`, `||=`, `&&=`)

Menyederhanakan pola pengecekan dan penugasan nilai:

```javascript
const config = { host: 'localhost' };
config.port ??= 8080;   // Mengisi 8080 karena port bernilai undefined
config.host ||= '127.0.0.1'; // Tidak berubah karena host bernilai truthy
```

#### 4. Deep Clone Modern via `structuredClone()`

Fungsi bawaan JavaScript modern untuk membuat salinan objek bertingkat secara mendalam tanpa keterikatan referensi memori (menggantikan trik lambat `JSON.parse(JSON.stringify())`):

```javascript
const asli = { detail: { harga: 50000 } };
const salinan = structuredClone(asli);

salinan.detail.harga = 75000;
console.log(asli.detail.harga); // 50000 (objek asli tetap terlindungi)
```

#### 5. Immutable Array Methods (ES2023)

Empat metode array baru yang mengembalikan **array salinan baru** alih-alih mengubah array sumber:

```javascript
const angka = [3, 1, 4, 1, 5];

const urut = angka.toSorted((a, b) => a - b); // [1, 1, 3, 4, 5]
const balik = angka.toReversed();              // [5, 1, 4, 1, 3]
const ubah = angka.with(0, 99);               // [99, 1, 4, 1, 5]
const potong = angka.toSpliced(1, 2);          // [3, 1, 5]

console.log(angka); // [3, 1, 4, 1, 5] (array asli tetap utuh!)
```

#### 6. Strict Mode (`'use strict'`) & Debugger

Menulis `'use strict';` di baris pertama mengaktifkan pemeriksaan ketat pada compiler:
- Menolak pembuatan variabel global liar tanpa deklarasi (`x = 10` memicu `ReferenceError`).
- Menolak penulisan pada properti berstatus *read-only*.
- Menolak nama parameter duplikat pada fungsi.

Instruksi `debugger;` bertindak sebagai *breakpoint* program saat browser Developer Tools (F12) atau debugger VS Code sedang aktif:

```javascript
'use strict';

function hitungDiskon(harga) {
  // debugger; // Eksekusi browser akan dijeda di sini saat DevTools terbuka
  return harga * 0.1;
}
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Implementasi demonstrasi lengkap yang mencakup Optional Chaining bersarang, perbedaan akurasi `??` vs `||`, Logical Assignment, kloning mendalam `structuredClone()`, 4 metode array ES2023 immutable, dan proteksi Strict Mode tersedia di berkas [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/10-advanced-syntax/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Konsumsi Data Respons REST API**: Mengakses data relasional backend yang rentan parsial dengan pola kombinasi `?.` dan fallback `??`:
   ```javascript
   const avatar = response?.data?.user?.profile?.avatar ?? '/assets/default.png';
   ```
2. **State Management Redux / Zustand Pattern**: Menggunakan method ES2023 `toSorted()` atau `.with()` untuk memperbarui elemen array tanpa merusak state sumber (*pure state update*).

### ⚠️ Common Pitfalls

- **Menggabungkan `??` dengan `&&` atau `||` Tanpa Tanda Kurung**: Menulis `a || b ?? c` akan memicu `SyntaxError`. Mesin JavaScript mewajibkan pengelompokan eksplisit menggunakan tanda kurung: `(a || b) ?? c`.
- **Menyalahgunakan `?.` di Sisi Kiri Penugasan**: Menulis `obj?.nama = 'Budi'` adalah kesalahan sintaks (*Invalid left-hand side in assignment*).

### 🌟 Best Practice

- Utamakan `??` daripada `||` untuk semua penanganan nilai fallback (*default values*).
- Gunakan `toSorted()` dan `toReversed()` dalam arsitektur komponen frontend modern untuk menghindari efek samping mutasi data (*accidental mutation*).

---

## 5. ✍️ Latihan Mandiri

1. **Ekstraksi Data API yang Aman**: Diberikan respons API:
   ```javascript
   const response = {
     meta: { code: 200 },
     data: {
       customer: {
         nama: 'Rian',
         kontak: {}
       }
     }
   };
   ```
   Gunakan kombinasi *Optional Chaining* dan *Nullish Coalescing* untuk mengambil nomor telepon `response.data.customer.kontak.telepon` dengan nilai fallback `'Nomor Belum Terdaftar'`.
2. **Kloning Data Transaksi**: Diberikan objek pesanan bertingkat `{ id: 'ORD-1', item: { nama: 'Kemeja', jumlah: 2 } }`. Buatlah kloning mendalam menggunakan `structuredClone()`. Ubah jumlah item pada klon menjadi `5`, dan buktikan bahwa jumlah item pada objek asli tetap bernilai `2`.
3. **Penyusunan Leaderboard Immutabel (ES2023)**: Diberikan array skor peserta: `[45, 90, 78, 60, 85]`. Gunakan method `toSorted()` untuk mengurutkan skor dari tertinggi ke terendah, lalu gunakan method `with()` untuk mengganti skor indeks ke-0 menjadi `100`. Buktikan bahwa array peserta asli tidak mengalami perubahan sama sekali.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [09 - Tipe Data dan Operator](../09-data-types-and-operators/README.md)
- ➡️ **Modul Selanjutnya:** [02 - JavaScript OOP](../../02-oop/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
