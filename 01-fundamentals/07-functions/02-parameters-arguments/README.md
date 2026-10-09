# 07.2 - Parameter, Argumen, Default Parameter & Arguments Object

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengelola data masukan fungsi melalui variabel penampung (_parameter_), data riil yang dikirim (_argumen_), nilai bawaan otomatis (_default parameter_), dan objek semu _arguments_.
> - **Kapan Digunakan**: Mengantisipasi nilai kosong tanpa if-else manual, menangani fungsi dengan argumen bervariasi, serta mempermudah passing konfigurasi via _Options Object Pattern_.
> - **Aturan Praktis**: Gunakan _Default Parameter_ ES6 (`param = defaultValue`) daripada memeriksa `undefined` secara manual. Manfaatkan _destructuring_ objek parameter jika jumlah masukan lebih dari 3.

---

## 1. 🎯 Tujuan Belajar

- Membedakan konsep antara Parameter (variabel pada definisi) dan Argumen (nilai riil pada pemanggilan).
- Menguasai fitur _Default Parameters_ ES6 untuk mengamankan fungsi dari nilai `undefined`.
- Mengetahui struktur dan keterbatasan objek semu `arguments` pada fungsi non-arrow.
- Mengubah objek _array-like_ `arguments` menjadi array asli JavaScript menggunakan `Array.from()`.
- Menguasai teknik _Parameter Destructuring_ dan _Options Object Pattern_ untuk konfigurasi yang bersih dan fleksibel.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Parameter dan Argumen seperti **slot koin pada mesin minuman (_vending machine_)**:
>
> - **Parameter** adalah **lubang cetakan koin** yang dirancang pabrik pada mesin (spesifikasi ukuran lubang koin Rp 500 dan Rp 1.000).
> - **Argumen** adalah **koin logam rupiah asli** yang Anda masukkan ke dalam lubang tersebut saat ingin membeli minuman.
> - **Default Parameter** adalah fasilitas koin bonus darurat yang otomatis digunakan mesin jika Anda tidak memasukkan koin apa pun.

---

### Tabel Perbandingan Konsep Masukan Fungsi

| Entitas                | Waktu / Lokasi                       | Tipe                               | Contoh Sintaks                     |
| :--------------------- | :----------------------------------- | :--------------------------------- | :--------------------------------- |
| **Parameter**          | Saat fungsi didefinisikan            | Variabel lokal identifier          | `function hitung(a, b) { ... }`    |
| **Argumen**            | Saat fungsi dipanggil                | Nilai data konkret                 | `hitung(10, 25)`                   |
| **Default Parameter**  | Header deklarasi fungsi              | Fallback nilai saat `undefined`    | `function sapa(nama = 'Tamu')`     |
| **`arguments` Object** | Tersedia di dalam badan fungsi biasa | _Array-like object_ indeks numerik | `arguments[0]`, `arguments.length` |

---

### Pembahasan Mendalam Fitur & API

#### 1. Perbedaan Konseptual: Parameter vs Argumen

Parameter bertindak sebagai wadah kosong lokal. Saat fungsi dipanggil, nilai argumen disalin ke dalam wadah parameter secara berurutan:

```javascript
// 'x' dan 'y' adalah Parameter
function tambah(x, y) {
  return x + y;
}
// 10 dan 20 adalah Argumen
tambah(10, 20);
```

#### 2. Default Parameters ES6 & Penanganan `undefined`

Nilai default hanya akan aktif jika argumen yang dikirim tidak ada atau secara eksplisit bernilai `undefined`. Nilai `null`, `0`, atau `false` **tidak memicu** nilai default:

```javascript
function buatKopi(rasa = "Kopi Hitam") {
  return `Menyajikan: ${rasa}`;
}
buatKopi(); // 'Menyajikan: Kopi Hitam'
buatKopi(undefined); // 'Menyajikan: Kopi Hitam'
buatKopi(null); // 'Menyajikan: null' (karena null adalah nilai valid)
```

#### 3. Objek `arguments` (Array-like Object Legacy)

Pada fungsi tradisional (`function keyword`), terdapat variabel otomatis bernama `arguments` yang mencatat seluruh argumen yang dipassing:

```javascript
function cekArgumen() {
  console.log(arguments.length); // Jumlah argumen riil
  console.log(arguments[0]); // Argumen pertama
}
```

#### 4. Konversi Objek `arguments` Menjadi Array Asli

Objek `arguments` bukan instance `Array`, sehingga tidak memiliki metode seperti `.map()`, `.filter()`, atau `.reduce()`. Konversikan terlebih dahulu:

```javascript
function rataRata() {
  const argsArray = Array.from(arguments);
  const total = argsArray.reduce((acc, curr) => acc + curr, 0);
  return total / argsArray.length;
}
```

#### 5. Parameter Destructuring (Objek & Array)

Anda dapat langsung mengekstrak properti objek atau elemen array pada deklarasi parameter fungsi:

```javascript
function cetakProfil({ nama, kota = "Jakarta" }) {
  console.log(`${nama} tinggal di ${kota}`);
}
cetakProfil({ nama: "Joko" }); // 'Joko tinggal di Jakarta'
```

#### 6. Pola Arsitektur Options Object Pattern

Pola terbaik untuk fungsi yang menerima banyak konfigurasi opsi. Menghindari kebingungan urutan parameter posisi (_positional arguments_):

```javascript
function initApp({ port = 8080, debug = false, mode = "dev" } = {}) {
  console.log(`Port: ${port}, Debug: ${debug}, Mode: ${mode}`);
}
initApp({ mode: "prod" }); // port & debug tetap memakai default!
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi penggunaan parameter vs argumen, mekanisme aktivasi _default parameter_, inspeksi & konversi objek array-like `arguments`, serta pola arsitektur _Options Object Destructuring_ telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/07-functions/02-parameters-arguments/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Konfigurasi HTTP Client**:
   ```javascript
   function apiRequest(
     url,
     { method = "GET", timeout = 5000, headers = {} } = {},
   ) {
     // Pengguna tidak perlu mengingat urutan method, timeout, atau headers
     return fetch(url, { method, headers });
   }
   ```
2. **Kalkulator Biaya Pengiriman**: Menghitung ongkos kirim berdasarkan berat barang dengan tarif dasar default jika tidak ada diskon promo.

### ⚠️ Common Pitfalls

- **Mengabaikan Fakta Bahwa `arguments` Tidak Ada di Arrow Function**: Memanggil `arguments` di dalam panah `() => {}` akan melempar error atau merujuk ke arguments fungsi induknya.
- **Nilai `null` Tertukar dengan `undefined`**: Mengharapkan `func(null)` mengaktifkan parameter default `param = 10`. Ingat bahwa hanya `undefined` yang mengaktifkan default value.

### 🌟 Best Practice

- Gunakan _Default Parameters_ bawaan bahasa daripada trik lama `param = param || defaultValue`.
- Jika sebuah fungsi memiliki lebih dari 3 parameter posisi, ubah menjadi satu parameter objek konfigurasi (_Options Object_).
- Di JavaScript modern, prioritaskan sintaks _Rest Parameter_ (`...args`) daripada objek warisan `arguments`.

---

## 5. ✍️ Latihan Mandiri

1. Buat fungsi `hitungDiskon(hargaTotal, persentasePajak = 0.11, diskon = 0)` yang mengembalikan nilai akhir belanja setelah diskon dipotong dan pajak ditambahkan.
2. Buat fungsi `buatPengguna({ username, email, role = 'member' } = {})` menggunakan destructuring parameter dan pastikan fungsi tidak error jika dipanggil tanpa argumen apa pun `buatPengguna()`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [07.1 - Pengenalan Function](../01-intro/README.md)
- ➡️ **Selanjutnya:** [07.3 - Variable Scope](../03-scope/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
