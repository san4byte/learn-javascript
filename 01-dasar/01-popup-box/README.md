# 01 - Popup Box (alert, prompt, confirm)

## Tujuan Belajar
- Memahami fungsi interaksi dialog bawaan browser.
- Membedakan fungsi dan nilai kembalian dari `alert()`, `prompt()`, dan `confirm()`.
- Menggabungkan popup dialog dengan perulangan untuk alur input interaktif.

## Penjelasan Konsep
JavaScript menyediakan tiga dialog bawaan (popup box) yang berjalan secara modal (memblokir eksekusi baris kode berikutnya sampai pengguna merespons dialog):
1. **`alert(pesan)`**: Menampilkan kotak dialog informasi sederhana dengan satu tombol OK. Tidak mengembalikan nilai apapun (`undefined`).
2. **`prompt(pesan, default)`**: Menampilkan kotak input teks. Mengembalikan string yang diketik pengguna, atau `null` jika pengguna menekan tombol Cancel.
3. **`confirm(pesan)`**: Menampilkan kotak dialog konfirmasi dengan tombol OK dan Cancel. Mengembalikan boolean `true` jika memilih OK dan `false` jika memilih Cancel.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
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
```text
(Muncul dialog alert: "selamat datang...")
(Muncul input prompt meminta nama, misal user mengetik "Joko")
(Muncul dialog alert: "hallo Joko")
(Muncul dialog confirm: "coba lagi", jika OK maka loop berlanjut, jika Cancel loop berhenti)
(Muncul dialog alert penutup: "terima kasih")
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  - `alert()` seperti pengumuman pengeras suara di stasiun: Anda hanya mendengarkan dan menekan "mengerti".
  - `prompt()` seperti resepsionis yang menyodorkan formulir: meminta Anda menuliskan nama atau data.
  - `confirm()` seperti kasir yang bertanya "Apakah ingin cetak struk?": hanya butuh jawaban Ya atau Tidak.
- **Kenapa Penting & Penggunaan di Proyek Nyata**:
  Popup bawaan browser sangat berguna saat fase belajar logika, debugging cepat, atau prototyping kasar. Di aplikasi produksi modern, developer biasanya menggantinya dengan modal kustom (seperti SweetAlert atau Bootstrap Modal) agar tampilan UI lebih estetik dan tidak memblokir thread browser.
- **Kesalahan Umum Pemula**:
  - Lupa bahwa nilai kembalian dari `prompt()` selalu bertipe `string`. Jika ingin operasi matematika, harus dikonversi dengan `parseInt()` atau `Number()`.
  - Terjebak dalam *infinite loop* jika kondisi penghenti pada `confirm()` tidak di-update dengan benar.
- **Best Practice**:
  Gunakan `confirm()` untuk aksi berbahaya (seperti konfirmasi hapus data penting) jika belum memiliki komponen modal UI kustom.

## Latihan
1. Buat program yang meminta user memasukkan dua angka via `prompt()`, jumlahkan kedua angka tersebut, lalu tampilkan hasilnya via `alert()`. (Ingat konversi tipe data string ke number).
2. Buat popup konfirmasi `confirm("Apakah Anda yakin ingin keluar?")`. Jika user memilih Cancel, tampilkan `alert("Anda tetap di halaman")`.

## Ringkasan Poin Penting
- `alert()` hanya memberi pesan informasi.
- `prompt()` mengambil input teks (tipe data string).
- `confirm()` mengambil keputusan Ya/Tidak (tipe data boolean).
- Ketiganya bersifat sinkron dan memblokir eksekusi script browser sementara.

---
[Materi Selanjutnya: 02 - Variabel ➡️](../02-variabel/README.md)
