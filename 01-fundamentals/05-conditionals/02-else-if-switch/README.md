# 05.2 - Pengkondisian Lanjutan: Else If dan Switch Case

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengevaluasi keputusan logika multi-cabang menggunakan rantai kondisi relasional (`else if`) atau pencocokan nilai pasti diskrit (`switch...case`).
> - **Kapan Digunakan**: Gunakan `else if` jika pengujian melibatkan rentang angka (`<`, `>=`) atau kombinasi operator logika (`&&`, `||`). Gunakan `switch` atau _Lookup Table_ jika mencocokkan satu nilai variabel ke daftar pilihan konstan yang spesifik.
> - **Aturan Praktis**: Selalu sertakan `break` pada setiap blok `case` untuk mencegah kebocoran eksekusi (_fall-through_ yang tidak disengaja). Ingat bahwa `switch` melakukan evaluasi kesetaraan ketat (_strict equality_ `===`).

---

## 1. 🎯 Tujuan Belajar

- Menguasai penanganan skenario keputusan bertingkat banyak menggunakan rantai `else if`.
- Memahami struktur sintaks `switch...case`, klausa `case`, peran kata kunci `break`, dan blok fallback `default`.
- Memanfaatkan fenomena _fall-through_ yang disengaja untuk mengelompokkan beberapa opsi kasus dengan aksi yang sama.
- Mengetahui bahwa perbandingan di dalam `switch` bekerja secara _Strict Equality_ (`===`).
- Menguasai pola arsitektur modern alternatif berupa _Object Lookup Table_ / kamus kamus (_dictionary_).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - `else if` seperti **pos pemeriksaan tinggi badan di wahana seluncur air**: Petugas mengukur tinggi Anda secara bertahap: _"Apakah tinggi >= 160 cm? Jika tidak, apakah >= 140 cm? Jika tidak, apakah >= 120 cm?"_ (evaluasi rentang berurutan).
> - `switch...case` seperti **tombol panel di dalam lift gedung bertingkat**: Anda menekan tombol nomor lantai `"3"`. Lift tidak perlu mengecek lantai 1 atau 2 terlebih dahulu, melainkan langsung mencocokkan nomor lantai target dan mengantar Anda ke lantai tersebut.

---

### Tabel Perbandingan Pendekatan Kondisional Multi-Cabang

| Parameter                | `else if`                                 | `switch...case`                            | `Object Lookup Table`                  |
| :----------------------- | :---------------------------------------- | :----------------------------------------- | :------------------------------------- |
| **Bentuk Evaluasi**      | Kondisi dinamis (rentang, logika boolean) | Nilai pasti diskrit (_single exact value_) | Pasangan Kunci-Nilai (_Key-Value_)     |
| **Mekanisme Pengecekan** | Ekspresi boolean (`true` / `false`)       | Kesetaraan ketat (`===`)                   | Akses properti hash (_O(1)_)           |
| **Penggunaan Ideal**     | Penilaian grade skor (`skor >= 80`)       | Menu aksi, kode rute, tombol navigasi      | Kamus kode status HTTP, pemetaan label |
| **Kemudahan Dibaca**     | Sedang (jika terlalu banyak cabang)       | Rapi untuk nilai konstan                   | Paling bersih & modular                |

---

### Pembahasan Mendalam Fitur & API

#### 1. Sintaks Rantai Percabangan `else if`

Dieksekusi dari atas ke bawah. Saat kondisi pertama bernilai `true`, blok kodenya dijalankan dan seluruh sisa blok `else if` di bawahnya langsung diabaikan:

```javascript
const nilai = 82;
if (nilai >= 90) {
  console.log("Grade A");
} else if (nilai >= 80) {
  console.log("Grade B"); // Berhenti di sini
} else {
  console.log("Grade C");
}
```

#### 2. Sintaks Struktur `switch...case`

Mengevaluasi nilai ekspresi tunggal lalu melompat ke klausa `case` yang identik:

```javascript
const level = "Gold";
switch (level) {
  case "Silver":
    console.log("Diskon 5%");
    break;
  case "Gold":
    console.log("Diskon 10%");
    break;
  default:
    console.log("Diskon 0%");
}
```

#### 3. Peran Kritis Pernyataan `break` & `default`

- **`break`**: Menghentikan eksekusi blok switch dan melompat keluar. Tanpa `break`, JavaScript mengeksekusi semua case berikutnya tanpa memeriksa kondisi (_fall-through_).
- **`default`**: Berjalan jika tidak ada satu pun case yang cocok (serupa dengan blok `else` penutup).

#### 4. Karakteristik Fall-through dan Pengelompokan Case

_Fall-through_ yang disengaja dapat dimanfaatkan untuk menggabungkan beberapa nilai yang memiliki logika penanganan serupa:

```javascript
switch (hari) {
  case "Senin":
  case "Selasa":
  case "Rabu":
    console.log("Hari kerja reguler");
    break;
  case "Sabtu":
  case "Minggu":
    console.log("Akhir pekan");
    break;
}
```

#### 5. Strict Equality (`===`) dalam Pencocokan Case

Klausa `case` tidak melakukan konversi tipe data implisit:

```javascript
const input = "1";
switch (input) {
  case 1:
    // Tidak akan pernah cocok karena "1" !== 1
    break;
}
```

#### 6. Pola Modern Alternatif: Object Lookup Table

Dalam basis kode profesional, tabel pencarian (_lookup table_) sering menggantikan switch-case panjang demi kode yang lebih deklaratif:

```javascript
const statusHTTP = {
  200: "Sukses OK",
  404: "Halaman Tidak Ditemukan",
  500: "Kesalahan Server",
};
const pesan = statusHTTP[404] || "Status Tidak Dikenal";
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi klasifikasi skor berbasis `else if`, pencocokan kode menu via `switch...case`, pengelompokan beberapa case (_fall-through_ terencana), serta penerapan arsitektur modern _Object Lookup Table_ telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/05-conditionals/02-else-if-switch/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Pengendali State Reducer (Redux / State Management)**:
   ```javascript
   function todoReducer(state, action) {
     switch (action.type) {
       case "ADD_TODO":
         return [...state, action.payload];
       case "REMOVE_TODO":
         return state.filter((t) => t.id !== action.payload);
       default:
         return state;
     }
   }
   ```
2. **Kategorisasi Usia Tarif Tiket**: Menggunakan rantai `else if` untuk menentukan tarif gratis (balita), pelajar, dewasa, atau lansia.

### ⚠️ Common Pitfalls

- **Lupa Menuliskan `break` (Unintended Fall-through)**: Kesalahan paling umum di mana alur logika terus merembes ke bawah, mengeksekusi case berikutnya dan merusak nilai variabel.
- **Mencoba Kondisi Kompleks di `case`**: Menulis `case (x > 10):` di dalam `switch(x)` tidak bekerja sebagaimana mestinya, karena yang dibandingkan adalah `x === (x > 10)` (yaitu angka vs boolean). Jika ingin perbandingan relasional di switch, gunakan sintaks `switch (true) { case x > 10: ... }`, atau lebih baik gunakan `else if`.

### 🌟 Best Practice

- Gunakan `else if` jika kondisi berupa evaluasi rentang atau variabel dinamis.
- Gunakan `switch` jika mengecek satu variabel diskrit yang memiliki opsi pasti.
- Pertimbangkan _Lookup Table Object_ atau `Map` jika opsi percabangan hanya sekadar memetakan kunci string/angka ke nilai keluaran sederhana.

---

## 5. ✍️ Latihan Mandiri

1. Buat program `switch...case` yang menerima kode mata uang (contoh: `'USD'`, `'EUR'`, `'JPY'`, `'IDR'`) dan menampilkan nama mata uang serta negara penerbitnya. Tambahkan blok `default` jika kode tidak dikenal.
2. Buat kembali sistem penerjemah peran pengguna (`'admin'`, `'editor'`, `'viewer'`) menggunakan pola _Object Lookup Table_ dan sertakan nilai _fallback_ jika peran tidak ditemukan.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [05.1 - If Else](../01-if-else/README.md)
- ➡️ **Selanjutnya:** [07.1 - Pengenalan Function](../../07-functions/01-intro/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
