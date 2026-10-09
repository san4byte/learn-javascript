# 01 - Popup Box (alert, prompt, dan confirm)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menyediakan antarmuka dialog modal bawaan peramban (_browser native dialog_) untuk memberikan notifikasi pesan, menerima teks masukan pengguna, serta mengonfirmasi keputusan Ya/Tidak.
> - **Kapan Digunakan**: Skrip latihan logika dasar, konfirmasi tindakan berbahaya (misal: "Apakah Anda yakin ingin menghapus akun?"), serta purwarupa cepat (_rapid prototyping_).
> - **Aturan Praktis**: Dialog popup browser bersifat **blocking / synchronous** (membekukan rendering UI dan skrip sampai pengguna menekan tombol). Objek ini tidak ada di runtime Node.js, gunakan pembungkus _guard_ `typeof alert !== 'undefined'` untuk kode universal.

---

## 1. 🎯 Tujuan Belajar

- Memahami 3 fungsi kotak dialog bawaan browser: `alert()`, `prompt()`, dan `confirm()`.
- Mengetahui tipe data nilai balik (_return value_) dari masing-masing fungsi dialog.
- Memahami dampak perilaku pemblokiran eksekusi (_blocking nature_) terhadap performa halaman web.
- Mampu membuat alur perulangan interaktif berbasis persetujuan pengguna via `confirm()`.
- Menguasai pola kode universal agar skrip tidak _crash_ saat dijalankan di terminal Node.js.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Dialog popup browser seperti **palang pintu perlintasan kereta api**: Saat palang pintu diturunkan (popup dialog muncul di layar), semua kendaraan di jalan raya berhenti total (seluruh eksekusi JavaScript dan animasi browser terhenti membeku). Kendaraan baru diizinkan melaju kembali setelah palang diangkat (pengguna menekan tombol OK atau Batal).

---

### Tabel Ringkasan Fungsi Dialog Browser

| Fungsi Dialog              | Parameter Masukan           | Nilai Balik (_Return Value_) | Tujuan Penggunaan                             |
| :------------------------- | :-------------------------- | :--------------------------- | :-------------------------------------------- |
| `alert(pesan)`             | String pesan informasi      | `undefined`                  | Menampilkan pengumuman penting satu arah.     |
| `prompt(pesan, [default])` | Pesan & nilai awal opsional | `string` atau `null`         | Meminta pengguna mengetikkan teks string.     |
| `confirm(pertanyaan)`      | Pertanyaan konfirmasi       | `boolean` (`true` / `false`) | Meminta konfirmasi keputusan (OK atau Batal). |

---

### Pembahasan Mendalam Fitur & API

#### 1. Kotak Notifikasi: `alert(message)`

Menampilkan pesan teks dengan satu tombol **OK**. Tidak mengembalikan data apa pun (`undefined`).

```javascript
alert("Selamat datang di pembelajaran JavaScript Modern!");
```

#### 2. Kotak Input Pengguna: `prompt(message, defaultValue)`

Menyediakan kolom input teks bagi pengguna. Jika pengguna menekan **OK**, mengembalikan teks string yang diketik (atau string kosong `""` jika tidak mengetik apa-apa). Jika pengguna menekan **Batal (_Cancel_)**, mengembalikan nilai `null`.

```javascript
const nama = prompt("Masukkan nama Anda:", "Pengunjung");
if (nama !== null) {
  console.log(`Halo, ${nama}!`);
}
```

#### 3. Kotak Konfirmasi Keputusan: `confirm(message)`

Menampilkan pertanyaan dengan tombol **OK** dan **Batal**. Mengembalikan nilai boolean murni.

```javascript
const yakinHapus = confirm("Apakah Anda yakin ingin menghapus data ini?");
if (yakinHapus) {
  console.log("Data berhasil dihapus dari sistem.");
}
```

#### 4. Sifat Sinkron Blocking pada Dialog Modal Browser

Selama kotak dialog aktif di layar, siklus render halaman HTML dan eksekusi event listener terhenti total. Tidak ada animasi yang bergerak atau fungsi timer yang dapat memicu rendering baru hingga dialog ditutup.

#### 5. Penanganan Nilai Balik `prompt()` (`string` vs `null`)

Selalu bedakan antara pengguna yang sengaja membatalkan dialog (`null`) dan pengguna yang menekan OK tanpa mengisi teks (`""`):

```javascript
const input = prompt("Ketik angka:");
if (input === null) {
  console.log("Pengguna membatalkan input.");
} else if (input.trim() === "") {
  console.log("Pengguna menekan OK tetapi isian kosong!");
}
```

#### 6. Pola Pengulangan Interaktif (`while` + `confirm`)

Membangun alur interaksi berulang sampai pengguna memutuskan untuk berhenti:

```javascript
let ulangi = true;
while (ulangi) {
  console.log("Menjalankan proses aplikasi...");
  ulangi = confirm("Apakah ingin mengulang proses sekali lagi?");
}
```

#### 7. Pola Kompatibilitas Lintas Runtime (Universal Helper Guard)

Agar kode dapat diuji di terminal Node.js tanpa memicu fatal error `ReferenceError: alert is not defined`:

```javascript
const universalAlert =
  typeof alert !== "undefined"
    ? alert
    : (msg) => console.log(`[ALERT]: ${msg}`);
const universalPrompt =
  typeof prompt !== "undefined" ? prompt : () => "Nilai Dummy Node.js";
const universalConfirm = typeof confirm !== "undefined" ? confirm : () => false;
```

#### 8. Alasan Industri Beralih ke Modal Kustom HTML/CSS

Dalam aplikasi komersial modern, popup bawaan browser jarang digunakan karena:

1. Tidak dapat dikustomisasi gaya visualnya (tampilan mengikuti OS/browser).
2. Memblokir thread rendering halaman secara agresif.
3. Sebagian besar browser modern mengizinkan pengguna mencentang _"Prevent this page from creating additional dialogs"_.
   Pengembang modern lebih memilih modal kustom berbasis HTML, CSS, dan DOM Events (atau elemen `<dialog>` bawaan HTML5).

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi alur notifikasi `alert`, input data `prompt`, validasi konfirmasi `confirm`, perulangan interaktif, serta implementasi _universal helper guard_ telah dirangkum dalam berkas praktik [`example.js`](example.js).

Berkas ini dirancang untuk dapat dijalankan langsung di terminal Node.js melalui _Universal Helper_, maupun dibuka di peramban web via [`index.html`](index.html).

Jalankan demonstrasi simulasi di terminal:

```bash
node 01-fundamentals/01-popup-boxes/example.js
```

Atau buka [`index.html`](index.html) langsung di browser Anda untuk mencoba kotak popup dialog visual asli.

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Konfirmasi Penghapusan Sensitif Cepat**:
   ```javascript
   function onDeleteAccount() {
     if (confirm("Tindakan ini tidak dapat dibatalkan. Hapus akun permanen?")) {
       apiDeleteAccount();
     }
   }
   ```
2. **Pengujian Cepat Input di Console DevTools**: Meminta token otentikasi sementara saat debugging langsung di console browser: `const token = prompt('Masukkan token pengujian:');`.

### ⚠️ Common Pitfalls

- **Mengira Nilai Balik `prompt()` Bertipe Angka**: Nilai balik `prompt()` selalu bertipe `string`. Jika Anda meminta angka umur dan menjumlahkannya `prompt() + 5`, hasilnya adalah penggabungan teks (`"205"`, bukan `25`). Selalu konversi dengan `Number(prompt())`.
- **Menjalankan di Runtime Node.js Tanpa Guard**: Memanggil `alert()` langsung di Node.js akan melempar fatal error `ReferenceError: alert is not defined`.

### 🌟 Best Practice

- Gunakan elemen `<dialog>` modern bawaan HTML5 (`dialogElement.showModal()`) daripada `window.prompt()` untuk antarmuka pengguna aplikasi profesional.
- Selalu gunakan `String(input).trim()` dan periksa `input !== null` saat memproses masukan dari `prompt()`.

---

## 5. ✍️ Latihan Mandiri

1. Buka berkas [`index.html`](index.html) di browser. Gunakan DevTools Console (`F12`), buat sebuah alur prompt yang meminta dua angka dari pengguna, konversi keduanya menjadi tipe `number`, lalu tampilkan hasil penjumlahannya menggunakan `alert()`.
2. Tambahkan logika pengaman: jika pengguna menekan tombol Batal (_Cancel_) pada salah satu prompt, hentikan proses dan tampilkan pesan _"Penghitungan dibatalkan!"_.

---

## 6. 🧭 Navigasi

- ➡️ **Materi Selanjutnya:** [02 - Variables & Scope](../02-variables-and-scope/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
