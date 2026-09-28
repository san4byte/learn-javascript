# 06.3 - Variable Scope

## Tujuan Belajar
- Memahami perbedaan global scope dan local scope.
- Mengetahui bagaimana pencarian variabel (*scope chain*) bekerja.

## Penjelasan Konsep
JavaScript menggunakan konsep *lexical scope* berdasarkan fungsi. Variabel yang dideklarasikan di dalam fungsi adalah lokal, tidak bisa diakses dari luar. Namun, fungsi dapat mengakses variabel di luar cakupannya (global scope).
Analogi: Seperti kaca mobil satu arah — orang di dalam mobil bisa melihat ke luar, tetapi orang di luar tidak bisa melihat ke dalam.

## Contoh Kode
```javascript
let a = 1; // Global

function tes() {
  let b = 2; // Local
  console.log("Di dalam fungsi a:", a);
  console.log("Di dalam fungsi b:", b);
}

tes();
console.log("Di luar fungsi a:", a);
```

### Output
```text
Di dalam fungsi a: 1
Di dalam fungsi b: 2
Di luar fungsi a: 1
```
