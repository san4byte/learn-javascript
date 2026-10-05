# 01 - Tanpa Module (Global Scope Collision)

## Tujuan Belajar
- Mengetahui masalah tabrakan variabel (*name collision*) ketika tidak menggunakan JavaScript Modules.
- Memahami mengapa JavaScript modern membutuhkan sistem module native.

## Penjelasan Konsep
Sebelum ES6 Modules diperkenalkan, memuat beberapa file JavaScript di HTML menggunakan tag `<script>` biasa akan menempatkan seluruh variabel dan fungsi ke dalam satu ruang lingkup global (`window`). 
Jika dua file berbeda mendeklarasikan variabel dengan nama yang sama (`var name`), file yang dimuat belakangan akan menimpa file sebelumnya tanpa memunculkan peringatan error.

## Contoh Kode
File `first.js`:
```javascript
var name = "Joko";
function sayHello() { console.log(name); }
```

File `second.js`:
```javascript
var name = "Budi"; // Menimpa name milik first.js
sayHello(); // Output: "Budi"
```

## Ringkasan Poin Penting
- Script biasa tanpa `type="module"` bersifat global.
- Sangat rentan bug tabrakan nama (*global scope pollution*) pada aplikasi berskala besar.

---
[Materi Selanjutnya: 02 - Export dan Import ➡️](../02-export-and-import/README.md)
