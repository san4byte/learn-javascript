# 05.1 - Pengkondisian: If Else dan Ternary Operator

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami konsep percabangan logika if dan else.
> * **Kapan Digunakan**: Memahami evaluasi Truthy dan Falsy di JavaScript.
> * **Aturan Praktis**: Selalu gunakan `===` (triple equals) daripada `==` (double equals) untuk menghindari konversi tipe data implisit (*type coercion*).

## 1. 🎯 Tujuan Belajar
- Memahami konsep percabangan logika if dan else.
- Memahami evaluasi Truthy dan Falsy di JavaScript.
- Mampu menyederhanakan percabangan dua kondisi menggunakan Ternary Operator (`? :`).

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> If-Else seperti **rambu lampu lalu lintas**: jika lampu berwarna hijau (`if`), kendaraan maju; jika tidak hijau (`else`), kendaraan wajib berhenti.

**Pengkondisian (Conditional Flow)** memungkinkan program kita mengambil keputusan dan mengeksekusi blok kode yang berbeda berdasarkan nilai kebenaran suatu kondisi (*Boolean expression*).

### Struktur Dasar:
* **`if (kondisi)`**: Dijalankan jika kondisi bernilai `true` (atau bernilai *truthy*).
* **`else`**: Dijalankan sebagai alternatif jika kondisi pada `if` bernilai `false` (atau bernilai *falsy*).

### Nilai Falsy di JavaScript:
Hanya ada 6 nilai falsy utama di JavaScript: `false`, `0`, `""` (string kosong), `null`, `undefined`, dan `NaN`. Semua nilai lainnya dianggap **Truthy**!

### Operator Ternary (`kondisi ? jikaBenar : jikaSalah`):
Sintaks ringkas untuk percabangan if-else satu baris yang langsung menghasilkan nilai (ekspresi).

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Struktur If-Else Standar ---');
const usiaPengunjung = 18;

if (usiaPengunjung >= 17) {
  console.log('Status: Boleh masuk dan menonton film bioskop dewasa.');
} else {
  console.log('Status: Usia belum mencukupi untuk menonton.');
}

console.log('\n--- 2. Evaluasi Truthy dan Falsy ---');
const namaInput = ''; // String kosong adalah Falsy

if (namaInput) {
  console.log(`Selamat datang, ${namaInput}!`);
} else {
  console.log('Peringatan: Nama tidak boleh dikosongkan! (Terdeteksi Falsy)');
}

console.log('\n--- 3. Ternary Operator (Sintaks Ringkas) ---');
const nilaiUjian = 82;
// kondisi ? ekspresi_jika_true : ekspresi_jika_false
const statusKelulusan = nilaiUjian >= 75 ? 'LULUS DENGAN BAIK' : 'REMIDIAL';

console.log(`Nilai Siswa: ${nilaiUjian} -> Hasil: ${statusKelulusan}`);
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Struktur If-Else Standar ---
Status: Boleh masuk dan menonton film bioskop dewasa.

--- 2. Evaluasi Truthy dan Falsy ---
Peringatan: Nama tidak boleh dikosongkan! (Terdeteksi Falsy)

--- 3. Ternary Operator (Sintaks Ringkas) ---
Nilai Siswa: 82 -> Hasil: LULUS DENGAN BAIK
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **Proteksi Autentikasi Pengguna**: Mengecek `if (user.isLoggedIn)` untuk mengizinkan akses ke halaman profil, atau `else` mengarahkan ke form login.
2. **Conditional Rendering di Frontend**: Menampilkan badge 'Diskon 50%' pada kartu barang jika `produk.isOnSale === true`.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Tertukar antara Operator Assignment (`=`) dan Operator Kesetaraan (`===`)**:
  Menulis `if (angka = 10)` akan selalu bernilai true karena ini adalah penugasan nilai, bukan pengecekan. Selalu gunakan `===` (*strict equality*).
* **Nested Ternary yang Berlebihan**: Menumpuk ternary operator hingga 4 tingkat (`a ? b : c ? d : e ? f : g`) membuat kode sulit dipahami. Gunakan if-else atau switch jika kondisi lebih dari 2.

### 🌟 Best Practice
* Selalu gunakan `===` (triple equals) daripada `==` (double equals) untuk menghindari konversi tipe data implisit (*type coercion*).
* Gunakan operator ternary untuk penugasan nilai variabel ringkas yang hanya memiliki 2 kemungkinan.

---

## 6. ✍️ Latihan Mandiri
1. Buat program yang memeriksa apakah suatu bilangan adalah bilangan GENAP atau GANJIL menggunakan operator modulus `%` dan operator ternary.
2. Uji nilai `angka = 15` dan `angka = 20`.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [04.4 - For..of dan For..in](../../04-loops/04-for-of-for-in/README.md)
- ➡️ **Selanjutnya:** [05.2 - Else If dan Switch Case](../02-else-if-switch/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
