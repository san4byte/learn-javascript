# 01 - Popup Box

## Tujuan Belajar
- Memahami fungsi interaksi dialog bawaan browser.
- Membedakan penggunaan `alert()`, `prompt()`, dan `confirm()`.
- Mampu membuat alur input sederhana dengan pengulangan.

## Penjelasan Konsep
JavaScript menyediakan tiga fungsi dialog bawaan (popup box) yang memblokir eksekusi kode sampai user merespons:
1. `alert()`: Menampilkan jendela pesan pemberitahuan dengan tombol OK.
2. `prompt()`: Menampilkan dialog input teks yang mengembalikan string teks yang diketikkan user (atau `null` jika dibatalkan).
3. `confirm()`: Menampilkan konfirmasi dengan tombol OK dan Batal, mengembalikan nilai boolean (`true` atau `false`).

## Contoh Kode
```javascript
alert("selamat datang...");
var lagi = true;

while (lagi) {
  var nama = prompt("masukan nama");
  alert("hallo " + nama);

  lagi = confirm("coba lagi");
}

alert("terima kasih");
```

### Output
Dialog browser akan muncul secara berurutan menanyakan nama user, menyapa user, dan mengonfirmasi apakah ingin mengulangi.
