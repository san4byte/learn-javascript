# 13 - Promise

## Tujuan Belajar
- Memahami konsep objek Promise sebagai solusi elegan mengatasi Callback Hell.
- Mengetahui 3 status utama Promise: *Pending*, *Fulfilled*, dan *Rejected*.
- Menangani respons sukses dengan `.then()`, error dengan `.catch()`, dan penyelesaian dengan `.finally()`.
- Mengenal method statis `Promise.all()`.

## Penjelasan Konsep
**Promise** adalah objek yang merepresentasikan keberhasilan atau kegagalan dari suatu operasi asinkron yang hasilnya baru tersedia di masa mendatang.
Sebuah Promise memiliki 3 kemungkinan status (*state*):
1. **Pending**: Operasi sedang berlangsung, belum selesai.
2. **Fulfilled**: Operasi berhasil diselesaikan dengan baik (`resolve`).
3. **Rejected**: Operasi gagal atau terjadi error (`reject`).

Aksi lanjutan:
- `.then(result)`: Dieksekusi saat status *Fulfilled*.
- `.catch(error)`: Dieksekusi saat status *Rejected*.
- `.finally()`: Selalu dieksekusi di akhir, baik berhasil maupun gagal (cocok untuk mematikan loading spinner).

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Konsep Promise: Pending, Fulfilled, Rejected

// Contoh 1: Promise sederhana
let ditepati = true;
const janji1 = new Promise((resolve, reject) => {
  if (ditepati) {
    resolve("Janji telah ditepati!");
  } else {
    reject("Ingkar janji..");
  }
});

janji1
  .then((response) => console.log("OK: " + response))
  .catch((response) => console.log("NOT OK: " + response));

// Contoh 2: Promise Asinkron dengan setTimeout
const janji2 = new Promise((resolve, reject) => {
  if (ditepati) {
    setTimeout(() => {
      resolve("Ditepati setelah beberapa detik!");
    }, 1000);
  } else {
    setTimeout(() => {
      reject("Tidak ditepati setelah beberapa detik!");
    }, 1000);
  }
});

janji2
  .then((response) => console.log("OK: " + response))
  .catch((response) => console.log("NOT OK: " + response));
```

### Output
```text
OK: Janji telah ditepati!
OK: Ditepati setelah beberapa detik!
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Seperti memesan makanan di kasir cepat saji: Kasir memberi Anda struk nomor antrean (Promise). Saat makanan sedang dimasak, statusnya *Pending*. Jika pesanan selesai, Anda dipanggil mengambil makanan (*Fulfilled*). Jika bahan habis, kasir meminta maaf dan mengembalikan uang Anda (*Rejected*).
- **`Promise.all([p1, p2, ...])`**:
  Berguna jika Anda perlu mengambil data dari banyak API secara bersamaan dan hanya melanjutkan proses jika **seluruh** request berhasil selesai.

---
[⬅️ Materi Sebelumnya: 12 - Callbacks](../12-callbacks/README.md) | [Materi Selanjutnya: 14 - Fetch API ➡️](../14-fetch/README.md)
