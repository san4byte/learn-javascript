# 07 - HTML Form Elements (Pengelolaan Form & Validasi Input)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengelola elemen formulir HTML (`<form>`, `<input>`, `<select>`, `<textarea>`), membaca data masukan pengguna, melakukan validasi, dan menangani pengiriman data secara asinkron (AJAX/Fetch).
> - **Kapan Digunakan**: Autentikasi pengguna (login/register), checkout belanja, formulir kontak, survei, hingga filter pencarian data.
> - **Aturan Praktis**: Wajib pasang `event.preventDefault()` pada penanganan event `submit` untuk mencegah peramban me-reload halaman. Manfaatkan **`FormData` API** untuk mengekstrak seluruh nilai input menjadi satu objek tanpa perlu menyeleksi elemen satu per satu.

---

## 1. 🎯 Tujuan Belajar

- Menguasai cara menyeleksi elemen formulir dan membaca nilai masukan pengguna (`value`, `checked`).
- Memahami peran krusial `event.preventDefault()` pada penanganan event `submit`.
- Membedakan perilaku event responsif `input` (saat mengetik) dan `change` (saat fokus beralih atau pilihan berganti).
- Menguasai ekstraksi data formulir modern menggunakan `FormData` API dan `Object.fromEntries()`.
- Memahami Constraint Validation API bawaan HTML5 (`checkValidity()`, `reportValidity()`).
- Mampu membersihkan kembali isian formulir menggunakan `form.reset()`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Bayangkan formulir HTML seperti **formulir kertas pendaftaran di meja resepsionis bank**:
>
> - Setiap kotak isian adalah **`input.value`** (tulisan tangan Anda).
> - Kotak centang persetujuan adalah **`input.checked`** (`true`/`false`).
> - Menekan tombol submit tanpa `preventDefault()` seperti **resepsionis langsung merobek kertas dan menyuruh Anda mengantre ulang dari pintu depan bank** (halaman web me-reload dan data terhapus).
> - Memanggil `preventDefault()` seperti **resepsionis memfotokopi data Anda secara tenang di meja** lalu memprosesnya ke sistem komputer secara digital tanpa membuat Anda harus keluar gedung.
> - `FormData API` seperti **mesin scanner dokumen**: sekali scan, seluruh kolom nama, alamat, dan pilihan otomatis terbaca dan tersimpan ke file digital.

---

### Tabel Ringkasan Properti & Method Form Elements

| Properti / Method                 | Target Elemen                 | Deskripsi Singkat                                                   |
| :-------------------------------- | :---------------------------- | :------------------------------------------------------------------ |
| `input.value`                     | `input`, `textarea`, `select` | Membaca atau mengisi string nilai teks masukan.                     |
| `input.checked`                   | `checkbox`, `radio`           | Status boolean (`true`/`false`) keterpilihan elemen centang.        |
| `form.addEventListener('submit')` | `form`                        | Menangkap sinyal ketika form dikirim (via tombol submit/Enter).     |
| `event.preventDefault()`          | Objek `Event`                 | Menghentikan aksi bawaan browser yang me-reload halaman web.        |
| `new FormData(formElement)`       | Konstruktor                   | Menangkap seluruh pasangan key-value input berdasar atribut `name`. |
| `input.checkValidity()`           | Elemen input                  | Mengembalikan boolean apakah input memenuhi syarat validasi HTML5.  |
| `form.reportValidity()`           | Elemen form                   | Memeriksa validasi dan memunculkan balon peringatan bawaan browser. |
| `form.reset()`                    | Elemen form                   | Mengosongkan seluruh kolom input kembali ke nilai awal bawaan.      |

---

### Pembahasan Mendalam Fitur & API

#### 1. Seleksi Elemen Form via DOM

Formulir dapat diseleksi menggunakan selector standar atau koleksi bawaan `document.forms`.

```javascript
// Menggunakan ID (Rekomendasi Modern):
const form = document.getElementById("comment-form");

// Mengakses elemen input berdasarkan atribut name langsung dari form:
const inputNama = form.elements["nama"];
console.log("Tipe input:", inputNama.type);
```

#### 2. Membaca dan Mengubah Nilai Input: `input.value` dan `input.checked`

Gunakan `.value` untuk teks dan `.checked` untuk elemen bertipe pilihan centang.

```javascript
const teks = document.getElementById("nama").value;
console.log("Nama yang diisi:", teks);

// Untuk Checkbox / Radio:
const setuju = document.getElementById("langganan").checked;
console.log("Apakah berlangganan?", setuju); // true atau false
```

#### 3. Mengelola Select Dropdown dan Textarea

Dropdown `<select>` menyediakan nilai opsi yang dipilih melalui properti `.value`.

```javascript
const selectKategori = document.getElementById("kategori");
console.log("Kategori terpilih:", selectKategori.value);

// Membaca teks tampilan dari opsi terpilih:
const teksOpsi = selectKategori.options[selectKategori.selectedIndex].text;
console.log("Label opsi:", teksOpsi);
```

#### 4. Menangani Event `submit` dan Mencegah Reload dengan `e.preventDefault()`

Secara default, pengiriman form akan membuat browser mengirim request HTTP dan menyegarkan (_refresh_) halaman web secara menyeluruh.

```javascript
form.addEventListener("submit", function (event) {
  event.preventDefault(); // 🛑 WAJIB: Mencegah refresh halaman

  console.log("Data siap dikirim via AJAX fetch() tanpa me-reload browser!");
});
```

#### 5. Perbedaan Event `input` vs Event `change`

- `input`: Terpicu secara seketika (_real-time_) setiap kali karakter berubah (cocok untuk pencarian instan / live character counter).
- `change`: Baru terpicu ketika pengguna selesai mengetik dan memindahkan fokus kursor (_blur_), atau saat pilihan dropdown/checkbox berubah.

```javascript
inputNama.addEventListener("input", (e) => {
  console.log("Mengetik:", e.target.value);
});
```

#### 6. Ekstraksi Data Otomatis dengan `FormData` API

Daripada mengambil elemen input satu per satu secara manual, gunakan `FormData` yang otomatis membaca seluruh elemen berdasarkan atribut `name`-nya.

```javascript
const formData = new FormData(form);

// Mengambil satu field:
console.log(formData.get("nama"));

// Mengonversi seluruh form menjadi Objek JavaScript biasa:
const payload = Object.fromEntries(formData.entries());
console.log(payload); // { nama: "Joko", kategori: "saran", pesan: "..." }
```

#### 7. Validasi Input HTML5 (`checkValidity` & `reportValidity`)

Browser modern menyediakan mekanisme validasi bawaan (_Constraint Validation_) berdasarkan atribut seperti `required`, `minlength`, `type="email"`, dan `pattern`.

```javascript
if (!form.checkValidity()) {
  form.reportValidity(); // Memunculkan tooltip error bawaan browser
  return;
}
```

#### 8. Mengosongkan Form dengan `form.reset()`

Mengembalikan seluruh kolom input formulir ke kondisi semula sebelum diisi oleh pengguna.

```javascript
// Setelah data berhasil terkirim ke server:
form.reset();
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi pencegahan reload via `preventDefault()`, ekstraksi data instan melalui `FormData` API, validasi input, pemantauan ketikan langsung (_live input event_), dan pembersihan formulir telah dirangkum dalam berkas praktik [`example.js`](example.js).

Berkas ini dirancang untuk dapat dijalankan langsung di terminal Node.js guna memverifikasi alur transformasi objek data, maupun di peramban web via [`index.html`](index.html).

Jalankan demonstrasi simulasi di terminal:

```bash
node 05-dom/07-html-form-elements/example.js
```

Atau buka [`index.html`](index.html) langsung di browser dan buka **DevTools Console (`F12`)** untuk mencoba mengetik, mengisi form, dan menekan tombol kirim secara langsung.

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Pengiriman Form Asinkron (Async AJAX / REST API)**:

   ```javascript
   form.addEventListener("submit", async (e) => {
     e.preventDefault();
     const payload = Object.fromEntries(new FormData(form).entries());

     const response = await fetch("/api/comments", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(payload),
     });
     if (response.ok) form.reset();
   });
   ```

2. **Live Password Strength Indicator**: Mendengarkan event `input` pada kolom kata sandi untuk menghitung tingkat kekuatan password secara visual.

### ⚠️ Common Pitfalls

- **Lupa Menambahkan Atribut `name` pada Tag Input**: `new FormData(form)` hanya akan menangkap input yang memiliki atribut `name`. Input yang hanya memiliki `id` akan diabaikan oleh FormData.
- **Membaca Checkbox Menggunakan `.value` Alih-alih `.checked`**: Properti `.value` pada checkbox selalu bernilai string `"on"` (atau nilai atribut `value`-nya) terlepas dari apakah checkbox tersebut dicentang atau tidak. Selalu gunakan `.checked` untuk memeriksa status centangnya.
- **Lupa `event.preventDefault()`**: Mengakibatkan form terkirim melalui metode sinkron HTML jadul dan halaman berkedip me-reload, merusak pengalaman pengguna SPA.

### 🌟 Best Practice

- Selalu sertakan atribut `name` yang deskriptif pada setiap elemen masukan formulir.
- Padukan validasi bawaan HTML5 (`required`, `type="email"`, `pattern`) di sisi antarmuka dengan validasi ketat di sisi server (_backend_).

---

## 5. ✍️ Latihan Mandiri

1. Buka berkas [`index.html`](index.html) di browser. Tambahkan listener pada event `input` di textarea `#pesan` untuk menampilkan sisa kuota karakter secara dinamis (maksimal 100 karakter).
2. Tambahkan input bertipe radio untuk pilihan jenis kelamin pada formulir, lalu amati bagaimana `FormData` mengekstrak opsi radio yang dipilih.

---

## 6. 🧭 Navigasi

- ⬅️ **Materi Sebelumnya:** [06 - DOM Traversal & Event Delegation](../06-dom-traversal/README.md)
- ➡️ **Materi Selanjutnya:** [08 - HTML Table Elements](../08-html-table-elements/README.md)
- 🏠 **Daftar Isi Modul 05:** [README Modul 05](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
