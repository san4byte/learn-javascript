# 09.3 - Konsep Keyword This pada Berbagai Konteks

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengidentifikasi objek eksekusi yang sedang aktif (_execution context_) secara dinamis di dalam fungsi JavaScript.
> - **Kapan Digunakan**: Mengakses data properti internal objek dari dalam method, membuat instance baru di constructor, atau meminjam fungsi menggunakan pengikatan eksplisit.
> - **Aturan Praktis**: Nilai `this` tidak ditentukan oleh tempat fungsi ditulis, melainkan oleh **bagaimana cara fungsi tersebut dipanggil** (kecuali pada _Arrow Function_ yang selalu menggunakan _Lexical this_).

---

## 1. 🎯 Tujuan Belajar

- Menguasai 4 aturan utama pengikatan konteks `this`: _Default Binding_, _Implicit Binding_, _Explicit Binding_, dan _New Binding_.
- Memahami penyebab fatal hilangnya konteks `this` saat method dioperasikan sebagai callback asinkron.
- Mampu memanipulasi konteks `this` secara manual menggunakan metode `.call()`, `.apply()`, dan `.bind()`.
- Memahami konsep _Lexical this_ pada Arrow Function sebagai penyelamat konteks di dalam method.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Kata kunci `this` persis seperti kata ganti **"Saya"** dalam tata bahasa:
>
> - Jika **Joko** yang sedang berbicara di panggung, kata _"Saya"_ merujuk pada diri Joko.
> - Jika **Budi** yang mengambil mikrofon dan berbicara, kata _"Saya"_ seketika merujuk pada diri Budi.
> - Makna kata _"Saya"_ (**`this`**) tidak permanen, melainkan selalu bergantung pada **siapa yang sedang memegang kendali eksekusi**.

---

### Tabel 4 Aturan Penentuan Nilai `this`

| Aturan Binding          | Pola Pemanggilan                                | Nilai `this`                                   | Prioritas     |
| :---------------------- | :---------------------------------------------- | :--------------------------------------------- | :------------ |
| **1. New Binding**      | `const obj = new Fn()`                          | Instans objek baru yang sedang dibuat          | Tertinggi (1) |
| **2. Explicit Binding** | `fn.call(obj)`, `fn.apply(obj)`, `fn.bind(obj)` | Objek target yang ditentukan manual            | Tinggi (2)    |
| **3. Implicit Binding** | `obj.method()`                                  | Objek di sebelah kiri titik pemanggil          | Menengah (3)  |
| **4. Default Binding**  | `fn()` (fungsi biasa mandiri)                   | `globalThis` (atau `undefined` di strict mode) | Terendah (4)  |

---

### Pembahasan Mendalam Fitur & API

#### 1. Aturan 1: Default Binding (Fungsi Global)

Jika fungsi dipanggil secara langsung tanpa objek di depannya:

```javascript
function tes() {
  return this;
}
tes(); // window / global (atau undefined jika 'use strict')
```

#### 2. Aturan 2: Implicit Binding (Method Objek)

Ketika method dipanggil melalui properti objek, `this` otomatis merujuk ke objek pemilik di sisi kiri titik:

```javascript
const user = {
  nama: "Joko",
  sapa() {
    return `Halo, ${this.nama}`;
  },
};
user.sapa(); // 'Halo, Joko' (this = user)
```

#### 3. Aturan 3: Explicit Binding (`call`, `apply`, `bind`)

Memaksa fungsi mengadopsi objek tertentu sebagai konteks `this`:

- `.call(thisArg, arg1, arg2)`: Memanggil seketika dengan argumen terpisah.
- `.apply(thisArg, [args])`: Memanggil seketika dengan argumen berupa array.
- `.bind(thisArg)`: Mengembalikan fungsi baru dengan `this` yang terkunci permanen.

```javascript
function perkenalan(kota) {
  return `${this.nama} dari ${kota}`;
}
const profil = { nama: "Siti" };
perkenalan.call(profil, "Bandung"); // 'Siti dari Bandung'
```

#### 4. Aturan 4: New Binding (Constructor Function)

Ketika fungsi dipanggil dengan operator `new`, mesin membuat objek baru dan mengikat `this` ke objek tersebut:

```javascript
function Mobil(m) {
  this.merk = m;
}
const m1 = new Mobil("Honda"); // this = m1
```

#### 5. Kehilangan Konteks `this` pada Callback

Jebakan klasik terjadi saat method objek diserahkan ke callback seperti `setTimeout` atau handler event:

```javascript
const timer = {
  detik: 0,
  jalan() {
    // Kehilangan this: fungsi biasa dijalankan oleh sistem window
    setTimeout(function () {
      // this.detik bernilai NaN / undefined!
    }, 1000);
  },
};
```

#### 6. Pengecualian Khusus: Lexical `this` pada Arrow Function

Arrow function mengabaikan keempat aturan binding di atas. Nilai `this`-nya disalin langsung dari lingkungan leksikal terluar tempat ia didefinisikan:

```javascript
setTimeout(() => {
  this.detik++; // Aman! this tetap merujuk ke objek timer
}, 1000);
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi pengujian _Implicit Binding_ pada method objek, _New Binding_ pada constructor mobil, demonstrasi kehilangan konteks serta penyelamatannya via `.bind()`, `.call()`, dan `.apply()`, serta pemanfaatan _Lexical this_ pada arrow function callback telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/09-objects/03-keyword-this/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Peminjaman Metode (_Method Borrowing_)**: Meminjam metode pemformatan data dari objek lain tanpa harus menduplikasikan kode:
   ```javascript
   const formatUang = {
     format() {
       return `Rp ${this.nominal}`;
     },
   };
   const tagihan = { nominal: 50000 };
   formatUang.format.call(tagihan); // 'Rp 50000'
   ```
2. **Pengikatan Handler pada Class Component**: Mengunci konteks `this` method agar tidak lepas saat dijadikan event callback form.

### ⚠️ Common Pitfalls

- **Menulis Method Objek Literal Menggunakan Arrow Function**: Menggunakan arrow function pada method utama membuat `this` menunjuk ke modul global, bukan ke properti objek itu sendiri.
- **Mengira `.bind()` Memutasi Fungsi Asli**: `.bind()` tidak mengubah fungsi asli, melainkan menghasilkan **fungsi baru**. Pastikan Anda menampung hasil kembaliannya.

### 🌟 Best Practice

- Gunakan _Arrow Function_ di dalam callback internal method (seperti `forEach`, `map`, `setTimeout`) agar `this` leksikal tetap terjaga.
- Gunakan _Method Shorthand_ (`nama() {}`) untuk method terluar dari objek literal.

---

## 5. ✍️ Latihan Mandiri

1. Buatlah objek `kalkulator` dengan properti `a: 20`, `b: 5`, dan method `tambah()` serta `kali()` yang menghitung nilai berdasarkan `this.a` dan `this.b`.
2. Lepaskan method `tambah` ke variabel mandiri `const fn = kalkulator.tambah`. Tunjukkan bagaimana cara mengeksekusi variabel `fn` agar tetap menghasilkan nilai 25 menggunakan `.bind()` atau `.call()`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [09.2 - Tiga Cara Membuat Object](../02-creating-objects/README.md)
- ➡️ **Selanjutnya:** [09.4 - Destructuring & Spread Object](../04-destructuring-spread/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
