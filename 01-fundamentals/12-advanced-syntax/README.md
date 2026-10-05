# 12 - Sintaks Modern ES Lanjutan (Optional Chaining, Nullish Coalescing & Strict Mode)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Menghindari error crash pada properti bersarang dengan Optional Chaining (`?.`), menetapkan nilai default aman dengan Nullish Coalescing (`??`), dan mengunci kode berkualitas dengan Strict Mode (`"use strict"`).
> * **Kapan Digunakan**: Mengolah data respons API yang tidak lengkap atau propertinya opsional tanpa rentetan `if` bertingkat.
> * **Aturan Praktis**: Gunakan `??` alih-alih `||` jika angka `0` atau string kosong `""` adalah nilai valid yang tidak boleh ditimpa fallback.

## 1. 🎯 Tujuan Belajar
- Menghindari bug *TypeError: Cannot read properties of undefined* dengan **Optional Chaining (`?.`)**.
- Membedakan operator logika OR (`||`) dengan **Nullish Coalescing Operator (`??`)**.
- Mengaktifkan **Strict Mode (`"use strict"`)** untuk mencegah variabel global tak disengaja.
- Menggunakan kata kunci `debugger` saat mencari bug melalui developer tools.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **pohon silsilah keluarga atau rantai kunci pintu**:
> - Jika ada rumah yang tidak memiliki pintu belakang, mencoba mendobrak kuncinya akan membuat alarm berbunyi keras (crash *TypeError*).
> - **Optional Chaining (`?.`)** seperti mengetuk pintu secara sopan: jika pintu tersebut tidak ada, Anda langsung melangkah mundur dengan tenang (`undefined`) tanpa merusak apa pun.
> - **Nullish Coalescing (`??`)** seperti jaring pengaman yang hanya menangkap jika kotak benar-benar kosong (`null` / `undefined`), bukan saat kotak berisi koin bernilai 0.

### 1. Optional Chaining (`?.`)
Sebelum fitur ini hadir, mengakses properti bersarang memerlukan pemeriksaan berulang yang melelahkan:
`user && user.profile && user.profile.address && user.profile.address.city`.
Dengan `?.`, JavaScript akan segera berhenti dan mengembalikan `undefined` jika salah satu referensi di sebelah kiri bernilai `null` atau `undefined`:
`user?.profile?.address?.city`.

### 2. Nullish Coalescing Operator (`??`)
Operator `||` menganggap semua nilai falsy (`0`, `""`, `false`, `null`, `undefined`) sebagai pemicu fallback:
```javascript
let totalSkor = 0;
let nilai = totalSkor || 10; // Hasilnya 10! (Keliru, padahal skor 0 adalah sah)
```
Operator `??` **HANYA** memicu nilai default jika sisi kiri bernilai **`null`** atau **`undefined`**:
```javascript
let nilai = totalSkor ?? 10; // Hasilnya 0 (Benar!)
```

### 3. Strict Mode (`"use strict"`)
Mencegah bug konyol JavaScript lama, seperti:
- Menulis variabel tanpa deklarasi (`nama = "Joko"`) langsung melempar `ReferenceError`.
- Mencegah duplikasi nama parameter pada fungsi.
- Menolak penugasan pada properti *read-only*.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Nullish Coalescing, Optional Chaining, Strict Mode & Debugger
'use strict'; // Mengaktifkan strict mode untuk mencegah penulisan kode sembarangan

// 1. Optional Chaining (?.)
const user = {
  profile: {
    name: 'Joko',
    address: {
      city: 'Jakarta'
    }
  }
};

// Mengakses properti bersarang tanpa khawatir error TypeError
console.log('Kota user:', user?.profile?.address?.city); // Jakarta
console.log('Kode pos :', user?.profile?.contact?.zipCode); // undefined (tidak crash!)

// 2. Nullish Coalescing Operator (??)
let jumlahPengunjung = 0;

// Menggunakan OR (||): 0 dianggap falsy, sehingga keliru memilih default!
const hasilOR = jumlahPengunjung || 10;
console.log('Hasil dengan || (keliru) :', hasilOR); // 10

// Menggunakan Nullish Coalescing (??): 0 dipertahankan karena bukan null/undefined
const hasilNullish = jumlahPengunjung ?? 10;
console.log('Hasil dengan ?? (benar)  :', hasilNullish); // 0

// 3. Debugger Statement
function hitungTotal(harga, kuantitas) {
  // debugger; // Uncomment saat debugging di Chrome DevTools / VS Code Debugger
  return harga * kuantitas;
}

console.log('Total belanja:', hitungTotal(15000, 3));
```

---

## 4. 🖥️ Output yang Diharapkan
```text
Kota user: Jakarta
Kode pos : undefined
Hasil dengan || (keliru) : 10
Hasil dengan ?? (benar)  : 0
Total belanja: 45000
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
1. **Mengonsumsi Respons REST API**: Data profil pengguna dari server sering kali opsional (misal user belum mengisi alamat pengiriman). Menggunakan `order.shipping?.address?.street ?? "Alamat belum diatur"` membuat frontend tahan banting dari crash.
2. **Pengaturan Konfigurasi Default**: Nilai konfigurasi game seperti `volumeLevel = config.volume ?? 100`. Jika user sengaja membisukan suara (`volume = 0`), nilainya tidak akan dipaksa kembali ke 100.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Menggabungkan `??` dengan `&&` atau `||` tanpa tanda kurung**: Menulis `a || b ?? c` akan memicu `SyntaxError`. JavaScript mewajibkan tanda kurung eksplisit: `(a || b) ?? c`.
* **Menggunakan `?.` secara berlebihan**: Jangan membubuhkan `?.` di semua tempat tanpa alasan; jika suatu properti seharusnya memang wajib ada, biarkan error muncul agar Anda tahu ada anomali data.

### 🌟 Best Practice
* Selalu pasang `"use strict"` di baris paling pertama file JS jadul (modul ES6 sudah otomatis mengaktifkan strict mode).
* Gunakan `??` sebagai pilihan utama saat menangani default fallback value untuk data numerik dan teks.

---

## 6. ✍️ Latihan Mandiri
1. Buat objek `pelanggan` yang tidak memiliki properti `telepon`. Gunakan Optional Chaining dan Nullish Coalescing untuk mencetak `"Nomor tidak terdaftar"` jika nomor telepon tidak ditemukan.
2. Ubah variabel `saldo = 0` dan buktikan perbedaan hasil antara `saldo || 50000` dengan `saldo ?? 50000`.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [11 - Tipe Data Lanjutan](../11-data-types-and-operators/README.md)
- ➡️ **Selanjutnya:** [01 - Modul 02 (OOP)](../../02-oop/01-constructor-function/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
