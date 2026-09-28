# 06.1 - Function (Pengenalan)

## Tujuan Belajar
- Memahami struktur dasar fungsi di JavaScript.
- Mengetahui peran keyword `function`, parameter, body, dan `return`.

## Penjelasan Konsep
Fungsi adalah blok kode terorganisir yang dapat digunakan kembali (*reusable*). Struktur fungsi terdiri dari keyword `function`, nama fungsi, daftar parameter di dalam tanda kurung `()`, badan fungsi di dalam `{}`, dan nilai kembalian melalui `return`.

## Contoh Kode
```javascript
function tastAritmatika(a, b, c) {
  let hasil = a + b - c;
  return hasil;
}

alert(tastAritmatika(100, 100000000, 10000));
```

### Output
Popup alert menampilkan hasil perhitungan aritmatika.
