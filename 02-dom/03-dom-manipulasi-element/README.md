# 03 - DOM Manipulasi Element (Teks, Atribut, dan Style)

## 1. 🎯 Tujuan Belajar
- Memahami perbedaan mendasar antara `innerHTML`, `textContent`, dan `innerText`.
- Memahami bahaya celah keamanan XSS (Cross-Site Scripting) pada `innerHTML`.
- Mampu memodifikasi atribut elemen menggunakan `setAttribute()`, `getAttribute()`, `removeAttribute()`.
- Menguasai manipulasi class CSS modern menggunakan `element.classList` (`add`, `remove`, `toggle`).

---

## 2. 📖 Penjelasan Konsep
Setelah berhasil menyeleksi sebuah elemen DOM, langkah berikutnya adalah memanipulasi konten teks, atribut, maupun gaya visualnya.

### 1. Manipulasi Konten Teks & HTML:
* **`textContent`**: Mengambil atau mengubah seluruh teks murni apa adanya (termasuk tag tersembunyi). **Sangat Aman dan Cepat**.
* **`innerText`**: Mengambil teks yang *terlihat* di layar pengguna (memperhatikan CSS seperti `display: none`).
* **`innerHTML`**: Mengubah konten beserta tag HTML di dalamnya. **Hati-hati: Rawan celah XSS jika menerima input pengguna mentah**.

### 2. Manipulasi Class CSS (`classList`):
Daripada mengubah `element.style.warna = 'red'` secara manual (yang mengotori inline CSS), standar industri adalah menambah/menghapus class CSS:
* `classList.add('nama-class')`: Menambah class.
* `classList.remove('nama-class')`: Menghapus class.
* `classList.toggle('nama-class')`: Menambah class jika belum ada, atau menghapusnya jika sudah ada (sangat berguna untuk fitur Dark Mode).

---

## 3. 💻 Contoh Kode (`contoh.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

if (typeof document === 'undefined') {
  console.log("--- 03. DOM Manipulasi Element ---");
  console.log("Buka file 'index.html' di browser untuk melihat demonstrasi manipulasi teks dan style!");
} else {
  console.log("--- 03. DOM Manipulasi Element (Browser) ---");

  const kotakAlert = document.getElementById("kotak-pesan");

  if (kotakAlert) {
    // 1. Mengubah teks secara aman dengan textContent
    kotakAlert.textContent = "Status Sistem: Berhasil Diperbarui Secara Real-Time!";

    // 2. Memanipulasi Atribut
    kotakAlert.setAttribute("data-status", "success");
    console.log("Atribut data-status:", kotakAlert.getAttribute("data-status"));

    // 3. Memanipulasi Class via classList
    kotakAlert.classList.add("aktif", "tema-hijau");
    console.log("Daftar Class:", kotakAlert.className);

    // Toggle class
    kotakAlert.classList.toggle("animasi-kedip");
    console.log("Punya class animasi-kedip?", kotakAlert.classList.contains("animasi-kedip"));
  }
}
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 03. DOM Manipulasi Element (Browser) ---
Atribut data-status: success
Daftar Class: card aktif tema-hijau
Punya class animasi-kedip? true
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> `textContent` seperti **menulis teks dengan spidol di papan tulis** (hanya teks polos). `innerHTML` seperti **menempelkan poster yang bisa berisi proyektor mini**: jika poster yang ditempel mengandung jebakan bom skrip (*malicious script*), sistem keamanan ruangan bisa jebol.

### 🏢 Real-World Use Case
1. **Toggle Dark Mode**: `document.body.classList.toggle('dark-theme')`.
2. **Menampilkan Notifikasi / Alert Sukses**: Mengubah pesan teks alert dan mengganti class warna dari merah (*danger*) menjadi hijau (*success*).

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Bahaya XSS (Cross-Site Scripting) pada `innerHTML`**: Jika Anda menulis `komentarDiv.innerHTML = inputPengguna`, hacker bisa memasukkan teks `<img src=x onerror=curiPassword()>` yang akan langsung dieksekusi browser. Selalu gunakan `textContent` untuk menampilkan data dari input pengguna!

### 🌟 Best Practice
* Gunakan **`textContent`** sebagai pilihan utama untuk menyetel teks.
* Gunakan **`classList.add()` / `classList.toggle()`** untuk mengubah gaya visual alih-alih menyetel `element.style` inline.

---

## 6. ✍️ Latihan Mandiri
1. Buat tombol di `index.html` yang ketika diklik akan melakukan toggle class `'dark-mode'` pada elemen `<body>`.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [02 - DOM Selection](../02-dom-selection/README.md)
- ➡️ **Selanjutnya:** [04 - DOM Manipulasi Node](../04-dom-manipulasi-node/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
