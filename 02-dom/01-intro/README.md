# 01 - Pengenalan DOM (Document Object Model)

## Tujuan Belajar
- Memahami konsep dasar Document Object Model (DOM).
- Mengetahui struktur hierarki pohon DOM (*DOM Tree*).
- Mengetahui bagaimana JavaScript berinteraksi dengan elemen dokumen HTML.

## Penjelasan Konsep
DOM adalah antarmuka pemrograman (*Application Programming Interface*) berstandar W3C untuk dokumen HTML dan XML. Ketika browser memuat file HTML, browser membuat representasi objek berbasis pohon di memori yang disebut **DOM Tree**. Melalui objek global `document`, JavaScript dapat membaca, menambah, mengubah, dan menghapus elemen maupun gaya halaman secara interaktif.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
console.log(document);
```

### Output
Menampilkan seluruh representasi struktur dokumen HTML aktif di dalam Developer Console browser.

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  HTML mentah seperti sketsa cetak biru rumah di atas kertas. DOM adalah model miniatur 3D dari rumah tersebut yang sudah terbangun di atas meja. Dengan JavaScript, Anda dapat mengganti warna dinding miniatur tersebut atau menambah perabotan baru secara *real-time*.
- **Tipe-Tipe Node Utama di DOM**:
  1. `Document Node`: Puncak hierarki (*root*).
  2. `Element Node`: Tag HTML seperti `<h1>`, `<p>`, `<div>`.
  3. `Attribute Node`: Atribut tag seperti `class`, `id`, `src`.
  4. `Text Node`: Teks aktual di dalam tag elemen.

## Latihan
1. Buka browser Anda, tekan `F12` untuk membuka Console, lalu ketik `document.title = "Belajar DOM Seru!";`. Amati perubahan pada tab browser Anda!

---
[⬅️ Materi Sebelumnya: 01-Dasar Tebak Angka](../../01-dasar/09-project-game/02-tebak-angka/README.md) | [Materi Selanjutnya: 02 - DOM Selection ➡️](../02-dom-selection/README.md)
