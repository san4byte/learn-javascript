# 06.2 - Parameter dan Argumen

## Tujuan Belajar
- Membedakan definisi parameter dan argumen.
- Memahami variabel semu `arguments` untuk fungsi fleksibel.

## Penjelasan Konsep
- **Parameter**: Variabel yang didefinisikan saat pembuatan fungsi.
- **Argumen**: Nilai aktual yang dikirimkan saat fungsi dipanggil.
- **`arguments`**: Objek array-like bawaan fungsi reguler yang menampung seluruh argumen yang dikirimkan, terlepas dari jumlah parameter yang didefinisikan.

## Contoh Kode
```javascript
function tambahSemua() {
  let hasil = 0;
  for (let i = 0; i < arguments.length; i++) {
    hasil += arguments[i];
  }
  return hasil;
}

console.log(tambahSemua(1, 3, 5, 10, 82, 28));
```

### Output
`129`
