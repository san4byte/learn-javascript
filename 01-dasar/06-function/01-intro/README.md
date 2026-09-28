# 06.1 - Function (Pengenalan Fungsi)

## Tujuan Belajar
- Memahami konsep fungsi sebagai blok kode *reusable* (dapat dipakai berulang kali).
- Mengenal anatomi deklarasi fungsi: keyword `function`, nama fungsi, parameter, body, dan keyword `return`.
- Memahami perbedaan antara mendefinisikan fungsi (*declaration*) dan mengeksekusinya (*invocation/call*).

## Penjelasan Konsep
Fungsi adalah sub-program yang membungkus kumpulan baris instruksi logika. Komponen fungsi:
1. **Keyword `function`**: Memberi tahu JavaScript bahwa kita membuat sebuah fungsi.
2. **Nama Fungsi**: Identifier unik untuk memanggil fungsi tersebut di tempat lain.
3. **Parameter `(a, b, c)`**: Input yang diterima oleh fungsi.
4. **Badan Fungsi `{}`**: Instruksi logika komputasi.
5. **Keyword `return`**: Mengirimkan hasil keluaran komputasi kembali ke pemanggil fungsi.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Deklarasi fungsi aritmatika
function tastAritmatika(a, b, c) {
  let hasil;
  hasil = a + b - c;
  return hasil;
}

alert(tastAritmatika(100, 100000000, 10000));
```

### Output
```text
(Muncul alert box menampilkan hasil kalkulasi: 99990100)
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Fungsi seperti mesin pembuat jus (*blender*): Anda memasukkan buah (parameter input), mesin memprosesnya (body fungsi), lalu menghasilkan segelas jus segar (nilai `return`).
- **Prinsip DRY (Don't Repeat Yourself)**:
  Tanpa fungsi, jika Anda butuh operasi matematika yang sama di 10 tempat berbeda, Anda harus menyalin-tempel kode tersebut 10 kali. Dengan fungsi, Anda cukup menulisnya sekali dan memanggilnya di mana pun.
- **Kesalahan Umum Pemula**:
  Lupa menuliskan keyword `return`. Fungsi yang tidak memiliki `return` secara implisit akan mengembalikan nilai `undefined`.

## Latihan
1. Buat fungsi sederhana `hitungLuasSegitiga(alas, tinggi)` yang mengembalikan luas segitiga: $\frac{alas \times tinggi}{2}$.
2. Buat fungsi `salam(nama)` yang mengembalikan string sapaan `"Halo, Selamat datang [nama]!"`.

## Ringkasan Poin Penting
- Fungsi mengorganisir kode menjadi modul-modul kecil yang rapi dan terisolasi.
- Gunakan `return` untuk mengembalikan nilai ke pemanggil fungsi.

---
[⬅️ Materi Sebelumnya: 05 - Project Simulasi Angkot](../../05-project-angkot/README.md) | [Materi Selanjutnya: 06.2 - Parameter dan Argumen ➡️](../02-parameter-argumen/README.md)
