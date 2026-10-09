# 04.3 - Pengulangan Bersarang (Nested Loops)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menjalankan struktur perulangan di dalam badan perulangan lainnya untuk mengolah data multi-dimensi (koordinat baris dan kolom) atau pola geometris.
> - **Kapan Digunakan**: Pengolahan array 2 dimensi (matriks tabel, kisi pixel grafis), perbandingan kombinasi elemen data, serta rendering tata letak grid.
> - **Aturan Praktis**: Hindari nesting loop lebih dari 2 tingkat karena meningkatkan kompleksitas waktu secara eksponensial ($O(n^2)$ atau lebih buruk). Gunakan _labelled statements_ (`label: for`) saat ingin menghentikan _outer loop_ dari dalam _inner loop_.

---

## 1. 🎯 Tujuan Belajar

- Memahami alur eksekusi sekuensial antara loop terluar (_outer loop_) dan loop terdalam (_inner loop_).
- Mampu membuat pola cetak teks visual berbasis baris dan kolom (pola grid dan segitiga).
- Menguasai teknik penelusuran (_traversal_) dan manipulasi struktur array dua dimensi (matriks).
- Menguasai sintaks _Labelled Statements_ untuk melakukan `break` atau `continue` langsung ke loop terluar.
- Menyadari beban performa kompleksitas waktu kuadratik ($O(n^2)$) serta strategi pencegahannya.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Nested loop seperti **jarum jam dinding mekanik**: Jarum jam panjang (menit / _inner loop_) harus berputar penuh sebanyak 60 kali putaran sebelum jarum pendek (jam / _outer loop_) bergeser 1 angka. Setiap kali jarum pendek melangkah satu tingkat, jarum panjang harus mengulang kembali siklus penuhnya dari awal.

---

### Tabel Representasi Konsep Grid Koordinat

| Loop           | Peran dalam Grid                       | Variabel Konvensi | Perilaku Eksekusi                                       |
| :------------- | :------------------------------------- | :---------------- | :------------------------------------------------------ |
| **Outer Loop** | Pengendali **Baris** (_Rows / Y-axis_) | `r`, `i`, `row`   | Berjalan 1 langkah, menunggu _inner loop_ tuntas.       |
| **Inner Loop** | Pengendali **Kolom** (_Cols / X-axis_) | `c`, `j`, `col`   | Menyelesaikan seluruh siklusnya untuk tiap baris aktif. |

---

### Pembahasan Mendalam Fitur & API

#### 1. Mekanisme Kerja Perulangan Bersarang

Jika perulangan luar berjalan sebanyak $M$ kali dan perulangan dalam berjalan sebanyak $N$ kali, maka baris instruksi di dalam badan perulangan dalam akan dieksekusi sebanyak $M \times N$ kali.

```javascript
for (let i = 1; i <= 2; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(`Baris ${i}, Kolom ${j}`); // Dieksekusi 2 x 3 = 6 kali
  }
}
```

#### 2. Pola Grid Persegi (Baris x Kolom)

Membuat bentuk bidang dua dimensi dengan mencetak karakter berulang pada sumbu horizontal sebelum berpindah ke baris baru:

```javascript
for (let r = 0; r < 3; r++) {
  let baris = "";
  for (let c = 0; c < 4; c++) {
    baris += "# ";
  }
  console.log(baris);
}
```

#### 3. Pola Geometri Segitiga Dinamis

Dengan mengaitkan kondisi terminasi inner loop terhadap nilai counter outer loop (`j <= i`), panjang kolom akan bertambah secara bertahap pada setiap baris:

```javascript
for (let i = 1; i <= 3; i++) {
  let baris = "";
  for (let j = 1; j <= i; j++) {
    baris += "*";
  }
  console.log(baris); // *, **, ***
}
```

#### 4. Traversal Struktur Data Dua Dimensi (Matriks 2D)

Array dua dimensi direpresentasikan sebagai array yang berisi array anak. Akses elemen dilakukan dengan dua kurung siku `matriks[indeksBaris][indeksKolom]`:

```javascript
const matriks = [
  [1, 2],
  [3, 4],
];
for (let r = 0; r < matriks.length; r++) {
  for (let c = 0; c < matriks[r].length; c++) {
    console.log(matriks[r][c]);
  }
}
```

#### 5. Labelled Statements: Menghentikan Loop Luar Seketika

Secara default, kata kunci `break` hanya menghentikan loop terdalam tempat ia berada. Memberi tanda label nama (`namaLabel:`) memungkinkan Anda menghentikan perulangan luar secara langsung:

```javascript
cariData: for (let r = 0; r < 5; r++) {
  for (let c = 0; c < 5; c++) {
    if (r === 2 && c === 2) {
      console.log("Target ditemukan, hentikan semua loop!");
      break cariData; // Menghentikan langsung loop berlabel cariData
    }
  }
}
```

#### 6. Analisis Kompleksitas Waktu $O(n^2)$ & Mitigasi

Jika array berukuran $n = 1.000$, nested loop memerlukan $1.000.000$ operasi. Jika $n = 100.000$, jumlah operasinya melonjak menjadi $10.000.000.000$ operasi. Gunakan struktur data hash table (`Map` atau `Set`) untuk mengubah kompleksitas $O(n^2)$ menjadi linear $O(n)$.

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi pembuatan grid kotak, pembentukan segitiga siku-siku bintang, traversal pembacaan matriks 2 dimensi, serta pemanfaatan _labelled statements_ untuk menghentikan nested loop terluar telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/04-loops/03-nested-loops/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Pengolahan Pixel Gambar Grafis (Canvas 2D)**: Membaca dan mengubah komponen warna RGBA setiap pixel berdasarkan koordinat $(X, Y)$ dari gambar:
   ```javascript
   for (let y = 0; y < imageHeight; y++) {
     for (let x = 0; x < imageWidth; x++) {
       // Proses setiap piksel gambar
     }
   }
   ```
2. **Papan Permainan Catur / Grid Game**: Menentukan validitas langkah pion berdasarkan posisi baris (1-8) dan kolom (A-H).

### ⚠️ Common Pitfalls

- **Menggunakan Nama Variabel Counter yang Sama**: Menulis `let i` di loop luar dan tidak sengaja mendeklarasikan `let i` lagi di loop dalam (atau lupa kata kunci `let` sehingga menimpa `i` global) menyebabkan tabrakan nilai dan loop tak berujung. Selalu bedakan (`i`, `j` atau `row`, `col`).
- **Meletakkan Operasi Berat di Loop Terdalam**: Meletakkan kueri database atau panggilan API HTTP di dalam inner loop akan mengakibatkan jutaan request simultan yang melumpuhkan server.

### 🌟 Best Practice

- Batasi kedalaman nesting loop maksimal 2 tingkat. Jika memerlukan tingkat ke-3 atau ke-4, pecah menjadi pemanggilan fungsi terpisah untuk menjaga keterbacaan kode (_refactoring to functions_).
- Selalu pertimbangkan metode `Set.has()` atau `Map.get()` untuk perbandingan kecocokan data daripada melakukan perbandingan dua array bersarang.

---

## 5. ✍️ Latihan Mandiri

1. Buatlah pola segitiga siku-siku terbalik menggunakan nested loop (mulai dari 5 bintang di baris pertama hingga 1 bintang di baris terakhir).
2. Diberikan matriks 3x3 angka acak. Hitunglah total penjumlahan nilai diagonal utama matriks (elemen di koordinat `[0][0]`, `[1][1]`, dan `[2][2]`).

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [04.2 - Pengulangan For](../02-for/README.md)
- ➡️ **Selanjutnya:** [04.4 - For..of dan For..in](../04-for-of-for-in/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
