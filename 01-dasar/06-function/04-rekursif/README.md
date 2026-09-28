# 06.4 - Fungsi Rekursif

## Tujuan Belajar
- Memahami definisi fungsi rekursif (fungsi yang memanggil dirinya sendiri).
- Memahami pentingnya *base case* agar tidak terjadi *stack overflow*.
- Mengimplementasikan perhitungan matematika rekursif (faktorial).

## Penjelasan Konsep
Fungsi rekursif adalah fungsi yang memanggil dirinya sendiri secara berulang sampai mencapai kondisi akhir yang disebut **Base Case**.

## Contoh Kode
```javascript
function faktorial(n) {
  if (n === 0) return 1; // Base case
  return n * faktorial(n - 1);
}

console.log(faktorial(5));
```

### Output
`120`
