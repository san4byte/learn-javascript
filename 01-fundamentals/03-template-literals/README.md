# 03 - Template Literals & String Interpolation

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memanipulasi teks dinamis menggunakan karakter backtick (`` ` ``) yang mendukung penyisipan ekspresi JavaScript, string multi-baris tanpa tanda sambung, dan fungsi pengolah khusus (_Tagged Templates_).
> - **Kapan Digunakan**: Selalu gunakan template literals saat merakit string dinamis, merender potongan markup HTML, atau memformat teks terstruktur.
> - **Aturan Praktis**: Gunakan `${ekspresi}` untuk menyisipkan variabel atau operasi logika ringkas. Hindari meletakkan logika kompleks berlarut-larut di dalam kurung kurawal interpolasi; ekstrak terlebih dahulu ke variabel terpisah.

---

## 1. 🎯 Tujuan Belajar

- Memahami keunggulan Template Literals (karakter backtick `` ` ``) dibandingkan string konvensional kutip tunggal/ganda.
- Menguasai teknik _String Interpolation_ menggunakan sintaks `${ekspresi}` untuk menyisipkan variabel, operasi matematika, dan ekspresi ternary.
- Menulis _Multi-line String_ yang bersih dan mudah dibaca tanpa perlu menyambung karakter escape `\n` dan operator `+`.
- Menguasai _Nested Template Literals_ untuk merakit komponen bersarang (seperti looping list HTML).
- Memahami konsep _Tagged Template Literals_ untuk pembuatan pemformatan kustom dan sanitasi keamanan anti-XSS.
- Memanfaatkan metode bawaan `String.raw` untuk menangani teks mentah tanpa evaluasi karakter _escape sequence_.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> String konvensional dengan operator `+` seperti **menyusun kliping koran potongan demi potongan**: Anda harus memotong setiap kata dan merekatkannya dengan lem (`+`), di mana spasi sering terlupa atau hilang. Template Literals seperti **surat formulir resmi yang sudah memiliki kolom isian siap pakai (`${...}`)**: Anda cukup mencetak draf dokumen secara utuh dan sistem otomatis mengisi nama, tanggal, serta perhitungan langsung ke dalam kolom yang tersedia.

---

### Tabel Perbandingan String Konvensional vs Template Literals

| Fitur                     | String Konvensional (`'...'` / `"..."`) | Template Literals (`` `...` ``)       |
| :------------------------ | :-------------------------------------- | :------------------------------------ |
| **Karakter Pembatas**     | Tanda kutip tunggal `'` atau ganda `"`  | Karakter backtick `` ` ``             |
| **Penyisipan Variabel**   | Penggabungan manual dengan `+`          | Interpolasi `${variabel}` otomatis    |
| **Evaluasi Ekspresi**     | Harus dievaluasi di luar string         | Langsung dievaluasi di dalam `${...}` |
| **Teks Multi-Baris**      | Membutuhkan `\n` dan penyambungan `+`   | Langsung menekan Enter secara alami   |
| **Pemrosesan Tag Khusus** | Tidak didukung                          | Didukung melalui _Tagged Template_    |
| **Dukungan Raw String**   | Perlu double escaping `\\`              | Didukung langsung lewat `String.raw`  |

---

### Pembahasan Mendalam Fitur & API

#### 1. Sintaks Dasar Template Literals

Template Literals dideklarasikan dengan mengapit teks menggunakan karakter backtick (`` ` ``) yang terletak di sudut kiri atas keyboard (di bawah tombol Esc).

```javascript
const pesan = `Halo dunia!`;
console.log(pesan); // 'Halo dunia!'
```

#### 2. String Interpolation (`${expression}`)

Segala ekspresi JavaScript yang menghasilkan nilai valid dapat disisipkan ke dalam `${...}`: variabel, perhitungan aritmatika, pemanggilan fungsi, maupun operator ternary.

```javascript
const barang = "Laptop";
const harga = 15000000;
const diskon = 0.1;
const info = `Beli ${barang} seharga Rp ${(harga * (1 - diskon)).toLocaleString("id-ID")}`;
```

#### 3. String Multi-baris Alami

Setiap baris baru (_whitespace newline_) yang Anda ketik di dalam backtick akan dipertahankan persis sesuai aslinya tanpa memerlukan karakter `\n`.

```javascript
const daftarMenu = `
1. Nasi Goreng Spesial
2. Mie Ayam Bakso
3. Es Teh Manis
`.trim();
```

#### 4. Template Literals Bersarang (_Nested Templates_)

Anda dapat menyisipkan template literal baru di dalam blok `${...}` dari template literal luar. Pola ini sangat berguna saat merender data array menjadi elemen markup.

```javascript
const item = ["Apel", "Mangga", "Jeruk"];
const htmlList = `<ul>\n  ${item.map((i) => `<li>${i}</li>`).join("\n  ")}\n</ul>`;
```

#### 5. Tagged Template Literals

Fungsi tag memungkinkan Anda membedah string literal sebelum hasil akhirnya diproduksi. Fungsi menerima parameter pertama berupa array pecahan string statis, disusul parameter _rest_ berisikan seluruh nilai interpolasi yang disisipkan.

```javascript
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    return `${acc}${str}${values[i] ? `<b>${values[i]}</b>` : ""}`;
  }, "");
}
const pengguna = "Budi";
const pesanTeks = highlight`Selamat datang ${pengguna}!`;
```

#### 6. Sanitasi Keamanan Teks (Anti-XSS Sanitizer)

Melalui tagged template, nilai input berbahaya yang dimasukkan pengguna dapat disanitasi sebelum diinjeksikan ke dalam struktur DOM aplikasi.

```javascript
function safeHTML(strings, ...values) {
  const sanitize = (str) =>
    String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return strings.reduce(
    (acc, str, i) => `${acc}${str}${values[i] ? sanitize(values[i]) : ""}`,
    "",
  );
}
```

#### 7. Penanganan Karakter Mentah: `String.raw`

Fungsi tag bawaan `String.raw` membaca karakter apa adanya tanpa menginterpretasikan urutan karakter escape seperti `\n`, `\t`, atau tanda garis miring terbalik (_backslash_ `\`).

```javascript
const direktori = String.raw`C:\Development\nodejs\project`;
console.log(direktori); // 'C:\Development\nodejs\project'
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi string interpolation ekspresi dinamis, pembuatan struktur kartu HTML multi-baris bersarang, implementasi tagged template formatting dan sanitasi anti-XSS, serta penggunaan `String.raw` telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/03-template-literals/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Pembuatan Template Komponen Dinamis**: Membangun kartu data pengguna secara cepat tanpa membutuhkan mesin template pihak ketiga:
   ```javascript
   function renderUserCard(user) {
     return `
       <div class="user-card" id="user-${user.id}">
         <h3>${user.name}</h3>
         <span class="badge ${user.isAdmin ? "badge-admin" : "badge-user"}">
           ${user.isAdmin ? "Administrator" : "Anggota"}
         </span>
       </div>
     `.trim();
   }
   ```
2. **Pustaka CSS-in-JS (seperti `styled-components` di React)**: Menggunakan tagged templates untuk menulis CSS langsung di dalam file JavaScript.
3. **Query Builder Database Terproteksi**: Menggunakan tag SQL (misalnya `sql` tagged template) untuk mengamankan parameter kueri dari serangan SQL Injection.

### ⚠️ Common Pitfalls

- **Menulis Logika Terlalu Rumit di Dalam `${...}`**: Memasukkan rantai ternary bersarang 3 tingkat atau fungsi callback panjang di dalam template membuat keterbacaan kode anjlok drastis. Selalu hitung nilainya ke variabel terpisah terlebih dahulu.
- **Karakter Backtick Tertukar dengan Tanda Kutip Tunggal**: Seringkali pemula mengetik tanda petik tunggal (`'`) atau ganda (`"`) lalu heran mengapa interpolasi `${...}` tidak bekerja dan hanya tercetak sebagai teks biasa.
- **Whitespace Indentasi yang Ikut Tercetak**: Saat memformat teks multi-baris di dalam fungsi yang terindentasi, spasi di baris baru akan ikut masuk ke dalam string. Gunakan metode `.trim()` atau pembersih indentasi jika spasi tersebut memengaruhi output.

### 🌟 Best Practice

- Gunakan Template Literals sebagai format default untuk semua perakitan string yang melibatkan variabel dinamis.
- Gunakan operator ternary `${kondisi ? 'Ya' : 'Tidak'}` hanya untuk pemilihan nilai sederhana satu baris.
- Manfaatkan fungsi tag jika aplikasi Anda perlu memanipulasi, memformat uang/tanggal secara otomatis, atau mengamankan string masukan.

---

## 5. ✍️ Latihan Mandiri

1. Buat variabel `namaMahasiswa = "Citra"`, `nilai = 82`, dan `mataKuliah = "Pemrograman Web"`. Buat satu kalimat template literal yang mencetak:
   `"Mahasiswa Citra pada mata kuliah Pemrograman Web dinyatakan LULUS dengan predikat Sangat Memuaskan"` (Gunakan ternary: Lulus jika nilai >= 70, Predikat: Sangat Memuaskan jika nilai >= 80, selain itu Memuaskan).
2. Tulis sebuah fungsi tagged template `rupiah` yang secara otomatis mengonversi angka di dalam `${...}` menjadi format mata uang Rupiah Indonesia (misal: `100000` menjadi `Rp 100.000`).

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [02 - Variabel dan Scope](../02-variables-and-scope/README.md)
- ➡️ **Selanjutnya:** [04.1 - Looping: While Loop](../04-loops/01-while/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
