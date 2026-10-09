# 05 - DOM Events (Penanganan Aksi Pengguna)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Merespon interaksi pengguna (klik mouse, pengetikan keyboard, pengiriman form, scroll, resize) secara asinkron di browser.
> - **Kapan Digunakan**: Seluruh fitur interaktif web: validasi form langsung, tombol aksi, animasi hover, navigasi keyboard, dan gestur sentuh.
> - **Aturan Praktis**: Selalu gunakan `element.addEventListener()` alih-alih atribut `onclick` inline atau `el.onclick`. Manfaatkan objek event (`e`) untuk mengambil target pemicu (`e.target`) serta mencegah perilaku default browser (`e.preventDefault()`).

---

## 1. 🎯 Tujuan Belajar

- Memahami mekanisme sinyal kejadian (_events_) di browser dan bagaimana JavaScript menangkapnya.
- Mengetahui 3 cara mendaftarkan event handler serta alasan mengapa `addEventListener()` adalah standar industri.
- Membedah objek `Event` (`e`), memahami perbedaan `e.target` vs `e.currentTarget`.
- Mampu membatalkan perilaku bawaan browser menggunakan `e.preventDefault()`.
- Menghentikan perambatan event ke elemen induk menggunakan `e.stopPropagation()`.
- Memahami kategori event penting: _Mouse Events_ (`click`, `mouseenter`, `mouseleave`) dan _Keyboard Events_ (`keydown`, `keyup`).
- Memahami cara melepas listener dengan `removeEventListener()` dan opsi modern `{ once: true }`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Bayangkan sistem DOM Event seperti **tombol bel pintu di sebuah rumah**:
>
> - Pemasangan bel adalah **`addEventListener('click', bunyikanBel)`**: Pemilik rumah mendaftarkan fungsi pendengar yang siap siaga.
> - Tindakan menekan tombol bel adalah **pemicu event (_dispatching event_)**.
> - Objek Event (`e`) adalah **laporan rekaman CCTV**: berisi siapa yang menekan (`e.target`), jam berapa kejadiannya (`e.timeStamp`), dan posisi jari menempel (`e.clientX, e.clientY`).
> - Opsi `{ once: true }` seperti **kupon undian sekali pakai**: setelah tiket digores dan hadiah keluar, tiket tersebut otomatis hangus dan tidak dapat dipakai lagi.

---

### Tabel Ringkasan Properti & Method DOM Events

| Properti / Method                 | Tipe Data | Deskripsi Singkat                                                             |
| :-------------------------------- | :-------- | :---------------------------------------------------------------------------- |
| `addEventListener(type, fn, opt)` | Method    | Mendaftarkan fungsi pendengar untuk event tertentu pada elemen.               |
| `removeEventListener(type, fn)`   | Method    | Mencopot pendaftaran listener (harus menggunakan referensi fungsi yang sama). |
| `event.target`                    | `Element` | Simpul elemen yang menjadi asal mula pemicu event.                            |
| `event.currentTarget`             | `Element` | Simpul elemen yang saat ini menangani listener yang sedang dieksekusi.        |
| `event.preventDefault()`          | Method    | Mencegah tindakan bawaan browser (misal: refresh form atau redirect link).    |
| `event.stopPropagation()`         | Method    | Menghentikan gelembung perambatan event (_event bubbling_) ke elemen induk.   |
| `event.key` / `event.code`        | `string`  | Karakter yang diketik (`"Enter"`, `"a"`) dan kode fisik tombol keyboard.      |
| `event.clientX` / `clientY`       | `number`  | Koordinat kursor mouse relatif terhadap area pandang viewport browser.        |

---

### Pembahasan Mendalam Fitur & API

#### 1. Tiga Pendekatan Memasang Event

Terdapat evolusi sejarah penanganan event di peramban web:

```javascript
// ❌ 1. Inline HTML Attribute (Hindari: Mengotori HTML & melanggar CSP)
// <button onclick="alert('Halo')">Klik</button>

// ⚠️ 2. DOM Property (Kelemahan: Hanya bisa 1 fungsi, fungsi lama tertimpa)
btn.onclick = function () {
  console.log("Handler 1");
};
btn.onclick = function () {
  console.log("Handler 2");
}; // Menimpa Handler 1!

// ✅ 3. addEventListener (Standar W3C: Fleksibel, multi-listener)
btn.addEventListener("click", () => console.log("Handler 1"));
btn.addEventListener("click", () => console.log("Handler 2")); // Keduanya jalan berdampingan!
```

#### 2. Anatomi `addEventListener()` dan Argumen Options

Menerima 3 argumen: nama event, fungsi callback handler, dan konfigurasi opsional.

```javascript
const tombol = document.getElementById("btn-sekali");

tombol.addEventListener(
  "click",
  function (e) {
    console.log("Hanya dieksekusi tepat 1 kali!");
  },
  { once: true },
); // Otomatis dicopot setelah eksekusi pertama
```

#### 3. Menghapus Event Listener via `removeEventListener()`

Untuk dapat menghapus listener, Anda **harus** memberikan referensi fungsi bernamanya (_named function_), bukan fungsi anonim.

```javascript
function saatScroll() {
  console.log("Pengguna melakukan scroll");
}

// Mendaftarkan
window.addEventListener("scroll", saatScroll);

// Melepas pendengar (misal saat komponen di-unmount)
window.removeEventListener("scroll", saatScroll);
```

#### 4. Anatomi Objek Event: `e.target` vs `e.currentTarget`

Ketika tombol di dalam sebuah `<div>` diklik:

- `e.target`: Elemen aktual paling dalam yang diklik kursor (misal tombol `<button>`).
- `e.currentTarget`: Elemen tempat listener terpasang (misal kontainer `<div>`).

```javascript
kontainer.addEventListener("click", function (e) {
  console.log("Elemen pemicu (asal klik) :", e.target.tagName);
  console.log("Elemen pemilik listener   :", e.currentTarget.tagName);
  console.log("this merujuk ke currentTarget:", this === e.currentTarget); // true
});
```

#### 5. Mencegah Aksi Bawaan Browser: `e.preventDefault()`

Browser memiliki perilaku bawaan pada elemen tertentu (seperti tag `<a>` yang membuka URL atau `<form>` yang me-refresh halaman saat di-submit). Gunakan `preventDefault()` untuk menghentikannya.

```javascript
const link = document.querySelector("a");
link.addEventListener("click", function (e) {
  e.preventDefault(); // Mencegah browser berpindah halaman
  console.log("Navigasi dibatalkan, dialihkan ke penanganan AJAX JavaScript");
});
```

#### 6. Menghentikan Rambatan Event: `e.stopPropagation()`

Event secara default akan merambat naik ke atas hierarki pohon DOM (_Event Bubbling_). Gunakan method ini untuk mengisolasi penanganan event di simpul lokal saja.

```javascript
const modalInner = document.querySelector(".modal-content");
modalInner.addEventListener("click", function (e) {
  e.stopPropagation(); // Mencegah klik di dalam modal menutup overlay backdrop di luarnya
});
```

#### 7. Kategori Mouse Events (`click`, `mouseenter`, `mouseleave`)

Event mouse memungkinkan pendeteksian gestur kursor secara presisi.

```javascript
const box = document.querySelector(".hover-box");

box.addEventListener("mouseenter", () => box.classList.add("aktif"));
box.addEventListener("mouseleave", () => box.classList.remove("aktif"));
box.addEventListener("dblclick", () => console.log("Kotak diklik ganda!"));
```

#### 8. Kategori Keyboard Events (`keydown`, `keyup`, `e.key`, `e.code`)

Mendeteksi penekanan tombol keyboard pengguna:

- `e.key`: Nilai karakter yang dihasilkan (memperhatikan Shift/Caps Lock, misal: `"A"` atau `"a"`).
- `e.code`: Kode tombol keyboard fisik (misal: `"KeyA"`, `"Escape"`, `"Enter"`).

```javascript
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    tutupModalDialog();
  }
});
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi pendaftaran event klik dengan counter, opsi `{ once: true }`, penangkapan pengetikan keyboard real-time, manipulasi hover mouse, dan inspeksi objek `Event` telah dirangkum dalam berkas praktik [`example.js`](example.js).

Berkas ini dirancang untuk dapat dijalankan langsung di terminal Node.js guna memverifikasi model data event, maupun di peramban web via [`index.html`](index.html).

Jalankan demonstrasi simulasi di terminal:

```bash
node 05-dom/05-dom-events/example.js
```

Atau buka [`index.html`](index.html) langsung di browser dan buka **DevTools Console (`F12`)** untuk mencoba interaksi klik, hover, dan pengetikan keyboard interaktif secara langsung.

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Pintasan Keyboard Global (Keyboard Shortcuts)**:
   ```javascript
   document.addEventListener("keydown", (e) => {
     if ((e.ctrlKey || e.metaKey) && e.key === "k") {
       e.preventDefault();
       openSearchCommandPalette();
     }
   });
   ```
2. **Infinite Scroll Detection**:
   ```javascript
   window.addEventListener(
     "scroll",
     () => {
       if (
         window.innerHeight + window.scrollY >=
         document.body.offsetHeight - 200
       ) {
         loadMoreItems();
       }
     },
     { passive: true },
   );
   ```

### ⚠️ Common Pitfalls

- **Menggunakan Fungsi Anonim saat Ingin Melepas Listener**: Menulis `removeEventListener('click', () => {})` tidak akan pernah berhasil mencopot listener karena fungsi panah baru tersebut memiliki referensi memori yang berbeda dari fungsi anonim saat mendaftar. Selalu gunakan _named function_.
- **Lupa `e.preventDefault()` pada Form Submit**: Menyebabkan halaman me-reload secara otomatis dan seluruh state aplikasi JavaScript di memori hilang seketika.
- **Masalah Konteks `this` pada Arrow Function**: Di dalam _arrow function_, kata kunci `this` tidak merujuk ke elemen pemilik event (`currentTarget`), melainkan ke lingkup leksikal terluar (`window`). Gunakan `e.currentTarget` atau fungsi reguler `function(e) {}`.

### 🌟 Best Practice

- Gunakan opsi `{ passive: true }` pada event scroll dan touch untuk meningkatkan performa kelancaran frame layar (_60 FPS scrolling performance_).
- Manfaatkan opsi `{ once: true }` untuk event yang hanya boleh terpicu 1 kali (seperti event inisialisasi tutorial).

---

## 5. ✍️ Latihan Mandiri

1. Buka berkas [`index.html`](index.html) di browser. Tambahkan listener pada elemen `window` di DevTools Console (`F12`) sehingga setiap kali pengguna menekan tombol `'d'` pada keyboard, seluruh halaman beralih ke warna gelap.
2. Pasang event `dblclick` pada `#btn-klik` yang mereset hitungan klik kembali ke angka 0.

---

## 6. 🧭 Navigasi

- ⬅️ **Materi Sebelumnya:** [04 - DOM Manipulasi Node](../04-node-manipulation/README.md)
- ➡️ **Materi Selanjutnya:** [06 - DOM Traversal & Event Delegation](../06-dom-traversal/README.md)
- 🏠 **Daftar Isi Modul 05:** [README Modul 05](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
