# 08.1 - Manipulasi Array (Method Mutator & Accessor)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami struktur Array sebagai kumpulan elemen berindeks terurut.
> * **Kapan Digunakan**: Menguasai method mutator: `push()`, `pop()`, `shift()`, `unshift()`, `splice()`.
> * **Aturan Praktis**: Gunakan `push()` dan `pop()` jika butuh performa tercepat ($O(1)$).

## 1. 🎯 Tujuan Belajar
- Memahami struktur Array sebagai kumpulan elemen berindeks terurut.
- Menguasai method mutator: `push()`, `pop()`, `shift()`, `unshift()`, `splice()`.
- Menguasai method accessor: `slice()`, `indexOf()`, `includes()`, `join()`.
- Memahami perbedaan operasi di awal array vs di akhir array.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Array seperti **gerbong kereta api penumpang**: setiap gerbong memiliki nomor urut $(0, 1, 2...)$. Menambah gerbong di belakang (**push**) sangat cepat dan mudah. Sedangkan menambah gerbong di paling depan (**unshift**) memaksa seluruh nomor gerbong di belakangnya harus digeser dan dinomori ulang satu per satu.

**Array** adalah tipe data bertipe objek yang digunakan untuk menyimpan kumpulan elemen nilai secara terurut berdasarkan nomor indeks (dimulai dari `0`).

### Method Utama Manipulasi Array:

| Kategori | Method | Fungsi | Mengubah Array Asli? |
| :--- | :--- | :--- | :--- |
| **Akhir Array** | `push(item)` | Menambah elemen di akhir | Ya (Mutasi) |
| **Akhir Array** | `pop()` | Menghapus elemen terakhir | Ya (Mutasi) |
| **Awal Array** | `unshift(item)` | Menambah elemen di awal | Ya (Mutasi) |
| **Awal Array** | `shift()` | Menghapus elemen pertama | Ya (Mutasi) |
| **Tengah Array** | `splice(start, delCount, ...items)` | Sisip/hapus elemen di tengah | Ya (Mutasi) |
| **Pemotong** | `slice(start, end)` | Mengambil sebagian elemen | **Tidak (Salinan Baru)** |
| **Pencarian** | `includes(item)` | Cek apakah item ada | Tidak |
| **Penggabung** | `join(separator)` | Mengubah array jadi string | Tidak |

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Operasi di Ujung Array (push, pop, shift, unshift) ---");
const antreanKlinik = ["Budi", "Siti"];

// Menambah pasien di akhir antrean
antreanKlinik.push("Joko");
console.log("Setelah push('Joko')     :", antreanKlinik);

// Pasien pertama dipanggil dokter (dihapus dari awal)
const pasienDipanggil = antreanKlinik.shift();
console.log(`Pasien dipanggil dokter  : ${pasienDipanggil}`);
console.log("Sisa antrean             :", antreanKlinik);

console.log("\n--- 2. Operasi Tengah Array: splice() vs slice() ---");
const daftarKota = ["Jakarta", "Bandung", "Surabaya", "Yogyakarta"];

// slice(1, 3): Mengambil elemen dari index 1 sampai sebelum index 3 (tanpa mutasi)
const kotaPilihan = daftarKota.slice(1, 3);
console.log("Hasil slice(1, 3)        :", kotaPilihan);
console.log("Array asli tetap utuh    :", daftarKota);

// splice(2, 1, 'Semarang'): Di index 2, hapus 1 elemen ('Surabaya'), ganti dengan 'Semarang'
daftarKota.splice(2, 1, "Semarang");
console.log("Setelah splice(2, 1, 'Semarang'):", daftarKota);

console.log("\n--- 3. Pencarian & Penggabungan ---");
console.log("Apakah ada 'Bandung'?    :", daftarKota.includes("Bandung"));
console.log("Format Teks Rapi (join)  :", daftarKota.join(" -> "));
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Operasi di Ujung Array (push, pop, shift, unshift) ---
Setelah push('Joko')     : [ 'Budi', 'Siti', 'Joko' ]
Pasien dipanggil dokter  : Budi
Sisa antrean             : [ 'Siti', 'Joko' ]

--- 2. Operasi Tengah Array: splice() vs slice() ---
Hasil slice(1, 3)        : [ 'Bandung', 'Surabaya' ]
Array asli tetap utuh    : [ 'Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta' ]
Setelah splice(2, 1, 'Semarang'): [ 'Jakarta', 'Bandung', 'Semarang', 'Yogyakarta' ]

--- 3. Pencarian & Penggabungan ---
Apakah ada 'Bandung'?    : true
Format Teks Rapi (join)  : Jakarta -> Bandung -> Semarang -> Yogyakarta
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **Manajemen Antrean Tiket / Notifikasi**: Struktur data *Queue* (antrean FIFO: First-In First-Out) diimplementasikan dengan `push()` untuk masuk antrean dan `shift()` saat dilayani.
2. **Breadcrumb Navigasi Halaman Web**: Menggunakan `join(' / ')` untuk menampilkan jalur navigasi `Home / Kategori / Elektronik`.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Tertukar antara `slice()` dan `splice()`**: `slice()` bersifat *immutable* (menghasilkan array baru), sedangkan `splice()` bersifat *mutator* (mengubah isi array aslinya secara permanen).
* **Performa `shift()` pada Array Raksasa**: `shift()` dan `unshift()` memiliki kompleksitas $O(n)$ karena harus menggeser indeks seluruh elemen di belakangnya. Hindari pada array dengan jutaan data.

### 🌟 Best Practice
* Gunakan `push()` dan `pop()` jika butuh performa tercepat ($O(1)$).
* Gunakan `includes()` daripada `indexOf() !== -1` untuk pengecekan keberadaan elemen yang lebih mudah dibaca.

---

## 6. ✍️ Latihan Mandiri
1. Buatlah array `daftarTugas = ['Belajar HTML', 'Belajar CSS']`. Tambahkan `'Belajar JS'` di akhir, dan tambahkan `'Persiapan Laptop'` di paling awal.
2. Hapus tugas paling awal menggunakan `shift()`, lalu cetak daftar tugas saat ini.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [07.9 - Project Volume Kubus](../../07-functions/09-project-cube-volume/README.md)
- ➡️ **Selanjutnya:** [08.2 - Destructuring & Spread Array](../02-destructuring-spread/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
