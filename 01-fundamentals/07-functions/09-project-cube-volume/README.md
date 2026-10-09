# 07.9 - Project Perhitungan Volume Dua Kubus

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengintegrasikan seluruh materi fungsi (deklarasi, parameter, return, modularitas, dan komposisi fungsi) ke dalam pemecahan masalah komputasi dunia nyata.
> - **Kapan Digunakan**: Memecah masalah matematika atau logika aplikasi yang kompleks menjadi sub-fungsi kecil independen (_Function Decomposition_).
> - **Aturan Praktis**: Terapkan prinsip _Pure Functions_ (fungsi murni yang selalu mengembalikan hasil yang sama untuk input yang sama tanpa efek samping mutasi variabel luar).

---

## 1. 🎯 Tujuan Belajar

- Menguasai teknik Dekomposisi Masalah (_Problem Decomposition_) menjadi modul-modul fungsi kecil.
- Menerapkan prinsip _Pure Function_ (fungsi deterministik bebas efek samping).
- Memahami konsep Komposisi Fungsi (_Function Composition_) di mana satu fungsi memanggil fungsi pembantu (_helper_) lainnya.
- Memperluas fleksibilitas fungsi komputasi menggunakan teknik _Rest Parameter_ variadik.
- Mengembangkan pemikiran modularitas untuk memperluas sistem ke bentuk geometri lainnya (seperti balok).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Modularitas fungsi seperti **merakit balok mainan LEGO**:
> Daripada mencetak satu patung kastil istana raksasa yang paten dari pabrik (**fungsi monolitik gemuk / _god function_**), kita mendesain dan mencetak balok-balok persegi kecil standar (**fungsi pembantu spesifik**). Balok-balok kecil ini dapat digabungkan menjadi jembatan, rumah, atau menara kapan pun kita ingin membangun arsitektur yang berbeda.

---

### Tabel Dekomposisi Arsitektur Proyek

| Lapisan / Fungsi                         | Peran Desain                                   | Masukan                    | Keluaran                       |
| :--------------------------------------- | :--------------------------------------------- | :------------------------- | :----------------------------- |
| **`hitungVolumeKubus(sisi)`**            | _Atomic Helper Function_ (Hitung $s^3$)        | 1 Angka numerik positif    | Nilai volume kubus tunggal     |
| **`jumlahVolumeDuaKubus(sisiA, sisiB)`** | _Coordinator Function_ (Komposisi $V_a + V_b$) | 2 Angka numerik            | Total gabungan volume 2 kubus  |
| **`jumlahVolumeBanyakKubus(...sisi)`**   | _Variadic Function_ (Fleksibel tak terbatas)   | Koleksi angka tak terbatas | Total akumulasi volume n-kubus |

---

### Pembahasan Mendalam Fitur & API

#### 1. Masalah & Dekomposisi Fungsi

Diberikan panjang sisi dua buah kubus ($sisiA$ dan $sisiB$). Masalah komputasi:
$$\text{Total Volume} = sisiA^3 + sisiB^3$$

Pendekatan amatir menuliskan formula `sisiA * sisiA * sisiA + sisiB * sisiB * sisiB` secara berulang. Pendekatan modular memisahkan rumus volume kubus menjadi fungsi pembantu tersendiri.

#### 2. Implementasi Fungsi Murni (_Pure Function_) `hitungVolumeKubus`

Fungsi murni tidak bergantung pada atau memodifikasi state luar:

```javascript
function hitungVolumeKubus(sisi) {
  return Math.pow(sisi, 3);
}
```

#### 3. Komposisi Fungsi dalam `jumlahVolumeDuaKubus`

Fungsi koordinator memanggil fungsi pembantu untuk tiap kubus, lalu menjumlahkannya:

```javascript
function jumlahVolumeDuaKubus(a, b) {
  return hitungVolumeKubus(a) + hitungVolumeKubus(b);
}
```

#### 4. Validasi Argumen & Penanganan Galat Tipe Data

Menambahkan proteksi di pintu gerbang fungsi helper agar kalkulasi selalu menerima input yang absah:

```javascript
if (typeof sisi !== "number" || sisi <= 0) {
  throw new TypeError("Sisi kubus wajib berupa angka positif!");
}
```

#### 5. Generalisasi Fleksibel Menggunakan Rest Parameter

Menggunakan kombinasi _Rest Parameter_, `map`, dan `reduce` agar fungsi dapat menghitung 2, 5, atau 100 kubus sekaligus tanpa mengubah kode inti:

```javascript
function jumlahVolumeBanyakKubus(...sisi) {
  return sisi.map(hitungVolumeKubus).reduce((acc, v) => acc + v, 0);
}
```

#### 6. Ekstensi Modularitas: Fungsi Volume Balok

Modularitas memudahkan penambahan fitur baru tanpa menyentuh kode lama yang sudah teruji:

```javascript
function hitungVolumeBalok(p, l, t) {
  return p * l * t;
}
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi fungsi murni perhitungan volume kubus tunggal, fungsi komposer dua kubus, generalisasi variadik dinamis berapapun kubus dengan _Rest Parameter_, serta modul fungsi volume balok telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/07-functions/09-project-cube-volume/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Mesin Kalkulasi Pajak dan Diskon E-Commerce**:
   ```javascript
   function hitungPPN(nominal) {
     return nominal * 0.11;
   }
   function hitungBiayaAdmin(nominal) {
     return 2500;
   }
   function kalkulasiTotalCheckout(subtotal, voucher) {
     return (
       subtotal - voucher + hitungPPN(subtotal) + hitungBiayaAdmin(subtotal)
     );
   }
   ```
2. **Kalkulator Indeks Massa Tubuh (BMI) & Kalori Harian**: Memecah penghitungan BMR, faktor aktivitas, dan rekomendasi defisit kalori ke dalam fungsi-fungsi modular.

### ⚠️ Common Pitfalls

- **Duplikasi Rumus (Violating DRY Principle)**: Menulis rumus matematika yang sama berulang kali di berbagai berkas, sehingga saat aturan rumus berubah (misal aturan perpajakan), pengembang harus mengubahnya di puluhan tempat terpisah.
- **Membuat Fungsi yang Terlalu Banyak Tanggung Jawab (_God Function_)**: Menggabungkan validasi input form HTML, koneksi database, dan rumus matematika di dalam satu fungsi raksasa 300 baris.

### 🌟 Best Practice

- Usahakan setiap fungsi pembantu berukuran ringkas (di bawah 10 baris kode).
- Pertahankan fungsi agar selalu berstatus _Pure Function_ (bebas efek samping) agar mudah dibuatkan pengujian otomatis (_Unit Testing_ dengan Jest/Vitest).

---

## 5. ✍️ Latihan Mandiri

1. Buat fungsi pembantu `hitungVolumeTabung(radius, tinggi)` yang menghitung volume tabung ($\pi \times r^2 \times t$). Gunakan `Math.PI`.
2. Buat fungsi koordinator `jumlahVolumeDuaTabung(tabung1, tabung2)` yang menerima dua objek tabung `{ radius, tinggi }` dan mengembalikan gabungan volume keduanya.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [07.8 - Fungsi Rekursif](../08-recursion/README.md)
- ➡️ **Selanjutnya:** [08.1 - Manipulasi Array](../../08-arrays/01-array-manipulation/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
