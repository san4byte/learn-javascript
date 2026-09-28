# 07.2 - Project Pengelolaan Kursi Penumpang Angkot

## Tujuan Belajar
- Mengintegrasikan manipulasi array ke dalam logika aplikasi bisnis nyata.
- Menangani kondisi pengisian kursi kosong terdekat (*first available slot*).
- Menghindari duplikasi data penumpang yang sama.
- Menangani proses penumpang turun dan pengosongan kursi.

## Penjelasan Konsep
Algoritma pengelolaan kursi angkot:
1. **`tambahPenumpang(nama, list)`**:
   - Jika angkot kosong, masukkan penumpang di indeks 0.
   - Cek apakah nama penumpang sudah ada di dalam angkot (`includes`). Jika ada, tolak dengan pesan peringatan.
   - Telusuri kursi dengan loop. Jika menemukan kursi bernilai `undefined`, duduki kursi tersebut dan hentikan pencarian.
   - Jika seluruh kursi terisi penuh, tambahkan penumpang di kursi paling belakang via `push()`.
2. **`hapusPenumpang(nama, list)`**:
   - Jika angkot kosong, tampilkan pesan bahwa angkot masih kosong.
   - Cari penumpang berdasarkan nama. Jika cocok, ubah nilainya menjadi `undefined` (kursi kosong).
   - Jika hingga akhir loop nama tidak ditemukan, beri tahu bahwa penumpang tidak ada di dalam angkot.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Project Pengelolaan Kursi Penumpang Angkot
let penumpang = [];

function tambahPenumpang(namaPenumpang, penumpang) {
  if (penumpang.length == 0) {
    penumpang.push(namaPenumpang);
    return penumpang;
  } else {
    if (penumpang.includes(namaPenumpang)) {
      console.log(namaPenumpang + " sudah ada di angkot");
      return penumpang;
    }
    for (let i = 0; i < penumpang.length; i++) {
      if (penumpang[i] == undefined) {
        penumpang[i] = namaPenumpang;
        return penumpang;
      } else if (i == penumpang.length - 1) {
        penumpang.push(namaPenumpang);
        return penumpang;
      }
    }
  }
}

function hapusPenumpang(namaPenumpang, penumpang) {
  if (penumpang.length == 0) {
    console.log("Angkot masih kosong.");
    return penumpang;
  } else {
    for (let i = 0; i < penumpang.length; i++) {
      if (penumpang[i] == namaPenumpang) {
        penumpang[i] = undefined;
        return penumpang;
      } else if (i == penumpang.length - 1) {
        console.log(namaPenumpang + " tidak ada di dalam angkot.");
        return penumpang;
      }
    }
  }
}

tambahPenumpang("Joko", penumpang);
tambahPenumpang("Samsul", penumpang);
console.log("Daftar penumpang:", penumpang);
hapusPenumpang("Joko", penumpang);
console.log("Setelah Joko turun:", penumpang);
```

### Output
```text
Daftar penumpang: [ 'Joko', 'Samsul' ]
Setelah Joko turun: [ undefined, 'Samsul' ]
```

## Penjelasan Tambahan
- **Pentingnya Data Consistency**:
  Studi kasus ini melatih bagaimana sistem nyata (seperti reservasi tiket bioskop atau kursi pesawat) mencari bangku kosong pertama yang tersedia tanpa harus menggeser nomor kursi penumpang lain.
- **Method `includes()` Modern**:
  Penggunaan `penumpang.includes(namaPenumpang)` menyederhanakan pencarian duplikasi data tanpa perlu loop pencarian manual.

## Latihan
1. Tambahkan fitur batas kapasitas maksimum angkot (misal maksimal 5 penumpang). Jika kursi penuh, tampilkan pesan "Angkot sudah penuh".
2. Buat fungsi `hitungPenumpangAktif(penumpang)` yang menghitung jumlah kursi yang tidak bernilai `undefined`.

## Ringkasan Poin Penting
- Memadukan logika pencarian loop dengan array.
- Menjaga keutuhan urutan kursi dengan membiarkan nilai `undefined` pada bangku yang ditinggalkan.

---
[⬅️ Materi Sebelumnya: 07.1 - Manipulasi Array](../01-manipulasi-array/README.md) | [Materi Selanjutnya: 08.1 - Dasar Object ➡️](../../08-object/01-dasar-object/README.md)
