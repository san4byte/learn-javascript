# 06.5 - Project Perhitungan Volume Dua Kubus

## Tujuan Belajar
- Menerapkan fungsi matematika ke dalam penyelesaian masalah nyata.
- Memahami konsep refactoring kode agar lebih ringkas dan bersih.

## Penjelasan Konsep
Menghitung total volume dari dua buah kubus dengan panjang sisi masing-masing $a$ dan $b$: $V_{total} = a^3 + b^3$.

## Contoh Kode
```javascript
function volumeKubus(a, b) {
  return a * a * a + b * b * b;
}

console.log(volumeKubus(10, 5));
```

### Output
`1125`
