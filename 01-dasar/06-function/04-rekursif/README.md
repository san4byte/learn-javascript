# 06.4 - Fungsi Rekursif

## Tujuan Belajar
- Memahami konsep fungsi rekursif (fungsi yang memanggil dirinya sendiri).
- Memahami konsep *Base Case* untuk menghentikan rekursi.
- Memahami struktur eksekusi tumpukan memori (*Call Stack*).

## Penjelasan Konsep
Fungsi rekursif adalah alternatif dari perulangan iteratif (`for`/`while`). Struktur wajib fungsi rekursif:
1. **Base Case**: Kondisi penghenti yang mereturn nilai secara langsung tanpa memanggil fungsi lagi.
2. **Recursive Call**: Pemanggilan kembali fungsi tersebut dengan argumen yang nilainya semakin mengecil/mendekati base case.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Fungsi rekursif dengan base case
function tampilAngka(n) {
  if (n === 0) return; // Base case
  console.log(n);
  return tampilAngka(n - 1);
}
tampilAngka(10);

function faktorial(n) {
  if (n === 0) return 1;
  return n * faktorial(n - 1);
}
console.log("Faktorial 5:", faktorial(5));
```

### Output
```text
10
9
8
7
6
5
4
3
2
1
Faktorial 5: 120
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Seperti boneka kayu Rusia (*Matryoshka*): Setiap boneka dibuka, di dalamnya ada boneka serupa yang lebih kecil, sampai akhirnya Anda menemukan boneka terkecil yang padat dan tidak bisa dibuka lagi (Base Case).
- **Kapan Rekursif Sangat Dibutuhkan**:
  Meskipun loop biasa lebih hemat memori untuk perhitungan sederhana, rekursif sangat unggul dan natural saat mengolah struktur data bersarang (*tree*), seperti penelusuran folder file di disk, DOM Tree, atau format JSON bertingkat.
- **Bahaya `RangeError: Maximum call stack size exceeded`**:
  Jika base case tidak pernah tercapai, JavaScript akan terus menumpuk pemanggilan fungsi di dalam memori Call Stack sampai memori habis (*Stack Overflow*).

## Latihan
1. Buat fungsi rekursif `hitungPangkat(angka, pangkat)` yang menghitung nilai eksponen $a^b$ (misal $2^4 = 16$).
2. Buat fungsi rekursif `deretFibonacci(n)`.

## Ringkasan Poin Penting
- Rekursif = fungsi yang memanggil dirinya sendiri.
- Base Case mutlak diperlukan untuk mencegah stack overflow.

---
[⬅️ Materi Sebelumnya: 06.3 - Variable Scope](../03-scope/README.md) | [Materi Selanjutnya: 06.5 - Project Volume Dua Kubus ➡️](../05-project-volume-kubus/README.md)
