# 02 - String (Instance Methods, Search, Transform, dan Padding)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami properti dan method instance bawaan objek `String` standar.
> * **Kapan Digunakan**: Menguasai pencarian substring modern: `includes()`, `startsWith()`, `endsWith()`, `indexOf()`, dan `lastIndexOf()`.
> * **Aturan Praktis**: Gunakan `includes()`, `startsWith()`, dan `endsWith()` untuk pengecekan kondisi teks daripada regex sederhana.

## 1. 🎯 Tujuan Belajar

- Memahami properti dan method instance bawaan objek `String` standar.
- Menguasai pencarian substring modern: `includes()`, `startsWith()`, `endsWith()`, `indexOf()`, dan `lastIndexOf()`.
- Menguasai manipulasi teks: `trim()`, `trimStart()`, `trimEnd()`, `slice()`, `substring()`, `repeat()`, serta `padStart()` / `padEnd()`.
- Memahami transformasi dan pemecahan teks dengan `replace()`, `replaceAll()`, dan `split()`.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> String di JavaScript seperti balok kayu berukir: Anda tidak bisa mengubah satu huruf langsung di balok tersebut (`str[0] = 'X'` tidak akan mengubah apa pun). Jika ingin balok dengan tulisan berbeda, Anda harus memotong atau memahat balok kayu baru.

Tipe data primitif string di JavaScript dibungkus secara otomatis oleh objek bawaan **`String`** (_auto-boxing_) saat kita memanggil method atau propertinya. Seluruh string di JavaScript bersifat **immutable** (tidak dapat diubah langsung di memori; setiap manipulasi menghasilkan string baru).

### Tabel Referensi Method & Properti Lengkap Objek `String`

| Kategori                  | Method / Properti             | Penjelasan & Contoh Kode Singkat                                                            |
| :------------------------ | :---------------------------- | :------------------------------------------------------------------------------------------ |
| **Ukuran & Karakter**     | `str.length`                  | Menghitung jumlah karakter: `'Halo'.length // 4`                                            |
|                           | `str.charAt(index)`           | Mengambil karakter pada indeks tertentu: `'Halo'.charAt(0) // 'H'`                          |
|                           | `str.at(index)`               | Mengambil karakter modern, mendukung indeks negatif: `'Halo'.at(-1) // 'o'`                 |
| **Kapitalisasi**          | `str.toUpperCase()`           | Mengubah seluruh teks menjadi huruf besar: `'halo'.toUpperCase() // 'HALO'`                 |
|                           | `str.toLowerCase()`           | Mengubah seluruh teks menjadi huruf kecil: `'HALO'.toLowerCase() // 'halo'`                 |
| **Pembersihan (Trim)**    | `str.trim()`                  | Menghapus spasi di awal dan di akhir string                                                 |
|                           | `str.trimStart()`             | Menghapus spasi hanya di bagian awal/kiri string                                            |
|                           | `str.trimEnd()`               | Menghapus spasi hanya di bagian akhir/kanan string                                          |
| **Pencarian (Search)**    | `str.includes(search)`        | Boolean apakah memuat substring: `'Belajar JS'.includes('JS') // true`                      |
|                           | `str.startsWith(search)`      | Boolean apakah diawali substring: `'https://...'.startsWith('https') // true`               |
|                           | `str.endsWith(search)`        | Boolean apakah diakhiri substring: `'foto.png'.endsWith('.png') // true`                    |
|                           | `str.indexOf(search)`         | Indeks kemunculan pertama (atau `-1`): `'halo'.indexOf('a') // 1`                           |
|                           | `str.lastIndexOf(search)`     | Indeks kemunculan terakhir dari belakang: `'kodok'.lastIndexOf('k') // 4`                   |
| **Padding & Pengulangan** | `str.padStart(len, char)`     | Mengisi karakter di awal hingga panjang target: `'5'.padStart(3, '0') // '005'`             |
|                           | `str.padEnd(len, char)`       | Mengisi karakter di akhir hingga panjang target: `'5'.padEnd(3, '0') // '500'`              |
|                           | `str.repeat(count)`           | Mengulang string sebanyak $n$ kali: `'Ha'.repeat(3) // 'HaHaHa'`                            |
| **Pemotongan (Slice)**    | `str.slice(start, end)`       | Mengekstrak substring (mendukung indeks negatif): `'JavaScript'.slice(0, 4) // 'Java'`      |
|                           | `str.substring(start, end)`   | Mengekstrak substring klasik (tidak mendukung negatif)                                      |
| **Penggantian (Replace)** | `str.replace(target, new)`    | Mengganti kemunculan **pertama** saja: `'kopi kopi'.replace('kopi', 'teh') // 'teh kopi'`   |
|                           | `str.replaceAll(target, new)` | Mengganti **seluruh** kemunculan kata: `'kopi kopi'.replaceAll('kopi', 'teh') // 'teh teh'` |
| **Pemecahan (Split)**     | `str.split(separator)`        | Memecah string menjadi array: `'A,B,C'.split(',') // ['A', 'B', 'C']`                       |

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Eksplorasi Method String Populer ---');
const email = 'joko.santoso@perusahaan.co.id';
console.log("Apakah email memiliki '@'?          :", email.includes('@'));
console.log("Apakah berawalan 'joko'?             :", email.startsWith('joko'));
console.log("Apakah berakhiran '.co.id'?          :", email.endsWith('.co.id'));

console.log('\n--- 2. Studi Kasus Nyata: Generator Kode Invoice (buatKodeInvoice) ---');
function buatKodeInvoice(prefix, kategori, nomorUrut) {
  // 1. Bersihkan spasi di ujung dan ubah ke uppercase
  const kodePrefix = prefix.trim().toUpperCase();

  // 2. Ubah kategori ke uppercase dan ganti spasi dengan tanda hubung (-)
  const kodeKategori = kategori.toUpperCase().replaceAll(' ', '-');

  // 3. Konversi nomor ke string lalu tambahkan leading zero minimal 5 digit
  const kodeNomor = String(nomorUrut).padStart(5, '0');

  // 4. Gabungkan ketiga bagian dengan template literal
  return `${kodePrefix}-${kodeKategori}-${kodeNomor}`;
}

// Pengujian Kasus Uji:
console.log(
  'Nomor Urut 2 Digit (42)              :',
  buatKodeInvoice('  inv  ', 'alat kantor', 42)
);
// Output: "INV-ALAT-KANTOR-00042"

console.log("String Nomor Urut 1 Digit ('7')      :", buatKodeInvoice('trx ', 'gadget', '7'));
// Output: "TRX-GADGET-00007"

console.log(
  'Nomor Lebih dari 5 Digit             :',
  buatKodeInvoice('inv', 'elektronik', 4279977)
);
// Output: "INV-ELEKTRONIK-4279977" (tidak terpotong oleh padStart)
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Eksplorasi Method String Populer ---
Apakah email memiliki '@'?          : true
Apakah berawalan 'joko'?             : true
Apakah berakhiran '.co.id'?          : true

--- 2. Studi Kasus Nyata: Generator Kode Invoice (buatKodeInvoice) ---
Nomor Urut 2 Digit (42)              : INV-ALAT-KANTOR-00042
String Nomor Urut 1 Digit ('7')      : TRX-GADGET-00007
Nomor Lebih dari 5 Digit             : INV-ELEKTRONIK-4279977
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case

1. **Validasi Domain Email**: Memeriksa ekstensi domain organisasi menggunakan `email.endsWith('@perusahaan.com')`.
2. **Penomoran Faktur / ID Unik**: Menghasilkan ID serial terformat rapi seperti `USER-00001` dengan `id.padStart(5, '0')`.
3. **Sanitasi Input Pengguna**: Menghapus spasi tidak disengaja sebelum data form dikirimkan ke server database menggunakan `trim()`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mengira `replace()` mengubah semua kemunculan string**: `str.replace('a', 'b')` hanya mengganti huruf 'a' yang pertama ditemukan. Gunakan `replaceAll()` jika ingin mengubah semuanya.
* **Mencoba memutasi string via indeks**: `str[0] = 'B'` tidak akan melempar error di non-strict mode tetapi nilainya tidak akan pernah berubah (silent failure).
* **Menggunakan `substring()` alih-alih `slice()`**: `substring()` tidak mendukung indeks negatif dan membalik parameter secara membingungkan jika `start > end`. Utamakan `slice()`.

### 🌟 Best Practice

- Gunakan `includes()`, `startsWith()`, dan `endsWith()` untuk pengecekan kondisi teks daripada regex sederhana.
* Gunakan `replaceAll()` untuk mengganti substring statis tanpa perlu membuat objek RegExp dengan flag global `/g`.
* Selalu lakukan `.trim()` pada data input string dari user sebelum diproses atau disimpan ke database.

---

## 6. ✍️ Latihan Mandiri

1. Buat fungsi `sensorKataKasar(kalimat, kataKasar)` yang mengganti setiap kemunculan kata kasar di dalam kalimat menjadi `***` menggunakan `replaceAll()`.
2. Buat fungsi `formatWaktu(jam, menit, detik)` yang menerima 3 integer dan mengembalikan format waktu digital `HH:MM:SS` menggunakan `padStart(2, '0')`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [01 - Number](../01-number/README.md)
- ➡️ **Selanjutnya:** [03 - Array](../03-array/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
