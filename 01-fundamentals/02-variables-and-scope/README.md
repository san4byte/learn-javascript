# 02 - Variabel dan Scope (var, let, const, Hoisting & TDZ)

## 1. 🎯 Tujuan Belajar
- Memahami perbedaan fundamental antara deklarasi `var`, `let`, dan `const`.
- Memahami konsep Hoisting dan Temporal Dead Zone (TDZ).
- Memahami perbedaan Function Scope vs Block Scope.
- Mengetahui sifat mutabilitas pada `const` untuk tipe data referensi (Array dan Objek).

---

## 2. 📖 Penjelasan Konsep
Variabel adalah wadah penyimpanan nilai di dalam memori komputer. Di JavaScript modern, kita memiliki tiga cara mendeklarasikannya:

### Perbandingan 3 Deklarasi:

| Fitur | `var` (ES5 / Legacy) | `let` (Modern ES6) | `const` (Modern ES6) |
| :--- | :--- | :--- | :--- |
| **Scope** | *Function Scope* | *Block Scope* `{}` | *Block Scope* `{}` |
| **Reassign (Ubah Nilai)** | Ya | Ya | **Tidak Bisa** |
| **Redeklarasi** | Ya (Rawan Bug) | Tidak Bisa | Tidak Bisa |
| **Hoisting** | Ya (Inisialisasi `undefined`) | Ya (Masuk TDZ / Error) | Ya (Masuk TDZ / Error) |

### 🧠 Diagram Visual: Hoisting & Temporal Dead Zone (TDZ)

```text
  Alur Eksekusi Kode:
  
  [Baris 1] console.log(nama);   <--- TDZ (Temporal Dead Zone) let & const
  [Baris 2]                           (Mengakses di sini = ReferenceError!)
  [Baris 3] let nama = "Joko";   <--- Titik Deklarasi & Inisialisasi
  [Baris 4] console.log(nama);   <--- Zona Aman (Akses normal: "Joko")
  
  Bandingkan dengan var:
  [Baris 1] console.log(umur);   <--- Hoisting var menginisialisasi dengan undefined!
  [Baris 2] var umur = 25;       <--- Baru diisi nilai 25 di baris ini
```

### Block Scope `{}`:
Kode yang berada di dalam tanda kurung kurawal `{}` (seperti di dalam `if`, `for`, atau `while`) membentuk sebuah *Block Scope*. Variabel yang dibuat dengan `let` dan `const` tidak akan bocor ke luar blok tersebut.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Hoisting var vs TDZ let ---");
console.log("Nilai variabelA (var) sebelum deklarasi:", variabelA); // undefined (karena di-hoist)
var variabelA = "Saya dideklarasikan dengan var";

try {
  // Mengakses variabelB di sini akan melempar ReferenceError (Temporal Dead Zone)
  // console.log(variabelB);
  let variabelB = "Saya aman dengan let";
  console.log("Nilai variabelB (let):", variabelB);
} catch (err) {
  console.error("TDZ Error:", err.message);
}

console.log("\n--- 2. Block Scope let & const vs Function Scope var ---");
if (true) {
  var bocorKeluar = "var bisa diakses di luar if blok!";
  let amanDiDalam = "let terkunci di dalam blok ini saja";
  const jugaAman = "const juga terkunci di dalam blok ini";
}

console.log("Akses luar:", bocorKeluar); // Berhasil diakses
// console.log(amanDiDalam); // ReferenceError: amanDiDalam is not defined

console.log("\n--- 3. Mutabilitas const pada Objek & Array ---");
// const mengunci referensi memori, BUKAN isi propertinya!
const dataSiswa = {
  nama: "Joko Santoso",
  angkatan: 2024
};

// Mengubah isi properti DIPERBOLEHKAN:
dataSiswa.angkatan = 2025;
dataSiswa.jurusan = "Teknik Informatika";
console.log("Objek setelah dimutasi:", dataSiswa);

const daftarNilai = [80, 90];
daftarNilai.push(95); // Menambahkan elemen DIPERBOLEHKAN
console.log("Array setelah dimutasi :", daftarNilai);

// Yang DILARANG adalah me-reassign referensinya ke objek baru:
// dataSiswa = { nama: "Budi" }; // TypeError: Assignment to constant variable.
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Hoisting var vs TDZ let ---
Nilai variabelA (var) sebelum deklarasi: undefined
Nilai variabelB (let): Saya aman dengan let

--- 2. Block Scope let & const vs Function Scope var ---
Akses luar: var bisa diakses di luar if blok!

--- 3. Mutabilitas const pada Objek & Array ---
Objek setelah dimutasi: { nama: 'Joko Santoso', angkatan: 2025, jurusan: 'Teknik Informatika' }
Array setelah dimutasi : [ 80, 90, 95 ]
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> `var` seperti **rumah tanpa pagar**: siapapun di luar ruangan bisa melihat dan mengubah perabot di dalamnya secara tidak sengaja. Sedangkan `let` dan `const` seperti **kamar tidur pribadi terkunci**: apapun yang Anda taruh di dalam kamar hanya bisa diakses oleh orang di dalam kamar tersebut.

### 🏢 Real-World Use Case
1. **Looping Asinkron**: Menggunakan `for (let i = 0; i < 5; i++)` memastikan nilai `i` terisolasi di setiap putaran loop, mencegah bug klasik di mana `setTimeout` di dalam loop selalu mencetak angka 5 jika memakai `var`.
2. **Definisi Konfigurasi**: Menggunakan `const` untuk URL API, Secret Key, atau konstanta konfigurasi agar tidak sengaja tertimpa di tengah jalannya aplikasi.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Mengira const Membuat Objek Menjadi Beku (Immutable)**: `const` hanya mencegah variabel menunjuk ke alamat memori baru. Jika Anda ingin isi objek benar-benar tidak bisa diubah sama sekali, gunakan `Object.freeze(obj)`.
* **Menggunakan var di Proyek Baru**: Penggunaan `var` sudah dianggap usang (*deprecated practice*) di industri modern karena sering menimbulkan bug samar akibat hoisting dan kebocoran scope.

### 🌟 Best Practice
* Gunakan prinsip default: **Gunakan `const` untuk semua variabel secara default**.
* Hanya ganti ke **`let`** jika nilai variabel tersebut memang direncanakan untuk diubah kembali (seperti counter loop atau flag penanda).
* **Hindari `var` 100%** di semua baris kode modern Anda.

---

## 6. ✍️ Latihan Mandiri
1. Buatlah sebuah perulangan `for` dari 1 sampai 3 menggunakan `let`. Di dalam loop, panggil `setTimeout` berdurasi 100ms untuk mencetak nilai variabel counter tersebut.
2. Buat objek `profil` menggunakan `const`, lalu bekukan objek tersebut menggunakan `Object.freeze()`. Amati apa yang terjadi saat Anda mencoba mengubah salah satu propertinya.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [01 - Popup Box](../01-popup-boxes/README.md)
- ➡️ **Selanjutnya:** [03 - Template Literals & String Interpolation](../03-template-literals/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
