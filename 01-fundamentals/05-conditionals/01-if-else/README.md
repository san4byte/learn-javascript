# 05.1 - Pengkondisian: If Else dan Ternary Operator

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengendalikan alur logika program dengan mengeksekusi blok kode tertentu berdasarkan kebenaran ekspresi boolean (_truthy_ / _falsy_).
> - **Kapan Digunakan**: Mengambil keputusan bercabang dua (misal: validasi formulir, pengecekan otorisasi, atau penentuan nilai konfigurasi default).
> - **Aturan Praktis**: Selalu gunakan _Strict Equality_ (`===`) untuk menghindari konversi tipe data otomatis (_type coercion_). Gunakan operator ternary (`? :`) hanya untuk ekspresi penugasan nilai ringkas satu baris.

---

## 1. 🎯 Tujuan Belajar

- Memahami mekanisme evaluasi logika pada blok `if` dan `else`.
- Mengetahui perbedaan kritis antara kesetaraan ketat (_Strict Equality_ `===`) dan kesetaraan longgar (_Loose Equality_ `==`).
- Menguasai daftar 8 nilai _Falsy_ bawaan JavaScript serta memahami bahwa objek `{}` dan array `[]` kosong bernilai _Truthy_.
- Mampu menyederhanakan ekspresi penugasan dua opsi menggunakan _Ternary Operator_ (`? :`).
- Memahami evaluasi jalan pintas (_Short-circuiting_) menggunakan operator logika `&&`, `||`, dan _Nullish Coalescing_ `??`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Struktur If-Else seperti **lampu pengatur lalu lintas di persimpangan jalan**:
> Jika lampu menyala hijau (`if (kondisi)`), kendaraan dipersilakan melaju terus. Jika lampu bukan hijau (`else`), seluruh kendaraan wajib berhenti. Tidak ada kondisi di mana kendaraan berjalan dan berhenti di saat yang bersamaan.

---

### Tabel Daftar 8 Nilai Falsy di JavaScript

Segala nilai di luar daftar ini secara otomatis bernilai **Truthy** ketika dievaluasi dalam konteks Boolean:

| Nilai Falsy        | Tipe Data       | Keterangan                                       |
| :----------------- | :-------------- | :----------------------------------------------- |
| `false`            | Boolean         | Nilai boolean negatif literal                    |
| `0`, `-0`, `0n`    | Number / BigInt | Angka nol (termasuk nol negatif dan nol BigInt)  |
| `""`, `''`, `\`\`` | String          | Teks string kosong dengan panjang karakter 0     |
| `null`             | Null            | Representasi nilai ketiadaan yang disengaja      |
| `undefined`        | Undefined       | Variabel yang belum diinisialisasi nilai         |
| `NaN`              | Number          | _Not-a-Number_ (hasil kalkulasi numerik invalid) |

> ⚠️ **Catatan Penting**: Array kosong `[]` dan Objek kosong `{}` **bukan Falsy**, keduanya bernilai **Truthy**!

---

### Pembahasan Mendalam Fitur & API

#### 1. Sintaks Percabangan `if` dan `else`

Blok `if` mengevaluasi ekspresi di dalam kurung bulat. Jika bernilai truthy, blok kurung kurawal pertama dijalankan; jika falsy, alur melompat ke blok `else`.

```javascript
const usia = 20;
if (usia >= 17) {
  console.log("Memenuhi syarat pembuatan KTP");
} else {
  console.log("Belum memenuhi syarat");
}
```

#### 2. Strict Equality (`===`) vs Loose Equality (`==`)

Operator `==` melakukan konversi tipe data implisit yang berbahaya (`0 == false` bernilai `true`), sedangkan `===` memeriksa tipe data dan nilai secara presisi:

```javascript
const angka = 0;
// Salah: angka == false (true karena coercion)
// Benar:
if (angka === 0) {
  console.log("Angka bernilai nol");
}
```

#### 3. Delapan Nilai Falsy di JavaScript

Saat menguji keberadaan nilai, JavaScript otomatis mengonversinya ke boolean:

```javascript
let nama = "";
if (!nama) {
  console.log("Nama belum diisi (string kosong terdeteksi Falsy)");
}
```

#### 4. Sifat Truthy pada Objek dan Array Kosong

Banyak pemula berasumsi `[]` atau `{}` adalah falsy karena kosong. Padahal di JavaScript keduanya adalah objek referensi valid:

```javascript
const keranjang = [];
if (keranjang) {
  // Blok ini SELALU berjalan!
  // Periksa panjangnya: if (keranjang.length === 0)
}
```

#### 5. Operator Ternary (`kondisi ? ekspresiTrue : ekspresiFalse`)

Operator ternary menghasilkan nilai (_expression_) yang dapat langsung ditampung ke dalam variabel:

```javascript
const nilai = 85;
const status = nilai >= 75 ? "Lulus" : "Remedial";
```

#### 6. Evaluasi Hubung Singkat (_Short-Circuit Evaluation_)

- `A && B`: Jika `A` falsy, berhenti dan kembalikan `A`. Jika `A` truthy, evaluasi dan kembalikan `B`.
- `A || B`: Jika `A` truthy, berhenti dan kembalikan `A`. Jika `A` falsy, kembalikan `B` (sering dipakai sebagai fallback nilai default).

```javascript
const isLoggedIn = true;
isLoggedIn && console.log("Tampilkan dashboard pengguna");
```

#### 7. Operator Nullish Coalescing (`??`)

Operator `??` berbeda dari `||` karena hanya memperlakukan `null` dan `undefined` sebagai pemicu fallback. Angka `0` atau string kosong `""` tetap dianggap nilai sah:

```javascript
const kuota = 0;
const hasilOR = kuota || 10; // 10 (karena 0 adalah falsy)
const hasilNullish = kuota ?? 10; // 0 (karena 0 bukan null atau undefined)
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi evaluasi percabangan `if...else`, pengujian 8 nilai falsy vs keunikan array/objek kosong, penugasan berbasis ternary, serta perbandingan evaluasi hubung singkat (`&&`, `||`, `??`) telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/05-conditionals/01-if-else/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Proteksi Autentikasi Rute Pengguna**:
   ```javascript
   function guardDashboard(user) {
     if (user && user.role === "admin") {
       return renderAdminView();
     }
     return redirectLogin();
   }
   ```
2. **Penentuan Nilai Konfigurasi Port / Skor Default**: Menggunakan `??` untuk membaca konfigurasi port server tanpa merusak port `0`.

### ⚠️ Common Pitfalls

- **Salah Ketik Penugasan (`=`) pada Kondisi `if`**: Menulis `if (role = 'admin')` alih-alih `if (role === 'admin')` akan mengubah nilai variabel menjadi `'admin'` dan selalu menghasilkan truthy!
- **Menggunakan `||` untuk Nilai Angka 0**: Menulis `const score = userScore || 50` akan menimpa nilai pemain yang memiliki skor `0` menjadi `50`. Selalu gunakan `??` untuk data numerik.

### 🌟 Best Practice

- Selalu gunakan `===` dan `!==` di seluruh baris kode.
- Gunakan _Guard Clauses_ (pola `if (!kondisi) return;`) untuk keluar dari fungsi sedini mungkin daripada membuat blok `if...else` bersarang yang terlalu dalam (_avoid pyramid of doom_).
- Hindari _nested ternary_ bertumpuk lebih dari 1 tingkat (`a ? b : c ? d : e`) karena sangat merusak keterbacaan kode.

---

## 5. ✍️ Latihan Mandiri

1. Buat program yang memeriksa status bilangan bulat: cetak `"GENAP"` jika bilangan habis dibagi 2 (`% 2 === 0`), atau `"GANJIL"` jika tidak, menggunakan operator ternary satu baris.
2. Diberikan objek preferensi pengguna `const config = { volume: 0, mode: 'silent' }`. Bandingkan hasil nilai variabel baru saat membaca `config.volume` menggunakan operator `||` dengan operator `??`. Jelaskan mengapa hasilnya berbeda!

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [04.4 - For..of dan For..in](../../04-loops/04-for-of-for-in/README.md)
- ➡️ **Selanjutnya:** [05.2 - Else If dan Switch Case](../02-else-if-switch/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
