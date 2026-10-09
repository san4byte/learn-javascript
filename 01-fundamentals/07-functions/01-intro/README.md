# 07.1 - Pengenalan Function (Deklarasi, Pemanggilan & Return)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Membungkus blok instruksi logika mandiri ke dalam modul kode yang dapat dipanggil dan digunakan kembali (_reusable unit of code_).
> - **Kapan Digunakan**: Kapan pun Anda mendapati duplikasi logika kode (_DRY - Don't Repeat Yourself_), perlu membagi program besar menjadi bagian-bagian kecil yang terisolasi, atau ingin mengembalikan hasil komputasi data.
> - **Aturan Praktis**: Gunakan _Single Responsibility Principle_ (satu fungsi hanya menyelesaikan satu tugas spesifik). Terapkan pola _Early Return_ (_Guard Clauses_) untuk menghindari percabangan `if...else` bersarang yang dalam.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep dasar fungsi, anatomi parameter masukan, badan fungsi (_function body_), dan nilai keluaran (_return value_).
- Mengetahui perbedaan mendasar antara _Function Declaration_ (di-hoist penuh) dan _Function Expression_ (terikat variabel).
- Memahami siklus kata kunci `return` serta perilaku _implicit undefined_ ketika fungsi tidak memiliki pernyataan `return`.
- Mampu menerapkan pola desain _Guard Clauses_ (_Early Return_) untuk menjaga kode tetap datar dan bersih.
- Mengakui sifat fungsi sebagai _First-Class Citizen_ di JavaScript yang dapat disimpan dalam variabel atau array.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Fungsi seperti **mesin pembuat kopi otomatis (_coffee maker_)**:
> Anda memasukkan biji kopi dan air melalui wadah atas (**parameter masukan**). Mesin memanaskan, menggiling, dan menyaring kopi di dalam ruang tertutup yang tidak terlihat dari luar (**badan fungsi / scope lokal**). Setelah selesai, mesin mengalirkan secangkir kopi hangat ke cangkir Anda (**nilai kembalian / `return`**). Jika mesin hanya menggiling tanpa menyalurkan cairan ke cangkir, Anda mendapatkan cangkir kosong (**`undefined`**).

---

### Tabel Perbandingan Deklarasi Fungsi

| Karakteristik          | Function Declaration                       | Function Expression                               |
| :--------------------- | :----------------------------------------- | :------------------------------------------------ |
| **Bentuk Sintaks**     | `function nama() { ... }`                  | `const nama = function() { ... }`                 |
| **Hoisting Behavior**  | Di-hoist penuh bersama badannya            | Terikat variabel `const`/`let` (berada dalam TDZ) |
| **Waktu Pemanggilan**  | Bisa dipanggil **sebelum** baris deklarasi | Hanya bisa dipanggil **setelah** baris deklarasi  |
| **Nama Fungsi**        | Wajib memiliki pengenal (_identifier_)     | Bisa anonim (_anonymous_) atau bernama            |
| **Konteks Penggunaan** | Fungsi modul global/top-level              | Fungsi callback, closure, pemetaan objek          |

---

### Pembahasan Mendalam Fitur & API

#### 1. Sintaks Function Declaration & Mekanisme Hoisting

Deklarasi fungsi standar diangkat secara penuh ke bagian atas scope oleh compiler engine JavaScript:

```javascript
// Pemanggilan sebelum definisi DIPERBOLEHKAN
sapa();

function sapa() {
  console.log("Halo dari Function Declaration!");
}
```

#### 2. Sintaks Function Expression & Anonymous Function

Fungsi disimpan sebagai nilai di dalam variabel. Karena dideklarasikan dengan `const`, fungsi ini mengikuti aturan _Temporal Dead Zone_ (TDZ):

```javascript
const tambah = function (a, b) {
  return a + b;
};
console.log(tambah(5, 3)); // 8
```

#### 3. Nilai Balik `return` vs Implicit `undefined`

Pernyataan `return` menghentikan eksekusi di dalam badan fungsi dan melempar hasilnya kembali ke pemanggil. Jika tidak ada kata kunci `return`, fungsi secara implisit menghasilkan `undefined`:

```javascript
function kali(x, y) {
  return x * y;
}
function cetak(x) {
  console.log(x); // Mengembalikan undefined
}
```

#### 4. Kode Tidak Terjangkau (_Unreachable Code_) Setelah `return`

Setiap baris kode yang ditulis setelah perintah `return` di blok yang sama tidak akan pernah dieksekusi:

```javascript
function uji() {
  return 100;
  console.log("Baris ini tidak akan pernah dijalankan!"); // Dead code
}
```

#### 5. Pola Desain Early Return (_Guard Clauses_)

Pola ini memeriksa kondisi galat atau batas di awal fungsi dan langsung mengembalikan hasil, sehingga logika utama tetap berada pada tingkat indentasi terluar:

```javascript
function kirimEmail(email) {
  if (!email) return "Gagal: Email kosong";
  if (!email.includes("@")) return "Gagal: Format tidak valid";

  // Logika utama pengiriman
  return "Email berhasil dikirim!";
}
```

#### 6. Fungsi Sebagai First-Class Citizen di JavaScript

Fungsi di JavaScript dapat diperlakukan selayaknya nilai biasa: disimpan dalam variabel, dimasukkan ke dalam elemen array, atau dipassing ke fungsi lain:

```javascript
const operasi = [(n) => n * 2, (n) => n + 10];
console.log(operasi[0](5)); // 10
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi perbandingan _Function Declaration_ ter-hoist, _Function Expression_, konsekuensi fungsi tanpa _return_, pola pengamanan _Early Return Guard Clauses_, serta fleksibilitas fungsi sebagai _first-class citizen_ telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/07-functions/01-intro/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Format Mata Uang Terpusat**:
   ```javascript
   function formatRupiah(nominal) {
     if (typeof nominal !== "number" || isNaN(nominal)) return "Rp 0";
     return `Rp ${nominal.toLocaleString("id-ID")}`;
   }
   ```
2. **Kalkulator Tagihan Transaksi**: Menghitung subtotal barang, menambahkan PPN 11%, dan memotong voucher diskon.

### ⚠️ Common Pitfalls

- **Lupa Menuliskan Kata Kunci `return`**: Menghitung rumus rumit di badan fungsi tetapi lupa kata kunci `return`, sehingga variabel penampung hasil bernilai `undefined`.
- **Mencoba Memanggil Function Expression Sebelum Baris Inisialisasi**: Menyebabkan fatal error `ReferenceError: Cannot access 'fn' before initialization`.

### 🌟 Best Practice

- Berikan nama fungsi berupa kata kerja aksi (_action verb_), seperti `getUserData()`, `validateForm()`, atau `calculateTax()`.
- Usahakan panjang badan fungsi tidak lebih dari 20–30 baris. Jika lebih, pertimbangkan untuk membaginya menjadi beberapa sub-fungsi pembantu.

---

## 5. ✍️ Latihan Mandiri

1. Buatlah sebuah fungsi declaration bernama `hitungLuasLingkaran(radius)` yang menerima satu parameter angka jari-jari dan mengembalikan luas lingkaran ($\pi \times r^2$). Gunakan `Math.PI` dan batasi 2 angka di belakang koma dengan `.toFixed(2)`.
2. Buatlah function expression `validasiPassword(pass)` yang mengembalikan string `'Valid'` jika panjang password minimal 8 karakter, dan mengembalikan `'Terlalu Pendek'` jika kurang dari 8 karakter menggunakan pola _Guard Clause_.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [05.2 - Else If dan Switch Case](../../05-conditionals/02-else-if-switch/README.md)
- ➡️ **Selanjutnya:** [07.2 - Parameter dan Argumen](../02-parameters-arguments/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
