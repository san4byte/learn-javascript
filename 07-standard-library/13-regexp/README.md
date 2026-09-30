# 13 - RegExp (Pola Regex, Modifiers, Assertions, Character Classes, dan String Match)

## 1. 🎯 Tujuan Belajar

- Memahami regular expression melalui objek bawaan `RegExp` di JavaScript.\n- Membedakan cara deklarasi literal (`/.../`) dan konstruktor (`new RegExp()`).\n- Menguasai modifiers utama: `i` (case-insensitive), `g` (global), dan `m` (multiline).\n- Memahami komponen pola: assertions, character classes (`\d`, `\w`, `\s`), groups & ranges (`[]`, `()`), dan quantifiers (`+`, `*`, `?`, `{n,m}`).\n- Menguasai method RegExp (`test`, `exec`) dan method Regex pada String (`match`, `search`, `replace`, `replaceAll`, `split`).

---

## 2. 📖 Penjelasan Konsep

**Regular Expression (RegExp)** adalah pola karakter yang digunakan untuk pencocokan string tingkat lanjut, pencarian teks kompleks, validasi form, dan manipulasi penggantian substring.

### 1. Cara Pembuatan RegExp

1. **Sintaks Literal**: `const regex = /pola/modifiers;` (dikompilasi saat skrip dimuat, performa lebih cepat jika polanya statis).
2. **Konstruktor `RegExp`**: `const regex = new RegExp("pola", "modifiers");` (fleksibel jika pola dibangun secara dinamis dari variabel input).

### 2. Modifiers (Flags) Utama

- **`i`** (_ignore case_): Pencocokan tanpa membedakan huruf besar dan huruf kecil.
- **`g`** (_global_): Mencari seluruh kecocokan di dalam string, bukan hanya berhenti di temuan pertama.
- **`m`** (_multiline_): Karakter awal `^` dan akhir `$` berlaku di setiap baris baru.

### 3. Komponen Pola Sintaksis

- **Character Classes**:
  - `\d`: Mencocokkan sembarang angka digit `[0-9]`.
  - `\w`: Mencocokkan sembarang karakter kata (alfanumerik + underscore) `[A-Za-z0-9_]`.
  - `\s`: Mencocokkan karakter spasi/whitespace (spasi, tab, newline).
  - Titik `.`: Mencocokkan sembarang karakter kecuali baris baru.
- **Assertions & Boundaries**:
  - `^`: Harus cocok di awal string.
  - `$`: Harus cocok di akhir string.
  - `\b`: Batas kata (_word boundary_).
- **Quantifiers (Frekuensi)**:
  - `+`: Muncul 1 kali atau lebih.
  - `*`: Muncul 0 kali atau lebih.
  - `?`: Muncul 0 atau 1 kali (opsional).
  - `{n,m}`: Muncul minimal $n$ kali dan maksimal $m$ kali.
- **Groups & Ranges**:
  - `[abc]`: Mencocokkan salah satu karakter 'a', 'b', atau 'c'.
  - `[0-9]`: Rentang angka 0 sampai 9.
  - `(abc)`: _Capturing group_ untuk mengelompokkan pola dan mengekstrak nilainya.

### 4. Method RegExp & Method String Terkait

- `regex.test(str)`: Mengembalikan boolean `true`/`false` (sangat ideal untuk validasi form).
- `regex.exec(str)`: Mengembalikan array detail kecocokan beserta capturing group (atau `null`).
- `str.match(regex)`: Mengembalikan array kecocokan string.
- `str.matchAll(regex)`: Mengembalikan iterator seluruh kecocokan lengkap dengan capturing groups (ES2020, wajib memakai flag `/g`).
- `str.search(regex)`: Mengembalikan indeks posisi pertama kecocokan.
- `str.replace(regex, newStr)` / `str.replaceAll(regex, newStr)`: Mengganti substring berdasarkan pola.
- `str.split(regex)`: Memecah string berdasarkan pola regex.

---

## 3. 💻 Contoh Kode (`contoh.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Validasi Pola dengan regex.test() ---');
// Validasi nomor WhatsApp Indonesia: berawalan 08 atau 628 diikuti 9-12 digit angka
const regexWA = /^(08|628)\d{8,11}$/;

const nomor1 = '081234567890';
const nomor2 = '0812-SALAH';
console.log(`Apakah '${nomor1}' valid WA? :`, regexWA.test(nomor1)); // true
console.log(`Apakah '${nomor2}' valid WA? :`, regexWA.test(nomor2)); // false

console.log('\n--- 2. Ekstraksi Data dengan regex.exec() & Capturing Group ---');
// Ekstraksi format tanggal DD-MM-YYYY
const regexTanggal = /(\d{2})-(\d{2})-(\d{4})/;
const teks = 'Lahir pada 17-08-1945 di Jakarta';
const hasilExec = regexTanggal.exec(teks);

if (hasilExec) {
  console.log('Kecocokan Penuh  :', hasilExec[0]); // "17-08-1945"
  console.log('Tanggal (Group 1):', hasilExec[1]); // "17"
  console.log('Bulan   (Group 2):', hasilExec[2]); // "08"
  console.log('Tahun   (Group 3):', hasilExec[3]); // "1945"
}

console.log('\n--- 3. Method Regex pada String (match, replace, split) ---');
const paragraf = 'Harga apel Rp 15000, harga jeruk Rp 25000, dan melon Rp 45000.';

// match dengan flag global /g: Ambil semua angka
const semuaHarga = paragraf.match(/\d+/g);
console.log('Ekstraksi semua angka:', semuaHarga);

// replace dengan regex: Sensor semua nominal harga
const tersensor = paragraf.replace(/\d+/g, '***');
console.log('Setelah disensor     :', tersensor);

// split dengan regex: Pisahkan kata dengan berbagai pemisah koma, titik koma, spasi
const teksKotor = 'HTML,CSS;JavaScript   NodeJS';
const arrayKata = teksKotor.split(/[,;\s]+/);
console.log('Hasil split dinamis  :', arrayKata);
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Validasi Pola dengan regex.test() ---
Apakah '081234567890' valid WA? : true
Apakah '0812-SALAH' valid WA? : false

--- 2. Ekstraksi Data dengan regex.exec() & Capturing Group ---
Kecocokan Penuh  : 17-08-1945
Tanggal (Group 1): 17
Bulan   (Group 2): 08
Tahun   (Group 3): 1945

--- 3. Method Regex pada String (match, replace, split) ---
Ekstraksi semua angka: [ '15000', '25000', '45000' ]
Setelah disensor     : Harga apel Rp ***, harga jeruk Rp ***, dan melon Rp ***.
Hasil split dinamis  : [ 'HTML', 'CSS', 'JavaScript', 'NodeJS' ]
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata

> `RegExp` seperti **anjing pelacak kepolisian yang telah dilatih mencium aroma spesifik**: ia tidak peduli apakah target yang Anda cari berwarna biru atau merah; ia hanya mencocokkan jejak pola bentuk yang Anda berikan (misalnya: pola 3 huruf diikuti 4 angka) di antara ribuan tumpukan dokumen.

### 🏢 Real-World Use Case

1. **Validasi Input Pengguna**: Memeriksa format alamat email, kekuatan sandi password, nomor KTP, atau nomor HP di form registrasi.\n2. **Pembersihan Data (Sanitasi String)**: Membuang tag HTML berbahaya dari input komentar user (`teks.replace(/<[^>]*>/g, '')`).\n3. **Web Scraping & Log Parsing**: Mengekstrak kode status HTTP (200, 404, 500) dan alamat IP pengunjung dari file log server raksasa.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **State `lastIndex` pada regex dengan flag `/g`**: Jika Anda menggunakan `regex.test()` dengan flag `/g`, regex akan mengingat posisi karakter terakhir. Panggilan kedua berturut-turut pada string yang sama bisa menghasilkan `false` secara mengejutkan! Hindari flag `/g` untuk validasi `test()`.\n* **Lupa double-backslash pada konstruktor string**: Saat menulis `new RegExp('\\d+')`, Anda harus menulis dua garis miring terbalik `\\d` karena string JavaScript mengonsumsi garis miring pertama sebagai escape sequence.\n* **Bencana ReDoS (Regular Expression Denial of Service)**: Pola regex bersarang yang buruk (seperti `(a+)+$`) dapat menyebabkan prosesor CPU 100% _freeze_ saat mengevaluasi string panjang yang tidak cocok (_catastrophic backtracking_).

### 🌟 Best Practice

- Gunakan literal `/pola/` jika pola bersifat statis agar browser mengompilasi regex di awal dengan performa maksimal.\n* Gunakan method `regex.test()` murni jika tujuan Anda hanya ingin memeriksa keabsahan boolean.\n* Gunakan _Named Capturing Groups_ ES2018 `(?<tahun>\d{4})` untuk ekstraksi data yang lebih mudah dibaca daripada nomor urut grup numerik.

---

## 6. ✍️ Latihan Mandiri

1. Buat regex untuk memvalidasi format alamat email standar (harus memuat karakter alfanumerik, simbol `@`, domain, dan ekstensi minimal 2 huruf).\n2. Buat fungsi `ekstrakHashtag(postingan)` yang mengekstrak semua kata berawalan `#` dari teks postingan media sosial menggunakan `match(/#\w+/g)`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [12 - Symbol](../12-symbol/README.md)\n- ➡️ **Selanjutnya:** [14 - Proxy](../14-proxy/README.md)\n- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)\n- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
