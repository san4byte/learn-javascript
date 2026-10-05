# 05 - DOM Events (Merespon Aksi Pengguna)

## 1. 🎯 Tujuan Belajar

- Memahami konsep Event sebagai sinyal bahwa suatu aksi telah terjadi di halaman web.
- Memahami 3 cara menangani event: Inline Attribute, DOM Property, dan `addEventListener()`.
- Mengakses informasi aksi melalui `Event Object` (`e.target`, `e.type`, `e.key`).
- Mampu mencegah aksi bawaan browser menggunakan `e.preventDefault()`.

---

## 2. 📖 Penjelasan Konsep

**Event** adalah peristiwa atau interaksi yang terjadi pada halaman web (baik dipicu oleh pengguna seperti klik mouse, ketikan keyboard, maupun oleh browser seperti selesai memuat halaman).

### 3 Cara Menangani Event:

1. **Inline HTML Attribute (Kuno / Hindari)**: `<button onclick="klikSaya()">`
   _Mencampurkan logika JavaScript ke dalam struktur HTML._
2. **DOM Event Property (ES5)**: `tombol.onclick = function() { ... }`
   _Kelemahan: Hanya bisa mendaftarkan 1 fungsi listener saja (akan tertimpa jika ada listener baru)._
3. **`addEventListener(event, callback)` (Standar Industri Modern)**:
   - Dapat mendaftarkan lebih dari satu listener untuk event yang sama tanpa saling menimpa.
   - Mendukung opsi bubbling dan capturing.

### Objek Event (`e`) & Kontrol Propagasi:

- **`e.target`**: Elemen HTML spesifik yang memicu event.
- **`e.currentTarget`**: Elemen yang saat ini sedang menangani event (elemen tempat listener dipasang).
- **`e.preventDefault()`**: Menghentikan aksi default browser (misal: mencegah form reload atau link `<a>` berpindah URL).
- **`e.stopPropagation()`**: Menghentikan perambatan event ke elemen induk di atasnya (_event bubbling_).
- **`removeEventListener(event, handler)`**: Menghapus listener yang sebelumnya didaftarkan (wajib menggunakan referensi named function yang sama).

### Tabel Katalog Event Browser Populer

| Kategori             | Nama Event                 | Pemicu Terjadinya Event                                      |
| :------------------- | :------------------------- | :----------------------------------------------------------- |
| **Mouse**            | `click`, `dblclick`        | Klik tunggal atau klik ganda mouse                           |
|                      | `mouseenter`, `mouseleave` | Kursor mouse masuk atau keluar dari batas elemen             |
|                      | `mousemove`                | Kursor mouse digerakkan di atas elemen                       |
| **Keyboard**         | `keydown`, `keyup`         | Tombol keyboard ditekan turun atau dilepaskan                |
| **Formulir**         | `submit`                   | Tombol submit ditekan pada form `<form>`                     |
|                      | `input`                    | Nilai kolom teks sedang diketik secara real-time             |
|                      | `change`                   | Nilai input/select telah selesai diubah dan kehilangan fokus |
|                      | `focus`, `blur`            | Kolom input sedang aktif diklik atau keluar fokus            |
| **Dokumen / Window** | `DOMContentLoaded`         | Struktur HTML selesai dibaca oleh browser (DOM siap)         |
|                      | `scroll`, `resize`         | Halaman di-scroll atau ukuran jendela browser diubah         |

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

if (typeof document === 'undefined') {
  console.log('--- 05. DOM Events ---');
  console.log(
    "Buka file 'index.html' di browser untuk mencoba interaksi klik tombol dan input keyboard!"
  );
} else {
  console.log('--- 05. DOM Events (Browser) ---');

  const tombolAksi = document.getElementById('btn-klik');
  const kotakInput = document.getElementById('input-teks');

  if (tombolAksi) {
    // 1. Mendaftarkan Event Listener Klik
    tombolAksi.addEventListener('click', function (e) {
      console.log(`[EVENT KLIK] Tombol diklik! Koordinat: (${e.clientX}, ${e.clientY})`);
      tombolAksi.textContent = 'Tombol Berhasil Diklik!';
      tombolAksi.style.backgroundColor = '#16a34a';
    });
  }

  if (kotakInput) {
    // 2. Mendaftarkan Event Listener Keyboard (keyup)
    kotakInput.addEventListener('keyup', function (e) {
      console.log(`[KEYBOARD]: Pengguna menekan tombol '${e.key}' | Nilai teks: "${this.value}"`);
    });
  }
}
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 05. DOM Events (Browser) ---
[EVENT KLIK] Tombol diklik! Koordinat: (254, 412)
[KEYBOARD]: Pengguna menekan tombol 'a' | Nilai teks: "a"
[KEYBOARD]: Pengguna menekan tombol 'b' | Nilai teks: "ab"
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata

> Event seperti **bel pintu rumah**: tombol bel dipasang di luar pagar (_listener_). Ketika tamu menekan tombol bel (_event 'click'_), lonceng berdering di ruang tengah dan pemilik rumah keluar membukakan pintu (_fungsi callback_).

### 🏢 Real-World Use Case

1. **Form Submit AJAX**: Menangkap event `submit` pada formulir pendaftaran, memanggil `e.preventDefault()` agar halaman tidak reload, lalu mengirim data ke server via `fetch()`.
2. **Keyboard Shortcut**: Mendengarkan event `keydown` pada `window` untuk fitur seperti `Ctrl + K` (membuka kotak pencarian) atau tombol `Esc` (menutup modal).

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Lupa `e.preventDefault()` pada Form Submit**: Form HTML bawaan browser memiliki perilaku default me-refresh halaman saat tombol submit ditekan. Jika lupa menulis `e.preventDefault()`, aplikasi akan ter-refresh dan seluruh state JavaScript hilang seketika.

### 🌟 Best Practice

- Selalu gunakan **`addEventListener()`** untuk mendaftarkan event di aplikasi modern.
- Hindari meletakkan fungsi callback event anonim yang sangat panjang di dalam `addEventListener`; pisahkan menjadi fungsi bernama (_named function_) agar kode rapi dan mudah di-_removeEventListener_.

---

## 6. ✍️ Latihan Mandiri

1. Buatlah elemen link `<a href="https://google.com">Menuju Google</a>`. Pasang event listener klik dan gunakan `e.preventDefault()` agar link tidak berpindah halaman, melainkan menampilkan pesan alert di layar.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [04 - DOM Manipulasi Node](../04-node-manipulation/README.md)
- ➡️ **Selanjutnya:** [06 - DOM Traversal & Event Bubbling](../06-dom-traversal/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
