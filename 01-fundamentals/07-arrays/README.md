# 07 - Array (Arrays)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menyimpan dan mengelola koleksi data terurut berbasis indeks numerik yang dimulai dari nol (`0`).
> - **Kapan Digunakan**: Mengelola antrean (_Queue_), tumpukan (_Stack_), daftar data transaksi, pemotongan segmen data, dan ekstraksi nilai menggunakan destructuring.
> - **Aturan Praktis**: Gunakan `push()` dan `pop()` untuk manipulasi ujung dengan performa tinggi ($O(1)$). Gunakan `slice()` jika ingin membuat salinan tanpa mengubah array asli (_immutable_), dan bedakan _shallow copy_ (`[...]`) dari _deep copy_ (`structuredClone()`).

---

## 1. 🎯 Tujuan Belajar

- Memahami representasi struktur Array berbasis indeks numerik.
- Menguasai metode mutator ujung: `push()`, `pop()`, `shift()`, dan `unshift()`.
- Memahami dampak performa komputasi ($O(1)$ di ujung belakang vs $O(n)$ di ujung depan akibat pergeseran indeks).
- Membedakan secara mutlak antara `slice()` (_immutable_) dan `splice()` (mutasi langsung).
- Menguasai metode pencarian dan penggabungan: `indexOf()`, `includes()`, `join()`, dan `concat()`.
- Menguasai _Array Destructuring_, nilai default, _skipping elements_, _rest pattern_, dan teknik pertukaran variabel (_swap_).
- Menguasai _Spread Operator_ (`...`) untuk penggabungan serta memahami batas _shallow copy_ vs `structuredClone()`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **Array**: Seperti **rangkaian gerbong kereta api**. Gerbong diberi nomor urut mulai dari `0`.
> - **`push` & `pop`**: Menggandeng atau melepas gerbong paling belakang berlangsung instan ($O(1)$) karena tidak mengganggu kursi penumpang di gerbong lainnya.
> - **`unshift` & `shift`**: Memasang gerbong baru persis di depan belakang lokomotif memaksa petugas mengubah seluruh nomor tiket gerbong di belakangnya satu per satu ($O(n)$).
> - **Destructuring Array**: Seperti **membuka kotak bekal sekat tiga**. Anda langsung mengambil nasi ke piring A dan lauk ke piring B tanpa harus menyebut nomor laci sekatnya.

---

### Tabel Ringkasan Metode Manipulasi Array

| Metode                           | Kategori                 | Kompleksitas | Mengubah Asli? | Nilai Balik (_Return Value_) |
| :------------------------------- | :----------------------- | :----------- | :------------- | :--------------------------- |
| **`push(...items)`**             | Mutator (Ujung Belakang) | $O(1)$       | **Ya**         | Panjang array baru           |
| **`pop()`**                      | Mutator (Ujung Belakang) | $O(1)$       | **Ya**         | Elemen yang terhapus         |
| **`unshift(...items)`**          | Mutator (Ujung Depan)    | $O(n)$       | **Ya**         | Panjang array baru           |
| **`shift()`**                    | Mutator (Ujung Depan)    | $O(n)$       | **Ya**         | Elemen yang terhapus         |
| **`splice(start, del, ...add)`** | Mutator (Tengah)         | $O(n)$       | **Ya**         | Array elemen yang terhapus   |
| **`slice(start, end)`**          | Accessor (Salinan)       | $O(n)$       | **Tidak**      | Array salinan baru           |
| **`includes(value)`**            | Accessor (Pencarian)     | $O(n)$       | **Tidak**      | Boolean (`true` / `false`)   |
| **`join(separator)`**            | Accessor (Format String) | $O(n)$       | **Tidak**      | String teks gabungan         |

---

### Pembahasan Mendalam Fitur & Sintaks

#### 1. Operasi Ujung Array (Stack & Queue)

- **Stack (LIFO)**: Gunakan pasangan `push()` dan `pop()`.
- **Queue (FIFO)**: Gunakan pasangan `push()` (masuk belakang) dan `shift()` (keluar depan).

```javascript
const antrean = ["Budi"];
antrean.push("Siti"); // ['Budi', 'Siti']
const pertama = antrean.shift(); // 'Budi', sisa: ['Siti']
```

#### 2. `slice()` (Immutabel) vs `splice()` (Mutasi)

- **`slice(startIndex, endIndex)`**: Menyalin potongan elemen tanpa menyentuh array asal (_pure/immutable_).
- **`splice(startIndex, deleteCount, ...items)`**: Memotong, menghapus, atau menyisipkan elemen langsung pada array asli.

```javascript
const kota = ["Jakarta", "Bandung", "Surabaya"];

// slice: array asal tidak berubah
const sub = kota.slice(0, 2); // ['Jakarta', 'Bandung']

// splice: mengubah array asal
kota.splice(1, 1, "Semarang"); // Menghapus 'Bandung', mengganti dengan 'Semarang'
```

#### 3. Destructuring Array & Rest Pattern

Mengekstrak nilai array ke dalam variabel individual berdasarkan urutan posisi:

```javascript
const koordinat = [-6.2, 106.8];
const [lat, lng, alt = 0] = koordinat; // alt default ke 0

// Skipping elements & rest operator
const warna = ["Merah", "Hijau", "Biru", "Kuning"];
const [utama, , ketiga, ...sisa] = warna;
// utama: 'Merah', ketiga: 'Biru', sisa: ['Kuning']
```

#### 4. Pertukaran Variabel Instan (_Variable Swap_)

Menukar dua nilai tanpa variabel penampung sementara (`temp`):

```javascript
let x = 10;
let y = 20;
[x, y] = [y, x]; // x menjadi 20, y menjadi 10
```

#### 5. Spread Operator & Kloning

Operator spread (`...`) membuka elemen array:

```javascript
const a = [1, 2];
const b = [3, 4];
const gabungan = [...a, ...b]; // [1, 2, 3, 4]

// Shallow copy vs Deep copy
const list = [{ id: 1 }];
const shallow = [...list]; // Referensi objek dalam tetap sama
const deep = structuredClone(list); // Duplikasi objek terpisah total
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Implementasi demonstrasi lengkap yang mencakup mutator ujung, perbedaan `slice()` vs `splice()`, pencarian `includes()`, destructuring array, variable swap, dan spread cloning tersedia di berkas [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/07-arrays/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Breadcrumbs Navigasi UI**: Menggunakan `array.slice(0, levelAktif + 1).join(' / ')` untuk merender jalur navigasi halaman.
2. **Paginasi Data Sisi Klien**: Mengambil data halaman tertentu dari memori menggunakan `daftarProduk.slice((halaman - 1) * perHalaman, halaman * perHalaman)`.

### ⚠️ Common Pitfalls

- **Mutasi Tak Sengaja dengan `splice`**: Mengira `splice` mengembalikan array hasil akhir, padahal `splice` mengembalikan array _elemen yang dihapus_ dan memutasi array asli.
- **Shallow Copy pada Objek Bersarang**: Mengira `[...array]` menduplikasi objek di dalamnya secara mandiri. Jika objek di dalam salinan diubah, objek pada array asli akan ikut berubah. Gunakan `structuredClone()` untuk deep copy.

### 🌟 Best Practice

- Pilih metode _immutable_ (`slice`, `concat`, spread `[...]`, atau method ES2023 `toSorted()`) jika bekerja dengan pengelolaan state aplikasi.
- Hindari penggunaan berlebihan `shift()` dan `unshift()` pada array berukuran puluhan ribu item karena biaya komputasi $O(n)$ pergeseran indeks.

---

## 5. ✍️ Latihan Mandiri

1. **Rotasi Elemen Antrean**: Buatlah fungsi `rotasiKiri(arr)` yang mengambil elemen pertama array menggunakan `shift()` dan memindahkannya ke posisi paling belakang menggunakan `push()`. Uji dengan array `[1, 2, 3, 4]`, hasil yang diharapkan adalah `[2, 3, 4, 1]`.
2. **Pertukaran Elemen Array (Swap)**: Diberikan array `buah = ['Apel', 'Jeruk', 'Mangga']`. Gunakan teknik destructuring assignment untuk menukar posisi `'Apel'` dan `'Mangga'` tanpa membuat variabel sementara.
3. **Penyaringan & Penggabungan Dua Array**: Diberikan dua array:
   ```javascript
   const tagLama = ["javascript", "web", "frontend"];
   const tagBaru = ["frontend", "react", "nodejs"];
   ```
   Gabungkan kedua array tersebut dan hilangkan duplikasi kata menggunakan kombinasi _Spread Operator_ dan _Set_.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [06 - Functions](../06-functions/README.md)
- ➡️ **Selanjutnya:** [08 - Objects](../08-objects/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
