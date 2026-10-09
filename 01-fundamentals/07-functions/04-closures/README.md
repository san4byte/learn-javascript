# 07.4 - Closures dan Lexical Scope

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memungkinkan fungsi anak mempertahankan akses ke variabel di lingkungan leksikal induknya (_outer lexical scope_) bahkan setelah fungsi induk tersebut selesai dieksekusi dan keluar dari _Call Stack_.
> - **Kapan Digunakan**: Enkapsulasi data privat (menyembunyikan state dari akses publik luar), pembuatan generator fungsi dinamis (_Function Factory_), pola fungsi pembantu memoization/cache, dan penanganan event asinkron.
> - **Aturan Praktis**: Manfaatkan closure untuk melindungi integritas variabel. Hati-hati terhadap retensi memori: lepaskan referensi fungsi penampung closure (`fn = null`) jika data di dalamnya berukuran besar dan tidak lagi dipakai.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep fundamental _Lexical Scope_ dan definisi formal _Closure_ pada mesin JavaScript.
- Menguasai alur transisi memori antara _Call Stack_ dan _Heap Memory_ saat closure terbentuk.
- Mampu membangun _Function Factory_ untuk menghasilkan fungsi-fungsi terspesialisasi secara dinamis.
- Menerapkan enkapsulasi variabel privat (_private state_) yang hanya dapat diakses melalui metode publik (_getter/setter_).
- Memahami implementasi teknik penghematan komputasi _Memoization_ berbasis closure.
- Mengenali risiko dan pencegahan _Memory Leak_ akibat variabel tertahan pada closure.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Closure seperti **membawa kotak bekal ransel saat merantau dari rumah**:
> Ketika Anda tinggal di rumah orang tua Anda (**outer function execution**), ibu Anda menyiapkan kotak bekal makanan untuk Anda (**variabel leksikal**). Saat Anda pergi merantau ke luar kota (**fungsi luar selesai dan keluar dari stack**), Anda tetap membawa kotak bekal tersebut ke mana pun Anda pergi (**fungsi dalam mempertahankan akses ke variabel induk**). Orang asing di jalanan tidak bisa melihat isi ransel Anda (**privat**), hanya Anda yang bisa membuka dan menikmatinya.

---

### Alur Eksekusi Call Stack & Retensi Heap Closure

```text
1. Saat fungsiLuar() dieksekusi:
+------------------------------------------+
| CALL STACK                               |
| [ fungsiLuar() -> let counter = 0 ]      |
+------------------------------------------+

2. Saat fungsiLuar() selesai dieksekusi (return fungsiDalam):
+------------------------------------------+
| CALL STACK                               |
| (fungsiLuar dihapus dari Call Stack)     |
+------------------------------------------+
                   |
                   v
+------------------------------------------+
| HEAP MEMORY (CLOSURE SCOPE TETAP HIDUP)  |
| [ Closure: { counter: 0 } ]              | <--- fungsiDalam() masih memegang referensi!
+------------------------------------------+
```

---

### Tabel Perbandingan Pendekatan State: Variabel Global vs Closure

| Kriteria                 | Variabel Global                         | Enkapsulasi Closure                             |
| :----------------------- | :-------------------------------------- | :---------------------------------------------- |
| **Keamanan Data**        | Rawan tertimpa / dimanipulasi dari luar | 100% terlindungi (hanya via antarmuka resmi)    |
| **Pencemaran Namespace** | Memadati `window` / global scope        | Bersih, state terisolasi di memori internal     |
| **Instansiasi Ganda**    | Sulit dibuat banyak instans mandiri     | Sangat mudah (tiap instans punya state sendiri) |
| **Pembersihan Memori**   | Tetap ada selama aplikasi aktif         | Dibersihkan saat referensi instans diputus      |

---

### Pembahasan Mendalam Fitur & API

#### 1. Definisi Mutlak Closure & Lexical Environment

Closure terjadi saat sebuah fungsi dalam (_inner function_) "menangkap" (_captures_) variabel dari lingkungan deklarasi leksikalnya:

```javascript
function luar() {
  const teks = "Halo Dunia";
  function dalam() {
    console.log(teks); // Mengakses teks dari outer scope
  }
  return dalam;
}
const cetak = luar();
cetak(); // Tetap menghasilkan 'Halo Dunia'!
```

#### 2. Siklus Hidup Execution Context & Call Stack

Biasanya, variabel lokal suatu fungsi langsung dihapus dari memori begitu fungsi selesai berjalan. Namun pada closure, mesin JavaScript mendeteksi bahwa masih ada fungsi turunan yang merujuk variabel tersebut, sehingga variabel dipindahkan ke _Heap Memory_.

#### 3. Pola Function Factory (Pabrik Fungsi Dinamis)

Fungsi tingkat tinggi yang menghasilkan fungsi baru dengan parameter dasar yang sudah terkonfigurasi (_currying_ sederhana):

```javascript
function pengali(faktor) {
  return function (angka) {
    return angka * faktor;
  };
}
const kaliDua = pengali(2);
console.log(kaliDua(5)); // 10
```

#### 4. Enkapsulasi Data dan Variabel Privat

Membuat objek yang mengelola state internal tanpa mengekspos variabel aslinya secara langsung:

```javascript
function buatCounter() {
  let count = 0; // Private variable
  return {
    tambah: () => ++count,
    nilai: () => count,
  };
}
const c = buatCounter();
c.tambah();
console.log(c.nilai()); // 1
console.log(c.count); // undefined (Aman!)
```

#### 5. Optimasi Performa: Pola Memoization / Cache

Menyimpan hasil kalkulasi fungsi murni yang membutuhkan komputasi berat agar pemanggilan berulang dengan argumen yang sama langsung mengembalikan hasil simpanan:

```javascript
function buatCache() {
  const memori = {};
  return function (kunci) {
    if (kunci in memori) return memori[kunci];
    return (memori[kunci] = kunci * 10);
  };
}
```

#### 6. Bahaya Kebocoran Memori (_Memory Leak_) pada Closure

Jika fungsi closure yang mempertahankan objek besar (misalnya buffer 50MB atau ribuan elemen DOM) disimpan dalam variabel global atau event listener yang tidak pernah dilepas (`removeEventListener`), memori tersebut tidak akan pernah bisa dibebaskan oleh _Garbage Collector_.

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi pembuatan _Function Factory_ generator sapaan, sistem rekening bank ber-enkapsulasi _private state_, serta penerapan fungsi _Memoization Cache_ berbasis closure telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/07-functions/04-closures/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **State Management pada Komponen UI (Konsep `useState` di React)**: React mempertahankan nilai variabel state antar siklus render komponen berkat mekanisme closure di balik layar.
2. **Rate Limiting / Debounce & Throttle**: Menyimpan penanda waktu (_timer ID_) dalam closure untuk mencegah pemanggilan event scroll atau tombol submit secara berulang-ulang:
   ```javascript
   function debounce(fn, jeda) {
     let timer;
     return function (...args) {
       clearTimeout(timer);
       timer = setTimeout(() => fn(...args), jeda);
     };
   }
   ```

### ⚠️ Common Pitfalls

- **Jebakan Loop Sebelum ES6 (`var` dalam Loop)**: Membuat callback di dalam perulangan `var` membuat semua fungsi memegang satu referensi variabel yang sama di akhir putaran loop. Solusi modern adalah menggunakan `let`.
- **Menahan Referensi Objek Besar Tanpa Sadar**: Menyimpan fungsi closure di dalam objek yang berumur panjang tanpa menyadari bahwa closure tersebut secara implisit menahan seluruh _scope chain_ induknya.

### 🌟 Best Practice

- Gunakan closure saat Anda ingin menyediakan antarmuka publik yang mengontrol mutasi data privat (_module design pattern_).
- Jika instans closure sudah tidak digunakan, setel variabelnya ke `null` (`instance = null`) untuk mengizinkan Garbage Collector membebaskan memori.

---

## 5. ✍️ Latihan Mandiri

1. Buat fungsi `buatPenghitungID(awalan)` yang mengembalikan fungsi generator. Setiap kali fungsi generator dipanggil, ia mengembalikan string ID unik berurutan: `'ID-1'`, `'ID-2'`, `'ID-3'`.
2. Buat fungsi `buatBatasPenarikan(limitHarian)` yang mengelola sisa kuota penarikan uang menggunakan closure privat. Jika penarikan melebihi sisa kuota, tolak transaksi tersebut.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [07.3 - Variable Scope](../03-scope/README.md)
- ➡️ **Selanjutnya:** [07.5 - Arrow Function](../05-arrow-functions/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
