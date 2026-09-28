# 12 - Callbacks

## Tujuan Belajar
- Memahami konsep Callback (fungsi yang dikirim sebagai argumen ke fungsi lain).
- Membedakan Synchronous Callback dan Asynchronous Callback.
- Mengenal bahaya piramida kode *Callback Hell*.
- Mengambil data API secara asinkron menggunakan jQuery AJAX.

## Penjelasan Konsep
Callback adalah fungsi yang dioperasikan sebagai argumen pada fungsi lain, lalu dipanggil kembali (*called back*) setelah fungsi tersebut menyelesaikan pekerjaannya.
- **Synchronous Callback**: Berjalan berurutan dan memblokir eksekusi baris berikutnya (contoh: callback pada `Array.prototype.forEach` atau `filter`).
- **Asynchronous Callback**: Berjalan di latar belakang dan baru dipanggil saat proses selesai (contoh: respons AJAX atau timer).

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Synchronous Callback sederhana

function sapa(callback) {
  const nama = "Joko";
  callback(nama);
}

sapa((nama) => {
  console.log(`Halo ${nama}, selamat datang!`);
});
```

### Output
```text
Halo Joko, selamat datang!
```

Tinjau juga studi kasus AJAX pencarian film pada [latihan.js](latihan.js) dan [index-latihan.html](index-latihan.html).

---
[⬅️ Materi Sebelumnya: 11 - Timing Events](../11-timing-events/README.md) | [Materi Selanjutnya: 13 - Promise ➡️](../13-promise/README.md)
