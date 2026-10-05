# 11 - Operator instanceof

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memeriksa apakah suatu objek merupakan turunan atau instance dari suatu class atau constructor.
> * **Kapan Digunakan**: Melakukan validasi tipe data objek saat runtime atau error handling bertingkat.
> * **Aturan Praktis**: Gunakan sintaks infix: `objek instanceof NamaClass` (menghasilkan nilai boolean `true` atau `false`).

## 1. 🎯 Tujuan Belajar
- Memahami fungsi operator pembanding **`instanceof`**.
- Mengetahui cara kerja pengecekan rantai pewarisan prototipe (*Prototype Chain*).
- Membedakan penggunaan `typeof` dan `instanceof`.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **pemeriksaan kartu identitas / paspor di imigrasi**: Petugas memeriksa apakah pelancong memiliki paspor resmi suatu negara (`orang instanceof WNI`) sebelum mengarahkannya ke gerbang otomatis warga negara.

Operator **`instanceof`** digunakan untuk menguji apakah suatu objek merupakan instansi dari suatu class tertentu atau class induknya:
`objek instanceof NamaClass`
- Mengembalikan nilai boolean: **`true`** jika objek merupakan instansi dari class tersebut (atau turunan dari rantai pewarisannya), dan **`false`** jika bukan.
- `typeof` hanya bisa memberitahu bahwa suatu objek bertipe `"object"`, sedangkan `instanceof` dapat secara presisi membedakan apakah itu instance dari `Manager`, `Employee`, `Array`, atau `Date`.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Operator instanceof untuk menguji tipe objek dan rantai pewarisan

class Satu {}

class Dua extends Satu {}

const joko = new Satu();
const widodo = new Dua();

console.info(joko instanceof Satu); // true
console.info(joko instanceof Dua);  // false

console.info(widodo instanceof Satu); // true
console.info(widodo instanceof Dua);  // true
console.info(widodo instanceof Object); // true
```

---

## 4. 🖥️ Output yang Diharapkan
```text
true
false
true
true
true
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
Menangani error bertingkat di blok `catch` (`if (err instanceof ValidationError) ... else if (err instanceof NetworkError) ...`).

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Memeriksa Prototype Chain Penuh**: Jika `Manager extends Employee`, maka `bos instanceof Employee` juga bernilai `true` karena rantai prototipenya terhubung.
* **Tidak Bekerja pada Primitive**: Operator ini tidak bekerja pada tipe data primitif biasa seperti `'halo' instanceof String` (hasilnya `false`).

### 🌟 Best Practice
* Gunakan `instanceof` untuk percabangan error handling berbasis custom class.
* Waspadai penggunaan lintas frame/iframe karena prototype constructor bisa berbeda.

---

## 6. ✍️ Latihan Mandiri
1. Buat class `Manager extends Employee` dan class `Employee`. Buat fungsi `hitungGaji(karyawan)` yang memeriksa: jika `karyawan instanceof Manager` berikan bonus 10 juta, selain itu berikan 5 juta.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [10 - Private Method](../10-private-method/README.md)
- ➡️ **Selanjutnya:** [12 - Static Field](../12-static-field/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
