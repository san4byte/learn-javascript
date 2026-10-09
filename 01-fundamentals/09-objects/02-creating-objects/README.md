# 09.2 - Tiga Cara Membuat Object (Literal, Function, Constructor)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memilih dan menerapkan paradigma pembuatan objek di JavaScript: deklarasi langsung (_Object Literal_), fungsi pencetak (_Factory Function_), konstruktor berprototipe (_Constructor Function_), atau pewarisan murni (_Object.create_).
> - **Kapan Digunakan**: Gunakan Object Literal untuk objek tunggal sekali pakai; gunakan Factory Function untuk objek berulang tanpa `this`; gunakan Constructor Function / ES6 Class untuk entitas massal berprototipe.
> - **Aturan Praktis**: Gunakan penamaan huruf besar (_PascalCase_) untuk nama Constructor Function, dan selalu sertakan kata kunci `new` saat memanggilnya.

---

## 1. 🎯 Tujuan Belajar

- Menguasai pembuatan objek menggunakan sintaks _Object Literal_ `{}`.
- Memahami pola pembuatan objek modular melalui _Factory Function_ tanpa kata kunci `this`.
- Menguasai pola _Constructor Function_ klasik serta memahami 4 langkah yang dieksekusi mesin di balik operator `new`.
- Mengoptimalkan alokasi memori dengan menyematkan metode bersama ke dalam properti `Constructor.prototype`.
- Memahami pembuatan pewarisan objek secara langsung menggunakan `Object.create()`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **Object Literal** seperti **memasak kue rumahan satu loyang untuk dimakan sendiri**: Dibuat langsung secara instan, tidak butuh cetakan pabrik.
> - **Factory Function** seperti **cetakan martabak manual**: Anda memasukkan bahan telur dan tepung ke alat (_parameter_), alat mencetak dan menyajikan martabak baru ke piring Anda (_return object_).
> - **Constructor Function** seperti **pabrik perakitan mobil berlisensi**: Setiap mobil yang keluar dari lini produksi otomatis membawa cap merek resmi pabrikan (**`instanceof`**), nomor rangka baru, dan buku manual standar dari pusat (**`prototype`**).

---

### Tabel Perbandingan Pendekatan Pembuatan Objek

| Pendekatan               | Pemanggilan        | Binding `this`             | Dukungan `instanceof` | Efisiensi Memori Method               |
| :----------------------- | :----------------- | :------------------------- | :-------------------- | :------------------------------------ |
| **Object Literal**       | Langsung `{}`      | Lingkup lokal objek        | ❌ `Object` biasa     | Rendah (duplikasi method per objek)   |
| **Factory Function**     | `buatUser()`       | Bebas `this` (opsional)    | ❌ `Object` biasa     | Rendah (kecuali pakai closure)        |
| **Constructor Function** | `new User()`       | `this` menunjuk objek baru | ✅ `instanceof User`  | **Sangat Tinggi** (via `.prototype`)  |
| **`Object.create()`**    | `Object.create(p)` | Terikat objek baru         | Tergantung proto      | **Sangat Tinggi** (berbagi prototype) |

---

### Pembahasan Mendalam Fitur & API

#### 1. Pendekatan 1: Object Literal `{}`

Cara paling ringkas dan sering digunakan untuk struktur data tunggal:

```javascript
const user = {
  nama: "Joko",
  peran: "Admin",
};
```

#### 2. Pendekatan 2: Factory Function

Fungsi biasa yang merakit dan mengembalikan objek baru. Sangat disukai karena tidak bergantung pada perilaku rumit dari keyword `this`:

```javascript
function buatPengguna(nama, peran) {
  return { nama, peran };
}
const user1 = buatPengguna("Budi", "Editor");
```

#### 3. Pendekatan 3: Constructor Function & Operator `new`

Fondasi OOP klasik JavaScript. Dideklarasikan dengan huruf kapital _PascalCase_:

```javascript
function Mahasiswa(nama, nim) {
  this.nama = nama;
  this.nim = nim;
}
const mhs = new Mahasiswa("Siti", "101");
```

#### 4. Di Balik Layar Operator `new` (4 Langkah Mekanisme)

Saat Anda mengetik `new Mahasiswa(...)`, mesin JavaScript menjalankan 4 instruksi otomatis:

1. Membuat sebuah objek kosong baru di memori: `{}`.
2. Menghubungkan prototype objek baru tersebut ke `Mahasiswa.prototype`.
3. Mengikat (_binding_) kata kunci `this` agar merujuk ke objek kosong baru tersebut, lalu menjalankan badan fungsi konstruktor.
4. Secara otomatis mengembalikan objek `this` baru tersebut (kecuali konstruktor mengembalikan objek lain secara eksplisit).

#### 5. Optimasi Memori dengan Prototype Method

Jangan menaruh method di dalam badan constructor function, karena setiap kali `new` dipanggil, fungsi method tersebut akan diduplikasi di RAM. Sematkan ke prototype:

```javascript
Mahasiswa.prototype.sapa = function () {
  return `Halo ${this.nama}`;
};
```

#### 6. Pendekatan 4: Pewarisan Eksplisit via `Object.create()`

Membuat objek baru dengan menentukan prototipe induknya secara langsung tanpa fungsi konstruktor:

```javascript
const proto = {
  bersuara() {
    return "Miau!";
  },
};
const kucing = Object.create(proto);
console.log(kucing.bersuara()); // 'Miau!'
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi perbandingan Object Literal untuk DTO, pembuatan Factory Function yang bersih, Constructor Function dengan method prototype terpusat, pengujian identitas `instanceof`, serta teknik pewarisan prototipe via `Object.create()` telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/09-objects/02-creating-objects/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Pustaka JavaScript Klasik**: Pustaka seperti Three.js, Leaflet, dan jQuery menggunakan konstruktor berprototipe untuk membuat ribuan objek grafis (misal `new THREE.Mesh()`) dengan efisiensi memori maksimal.
2. **Factory Function untuk State Generator**: Menghasilkan objek konfigurasi form yang bersih pada aplikasi web frontend.

### ⚠️ Common Pitfalls

- **Lupa Kata Kunci `new`**: Memanggil `Mahasiswa('Budi')` tanpa `new` mengeksekusinya sebagai fungsi biasa; `this` akan menunjuk ke global `window`/`globalThis` dan fungsi mengembalikan `undefined`.
- **Mendefinisikan Method di Dalam Constructor**: Menulis `this.hitung = function() {}` di dalam constructor membuat 10.000 instans objek menduplikasi 10.000 salinan fungsi yang sama di memori komputer.

### 🌟 Best Practice

- Gunakan konvensi nama _PascalCase_ untuk seluruh Constructor Function (contoh: `RekeningBank`, `PemainGame`).
- Di era JavaScript modern (ES6+), pertimbangkan untuk menggunakan sintaks `class` resmi yang merupakan _syntactic sugar_ modern di atas constructor function dan prototype.

---

## 5. ✍️ Latihan Mandiri

1. Buatlah Constructor Function bernama `Mobil(merk, tahun)` yang memiliki method bersama di `Mobil.prototype.getUsia()` untuk menghitung umur mobil berdasarkan tahun berjalan (`new Date().getFullYear() - this.tahun`).
2. Buatlah Factory Function `buatAkun(username, email)` yang mengembalikan objek dengan properti privat `status: 'AKTIF'` dan buktikan bahwa pembuatannya tidak memerlukan operator `new`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [09.1 - Dasar Object](../01-object-basics/README.md)
- ➡️ **Selanjutnya:** [09.3 - Keyword This](../03-keyword-this/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
