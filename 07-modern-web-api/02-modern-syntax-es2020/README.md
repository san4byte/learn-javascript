# 02 - Modern Syntax ES2020-ES2023 (Optional Chaining, Nullish Coalescing, Immutability)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menguasai penulisan kode JavaScript modern (rilisan TC39 ES2020 hingga ES2023) yang lebih ringkas, aman dari crash runtime, dan mendukung prinsip _immutability_.
> - **Kapan Digunakan**: Mengakses data bersarang (_nested response_) dari REST API tanpa fatal error, menyediakan nilai bawaan (_default value_) yang tepat, menyalin objek secara mandiri (_deep clone_), serta memanipulasi array tanpa merusak state asli.
> - **Aturan Praktis**: Gunakan `?.` untuk navigasi objek opsional dan padukan dengan `??` untuk nilai fallback. Gunakan `structuredClone()` untuk deep copy dan `toSorted()` / `toReversed()` alih-alih `sort()` / `reverse()` agar tidak memutasi data sumber.

---

## 1. 🎯 Tujuan Belajar

- Menguasai operator _Optional Chaining_ (`?.`) pada akses properti, pemanggilan method dinamis, dan indeks array.
- Memahami perbedaan mendasar antara _Nullish Coalescing_ (`??`) dan _Logical OR_ (`||`).
- Menguasai operator penugasan logika (_Logical Assignment Operators_): `??=`, `||=`, dan `&&=`.
- Memahami cara kerja fungsi bawaan `structuredClone()` untuk _deep copy_ objek bertingkat.
- Menguasai 4 method array _immutable_ standar ES2023: `toSorted()`, `toReversed()`, `toSpliced()`, dan `with()`.
- Menerapkan prinsip _immutability_ pada manajemen state aplikasi modern.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **Optional Chaining (`?.`)** seperti **kurir pengantar paket yang sopan**: Kurir mengetuk gerbang depan rumah (`alamat?.blok?.nomor`); jika rumah kosong atau alamat belum dibangun, kurir langsung mencatat _"tidak ditemukan"_ (`undefined`) dan pulang dengan selamat. Tanpa `?.`, kurir akan mendobrak paksa pintu rumah dan membunyikan alarm keras polisi (**`TypeError: Cannot read properties of undefined`**).
> - **Nullish Coalescing (`??`)** seperti **kasir toko yang teliti**: Jika Anda membayar pulsa dengan kupon diskon bernilai Rp 0 (`volume = 0`), kasir tetap menghargai diskon 0 tersebut. Sementara operator lama `||` bertindak ceroboh dengan menganggap angka 0 sama dengan "tidak ada uang" lalu membatalkan transaksi Anda.
> - **`structuredClone()`** seperti **mesin printer 3D fotokopi sempurna**: mencetak miniatur replika baru yang terpisah total. Anda bisa mengecat miniatur baru tanpa merusak miniatur asli di lemari.

---

### Tabel Ringkasan Fitur Modern ES2020 - ES2023

| Fitur / Operator           | Standar ECMAScript | Perilaku & Manfaat                                                                           |
| :------------------------- | :----------------- | :------------------------------------------------------------------------------------------- |
| **`obj?.prop`**            | ES2020             | Mengembalikan `undefined` jika sisi kiri bernilai `null` atau `undefined` (mencegah crash).  |
| **`a ?? b`**               | ES2020             | Mengambil `b` HANYA jika `a` bernilai `null` atau `undefined` (mempertahankan `0` dan `""`). |
| **`a ??= b`**              | ES2021             | Mengisi variabel `a` dengan nilai `b` hanya jika `a` saat ini bernilai _nullish_.            |
| **`structuredClone(obj)`** | Web API / Node 17+ | Mengkloning objek bertingkat secara mendalam (_deep clone_) tanpa merusak referensi asli.    |
| **`arr.toSorted()`**       | ES2023             | Mengurutkan array dan mengembalikan **array baru** (array asli tidak berubah).               |
| **`arr.toReversed()`**     | ES2023             | Membalik urutan array dan mengembalikan **array baru**.                                      |
| **`arr.with(index, val)`** | ES2023             | Mengganti satu elemen pada indeks tertentu dan mengembalikan **array baru**.                 |

---

### Pembahasan Mendalam Fitur & API

#### 1. Optional Chaining (`?.`) pada Properti Bersarang

Menghilangkan kebutuhan menulis percabangan panjang `if (user && user.address && user.address.city)`.

```javascript
const user = { name: "Joko" };
// Aman: mengembalikan undefined tanpa melempar TypeError
const kota = user?.address?.city;
console.log(kota); // undefined
```

#### 2. Optional Chaining pada Method Call (`?.()`) dan Array (`?.[]`)

Dapat dipasang untuk memanggil fungsi yang mungkin tidak didefinisikan atau mengambil elemen array yang mungkin kosong.

```javascript
// Memanggil method opsional:
user.kirimNotifikasi?.();

// Mengambil indeks array opsional:
const itemUtama = order?.items?.[0];
```

#### 3. Perbedaan Krusial Nullish Coalescing (`??`) vs Logical OR (`||`)

Operator `||` menganggap angka `0`, string kosong `""`, dan boolean `false` sebagai nilai falsy. Sedangkan `??` **hanya** mendeteksi `null` dan `undefined`.

```javascript
const setting = { volume: 0, judul: "" };

console.log(setting.volume || 100); // 100 (❌ SALAH: volume 0 ditimpa 100)
console.log(setting.volume ?? 100); // 0   (✅ BENAR: volume 0 dipertahankan)
```

#### 4. Kombinasi Emas: `?.` Dipadukan dengan `??`

Pola standar industri untuk mengambil data berstruktur dalam sekaligus menyiapkan nilai _fallback_ yang aman:

```javascript
const role = apiResponse?.data?.user?.role ?? "Tamu";
console.log("Peran aktif:", role);
```

#### 5. Logical Assignment Operators (`??=`, `||=`, `&&=`)

Menyederhanakan inisialisasi konfigurasi:

```javascript
const config = { host: "localhost" };
config.port ??= 8080; // set 8080 jika port null/undefined
config.host ||= "127.0.0.1"; // set jika falsy
```

#### 6. Deep Clone Modern Menggunakan `structuredClone()`

Menggantikan trik lawas `JSON.parse(JSON.stringify(obj))` yang lambat dan gagal pada `Date`, `Set`, `Map`, atau _circular reference_.

```javascript
const original = { detail: { skor: 90 }, waktu: new Date() };
const salinan = structuredClone(original);

salinan.detail.skor = 100;
console.log(original.detail.skor); // Tetap 90 (independen murni)
```

#### 7. ES2023 Immutable Array: `toSorted()` dan `toReversed()`

Method klasik `.sort()` dan `.reverse()` memutasikan array asli di tempat (_in-place mutation_), yang sering memicu bug pada state React/Vue.

```javascript
const angka = [3, 1, 4];
const urut = angka.toSorted();
console.log(angka); // [3, 1, 4] (Array asli tetap aman)
console.log(urut); // [1, 3, 4]
```

#### 8. ES2023 Immutable Array: `toSpliced()` dan `with()`

- `toSpliced(start, deleteCount, ...items)`: Versi immutable dari `.splice()`.
- `with(index, value)`: Menyalin array dan memperbarui elemen pada satu indeks tertentu.

```javascript
const warna = ["merah", "kuning", "hijau"];
const warnaBaru = warna.with(1, "biru");
console.log(warnaBaru); // ['merah', 'biru', 'hijau']
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi navigasi properti bersarang via `?.`, perbandingan `??` vs `||`, operator penugasan `??=`, kloning mendalam `structuredClone()`, serta 4 method immutable array ES2023 telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi menggunakan Node.js di terminal:

```bash
node 07-modern-web-api/02-modern-syntax-es2020/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Konsumsi Data API Pihak Ketiga**:
   ```javascript
   function renderUserAvatar(user) {
     const avatarUrl =
       user?.meta?.images?.thumbnail?.url ?? "/assets/default-avatar.png";
     document.getElementById("avatar").src = avatarUrl;
   }
   ```
2. **State Management Tanpa Mutasi (Redux / React State)**:
   ```javascript
   function updateTodoStatus(todos, index, isCompleted) {
     return todos.with(index, { ...todos[index], completed: isCompleted });
   }
   ```

### ⚠️ Common Pitfalls

- **Menggunakan `||` untuk Konfigurasi Nilai Numerik**: Mengakibatkan pengaturan angka `0` (misal: `diskon = 0`, `durasi = 0`) selalu ditolak dan keliru digantikan oleh nilai default.
- **Menggunakan `structuredClone()` pada Fungsi**: Fungsi tidak dapat disalin oleh `structuredClone()` dan akan melempar eksepsi `DOMException: could not be cloned`.

### 🌟 Best Practice

- Utamakan penggunaan `??` daripada `||` untuk semua evaluasi parameter opsi atau _fallback values_.
- Gunakan method immutable (`toSorted`, `toReversed`, `with`) untuk mencegah _side effect_ yang tidak disengaja saat mengolah data array.

---

## 5. ✍️ Latihan Mandiri

1. Diberikan objek `const mobil = { mesin: { cc: 1500 } }`. Gunakan kombinasi `?.` dan `??` untuk mengambil nilai transmisi `mobil?.mesin?.transmisi` dengan nilai fallback `"Manual"`.
2. Gunakan method `.with()` pada array nama hari `['Senin', 'Selasa', 'Rabu']` untuk mengganti `'Selasa'` menjadi `'Tuesday'` tanpa merusak array aslinya!

---

## 6. 🧭 Navigasi

- ⬅️ **Materi Sebelumnya:** [01 - Web Storage API](../01-web-storage/README.md)
- ➡️ **Materi Selanjutnya:** [03 - URL & FormData API](../03-url-and-formdata/README.md)
- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
