# 15 - Reflect (Refleksi Objek Modern dan Pasangan Ideal Proxy)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami `Reflect` sebagai objek statis bawaan ES6 untuk operasi intersepsi dan refleksi JavaScript.
> * **Kapan Digunakan**: Mengetahui method-method utama Reflect: `Reflect.get()`, `Reflect.set()`, `Reflect.has()`, dan `Reflect.deleteProperty()`.
> * **Aturan Praktis**: Selalu gunakan `Reflect` di dalam trap `Proxy` untuk meneruskan operasi default daripada melakukan manipulasi langsung ke `target`.

## 1. 🎯 Tujuan Belajar

- Memahami `Reflect` sebagai objek statis bawaan ES6 untuk operasi intersepsi dan refleksi JavaScript.
- Mengetahui method-method utama Reflect: `Reflect.get()`, `Reflect.set()`, `Reflect.has()`, dan `Reflect.deleteProperty()`.
- Memahami keunggulan pengembalian nilai boolean pada Reflect dibanding melempar exception pada operator lama.
- Menguasai integrasi sempurna antara `Reflect` dan `Proxy` untuk mempertahankan perilaku bawaan bahasa.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> `Reflect` seperti **buku panduan manual operator resmi dari pabrik mobil**: setiap tuas, tombol, dan pedal rem pada mobil yang sebelumnya dioperasikan dengan cara manual yang berlainan (sebagian ditarik, sebagian diinjak, sebagian diputar), kini diberi antarmuka tombol konsol seragam berstandar internasional yang jelas status responnya.

**`Reflect`** adalah objek built-in statis di JavaScript (mirip dengan `Math`) yang menyediakan kumpulan method untuk melakukan operasi refleksi terhadap objek. `Reflect` bukan konstruktor (`new Reflect()` akan error).

### 1. Mengapa `Reflect` Diciptakan?

Sebelum ada Reflect, operasi objek di JavaScript tersebar di berbagai sintaks yang tidak seragam:

- Mengecek properti: operator `'key' in obj` $\rightarrow$ kini distandardisasi menjadi **`Reflect.has(obj, 'key')`**.
- Menghapus properti: operator `delete obj.key` $\rightarrow$ kini distandardisasi menjadi **`Reflect.deleteProperty(obj, 'key')`**.
- Mengambil properti: `obj[key]` $\rightarrow$ kini menjadi **`Reflect.get(obj, key, [receiver])`**.
- Menyetel properti: `obj[key] = val` $\rightarrow$ kini menjadi **`Reflect.set(obj, key, val, [receiver])`**.

### 2. Tabel Referensi Lengkap Method Statis `Reflect`

| Method                                           | Ekivalen Sintaks Lama                    | Keunggulan & Keterangan                                        |
| :----------------------------------------------- | :--------------------------------------- | :------------------------------------------------------------- |
| **`Reflect.get(target, prop, [receiver])`**      | `target[prop]`                           | Mendukung parameter `receiver` untuk getter binding yang tepat |
| **`Reflect.set(target, prop, val, [receiver])`** | `target[prop] = val`                     | Mengembalikan boolean `true`/`false` apakah penulisan sukses   |
| **`Reflect.has(target, prop)`**                  | `'prop' in target`                       | Standar method pengganti operator `in`                         |
| **`Reflect.deleteProperty(target, prop)`**       | `delete target[prop]`                    | Mengembalikan boolean `true` jika berhasil dihapus             |
| **`Reflect.ownKeys(target)`**                    | `Object.getOwnPropertyNames` + `Symbols` | Mengembalikan seluruh kunci string dan Symbol dalam 1 array    |
| **`Reflect.apply(fn, thisArg, argsList)`**       | `Function.prototype.apply`               | Pemanggilan fungsi yang lebih bersih dan aman                  |
| **`Reflect.construct(Target, argsList)`**        | `new Target(...argsList)`                | Instansiasi dinamis tanpa syntax spread manual                 |
| **`Reflect.defineProperty(target, prop, desc)`** | `Object.defineProperty`                  | Mengembalikan boolean tanpa melempar fatal exception           |
| **`Reflect.getPrototypeOf(target)`**             | `Object.getPrototypeOf`                  | Mengambil prototype objek                                      |
| **`Reflect.setPrototypeOf(target, proto)`**      | `Object.setPrototypeOf`                  | Mengubah prototype objek (return boolean)                      |

### 3. Pasangan Sempurna untuk `Proxy`

Setiap trap pada `Proxy` memiliki method pasangan dengan **nama dan parameter yang 100% persis** di `Reflect`!
Alih-alih memanggil `target[prop] = value` secara manual di dalam Proxy handler, best practice modern adalah memanggil **`Reflect.set(target, prop, value, receiver)`** yang otomatis menangani konteks pewarisan prototype dan getter/setter secara tepat.

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Operasi Refleksi Standar dengan Reflect ---");
const user = {
  nama: "Joko",
  umur: 25,
  role: "admin",
};

// Membaca properti dengan Reflect.get
console.log("Reflect.get(user, 'nama')   :", Reflect.get(user, "nama"));

// Memeriksa properti dengan Reflect.has
console.log("Reflect.has(user, 'role')   :", Reflect.has(user, "role"));

// Menghapus properti dengan Reflect.deleteProperty
const statusHapus = Reflect.deleteProperty(user, "role");
console.log("Status hapus properti role  :", statusHapus);
console.log("Objek setelah dihapus       :", user);

console.log("\n--- 2. Kolaborasi Sempurna: Proxy + Reflect ---");
const produk = {
  nama: "Laptop",
  harga: 10000000,
};

const handler = {
  get(target, property, receiver) {
    console.log(`[ACCESS LOG]: Mengakses properti '${String(property)}'`);
    return Reflect.get(target, property, receiver);
  },

  set(target, property, value, receiver) {
    if (property === "harga" && value < 0) {
      throw new Error("Harga tidak boleh negatif!");
    }

    return Reflect.set(target, property, value, receiver);
  },
};

const proxyProduk = new Proxy(produk, handler);

// Uji coba pembacaan via proxy
console.log("Baca nama via proxy         :", proxyProduk.nama);

// Uji coba penulisan via proxy
try {
  proxyProduk.harga = 12000000;
  console.log("Berhasil ubah harga         :", proxyProduk.harga);

  // Memicu validasi error:
  proxyProduk.harga = -1;
} catch (error) {
  console.error("Gagal update harga          :", error.message);
}
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Operasi Refleksi Standar dengan Reflect ---
Reflect.get(user, 'nama')   : Joko
Reflect.has(user, 'role')   : true
Status hapus properti role  : true
Objek setelah dihapus       : { nama: 'Joko', umur: 25 }

--- 2. Kolaborasi Sempurna: Proxy + Reflect ---
[ACCESS LOG]: Mengakses properti 'nama'
Baca nama via proxy         : Laptop
[ACCESS LOG]: Mengakses properti 'harga'
Berhasil ubah harga         : 12000000
Gagal update harga          : Harga tidak boleh negatif!
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case

1. **Proxy Forwarding**: Menjadi cara standar meneruskan operasi pencegatan di dalam Proxy trap kembali ke objek target.
2. **Manipulasi Objek Terproteksi**: Mengetahui apakah penambahan properti berhasil atau gagal tanpa program mengalami crash (`if (!Reflect.defineProperty(...))`).
3. **Pemanggilan Konstruktor Dinamis**: Memanggil constructor fungsi dengan parameter array menggunakan `Reflect.construct(TargetClass, argsList)`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mengira Reflect adalah konstruktor**: Menulis `new Reflect()` akan menghasilkan `TypeError: Reflect is not a constructor`.
- **Lupa argumen `receiver` saat berkolaborasi dengan Proxy**: Jika objek target memiliki *getter* yang mengandalkan keyword `this`, tidak menyertakan parameter `receiver` pada `Reflect.get(target, prop, receiver)` akan merusak konteks `this` ke objek asal, bukan ke Proxy.
- **Mengganti operasi sederhana tanpa alasan**: Untuk kode aplikasi bisnis umum, `obj.nama` tetap lebih bersih daripada `Reflect.get(obj, 'nama')`. Gunakan Reflect untuk metaprogramming, library, dan Proxy.

### 🌟 Best Practice

- Selalu gunakan `Reflect` di dalam trap `Proxy` untuk meneruskan operasi default daripada melakukan manipulasi langsung ke `target`.
- Sertakan selalu parameter `receiver` pada `Reflect.get` dan `Reflect.set` demi integritas binding keyword `this` pada getter/setter.
- Gunakan `Reflect.ownKeys(target)` untuk mengambil semua kunci objek (string keys sekaligus Symbol keys) dalam satu langkah ringkas.

---

## 6. ✍️ Latihan Mandiri

1. Ubah kode pemeriksaan `if ('email' in user)` dan penghapusan `delete user.password` menjadi versi modern menggunakan method `Reflect`.
2. Buatlah sebuah Proxy handler yang menggunakan `Reflect.ownKeys()` untuk mencatat seluruh daftar properti yang dimiliki oleh objek target.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [14 - Proxy](../14-proxy/README.md)
- ➡️ **Selanjutnya:** [16 - Encode](../16-encode/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
