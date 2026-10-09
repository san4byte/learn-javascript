# 07.7 - Rest Parameter (...args)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengumpulkan sisa argumen fungsi dalam jumlah tak terbatas ke dalam satu struktur array JavaScript asli menggunakan sintaks tiga titik (`...args`).
> - **Kapan Digunakan**: Menggantikan objek usang `arguments`, membuat fungsi logger dengan pesan dinamis, atau menerima daftar data variadik (_variadic functions_).
> - **Aturan Praktis**: Rest parameter **wajib diletakkan di posisi paling akhir** dalam daftar parameter fungsi, dan hanya boleh ada satu rest parameter per fungsi.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep variadik fungsi menggunakan sintaks Rest Parameter (`...args`).
- Mengetahui perbedaan keunggulan Rest Parameter (Array sejati) dibanding objek warisan `arguments` (_array-like_).
- Menguasai perpaduan parameter posisi tetap (_positional parameters_) dengan Rest Parameter.
- Memahami perbedaan fundamental antara _Rest Parameter_ (mengumpulkan data) dan _Spread Operator_ (memecah data).
- Menggunakan Rest Parameter di dalam konteks _Arrow Function_.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Rest Parameter seperti **kantong serbaguna di koper bagasi perjalanan Anda**:
> Koper memiliki 2 slot khusus bernomor untuk paspor dan laptop Anda (**parameter posisi tetap**). Seluruh barang bawaan tambahan lainnya (pakaian, botol, charger, buku) dimasukkan sekaligus ke dalam kantong kain serbaguna yang bisa menampung berapapun jumlah barang sisa (**Rest parameter**).

---

### Tabel Perbandingan Mekanisme Variadik

| Fitur                         | Rest Parameter (`...args`)                        | Objek Warisan `arguments`                 |
| :---------------------------- | :------------------------------------------------ | :---------------------------------------- |
| **Bentuk Tipe Data**          | `Array` asli (`Array.isArray() === true`)         | _Array-like object_                       |
| **Ketersediaan Method Array** | Langsung memiliki `.map()`, `.reduce()`, dll.     | Tidak ada (harus dikonversi manual)       |
| **Dukungan Arrow Function**   | ✅ Didukung penuh                                 | ❌ Tidak tersedia                         |
| **Cakupan Tangkapan**         | Hanya menangkap sisa argumen yang belum ditampung | Selalu menangkap seluruh argumen          |
| **Aturan Penempatan**         | Harus menjadi parameter terakhir                  | Tersedia otomatis di seluruh badan fungsi |

---

### Pembahasan Mendalam Fitur & API

#### 1. Sintaks Rest Parameter (`...args`)

Diawali dengan tiga tanda titik sebelum nama variabel parameter:

```javascript
function kumpulkan(...daftar) {
  return daftar; // Mengembalikan array berisi seluruh argumen
}
kumpulkan("A", "B", "C"); // ['A', 'B', 'C']
```

#### 2. Keunggulan Menghasilkan Instance Array Asli

Karena bertipe array murni, Anda dapat langsung merantai metode manipulasi array tanpa konversi tambahan:

```javascript
function jumlahkan(...angka) {
  return angka.reduce((acc, curr) => acc + curr, 0);
}
```

#### 3. Kombinasi Parameter Posisi Tetap & Rest

Argumen pertama dan kedua ditangkap oleh parameter nama tetap, sedangkan sisanya ditampung oleh rest parameter:

```javascript
function formatPesan(judul, pengirim, ...lampiran) {
  console.log(`Judul: ${judul}`);
  console.log(`Pengirim: ${pengirim}`);
  console.log(`Banyak Lampiran: ${lampiran.length}`);
}
```

#### 4. Aturan Posisi Terakhir & Larangan Multi-Rest

Rest parameter harus berada di akhir deklarasi parameter, dan hanya boleh ada satu rest parameter:

```javascript
// VALID:
function benar(a, b, ...sisa) {}

// INVALID (SyntaxError: Rest parameter must be last formal parameter):
// function salah(...sisa, c) {}
// function dobel(...a, ...b) {}
```

#### 5. Integrasi Rest Parameter dengan Arrow Function

Karena arrow function tidak memiliki objek `arguments`, Rest Parameter adalah satu-satunya cara resmi menangani jumlah argumen dinamis pada arrow function:

```javascript
const cariTerbesar = (...angka) => Math.max(...angka);
```

#### 6. Membedakan Rest Parameter vs Spread Operator

Keduanya menggunakan simbol sintaks yang sama (`...`), namun memiliki tujuan berlawanan:

- **Rest Parameter**: Digunakan pada **deklarasi parameter fungsi** untuk **mengumpulkan** banyak nilai menjadi satu array.
- **Spread Operator**: Digunakan pada **pemanggilan fungsi atau ekspresi array/objek** untuk **memecah** satu koleksi menjadi elemen-elemen terpisah.

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi penggunaan Rest Parameter menghasilkan array asli, kombinasi dengan parameter posisi tetap, implementasi variadik pada arrow function, serta perbandingan fungsional antara Rest Parameter vs Spread Operator telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/07-functions/07-rest-parameters/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Sistem Logger Aplikasi Modular**:
   ```javascript
   function logApp(tingkat, modul, ...pesan) {
     const waktu = new Date().toISOString();
     console.log(`[${waktu}] [${tingkat}] [${modul}]:`, ...pesan);
   }
   logApp("INFO", "Auth", "User 12 logged in", { ip: "127.0.0.1" });
   ```
2. **Fungsi Agregator Statistik**: Menghitung deviasi standar atau nilai rata-rata dari daftar nilai tanpa membatasi jumlah angka yang dimasukkan pengguna.

### ⚠️ Common Pitfalls

- **Menaruh Rest Parameter di Depan Parameter Lain**: Menulis `function cetak(...items, kategori)` yang memicu `SyntaxError`.
- **Salah Memahami Rest vs Spread**: Mengira `...` di saat memanggil fungsi adalah rest parameter, padahal itu adalah operasi _spread_.

### 🌟 Best Practice

- Selalu gunakan Rest Parameter daripada objek warisan `arguments`.
- Berikan nama variabel rest parameter dalam bentuk jamak yang bermakna (misal: `...items`, `...tags`, `...nomor`).

---

## 5. ✍️ Latihan Mandiri

1. Buatlah fungsi `umumkanPemenang(namaLomba, juara1, juara2, ...pesertaLainnya)`. Fungsi mencetak nama lomba, juara 1, juara 2, serta menampilkan jumlah total peserta lain yang belum meraih juara.
2. Buat fungsi arrow satu baris `kalikanSemua(pengali, ...angka)` yang mengalikan setiap elemen di dalam `angka` dengan nilai `pengali` menggunakan `.map()`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [07.6 - Higher-Order Functions](../06-higher-order-functions/README.md)
- ➡️ **Selanjutnya:** [07.8 - Fungsi Rekursif](../08-recursion/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
