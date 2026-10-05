# 01 - Popup Box (alert, prompt, dan confirm)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami fungsi dialog bawaan browser: alert(), prompt(), dan confirm().
> * **Kapan Digunakan**: Mengetahui nilai balik (return value) dari masing-masing fungsi dialog.
> * **Aturan Praktis**: Selalu gunakan helper guard jika ingin script Anda kompatibel di terminal maupun browser.

## 1. 🎯 Tujuan Belajar
- Memahami fungsi dialog bawaan browser: alert(), prompt(), dan confirm().
- Mengetahui nilai balik (return value) dari masing-masing fungsi dialog.
- Mampu membuat pengulangan interaktif berbasis konfirmasi pengguna.
- Membuat kode universal yang aman dijalankan baik di Terminal (Node.js) maupun Browser.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Popup box seperti **penjaga pintu palang kereta api**: saat palang turun (popup muncul), semua kendaraan di jalan raya berhenti total (blocking). Kendaraan baru boleh jalan kembali setelah palang diangkat (pengguna menekan tombol).

JavaScript di browser menyediakan 3 fungsi dialog interaktif modal sederhana:
1. **`alert(pesan)`**: Menampilkan pesan informasi kepada pengguna dengan tombol OK. Mengembalikan nilai `undefined`.
2. **`prompt(pesan, defaultValue)`**: Menampilkan input teks yang meminta pengguna mengetikkan sesuatu. Mengembalikan nilai bertipe `String` jika pengguna menekan OK, atau `null` jika pengguna menekan Batal (*Cancel*).
3. **`confirm(pertanyaan)`**: Menampilkan kotak pertanyaan dengan tombol OK dan Batal. Mengembalikan nilai Boolean: `true` jika menekan OK, dan `false` jika menekan Batal.

### ⚠️ Sifat Blocking:
Dialog popup browser bersifat **blocking / synchronous**: seluruh eksekusi skrip JavaScript dan render antarmuka halaman web akan terhenti total sampai pengguna menekan salah satu tombol pada dialog tersebut.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

// 1. Helper Universal (agar kode tidak crash saat dijalankan via terminal Node.js)
const universalAlert = typeof alert !== 'undefined' ? alert : (msg) => console.log(`[ALERT]: ${msg}`);
const universalPrompt = typeof prompt !== 'undefined' ? prompt : (msg) => "Joko Santoso";
const universalConfirm = typeof confirm !== 'undefined' ? confirm : (msg) => false; // agar loop berhenti di terminal

universalAlert("Selamat datang di Pembelajaran JavaScript!");

let lanjut = true;
let hitungan = 1;

while (lanjut && hitungan <= 2) {
  const nama = universalPrompt("Masukkan nama Anda:");
  universalAlert(`Halo ${nama}, ini iterasi ke-${hitungan}`);
  
  // Konfirmasi apakah ingin mengulang lagi
  lanjut = universalConfirm("Apakah Anda ingin mencoba lagi?");
  hitungan++;
}

universalAlert("Terima kasih telah berkunjung!");
```

---

## 4. 🖥️ Output yang Diharapkan
```text
[ALERT]: Selamat datang di Pembelajaran JavaScript!
[ALERT]: Halo Joko Santoso, ini iterasi ke-1
[ALERT]: Terima kasih telah berkunjung!
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **Konfirmasi Penghapusan Data Sensitif**: Menampilkan `confirm('Apakah Anda yakin ingin menghapus data ini secara permanen?')` sebelum memicu request delete ke database.
2. **Rapid Prototyping & Debugging Cepat**: Menguji aliran data logika tanpa perlu membuat elemen form HTML yang rumit.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Error 'alert is not defined' di Node.js**: Pemula sering kaget saat menjalankan file di terminal dengan `node script.js` dan mengalami crash. Objek `alert`, `prompt`, dan `confirm` adalah milik browser (`window`), bukan milik runtime Node.js.
* **Nilai Kembalian prompt() Selalu String**: Jika pengguna mengetik angka `25`, `prompt()` mengembalikan string `"25"`. Jika Anda melakukan `25 + 5`, hasilnya adalah `"255"`, bukan `30`. Lakukan parsing angka dengan `parseInt()` atau `Number()`.
* **Mengganggu Pengalaman Pengguna (UX)**: Jangan menggunakan popup box bawaan untuk aplikasi produksi komersial karena menghentikan interaksi user dan tampilannya tidak bisa dikustomisasi dengan CSS.

### 🌟 Best Practice
* Selalu gunakan helper guard jika ingin script Anda kompatibel di terminal maupun browser.
* Untuk aplikasi web modern di produksi, gantikan popup box bawaan browser dengan komponen UI Modal HTML/CSS kustom (misal SweetAlert2 atau Dialog Tailwind/Bootstrap).

---

## 6. ✍️ Latihan Mandiri
1. Buatlah program yang meminta input umur pengguna melalui `prompt()`. Jika umur >= 17, tampilkan alert 'Boleh membuat SIM', jika kurang dari 17 tampilkan alert 'Belum cukup umur'.
2. Pastikan input string dari `prompt` dikonversi menjadi tipe data number menggunakan `Number()`.

---

## 7. 🧭 Navigasi
- ➡️ **Selanjutnya:** [02 - Variabel dan Scope (var, let, const)](../02-variables-and-scope/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
