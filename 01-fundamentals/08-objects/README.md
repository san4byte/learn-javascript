# 08 - Objek (Objects)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menyimpan kumpulan pasangan kunci dan nilai (_key-value pairs_) yang tidak berurutan untuk memodelkan entitas nyata, struktur data komposit, dan pola objek dengan fungsi (_methods_).
> - **Kapan Digunakan**: Memodelkan status pengguna (_state_), respons API backend, opsi konfigurasi fungsi (_options object pattern_), dan instansiasi entitas melalui fungsi konstruktor.
> - **Aturan Praktis**: Gunakan _Dot Notation_ (`obj.prop`) untuk kunci statis dan _Bracket Notation_ (`obj[key]`) untuk kunci dinamis. Gunakan _Method Shorthand_ ES6, sematkan method pada `prototype` jika membuat banyak instans serupa, dan hindari _Arrow Function_ saat mendefinisikan method objek yang membutuhkan akses ke `this`.

---

## 1. 🎯 Tujuan Belajar

- Memahami struktur dasar objek JavaScript, notasi titik (_dot_), dan notasi kurung siku (_bracket_).
- Mengetahui 3 cara pembuatan objek: _Object Literal_, _Factory Function_, dan _Constructor Function_.
- Memahami konsep kata kunci `this` dan mekanisme _Implicit Binding_ vs _Lexical Binding_.
- Menguasai _Object Destructuring_, penamaan alias (_aliasing_), nilai default, dan _nested destructuring_.
- Menguasai _Object Spread Operator_ (`...`) untuk penggabungan (_merge_) dan _immutability_.
- Memahami dasar pewarisan prototipe (_Prototype Inheritance_) untuk efisiensi memori bersama (_memory sharing_).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **Objek**: Seperti **lemari berkas berlabel (_filing cabinet_)**. Setiap laci memiliki stiker label nama kunci (**properti `nama`**, **`alamat`**, dll). Anda tidak perlu membuka laci secara berurutan nomor 1 sampai 10 seperti array, melainkan cukup membaca label stikernya langsung.
> - **Keyword `this`**: Seperti **kata ganti "saya" dalam percakapan**. Ketika Budi berbicara, "saya" merujuk ke Budi; ketika Siti berbicara, "saya" merujuk ke Siti (_tergantung siapa objek yang sedang memanggil_).
> - **Prototype**: Seperti **buku panduan manual di perpustakaan bersama**. Daripada mencetak 1.000 buku manual untuk 1.000 karyawan dan membuang kertas (_duplikasi fungsi di setiap instans_), perusahaan meletakkan 1 buku di meja perpustakaan pusat yang dapat dibaca bersama oleh seluruh karyawan (_prototype sharing_).

---

### Tabel Tiga Cara Pembuatan Objek

| Pendekatan               | Sintaksis Utama                   | Kapan Digunakan                               | Kelebihan / Kekurangan                                             |
| :----------------------- | :-------------------------------- | :-------------------------------------------- | :----------------------------------------------------------------- |
| **Object Literal**       | `const obj = { key: val }`        | Objek tunggal (_singleton_), DTO, konfigurasi | Paling cepat & ringkas; tidak cocok untuk instansiasi massal       |
| **Factory Function**     | `function buat() { return {} }`   | Pembuatan objek tanpa kata kunci `new`        | Enkapsulasi bersih; menduplikasi method di memori setiap panggilan |
| **Constructor Function** | `function Orang() { this.x = x }` | Pembuatan banyak objek berstruktur seragam    | Mendukung _prototype sharing_ ($O(1)$ alokasi memori method)       |

---

### Pembahasan Mendalam Fitur & Sintaks

#### 1. Akses Properti: Dot vs Bracket Notation

- **Dot Notation (`obj.nama`)**: Digunakan jika nama properti valid sebagai identifier (tidak ada spasi atau karakter khusus).
- **Bracket Notation (`obj['nama-lengkap']`)**: Wajib digunakan jika nama properti disimpan di dalam variabel dinamis atau mengandung spasi/tanda hubung.

```javascript
const user = { nama: "Joko", "kode-pos": 12345 };
const kunci = "nama";

console.log(user.nama); // 'Joko'
console.log(user[kunci]); // 'Joko' (dinamis via variabel)
console.log(user["kode-pos"]); // 12345
```

#### 2. Kata Kunci `this` dan Konteks Pemanggilan

Nilai `this` ditentukan saat fungsi dipanggil (_call-site_):

- **Implicit Binding**: Pada pemanggilan method `obj.method()`, `this` merujuk ke `obj`.
- **Arrow Function**: Tidak memiliki `this` sendiri; mengikat `this` secara leksikal dari lingkup pembungkusnya (sering bernilai `undefined` atau objek global jika ditulis sebagai method objek).

```javascript
const akun = {
  nama: "Budi",
  sapaBiasa() {
    return `Halo, ${this.nama}`;
  }, // this -> akun
  sapaArrow: () => `Halo, ${this.nama}`, // this -> global/undefined (JANGAN GUNAKAN INI SEBAGAI METHOD)
};
```

#### 3. Destructuring Object & Aliasing

Mengekstrak properti objek ke variabel terpisah berdasarkan kesamaan nama properti:

```javascript
const profil = { id: 101, username: "joko", detail: { kota: "Bandung" } };

// Aliasing: rename username -> namaPengguna, default role = 'Guest'
const {
  id,
  username: namaPengguna,
  role = "Guest",
  detail: { kota },
} = profil;

console.log(namaPengguna); // 'joko'
console.log(kota); // 'Bandung'
```

#### 4. Spread Operator & Penggabungan Immutabel

Operator spread (`...`) menyalin properti objek. Jika ada kunci yang sama, properti yang diletakkan di sisi kanan akan menimpa properti di sisi kiri:

```javascript
const temaDefault = { warna: "biru", font: "Inter", ukuran: 14 };
const temaPengguna = { warna: "merah", ukuran: 16 };

const temaAktif = { ...temaDefault, ...temaPengguna };
// Hasil: { warna: 'merah', font: 'Inter', ukuran: 16 }
```

#### 5. Prototype Inheritance & Memory Sharing

Menyematkan method pada `Constructor.prototype` memastikan method hanya dialokasikan 1 kali di memori heap untuk seluruh instans:

```javascript
function Kucing(nama) {
  this.nama = nama;
}

Kucing.prototype.mengeong = function () {
  return `${this.nama}: Meong!`;
};

const c1 = new Kucing("Mimi");
const c2 = new Kucing("Piko");
console.log(c1.mengeong === c2.mengeong); // true (berbagi referensi method yang sama)
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Implementasi kode lengkap mencakup objek literal, factory function, constructor function, perilaku kata kunci `this`, destructuring objek bertingkat, rest properties, penggabungan objek dengan spread, dan prototype inheritance tersedia di berkas [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/08-objects/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Options Object Pattern**: Menerima objek sebagai parameter tunggal fungsi konfigurasi untuk menghindari jebakan urutan parameter yang panjang: `function initApp({ url, timeout = 5000, retry = 3 })`.
2. **Pembaruan State Immutabel**: Menggunakan pola spread `{ ...state, status: 'loading' }` untuk memperbarui state UI tanpa memutasi objek referensi asli.

### ⚠️ Common Pitfalls

- **Menulis Arrow Function pada Method Objek**: Menyebabkan `this.properti` bernilai `undefined` karena arrow function mewarisi lingkup modul terluar alih-alih objek induknya.
- **Mendefinisikan Method di dalam Constructor**: Menulis `this.method = function() {}` di dalam badan konstruktor menyebabkan method tersebut diduplikasi di memori setiap kali `new` dipanggil. Gunakan `prototype` (atau sintaks `class` pada modul OOP).

### 🌟 Best Practice

- Gunakan _Destructuring Assignment_ pada parameter fungsi untuk membuat kontrak fungsi yang ekspresif dan mudah dibaca.
- Selalu gunakan `Object.freeze()` jika Anda ingin membuat objek konfigurasi yang benar-benar kebal dari modifikasi runtime (_immutable constant_).

---

## 5. ✍️ Latihan Mandiri

1. **Constructor Rekening Bank**: Buatlah Constructor Function `Rekening(pemilik, saldoAwal)`.
   - Sematkan method `setor(jumlah)` pada `Rekening.prototype` untuk menambah saldo.
   - Sematkan method `tarik(jumlah)` pada `Rekening.prototype` yang mengurangi saldo dengan validasi: jika saldo tidak mencukupi, batalkan penarikan dan cetak pesan peringatan.
2. **Destructuring Data Pengguna**: Diberikan respons JSON:
   ```javascript
   const dataAkun = {
     uid: "USR-99",
     nama: "Siti Rahma",
     pengaturan: {
       notifikasi: true,
       tema: "gelap",
     },
   };
   ```
   Ekstrak nilai `uid` menjadi variabel `idUser`, dan ekstrak nilai `tema` langsung dari properti bersarang `pengaturan` dalam satu baris destructuring.
3. **Penggabungan Profil Pengguna**: Buat dua objek: `profilLama` dan `pembaruanData`. Gabungkan keduanya menggunakan Spread Operator sehingga properti yang diperbarui menimpa data lama tanpa mengubah objek `profilLama`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [07 - Arrays](../07-arrays/README.md)
- ➡️ **Selanjutnya:** [09 - Data Types and Operators](../09-data-types-and-operators/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
