# 07.1 - Manipulasi Array

## Tujuan Belajar
- Memahami struktur data Array dan pengindeksan berbasis nol (*zero-indexed*).
- Mengetahui cara menambah, membaca, dan menghapus elemen array.
- Menguasai method bawaan array: `push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `slice()`, `join()`.

## Penjelasan Konsep
Array adalah variabel khusus yang dapat menampung lebih dari satu nilai sekaligus secara berurutan.
Method utama untuk manipulasi array:
1. `push(...items)`: Menambah satu atau beberapa elemen di **akhir** array.
2. `pop()`: Menghapus satu elemen dari **akhir** array.
3. `unshift(...items)`: Menambah satu atau beberapa elemen di **awal** array.
4. `shift()`: Menghapus satu elemen dari **awal** array.
5. `join(separator)`: Menggabungkan seluruh elemen array menjadi satu string.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Manipulasi elemen array
let arr = ["a", 1, true];
arr[3] = "tiga";
console.log("Tambah via index:", arr);

let arr2 = ["satu", "dua", "tiga", "empat"];
arr2[1] = undefined;
console.log("Hapus nilai:", arr2);

let arr3 = ["joko", "santoso", "gege", "selena"];
for (let i = 0; i < arr3.length; i++) {
  console.log("Nama ke - " + (i + 1) + " : " + arr3[i]);
}

let arr4 = ["agus", "rehan", "samsul"];
arr4.push("lutfi", "roy");
console.log("Setelah push:", arr4);
arr4.pop();
console.log("Setelah pop:", arr4);
```

### Output
```text
Tambah via index: [ 'a', 1, true, 'tiga' ]
Hapus nilai: [ 'satu', undefined, 'tiga', 'empat' ]
Nama ke - 1 : joko
Nama ke - 2 : santoso
Nama ke - 3 : gege
Nama ke - 4 : selena
Setelah push: [ 'agus', 'rehan', 'samsul', 'lutfi', 'roy' ]
Setelah pop: [ 'agus', 'rehan', 'samsul', 'lutfi' ]
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Array seperti rak laci lemari bertingkat yang diberi nomor urut laci 0, 1, 2, dst. Anda bisa membuka laci no 2 dan mengganti isinya kapan saja.
- **Kesalahan Umum Pemula**:
  - Lupa bahwa indeks array dimulai dari `0`, bukan `1`. Elemen pertama ada di `arr[0]`, dan elemen terakhir ada di `arr[arr.length - 1]`.
  - Menghapus elemen dengan cara `delete arr[1]` atau `arr[1] = undefined`. Cara ini meninggalkan lubang (*empty slot / undefined*) tanpa menggeser panjang array. Gunakan `arr.splice(index, 1)` untuk menghapus elemen sekaligus merapatkan indeks array.

## Latihan
1. Buat array berisi 5 nama buah, tambahkan buah baru di awal menggunakan `unshift()`, lalu gabungkan menjadi string dipisah tanda koma spasi menggunakan `join(", ")`.
2. Jelaskan perbedaan method `splice()` (memotong dan mengubah array asli) dan `slice()` (mengambil potongan array tanpa mengubah array asli).

## Ringkasan Poin Penting
- Indeks array dimulai dari angka 0.
- `push` dan `pop` bekerja di ujung akhir; `unshift` dan `shift` bekerja di ujung awal array.

---
[⬅️ Materi Sebelumnya: 06.5 - Project Volume Dua Kubus](../../06-function/05-project-volume-kubus/README.md) | [Materi Selanjutnya: 07.2 - Project Pengelolaan Penumpang ➡️](../02-project-kelola-penumpang/README.md)
