# 11 - Operator instanceof

## Tujuan Belajar
- Memahami fungsi operator pembanding **`instanceof`**.
- Mengetahui cara kerja pengecekan rantai pewarisan prototipe (*Prototype Chain*).
- Membedakan penggunaan `typeof` dan `instanceof`.

## Penjelasan Konsep
Operator **`instanceof`** digunakan untuk menguji apakah suatu objek merupakan instansi dari suatu class tertentu atau class induknya:
`objek instanceof NamaClass`
- Mengembalikan nilai boolean: **`true`** jika objek merupakan instansi dari class tersebut (atau turunan dari rantai pewarisannya), dan **`false`** jika bukan.
- `typeof` hanya bisa memberitahu bahwa suatu objek bertipe `"object"`, sedangkan `instanceof` dapat secara presisi membedakan apakah itu instance dari `Manager`, `Employee`, `Array`, atau `Date`.

## Contoh Kode
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

### Output
```text
true
false
true
true
true
```

## Penjelasan Tambahan
- **Penerapan di Proyek Nyata (Polymorphism & Error Handling)**:
  `instanceof` sangat krusial saat menangani error bertingkat (`try...catch`):
  ```javascript
  try {
    // operasi database atau API
  } catch (error) {
    if (error instanceof ValidationError) {
      // beri tahu user input tidak valid
    } else if (error instanceof DatabaseError) {
      // koneksi server database bermasalah
    }
  }
  ```

## Latihan
1. Buat class `Manager extends Employee` dan class `Employee`. Buat fungsi `hitungGaji(karyawan)` yang memeriksa: jika `karyawan instanceof Manager` berikan bonus 10 juta, selain itu berikan 5 juta.

## Ringkasan Poin Penting
- `instanceof` mengecek tipe class dan rantai pewarisan objek.
- Bernilai `true` juga untuk superclass induk dari objek tersebut.

---
[⬅️ Materi Sebelumnya: 10 - Private Method](../10-private-method/README.md) | [Materi Selanjutnya: 12 - Static Field ➡️](../12-static-field/README.md)
