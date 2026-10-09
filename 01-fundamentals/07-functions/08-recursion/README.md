# 07.8 - Fungsi Rekursif (Recursive Function)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menyelesaikan masalah dengan membagi persoalan menjadi sub-masalah identik yang lebih kecil melalui pemanggilan fungsi terhadap dirinya sendiri.
> - **Kapan Digunakan**: Penelusuran struktur data bersarang dengan kedalaman tak terbatas (struktur folder file, kategori multi-level e-commerce, pohon DOM HTML).
> - **Aturan Praktis**: Selalu tulis **Base Case di baris paling pertama** di badan fungsi. Pastikan nilai argumen pada setiap pemanggilan rekursif selalu bergerak mendekati kondisi _Base Case_.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep matematis dan teknis fungsi rekursif (fungsi yang memanggil dirinya sendiri).
- Menguasai 2 komponen wajib rekursi: _Base Case_ (kondisi berhenti) dan _Recursive Step_ (langkah pemanggilan ulang).
- Mampu menyelesaikan masalah faktorial matematis dan penelusuran struktur data bertingkat (_Tree Traversal_).
- Mengetahui batas memori _Call Stack_ mesin JavaScript serta cara mencegah galat _Stack Overflow_.
- Mampu membandingkan kelebihan dan kekurangan pendekatan rekursif versus iterasi loop konvensional.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Fungsi rekursif seperti **boneka kayu bertingkat Rusia (_Matryoshka_)**:
> Ketika Anda membuka boneka terluar berukuran besar, Anda mendapati boneka serupa di dalamnya dengan ukuran lebih kecil. Anda terus membuka boneka demi boneka (**pemanggilan rekursif**) hingga akhirnya Anda menemukan boneka kayu terkecil padat yang tidak dapat dibuka lagi (**Base Case**). Pada titik itulah Anda berhenti membuka dan mulai menyusun kembali semuanya.

---

### Tabel Perbandingan Loop Iteratif vs Fungsi Rekursif

| Parameter                      | Iterasi Loop (`for` / `while`)                  | Fungsi Rekursif                                       |
| :----------------------------- | :---------------------------------------------- | :---------------------------------------------------- |
| **Kondisi Berhenti**           | Kondisi terminasi loop bernilai `false`         | _Base Case_ terpenuhi                                 |
| **Konsumsi Memori**            | Hemat memori (alokasi variabel counter tunggal) | Mengonsumsi _Call Stack Frame_ untuk tiap pemanggilan |
| **Batas Maksimum**             | Dibatasi memori RAM umum                        | Dibatasi kuota _Call Stack Size_ (~10.000 frame)      |
| **Keterbacaan Struktur Pohon** | Sulit & membutuhkan tumpukan stack manual       | Sangat elegan, ringkas, dan alami                     |

---

### Pembahasan Mendalam Fitur & API

#### 1. Anatomi Mutlak Fungsi Rekursif

Sebuah fungsi rekursif wajib memiliki pemisah yang jelas antara kondisi berhenti dan langkah pemanggilan:

```javascript
function rekursif(n) {
  // 1. Base Case
  if (n === 0) return;
  // 2. Logika
  console.log(n);
  // 3. Recursive Step
  rekursif(n - 1);
}
```

#### 2. Peran Krusial Base Case (Kondisi Berhenti)

_Base Case_ adalah instruksi pengaman yang mengembalikan nilai langsung tanpa melakukan pemanggilan fungsi lanjutan. Tanpa base case, fungsi memanggil dirinya sendiri tanpa henti.

#### 3. Langkah Menuju Base Case (_Recursive Step_)

Setiap kali fungsi memanggil dirinya, argumen yang diberikan harus mengalami perubahan (misalnya `n - 1` atau `array.slice(1)`) agar nilainya pasti mencapai kondisi base case pada iterasi ke sekian.

#### 4. Kalkulasi Matematis Faktorial ($n!$)

Rumus faktorial $n! = n \times (n - 1)!$ merupakan contoh rekursi paling murni dalam matematika:

```javascript
function faktorial(n) {
  if (n <= 1) return 1; // 0! dan 1! = 1
  return n * faktorial(n - 1);
}
```

#### 5. Traversal Pohon Data Bersarang (_Tree Traversal_)

Struktur hierarki seperti folder dokumen atau menu navigasi memiliki anak (_children_) yang strukturnya persis seperti induknya:

```javascript
function jelajahFolder(node) {
  console.log(node.nama);
  node.subFolder.forEach(jelajahFolder); // Rekursi alami
}
```

#### 6. Bahaya Call Stack Overflow (`RangeError`)

Setiap pemanggilan fungsi menambahkan satu lembar kerja (_stack frame_) di Call Stack memori komputer. Jika kedalaman rekursi melampaui batas maksimum (sekitar 10.000 panggilan di Node.js/V8), sistem akan melempar error:
`RangeError: Maximum call stack size exceeded`.

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi perulangan hitung mundur berbasis rekursi, kalkulasi nilai faktorial matematika, algoritma _tree traversal_ direktori berkas bersarang, serta simulasi penanganan _Stack Overflow RangeError_ telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/07-functions/08-recursion/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Penjelajahan Pohon Elemen DOM Browser**: Menelusuri seluruh elemen anak `<div class="content">` hingga cucu terdalam:
   ```javascript
   function cariSemuaTautan(elemen) {
     let link = [];
     if (elemen.tagName === "A") link.push(elemen.href);
     for (const anak of elemen.children) {
       link = link.concat(cariSemuaTautan(anak));
     }
     return link;
   }
   ```
2. **Kloning Mendalam Objek Bersarang (_Deep Clone_)**: Menyalin seluruh nilai properti objek yang memiliki objek di dalamnya tanpa mempertahankan referensi memori lama.

### ⚠️ Common Pitfalls

- **Lupa Menuliskan Kata Kunci `return` pada Panggilan Rekursif**: Menulis `faktorial(n - 1)` alih-alih `return n * faktorial(n - 1)` akan menyebabkan hasil akhir bernilai `undefined`.
- **Argumen Tidak Mengecil**: Menulis `rekursif(n)` bukannya `rekursif(n - 1)` yang memicu loop abadi dan crash.

### 🌟 Best Practice

- Selalu posisikan pemeriksaan _Base Case_ di baris pertama badan fungsi.
- Jika masalah dapat diselesaikan dengan mudah menggunakan loop `for` sederhana (seperti hitung mundur atau penjumlahan biasa), gunakan loop untuk menghemat memori Call Stack.
- Gunakan rekursi terutama saat berurusan dengan struktur data bercabang (_Tree_, _Graph_, atau JSON bersarang acak).

---

## 5. ✍️ Latihan Mandiri

1. Buatlah fungsi rekursif `hitungPangkat(basis, eksponen)` yang menghitung hasil bilangan berpangkat, misal `hitungPangkat(2, 4)` menghasilkan 16 ($2^4 = 2 \times 2 \times 2 \times 2$). Base case: jika eksponen === 0, return 1.
2. Buatlah fungsi rekursif `jumlahkanRentang(n)` yang menjumlahkan angka dari 1 sampai n (contoh: jika $n = 4$, hasilnya adalah $4 + 3 + 2 + 1 = 10$).

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [07.7 - Rest Parameter](../07-rest-parameters/README.md)
- ➡️ **Selanjutnya:** [07.9 - Project Volume Kubus](../09-project-cube-volume/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
