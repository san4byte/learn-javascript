# 04.4 - Perulangan Modern: For..of dan For..in

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami perbedaan mutlak antara perulangan `for..of` dan `for..in`.
> * **Kapan Digunakan**: Menggunakan `for..of` untuk mengiterasi nilai dari Iterable (Array, String, arguments).
> * **Aturan Praktis**: Gunakan **`for...of`** untuk Array, Set, Map, dan String.

## 1. 🎯 Tujuan Belajar
- Memahami perbedaan mutlak antara perulangan `for..of` dan `for..in`.
- Menggunakan `for..of` untuk mengiterasi nilai dari Iterable (Array, String, arguments).
- Menggunakan `for..in` untuk mengiterasi nama properti (key) dari sebuah Objek.
- Mampu menggunakan `entries()` pada array untuk mendapatkan index dan nilai sekaligus di `for..of`.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> `for...of` seperti **membuka kotak kado satu per satu dan mengeluarkan mainan di dalamnya** (mengambil isi/nilai). Sedangkan `for...in` seperti **membaca daftar label stiker yang ditempel di luar lemari** (membaca nama kunci/properti).

ES6 memperkenalkan dua sintaks perulangan modern yang sangat bersih dan mudah dibaca:

### Perbedaan Mendasar:
* **`for...of` (UNTUK VALUE DARI ITERABLE)**:
  * Digunakan untuk mengulang **nilai (*value*)** dari objek yang bersifat *Iterable* (seperti `Array`, `String`, `Set`, `Map`, `NodeList`).
  * **TIDAK BISA** digunakan langsung pada objek biasa `{}` (kecuali sudah menerapkan iterator protocol seperti di Modul 05).
* **`for...in` (UNTUK PROPERTY / KEY DARI OBJEK)**:
  * Digunakan untuk mengulang **nama properti (*enumerable keys*)** dari sebuah `Object`.
  * **HINDARI** menggunakan `for...in` pada Array karena urutan index tidak terjamin konsisten.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. for..of pada Array ---");
const bahasaFavorit = ["JavaScript", "TypeScript", "Python"];

for (const bahasa of bahasaFavorit) {
  console.log(`Saya sedang mempelajari: ${bahasa}`);
}

console.log("\n--- 2. for..of dengan entries() untuk mendapatkan Index ---");
for (const [index, bahasa] of bahasaFavorit.entries()) {
  console.log(`Urutan ke-${index + 1}: ${bahasa}`);
}

console.log("\n--- 3. for..of pada String ---");
const kataKunci = "KODE";
for (const huruf of kataKunci) {
  console.log(`Karakter: ${huruf}`);
}

console.log("\n--- 4. for..in pada Objek (Membaca Property & Value) ---");
const profilLaptop = {
  merk: "ThinkPad",
  ramGB: 16,
  ssdGB: 512,
  os: "Ubuntu Linux"
};

for (const properti in profilLaptop) {
  console.log(`- ${properti}: ${profilLaptop[properti]}`);
}
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. for..of pada Array ---
Saya sedang mempelajari: JavaScript
Saya sedang mempelajari: TypeScript
Saya sedang mempelajari: Python

--- 2. for..of dengan entries() untuk mendapatkan Index ---
Urutan ke-1: JavaScript
Urutan ke-2: TypeScript
Urutan ke-3: Python

--- 3. for..of pada String ---
Karakter: K
Karakter: O
Karakter: D
Karakter: E

--- 4. for..in pada Objek (Membaca Property & Value) ---
- merk: ThinkPad
- ramGB: 16
- ssdGB: 512
- os: Ubuntu Linux
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **Iterasi NodeList DOM**: Mengambil seluruh tombol di halaman web menggunakan `document.querySelectorAll('button')` lalu melakukan looping dengan `for (const btn of buttons)`.
2. **Serialisasi Objek Dinamis**: Membaca semua konfigurasi formulir pengguna menggunakan `for (const key in formData)`.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Tertukar antara `of` dan `in`**: Menggunakan `for...in` pada Array akan menghasilkan string index (`"0"`, `"1"`, `"2"`), bukan isi elemennya. Menggunakan `for...of` pada Objek biasa akan melempar `TypeError: obj is not iterable`.
* **Properti Prototype Bocor di `for...in`**: `for...in` akan menelusuri properti hingga ke rantai prototype. Gunakan `Object.hasOwn(obj, prop)` jika hanya ingin properti milik objek itu sendiri.

### 🌟 Best Practice
* Gunakan **`for...of`** untuk Array, Set, Map, dan String.
* Gunakan **`for...in`** khusus untuk Objek JavaScript murni.
* Jika ingin mengulang array beserta indeksnya secara fungsional, pertimbangkan juga `array.forEach((val, i) => {})`.

---

## 6. ✍️ Latihan Mandiri
1. Diberikan array daftar nilai `[80, 95, 70, 85]`. Gunakan `for...of` untuk menghitung nilai total dan rata-ratanya.
2. Diberikan objek `buku = { judul: 'Clean Code', penulis: 'Robert C. Martin', halaman: 464 }`. Gunakan `for...in` untuk mencetak semua informasi buku tersebut.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [04.3 - Pengulangan Bersarang](../03-nested-loops/README.md)
- ➡️ **Selanjutnya:** [05.1 - Pengkondisian If Else](../../05-conditionals/01-if-else/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
