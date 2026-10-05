# 02 - Modern Syntax ES2020-ES2023 (Optional Chaining, Nullish Coalescing, Immutability)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menguasai sintaks Optional Chaining (`?.`) untuk mengakses nested object tanpa memicu TypeError.
> - **Kapan Digunakan**: Memahami perbedaan krusial antara Nullish Coalescing (`??`) dan Logical OR (`||`).
> - **Aturan Praktis**: Gabungkan `?.` dengan `??` untuk nilai default yang bersih dan elegan:

## 1. 🎯 Tujuan Belajar

- Menguasai sintaks Optional Chaining (`?.`) untuk mengakses nested object tanpa memicu TypeError.
- Memahami perbedaan krusial antara Nullish Coalescing (`??`) dan Logical OR (`||`).
- Mampu menduplikasi objek bertingkat secara mendalam menggunakan `structuredClone()`.
- Memahami method Array baru ES2023 (`toSorted()`, `toReversed()`, `toSpliced()`) untuk prinsip Immutability.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> **Optional Chaining (`?.`)** dianalogikan seperti kurir pengantar paket: kurir mengetuk pagar rumah Anda; jika rumah kosong/pagar terkunci, kurir mencatat 'penerima tidak ditemukan' (`undefined`) dan langsung pulang dengan selamat. Tanpa `?.`, kurir akan mendobrak pintu rumah dan membunyikan alarm keras polisi (_Crash / TypeError_).

JavaScript terus berevolusi setiap tahun melalui komite TC39. Fitur-fitur yang dirilis antara tahun 2020 hingga 2023 membawa perubahan besar pada cara developer menulis kode industri: lebih ringkas, aman dari error runtime, dan menganut prinsip _immutability_.

### 1. Optional Chaining (`?.`)

Sebelum ES2020, jika kita mengakses properti dari objek yang nilainya `null` atau `undefined`, JavaScript akan mengalami crash fatal: `TypeError: Cannot read properties of undefined`.
Dengan `?.`, JavaScript akan segera berhenti mengevaluasi dan mengembalikan `undefined` jika target bernilai `null` atau `undefined`.

- Properti: `user?.profile?.address?.city`
- Method: `user.logActivity?.()`
- Array Index: `users?.[0]?.name`

### 2. Nullish Coalescing (`??`) vs Logical OR (`||`)

Operator `||` menganggap nilai berikut sebagai falsy: `false`, `0`, `""` (string kosong), `NaN`, `null`, `undefined`.
Seringkali nilai `0` atau `""` adalah nilai input yang valid (misal: skor 0 atau deskripsi kosong).
Operator `??` **HANYA** akan mengambil nilai fallback jika sisi kiri bernilai `null` atau `undefined`.

### 3. Deep Copy Modern: `structuredClone()`

Sebelumnya, menyalin objek bertingkat (_nested object_) sering menggunakan trik lambat `JSON.parse(JSON.stringify(obj))` yang gagal pada tipe data Date, Set, Map, atau circular reference. `structuredClone()` adalah fungsi standar bawaan browser dan Node.js modern.

### 4. ES2023 Immutable Array Methods:

Method array lama seperti `sort()`, `reverse()`, dan `splice()` **memutasikan** (mengubah) array asli secara langsung.
ES2023 menambahkan metode immutable yang menghasilkan array baru:

- `array.toSorted()`
- `array.toReversed()`
- `array.toSpliced()`

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Optional Chaining (?.) ---');
const responseAPI = {
  status: 200,
  data: {
    user: {
      id: 42,
      profile: {
        name: 'Joko Santoso',
        // address sengaja tidak ada
      },
    },
  },
};

// Akses aman properti bersarang tanpa khawatir TypeError
const userCity = responseAPI?.data?.user?.profile?.address?.city;
console.log('Kota pengguna:', userCity); // undefined (tidak crash!)

// Panggilan method opsional
const hitungBonus = responseAPI?.data?.user?.calculateBonus?.();
console.log('Panggilan method opsional:', hitungBonus); // undefined

console.log('\n--- 2. Nullish Coalescing (??) vs Logical OR (||) ---');
const konfigurasiUser = {
  volume: 0, // User sengaja menyetel volume 0 (mute)
  namaTampilan: '', // User mengosongkan nama tampilan
  delayDetik: null, // Belum dikonfigurasi
};

// Masalah dengan Logical OR (||):
console.log('Volume dengan || :', konfigurasiUser.volume || 50); // 50 (SALAH: 0 dianggap false!)
console.log('Volume dengan ?? :', konfigurasiUser.volume ?? 50); // 0 (BENAR: 0 dipertahankan)

console.log('Nama dengan ||   :', konfigurasiUser.namaTampilan || 'Anonim'); // "Anonim"
console.log('Nama dengan ??   :', konfigurasiUser.namaTampilan ?? 'Anonim'); // "" (string kosong valid)

console.log('Delay dengan ??  :', konfigurasiUser.delayDetik ?? 5); // 5 (karena null)

console.log('\n--- 3. Deep Clone dengan structuredClone() ---');
const masterProduk = {
  sku: 'PRD-001',
  tags: new Set(['elektronik', 'gadget']),
  spesifikasi: {
    beratGram: 500,
    dimensi: { panjang: 20, lebar: 15 },
  },
};

// Deep copy independen
const klonProduk = structuredClone(masterProduk);
klonProduk.spesifikasi.dimensi.panjang = 99; // Mengubah hasil klon

console.log('Panjang asli :', masterProduk.spesifikasi.dimensi.panjang); // Tetap 20
console.log('Panjang klon :', klonProduk.spesifikasi.dimensi.panjang); // 99

console.log('\n--- 4. Immutable Array Methods (ES2023) ---');
const daftarSkor = [85, 92, 78, 95, 60];

// toSorted() tidak memutasikan array asli
const skorUrut = daftarSkor.toSorted((a, b) => a - b);
const skorBalik = daftarSkor.toReversed();

console.log('Array Asli   :', daftarSkor);
console.log('Hasil toSorted :', skorUrut);
console.log('Hasil toReversed :', skorBalik);
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Optional Chaining (?.) ---
Kota pengguna: undefined
Panggilan method opsional: undefined

--- 2. Nullish Coalescing (??) vs Logical OR (||) ---
Volume dengan || : 50
Volume dengan ?? : 0
Nama dengan ||   : Anonim
Nama dengan ??   :
Delay dengan ??  : 5

--- 3. Deep Clone dengan structuredClone() ---
Panjang asli : 20
Panjang klon : 99

--- 4. Immutable Array Methods (ES2023) ---
Array Asli   : [ 85, 92, 78, 95, 60 ]
Hasil toSorted : [ 60, 78, 85, 92, 95 ]
Hasil toReversed : [ 60, 95, 78, 92, 85 ]
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Konsumsi REST API / GraphQL**: Response dari server sering kali tidak memiliki field tertentu jika data belum lengkap di database (misal: user belum mengisi alamat rumah).
2. **State Management di React/Vue/Redux**: Framework modern melarang keras mutasi langsung pada array/objek state. Penggunaan `toSorted()` dan `structuredClone()` menjadi solusi standar industri.
3. **Form Setting Audio / Games**: Fitur game dengan volume suara `0` akan rusak jika menggunakan `volume || 100`, karena volume `0` akan otomatis ter-reset ke `100`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Salah Tempat Menggunakan `?.`**: Jangan gunakan `?.` pada variabel yang dideklarasikan dengan `let` atau `const` yang belum ada (contoh: `variabelGaib?.nama` tetap memicu _ReferenceError_). `?.` hanya melindungi properti dari objek yang bernilai `null` atau `undefined`.
- **Menggunakan `structuredClone` untuk Function**: `structuredClone()` tidak dapat mengkloning function atau element DOM (akan melempar `DataCloneError`).

### 🌟 Best Practice

- Gabungkan `?.` dengan `??` untuk nilai default yang bersih dan elegan:
  `const avatarUrl = user?.profile?.avatar ?? '/images/default-avatar.png';`
- Gunakan `toSorted()` saat ingin menampilkan daftar yang terurut di frontend tanpa merusak urutan asli data di state.

---

## 6. ✍️ Latihan Mandiri

1. Diberikan objek pesanan:
   `const pesanan = { id: 12, pelanggan: { kontak: {} } };`
   Ambil nomor telepon pelanggan menggunakan `?.` dan berikan fallback string `"Nomor telepon belum diatur"` menggunakan `??`.
2. Buatlah sebuah array daftar harga `[50000, 20000, 100000, 15000]`. Urutkan dari yang termurah tanpa mengubah isi array aslinya.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [01 - Web Storage API](../01-web-storage/README.md)
- ➡️ **Selanjutnya:** [03 - URL dan FormData API](../03-url-and-formdata/README.md)
- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
