# 07 - Date (Epoch Timestamp, ISO 8601, Parsing, Getter dan Setter)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memahami representasi waktu dan penanggalan berbasis **Unix Epoch Timestamp** (1 Januari 1970 UTC).
> - **Kapan Digunakan**: Mampu menginstansiasi objek `Date` menggunakan 4 cara konstruktor yang berbeda.
> - **Aturan Praktis**: Simpan dan kirim data tanggal di API backend selalu dalam format standar string ISO 8601 (`toISOString()`) atau Unix Epoch milidetik.

## 1. 🎯 Tujuan Belajar

- Memahami representasi waktu dan penanggalan berbasis **Unix Epoch Timestamp** (1 Januari 1970 UTC).
- Mampu menginstansiasi objek `Date` menggunakan 4 cara konstruktor yang berbeda.
- Memahami standar parsing waktu internasional **ISO 8601** dan batasan `Date.parse()`.
- Menguasai method Getter dan Setter untuk membaca dan memanipulasi komponen tanggal/waktu.
- Mengetahui bahwa index bulan di JavaScript selalu dimulai dari angka `0` (0-indexed).

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> Objek `Date` seperti **arloji stopwatch digital yang menghitung detik sejak dini hari 1 Januari 1970**: Angka internalnya hanya satu (jumlah milidetik), namun dial jam tersebut bisa menerjemahkan angka itu ke dalam jarum jam, penanggalan kalender, atau zona waktu kota yang berbeda-beda.

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

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Instansiasi Tanggal & Pembacaan Komponen (Getter) ---');
// 17 Agustus 2026 pukul 11:00:00 (Bulan Agustus = index 7)
const tanggalMulai = new Date(2026, 7, 17, 11);
console.log('Objek Date Mulai             :', tanggalMulai.toISOString());
console.log('Komponen Tahun (getFullYear) :', tanggalMulai.getFullYear());
console.log(
  'Komponen Bulan (getMonth 0-11):',
  tanggalMulai.getMonth(),
  '(7 = Agustus)'
);
console.log('Komponen Tanggal (getDate)   :', tanggalMulai.getDate());

console.log('\n--- 2. Manipulasi Tanggal dengan Setter (Auto-Rollover) ---');
// Buat salinan tanggal agar tidak memutasi objek asli
const tanggalKadaluarsa = new Date(tanggalMulai);
// Tambahkan 30 hari (otomatis berganti ke bulan September)
tanggalKadaluarsa.setDate(tanggalKadaluarsa.getDate() + 30);

console.log('Format ISO 8601              :', tanggalKadaluarsa.toISOString());
console.log(
  'Format Lokal Indonesia       :',
  tanggalKadaluarsa.toLocaleDateString('id-ID')
);

console.log('\n--- 3. Kalkulasi Selisih Waktu via Epoch Milidetik ---');
const selisihMilidetik = tanggalKadaluarsa.getTime() - tanggalMulai.getTime();
const selisihHari = selisihMilidetik / (1000 * 60 * 60 * 24);

console.log('Selisih Waktu                :', selisihHari, 'hari');
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Instansiasi Tanggal & Pembacaan Komponen (Getter) ---
Objek Date Mulai             : 2026-08-17T04:00:00.000Z
Komponen Tahun (getFullYear) : 2026
Komponen Bulan (getMonth 0-11): 7 (7 = Agustus)
Komponen Tanggal (getDate)   : 17

--- 2. Manipulasi Tanggal dengan Setter (Auto-Rollover) ---
Format ISO 8601              : 2026-09-16T04:00:00.000Z
Format Lokal Indonesia       : 16/9/2026

--- 3. Kalkulasi Selisih Waktu via Epoch Milidetik ---
Selisih Waktu                : 30 hari
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Format Waktu Transaksi & Notifikasi**: Mengonversi stempel waktu dari database menjadi string ramah pengguna menggunakan `toLocaleDateString('id-ID')`.
2. **Menghitung Selisih Hari / Umur**: Mengurangi dua nilai timestamp (`(dateB - dateA) / (1000 * 60 * 60 * 24)`) untuk mengetahui durasi sewa hotel atau masa aktif langganan.
3. **Audit Logging**: Merekam waktu tepat terjadinya error atau aktivitas user dengan `new Date().toISOString()`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Bulan 0-Indexed**: Mengira bulan Desember adalah angka 12 (`new Date(2026, 12, 1)` menghasilkan 1 Januari 2027 karena angka 12 meluap/overflow ke tahun berikutnya). Ingat: Januari = 0, Desember = 11.
- **Parsing format non-standar**: Menulis `Date.parse('02/03/2026')` ambigu apakah 2 Maret atau 3 Februari tergantung pengaturan browser pengguna. Selalu gunakan format standar ISO `YYYY-MM-DD`.
- **Perbedaan Zona Waktu**: `getHours()` mengembalikan jam lokal komputer pengguna, sedangkan `getUTCHours()` mengembalikan jam standar UTC/GMT. Kesalahan memilih dapat menyebabkan laporan transaksi meleset 7 jam di Indonesia (WIB).

### 🌟 Best Practice

- Simpan dan kirim data tanggal di API backend selalu dalam format standar string ISO 8601 (`toISOString()`) atau Unix Epoch milidetik.
- Gunakan `Date.now()` jika Anda hanya ingin mendapatkan timestamp angka saat ini tanpa memerlukan alokasi objek `new Date()`.
- Manfaatkan sifat auto-rollover pada setter untuk kalkulasi penambahan waktu (misal: `d.setDate(d.getDate() + 30)` otomatis memperhitungkan pergantian bulan dan tahun kabisat).

---

## 6. ✍️ Latihan Mandiri

1. Buat fungsi `hitungSelisihHari(tanggalMulai, tanggalSelesai)` yang menerima dua objek Date atau string ISO dan mengembalikan jumlah selisih hari dalam bilangan bulat.
2. Buat fungsi `formatTanggalIndonesia(objDate)` yang menghasilkan string penanggalan formal: contoh `'Rabu, 28 Oktober 2026'` menggunakan `toLocaleDateString('id-ID', options)`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [06 - BigInt](../06-bigint/README.md)
- ➡️ **Selanjutnya:** [08 - Math](../08-math/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
