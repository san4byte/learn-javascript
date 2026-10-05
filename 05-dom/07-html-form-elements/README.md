# 07 - HTML Form Elements (Form, Input, dan Event Submit)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Menangkap data masukan pengguna dari elemen formulir (`<input>`, `<textarea>`, `<select>`) dan memprosesnya secara asinkron.
> * **Kapan Digunakan**: Formulir login, pendaftaran pengguna, pencarian data, dan interaksi formulir web modern.
> * **Aturan Praktis**: Selalu panggil `event.preventDefault()` di dalam event handler `submit` untuk mencegah browser me-reload halaman.

## 1. 🎯 Tujuan Belajar
- Mengakses dan membaca nilai elemen formulir menggunakan properti `input.value`.
- Memahami event `submit` pada elemen `<form>`.
- Mencegah perilaku refresh bawaan browser dengan `event.preventDefault()`.
- Mengosongkan kembali form input menggunakan method `form.reset()`.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **kotak surat formulir di bank**:
> Saat nasabah menyerahkan formulir ke loket teller (event `submit`), teller menerima lembaran tersebut dan memeriksa isinya satu per satu. Teller tidak membuang semua antrean nasabah lain (reload halaman), melainkan hanya memproses data formulir tersebut dan memberikan tanda bukti stempel ke nasabah.

### 1. Membaca Nilai Input (`input.value`)
Setiap elemen input di halaman web menyimpan teks yang diketikkan pengguna di dalam properti `.value`. Properti ini selalu bertipe data `String`:
```javascript
const nama = document.getElementById('nama').value;
```

### 2. Mengapa Wajib `event.preventDefault()`?
Secara default, browser dirancang untuk mengirimkan formulir via HTTP POST/GET dan **me-reload seluruh halaman**. Pada aplikasi web modern (SPA / AJAX), kita ingin JavaScript yang menangani pengiriman data di latar belakang. Pemanggilan `event.preventDefault()` membatalkan reload default tersebut.

### 3. Method `form.reset()`
Setelah data berhasil dikirimkan atau diproses, memanggil `form.reset()` akan mengembalikan seluruh input di dalam form tersebut ke nilai awalnya secara otomatis dan bersih.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// DOM: Mengelola form, value, dan submit event
const form = document.getElementById('comment-form');
const outputDiv = document.getElementById('output');

form.addEventListener('submit', function (event) {
  // 1. Mencegah perilaku default browser (page reload)
  event.preventDefault();

  // 2. Mengakses nilai input form
  const inputNama = document.getElementById('nama').value;
  const inputPesan = document.getElementById('pesan').value;

  // 3. Menampilkan hasil ke layar
  outputDiv.style.display = 'block';
  outputDiv.innerHTML = `<strong>Komentar Berhasil Terkirim:</strong><br>
                         Pengirim: <em>${inputNama}</em><br>
                         Pesan: <em>${inputPesan}</em>`;

  // 4. Reset form ke keadaan bersih
  form.reset();
});
```

---

## 4. 🖥️ Output yang Diharapkan
```text
Komentar Berhasil Terkirim:
Pengirim: Joko Santoso
Pesan: Belajar JavaScript sangat menyenangkan!
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
1. **Validasi Form Registrasi Realtime**: Memeriksa kekuatan password atau mencocokkan konfirmasi password sebelum data dikirimkan ke server.
2. **Kirim Komentar / Chat Tanpa Reload**: Menambahkan balon chat baru secara instan ke layar pengguna segera setelah tombol kirim ditekan.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Memasang Event Click pada Tombol Alih-alih Submit pada Form**: Jika event dipasang pada `button.click`, pengguna yang menekan tombol *Enter* di keyboard tidak akan memicu pengiriman form. Selalu pasang event listener `submit` pada elemen `<form>`.
* **Lupa `preventDefault()`**: Menyebabkan halaman web berkedip me-reload dan data input hilang seketika.

### 🌟 Best Practice
* Lakukan sanitasi teks atau gunakan `.textContent` jika data input akan ditampilkan kembali ke layar guna mencegah serangan XSS (*Cross-Site Scripting*).
* Gunakan atribut validasi HTML5 bawaan (`required`, `type="email"`, `minlength`) sebagai benteng validasi lini pertama.

---

## 6. ✍️ Latihan Mandiri
1. Buat form sederhana dengan dua input angka dan tombol submit. Saat form disubmit, hitung penjumlahan kedua angka tersebut dan tampilkan hasilnya tanpa me-reload browser.
2. Tambahkan validasi sederhana: jika input nama kosong, tampilkan pesan peringatan berwarna merah di bawah input.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [06 - DOM Traversal](../06-dom-traversal/README.md)
- ➡️ **Selanjutnya:** [08 - HTML Table Elements](../08-html-table-elements/README.md)
- 🏠 **Daftar Isi Modul 05:** [README Modul 05](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
