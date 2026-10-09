# 02 - Variabel dan Scope (var, let, const, Hoisting & TDZ)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mendeklarasikan wadah penyimpanan data dalam memori JavaScript dengan aturan visibilitas (_scoping_), mutabilitas, dan siklus hidup deklarasi yang presisi.
> - **Kapan Digunakan**: Gunakan `const` sebagai standar default untuk semua variabel, dan gunakan `let` hanya jika nilainya perlu diubah (_reassign_) di kemudian hari.
> - **Aturan Praktis**: Hindari penggunaan `var` sepenuhnya di era modern. Waspadai _Temporal Dead Zone_ (TDZ) pada `let` dan `const` sebelum baris deklarasi dieksekusi.

---

## 1. 🎯 Tujuan Belajar

- Memahami perbedaan fundamental antara kata kunci `var`, `let`, dan `const`.
- Menguasai cara kerja _Hoisting_ serta bahaya _Temporal Dead Zone_ (TDZ) pada mesin JavaScript runtime.
- Membedakan cakupan visibilitas antara _Global Scope_, _Function Scope_, dan _Block Scope_ `{}`.
- Mengetahui sifat mutabilitas pada variabel `const` bertipe referensi (Objek dan Array) serta cara membekukannya dengan `Object.freeze()`.
- Menghindari jebakan klasik _closure_ dalam perulangan asinkron akibat perbedaan _scope binding_.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Kata kunci deklarasi variabel seperti **jenis ruangan penyimpanan**:
>
> - `var` seperti **teras terbuka tanpa pagar**: siapapun yang lewat di halaman rumah bisa melihat dan memindahkan barang di dalamnya tanpa batas dinding kamar.
> - `let` dan `const` seperti **kamar tidur pribadi terkunci (_Block Scope_)**: barang di dalam kamar hanya bisa diakses oleh orang yang berada di dalam ruangan tersebut.
> - `const` ibarat **papan tulis dinding yang dipaku paten**: Anda tidak bisa mengganti papannya dengan papan lain (_cannot reassign reference_), namun Anda masih bisa menulis atau menghapus tulisan di atas permukaannya (_mutate properties_).

---

### Tabel Perbandingan Deklarasi Variabel

| Fitur                           | `var` (ES5 / Legacy)              | `let` (Modern ES6)                 | `const` (Modern ES6)                |
| :------------------------------ | :-------------------------------- | :--------------------------------- | :---------------------------------- |
| **Cakupan Scope**               | _Function Scope_                  | _Block Scope_ `{}`                 | _Block Scope_ `{}`                  |
| **Reassign (Penetapan Ulang)**  | Ya                                | Ya                                 | **Tidak Bisa**                      |
| **Redeklarasi Ulang**           | Ya (Rawan bug konflik nama)       | Tidak Bisa (_SyntaxError_)         | Tidak Bisa (_SyntaxError_)          |
| **Inisialisasi Saat Deklarasi** | Opsional (default `undefined`)    | Opsional (default `undefined`)     | **Wajib diinisialisasi nilai awal** |
| **Hoisting Behavior**           | Di-hoist dengan nilai `undefined` | Di-hoist ke TDZ (_ReferenceError_) | Di-hoist ke TDZ (_ReferenceError_)  |
| **Binding Global Object**       | Menempel ke `window` / `global`   | Tidak menempel ke objek global     | Tidak menempel ke objek global      |

---

### Pembahasan Mendalam Fitur & API

#### 1. Deklarasi Variabel Warisan: `var`

Kata kunci `var` hanya mengenal _Function Scope_. Variabel yang dibuat di dalam blok percabangan `if` atau perulangan `for` akan bocor (_leak_) ke luar blok tersebut.

```javascript
if (true) {
  var pesan = "Pesan rahasia";
}
console.log(pesan); // 'Pesan rahasia' (bocor ke luar blok!)
```

#### 2. Deklarasi Variabel Fleksibel: `let`

Kata kunci `let` memiliki _Block Scope_, artinya variabel terkunci rapat di dalam sepasang kurung kurawal `{}` terdekat. Nilai variabel `let` dapat diubah kembali (_reassigned_).

```javascript
let totalHitungan = 10;
totalHitungan = 25; // Reassign diperbolehkan
```

#### 3. Deklarasi Konstanta: `const`

Kata kunci `const` mengunci ikatan (_binding_) variabel ke alamat memori yang dituju secara permanen. Deklarasi `const` wajib disertai nilai inisialisasi awal dan tidak dapat di-reassign.

```javascript
const URL_API = "https://api.example.com";
// URL_API = 'https://lain.com'; // TypeError: Assignment to constant variable
```

#### 4. Mekanisme Hoisting & Temporal Dead Zone (TDZ)

_Hoisting_ adalah perilaku mesin JavaScript yang mengangkat deklarasi variabel dan fungsi ke bagian atas cakupan (_scope_) sebelum eksekusi baris kode.

- Pada `var`, deklarasi diangkat dan langsung diinisialisasi dengan `undefined`.
- Pada `let` dan `const`, deklarasi tetap diangkat (_lexical binding_ terdaftar), tetapi **tidak diinisialisasi**. Wilayah dari awal scope hingga baris deklarasi disebut **Temporal Dead Zone (TDZ)**. Mengaksesnya memicu `ReferenceError`.

```javascript
// Wilayah TDZ untuk variabel namaPengguna
// console.log(namaPengguna); // ReferenceError: Cannot access 'namaPengguna' before initialization
let namaPengguna = "Joko Santoso"; // Titik keluar dari TDZ
console.log(namaPengguna); // Aman: 'Joko Santoso'
```

#### 5. Perbedaan Function Scope vs Block Scope

Setiap blok tanda kurung kurawal `{}` (seperti `if`, `switch`, `for`, `while`) membentuk ruang lingkup tersendiri bagi `let` dan `const`. Sementara `var` mengabaikan blok kurung kurawal dan hanya tertahan oleh batas kurung fungsi `function () {}`.

```javascript
function ujiScope() {
  if (true) {
    var dariVar = "var lolos blok";
    let dariLet = "let tertahan blok";
  }
  console.log(dariVar); // Berhasil
  // console.log(dariLet); // ReferenceError
}
```

#### 6. Mutabilitas Nilai Referensi pada `const`

`const` mengunci alamat memori (_reference pointer_), **bukan membekukan nilai internal** objek atau array. Properti objek dan elemen array tetap dapat dimutasi secara bebas.

```javascript
const pengguna = { id: 101, aktif: true };
pengguna.aktif = false; // Diperbolehkan (mutasi properti)
pengguna.role = "Admin"; // Diperbolehkan (menambah properti)
// pengguna = { id: 202 }; // Error: Reassign dilarang keras!
```

#### 7. Immutabilitas Sejati dengan `Object.freeze()`

Untuk mencegah mutasi properti pada objek yang dideklarasikan dengan `const`, gunakan metode `Object.freeze()`.

```javascript
const konfigurasi = Object.freeze({
  timeout: 5000,
  debug: false,
});
// konfigurasi.timeout = 10000; // Tidak berubah (melempar TypeError di Strict Mode)
```

#### 8. Perilaku Binding dalam Perulangan & Asinkron

Saat melakukan perulangan dengan callback asinkron (seperti `setTimeout`), `var` menggunakan variabel bersama (_shared binding_), sedangkan `let` membuat _lexical binding_ baru pada setiap putaran iterasi loop.

```javascript
for (let i = 0; i < 3; i++) {
  // Setiap iterasi mengunci nilai i yang unik untuk closure
  setTimeout(() => console.log("Nilai let:", i), 10); // Menghasilkan 0, 1, 2
}
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi Hoisting vs TDZ, isolasi Block Scope vs Function Scope, mutabilitas objek referensi pada `const`, `Object.freeze()`, dan perbandingan perulangan _closure_ telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/02-variables-and-scope/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Pencegahan Modifikasi State Sensitif**: Menjaga konfigurasi koneksi basis data atau kredensial API dari penimpaan tidak sengaja:
   ```javascript
   const DB_CONFIG = Object.freeze({
     host: "localhost",
     port: 5432,
     database: "production_db",
   });
   ```
2. **Penghitung Iterasi yang Bersih Tanpa Polusi Scope**: Menggunakan `let` di dalam loop agar variabel indeks tidak tertinggal di memori global setelah perulangan selesai.

### ⚠️ Common Pitfalls

- **Mengira `const` Bersifat Imutabel Secara Penuh**: Pengembang pemula sering berasumsi bahwa array atau objek `const` tidak bisa diubah isinya sama sekali. Faktanya, `array.push()` atau `obj.key = val` tetap berfungsi.
- **Kebocoran Variabel ke Window/Global**: Menggunakan `var` di tingkat teratas (_top-level script_) secara otomatis membuat properti baru di `window` browser (`window.variabelVar`), yang rentan menimpa pustaka eksternal.

### 🌟 Best Practice

- **Aturan Prioritas 100-0**: Selalu gunakan `const` secara default. Hanya beralih ke `let` jika nilai variabel tersebut memang direncanakan mengalami perubahan (_reassignment_).
- **Hapus `var` Sepenuhnya**: Jangan pernah menggunakan `var` pada basis kode JavaScript modern.
- **Deklarasikan Variabel Dekat Penggunaannya**: Jangan kumpulkan seluruh deklarasi di baris pertama file kecuali diperlukan, tempatkan sedekat mungkin dengan logika yang mengonsumsinya.

---

## 5. ✍️ Latihan Mandiri

1. Buatlah variabel array `const angka = [1, 2, 3]`. Buktikan bahwa Anda dapat menambahkan nilai 4 ke dalam array menggunakan `.push()`, tetapi Anda akan mendapatkan pesan error jika mencoba melakukan `angka = [5, 6, 7]`.
2. Tulis sebuah fungsi yang mendemonstrasikan fenomena _Temporal Dead Zone_ (TDZ) menggunakan blok `try...catch` dan jelaskan pesan galat (_error message_) yang ditampilkan oleh mesin JavaScript.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [01 - Popup Boxes](../01-popup-boxes/README.md)
- ➡️ **Selanjutnya:** [03 - Template Literals](../03-template-literals/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
