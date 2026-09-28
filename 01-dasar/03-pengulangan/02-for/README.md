# 03.2 - Pengulangan (For Loop)

## Tujuan Belajar
- Memahami sintaks loop `for` ringkas dengan inisialisasi, kondisi, dan inkremen.
- Mengetahui kapan menggunakan `for` dibanding `while`.

## Penjelasan Konsep
Loop `for` menyatukan tiga elemen pengulangan dalam satu baris deklarasi:
`for (inisialisasi; kondisi terminasi; inkremen/dekremen) { ... }`

## Contoh Kode
```javascript
for (var nilaiAwal = 1; nilaiAwal <= 10; nilaiAwal++) {
  console.log("hello world " + nilaiAwal + "x");
}
```

### Output
```text
hello world 1x
hello world 2x
...
hello world 10x
```
