# 08.1 - Dasar Object

## Tujuan Belajar
- Memahami konsep pasangan key-value pada objek JavaScript.
- Menggabungkan properti dan method di dalam sebuah objek.

## Penjelasan Konsep
Objek adalah kumpulan nilai yang tidak berurutan, disimpan dalam format properti (nama: nilai) dan method (fungsi di dalam objek).

## Contoh Kode
```javascript
let mahasiswa = {
  nama: "joko",
  lulus: true,
  ipSemester: [2.9, 3.1, 1.25, 2.88, 3.04],
  ipKumulatif: function () {
    let total = 0;
    for (let i = 0; i < this.ipSemester.length; i++) {
      total += this.ipSemester[i];
    }
    return total / this.ipSemester.length;
  },
};

console.log(mahasiswa.ipKumulatif());
```

### Output
`2.654`
