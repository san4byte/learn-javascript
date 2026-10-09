# 08.2 - Destructuring Array dan Spread Operator

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengekstrak elemen-elemen array ke dalam variabel mandiri secara ringkas (_Destructuring_) atau menyebarkan elemen array ke ekspresi lain (_Spread Operator_).
> - **Kapan Digunakan**: Mengambil data kembalian fungsi bergaya tuple (misal `useState` di React), menukar nilai dua variabel (_variable swap_), serta menggabungkan dan mengklon array tanpa mutasi.
> - **Aturan Praktis**: Waspadai bahwa Spread Operator (`[...arr]`) hanya melakukan _Shallow Copy_. Untuk array bersarang yang berisi objek di dalamnya, gunakan `structuredClone()` untuk membuat salinan independen sejati.

---

## 1. 🎯 Tujuan Belajar

- Menguasai sintaks _Destructuring Assignment_ pada koleksi data Array.
- Mengatur nilai bawaan (_default values_) saat mendestrukturisasi elemen yang berpotensi `undefined`.
- Melewati indeks elemen tertentu menggunakan teknik koma kosong (_skipping elements_).
- Menukar nilai dua variabel (_variable swap_) secara instan tanpa bantuan variabel penampung sementara.
- Menggunakan _Spread Operator_ (`...`) untuk menggabungkan banyak array dan mengkloning array secara immutabel.
- Membedakan salinan dangkal (_Shallow Copy_) dengan salinan mendalam (_Deep Copy_) via `structuredClone()`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **Destructuring Array** seperti **membongkar paket parsel belanjaan**: Daripada membawa seluruh keranjang parsel yang berat ke mana-mana, Anda langsung mengambil botol sirup di slot 1 dan kaleng kue di slot 2 langsung ke tangan Anda masing-masing.
> - **Spread Operator** seperti **membuka ikatan kantong kelereng dan menumpahkannya ke atas lantai**: Seluruh butir kelereng yang tadinya terkunci di dalam satu kantong terhambur bebas menjadi butiran individual yang siap digabungkan dengan tumpukan kelereng lainnya.

---

### Tabel Perbandingan Fitur Destructuring vs Spread Operator

| Fitur               | Simbol / Sintaksis             | Sisi Penulisan               | Tujuan Utama                                     |
| :------------------ | :----------------------------- | :--------------------------- | :----------------------------------------------- |
| **Destructuring**   | `const [a, b] = arr;`          | Sisi kiri penugasan (_LHS_)  | Memecah array menjadi variabel-variabel mandiri  |
| **Rest Pattern**    | `const [a, ...sisa] = arr;`    | Sisi kiri penugasan (_LHS_)  | Mengumpulkan sisa elemen ke dalam array baru     |
| **Spread Operator** | `const gabung = [...a, ...b];` | Sisi kanan penugasan (_RHS_) | Menyebarkan elemen array ke array baru / argumen |
| **Variable Swap**   | `[x, y] = [y, x];`             | Kiri dan kanan penugasan     | Menukar dua nilai tanpa variabel `temp`          |

---

### Pembahasan Mendalam Fitur & API

#### 1. Sintaks Destructuring Assignment Array

Elemen array dipetakan ke variabel berdasarkan urutan posisi indeksnya:

```javascript
const warna = ["merah", "hijau", "biru"];
const [pertama, kedua] = warna;
console.log(pertama); // 'merah'
console.log(kedua); // 'hijau'
```

#### 2. Nilai Bawaan (_Default Values_) Saat Ekstraksi

Jika indeks array yang dituju tidak ada atau bernilai `undefined`, nilai default akan digunakan:

```javascript
const koordinat = [100];
const [x, y = 0] = koordinat;
console.log(x, y); // 100, 0
```

#### 3. Melewati Elemen yang Tidak Diperlukan (_Skipping Elements_)

Gunakan tanda koma tanpa nama variabel untuk melompati indeks tertentu:

```javascript
const ranking = ["Emas", "Perak", "Perunggu"];
const [juara1, , juara3] = ranking; // Elemen kedua 'Perak' dilewati
```

#### 4. Trik Penukaran Nilai (_Variable Swap_) Tanpa Variabel Temp

Pola elegan untuk menukar posisi dua variabel tanpa alokasi variabel ketiga:

```javascript
let a = 1,
  b = 2;
[a, b] = [b, a];
console.log(a, b); // 2, 1
```

#### 5. Menangkap Sisa Elemen dengan Rest Pattern

Pola rest pada destructuring menangkap seluruh elemen yang tersisa setelah variabel awal diekstrak:

```javascript
const angka = [10, 20, 30, 40, 50];
const [utama, ...cadangan] = angka;
console.log(cadangan); // [20, 30, 40, 50]
```

#### 6. Spread Operator untuk Penggabungan Array

Menggabungkan beberapa array menjadi satu array baru dengan sintaks yang sangat deklaratif:

```javascript
const timA = ["Ali", "Budi"];
const timB = ["Cici", "Deni"];
const semuaTim = [...timA, "Tamu", ...timB];
```

#### 7. Kloning Dangkal (_Shallow Copy_) vs Deep Copy `structuredClone()`

Operator spread hanya menyalin level terluar dari array:

```javascript
const sumber = [{ nama: "Joko" }];
const salinanDangkal = [...sumber];
// Mutasi objek internal akan mempengaruhi 'sumber'!
// Gunakan structuredClone untuk salinan mendalam:
const salinanMendalam = structuredClone(sumber);
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi ekstraksi koordinat GPS ber-default value, teknik melompati elemen, trik _variable swap_ instan, penggabungan & kloning via Spread Operator, serta pembuktian perbedaan _Shallow Copy_ vs `structuredClone()` telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/08-arrays/02-destructuring-spread/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Pengembalian Nilai Berpasangan (Pola React Hook `useState`)**:
   ```javascript
   function useToggle(nilaiAwal = false) {
     let state = nilaiAwal;
     const toggle = () => (state = !state);
     return [state, toggle]; // Tuple array
   }
   const [aktif, ubahStatus] = useToggle();
   ```
2. **Immutability pada State Reducer**: Menambahkan item baru ke daftar belanjaan tanpa memutasi array state lama: `state = [...state, itemBaru]`.

### ⚠️ Common Pitfalls

- **Mengira Spread Mengkloning Objek Bersarang**: Mengubah `shallow[0].id = 99` pada array objek hasil spread akan ikut mengubah array aslinya.
- **Lupa Titik Koma Sebelum Destructuring Swap**: Menulis `[a, b] = [b, a]` tanpa titik koma di baris sebelumnya dapat menyebabkan JavaScript menganggap baris sebelumnya sebagai indeks array tersambung (`TypeError: Cannot read properties of undefined`).

### 🌟 Best Practice

- Utamakan Spread Operator daripada `Array.prototype.concat()` untuk penggabungan array.
- Berikan nilai fallback default saat melakukan destructuring array dari sumber eksternal (seperti respons payload API).

---

## 5. ✍️ Latihan Mandiri

1. Diberikan array warna `const palet = ['#FF0000', '#00FF00', '#0000FF']`. Gunakan destructuring untuk mengekstrak warna merah dan biru saja (lewati warna hijau).
2. Diberikan dua array `grupA = ['Andi', 'Budi']` dan `grupB = ['Cici', 'Doni']`. Gabungkan keduanya menggunakan spread operator dan sisipkan `'Mentor'` tepat di tengah-tengah kedua grup tersebut.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [08.1 - Manipulasi Array](../01-array-manipulation/README.md)
- ➡️ **Selanjutnya:** [08.3 - Project Kelola Penumpang](../03-project-manage-passengers/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
