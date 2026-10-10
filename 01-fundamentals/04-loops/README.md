# 04 - Pengulangan (Loops)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengeksekusi blok kode secara berulang berdasarkan kondisi tertentu (`while`, `do...while`), hitungan counter pasti (`for`), atau iterasi struktur data (`for...of`, `for...in`).
> - **Kapan Digunakan**: Mengolah data koleksi (Array/Object), memproses antrean data (_queue draining_), komputasi matriks dua dimensi, dan otomasi tugas berulang.
> - **Aturan Praktis**: Gunakan `for` jika batas putaran diketahui, `while` jika terminasi bergantung pada kondisi eksternal, `for...of` untuk nilai elemen _iterable_, dan hindari `for...in` pada Array (khususkan untuk membaca kunci properti Objek).

---

## 1. 🎯 Tujuan Belajar

- Memahami 3 pilar struktur perulangan: nilai inisialisasi awal, kondisi terminasi, dan pembaruan variabel (_increment/decrement_).
- Mengetahui perbedaan urutan evaluasi kondisi antara `while` (_pre-test_) dan `do...while` (_post-test_).
- Menguasai perulangan `for` standar, pembalikan arah (_decrement_), dan multiple counter (_two-pointer pattern_).
- Memahami struktur perulangan bersarang (_nested loops_) untuk manipulasi matriks 2D serta penggunaan _labelled statements_.
- Menguasai perulangan modern ES6: `for...of` (nilai koleksi) dan `for...in` (kunci properti objek).
- Menguasai kontrol aliran perulangan menggunakan `break` dan `continue`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **`while`**: Seperti **gerbang tol otomatis**. Kartu saldo diperiksa di awal sebelum palang terbuka. Jika saldo tidak cukup sejak awal, mobil tidak boleh lewat sama sekali (0 kali jalan).
> - **`do...while`**: Seperti **restoran prasmanan (_all-you-can-eat_)**. Anda dipersilakan mengambil piring pertama terlebih dahulu (**pasti dieksekusi minimal 1 kali**), baru kemudian pelayan menanyakan apakah Anda ingin menambah porsi lagi.
> - **`for`**: Seperti **pelari sprint di lintasan atletik**. Sudah ditentukan sejak awal harus berlari sebanyak tepat 5 putaran mengelilingi lapangan.
> - **`for...of`**: Seperti **penumpang bus wisata**. Pemandu menyapa satu per satu nama orang yang duduk di dalam kursi bus (_mengambil isi/nilai_).
> - **`for...in`**: Seperti **petugas sensus rumah**. Petugas mencatat label alamat pintu depan setiap kamar (_mengambil nama kunci/key_).

---

### Tabel Perbandingan Struktur Perulangan

| Jenis Perulangan | Target Penggunaan                          | Evaluasi Kondisi       | Mengakses                    |
| :--------------- | :----------------------------------------- | :--------------------- | :--------------------------- |
| **`while`**      | Kondisi dinamis, antrean, batas tak tentu  | Di awal (_pre-test_)   | Berdasarkan ekspresi boolean |
| **`do...while`** | Aksi wajib minimal 1 kali (validasi input) | Di akhir (_post-test_) | Berdasarkan ekspresi boolean |
| **`for`**        | Hitungan terukur (_counter-controlled_)    | Di awal (_pre-test_)   | Indeks numerik               |
| **`for...of`**   | Array, String, Set, Map (_Iterable_)       | Tiap elemen            | **Nilai / Value** langsung   |
| **`for...in`**   | Object enumerable properties               | Tiap kunci             | **Kunci / Key** properti     |

---

### Pembahasan Mendalam Fitur & Sintaks

#### 1. While Loop dan Do-While

Pernyataan `while` mengevaluasi ekspresi sebelum menjalankan blok kode. Sementara `do...while` menjamin blok kode dieksekusi minimal satu kali:

```javascript
// While: berhenti saat kondisi bernilai falsy
let count = 1;
while (count <= 3) {
  console.log(`Putaran ke-${count}`);
  count++;
}

// Do-While: minimal dieksekusi 1 kali meskipun kondisi awal false
let uji = 10;
do {
  console.log(`Nilai: ${uji}`); // Tetap tampil 1 kali
  uji++;
} while (uji < 5);
```

#### 2. Kontrol Alur: `break` dan `continue`

- **`break`**: Menghentikan perulangan secara permanen dan keluar dari blok perulangan.
- **`continue`**: Mengabaikan sisa baris kode pada putaran saat ini dan langsung melompat ke putaran berikutnya.

```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 2) continue; // Lewati angka 2
  if (i === 4) break; // Berhenti saat mencapai angka 4
  console.log(i); // Output: 1, 3
}
```

#### 3. For Loop Standar & Multiple Counter

Struktur `for` memiliki 3 bagian dalam headernya: `for (inisialisasi; kondisi; pembaruan)`.

```javascript
// For standar increment
for (let i = 0; i < 3; i++) {
  console.log(`Indeks: ${i}`);
}

// Multiple counters (two-pointer)
for (let kiri = 0, kanan = 4; kiri < kanan; kiri++, kanan--) {
  console.log(`Kiri: ${kiri}, Kanan: ${kanan}`);
}
```

#### 4. Nested Loops (Perulangan Bersarang) & Labelled Statement

Perulangan di dalam perulangan digunakan saat mengolah struktur bertingkat seperti matriks koordinat dua dimensi `[baris][kolom]`:

```javascript
const matriks = [
  [1, 2],
  [3, 4],
];

loopLuar: for (let r = 0; r < matriks.length; r++) {
  for (let c = 0; c < matriks[r].length; c++) {
    if (matriks[r][c] === 3) {
      console.log(`Ditemukan pada [${r}][${c}]`);
      break loopLuar; // Langsung hentikan loop terluar
    }
  }
}
```

#### 5. Modern Loops: `for...of` vs `for...in`

ES6 memperkenalkan `for...of` untuk mengakses nilai dari objek yang memiliki kontrak _iterable_ (Array, String, Map, Set). Sedangkan `for...in` digunakan untuk membaca nama kunci properti objek:

```javascript
// for...of membaca nilai array
const hobi = ["Koding", "Membaca"];
for (const h of hobi) {
  console.log(h); // 'Koding', 'Membaca'
}

// for...in membaca kunci properti objek
const pengguna = { id: 1, peran: "Admin" };
for (const key in pengguna) {
  if (Object.hasOwn(pengguna, key)) {
    console.log(`${key}: ${pengguna[key]}`);
  }
}
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Implementasi kode lengkap yang mencakup perulangan `while`, `do...while`, `for`, `nested loops` dengan _labelled statements_, serta perulangan modern `for...of` dan `for...in` tersedia di berkas [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/04-loops/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Pemrosesan Antrean Data (_Queue Draining_)**: Menguras antrean transaksi menggunakan `while (antrean.length > 0)` dengan metode `shift()`.
2. **Pengambilan Nilai Objek Dinamis**: Menggunakan `for...of` yang dipadukan dengan `Object.entries(config)` untuk membaca pasangan kunci-nilai konfigurasi secara deklaratif.

### ⚠️ Common Pitfalls

- **Infinite Loop**: Lupa memperbarui variabel counter (`i++`) di dalam badan `while`, menyebabkan eksekusi program macet total dan membebani 100% thread CPU.
- **`continue` pada While**: Memanggil `continue` sebelum baris penambahan variabel counter, mengakibatkan nilai counter tidak pernah berubah dan memicu _infinite loop_.
- **Menggunakan `for...in` pada Array**: `for...in` mengembalikan indeks array dalam bentuk string (`"0"`, `"1"`) dan dapat mengiterasi properti warisan prototype yang tidak diinginkan. Selalu gunakan `for...of` untuk Array.

### 🌟 Best Practice

- Pilih `for...of` sebagai pilihan pertama saat membaca elemen Array kecuali Anda secara eksplisit membutuhkan indeks angka (gunakan `array.entries()` bersama `for...of`).
- Selalu gunakan `Object.hasOwn(obj, key)` jika menggunakan `for...in` untuk menyaring properti turunan prototype.

---

## 5. ✍️ Latihan Mandiri

1. **Hitung Mundur Peluncuran**: Buatlah perulangan `while` yang mencetak hitungan mundur dari `5` sampai `1`, kemudian mencetak `"Meluncur!"`.
2. **Pola Segitiga Siku Bintang**: Menggunakan perulangan bersarang (`nested loops`), buatlah program yang mencetak pola bintang segitiga siku-siku dengan tinggi 4 baris:
   ```text
   *
   **
   ***
   ****
   ```
3. **Filter Properti Objek**: Diberikan objek transaksi `{ beras: 50000, gula: 12000, minyak: 28000 }`. Gunakan `for...of` bersama `Object.entries()` untuk menghitung total belanjaan dari seluruh properti yang ada.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [03 - Template Literals](../03-template-literals/README.md)
- ➡️ **Selanjutnya:** [05 - Conditionals](../05-conditionals/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
