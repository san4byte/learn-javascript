# 06 - Super Method (Method Overriding & Kata Kunci super)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memanggil method milik superclass dari dalam method subclass menggunakan sintaks `super.namaMethod(...)`.
> - **Kapan Digunakan**: Saat subclass melakukan _method overriding_ namun tetap ingin menggunakan kembali (_reuse_) atau memperluas (_extend_) fungsionalitas logika yang sudah ada di superclass.
> - **Aturan Praktis**: Panggil `super.namaMethod()` untuk mengeksekusi logika dasar, simpan hasil kembaliannya jika perlu, lalu tambahkan perlakuan khusus di subclass.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep **Method Overriding** (menimpa method induk pada kelas anak).
- Menguasai pemanggilan method superclass menggunakan sintaks **`super.namaMethod(...)`**.
- Memahami strategi memperkaya (_augmenting/extending_) perilaku method alih-alih menimpanya secara total (_complete replacement_).
- Mengetahui cara menangkap dan memanipulasi _return value_ yang dihasilkan oleh `super.namaMethod(...)`.
- Memahami cara meneruskan atau memodifikasi argumen sebelum dilempar ke `super.namaMethod(...)`.
- Menguasai pemanggilan `super` di dalam konteks **Static Method** (`super.staticMethod()`).
- Memahami bagaimana kata kunci `this` terikat (_bound_) ketika method dieksekusi melalui `super`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **kustomisasi resep masakan warisan**: Seorang koki restoran memasak hidangan utama menggunakan racikan bumbu rahasia warisan orang tuanya (`super.masak()`). Setelah hidangan dasar matang, koki tersebut menambahkan _topping_ lelehan keju mozzarella dan saus truffle modern sebelum menyajikannya ke pelanggan. Koki tidak membuang resep orang tuanya, melainkan menyempurnakannya.

---

### 1. Tabel Ringkasan Fitur Super Method (Cheat-Sheet)

| Mekanisme / Sintaks        | Konteks Pemanggilan          | Peran / Dampak           | Deskripsi Singkat                                                                      |
| :------------------------- | :--------------------------- | :----------------------- | :------------------------------------------------------------------------------------- |
| **Method Overriding**      | Subclass method              | Menimpa implementasi     | Mendefinisikan method bernama sama di subclass untuk mengganti implementasi induk.     |
| **`super.method()`**       | Instance method              | Memperluas (_extend_)    | Memanggil method prototype milik superclass dari method subclass.                      |
| **Return Value Handling**  | `const res = super.method()` | Modifikasi hasil         | Menangkap output parent method dan mengolahnya sebelum di-return oleh subclass.        |
| **Parameter Modifying**    | `super.method(ubah(arg))`    | Transformasi input       | Mengubah atau memperkaya parameter sebelum diserahkan ke method parent.                |
| **Static Super**           | `super.staticMethod()`       | Static inheritance       | Memanggil static method superclass dari dalam static method subclass.                  |
| **Context `this` Binding** | Di dalam `super.method()`    | Merujuk ke instance anak | Nilai `this` di dalam method induk yang dipanggil tetap menunjuk ke instance subclass. |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja pemanggilan super method beserta skenario kasusnya:

---

#### 1. Method Overriding Dasar (Total Replacement)

Jika subclass hanya ingin mengganti sepenuhnya logika method induk tanpa memanggil method aslinya:

```javascript
class Hewan {
  bersuara() {
    return 'Hewan mengeluarkan suara.';
  }
}

class Kucing extends Hewan {
  bersuara() {
    return 'Meong! 🐱'; // Menimpa method induk secara total
  }
}

const cat = new Kucing();
console.log(cat.bersuara()); // "Meong! 🐱"
```

---

#### 2. Memperluas Perilaku dengan `super.namaMethod()`

Gunakan `super.namaMethod()` ketika subclass ingin mempertahankan langkah-langkah dasar milik parent dan menambahkan langkah baru:

```javascript
class Bentuk {
  gambar() {
    console.log('Menyiapkan kanvas...');
  }
}

class Lingkaran extends Bentuk {
  gambar() {
    super.gambar(); // Jalankan instruksi dasar dari Bentuk
    console.log('Menggambar lingkaran beradius 10px.');
  }
}

new Lingkaran().gambar();
// Output:
// Menyiapkan kanvas...
// Menggambar lingkaran beradius 10px.
```

---

#### 3. Mengolah Return Value dari `super.namaMethod()`

Subclass dapat menangkap nilai kembali (_return value_) dari parent method, memodifikasinya (misalnya menambahkan pajak atau diskon), lalu mengembalikannya:

```javascript
class KalkulatorDasar {
  hitungTotal(harga, kuantitas) {
    return harga * kuantitas;
  }
}

class KalkulatorPajak extends KalkulatorDasar {
  hitungTotal(harga, kuantitas, tarif = 0.11) {
    const subtotal = super.hitungTotal(harga, kuantitas);
    return subtotal + subtotal * tarif; // Menambahkan komponen pajak
  }
}

const c = new KalkulatorPajak();
console.log(c.hitungTotal(100000, 2)); // 222000
```

---

#### 4. Parameter Forwarding dan Transformasi Input

Subclass dapat memvalidasi atau memodifikasi argumen sebelum meneruskannya ke method milik superclass:

```javascript
class Logger {
  log(pesan) {
    console.log(`[LOG]: ${pesan}`);
  }
}

class TimestampLogger extends Logger {
  log(pesan) {
    const waktu = new Date().toISOString();
    super.log(`[${waktu}] ${pesan}`); // Menambahkan prefix timestamp
  }
}

new TimestampLogger().log('User login');
```

---

#### 5. Pemanggilan `super` di Dalam Static Method

Kata kunci `super` juga dapat digunakan di dalam method statis untuk memanggil method statis milik superclass:

```javascript
class ApiClient {
  static getBaseUrl() {
    return 'https://api.example.com/v1';
  }
}

class UserApiClient extends ApiClient {
  static getEndpoint() {
    // Memanggil static method superclass via super:
    return `${super.getBaseUrl()}/users`;
  }
}

console.log(UserApiClient.getEndpoint()); // "https://api.example.com/v1/users"
```

---

#### 6. Binding Kata Kunci `this` Saat Pemanggilan `super.method()`

Ketika `super.method()` dieksekusi, kata kunci `this` di dalam method induk tetap merujuk pada instance objek saat ini (_subclass instance_), bukan parent:

```javascript
class Pengguna {
  constructor(nama) {
    this.nama = nama;
  }

  sapa() {
    return `Halo, saya ${this.nama}`; // this.nama merujuk ke instance Pelajar
  }
}

class Pelajar extends Pengguna {
  sapa() {
    return `${super.sapa()} (Siswa)`;
  }
}

const siswa = new Pelajar('Andi');
console.log(siswa.sapa()); // "Halo, saya Andi (Siswa)"
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep method overriding, pemanggilan `super.namaMethod()`, manipulasi return value, transformasi argumen, pewarisan statis dengan `super`, dan binding `this` telah dirangkum dalam script laboratorium terpadu:

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 02-oop/06-super-method/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Audit Trail & Event Emitter**: Subclass repository menimpa method `save(data)` untuk menerbitkan event atau mencatat log audit ke broker pesan setelah memanggil `await super.save(data)`.
2. **Middleware & Interceptor**: Menginjeksi token otentikasi ke header request sebelum memanggil method request HTTP bawaan `super.fetch(url, options)`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Lupa Memanggil `super.method()`**: Jika Anda berniat memperluas fungsionalitas tetapi lupa memanggil `super.method()`, logika dasar milik parent akan hilang terpotong.
- **Loop Rekursi Tak Terhingga (_Infinite Recursion_)**: Memanggil `this.methodName()` di dalam method dengan nama yang sama alih-alih `super.methodName()`. Ini akan memicu `RangeError: Maximum call stack size exceeded`.
- **Mencoba Mengakses Properti Statis via `super` di Instance Method**: Di instance method, `super.prop` mencari di `Parent.prototype`, bukan di properti statis `Parent`.

### 🌟 Best Practice

- Gunakan `super.method()` untuk menerapkan prinsip _Open/Closed Principle_ (memperluas fungsionalitas tanpa mengubah kode sumber asli parent).
- Pastikan signature parameter method anak kompatibel dengan method induk agar pengguna class tidak mengalami kebingungan (_Liskov Substitution Principle_).

---

## 5. ✍️ Latihan Mandiri

1. Buat class `Notifikasi` dengan method `kirim(pesan)`. Buat subclass `WhatsAppNotifikasi` yang menimpa method `kirim` dengan memanggil `super.kirim(pesan)` dan mencetak status "Terkirim via WhatsApp Gateway API".
2. Buat class `Diskon` dengan method `hitung(harga) { return harga; }`. Buat subclass `DiskonMember` yang memanggil `super.hitung(harga)` lalu mengurangi hasilnya sebesar 10%.
3. Buat eksperimen dengan salah memanggil `this.proses()` di dalam `proses()` pada subclass, amati error `RangeError: Maximum call stack size exceeded`, lalu perbaiki menggunakan `super.proses()`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [05 - Super Constructor](../05-super-constructor/README.md)
- ➡️ **Selanjutnya:** [07 - Getter dan Setter](../07-getter-setter/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
