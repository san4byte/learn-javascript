# 07.8 - Fungsi Rekursif (Recursive Function)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memahami konsep fungsi rekursif (fungsi yang memanggil dirinya sendiri).
> - **Kapan Digunakan**: Memahami komponen wajib Base Case untuk menghentikan rekursi.
> - **Aturan Praktis**: Selalu tuliskan kondisi **Base Case di baris paling pertama** di dalam fungsi rekursif.

## 1. 🎯 Tujuan Belajar

- Memahami konsep fungsi rekursif (fungsi yang memanggil dirinya sendiri).
- Memahami komponen wajib Base Case untuk menghentikan rekursi.
- Mampu menyelesaikan masalah faktorial dan penelusuran struktur data bersarang.
- Memahami bahaya Maximum Call Stack Size Exceeded (Stack Overflow).

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> Fungsi rekursif seperti **boneka kayu bertingkat Rusia (_Matryoshka_)**: Saat Anda membuka boneka terluar, Anda menemukan boneka serupa di dalamnya yang lebih kecil. Anda terus membukanya sampai menemukan boneka terkecil padat yang tidak bisa dibuka lagi (Base Case).

**Fungsi Rekursif** adalah fungsi yang **memanggil dirinya sendiri** di dalam tubuh fungsinya hingga mencapai kondisi berhenti tertentu.

### 2 Komponen Wajib Fungsi Rekursif:

1. **Base Case (Kondisi Berhenti)**: Kondisi yang menyebabkan fungsi berhenti memanggil dirinya sendiri dan mulai mengembalikan nilai. Tanpa base case, fungsi akan memanggil dirinya selamanya.
2. **Recursive Call**: Pemanggilan diri sendiri dengan nilai argumen yang semakin mengecil / mendekati kondisi base case.

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Rekursi Hitung Mundur Sederhana ---');
function hitungMundur(n) {
  // Base case: berhenti saat n mencapai 0
  if (n === 0) {
    console.log('Selesai!');
    return;
  }

  console.log(`Detik: ${n}`);
  hitungMundur(n - 1); // Pemanggilan rekursif dengan nilai yang mengecil
}

hitungMundur(3);

console.log('\n--- 2. Menghitung Nilai Faktorial (n!) ---');
// Contoh: 5! = 5 * 4 * 3 * 2 * 1 = 120
function faktorial(n) {
  if (n <= 1) return 1; // Base case: 1! = 1
  return n * faktorial(n - 1);
}

console.log('5! =', faktorial(5));
console.log('4! =', faktorial(4));

console.log(
  '\n--- 3. Studi Kasus Nyata: Menelusuri Kategori Bersarang (Tree/Folder) ---'
);
const strukturFolder = {
  nama: 'Root',
  subFolder: [
    { nama: 'Dokumen', subFolder: [{ nama: 'Surat.docx', subFolder: [] }] },
    { nama: 'Gambar', subFolder: [{ nama: 'Foto.jpg', subFolder: [] }] },
  ],
};

function cetakPohonFolder(folder, level = 0) {
  const indentasi = '  '.repeat(level);
  console.log(`${indentasi}📁 ${folder.nama}`);

  for (const anak of folder.subFolder) {
    cetakPohonFolder(anak, level + 1); // Rekursi menelusuri sub-folder sedalam apapun
  }
}

cetakPohonFolder(strukturFolder);
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Rekursi Hitung Mundur Sederhana ---
Detik: 3
Detik: 2
Detik: 1
Selesai!

--- 2. Menghitung Nilai Faktorial (n!) ---
5! = 120
4! = 24

--- 3. Studi Kasus Nyata: Menelusuri Kategori Bersarang (Tree/Folder) ---
📁 Root
  📁 Dokumen
    📁 Surat.docx
  📁 Gambar
    📁 Foto.jpg
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Navigasi Struktur File & Direktori**: Membaca folder di dalam komputer yang kedalamannya tidak menentu.
2. **Kategori E-Commerce Bertingkat**: Menampilkan menu 'Elektronik -> Komputer -> Komponen -> RAM' yang memiliki level kedalaman tak terbatas.
3. **Penelusuran Elemen DOM (DOM Traversal)**: Menjelajahi tag HTML induk beserta seluruh anak cucunya (_descendants_).

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Stack Overflow (RangeError: Maximum call stack size exceeded)**: Terjadi jika Anda lupa menuliskan base case atau kondisi pemanggilan rekursif tidak pernah mendekati base case, sehingga memori Call Stack penuh terisi.

### 🌟 Best Practice

- Selalu tuliskan kondisi **Base Case di baris paling pertama** di dalam fungsi rekursif.
- Untuk operasi perulangan aritmatika sederhana, utamakan loop biasa (`for`/`while`) karena lebih hemat memori Call Stack dibandingkan rekursi.

---

## 6. ✍️ Latihan Mandiri

1. Buatlah fungsi rekursif `hitungPangkat(angka, pangkat)` untuk menghitung $2^4 = 16$. (Base case: jika pangkat === 0, return 1).
2. Buatlah fungsi rekursif `jumlahkanRentang(n)` yang menjumlahkan seluruh angka dari 1 sampai n (contoh jika $n = 4$, hasilnya $1 + 2 + 3 + 4 = 10$).

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [07.7 - Rest Parameter](../07-rest-parameters/README.md)
- ➡️ **Selanjutnya:** [07.9 - Project Volume Kubus](../09-project-cube-volume/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
