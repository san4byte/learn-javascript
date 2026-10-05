# 04 - Alias (as)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Mengubah nama identifier saat mengekspor atau mengimpor menggunakan kata kunci `as`.
> * **Kapan Digunakan**: Menghindari tabrakan nama (*name collision*) ketika mengimpor dua fungsi bernama sama dari modul berbeda.
> * **Aturan Praktis**: Gunakan sintaks `import { namaAsli as namaBaru } from './modul.js'`.

## 1. 🎯 Tujuan Belajar
- Menggunakan kata kunci `as` untuk memberi nama alias pada proses export maupun import.
- Menghindari konflik penamaan ketika mengimpor dua module yang memiliki nama fungsi serupa.
- Memperjelas makna konteks fungsi pada file pengimpor.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **nama panggilan dua orang bernama Budi di kelas yang sama**: Agar tidak bingung saat memanggil, satu orang dipanggil Budi Programmer dan yang lainnya Budi Desainer (`import { Budi as BudiProgrammer }`).

Kata kunci `as` memberikan fleksibilitas penamaan ulang:
1. **Alias pada Import**: Digunakan saat menerima komponen dari file lain:
   `import { hitungLuas as luasLingkaran } from "./math.js";`
2. **Alias pada Export**: Digunakan saat mengirim komponen agar nama publiknya lebih bersih:
   `export { fungsiInternalLama as formatTanggal };`
3. **Mencegah Tabrakan**: Jika modul `fisika.js` dan `matematika.js` sama-sama memiliki fungsi `hitungKecepatan()`, kita bisa membedakannya menjadi `hitungKecepatanFisika` dan `hitungKecepatanMatematika`.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// math.js
export function hitungLuas(r) {
  return 3.14 * r * r;
}

// example.js
import { hitungLuas as luasLingkaran } from "./math.js";

console.log(`Luas lingkaran: ${luasLingkaran(7)}`);
```

---

## 4. 🖥️ Output yang Diharapkan
```text
Luas lingkaran: 153.86
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
Mengimpor fungsi utilitas render dari dua library berbeda (misal `import { render as renderDOM }` dan `import { render as renderCanvas }`).

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Nama Alias Membingungkan**: Memberi nama alias yang terlalu pendek atau tidak relevan (misal `hitungLuas as hl`) akan membingungkan rekan tim saat membaca kode.
* **Memanggil Nama Asli Setelah Di-alias**: Jika sudah di-alias menjadi `luasLingkaran`, pemanggilan menggunakan `hitungLuas()` akan melempar `ReferenceError`.

### 🌟 Best Practice
* Berikan nama alias yang spesifik dan langsung menjelaskan domain penggunaannya.
* Gunakan alias di tingkat import jika konflik penamaan hanya terjadi di satu file spesifik.

---

## 6. ✍️ Latihan Mandiri
1. Buat file `lingkaran.js` dan `persegi.js`, keduanya mengekspor fungsi dengan nama yang sama: `hitungKeliling()`.
2. Impor kedua fungsi tersebut di `index.js` menggunakan alias `kelilingLingkaran` dan `kelilingPersegi` lalu panggil keduanya.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [03 - Variable dan Class di Module](../03-variables-and-classes/README.md)
- ➡️ **Selanjutnya:** [05 - Export Default](../05-export-default/README.md)
- 🏠 **Daftar Isi Modul 04:** [README Modul 04](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
