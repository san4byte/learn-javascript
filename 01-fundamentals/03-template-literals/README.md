# 03 - Template Literals & String Interpolation

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami keunggulan Template Literals (backtick `` ` ``) dibanding string biasa.
> * **Kapan Digunakan**: Menguasai String Interpolation menggunakan sintaks `${ekspresi}`.
> * **Aturan Praktis**: Gunakan Template Literals untuk semua penggabungan teks dinamis dan teks multi-baris.

## 1. 🎯 Tujuan Belajar
- Memahami keunggulan Template Literals (backtick `` ` ``) dibanding string biasa.
- Menguasai String Interpolation menggunakan sintaks `${ekspresi}`.
- Mampu membuat String Multi-line yang bersih tanpa karakter escape `\n`.
- Memahami konsep Tagged Template Literals untuk formatting teks lanjutan.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> String konvensional seperti **menyusun puzzle huruf dari potongan koran**: Anda harus menempelkan lem tanda `+` di antara setiap kata. Template Literals seperti **surat undangan resmi dengan kolom kosong**: Anda cukup mencetak kerangka suratnya dan mengisi variabel nama di bagian `${...}`.

**Template Literals** (diperkenalkan pada ES6) adalah cara modern dalam merakit dan memanipulasi string di JavaScript menggunakan karakter backtick (`` ` ``) alih-alih tanda kutip tunggal (`'`) atau ganda (`"`).

### 3 Keunggulan Utama Template Literals:
1. **String Interpolation**: Menyisipkan variabel atau hasil evaluasi ekspresi matematika/logika secara langsung menggunakan tanda `${...}` tanpa perlu penggabungan string (`+`).
2. **Multi-line String**: Menulis teks berbaris-baris panjang secara natural hanya dengan menekan Enter, tanpa perlu menyambung string dengan `\n` dan tanda `+`.
3. **Tagged Templates**: Melewatkan string literal ke dalam sebuah fungsi pengolah (*parser*) khusus untuk sanitasi keamanan (seperti anti-XSS) atau formatting teks terotomasi.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. String Interpolasi vs Penggabungan Konvensional ---');
const namaProduk = 'MacBook Pro M3';
const harga = 28000000;
const jumlah = 2;

// Cara Lama (ES5) - Rawan typo spasi dan tanda tambah
const caraLama = 'Produk: ' + namaProduk + ', Total: Rp ' + (harga * jumlah);
console.log('Cara Lama:', caraLama);

// Cara Modern (ES6 Template Literals)
const caraModern = `Produk: ${namaProduk}, Total: Rp ${(harga * jumlah).toLocaleString('id-ID')}`;
console.log('Cara Modern:', caraModern);

console.log('\n--- 2. Multi-line String (Sangat Berguna untuk Template HTML) ---');
const kartuProfilHTML = `
<div class="user-card">
  <h2>${namaProduk}</h2>
  <p class="status">${jumlah > 0 ? 'Stok Tersedia' : 'Habis'}</p>
</div>
`.trim();

console.log('Output Multi-line:');
console.log(kartuProfilHTML);

console.log('\n--- 3. Tagged Template Literals (Contoh Sanitasi Sederhana) ---');
function sorotKataKunci(strings, ...values) {
  return strings.reduce((hasil, str, i) => {
    const nilai = values[i] ? `[**${values[i]}**]` : '';
    return `${hasil}${str}${nilai}`;
  }, '');
}

const pengguna = 'Joko';
const statusAkun = 'Super Admin';
const hasilTagged = sorotKataKunci`Halo ${pengguna}, peran Anda saat ini adalah ${statusAkun}.`;
console.log(hasilTagged);
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. String Interpolasi vs Penggabungan Konvensional ---
Cara Lama: Produk: MacBook Pro M3, Total: Rp 56000000
Cara Modern: Produk: MacBook Pro M3, Total: Rp 56.000.000

--- 2. Multi-line String (Sangat Berguna untuk Template HTML) ---
Output Multi-line:
<div class="user-card">
  <h2>MacBook Pro M3</h2>
  <p class="status">Stok Tersedia</p>
</div>

--- 3. Tagged Template Literals (Contoh Sanitasi Sederhana) ---
Halo [**Joko**], peran Anda saat ini adalah [**Super Admin**].
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **Merakit Elemen HTML Dinamis**: Membuat komponen tampilan tabel atau kartu katalog di DOM murni atau framework tanpa build tool yang rumit.
2. **Styled Components di React**: Library CSS-in-JS populer seperti `styled-components` menggunakan Tagged Template Literals: `const Button = styled.button` `background: blue;` ``.
3. **Query SQL / GraphQL**: Merakit parameter query database dengan sanitasi otomatis untuk mencegah SQL Injection.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Ekspresi Terlalu Kompleks di Dalam `${...}`**: Menaruh logika percabangan 5 tingkat di dalam `${...}` membuat kode sulit dibaca. Pindahkan logika tersebut ke variabel atau fungsi pembantu sebelum merakit string.
* **Karakter Backtick Tertukar**: Seringkali pemula tidak sengaja menekan tanda kutip tunggal (`'`) bukannya backtick (`` ` ``) yang terletak di sebelah kiri tombol angka 1 keyboard.

### 🌟 Best Practice
* Gunakan Template Literals untuk semua penggabungan teks dinamis dan teks multi-baris.
* Manfaatkan operator ternary `${kondisi ? 'Ya' : 'Tidak'}` di dalam template literals untuk menghasilkan teks kondisional yang elegan.

---

## 6. ✍️ Latihan Mandiri
1. Buat variabel `namaDepan = "Joko"`, `namaBelakang = "Santoso"`, dan `nilaiUjian = 85`.
2. Gunakan Template Literals untuk menghasilkan kalimat:
   `"Siswa atas nama Joko Santoso dinyatakan LULUS dengan nilai 85"` (Gunakan ternary operator: LULUS jika nilai >= 75, selain itu TIDAK LULUS).

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [02 - Variabel dan Scope](../02-variables-and-scope/README.md)
- ➡️ **Selanjutnya:** [04.1 - Pengulangan While](../04-loops/01-while/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
