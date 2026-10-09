# 13 - Static Method

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mendefinisikan method yang menempel langsung pada class dan dapat dipanggil tanpa harus membuat instance objek baru menggunakan operator `new`.
> - **Kapan Digunakan**: Membuat fungsi utilitas murni (_pure utility functions_), konverter format, atau _factory methods_ untuk mencetak objek dengan parameter tertentu.
> - **Aturan Praktis**: Awali deklarasi dengan kata kunci `static`: `static namaMethod(param) { ... }`.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep **Static Method** di JavaScript Class.
- Mengetahui cara memanggil static method langsung dari nama class tanpa instansiasi objek.
- Memahami perilaku kata kunci **`this`** di dalam static method (merujuk ke constructor class, bukan instance).
- Menerapkan pola desain **Factory Method** untuk menciptakan instance objek dengan cara yang ekspresif.
- Menguasai pemanggilan antar static method di dalam class yang sama.
- Memahami pewarisan static method ke subclass (_Static Method Inheritance_) dan pemanggilan `super.staticMethod()`.
- Mengetahui penyebab error saat memanggil static method dari instance objek (`TypeError: ... is not a function`).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **kalkulator saku atau pisau lipat**: Anda tidak perlu membangun satu rumah atau memesan pabrik utuh hanya untuk meminjam gunting kecil atau menghitung perkalian sederhana. Anda cukup mengambil alat utilitas tersebut dan langsung menggunakannya. Fungsi matematika bawaan seperti `Math.floor()` atau `Number.parseInt()` bekerja persis seperti ini.

---

### 1. Tabel Ringkasan Fitur Static Method (Cheat-Sheet)

| Fitur / Pola               | Sintaks                   | Cara Panggil          | Nilai `this` Internal                            |
| :------------------------- | :------------------------ | :-------------------- | :----------------------------------------------- |
| **Utilitas Murni**         | `static sum(a, b)`        | `MathUtils.sum(2, 3)` | Merujuk ke constructor class.                    |
| **Factory Method**         | `static create(...)`      | `User.createGuest()`  | Mengembalikan `new this(...)`.                   |
| **Panggilan Antar Method** | `this.helperMethod()`     | Internal class        | Memanggil static method lain di kelas yang sama. |
| **Static Super**           | `super.parentStatic()`    | Subclass static       | Mengeksekusi static method milik superclass.     |
| **Akses via Instance**     | `instance.staticMethod()` | Ilegal                | Melempar `TypeError: is not a function`.         |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja static method beserta skenario kasusnya:

---

#### 1. Sintaks Dasar Static Method

Static method dideklarasikan menggunakan kata kunci `static` sebelum nama method:

```javascript
class MathUtils {
  static sum(a, b) {
    return a + b;
  }
}

// Dipanggil langsung lewat nama class tanpa "new":
console.log(MathUtils.sum(10, 20)); // 30
```

---

#### 2. Pemanggilan Tanpa Instansiasi Objek

Static method tidak memerlukan pembuatan objek baru di memori melalui `new`. Ini menghemat waktu dan beban alokasi memori (_garbage collector_):

```javascript
class Converter {
  static kmToMeter(km) {
    return km * 1000;
  }
}

console.log(Converter.kmToMeter(5)); // 5000
```

---

#### 3. Konteks Kata Kunci `this` dalam Static Method

Di dalam method statis, nilai `this` merujuk ke **Class constructor itu sendiri**, bukan ke instance objek:

```javascript
class DemoThis {
  static nama = 'DemoThis';

  static cek() {
    console.log(this === DemoThis); // true
    console.log(this.nama); // "DemoThis"
  }
}

DemoThis.cek();
```

---

#### 4. Pola Desain Factory Method

_Factory Method_ adalah pola populer di mana static method bertanggung jawab membuat dan mengembalikan instance baru dengan konfigurasi khusus:

```javascript
class Pengguna {
  constructor(nama, role) {
    this.nama = nama;
    this.role = role;
  }

  // Factory method untuk membuat tamu:
  static buatGuest() {
    return new this('Tamu Anonim', 'GUEST');
  }

  // Factory method dari parsing JSON:
  static dariJSON(jsonStr) {
    const data = JSON.parse(jsonStr);
    return new this(data.nama, data.role);
  }
}

const guest = Pengguna.buatGuest();
console.log(guest.nama); // "Tamu Anonim"
```

---

#### 5. Pemanggilan Antar Static Method Menggunakan `this`

Satu static method dapat memanggil static method lainnya di class yang sama menggunakan `this.namaMethod()`:

```javascript
class Statistika {
  static total(...angka) {
    return angka.reduce((a, b) => a + b, 0);
  }

  static rataRata(...angka) {
    if (angka.length === 0) return 0;
    // Memanggil static method total via this:
    return this.total(...angka) / angka.length;
  }
}

console.log(Statistika.rataRata(10, 20, 30)); // 20
```

---

#### 6. Pewarisan Static Method dan Kata Kunci `super`

Sama seperti static field, static method diwarisi oleh subclass, dan dapat dipanggil menggunakan `super.method()`:

```javascript
class BaseApiClient {
  static getEndpoint() {
    return '/api/v1';
  }
}

class UserApiClient extends BaseApiClient {
  static getEndpoint() {
    return `${super.getEndpoint()}/users`;
  }
}

console.log(UserApiClient.getEndpoint()); // "/api/v1/users"
```

---

#### 7. Penanganan TypeError Saat Dipanggil dari Instance

Mencoba memanggil static method dari objek hasil `new` akan memicu error runtime karena method tersebut tidak berada di rantai prototype instance:

```javascript
const obj = new MathUtils();

try {
  obj.sum(1, 2);
} catch (err) {
  console.log(err.name); // "TypeError"
  console.log(err.message); // "obj.sum is not a function"
}
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep static method di atas—mulai dari pembuatan fungsi utilitas murni, inspeksi konteks `this`, pola desain factory method, delegasi antar static method, pewarisan statis dengan `super`, hingga penanganan TypeError pemanggilan instance—telah dirangkum dalam script laboratorium terpadu:

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 02-oop/13-static-method/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Parser & Serializer**: Class `JSONSerializer.serialize(obj)` atau `DateHelper.toIndonesianFormat(date)`.
2. **Factory Constructor Alternatif**: `DateTime.fromISO(str)`, `User.createAdmin(email)`.
3. **Database Connection Pool**: `Database.connect(connectionString)` yang mengembalikan pool koneksi global tanpa perlu membuat instance manual setiap kali query.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mencoba Mengakses Properti Instance**: Menulis `this.nama` di dalam static method dengan harapan membaca nama milik user, yang akan menghasilkan `undefined` karena instance-nya belum pernah ada.
- **Memanggil dari Instance**: Memanggil `user.buatGuest()` alih-alih `Pengguna.buatGuest()`.

### 🌟 Best Practice

- Gunakan static method jika logika fungsi bersifat murni (_pure function_) dan tidak membutuhkan akses ke variabel `this` instance.
- Manfaatkan pola factory method untuk memberikan nama konstruksi yang lebih deskriptif daripada mengandalkan satu `constructor` dengan banyak parameter bercabang.

---

## 5. ✍️ Latihan Mandiri

1. Buat class `KalkulatorSuhu` dengan static methods: `celsiusToFahrenheit(c)` dan `fahrenheitToCelsius(f)`. Uji kedua fungsi tersebut langsung dari nama class.
2. Buat class `AkunPengguna` dengan constructor `(username, email, role)`. Buat dua factory static method: `buatAdmin(username, email)` dan `buatMember(username, email)`.
3. Buat subclass yang memperluas static method superclass menggunakan `super.namaStaticMethod()`, lalu cetak hasil gabungannya ke konsol.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [12 - Static Field](../12-static-field/README.md)
- ➡️ **Selanjutnya:** [14 - Error Handling Class](../14-error-handling-class/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
