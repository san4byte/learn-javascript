# 02 - Variabel dan Scope (var, let, const)

## Tujuan Belajar
- Memahami perbedaan fundamental antara deklarasi `var`, `let`, dan `const`.
- Memahami fenomena *Hoisting* di JavaScript.
- Memahami perbedaan *Function Scope* dan *Block Scope*.
- Mengetahui sifat mutabilitas pada `const` untuk tipe data referensi (Array dan Objek).

## Penjelasan Konsep
- **`var` (Legacy ES5)**:
  - Menganut *Function Scope* (variabel di dalam for loop atau if statement tetap bisa bocor dan diakses di luar blok).
  - Mengalami *Hoisting* secara penuh: variabel dapat dipanggil sebelum dideklarasikan dan menghasilkan nilai `undefined`.
- **`let` (Modern ES6)**:
  - Menganut *Block Scope* (hanya hidup di dalam kurung kurawal `{}` tempat ia dideklarasikan).
  - Dapat di-reassign (diubah nilainya).
  - Memiliki *Temporal Dead Zone (TDZ)*: memanggil sebelum deklarasi akan menghasilkan `ReferenceError`.
- **`const` (Modern ES6)**:
  - Menganut *Block Scope*.
  - Tidak dapat di-reassign ke nilai baru (`TypeError: Assignment to constant variable`).
  - **Penting**: Properti di dalam objek atau elemen di dalam array yang dideklarasikan dengan `const` tetap dapat dimutasi/diubah, karena referensi memorinya yang konstan, bukan isinya.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Demonstrasi variabel: var (hoisting & function scope), let & const (block scope)

console.log("--- Hoisting dengan var ---");
console.log(i); // undefined
var i = 10;

console.log("--- Block scope let ---");
for (let j = 0; j < 5; j++) {
  console.log("Nilai j:", j);
}

console.log("--- Mutasi Objek dan Array dengan const ---");
const mhs = {
  nama: "joko santoso",
  umur: 20,
};
mhs.umur = 30; // Properti dapat diubah
console.log(mhs);

const angka = [1, 2, 3];
angka.push(4); // Elemen dapat ditambah
console.log(angka);
```

### Output
```text
--- Hoisting dengan var ---
undefined
--- Block scope let ---
Nilai j: 0
Nilai j: 1
Nilai j: 2
Nilai j: 3
Nilai j: 4
--- Mutasi Objek dan Array dengan const ---
{ nama: 'joko santoso', umur: 30 }
[ 1, 2, 3, 4 ]
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  - `var` seperti pengumuman speaker di gedung: suaranya terdengar ke seluruh lantai/ruangan terdekat (mudah bocor).
  - `let` seperti papan tulis di dalam satu ruang rapat tertutup: apa yang ditulis di ruangan itu hanya diketahui di dalam ruangan itu saja.
  - `const` seperti kotak kaca berkunci: Anda tidak bisa menukar kotaknya dengan kotak lain, tapi Anda masih bisa merapikan atau mengubah susunan barang di dalam kotak tersebut.
- **Tabel Perbandingan**:
  | Fitur | `var` | `let` | `const` |
  |---|---|---|---|
  | Scope | Function Scope | Block Scope | Block Scope |
  | Reassign | Ya | Ya | Tidak |
  | Redeclare | Ya (berbahaya) | Tidak | Tidak |
  | Hoisting | Inisialisasi `undefined` | TDZ (ReferenceError) | TDZ (ReferenceError) |
- **Best Practice JavaScript Modern**:
  Gunakan aturan emas: **Gunakan `const` secara default**. Jika nilai variabel tersebut memang harus berubah di kemudian hari (misal counter loop), gunakan `let`. **Hindari penggunaan `var`** pada proyek baru untuk mencegah bug *variable leaking* dan *accidental redeclaration*.

## Latihan
1. Apa output dari kode berikut jika dijalankan? Jelaskan alasannya:
   ```javascript
   for (var x = 0; x < 3; x++) {}
   console.log(x);
   ```
2. Mengapa baris kedua dari kode berikut menghasilkan error, sementara baris ketiga berhasil?
   ```javascript
   const user = { name: "Budi" };
   user = { name: "Andi" }; // Error?
   user.name = "Andi";     // Berhasil?
   ```

## Ringkasan Poin Penting
- Jangan gunakan `var` di JavaScript modern.
- Gunakan `const` untuk nilai tetap, objek, array, dan fungsi.
- Gunakan `let` hanya jika variabel nilainya perlu di-reassign.
- Block scope menjaga variabel tetap terisolasi dan aman.

---
[⬅️ Materi Sebelumnya: 01 - Popup Box](../01-popup-box/README.md) | [Materi Selanjutnya: 03.1 - Pengulangan While ➡️](../03-pengulangan/01-while/README.md)
