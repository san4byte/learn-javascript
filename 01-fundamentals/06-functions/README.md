# 06 - Fungsi (Functions)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Membungkus sekumpulan instruksi kode ke dalam satu blok terisolasi yang dapat digunakan kembali (_reusable_), menerima masukan (_parameters_), dan mengembalikan keluaran (_return value_).
> - **Kapan Digunakan**: Mengeliminasi duplikasi kode (_DRY - Don't Repeat Yourself_), memecah masalah besar menjadi sub-masalah kecil (_dekomposisi modul_), serta membangun enkapsulasi data melalui _closure_.
> - **Aturan Praktis**: Terapkan prinsip _Pure Function_ (bebas efek samping luar), gunakan _Arrow Function_ untuk fungsi ringkas/callback satu baris, gunakan _Rest Parameter_ (`...args`) alih-alih objek lama `arguments`, dan selalu tentukan _Base Case_ pada fungsi rekursif.

---

## 1. 🎯 Tujuan Belajar

- Membedakan antara _Function Declaration_ (mengalami _hoisting_) dan _Function Expression_.
- Menguasai parameter, argumen, dan penetapan _Default Parameters_.
- Memahami hierarki _Variable Scope_ (Global, Function, Block) dan mekanisme penelusuran _Scope Chain_.
- Menguasai konsep _Closures_ dan pemanfaatannya untuk enkapsulasi state privat (_data privacy_).
- Menguasai sintaks modern _Arrow Functions_ serta memahami perilaku _lexical `this`_.
- Menerapkan _Higher-Order Functions_ (HOF) seperti `map`, `filter`, dan `reduce`.
- Menguasai _Rest Parameters_ (`...args`) untuk menangani fungsi variadik.
- Memahami struktur fungsi rekursif (_Recursive Functions_) dengan _base case_ yang aman.
- Menerapkan dekomposisi fungsi modular (_Pure Functions_) dalam pemecahan masalah komputasi.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **Fungsi**: Seperti **mesin pembuat jus (_blender_)**. Anda memasukkan bahan buah apel dan jeruk (**argumen masukan**), mesin memprosesnya sesuai instruksi pemotongan (**badan fungsi**), dan menghasilkan segelas jus segar (**nilai balik / return**).
> - **Scope Chain**: Seperti **kaca film satu arah pada mobil**. Orang di dalam mobil dapat melihat pemandangan luas di luar mobil (_inner scope dapat mengakses outer/global scope_), namun orang di luar jalan raya tidak dapat melihat apa yang ada di dalam mobil (_outer scope tidak dapat mengakses variabel lokal inner scope_).
> - **Closure**: Seperti **koper ransel pribadi yang selalu digendong**. Meskipun fungsi luar sudah selesai dieksekusi dan ditutup, fungsi anak di dalamnya tetap menggendong ransel berisi variabel-variabel lingkungan asalnya ke mana pun ia dipanggil.

---

### Tabel Perbandingan Bentuk Fungsi JavaScript

| Fitur / Karakteristik      | Function Declaration                                     | Function Expression            | Arrow Function                      |
| :------------------------- | :------------------------------------------------------- | :----------------------------- | :---------------------------------- |
| **Sintaksis**              | `function nama() {}`                                     | `const fn = function() {}`     | `const fn = () => {}`               |
| **Perilaku Hoisting**      | Hoisting penuh (dapat dipanggil sebelum baris deklarasi) | Hanya deklarasi variabel (TDZ) | Hanya deklarasi variabel (TDZ)      |
| **Konteks `this`**         | Dinamis (tergantung pemanggil)                           | Dinamis (tergantung pemanggil) | **Leksikal** (mewarisi parent)      |
| **Implicit Return**        | Tidak didukung                                           | Tidak didukung                 | **Didukung** (tanpa kurung kurawal) |
| **Objek `arguments`**      | Tersedia                                                 | Tersedia                       | Tidak tersedia (gunakan `...args`)  |
| **Dapat Jadi Konstruktor** | Ya (`new`)                                               | Ya (`new`)                     | Tidak (`TypeError`)                 |

---

### Pembahasan Mendalam Fitur & Sintaks

#### 1. Function Declaration vs Function Expression

_Function Declaration_ dipindahkan ke bagian atas konteks memori saat fase kompilasi (_hoisting_), sehingga dapat dipanggil sebelum baris kode tertulis. Sedangkan _Function Expression_ terikat pada variabel dan mematuhi aturan Temporal Dead Zone (TDZ):

```javascript
// Function Declaration (Aman dipanggil di atas deklarasi)
console.log(sapa("Budi")); // Output: Halo, Budi!
function sapa(nama) {
  return `Halo, ${nama}!`;
}

// Function Expression
const kaliDua = function (x) {
  return x * 2;
};
```

#### 2. Default Parameters

Menyediakan nilai cadangan jika argumen tidak diberikan atau bernilai `undefined`:

```javascript
function hitungBiaya(harga, pajak = 0.11) {
  return harga + harga * pajak;
}
console.log(hitungBiaya(100000)); // 111000 (menggunakan pajak default 11%)
```

#### 3. Scope & Scope Chain

JavaScript menerapkan _Lexical Scoping_ di mana fungsi anak dapat membaca variabel milik fungsi induknya melalui rantai lingkup (_Scope Chain_):

```javascript
const globalVar = "Global";

function luar() {
  const localVar = "Lokal";
  function dalam() {
    console.log(globalVar); // Terbaca via Scope Chain
    console.log(localVar); // Terbaca via Parent Scope
  }
  dalam();
}
```

#### 4. Closures & Enkapsulasi State Privat

Closure terjadi ketika sebuah fungsi bersarang (_inner function_) mempertahankan referensi ke variabel bebas pada lingkungan leksikal induknya, meskipun fungsi induk telah selesai dijalankan:

```javascript
function buatCounter() {
  let hitungan = 0; // Variabel privat
  return function () {
    hitungan++;
    return hitungan;
  };
}

const counterA = buatCounter();
console.log(counterA()); // 1
console.log(counterA()); // 2
```

#### 5. Arrow Functions & Implicit Return

Arrow functions menyediakan penulisan ringkas dan tidak membuat konteks `this` sendiri (mengikat `this` secara leksikal):

```javascript
const kuadrat = (x) => x * x; // Implicit return
const buatObjek = (id) => ({ id, status: "Aktif" }); // Bungkus () untuk objek
```

#### 6. Higher-Order Functions (HOF)

Fungsi tingkat tinggi adalah fungsi yang menerima fungsi lain sebagai argumen (_callback_) atau mengembalikan fungsi baru:

```javascript
const angka = [1, 2, 3, 4, 5];
const totalKuadratGenap = angka
  .filter((n) => n % 2 === 0)
  .map((n) => n * n)
  .reduce((acc, curr) => acc + curr, 0); // 2^2 + 4^2 = 20
```

#### 7. Rest Parameters (`...args`)

Mengumpulkan argumen yang jumlahnya tak terbatas ke dalam bentuk Array murni (menggantikan objek usang `arguments`):

```javascript
function rataRata(...angkaList) {
  const total = angkaList.reduce((acc, val) => acc + val, 0);
  return total / angkaList.length;
}
console.log(rataRata(80, 90, 100)); // 90
```

#### 8. Fungsi Rekursif (Recursion)

Fungsi yang memanggil dirinya sendiri. Wajib memiliki **Base Case** (kondisi berhenti) agar tidak menyebabkan _Maximum call stack size exceeded_ (Stack Overflow):

```javascript
function faktorial(n) {
  if (n <= 1) return 1; // Base Case mutlak
  return n * faktorial(n - 1); // Recursive Call
}
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Implementasi kode lengkap mencakup deklarasi fungsi, parameter default, closure dompet saldo privat, arrow functions, rantai pemrosesan data HOF, rest parameters, faktorial rekursif, dan dekomposisi fungsi modular tersedia di berkas [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/06-functions/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Fungsi Pabrik Utilitas (_Factory Functions & Curry_)**: Menghasilkan fungsi pemformat nilai mata uang kustom dengan kurs tetap menggunakan closure.
2. **Pembersihan State & Transformasi API**: Menggunakan rangkaian `filter().map()` untuk mengekstrak hanya data pengguna aktif dari respons JSON backend.

### ⚠️ Common Pitfalls

- **Stack Overflow pada Rekursi**: Lupa menuliskan _base case_ atau langkah pemanggilan rekursif tidak bergerak mendekati _base case_.
- **Kehilangan Binding `this`**: Menggunakan Arrow Function sebagai _method_ pada objek konvensional di mana method tersebut membutuhkan akses ke `this.properti`.
- **Side Effect pada Fungsi**: Memodifikasi variabel global langsung dari dalam fungsi alih-alih mengembalikan nilai baru, membuat fungsi sulit diuji (_hard to test_).

### 🌟 Best Practice

- Usahakan fungsi bersifat _Pure_: output hanya bergantung pada argumen masukan dan tidak mengubah variabel di luar dirinya.
- Terapkan prinsip _Single Responsibility Principle_ (satu fungsi hanya menjalankan satu tugas spesifik).

---

## 5. ✍️ Latihan Mandiri

1. **Dekomposisi Volume Dua Kubus**:
   - Buat fungsi pembantu murni `hitungVolumeKubus(sisi)` yang mengembalikan nilai $s^3$.
   - Buat fungsi utama `jumlahVolumeDuaKubus(sisiA, sisiB)` yang memanfaatkan fungsi pembantu di atas untuk menjumlahkan volume dari dua kubus.
   - Uji dengan panjang sisi `8` dan `3`, pastikan hasil kalkulasi adalah `539`.
2. **Data Privacy Counter (Closure)**: Buat fungsi `buatPenghitung(nilaiAwal = 0)` yang mengembalikan objek dengan 3 method: `tambah()`, `kurang()`, dan `lihatNilai()`. Pastikan variabel angka tidak bisa diubah langsung dari luar objek.
3. **Penyaringan Data Karyawan (HOF)**: Diberikan array karyawan:
   ```javascript
   const staf = [
     { nama: "Andi", divisi: "IT", gaji: 8000000 },
     { nama: "Siti", divisi: "HR", gaji: 6500000 },
     { nama: "Budi", divisi: "IT", gaji: 9000000 },
   ];
   ```
   Gunakan perpaduan `filter` dan `reduce` untuk menghitung total pengeluaran gaji khusus divisi `'IT'`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [05 - Conditionals](../05-conditionals/README.md)
- ➡️ **Selanjutnya:** [07 - Arrays](../07-arrays/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
