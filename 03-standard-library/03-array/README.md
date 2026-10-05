# 03 - Array (Queue, Stack, Search, dan Advanced Transformations)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami implementasi struktur data Queue (FIFO) dan Stack (LIFO) menggunakan method array native.
> * **Kapan Digunakan**: Menguasai method pencarian predikat modern: `find()`, `findIndex()`, `includes()`, `indexOf()`, dan `lastIndexOf()`.
> * **Aturan Praktis**: Gunakan `find()` jika Anda hanya membutuhkan 1 objek pertama, bukan `filter()[0]` yang membuang waktu menyaring seluruh array.

## 1. 🎯 Tujuan Belajar

- Memahami implementasi struktur data Queue (FIFO) dan Stack (LIFO) menggunakan method array native.
- Menguasai method pencarian predikat modern: `find()`, `findIndex()`, `includes()`, `indexOf()`, dan `lastIndexOf()`.
- Menguasai transformasi data mendalam: `map()`, `reduce()`, dan `reduceRight()`.
- Memahami perbedaan semantik komprehensif antara `forEach()` dan transformasi array.

---

## 2. 📖 Penjelasan Konsep & Referensi Method Lengkap

### 🎭 Analogi Dunia Nyata

> Queue seperti **antrean loket bioskop** (siapa yang datang duluan membeli tiket dan masuk lebih dulu). Stack seperti **tumpukan piring kotor di tempat cuci** (piring yang ditaruh paling terakhir di atas tumpukan justru yang pertama kali diambil dan dicuci).

Array di JavaScript bukan sekadar penampung data berurutan, melainkan fondasi bagi berbagai struktur data algoritma klasik dan pemrosesan fungsional. Berikut adalah referensi lengkap method bawaan yang wajib dikuasai:

### 1. Struktur Data Antrean: Queue (FIFO - First In, First Out)

Elemen yang masuk pertama kali akan dilayani dan dikeluarkan pertama kali (seperti antrean loket bank atau printer spooler).

- **`push(...items)`**: Menambahkan satu atau lebih elemen baru ke bagian **paling belakang** antrean.
- **`shift()`**: Mengambil sekaligus menghapus elemen di bagian **paling depan** antrean. Mengembalikan elemen yang dihapus, atau `undefined` jika array kosong.

```javascript
const antrean = [];
antrean.push('Tiket A'); // masuk antrean belakang
antrean.push('Tiket B');
const dipanggil = antrean.shift(); // "Tiket A" keluar depan
```

### 2. Struktur Data Tumpukan: Stack (LIFO - Last In, First Out)

Elemen yang ditaruh paling terakhir justru yang pertama kali diambil (seperti tumpukan piring atau riwayat aksi Undo/Redo).

- **`push(...items)`**: Menaruh elemen baru di bagian **paling atas/belakang**.
- **`pop()`**: Mengambil sekaligus menghapus elemen di bagian **paling atas/belakang**. Mengembalikan elemen yang dihapus, atau `undefined` jika array kosong.

```javascript
const riwayat = [];
riwayat.push('Halaman 1'); // taruh di atas
riwayat.push('Halaman 2');
const tombolBack = riwayat.pop(); // "Halaman 2" diambil
```

### 3. Kumpulan Method Pencarian (Search Methods)

| Method                                | Nilai Balik                      | Kegunaan & Contoh                                                                                                 |
| :------------------------------------ | :------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| **`find(predicate)`**                 | Objek / Nilai (atau `undefined`) | Mengembalikan **elemen pertama** yang lolos kondisi fungsi callback predikat: `arr.find(item => item.id === 101)` |
| **`findIndex(predicate)`**            | Angka Indeks (atau `-1`)         | Mengembalikan **nomor indeks pertama** elemen yang lolos kondisi: `arr.findIndex(item => item.id === 101)`        |
| **`includes(value, [fromIndex])`**    | `true` / `false`                 | Memeriksa apakah nilai primitif ada di dalam array: `['A', 'B'].includes('A') // true`                            |
| **`indexOf(value, [fromIndex])`**     | Angka Indeks (atau `-1`)         | Mencari indeks kemunculan **pertama** dari suatu nilai dari kiri: `['a', 'b', 'a'].indexOf('a') // 0`             |
| **`lastIndexOf(value, [fromIndex])`** | Angka Indeks (atau `-1`)         | Mencari indeks kemunculan **terakhir** dari suatu nilai dari kanan: `['a', 'b', 'a'].lastIndexOf('a') // 2`       |

### 4. Penyaringan Data: `filter(predicate)`

- Mengembalikan **array baru** yang hanya memuat elemen-elemen di mana fungsi callback mengembalikan `true`.
- Bersifat _immutable_ (tidak mengubah isi array aslinya).

```javascript
const angka = [10, 5, 20, 8];
const diAtasSepuluh = angka.filter((n) => n >= 10); // [10, 20]
```

### 5. Transformasi Data: `map()`, `reduce()`, dan `reduceRight()`

- **`map(callback)`**:
  Mentransformasikan setiap elemen menjadi bentuk baru. Selalu menghasilkan array baru dengan panjang yang sama persis.

  ```javascript
  const nama = ['joko', 'budi'];
  const kapital = nama.map((n) => n.toUpperCase()); // ["JOKO", "BUDI"]
  ```

- **`reduce(callback, [initialValue])`**:
  Mengakumulasikan seluruh isi array dari urutan **kiri ke kanan** (indeks `0` ke `length-1`) menjadi satu nilai tunggal.

  ```javascript
  const angka = [1, 2, 3, 4];
  const total = angka.reduce((acc, curr) => acc + curr, 0); // 10
  ```

- **`reduceRight(callback, [initialValue])`**:
  Sama seperti `reduce()`, tetapi memproses urutan secara terbalik dari **kanan ke kiri** (indeks terakhir mundur ke indeks `0`). Sangat berguna untuk evaluasi ekspresi matematis terbalik atau perakitan hierarki pohon (_tree flattening_).
  ```javascript
  const kata = ['A', 'B', 'C'];
  const balik = kata.reduceRight((acc, curr) => acc + curr, ''); // "CBA"
  ```

### 6. Perulangan Efek Samping: `forEach(callback)` vs `map()`

- **`forEach()`**: Hanya digunakan untuk mengeksekusi aksi/efek samping (_side-effects_), seperti mencetak log atau memicu mutasi eksternal. **Tidak mengembalikan apa pun (`undefined`)**.
- **`map()`**: Digunakan untuk membuat koleksi data baru tanpa efek samping (_pure transformation_). Jangan gunakan `map()` jika Anda tidak membutuhkan nilai array baliknya.

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Struktur Data Stack (LIFO: Last-In First-Out) ---');
const riwayatAksi = [];
riwayatAksi.push("Ketik: 'Halo'");
riwayatAksi.push("Ketik: 'Halo Dunia'");
riwayatAksi.push('Format: Bold');
console.log('Tumpukan aksi saat ini        :', riwayatAksi);

// Tombol Undo (mengambil aksi terakhir yang ditaruh di atas)
const aksiDibatalkan = riwayatAksi.pop();
console.log('Aksi di-undo (pop)            :', aksiDibatalkan);
console.log('Sisa tumpukan aksi            :', riwayatAksi);

console.log('\n--- 2. Studi Kasus Nyata: Antrean Pesanan (Queue FIFO, Search, & Reduce) ---');
class AntreanPesanan {
  // Enkapsulasi data antrean menggunakan Private Field (#)
  #daftar = [];

  tambahPesanan(data) {
    this.#daftar.push(data);
    console.log(`[+] Pesanan masuk antrean: ID ${data.id} (${data.nama})`);
  }

  prosesPesanan() {
    if (this.#daftar.length === 0) {
      return 'Antrean kosong';
    }
    const pesanan = this.#daftar.shift();
    return `Pesanan ID ${pesanan.id} milik ${pesanan.nama} selesai diproses`;
  }

  cariPesananById(targetId) {
    const pesanan = this.#daftar.find((item) => item.id === targetId);
    if (!pesanan) {
      return `Pesanan dengan ID ${targetId} tidak ditemukan`;
    }
    return `ID ${targetId} ditemukan: ${pesanan.nama} (Rp ${pesanan.total.toLocaleString('id-ID')})`;
  }

  hitungTotalPendapatan() {
    const total = this.#daftar.reduce((acc, item) => acc + item.total, 0);
    return `Total Nilai Antrean: ${total.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    })}`;
  }

  get daftarAntrean() {
    return [...this.#daftar]; // Kembalikan salinan array agar data asli aman
  }
}

// Pengujian Kasus Uji:
const antreanResto = new AntreanPesanan();

antreanResto.tambahPesanan({ id: 1, nama: 'Budi', total: 150000 });
antreanResto.tambahPesanan({ id: 2, nama: 'Andi', total: 10000 });
antreanResto.tambahPesanan({ id: 3, nama: 'Siti', total: 25000 });

console.log('\n--- Pemrosesan Antrean (Queue: First-In First-Out) ---');
console.log(antreanResto.prosesPesanan()); // Budi diproses lebih dulu (FIFO)
console.log(antreanResto.prosesPesanan()); // Andi diproses kedua

console.log('\n--- Pencarian Data (Array.find) ---');
console.log(antreanResto.cariPesananById(3)); // Siti ditemukan
console.log(antreanResto.cariPesananById(99)); // ID tidak ada

console.log('\n--- Akumulasi Data (Array.reduce) ---');
console.log(antreanResto.hitungTotalPendapatan()); // Sisa pesanan Siti (Rp 25.000)
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Struktur Data Stack (LIFO: Last-In First-Out) ---
Tumpukan aksi saat ini        : [ "Ketik: 'Halo'", "Ketik: 'Halo Dunia'", 'Format: Bold' ]
Aksi di-undo (pop)            : Format: Bold
Sisa tumpukan aksi            : [ "Ketik: 'Halo'", "Ketik: 'Halo Dunia'" ]

--- 2. Studi Kasus Nyata: Antrean Pesanan (Queue FIFO, Search, & Reduce) ---
[+] Pesanan masuk antrean: ID 1 (Budi)
[+] Pesanan masuk antrean: ID 2 (Andi)
[+] Pesanan masuk antrean: ID 3 (Siti)

--- Pemrosesan Antrean (Queue: First-In First-Out) ---
Pesanan ID 1 milik Budi selesai diproses
Pesanan ID 2 milik Andi selesai diproses

--- Pencarian Data (Array.find) ---
ID 3 ditemukan: Siti (Rp 25.000)
Pesanan dengan ID 99 tidak ditemukan

--- Akumulasi Data (Array.reduce) ---
Total Nilai Antrean: Rp 25.000
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case

1. **Sistem Undo/Redo**: Fitur Undo di text editor menyimpan state riwayat aksi ke dalam struktur data Stack (`pop()` saat tombol Undo ditekan).
2. **Background Job Runner**: Antrean download file atau pemrosesan email yang dieksekusi berurutan menggunakan pola Queue (`push` dan `shift`).
3. **Pencarian ID Produk di E-Commerce**: Mencari item keranjang tertentu dengan cepat menggunakan `cart.find(item => item.id === targetId)`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Performa `shift()` dan `unshift()`**: Operasi di awal array membutuhkan penggeseran indeks seluruh elemen ($O(n)$). Untuk antrean raksasa (puluhan ribu elemen), pertimbangkan struktur Linked List.
* **Lupa `initialValue` pada `reduce`**: Jika initial value tidak diberikan pada array kosong, JavaScript akan melempar fatal error `TypeError: Reduce of empty array with no initial value`.
* **Menghapus elemen di tengah perulangan `forEach`**: Melakukan mutasi ukuran array saat sedang di-loop akan menyebabkan elemen terlewatkan secara tidak terduga.

### 🌟 Best Practice

- Gunakan `find()` jika Anda hanya membutuhkan 1 objek pertama, bukan `filter()[0]` yang membuang waktu menyaring seluruh array.
* Selalu cantumkan nilai awal (*initial value*) saat memanggil `reduce()` atau `reduceRight()` demi keamanan kode.
* Pilih `push` + `pop` (Stack) untuk operasi berkecepatan tinggi ($O(1)$).

---

## 6. ✍️ Latihan Mandiri

1. Buat class sederhana `AntreanKlinik` dengan method `masuk(namaPasien)` dan `panggil()` yang bekerja dengan prinsip FIFO Queue.
2. Diberikan array objek transaksi `[{ id: 1, tipe: 'debit', nominal: 50000 }, { id: 2, tipe: 'kredit', nominal: 20000 }]`. Hitung saldo akhir dengan `reduce()` di mana debit menambah saldo dan kredit mengurangi saldo.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [02 - String](../02-string/README.md)
- ➡️ **Selanjutnya:** [04 - Object](../04-object/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
