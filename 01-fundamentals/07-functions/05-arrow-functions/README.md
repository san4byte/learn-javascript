# 07.5 - Arrow Function dan Konteks Keyword This

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Menguasai sintaks ringkas Arrow Function (`=>`).
> * **Kapan Digunakan**: Memahami fitur Implicit Return pada Arrow Function satu baris.
> * **Aturan Praktis**: Gunakan Arrow Function untuk callback anonim pendek pada method array (`map`, `filter`, `reduce`) dan operasi promise.

## 1. 🎯 Tujuan Belajar
- Menguasai sintaks ringkas Arrow Function (`=>`).
- Memahami fitur Implicit Return pada Arrow Function satu baris.
- Memahami perbedaan mutlak keyword `this` antara Regular Function dan Arrow Function.
- Mengetahui kapan harus menggunakan Arrow Function dan kapan TIDAK BOLEH menggunakannya.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Regular function seperti **turis yang menyewa mobil di setiap kota yang disinggahi**: setir mobilnya (*this*) berganti-ganti tergantung siapa yang menyewanya. Arrow function seperti **wisatawan yang selalu membawa sepeda pribadinya sendiri dari rumah**: sepedanya (*this*) selalu sama di manapun ia berada.

**Arrow Function** (diperkenalkan pada ES6) memberikan sintaks penulisan fungsi yang jauh lebih ringkas menggunakan simbol panah (`=>`).

### 1. Perbedaan Sintaks:
* **Implicit Return**: Jika isi badan fungsi hanya terdiri dari satu baris ekspresi, tanda kurung kurawal `{}` dan keyword `return` **dapat dihilangkan**:
  ```javascript
  const kuadrat = x => x * x;
  ```
* Jika parameter hanya ada 1, tanda kurung `()` pada parameter juga opsional.

### 2. Perbedaan Fundamental `this`:
* **Regular Function**: Memiliki konteks `this` sendiri yang ditentukan secara dinamis **berdasarkan bagaimana fungsi tersebut dipanggil**.
* **Arrow Function**: **TIDAK MEMILIKI konteks `this` sendiri**. Arrow Function mewarisi nilai `this` dari lingkup tempat ia dibuat (*Lexical `this`*).

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Perbandingan Sintaks Regular vs Arrow Function ---");
// Regular Function
const kaliRegular = function (a, b) {
  return a * b;
};

// Arrow Function (Multi-line)
const kaliArrow = (a, b) => {
  return a * b;
};

// Arrow Function (Satu Baris / Implicit Return)
const kaliRingkas = (a, b) => a * b;

console.log("Hasil kaliRingkas(5, 4):", kaliRingkas(5, 4));

console.log("\n--- 2. Perilaku Lexical 'this' pada Objek ---");
const kotakPesan = {
  judul: "Pemberitahuan Sistem",
  daftarPenerima: ["Joko", "Budi"],

  kirimNotifikasi: function () {
    // Di dalam regular function ini, 'this' mengacu pada objek kotakPesan
    console.log(`Mengirim: ${this.judul}`);

    // Menggunakan Arrow Function di dalam forEach:
    // Arrow Function mempertahankan 'this' milik kotakPesan!
    this.daftarPenerima.forEach((nama) => {
      console.log(`-> Notifikasi '${this.judul}' terkirim ke ${nama}`);
    });
  }
};

kotakPesan.kirimNotifikasi();
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Perbandingan Sintaks Regular vs Arrow Function ---
Hasil kaliRingkas(5, 4): 20

--- 2. Perilaku Lexical 'this' pada Objek ---
Mengirim: Pemberitahuan Sistem
-> Notifikasi 'Pemberitahuan Sistem' terkirim ke Joko
-> Notifikasi 'Pemberitahuan Sistem' terkirim ke Budi
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **Callback Higher-Order Functions**: Menulis ekspresi callback yang sangat ringkas: `angka.filter(n => n % 2 === 0).map(n => n * 2)`.
2. **Event Listener di Komponen React**: Mencegah hilangnya referensi `this` komponen saat memicu event tanpa perlu `.bind(this)` manual.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Kapan TIDAK BOLEH Menggunakan Arrow Function**:
  1. **Sebagai Method Objek**: Menulis `obj = { nama: 'A', sapa: () => this.nama }` akan menghasilkan `undefined` karena `this` menunjuk ke objek `window/global`.
  2. **Sebagai Constructor Function**: Arrow function tidak memiliki prototype dan tidak bisa dipanggil dengan keyword `new`.
  3. **Event Listener DOM yang Butuh Elemen Pemicu**: Di dalam `btn.addEventListener('click', () => this)`, `this` bukan elemen tombol! Gunakan regular function jika butuh `this === btn`.

### 🌟 Best Practice
* Gunakan Arrow Function untuk callback anonim pendek pada method array (`map`, `filter`, `reduce`) dan operasi promise.
* Gunakan Regular Function untuk method class/objek dan fungsi konstruktor.

---

## 6. ✍️ Latihan Mandiri
1. Ubah fungsi konvensional berikut menjadi arrow function satu baris (*implicit return*):
   ```javascript
   function ubahKeRupiah(angka) {
     return 'Rp ' + angka.toLocaleString('id-ID');
   }
   ```
2. Jelaskan mengapa kode berikut menghasilkan error atau undefined:
   ```javascript
   const mobil = {
     merk: 'Toyota',
     bunyikanKlakson: () => console.log('Mobil ' + this.merk)
   };
   mobil.bunyikanKlakson();
   ```

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [07.4 - Closures dan Lexical Scope](../04-closures/README.md)
- ➡️ **Selanjutnya:** [07.6 - Higher-Order Functions](../06-higher-order-functions/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
