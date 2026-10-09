# 07 - Aggregating Modules (Re-Export / Barrel Pattern)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengumpulkan, menyatukan, dan mengekspor ulang (_re-export_) berbagai komponen dari modul terpisah melalui satu titik masuk tunggal (_barrel file_ / `index.js`).
> - **Kapan Digunakan**: Menyederhanakan struktur impor bagi konsumen folder modul sehingga path berkas impor tidak berceceran ke berbagai subdirektori.
> - **Aturan Praktis**: Gunakan sintaks `export { nama } from './file.js'` atau `export * from './file.js'`; berkas agregasi berfungsi sebagai _direct passthrough_ tanpa memasukkan variabel ke scope lokal.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep **Module Aggregation** dan **Re-exporting** di JavaScript modern.
- Menguasai teknik **Barrel File Pattern** menggunakan berkas gerbang `index.js`.
- Menguasai berbagai variasi sintaks `export ... from`:
  - Named Re-export langsung.
  - Re-export dengan Alias (`as`).
  - Re-export Default dari modul lain sebagai Named Export.
  - Wildcard Re-export (`export * from`).
  - Namespace Re-export (`export * as Namespace from`).
- Memahami isolasi scope re-export (_Direct Passthrough_: entitas tidak tersedia di dalam badan berkas barrel itu sendiri).
- Mengetahui dampak arsitektural barrel file terhadap pemeliharaan proyek dan _tree-shaking_.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Seperti **meja resepsionis di lobi kantor gedung pencakar langit**: Tamu atau kurir dari luar tidak perlu repot naik turun tangga mencari ruangan tersembunyi di lantai 2, 4, dan 7. Tamu cukup mendatangi meja resepsionis di lantai 1 (`index.js`). Resepsionis memiliki wewenang untuk menghubungkan (_re-export_) dan menyerahkan semua layanan dari departemen personalia (`user.js`) dan departemen keamanan (`auth.js`) langsung di satu meja depan.

---

### 1. Tabel Ringkasan Fitur Aggregating Modules (Cheat-Sheet)

| Pola Re-export          | Sintaks                               | Perilaku & Manfaat                          | Ketersediaan di `index.js`  |
| :---------------------- | :------------------------------------ | :------------------------------------------ | :-------------------------- |
| **Named Re-export**     | `export { a, b } from './sub.js'`     | Meneruskan fungsi spesifik                  | Tidak (Direct Passthrough). |
| **Alias Re-export**     | `export { a as bar } from './sub.js'` | Mengubah nama publik saat diteruskan        | Tidak.                      |
| **Default to Named**    | `export { default as Mod } from ...`  | Menjadikan default modul lain sebagai named | Tidak.                      |
| **Wildcard All**        | `export * from './sub.js'`            | Meneruskan seluruh named exports            | Tidak.                      |
| **Namespace Re-export** | `export * as Tools from './sub.js'`   | Membungkus seluruh ekspor ke satu objek     | Tidak.                      |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Skenario Kasus

Berikut adalah rincian lengkap cara kerja aggregating modules beserta skenario kasusnya:

---

#### 1. Sintaks Named Re-export Langsung

Alih-alih menulis `import { user } from './user.js'` lalu `export { user }`, ES Modules menyediakan sintaks gabungan _one-liner_:

```javascript
// index.js
export { currentUser } from "./user.js";
export { isAuthenticated } from "./auth.js";
```

---

#### 2. Re-export dengan Alias Menggunakan Kata Kunci `as`

Anda dapat mengganti nama komponen saat mengekspornya kembali agar lebih serasi dengan nama publik paket:

```javascript
// index.js
export { userRole as role } from "./user.js";
```

---

#### 3. Re-export Default dari Modul Lain sebagai Named Export

Jika sebuah submodul memiliki `export default`, Anda dapat mengekspornya kembali sebagai _named export_ berlabel jelas:

```javascript
// index.js
// Mengubah default export di user.js menjadi named export 'getUserAvatar'
export { default as getUserAvatar } from "./user.js";
```

---

#### 4. Wildcard Re-export Seluruh Named Export (`export *`)

Mengekspor seluruh named export yang ada di modul target tanpa perlu menyebutkan namanya satu per satu:

```javascript
// index.js
export * from "./auth.js"; // Meneruskan semua named export dari auth.js
```

> _Catatan_: `export *` **tidak** meneruskan `default export` dari file target.

---

#### 5. Re-export Sebagai Namespace Object (`export * as`)

Sejak ES2020, Anda dapat membungkus seluruh isi modul lain ke dalam sebuah objek namespace langsung di baris re-export:

```javascript
// index.js
export * as AuthTools from "./auth.js";

// File konsumen:
// import { AuthTools } from './index.js';
// AuthTools.checkPermission();
```

---

#### 6. Pola Desain Barrel File (`index.js` sebagai Fasade Publik)

Dengan pola Barrel File, konsumen luar cukup mengimpor semua kebutuhan dari satu jalur bersih:

```javascript
// SEBELUM (Jalur berantakan & panjang):
import { currentUser } from "./components/user/user.js";
import { isAuthenticated } from "./components/auth/auth.js";

// SESUDAH (Satu jalur pintu masuk):
import { currentUser, isAuthenticated } from "./components/index.js";
```

---

#### 7. Isolasi Ruang Lingkup Re-export (Direct Passthrough)

Penting diingat bahwa perintah `export { x } from './y.js'` **tidak mendeklarasikan** variabel `x` di dalam file barrel tersebut:

```javascript
// index.js
export { currentUser } from "./user.js";

// ❌ ILEGAL:
// console.log(currentUser);
// 💥 ReferenceError: currentUser is not defined!
```

> Karena sifatnya hanya mem-bypass (_forwarding_), mesin JavaScript tidak memuat `currentUser` ke memory scope lokal berkas `index.js`.

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep agregasi modul di atas—mulai dari named re-export, alias re-export, default-to-named re-export, wildcard forwarding, hingga namespace re-export—telah dirangkum dalam script laboratorium terpadu:

📁 File: [`example.js`](./example.js), [`index.js`](./index.js), [`user.js`](./user.js), [`auth.js`](./auth.js)

```bash
# Jalankan langsung dari terminal:
node 04-modules/07-aggregating-modules/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Paket Komponen UI (Design System)**: Folder `src/components/` memiliki `index.js` yang mere-export `Button`, `Modal`, `Dropdown`, dan `Card`.
2. **Library NPM Package**: File `index.js` di root package mengekspos Public API resmi dari puluhan modul internal di folder `src/`.
3. **Penyatuan Layer Service**: Menggabungkan `AuthService`, `PaymentService`, dan `OrderService` di bawah satu folder `services/index.js`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mengharapkan Variabel Ada di File Barrel**: Mengira setelah menulis `export { data } from './data.js'` Anda bisa langsung membaca `console.log(data)` di file yang sama.
- **Circular Re-export**: Dua file barrel yang saling mere-export satu sama lain dapat menciptakan siklus tak berujung (_circular dependency loop_).

### 🌟 Best Practice

- Gunakan barrel file (`index.js`) secara selektif di setiap batas domain modul utama.
- Jaga file `index.js` tetap murni berisi pernyataan re-exporting tanpa menaruh logika komputasi atau inisialisasi aplikasi di dalamnya.

---

## 5. ✍️ Latihan Mandiri

1. Buat folder simulasi `layanan/` dengan file `email.js` (fungsi `kirimEmail`) dan `notifikasi.js` (fungsi `kirimPushNotif`).
2. Buat file `layanan/index.js` yang mere-export kedua fungsi tersebut dalam satu pintu masuk.
3. Impor kedua fungsi dalam satu baris pernyataan di `example.js` dan jalankan verifikasi eksekusinya.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [06 - Module Object](../06-module-object/README.md)
- ➡️ **Selanjutnya:** [08 - Dynamic Module Loading](../08-dynamic-module-loading/README.md)
- 🏠 **Daftar Isi Modul 04:** [README Modul 04](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
