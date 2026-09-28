# 06.2 - Parameter dan Argumen

## Tujuan Belajar
- Memahami perbedaan konseptual antara parameter dan argumen.
- Mengetahui cara menangani jumlah argumen yang dinamis menggunakan objek bawaan `arguments`.
- Memahami fleksibilitas parameter pada fungsi JavaScript.

## Penjelasan Konsep
- **Parameter**: Variabel penampung yang dituliskan di dalam tanda kurung saat fungsi **dideklarasikan**.
- **Argumen**: Nilai konkret yang dimasukkan ke dalam kurung saat fungsi **dipanggil**.
- **Objek `arguments`**: Objek semu (*array-like*) bawaan JavaScript di dalam fungsi standar yang menampung seluruh nilai argumen yang dikirimkan, memungkinkan kita membuat fungsi yang dapat menerima argumen dalam jumlah tak terbatas.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Parameter, argumen, dan arguments object semu
function tambah1(a, b, c) {
  return a + b * c;
}
console.log(tambah1(10, 10, 10));

function tambah3() {
  let hasil = 0;
  for (let i = 0; i < arguments.length; i++) {
    hasil += arguments[i];
  }
  return hasil;
}
console.log(tambah3(1, 3, 5, 10, 82, 28));
```

### Output
```text
110
129
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  - Parameter adalah kotak kosong berlabel (misal slot baterai berlabel "baterai AA").
  - Argumen adalah baterai fisik bermerek yang Anda pasang ke dalam slot tersebut.
- **Fleksibilitas JavaScript**:
  Jika Anda memanggil fungsi dengan argumen lebih sedikit daripada parameternya, parameter yang tidak terisi akan bernilai `undefined` (tidak langsung melempar error).
- **Catatan Modern ES6**:
  Objek `arguments` adalah cara klasik ES5. Pada JavaScript modern, kita lebih disarankan menggunakan **Rest Parameter (`...args`)** yang merupakan array sejati (dipelajari di materi Javascript Lanjutan).

## Latihan
1. Buat fungsi `kalikanSemua()` yang mengalikan semua angka yang dikirimkan ke dalam fungsi berapapun jumlah argumennya menggunakan objek `arguments`.
2. Apa yang terjadi jika fungsi `tambah(a, b)` dipanggil dengan hanya satu argumen `tambah(5)`? Tuliskan hasilnya.

## Ringkasan Poin Penting
- Parameter didefinisikan saat membuat fungsi; argumen dikirim saat pemanggilan.
- `arguments` adalah objek bawaan untuk mengakses argumen variabel tak terbatas.

---
[⬅️ Materi Sebelumnya: 06.1 - Function Intro](../01-intro/README.md) | [Materi Selanjutnya: 06.3 - Variable Scope ➡️](../03-scope/README.md)
