# 03.3 - Pengulangan Bersarang (Nested Loops)

## Tujuan Belajar
- Memahami logika loop di dalam loop.
- Mampu membuat pola karakter (seperti piramida atau segitiga bintang).
- Memahami konsep baris dan kolom.

## Penjelasan Konsep
Pengulangan bersarang adalah konstruksi di mana loop luar mengontrol baris (*outer loop*) dan loop dalam mengontrol kolom (*inner loop*).

## Contoh Kode
```javascript
let s = "";
for (let i = 0; i < 5; i++) {
  for (let b = 0; b <= i; b++) {
    s += "*";
  }
  s += "\n";
}
console.log(s);
```

### Output
```text
*
**
***
****
*****
```
