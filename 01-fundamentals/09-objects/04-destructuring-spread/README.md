# 09.4 - Destructuring Object dan Object Spread Operator

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengekstrak data properti objek langsung ke dalam variabel mandiri (_Destructuring_) atau menyebarkan properti objek ke objek baru (_Spread Operator_).
> - **Kapan Digunakan**: Mengambil data payload dari respons API, menerima _props_ komponen UI, memperbarui state immutabel di Redux/Zustand, serta menggabungkan konfigurasi objek.
> - **Aturan Praktis**: Gunakan penamaan alias (`{ propLama: namaBaru }`) jika nama properti bertabrakan dengan variabel lain. Selalu manfaatkan nilai default (`{ foto = 'default.png' }`) untuk mengantisipasi nilai `undefined`.

---

## 1. 🎯 Tujuan Belajar

- Menguasai sintaks _Destructuring Assignment_ berbasis nama kunci properti objek.
- Mampu mengganti nama variabel (_Aliasing_) dan menentukan nilai cadangan bawaan (_Default Value_).
- Mengekstrak data dari objek bersarang (_Nested Destructuring_) secara bersih dalam satu baris.
- Menguasai teknik destructuring langsung pada daftar parameter fungsi.
- Memahami pemisahan properti dengan _Rest Property_ (`...rest`).
- Menggabungkan dan menimpa (_override_) properti objek menggunakan _Object Spread Operator_ (`...`).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **Destructuring Object** seperti **membongkar paket kardus belanja online**: Daripada memindahkan seluruh kardus besar ke meja kerja, Anda hanya mengambil dua barang yang Anda perlukan saja (laptop dan kacamata) langsung ke saku Anda.
> - **Object Spread Operator** seperti **menyalin lembar formulir fotokopi**: Anda mengambil formulir profil dasar, menyalin seluruh isinya ke lembar baru, lalu mencoret dan memperbarui kolom nomor HP dengan nomor baru tanpa mencoret lembar dokumen aslinya.

---

### Tabel Perbandingan Fitur Destructuring vs Object Spread

| Fitur                       | Sintaks Contoh                             | Wilayah Penulisan  | Hasil / Fungsi                                      |
| :-------------------------- | :----------------------------------------- | :----------------- | :-------------------------------------------------- |
| **Destructuring Ekstraksi** | `const { nama, umur } = user;`             | Sisi kiri (`LHS`)  | Membuat variabel baru dari properti objek           |
| **Aliasing (Ganti Nama)**   | `const { username: idUser } = user;`       | Sisi kiri (`LHS`)  | Mengambil properti `username` ke variabel `idUser`  |
| **Default Fallback**        | `const { role = 'User' } = user;`          | Sisi kiri (`LHS`)  | Menggunakan nilai default jika properti `undefined` |
| **Rest Property**           | `const { id, ...profil } = user;`          | Sisi kiri (`LHS`)  | Mengumpulkan sisa properti ke dalam objek baru      |
| **Object Spread**           | `const update = { ...user, aktif: true };` | Sisi kanan (`RHS`) | Menyalin seluruh properti dan menimpa sebagian      |

---

### Pembahasan Mendalam Fitur & API

#### 1. Sintaks Destructuring Assignment Objek

Nama variabel yang dibuat harus sesuai dengan nama kunci di dalam objek:

```javascript
const user = { nama: "Joko", kota: "Jakarta" };
const { nama, kota } = user;
console.log(nama); // 'Joko'
```

#### 2. Memberikan Nama Baru Variabel (Aliasing)

Gunakan titik dua (`:`) untuk memetakan nama properti asli ke nama variabel baru:

```javascript
const { nama: namaLengkap } = user;
console.log(namaLengkap); // 'Joko'
```

#### 3. Nilai Cadangan Bawaan (Default Values)

Jika properti bernilai `undefined`, nilai default akan digunakan:

```javascript
const { peran = "Member" } = user;
console.log(peran); // 'Member'
```

#### 4. Ekstraksi Objek Bersarang (Nested Destructuring)

Menembus lapisan objek bertingkat secara langsung:

```javascript
const data = { profil: { kontak: { email: "joko@dev.id" } } };
const {
  profil: {
    kontak: { email },
  },
} = data;
console.log(email); // 'joko@dev.id'
```

#### 5. Destructuring Parameter Fungsi (Pola Props)

Pola paling dominan dalam framework modern (seperti React) untuk menerima data argumen:

```javascript
function renderButton({ label, disabled = false }) {
  console.log(`Tombol: ${label}, Mati: ${disabled}`);
}
renderButton({ label: "Kirim" });
```

#### 6. Mengumpulkan Sisa Properti dengan Rest Pattern

Memisahkan properti tertentu dari objek dan menyimpan sisanya ke objek mandiri:

```javascript
const laptop = { merk: "Asus", ram: 16, ssd: 512 };
const { merk, ...spesifikasi } = laptop;
console.log(spesifikasi); // { ram: 16, ssd: 512 }
```

#### 7. Kloning & Penggabungan Immutabel dengan Spread Operator

Menyalin dan menimpa nilai secara bersih tanpa mutasi langsung:

```javascript
const stateLama = { count: 0, loading: false };
const stateBaru = { ...stateLama, count: 1 };
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi destructuring objek dengan aliasing dan default value, teknik nested destructuring, pemisahan properti via Rest pattern, parameter destructuring pada fungsi notifikasi, serta pembuktian kloning & penimpaan properti aman via Object Spread Operator telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/09-objects/04-destructuring-spread/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Komponen UI Modern (Props Handling di React)**:
   ```javascript
   function Card({ title, description, badge = "New" }) {
     return `<div class="card"><h3>${title}</h3><span>${badge}</span></div>`;
   }
   ```
2. **Immutability pada State Management**: Mengubah satu properti dalam state besar tanpa memutasi objek state lama di Redux/Zustand.

### ⚠️ Common Pitfalls

- **Salah Memahami Urutan Sintaks Aliasing**: Menulis `{ namaBaru: namaPropertiAsli }` adalah terbalik. Urutannya selalu `{ namaPropertiAsli: namaBaru }`.
- **Destructuring Objek yang Bernilai `undefined`**: Menulis `const { nama } = res.user;` saat `res.user` bernilai `undefined` akan memicu crash `TypeError: Cannot destructure property 'nama' of undefined`. Lindungi dengan nilai default: `const { nama } = res.user || {};`.

### 🌟 Best Practice

- Gunakan destructuring parameter fungsi jika sebuah fungsi menerima objek konfigurasi.
- Selalu sediakan nilai fallback default pada variabel penting yang diekstrak dari sumber data dinamis (API atau input form).

---

## 5. ✍️ Latihan Mandiri

1. Diberikan objek `buku = { judul: 'Clean Code', pengarang: 'Robert Martin', terbit: 2008 }`. Lakukan destructuring untuk mengambil `judul`, lalu ganti nama variabel `pengarang` menjadi `penulis`.
2. Buat objek `bukuEdisiBaru` yang menyalin seluruh properti `buku` menggunakan Spread Operator dan menimpa tahun `terbit` menjadi `2024`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [09.3 - Keyword This](../03-keyword-this/README.md)
- ➡️ **Selanjutnya:** [09.5 - Object Lanjutan & Prototype](../05-advanced-objects/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
