# 09.4 - Destructuring Object dan Object Spread Operator

## 1. 🎯 Tujuan Belajar
- Memahami sintaks Destructuring Assignment pada Object.
- Mampu memberikan nilai default dan mengganti nama variabel (*aliasing*).
- Menguasai Object Spread Operator (`...`) untuk menyalin (*clone*) dan menggabungkan properti objek.

---

## 2. 📖 Penjelasan Konsep
Dua fitur ES6 yang paling sering digunakan dalam pengolahan data Object di industri modern adalah:

### 1. Destructuring Object
Mengekstrak properti-properti objek langsung ke dalam variabel dengan nama yang cocok:
```javascript
const { nama, email, peran = 'User' } = dataPengguna;
```
* **Aliasing (Ganti Nama)**: `{ namaPropertiLama: namaVariabelBaru }`
* **Nested Destructuring**: Mengekstrak properti dari dalam objek bertingkat secara langsung.

### 2. Object Spread Operator (`...`)
Menyalin atau menggabungkan seluruh pasangan properti objek ke dalam objek baru tanpa merusak objek aslinya:
```javascript
const objekBaru = { ...objekAwal, propertiTambahan: 123 };
```

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Destructuring Object, Aliasing & Default Value ---");
const responsServer = {
  id: 88,
  username: "jokosantoso",
  statusAkun: "Aktif"
  // fotoProfil sengaja tidak ada
};

// Ekstrak dengan ganti nama (aliasing) dan beri nilai default
const {
  username: namaUser,
  statusAkun,
  fotoProfil = "default-avatar.png"
} = responsServer;

console.log("Nama Variabel Baru :", namaUser);
console.log("Status             :", statusAkun);
console.log("Foto (Fallback)    :", fotoProfil);

console.log("\n--- 2. Destructuring Parameter Fungsi (Sangat Populer di React) ---");
function kirimEmailSelamatDatang({ namaUser, email = "support@company.com" }) {
  console.log(`Mengirim email selamat datang ke ${namaUser} (${email})...`);
}

kirimEmailSelamatDatang({ namaUser: "Budi Santoso", email: "budi@gmail.com" });

console.log("\n--- 3. Object Spread Operator (Kloning & Menimpa Properti) ---");
const pengaturanDefault = {
  tema: "light",
  notifikasi: true,
  bahasa: "id"
};

// Salin pengaturan default dan timpa tema menjadi dark (immutability)
const pengaturanKustom = {
  ...pengaturanDefault,
  tema: "dark" // Menimpa properti tema
};

console.log("Pengaturan Asli   :", pengaturanDefault);
console.log("Pengaturan Kustom :", pengaturanKustom);
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Destructuring Object, Aliasing & Default Value ---
Nama Variabel Baru : jokosantoso
Status             : Aktif
Foto (Fallback)    : default-avatar.png

--- 2. Destructuring Parameter Fungsi (Sangat Populer di React) ---
Mengirim email selamat datang ke Budi Santoso (budi@gmail.com)...

--- 3. Object Spread Operator (Kloning & Menimpa Properti) ---
Pengaturan Asli   : { tema: 'light', notifikasi: true, bahasa: 'id' }
Pengaturan Kustom : { tema: 'dark', notifikasi: true, bahasa: 'id' }
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> Destructuring object seperti **mengambil barang pesanan online dari dalam kardus paket**: daripada membawa kardus besarnya ke mana-mana, Anda cukup mengambil barang yang Anda butuhkan (buku dan kacamata) dan menyimpannya di saku Anda.

### 🏢 Real-World Use Case
1. **Props Komponen React**: Hampir 100% komponen fungsi di React menerima input props melalui destructuring: `function Tombol({ label, onClick, variant = 'primary' })`.
2. **State Updates di Redux / Zustand**: Mengupdate sebagian properti state dengan pola immutable: `return { ...state, saldo: state.saldo + action.amount }`.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Nama Variabel Destructuring Harus Cocok**: Berbeda dengan Array yang berbasis urutan posisi index, Destructuring Objek berbasis **nama kunci (*key name*)**. Jika nama kunci salah ketik, variabel akan bernilai `undefined`.

### 🌟 Best Practice
* Gunakan Destructuring pada parameter fungsi untuk menghindari pemanggilan `props.nama`, `props.email` yang berulang-ulang.
* Gunakan Object Spread Operator untuk mempertahankan prinsip *Immutability* saat memodifikasi objek.

---

## 6. ✍️ Latihan Mandiri
1. Diberikan objek `buku = { judul: 'Atomic Habits', penulis: 'James Clear', rating: 4.8 }`. Lakukan destructuring untuk mengambil `judul` dan ganti nama `penulis` menjadi `pembuat`.
2. Buat objek baru `bukuDiskon` yang menyalin seluruh properti buku tersebut dan menambahkan properti `hargaDiskon: 80000` menggunakan spread operator.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [09.3 - Keyword This](../03-keyword-this/README.md)
- ➡️ **Selanjutnya:** [09.5 - Object Lanjutan & Prototype](../05-advanced-objects/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
