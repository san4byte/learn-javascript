# 13 - Static Method

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Membuat method yang dapat dipanggil langsung dari class tanpa perlu membuat objek baru dengan `new`.
> * **Kapan Digunakan**: Membuat fungsi utilitas pembantu (*helper*) yang tidak memerlukan data dari instance objek.
> * **Aturan Praktis**: Tambahkan kata kunci `static` di depan nama method: `static hitungTotal(...)`.

## 1. 🎯 Tujuan Belajar
- Memahami konsep **Static Method** pada JavaScript Class.
- Membuat fungsi-fungsi utilitas (*helper/utility functions*) yang terorganisir di dalam class.
- Memahami mengapa method statis tidak membutuhkan instansiasi objek (`new`).

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **pisau lipat swiss army atau kalkulator saku**: Anda tidak perlu membangun satu rumah atau memesan pabrik utuh hanya untuk meminjam gunting kecil. Fungsi utilitas matematika seperti `Math.floor()` atau `Number.parseInt()` bisa langsung dipakai kapan saja.

Method statis adalah fungsi yang didefinisikan di dalam class menggunakan kata kunci **`static`**:
1. Method ini tidak membutuhkan state internal dari instance objek.
2. Tidak dapat mengakses `this` milik instance objek (di dalam static method, `this` merujuk ke Class itu sendiri).
3. Sangat cocok dijadikan sebagai kumpulan fungsi utilitas murni (*pure helper functions*).
4. Contoh bawaan JavaScript: `Math.floor()`, `Math.random()`, `Array.from()`, `Object.keys()`.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Static Method (Fungsi utility pembantu yang dipanggil langsung dari Class tanpa 'new')

class MathUtils {
  static sum(...numbers) {
    let total = 0;
    for (const number of numbers) {
      total += number;
    }
    return total;
  }

  static multiply(a, b) {
    return a * b;
  }
}

const total = MathUtils.sum(1, 2, 3, 4, 5);
console.info('Hasil MathUtils.sum:', total);
```

---

## 4. 🖥️ Output yang Diharapkan
```text
Hasil MathUtils.sum: 15
Hasil MathUtils.multiply: 50
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
Fungsi utility matematika, parser format data seperti `Date.now()`, atau *factory method* seperti `User.createFromJSON(str)`.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Tidak Bisa Mengakses Properti Instance**: Kata kunci `this` di dalam static method merujuk pada Class itu sendiri, bukan pada objek instance, sehingga tidak bisa mengakses `this.nama` instance.
* **Memanggil dari Instance**: Memanggil `user.staticMethod()` akan error `is not a function`.

### 🌟 Best Practice
* Jadikan suatu fungsi sebagai `static` jika logika komputasinya murni dan tidak bergantung pada state individual objek.
* Menghemat alokasi memori karena tidak perlu membuat instance baru.

---

## 6. ✍️ Latihan Mandiri
1. Buat class `DateFormatter` dengan static method `formatIndonesia(date)` yang mengembalikan string tanggal berformat `"DD Bulan YYYY"`.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [12 - Static Field](../12-static-field/README.md)
- ➡️ **Selanjutnya:** [14 - Error Handling Class](../14-error-handling-class/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
