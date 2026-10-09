# 08.1 - Manipulasi Array (Method Mutator & Accessor)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengelola elemen-elemen data berurutan pada struktur Array menggunakan metode pengubah (_Mutator_) atau metode pembaca salinan (_Accessor_).
> - **Kapan Digunakan**: Mengelola antrean (_Queue_), tumpukan (_Stack_), menyaring data, mencari indeks item, atau memotong sebagian elemen array.
> - **Aturan Praktis**: Gunakan `push()` dan `pop()` untuk manipulasi performa tinggi ($O(1)$). Gunakan `slice()` jika Anda ingin menyalin data tanpa memodifikasi array aslinya (_immutable pattern_).

---

## 1. 🎯 Tujuan Belajar

- Memahami representasi struktur Array berbasis indeks numerik yang dimulai dari nol (`0`).
- Menguasai metode mutator ujung array: `push()`, `pop()`, `shift()`, dan `unshift()`.
- Memahami dampak performa komputasi ($O(1)$ pada ujung belakang vs $O(n)$ pada ujung depan).
- Membedakan secara mutlak antara metode pemotong `slice()` (immutabel) dan `splice()` (mutasi langsung).
- Menguasai metode pencarian dan penggabungan: `indexOf()`, `includes()`, `join()`, dan `concat()`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Array seperti **rangkaian gerbong kereta api berpenumpang**:
>
> - Menggandeng atau melepas gerbong di paling belakang (**`push` / `pop`**) berlangsung sangat cepat karena tidak mengganggu penumpang lain ($O(1)$).
> - Namun menyisipkan gerbong baru di paling depan persis di belakang lokomotif (**`unshift` / `shift`**) memaksa petugas mengumumkan dan mengubah seluruh nomor tiket kursi gerbong di belakangnya satu per satu ($O(n)$).

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

### Pembahasan Mendalam Fitur & API

#### 1. Operasi Akhir Array: `push()` dan `pop()`

Menambahkan atau membuang data dari indeks terakhir. Membentuk struktur data **Stack (LIFO - Last In First Out)**:

```javascript
const stack = ["A", "B"];
stack.push("C"); // ['A', 'B', 'C']
const last = stack.pop(); // 'C', sisa: ['A', 'B']
```

#### 2. Operasi Awal Array: `unshift()` dan `shift()`

Menambahkan atau membuang elemen dari indeks `0`. Kombinasi `push()` dan `shift()` membentuk struktur data **Queue (FIFO - First In First Out)**:

```javascript
const antrean = ["Budi", "Siti"];
antrean.unshift("Pasien Gawat"); // Menambah di awal
const dilayani = antrean.shift(); // 'Pasien Gawat'
```

#### 3. Memahami Kompleksitas Performa $O(1)$ vs $O(n)$

Saat memanggil `shift()` atau `unshift()`, JavaScript harus memetakan ulang (_re-indexing_) setiap elemen dari indeks $1 \dots n$ menjadi indeks $0 \dots (n-1)$. Untuk array berisi 500.000 elemen, `shift()` ribuan kali lebih lambat dibanding `pop()`.

#### 4. Mutasi Fleksibel Tengah Array: `splice()`

Dapat menghapus, menyisipkan, atau mengganti elemen pada posisi indeks mana pun:

```javascript
const angka = [10, 20, 40];
// Sisipkan 30 di indeks 2 tanpa menghapus (deleteCount: 0)
angka.splice(2, 0, 30); // [10, 20, 30, 40]
```

#### 5. Ekstraksi Salinan Immutabel: `slice()`

Mengambil sebagian potongan array dari indeks `start` hingga sebelum indeks `end` tanpa mengubah array asal:

```javascript
const hewan = ["Kucing", "Kuda", "Gajah", "Singa"];
const mamaliaDarat = hewan.slice(1, 3); // ['Kuda', 'Gajah']
```

#### 6. Pencarian Elemen: `indexOf()` dan `includes()`

- `indexOf(item)`: Mengembalikan indeks posisi pertama ditemukan, atau `-1` jika tidak ada.
- `includes(item)`: Mengembalikan nilai boolean murni yang lebih mudah dibaca pada kondisi `if`.

```javascript
const warna = ["merah", "kuning", "hijau"];
warna.includes("kuning"); // true
warna.indexOf("biru"); // -1
```

#### 7. Transformasi dan Penggabungan: `join()` dan `concat()`

- `join(separator)`: Menggabungkan seluruh elemen array menjadi string dengan tanda pemisah kustom.
- `concat(otherArray)`: Menggabungkan dua atau lebih array menjadi satu array baru tanpa mengubah array asal.

```javascript
const pecahan = ["0812", "3456", "7890"];
const noHp = pecahan.join("-"); // '0812-3456-7890'
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi alur penambahan antrean klinik via `push()` / `pop()` / `unshift()` / `shift()`, perbandingan mutasi `splice()` vs salinan immutabel `slice()`, serta pencarian dan penggabungan teks rute via `includes()` dan `join()` telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/08-arrays/01-array-manipulation/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Breadcrumbs Navigasi Website**: Mengubah array segmen URL menjadi link breadcrumb:
   ```javascript
   const breadcrumbs = ["Beranda", "Katalog", "Sepatu"].join(" / ");
   ```
2. **Riwayat Tindakan Undo / Redo**: Memanfaatkan struktur data Stack (`push()` dan `pop()`) untuk mencatat aksi pengguna di editor teks.

### ⚠️ Common Pitfalls

- **Salah Mengira `splice` Aman untuk State**: Menggunakan `state.splice(...)` langsung pada framework reaktif seperti React dapat merusak deteksi perubahan data karena array mengalami mutasi di tempat (_in-place mutation_). Gunakan `slice()` atau filter fungsional.
- **Indeks Negatif pada `slice`**: `array.slice(-2)` mengambil 2 elemen terakhir dari belakang. Berguna jika dipahami, namun sering membingungkan bagi pemula.

### 🌟 Best Practice

- Gunakan `includes()` daripada menulis pengecekan kuno `indexOf(...) !== -1`.
- Jika Anda tidak perlu mengubah array asli, biasakan menggunakan pendekatan _immutability_ (`slice()`, `concat()`, atau _spread operator_).

---

## 5. ✍️ Latihan Mandiri

1. Buat array `daftarTugas = ['Desain UI', 'Koding Frontend']`. Tambahkan `'Testing QA'` di akhir array dan tambahkan `'Meeting Klien'` di awal array.
2. Gunakan `splice()` untuk menghapus tugas `'Koding Frontend'` dan menggantinya dengan `'Koding Backend & API'`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [07.9 - Project Volume Kubus](../../07-functions/09-project-cube-volume/README.md)
- ➡️ **Selanjutnya:** [08.2 - Destructuring & Spread Array](../02-destructuring-spread/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
