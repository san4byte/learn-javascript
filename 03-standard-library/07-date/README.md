# 07 - Date (Epoch Timestamp, ISO 8601, Parsing, Getter, Setter, dan Lokalisasi)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengelola penanggalan dan waktu berbasis **Unix Epoch** (selisih milidetik sejak 1 Januari 1970 00:00:00 UTC).
> - **Kapan Digunakan**: Mencatat waktu transaksi, menghitung durasi/selisih hari, memformat waktu ke bahasa lokal, dan jadwal kedaluwarsa.
> - **Aturan Praktis**: Ingat bahwa indeks bulan dimulai dari `0` (Januari = 0, Desember = 11), simpan/kirim waktu API dalam standar string ISO 8601 (`toISOString()`), dan gunakan `Date.now()` untuk timestamp angka instan.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep dasar Unix Epoch Timestamp dan representasi waktu internal JavaScript.
- Menguasai seluruh method getter, setter, dan static pada objek `Date` beserta skenario kasusnya masing-masing.
- Menguasai 4 cara instansiasi objek `Date` dan menghindari jebakan indeks bulan (0-indexed).
- Memahami perbedaan krusial antara zona waktu lokal (_Local Time_) dan waktu standar dunia (_UTC_).
- Menguasai teknik manipulasi tanggal memanfaatkan kemampuan _auto-rollover_ pada setter.
- Menguasai kalkulasi selisih waktu, durasi hari, dan pengukuran performa menggunakan `Date.now()`.
- Menguasai pemformatan waktu internasional ramah pengguna via `toLocaleDateString()` dan `toLocaleTimeString()`.
- Mengetahui cara mendeteksi dan memvalidasi objek `Invalid Date`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Objek `Date` seperti **arloji stopwatch digital yang menghitung detik sejak 1 Januari 1970 UTC**: Angka internal yang disimpannya hanyalah satu nilai tunggal (jumlah milidetik), namun tampilan layarnya mampu menerjemahkan angka tunggal tersebut ke dalam jarum jam lokal, penanggalan kalender masehi, hari dalam seminggu, atau zona waktu kota mana pun di dunia.

---

### 1. Tabel Ringkasan Method Date (Cheat-Sheet)

| Kategori         | Method                              | Nilai Kembalian   | Deskripsi Singkat                                          |
| :--------------- | :---------------------------------- | :---------------- | :--------------------------------------------------------- |
| **Getter Lokal** | `getFullYear()`                     | `number`          | Tahun 4 digit (contoh: `2026`).                            |
|                  | `getMonth()`                        | `number` (0–11)   | Indeks bulan (**0 = Januari**, 11 = Desember).             |
|                  | `getDate()`                         | `number` (1–31)   | Tanggal hari dalam bulan.                                  |
|                  | `getDay()`                          | `number` (0–6)    | Hari dalam minggu (**0 = Minggu**, 6 = Sabtu).             |
|                  | `getHours()`, `getMinutes()`        | `number`          | Jam lokal (0–23) dan menit (0–59).                         |
|                  | `getSeconds()`, `getMilliseconds()` | `number`          | Detik (0–59) dan milidetik (0–999).                        |
|                  | `getTime()`                         | `number`          | Total milidetik sejak 1 Januari 1970 UTC.                  |
|                  | `getTimezoneOffset()`               | `number` (menit)  | Selisih waktu lokal dengan UTC (WIB = -420 menit).         |
| **Standar UTC**  | `getUTCFullYear()`, `getUTCHours()` | `number`          | Versi pembacaan waktu standar internasional (UTC/GMT).     |
| **Setter**       | `setFullYear(year)`                 | `number` (epoch)  | Menyetel tahun.                                            |
|                  | `setMonth(monthIndex)`              | `number` (epoch)  | Menyetel bulan (0–11).                                     |
|                  | `setDate(day)`                      | `number` (epoch)  | Menyetel tanggal hari (mendukung auto-rollover).           |
|                  | `setHours(hr, [min], [sec])`        | `number` (epoch)  | Menyetel jam, menit, detik.                                |
| **Static**       | `Date.now()`                        | `number`          | Mengambil epoch milidetik saat ini secara instan ($O(1)$). |
|                  | `Date.parse(dateString)`            | `number` \| `NaN` | Mengonversi string tanggal menjadi angka epoch ms.         |
| **Formatting**   | `toISOString()`                     | `string`          | Standar ISO 8601: `YYYY-MM-DDTHH:mm:ss.sssZ`.              |
|                  | `toLocaleDateString([loc], [opt])`  | `string`          | Format penanggalan sesuai konvensi negara/bahasa.          |
|                  | `toLocaleTimeString([loc], [opt])`  | `string`          | Format jam/menit sesuai konvensi lokal.                    |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Method Date

Berikut adalah rincian lengkap setiap fitur dan method `Date` beserta skenario kasusnya masing-masing:

---

#### 1. Empat Cara Instansiasi Objek `Date`

- **Waktu Saat Ini**: `new Date()`
- **Unix Epoch (Milidetik)**: `new Date(0)` (1 Januari 1970 00:00:00 UTC)
- **String ISO 8601**: `new Date('2026-08-17T10:00:00.000Z')`
- **Komponen Angka**: `new Date(tahun, indexBulan, tanggal, jam, menit, detik)`

```javascript
// ⚠️ Ingat: Indeks bulan dimulai dari 0 (Agustus = 7)
const hutRi = new Date(2026, 7, 17, 10, 0, 0);
console.log(hutRi.getFullYear()); // 2026
```

---

#### 2. Pembacaan Waktu Lokal: Method Getter

Mengambil komponen waktu berdasarkan zona waktu perangkat pengguna:

```javascript
const tgl = new Date();
console.log(tgl.getFullYear()); // 2026
console.log(tgl.getMonth()); // 0-11 (Bulan saat ini)
console.log(tgl.getDate()); // 1-31 (Tanggal)
console.log(tgl.getDay()); // 0-6 (0 = Minggu)
console.log(tgl.getHours()); // Jam lokal
console.log(tgl.getMinutes()); // Menit
console.log(tgl.getSeconds()); // Detik
console.log(tgl.getMilliseconds()); // Milidetik
```

---

#### 3. Nilai Epoch Milidetik: `getTime()` & `Date.now()`

Mengambil total milidetik sejak 1 Januari 1970 UTC:

```javascript
const d = new Date();
console.log(d.getTime()); // Contoh: 1791536805679

// Date.now() jauh lebih cepat karena tidak membuat objek Date:
const timestampSekarang = Date.now();
console.log(timestampSekarang);
```

---

#### 4. Waktu Standar Universal (UTC) vs `getTimezoneOffset()`

- Method dengan prefix `getUTC...` membaca waktu di meridian Greenwich:
  ```javascript
  console.log(d.getUTCHours()); // Jam di UTC
  ```
- **`getTimezoneOffset()`**: Mengembalikan selisih dalam menit ke UTC:
  ```javascript
  console.log(d.getTimezoneOffset()); // -420 (pada WIB karena UTC+7 = 7 * 60 = 420 menit)
  ```

---

#### 5. Manipulasi Tanggal: Method Setter & Kemampuan Auto-Rollover

Method setter secara cerdas melimpahkan kelebihan hari ke bulan berikutnya (_auto-rollover_):

```javascript
const pesanan = new Date(2026, 0, 31); // 31 Januari 2026

// Tambah 1 hari:
pesanan.setDate(pesanan.getDate() + 1);
console.log(pesanan.getDate()); // 1
console.log(pesanan.getMonth()); // 1 (Februari)

// Trik Mengetahui Jumlah Hari di Suatu Bulan:
const jumlahHariFeb = new Date(2026, 2, 0).getDate(); // Tanggal 0 Maret = akhir Februari
console.log(jumlahHariFeb); // 28 hari
```

---

#### 6. Parsing String Tanggal: `Date.parse(dateString)`

Mengubah string penanggalan menjadi angka epoch milidetik tanpa membuat objek `Date`:

```javascript
const ms = Date.parse("2026-08-17T10:00:00.000Z");
console.log(ms); // 1786960800000 (angka milidetik)
console.log(Date.parse("bukan-tanggal")); // NaN
```

---

#### 7. Standar Format Database & API: `toISOString()`

Menghasilkan string format standar internasional ISO 8601 UTC (`YYYY-MM-DDTHH:mm:ss.sssZ`):

```javascript
const waktu = new Date();
console.log(waktu.toISOString()); // "2026-10-09T09:06:45.656Z"
```

---

#### 8. Lokalisasi Bahasa Ramah Pengguna: `toLocaleDateString()` & `toLocaleTimeString()`

Memformat tanggal dan jam sesuai bahasa negara klien:

```javascript
const jadwal = new Date("2026-08-17T10:00:00Z");

// Format Tanggal Indonesia
console.log(
  jadwal.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
); // "Senin, 17 Agustus 2026"

// Format Jam Indonesia
console.log(jadwal.toLocaleTimeString("id-ID")); // "17.00.00"
```

---

#### 9. Validasi Tanggal: Deteksi `Invalid Date`

Jika string yang diparsing tidak sah, JavaScript tidak melempar error, melainkan mengembalikan `Invalid Date` dengan nilai `getTime() === NaN`:

```javascript
function isValidDate(dateObj) {
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
}

console.log(isValidDate(new Date("2026-12-31"))); // true ✅
console.log(isValidDate(new Date("rusak"))); // false ✅
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep 4 cara instansiasi, perbedaan zona waktu lokal vs UTC, auto-rollover penanggalan, kalkulasi durasi, lokalisasi bahasa Indonesia, dan deteksi validitas tanggal di atas dirangkum ke dalam satu script laboratorium terpadu yang siap dijalankan langsung di terminal.

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 03-standard-library/07-date/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Jadwal Jatuh Tempo Tagihan**: Menghitung tanggal kedaluwarsa invoice 30 hari ke depan menggunakan `tgl.setDate(tgl.getDate() + 30)`.
2. **Audit Log & Stempel Transaksi**: Menyimpan stempel waktu pembuatan record database dalam format `new Date().toISOString()`.
3. **Format Kalender UI**: Menampilkan label tanggal formal pada komponen UI aplikasi menggunakan `toLocaleDateString('id-ID')`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Bulan 0-Indexed**: Mengira bulan Desember adalah angka 12 (`new Date(2026, 12, 1)` menghasilkan 1 Januari 2027 karena angka 12 melimpah ke tahun berikutnya).
- **Mutasi Objek Tanggal yang Dibagikan**: Memanggil `d.setDate()` memutasi objek tanggal asli di tempat (_mutable_). Buat salinan terlebih dahulu `const baru = new Date(lama)` sebelum memanipulasi.
- **Ambigu Zona Waktu pada String Pendek**: String tanggal tanpa jam seperti `'2026-08-17'` diparse sebagai UTC di sebagian standar, yang dapat berubah menjadi 16 Agustus malam saat dikonversi ke jam lokal belahan barat.

### 🌟 Best Practice

- Selalu simpan dan kirim data tanggal di API backend dalam format ISO 8601 UTC (`toISOString()`) atau Unix Epoch milidetik (`Date.now()`).
- Gunakan `Date.now()` untuk mengukur durasi dan benchmarking algoritma.
- Gunakan `!isNaN(date.getTime())` untuk memvalidasi tanggal sebelum melakukan kalkulasi.

---

## 5. ✍️ Latihan Mandiri

1. Buat fungsi `hitungUsia(tanggalLahir)` yang menerima string tanggal atau objek Date dan mengembalikan jumlah tahun usia seseorang saat ini.
2. Buat fungsi `tambahHariKerja(tanggalMulai, jumlahHari)` yang menambahkan sejumlah hari tetapi otomatis melewati hari Sabtu dan Minggu (_weekend_).
3. Buat fungsi `formatWaktuRelatif(timestamp)` yang mengembalikan format waktu relatif ramah pengguna seperti `"5 menit yang lalu"` atau `"2 hari yang lalu"`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [06 - BigInt](../06-bigint/README.md)
- ➡️ **Selanjutnya:** [08 - Math](../08-math/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
