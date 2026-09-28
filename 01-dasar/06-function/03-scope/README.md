# 06.3 - Variable Scope (Lingkup Variabel)

## Tujuan Belajar
- Memahami perbedaan Global Scope dan Local Scope (Function Scope).
- Mengetahui cara kerja *Scope Chain* (pencarian variabel dari dalam ke luar).
- Mencegah polusi variabel global (*global namespace pollution*).

## Penjelasan Konsep
Scope menentukan di mana suatu variabel dapat diakses di dalam kode:
- **Global Scope**: Variabel yang dibuat di luar fungsi apapun. Variabel ini dapat diakses oleh semua baris kode di mana saja.
- **Local / Function Scope**: Variabel yang dibuat di dalam sebuah fungsi menggunakan `let`, `const`, atau `var`. Variabel ini hanya dapat diakses di dalam fungsi tersebut.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Function Scope vs Global Scope
let a = 1;

function tes() {
  let b = 2;
  console.log("Di dalam fungsi, variabel a dapat diakses:", a);
  console.log("Variabel b (lokal):", b);
}

tes();
console.log("Di luar fungsi, variabel a:", a);
```

### Output
```text
Di dalam fungsi, variabel a dapat diakses: 1
Variabel b (lokal): 2
Di luar fungsi, variabel a: 1
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Kaca mobil dengan kaca film satu arah (*tinted glass*):
  - Orang di dalam mobil (fungsi) bisa melihat dengan jelas pemandangan di luar mobil (variabel global).
  - Namun, orang di luar jalanan (kode luar) tidak bisa melihat benda berharga di dalam mobil (variabel lokal fungsi).
- **Name Collision (Tubrukan Nama Variabel)**:
  Jika fungsi memiliki variabel lokal dengan nama yang sama persis dengan variabel global (misal sama-sama bernama `a`), fungsi akan memprioritaskan variabel lokalnya sendiri (*variable shadowing*).

## Latihan
1. Prediksi output dari kode berikut tanpa menjalankannya terlebih dahulu:
   ```javascript
   let x = 10;
   function ubah() {
     let x = 20;
     console.log(x);
   }
   ubah();
   console.log(x);
   ```
2. Apa bahayanya jika kita mendeklarasikan variabel di dalam fungsi tanpa menuliskan keyword `let`/`const`/`var` (misal langsung `nama = "Joko"`)?

## Ringkasan Poin Penting
- Variabel lokal terlindungi di dalam fungsi dan terbebas dari interferensi luar.
- Fungsi selalu mencari variabel dari scope lokalnya terlebih dahulu sebelum naik ke scope global.

---
[⬅️ Materi Sebelumnya: 06.2 - Parameter dan Argumen](../02-parameter-argumen/README.md) | [Materi Selanjutnya: 06.4 - Fungsi Rekursif ➡️](../04-rekursif/README.md)
