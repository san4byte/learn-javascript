# 15 - Reflect (Refleksi Objek Modern dan Pasangan Ideal Proxy)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Kumpulan 13 method statis untuk operasi refleksi objek JavaScript, menstandardisasi operator lama (`delete`, `in`, `new`) menjadi fungsi berbasis nilai kembali boolean.
> - **Kapan Digunakan**: Pasangan wajib di dalam trap `Proxy`, metaprogramming, pemanggilan konstruktor/fungsi dinamis, dan inspeksi kunci lengkap via `Reflect.ownKeys()`.
> - **Aturan Praktis**: Selalu sertakan parameter `receiver` pada `Reflect.get` dan `Reflect.set` agar _this binding_ pada getter/setter berjalan benar, dan jalankan `Reflect.set` di awal trap jika membutuhkan state baru untuk notifikasi listener.

---

## 1. 🎯 Tujuan Belajar

- Memahami peran objek statis bawaan `Reflect` dalam menstandardisasi seluruh operasi internal JavaScript.
- Menguasai seluruh 13 static methods `Reflect` beserta berbagai kemungkinan kondisi (_edge cases_) yang dapat terjadi.
- Memahami keunggulan nilai balikan boolean pada Reflect dibanding operator lama yang rawan melempar _fatal exception_.
- Menguasai fungsi parameter `receiver` dalam mempertahankan integritas konteks kata kunci `this` pada getter/setter.
- Memahami studi kasus arsitektur urutan eksekusi `Reflect.set` pada _Reactive State Management_ OmniStore Pro.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> `Reflect` seperti **buku panduan manual operator resmi dari pabrik mobil**: setiap tuas, tombol, dan pedal rem pada mobil yang sebelumnya dioperasikan dengan cara manual yang berlainan (sebagian ditarik, sebagian diinjak, sebagian diputar), kini diberi antarmuka tombol konsol seragam berstandar internasional yang jelas status responnya (_true/false_).

`Reflect` adalah objek bawaan statis di JavaScript (mirip dengan `Math`) yang menyediakan kumpulan method untuk melakukan operasi refleksi terhadap objek. Objek ini **bukan sebuah konstruktor** (`new Reflect()` akan menghasilkan error).

---

### 1. Mengapa `Reflect` Diciptakan?

Sebelum ada Reflect, operasi objek di JavaScript tersebar di berbagai sintaks yang tidak seragam dan sering melempar error:

- Mengecek properti: operator `'key' in obj` $\rightarrow$ distandardisasi menjadi **`Reflect.has(obj, 'key')`**.
- Menghapus properti: operator `delete obj.key` $\rightarrow$ distandardisasi menjadi **`Reflect.deleteProperty(obj, 'key')`**.
- Mengambil properti: `obj[key]` $\rightarrow$ distandardisasi menjadi **`Reflect.get(obj, key, [receiver])`**.
- Menyetel properti: `obj[key] = val` $\rightarrow$ distandardisasi menjadi **`Reflect.set(obj, key, val, [receiver])`**.
- Instansiasi dinamis: `new Target(...args)` $\rightarrow$ distandardisasi menjadi **`Reflect.construct(Target, args)`**.

---

### 2. Tabel Ringkasan 13 Method Statis Reflect (Cheat-Sheet)

| No  | Method                                                 | Padanan Sintaks Lama              |     Nilai Kembalian     | Deskripsi Singkat                                            |
| :-: | :----------------------------------------------------- | :-------------------------------- | :---------------------: | :----------------------------------------------------------- |
|  1  | **`Reflect.get(target, prop, [receiver])`**            | `target[prop]`                    |          _Any_          | Membaca properti (mendukung `receiver` untuk getter `this`). |
|  2  | **`Reflect.set(target, prop, val, [receiver])`**       | `target[prop] = val`              |        `boolean`        | Menulis properti (mengembalikan boolean status sukses).      |
|  3  | **`Reflect.has(target, prop)`**                        | `'prop' in target`                |        `boolean`        | Standar fungsional pengganti operator `in`.                  |
|  4  | **`Reflect.deleteProperty(target, prop)`**             | `delete target[prop]`             |        `boolean`        | Menghapus properti tanpa melempar runtime exception.         |
|  5  | **`Reflect.ownKeys(target)`**                          | `getOwnPropertyNames` + `Symbols` |         `Array`         | Mengambil seluruh kunci String dan Symbol dalam 1 array.     |
|  6  | **`Reflect.apply(fn, thisArg, argsList)`**             | `Function.prototype.apply`        |          _Any_          | Pemanggilan fungsi dinamis yang bersih dan aman.             |
|  7  | **`Reflect.construct(Target, argsList, [newTarget])`** | `new Target(...argsList)`         |        `object`         | Instansiasi objek dinamis dari array parameter.              |
|  8  | **`Reflect.defineProperty(target, prop, desc)`**       | `Object.defineProperty`           |        `boolean`        | Menentukan descriptor properti (mengembalikan boolean aman). |
|  9  | **`Reflect.getOwnPropertyDescriptor(target, prop)`**   | `Object.getOwnPropertyDescriptor` | `object` \| `undefined` | Membaca konfigurasi descriptor properti target.              |
| 10  | **`Reflect.getPrototypeOf(target)`**                   | `Object.getPrototypeOf`           |   `object` \| `null`    | Membaca prototype rantai warisan objek.                      |
| 11  | **`Reflect.setPrototypeOf(target, proto)`**            | `Object.setPrototypeOf`           |        `boolean`        | Mengubah prototype objek secara aman (return boolean).       |
| 12  | **`Reflect.isExtensible(target)`**                     | `Object.isExtensible`             |        `boolean`        | Memeriksa apakah objek boleh ditambah properti baru.         |
| 13  | **`Reflect.preventExtensions(target)`**                | `Object.preventExtensions`        |        `boolean`        | Mencegah penambahan properti baru (return boolean).          |

---

### 3. Eksplorasi Mendalam Seluruh 13 Method Statis Reflect

Berikut adalah rincian lengkap setiap method `Reflect` beserta skenario dan kemungkinan kasus (_edge cases_) yang dapat terjadi:

---

#### 1. Membaca Properti: `Reflect.get(target, propertyKey[, receiver])`

Membaca nilai properti dari suatu objek.

- **Kasus A: Pembacaan Properti Biasa**

  ```javascript
  const user = { nama: "Joko", umur: 25 };
  console.log(Reflect.get(user, "nama")); // "Joko"
  console.log(Reflect.get(user, "kota")); // undefined (properti tidak ada)
  ```

- **Kasus B: Peran Kritis Parameter `receiver` pada Getter**
  Jika objek target memiliki properti _getter_, parameter `receiver` menentukan apa yang menjadi nilai kata kunci `this` di dalam getter tersebut:

  ```javascript
  const induk = {
    _nama: "Induk",
    get nama() {
      return this._nama;
    },
  };
  const anak = { _nama: "Anak" };

  // Tanpa receiver: 'this' merujuk ke induk
  console.log(Reflect.get(induk, "nama")); // "Induk"

  // Dengan receiver anak: 'this' diarahkan ke anak
  console.log(Reflect.get(induk, "nama", anak)); // "Anak" ✅
  ```

---

#### 2. Menulis Properti: `Reflect.set(target, propertyKey, value[, receiver])`

Menetapkan nilai ke suatu properti dan mengembalikan nilai boolean (`true` jika berhasil, `false` jika gagal).

- **Kasus A: Menulis Properti & Return Value Boolean**

  ```javascript
  const mobil = { merk: "Toyota" };
  const sukses = Reflect.set(mobil, "warna", "Merah");
  console.log(sukses); // true
  console.log(mobil.warna); // "Merah"
  ```

- **Kasus B: Parameter `receiver` pada Setter**
  Jika properti adalah _setter_, `receiver` menentukan konteks `this` saat setter dijalankan:

  ```javascript
  const targetObj = {
    set skor(val) {
      this._skor = val * 10;
    },
  };
  const penerima = {};
  Reflect.set(targetObj, "skor", 5, penerima);
  console.log(penerima._skor); // 50 ✅
  ```

- **Kasus C: Kegagalan Menulis (Objek Read-Only / Beku)**
  ```javascript
  const beku = Object.freeze({ id: 1 });
  const hasil = Reflect.set(beku, "id", 99);
  console.log(hasil); // false (tanpa melempar crash!)
  ```

---

#### 3. Memeriksa Properti: `Reflect.has(target, propertyKey)`

Menggantikan operator `'prop' in target` secara fungsional.

- **Kasus A: Pengecekan Properti Sendiri dan Warisan**

  ```javascript
  const buku = { judul: "JavaScript Handal" };
  console.log(Reflect.has(buku, "judul")); // true
  console.log(Reflect.has(buku, "harga")); // false
  console.log(Reflect.has(buku, "toString")); // true (ditemukan di Object.prototype)
  ```

- **Kasus B: Validasi Parameter Target Wajib Objek**
  Jika target bukan berupa objek, method ini melempar `TypeError`:
  ```javascript
  // Reflect.has('string', 'length'); // ❌ TypeError: Reflect.has called on non-object
  ```

---

#### 4. Menghapus Properti: `Reflect.deleteProperty(target, propertyKey)`

Menggantikan operator `delete target[prop]`, mengembalikan `true` jika berhasil dihapus atau jika properti memang tidak ada.

- **Kasus A: Penghapusan Berhasil**

  ```javascript
  const profil = { nama: "Andi", bio: "Developer" };
  const terhapus = Reflect.deleteProperty(profil, "bio");
  console.log(terhapus); // true
  console.log(profil.bio); // undefined
  ```

- **Kasus B: Properti Non-Configurable (Gagal Dihapus)**
  Jika properti dikonfigurasi `configurable: false`, penghapusan mengembalikan `false` secara elegan tanpa melempar TypeError:
  ```javascript
  const konstan = {};
  Object.defineProperty(konstan, "KEY", { value: 123, configurable: false });
  console.log(Reflect.deleteProperty(konstan, "KEY")); // false ✅
  ```

---

#### 5. Ekstraksi Seluruh Kunci: `Reflect.ownKeys(target)`

Mengembalikan seluruh kunci milik objek (baik properti string biasa maupun `Symbol`) dalam satu array sekaligus.

- **Kasus A: Mengambil Kunci String dan Symbol Bersamaan**

  ```javascript
  const ID = Symbol("id");
  const user = { nama: "Joko", [ID]: 901 };

  console.log(Object.keys(user)); // ['nama'] (Symbol terlewat!)
  console.log(Reflect.ownKeys(user)); // ['nama', Symbol(id)] ✅ Lengkap!
  ```

- **Kasus B: Termasuk Properti Non-Enumerable**
  `Reflect.ownKeys` setara dengan gabungan `Object.getOwnPropertyNames(target)` dan `Object.getOwnPropertySymbols(target)`.

---

#### 6. Pemanggilan Fungsi: `Reflect.apply(target, thisArgument, argumentsList)`

Memanggil fungsi target dengan konteks `this` tertentu dan argumen yang diberikan dalam bentuk array.

- **Kasus A: Pemanggilan Bersih & Terprediksi**

  ```javascript
  function sapa(salam, tanda) {
    return `${salam}, ${this.nama}${tanda}`;
  }
  const hasil = Reflect.apply(sapa, { nama: "Budi" }, ["Halo", "!"]);
  console.log(hasil); // "Halo, Budi!"
  ```

- **Kasus B: Kebal terhadap Penimpaan Prototype**
  Jika fungsi memiliki properti `apply` yang sengaja ditimpa (`fn.apply = null`), `Reflect.apply` tetap dapat mengeksekusinya tanpa masalah.

---

#### 7. Instansiasi Objek Dinamis: `Reflect.construct(target, argumentsList[, newTarget])`

Melakukan instansiasi objek seperti `new Target(...argumentsList)`.

- **Kasus A: Instansiasi Dinamis dari Array**

  ```javascript
  class Member {
    constructor(id, nama) {
      this.id = id;
      this.nama = nama;
    }
  }
  const member = Reflect.construct(Member, [101, "Siti"]);
  console.log(member instanceof Member); // true
  console.log(member.nama); // "Siti"
  ```

- **Kasus B: Mengubah Prototype Kelas Anak via `newTarget`**
  Memungkinkan konstruktor `Member` dijalankan, namun prototype objek yang dihasilkan mengikuti kelas lain:
  ```javascript
  class Khusus {}
  const inst = Reflect.construct(Member, [102, "Rina"], Khusus);
  console.log(inst instanceof Khusus); // true ✅
  ```

---

#### 8. Definisi Descriptor Aman: `Reflect.defineProperty(target, propertyKey, attributes)`

Mendefinisikan properti objek secara presisi dan mengembalikan boolean (`true`/`false`).

- **Kasus A: Return Boolean Alih-Alih Melempar Fatal Error**
  Pada `Object.defineProperty`, jika operasi gagal (misal objek beku), JavaScript melempar `TypeError`. Versi `Reflect` mengembalikan `false`:

  ```javascript
  const beku = Object.freeze({ status: "ok" });

  const sukses = Reflect.defineProperty(beku, "token", { value: "secret" });
  console.log(sukses); // false ✅ (aplikasi tidak crash)
  ```

---

#### 9. Membaca Descriptor: `Reflect.getOwnPropertyDescriptor(target, propertyKey)`

Mengembalikan atribut descriptor (`value`, `writable`, `enumerable`, `configurable`) milik properti objek target.

- **Kasus A: Membaca Konfigurasi Properti**

  ```javascript
  const config = { versi: "1.0" };
  const desc = Reflect.getOwnPropertyDescriptor(config, "versi");
  console.log(desc.writable); // true
  console.log(desc.enumerable); // true
  console.log(desc.configurable); // true
  ```

- **Kasus B: Properti Tidak Ada**
  Jika properti tidak ditemukan pada target, mengembalikan `undefined`:
  ```javascript
  console.log(Reflect.getOwnPropertyDescriptor(config, "takAda")); // undefined
  ```

---

#### 10. Membaca Prototype: `Reflect.getPrototypeOf(target)`

Mengembalikan prototype dari objek target (identik dengan `Object.getPrototypeOf`).

- **Kasus A: Membaca Rantai Prototype**

  ```javascript
  const induk = { spesies: "Kucing" };
  const anak = Object.create(induk);
  console.log(Reflect.getPrototypeOf(anak) === induk); // true ✅
  ```

- **Kasus B: Validasi Ketat Non-Object**
  `Reflect.getPrototypeOf(123)` melempar `TypeError`, sedangkan `Object.getPrototypeOf(123)` secara otomatis membungkus (_coercion_) angka menjadi objek `Number`.

---

#### 11. Mengubah Prototype: `Reflect.setPrototypeOf(target, prototype)`

Mengubah prototype objek target secara aman dan mengembalikan boolean status sukses.

- **Kasus A: Mengubah Prototype Berhasil**

  ```javascript
  const hewan = { bernapas: true };
  const ikan = { berenang: true };

  const sukses = Reflect.setPrototypeOf(ikan, hewan);
  console.log(sukses); // true
  console.log(ikan.bernapas); // true (diwarisi via prototype)
  ```

- **Kasus B: Objek yang Tidak Dapat Diubah Prototype-nya (_Non-Extensible_)**
  Jika objek disegel atau dibekukan, `Object.setPrototypeOf` akan melempar fatal error, sedangkan `Reflect.setPrototypeOf` mengembalikan `false`:
  ```javascript
  const beku = Object.freeze({});
  const hasil = Reflect.setPrototypeOf(beku, hewan);
  console.log(hasil); // false ✅ (aman tanpa crash)
  ```

---

#### 12. Pengecekan Ekstensi: `Reflect.isExtensible(target)`

Memeriksa apakah objek masih diizinkan untuk ditambah properti baru.

- **Kasus A: Cek Objek Normal vs Objek Terkunci**

  ```javascript
  const obj = {};
  console.log(Reflect.isExtensible(obj)); // true

  Object.preventExtensions(obj);
  console.log(Reflect.isExtensible(obj)); // false
  ```

---

#### 13. Mencegah Ekstensi: `Reflect.preventExtensions(target)`

Mengunci objek sehingga tidak bisa lagi ditambahkan properti baru. Mengembalikan boolean status keberhasilan.

- **Kasus A: Mengunci Objek secara Aman**

  ```javascript
  const wadah = { isi: "air" };
  const suksesKunci = Reflect.preventExtensions(wadah);
  console.log(suksesKunci); // true

  const cobaTambah = Reflect.set(wadah, "label", "mineral");
  console.log(cobaTambah); // false
  console.log(wadah.label); // undefined
  ```

---

### 4. 🔍 Studi Kasus Nyata: Mengapa Urutan Eksekusi `Reflect.set` Sangat Krusial? (Pelajaran dari Capstone OmniStore Pro)

Saat membangun sistem **Reactive State Management** di Capstone Project ([`projects/omnistore-pro/src/state/store.js`](../../projects/omnistore-pro/src/state/store.js)):

```javascript
export const state = new Proxy(rawState, {
  set(target, prop, value, receiver) {
    // 1. Eksekusi pengubahan data secara resmi di AWAL
    const success = Reflect.set(target, prop, value, receiver);

    if (success) {
      // 2. Notifikasi & Backup menggunakan data yang SUDAH BARU
      if (prop === "cart") {
        saveCart(target.cart.toJSON());
      }
      listeners.forEach((callback) => callback(target, prop));
    }

    return success;
  },
});
```

#### ❓ Pertanyaan Arsitektur: Kenapa `Reflect.set` Dijalankan di Awal, Bukan di Akhir?

Banyak pemula tergoda untuk meletakkan `return Reflect.set(...)` di baris paling bawah trap. Namun urutan ini membawa konsekuensi besar pada konsistensi data:

1. **Jika `Reflect.set` ditaruh di AKHIR:**
   Saat baris `saveCart()` dan pemanggilan `listeners` dijalankan, nilai pada `target.cart` **masih merupakan data lama** sebelum mutasi! Akibatnya:
   - Data yang dicadangkan ke `localStorage` adalah data usang (misal masih 1 barang padahal user sudah menambah barang ke-2).
   - Layar monitor UI merender data lama (terlambat satu langkah).

2. **Pedoman Waktu Pemanggilan (Timing Rule):**
   - **Taruh `Reflect.set` di AWAL (Post-processing):** Ketika tujuan Anda adalah **bereaksi terhadap perubahan data** (mengabari UI/listeners, audit logging, menyimpan auto-save). Data harus sah masuk ke objek terlebih dahulu sebelum diumumkan ke pihak luar.
   - **Taruh `Reflect.set` di AKHIR (Pre-processing):** Ketika tujuan Anda adalah **menjaga pintu masuk** (validasi tipe data, pemeriksaan batas harga, sanitasi input). Jika data tidak valid, lempar `Error` sebelum data tersebut diizinkan masuk ke `target`.

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep operasi refleksi standar dari ke-13 static method, peran parameter `receiver`, perbedaan error handling boolean, hingga studi kasus arsitektur state store OmniStore Pro di atas dirangkum ke dalam satu laboratorium kode siap pakai:

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 03-standard-library/15-reflect/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Proxy Forwarding**: Menjadi cara standar meneruskan operasi pencegatan di dalam Proxy trap kembali ke objek target.
2. **Manipulasi Objek Terproteksi**: Mengetahui apakah penambahan properti berhasil atau gagal tanpa program mengalami crash (`if (!Reflect.defineProperty(...))`).
3. **Pemanggilan Konstruktor Dinamis**: Memanggil constructor fungsi dengan parameter array menggunakan `Reflect.construct(TargetClass, argsList)`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mengira Reflect adalah Konstruktor**: Menulis `new Reflect()` akan menghasilkan `TypeError: Reflect is not a constructor`.
- **Lupa Argumen `receiver` saat Berkolaborasi dengan Proxy**: Jika objek target memiliki _getter_ yang mengandalkan keyword `this`, tidak menyertakan parameter `receiver` pada `Reflect.get(target, prop, receiver)` akan merusak konteks `this` ke objek asal, bukan ke Proxy.
- **Mengganti Operasi Sederhana Tanpa Alasan**: Untuk kode aplikasi bisnis umum, `obj.nama` tetap lebih bersih daripada `Reflect.get(obj, 'nama')`. Gunakan Reflect untuk metaprogramming, library, dan Proxy.

### 🌟 Best Practice

- Selalu gunakan `Reflect` di dalam trap `Proxy` untuk meneruskan operasi default daripada melakukan manipulasi langsung ke `target`.
- Sertakan selalu parameter `receiver` pada `Reflect.get` dan `Reflect.set` demi integritas binding keyword `this` pada getter/setter.
- Gunakan `Reflect.ownKeys(target)` untuk mengambil semua kunci objek (string keys sekaligus Symbol keys) dalam satu langkah ringkas.

---

## 5. ✍️ Latihan Mandiri

1. Ubah kode pemeriksaan `if ('email' in user)` dan penghapusan `delete user.password` menjadi versi modern menggunakan method `Reflect`.
2. Buat fungsi `ubahIndukAman(objekAnak, objekIndukBaru)` yang menggunakan `Reflect.setPrototypeOf` dan mencatat peringatan jika objek anak ternyata berstatus non-extensible/beku.
3. Buat implementasi sederhana fungsi `instansiasiDinamis(ClassTarget, ...args)` yang memanfaatkan `Reflect.construct`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [14 - Proxy](../14-proxy/README.md)
- ➡️ **Selanjutnya:** [16 - Encode](../16-encode/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
