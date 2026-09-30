# 07 - Date (Epoch Timestamp, ISO 8601, Parsing, Getter dan Setter)

## 1. 🎯 Tujuan Belajar

- Memahami representasi waktu dan penanggalan berbasis **Unix Epoch Timestamp** (1 Januari 1970 UTC).\n- Mampu menginstansiasi objek `Date` menggunakan 4 cara konstruktor yang berbeda.\n- Memahami standar parsing waktu internasional **ISO 8601** dan batasan `Date.parse()`.\n- Menguasai method Getter dan Setter untuk membaca dan memanipulasi komponen tanggal/waktu.\n- Mengetahui bahwa index bulan di JavaScript selalu dimulai dari angka `0` (0-indexed).

---

## 2. 📖 Penjelasan Konsep

Objek **`Date`** di JavaScript digunakan untuk mengelola tanggal dan waktu. Di balik layar, objek Date menyimpan satu nilai tunggal berupa angka integer milidetik yang telah berlalu sejak **Unix Epoch**, yaitu tanggal **1 Januari 1970 pukul 00:00:00 UTC**.

### 1. Empat Cara Membuat Objek `Date`

1. `new Date()`: Menghasilkan objek tanggal dan waktu saat ini (_current timestamp_).
2. `new Date(milliseconds)`: Membuat tanggal berdasarkan selisih milidetik dari Unix Epoch.
3. `new Date(dateString)`: Melakukan parsing dari string penanggalan. Standar paling aman dan universal adalah format **ISO 8601**: `YYYY-MM-DDTHH:mm:ss.sssZ`.
4. `new Date(year, monthIndex, [day], [hours], [minutes], [seconds])`: Membuat tanggal manual.
   > ⚠️ **Aturan Krusial**: Parameter `monthIndex` selalu dimulai dari **0** (Januari = 0, Februari = 1, ..., Desember = 11).

### 2. Method `Date.now()` & `Date.parse()`

- **`Date.now()`**: Mengembalikan angka epoch milidetik saat ini (sangat cepat untuk benchmarking performa).
- **`Date.parse(dateString)`**: Mengonversi string tanggal menjadi epoch timestamp milidetik.
  > ⚠️ **Catatan Akurasi**: Format selain ISO 8601 (seperti format lokal `"DD/MM/YYYY"` atau `"MM-DD-YYYY"`) dapat menghasilkan parsing yang berbeda antar browser karena implementasinya diserahkan ke vendor browser. Selalu gunakan format ISO 8601!

### 3. Tabel Referensi Lengkap Method Objek `Date`

| Kategori         | Method                              | Nilai Balik / Deskripsi                                      |
| :--------------- | :---------------------------------- | :----------------------------------------------------------- |
| **Getter Lokal** | `getFullYear()`                     | Angka tahun 4 digit (misal: `2026`)                          |
|                  | `getMonth()`                        | Angka bulan **0-11** (`0` = Januari, `11` = Desember)        |
|                  | `getDate()`                         | Tanggal hari dalam bulan (angka `1-31`)                      |
|                  | `getDay()`                          | Hari dalam minggu (angka `0-6`, `0` = Minggu)                |
|                  | `getHours()`, `getMinutes()`        | Jam (`0-23`) dan menit (`0-59`)                              |
|                  | `getSeconds()`, `getMilliseconds()` | Detik (`0-59`) dan milidetik (`0-999`)                       |
|                  | `getTime()`                         | Selisih total milidetik dari Unix Epoch (1 Jan 1970)         |
|                  | `getTimezoneOffset()`               | Selisih waktu lokal dengan UTC dalam menit                   |
| **Setter Lokal** | `setFullYear(year)`                 | Menyetel tahun                                               |
|                  | `setMonth(monthIndex)`              | Menyetel bulan (`0-11`)                                      |
|                  | `setDate(day)`                      | Menyetel tanggal (`1-31`, mendukung kalkulasi auto-rollover) |
|                  | `setHours(hr, [min], [sec])`        | Menyetel jam, menit, dan detik                               |
|                  | `setTime(milliseconds)`             | Menyetel waktu langsung via epoch milidetik                  |
| **Standar UTC**  | `getUTCFullYear()`, `getUTCHours()` | Versi waktu standar universal UTC/GMT                        |
| **Formatting**   | `toISOString()`                     | Format internasional ISO 8601: `YYYY-MM-DDTHH:mm:ss.sssZ`    |
|                  | `toLocaleDateString([loc])`         | String tanggal lokal: `'28/10/2026'`                         |
|                  | `toLocaleTimeString([loc])`         | String waktu/jam lokal: `'09.30.00'`                         |
|                  | `toLocaleString([loc], [opt])`      | Format lengkap tanggal + waktu dengan opsi format kustom     |

---

## 3. 💻 Contoh Kode (`contoh.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Berbagai Cara Membuat Objek Date ---');
const sekarang = new Date();
console.log('Waktu saat ini (Lokal)       :', sekarang.toString());
console.log('Waktu saat ini (ISO 8601)    :', sekarang.toISOString());
console.log('Unix Epoch Timestamp (ms)    :', Date.now());

// Membuat tanggal spesifik: Ingat bulan dimulai dari 0 (9 = Oktober)
const hariSumpahPemuda = new Date(2026, 9, 28, 9, 30, 0);
console.log('Tanggal Sumpah Pemuda 2026   :', hariSumpahPemuda.toLocaleString('id-ID'));

console.log('\n--- 2. Parsing Tanggal dengan Standar ISO 8601 ---');
const stringISO = '2026-12-31T23:59:59.000Z';
const timestampMalamTahunBaru = Date.parse(stringISO);
console.log('Hasil Date.parse (Epoch ms)  :', timestampMalamTahunBaru);

const tahunBaru = new Date(stringISO);
console.log('Tahun dari ISO string        :', tahunBaru.getUTCFullYear());

console.log('\n--- 3. Komponen Getter & Manipulasi dengan Setter ---');
const ultah = new Date(2026, 0, 15); // 15 Januari 2026
console.log('Tahun awal                   :', ultah.getFullYear());
console.log('Bulan (0-indexed)            :', ultah.getMonth(), '(0 = Januari)');
console.log('Tanggal (1-31)               :', ultah.getDate());

// Ubah tanggal ke 20 hari kemudian menggunakan setter
ultah.setDate(ultah.getDate() + 20); // 15 + 20 = 35 Januari -> otomatis geser ke 4 Februari!
console.log('Setelah ditambah 20 hari     :', ultah.toLocaleDateString('id-ID'));
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Berbagai Cara Membuat Objek Date ---
Waktu saat ini (Lokal)       : [Tanggal waktu lokal komputer]
Waktu saat ini (ISO 8601)    : 2026-09-30T13:50:00.000Z
Unix Epoch Timestamp (ms)    : [Angka epoch timestamp milidetik]
Tanggal Sumpah Pemuda 2026   : 28/10/2026, 09.30.00

--- 2. Parsing Tanggal dengan Standar ISO 8601 ---
Hasil Date.parse (Epoch ms)  : 1798761599000
Tahun dari ISO string        : 2026

--- 3. Komponen Getter & Manipulasi dengan Setter ---
Tahun awal                   : 2026
Bulan (0-indexed)            : 0 (0 = Januari)
Tanggal (1-31)               : 15
Setelah ditambah 20 hari     : 04/02/2026
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata

> Objek `Date` seperti **arloji stopwatch digital yang menghitung detik sejak dini hari 1 Januari 1970**: Angka internalnya hanya satu (jumlah milidetik), namun dial jam tersebut bisa menerjemahkan angka itu ke dalam jarum jam, penanggalan kalender, atau zona waktu kota yang berbeda-beda.

### 🏢 Real-World Use Case

1. **Format Waktu Transaksi & Notifikasi**: Mengonversi stempel waktu dari database menjadi string ramah pengguna menggunakan `toLocaleDateString('id-ID')`.\n2. **Menghitung Selisih Hari / Umur**: Mengurangi dua nilai timestamp (`(dateB - dateA) / (1000 * 60 * 60 * 24)`) untuk mengetahui durasi sewa hotel atau masa aktif langganan.\n3. **Audit Logging**: Merekam waktu tepat terjadinya error atau aktivitas user dengan `new Date().toISOString()`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Bulan 0-Indexed**: Mengira bulan Desember adalah angka 12 (`new Date(2026, 12, 1)` menghasilkan 1 Januari 2027 karena angka 12 meluap/overflow ke tahun berikutnya). Ingat: Januari = 0, Desember = 11.\n* **Parsing format non-standar**: Menulis `Date.parse('02/03/2026')` ambigu apakah 2 Maret atau 3 Februari tergantung pengaturan browser pengguna. Selalu gunakan format standar ISO `YYYY-MM-DD`.\n* **Perbedaan Zona Waktu**: `getHours()` mengembalikan jam lokal komputer pengguna, sedangkan `getUTCHours()` mengembalikan jam standar UTC/GMT. Kesalahan memilih dapat menyebabkan laporan transaksi meleset 7 jam di Indonesia (WIB).

### 🌟 Best Practice

- Simpan dan kirim data tanggal di API backend selalu dalam format standar string ISO 8601 (`toISOString()`) atau Unix Epoch milidetik.\n* Gunakan `Date.now()` jika Anda hanya ingin mendapatkan timestamp angka saat ini tanpa memerlukan alokasi objek `new Date()`.\n* Manfaatkan sifat auto-rollover pada setter untuk kalkulasi penambahan waktu (misal: `d.setDate(d.getDate() + 30)` otomatis memperhitungkan pergantian bulan dan tahun kabisat).

---

## 6. ✍️ Latihan Mandiri

1. Buat fungsi `hitungSelisihHari(tanggalMulai, tanggalSelesai)` yang menerima dua objek Date atau string ISO dan mengembalikan jumlah selisih hari dalam bilangan bulat.\n2. Buat fungsi `formatTanggalIndonesia(objDate)` yang menghasilkan string penanggalan formal: contoh `'Rabu, 28 Oktober 2026'` menggunakan `toLocaleDateString('id-ID', options)`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [06 - BigInt](../06-bigint/README.md)\n- ➡️ **Selanjutnya:** [08 - Math](../08-math/README.md)\n- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)\n- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
