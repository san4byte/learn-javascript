# 10 - Private Method

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mendefinisikan fungsi pembantu internal (_helper method_) dengan awalan tanda pagar (`#`) yang hanya bisa dipanggil dari dalam kelas itu sendiri.
> - **Kapan Digunakan**: Menyederhanakan method publik yang panjang menjadi fungsi-fungsi modular tanpa mengotori atau mengekspos detail implementasi ke antarmuka publik (_Public API_).
> - **Aturan Praktis**: Awali nama method dengan tanda `#`, contoh: `#validasiData()`, dan panggil di dalam class menggunakan `this.#validasiData()`.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep pilar OOP: **Abstraction & Encapsulation** melalui Private Method.
- Menguasai pembuatan **Private Instance Method** menggunakan awalan tanda pagar (**`#`**).
- Menguasai pembuatan **Private Accessor** (`get #properti()` dan `set #properti()`).
- Menguasai pembuatan **Private Static Method** (`static #helperMethod()`).
- Membedakan antara private method asli ES2022 dengan konvensi lawas garis bawah (`_namaMethod`).
- Memahami batasan pewarisan: Mengapa subclass tidak dapat memanggil private method superclass secara langsung.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **mesin pembakaran di bawah kap mobil**: Pengemudi hanya berinteraksi dengan antarmuka kemudi publik seperti pedal gas (`tekanGas()`) dan persneling gigi. Pengemudi tidak perlu (dan tidak boleh) menyentuh mekanisme internal pembakaran bahan bakar di dalam blok silinder (`#semprotBensin()` dan `#picuBusi()`). Jika komponen internal tersebut bisa diakses sembarangan, mesin mobil rentan rusak.

---

### 1. Tabel Ringkasan Fitur Private Method (Cheat-Sheet)

| Fitur / Variasi                      | Sintaks                        | Konteks Pemanggilan     | Aksesibilitas Luar                               |
| :----------------------------------- | :----------------------------- | :---------------------- | :----------------------------------------------- |
| **Private Instance Method**          | `#namaMethod(...) {}`          | `this.#namaMethod(...)` | Ditolak keras (_SyntaxError_).                   |
| **Private Accessor (Getter/Setter)** | `get #prop()` / `set #prop(v)` | `this.#prop`            | Ditolak keras (_SyntaxError_).                   |
| **Private Static Method**            | `static #helper(...) {}`       | `Class.#helper(...)`    | Hanya di dalam method statis kelas bersangkutan. |
| **Akses Subclass**                   | `subInstance.#method()`        | Tidak diwariskan        | Ditolak (_SyntaxError_).                         |
| **Konvensi Lawas (`_`)**             | `_helper() {}`                 | `this._helper()`        | Publik semu (tetap bisa dipanggil dari luar).    |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja private method beserta skenario kasusnya:

---

#### 1. Sintaks Dasar Private Instance Method (`#method()`)

Private method didefinisikan dengan menyematkan tanda pagar `#` tepat sebelum nama fungsinya:

```javascript
class Pengguna {
  #formatNama(nama) {
    return nama.trim().toUpperCase();
  }

  sapa(nama) {
    // Memanggil private method dari dalam method publik:
    return `Halo, ${this.#formatNama(nama)}!`;
  }
}

const user = new Pengguna();
console.log(user.sapa('   joko  ')); // "Halo, JOKO!"
// user.#formatNama("joko"); // 💥 SyntaxError!
```

---

#### 2. Private Accessor: Private Getter dan Setter

Anda juga dapat membuat getter dan setter privat untuk memvalidasi variabel internal tanpa membuka accessor tersebut ke publik:

```javascript
class Sensor {
  #nilai = 0;

  get #nilaiTervalidasi() {
    return this.#nilai;
  }

  set #nilaiTervalidasi(v) {
    if (v < 0) throw new Error('Nilai tidak boleh negatif');
    this.#nilai = v;
  }

  update(v) {
    this.#nilaiTervalidasi = v; // Menggunakan private setter
  }
}
```

---

#### 3. Private Static Method (`static #method()`)

Ketika Anda membutuhkan helper function untuk operasi statis yang tidak boleh diketahui oleh modul lain:

```javascript
class FormatUtil {
  static formatJson(data) {
    const bersih = this.#sanitasi(data);
    return JSON.stringify(bersih);
  }

  static #sanitasi(data) {
    // Helper statis internal
    delete data.password;
    return data;
  }
}

console.log(FormatUtil.formatJson({ user: 'joko', password: '123' }));
// FormatUtil.#sanitasi // 💥 SyntaxError!
```

---

#### 4. Perbedaan dengan Konvensi Underscore (`_method()`)

Sebelum ES2022, programmer menggunakan konvensi `_helper()` sebagai penanda bahwa method tersebut jangan disentuh. Namun cara ini tidak memiliki proteksi bahasa:

```javascript
// Konvensi Lawas:
class Lawas {
  _rahasia() {
    return 'bisa diakses siapa saja';
  }
}
new Lawas()._rahasia(); // ❌ Masih bisa dipanggil dari luar!

// Standar Modern:
class Modern {
  #rahasia() {
    return 'aman 100%';
  }
}
// new Modern().#rahasia(); // ✅ Dicegah oleh runtime JavaScript!
```

---

#### 5. Batasan Akses pada Subclass (Inheritance Boundary)

Subclass tidak dapat memanggil private method parent secara langsung menggunakan `this.#methodParent()`. Jika subclass membutuhkan bantuan logika tersebut, induk harus membungkusnya dalam method publik:

```javascript
class Induk {
  #helperInduk() {
    return 'Logika privat induk';
  }

  panggilHelper() {
    return this.#helperInduk(); // Menjadi gerbang bagi subclass
  }
}

class Anak extends Induk {
  jalankan() {
    // return this.#helperInduk(); // 💥 SyntaxError!
    return this.panggilHelper(); // ✅ Sah dan aman
  }
}
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep private method di atas—mulai dari pemecahan logika kompleks, private getter/setter, private static helper, perbandingan dengan konvensi lawas, hingga batasan pewarisan subclass—telah dirangkum dalam script laboratorium terpadu:

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 02-oop/10-private-method/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Sistem Login Keamanan**: Memecah alur login menjadi helper privat: `#cekPercobaanGagal()`, `#cocokkanHash()`, dan `#kunciAkun()`.
2. **Konektor Pembayaran**: Method publik `checkout()` memanggil rangkaian private method: `#validasiPayload()`, `#tandaTanganiRequest()`, dan `#kirimKeGateway()`.
3. **Normalisasi Data**: Membersihkan format input (seperti membersihkan spasi, karakter khusus, dan hashing string) sebelum disimpan ke memori atau database.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mencoba Meng-Override Private Method**: Karena private method tidak berada di prototype dan tidak diwariskan, mendeklarasikan `#method()` bernama sama di subclass bukanlah overriding, melainkan dua method independen yang berbeda.
- **Memanggil dari Subclass**: Mengira `super.#method()` atau `this.#method()` milik parent bisa dipanggil di child class.

### 🌟 Best Practice

- Pertahankan _Public API_ sekecil mungkin (_Minimal Surface Area_). Apa pun yang tidak perlu dipanggil oleh pengguna luar harus dijadikan private.
- Gunakan private method untuk menghindari duplikasi kode (_DRY_) di dalam internal class.

---

## 5. ✍️ Latihan Mandiri

1. Buat class `KalkulatorKredit` dengan method publik `hitungCicilan(pokok, bulan)`. Buat private method `#hitungBunga(pokok, bulan)` yang menghitung bunga majemuk secara internal.
2. Buat class `PengacakKupon` dengan private static method `static #generateRandomChars(panjang)` dan public static method `buatKupon()`.
3. Tulis kode yang mencoba memanggil `#privateMethod()` dari luar class, amati pesan error spesifik yang muncul di terminal, dan jelaskan mengapa error tersebut berupa `SyntaxError`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [09 - Private Class Field](../09-private-class-field/README.md)
- ➡️ **Selanjutnya:** [11 - Operator instanceof](../11-instanceof-operator/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
