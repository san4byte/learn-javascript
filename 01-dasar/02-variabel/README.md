# 02 - Variabel dan Scope (var, let, const)

## Tujuan Belajar
- Memahami perbedaan deklarasi variabel menggunakan `var`, `let`, dan `const`.
- Memahami konsep hoisting pada JavaScript.
- Mengetahui perbedaan function scope dan block scope.

## Penjelasan Konsep
- **Hoisting**: Pada `var`, deklarasi variabel dinaikkan ke atas scope saat runtime, sehingga jika dipanggil sebelum dideklarasikan nilainya adalah `undefined` bukan error.
- **Function Scope vs Block Scope**: `var` menganut function scope (hanya terisolasi di dalam fungsi). Sebaliknya, `let` dan `const` menganut block scope (terisolasi di dalam blok kurung kurawal `{}` seperti if atau for loop).
- **`const`**: Nilai referensinya tidak dapat di-reassign, namun properti objek atau elemen array di dalamnya tetap dapat dimutasi.

## Contoh Kode
```javascript
// Hoisting pada var
console.log(i); // undefined
var i = 10;

// Block scope pada let
for (let j = 0; j < 5; j++) {
  console.log("Nilai j:", j);
}

// const
const mhs = {
  nama: "joko santoso",
  umur: 20,
};
mhs.umur = 30; // Properti dapat diubah
console.log(mhs);
```

### Output
```text
undefined
Nilai j: 0 ... 4
{ nama: 'joko santoso', umur: 30 }
```
