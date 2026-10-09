# 03 - DOM Manipulasi Element (Konten, Atribut, dan Style)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengubah isi teks konten, atribut HTML, gaya CSS, serta manipulasi kelas (_class list_) pada elemen yang telah diseleksi di DOM.
> - **Kapan Digunakan**: Diperlukan saat memperbarui tampilan antarmuka (UI) secara dinamis, mengaktifkan status komponen (seperti toggle dark mode), dan mengatur atribut interaktif.
> - **Aturan Praktis**: Gunakan `textContent` sebagai pilihan utama saat mengubah teks biasa guna mencegah celah keamanan **XSS (Cross-Site Scripting)**. Untuk gaya tampilan, prioritaskan manipulasi class via `element.classList` daripada mengubah `element.style` inline secara langsung.

---

## 1. 🎯 Tujuan Belajar

- Menguasai perbedaan mendasar antara `textContent`, `innerText`, dan `innerHTML`.
- Memahami celah keamanan XSS pada `innerHTML` dan kapan waktu yang tepat menggunakannya.
- Memanipulasi atribut HTML menggunakan `setAttribute()`, `getAttribute()`, `hasAttribute()`, dan `removeAttribute()`.
- Mengakses dan menyimpan metadata kustom menggunakan HTML5 `dataset` (`data-*`).
- Menguasai manipulasi class CSS modern menggunakan `element.classList` (`add`, `remove`, `toggle`, `contains`, `replace`).
- Memahami cara mengubah _inline style_ melalui properti `element.style`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Bayangkan sebuah elemen HTML adalah **papan pengumuman di dinding lobi kantor**:
>
> - `textContent`: Menulis pengumuman dengan **spidol tinta biasa** (hanya teks polos, seberapapun ada simbol aneh, tetap dibaca teks).
> - `innerHTML`: Menempelkan **perangkat proyektor mikro** yang bisa memutar video atau menyalakan alarm otomatis. Jika proyektor tersebut dititipkan oleh orang asing tanpa diperiksa (input berbahaya), sistem keamanan kantor bisa diretas.
> - `classList`: Mengganti **stiker status** di pojok papan (misal: stiker _Buka_, _Tutup_, _Perbaikan_). Desain visualnya sudah disiapkan oleh divisi desainer di berkas CSS, JavaScript hanya perlu menempel atau mencabut stiker tersebut.

---

### Tabel Ringkasan Method & Properti Manipulasi Element

| Properti / Method                 | Fungsi Utama                  | Karakteristik Penting                                        |
| :-------------------------------- | :---------------------------- | :----------------------------------------------------------- |
| `element.textContent`             | Baca / tulis teks murni       | Cepat, aman, mengabaikan styling CSS.                        |
| `element.innerText`               | Baca teks visual yang tampil  | Menghormati styling CSS (`display: none` tidak terbaca).     |
| `element.innerHTML`               | Baca / tulis struktur HTML    | Mengurai tag HTML; rawan XSS jika menerima teks user mentah. |
| `element.getAttribute(name)`      | Membaca nilai atribut         | Mengembalikan string nilai atribut atau `null`.              |
| `element.setAttribute(k, v)`      | Mengisi nilai atribut         | Menetapkan atribut HTML secara langsung.                     |
| `element.hasAttribute(name)`      | Memeriksa keberadaan atribut  | Mengembalikan boolean `true` atau `false`.                   |
| `element.removeAttribute(name)`   | Menghapus atribut             | Menghilangkan atribut dari tag HTML.                         |
| `element.dataset.prop`            | Akses atribut kustom `data-*` | Mengubah format `data-user-id` menjadi camelCase `userId`.   |
| `element.classList.add/remove`    | Menambah / mencabut class CSS | Mendukung multi-argumen (`'c1', 'c2'`).                      |
| `element.classList.toggle(c)`     | Membalik status class         | Menambah jika belum ada, mencabut jika sudah ada.            |
| `element.classList.contains(c)`   | Memeriksa class aktif         | Mengembalikan nilai boolean.                                 |
| `element.classList.replace(o, n)` | Mengganti class               | Mengganti class lama dengan class baru secara atomik.        |

---

### Pembahasan Mendalam Fitur & API

#### 1. Perbedaan `textContent` vs `innerText` vs `innerHTML`

Ketiganya digunakan untuk memanipulasi isi konten elemen, namun memiliki karakteristik penguraian yang sangat berbeda.

```javascript
const box = document.getElementById("kotak-status");

// 1. textContent: mengambil seluruh teks murni, termasuk teks tersembunyi
console.log(box.textContent);

// 2. innerText: hanya mengambil teks yang benar-benar tampak di layar (memperhatikan CSS)
console.log(box.innerText);

// 3. innerHTML: menyisipkan struktur tag HTML baru ke dalam elemen
box.innerHTML = "<strong>Status:</strong> Aktif";
```

#### 2. Bahaya Celah Keamanan XSS (Cross-Site Scripting) pada `innerHTML`

Jika data input dari pengguna dimasukkan langsung ke dalam `innerHTML` tanpa sanitasi, peretas dapat menyisipkan skrip jahat yang mencuri cookie atau token otentikasi.

```javascript
const inputUser = '<img src="x" onerror="alert(\'Situs Anda Diretas!\')">';

// ❌ SANGAT BERBAHAYA: script onerror akan otomatis dieksekusi browser!
// elemenTarget.innerHTML = inputUser;

// ✅ AMAN: Browser akan memperlakukannya sebagai teks biasa (escaped string)
elemenTarget.textContent = inputUser;
```

#### 3. `element.setAttribute()` dan `element.getAttribute()`

Digunakan untuk membaca dan menyetel atribut standar HTML seperti `href`, `src`, `title`, `alt`, atau `target`.

```javascript
const link = document.querySelector("a");
// Mengubah target agar terbuka di tab baru dan aman
link.setAttribute("target", "_blank");
link.setAttribute("rel", "noopener noreferrer");

console.log(link.getAttribute("href")); // Output URL link
```

#### 4. `element.hasAttribute()` dan `element.removeAttribute()`

Memeriksa apakah elemen memiliki atribut tertentu serta menghapusnya secara bersih dari tag.

```javascript
const btn = document.querySelector("button");
if (btn.hasAttribute("disabled")) {
  btn.removeAttribute("disabled"); // Mengaktifkan kembali tombol
}
```

#### 5. Manipulasi Atribut Kustom via `element.dataset` (`data-*`)

HTML5 mengizinkan penyimpanan metadata kustom menggunakan awalan `data-`. JavaScript menyediakan objek `dataset` yang otomatis mengonversi nama berpemisah strip (_kebab-case_) menjadi huruf unta (_camelCase_).

```javascript
const userCard = document.querySelector("[data-role]");

// Membaca: <div data-role="admin" data-user-id="42">
console.log(userCard.dataset.role); // "admin"
console.log(userCard.dataset.userId); // "42"

// Menulis atribut data baru: menghasilkan data-status="aktif"
userCard.dataset.status = "aktif";
```

#### 6. Manipulasi Inline Style CSS via `element.style`

Properti `style` digunakan untuk memodifikasi CSS langsung pada atribut `style=""` elemen. Properti CSS yang memiliki tanda strip harus ditulis dalam format _camelCase_.

```javascript
const panel = document.getElementById("kotak-status");
panel.style.backgroundColor = "#f1f5f9"; // CSS: background-color
panel.style.borderWidth = "2px"; // CSS: border-width
panel.style.display = "block";
```

#### 7. Manajemen Class Modern: `element.classList.add()` dan `remove()`

Standar industri merekomendasikan penggunaan `classList` daripada menimpa string `className` secara manual.

```javascript
const kartu = document.querySelector(".card");
kartu.classList.add("sorot", "tema-biru"); // Menambah beberapa class sekaligus
kartu.classList.remove("sorot"); // Menghapus satu class
```

#### 8. `element.classList.toggle()`, `contains()`, dan `replace()`

Method pelengkap `classList` yang sangat esensial untuk UI reaktif:

```javascript
// 1. toggle: berguna untuk tombol switch/accordion/dark-mode
kartu.classList.toggle("tema-gelap");

// 2. contains: mengecek apakah class tertentu aktif
if (kartu.classList.contains("tema-gelap")) {
  console.log("Mode gelap sedang aktif");
}

// 3. replace: menukar class tanpa perlu panggil remove lalu add terpisah
kartu.classList.replace("tema-gelap", "tema-terang");
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi manipulasi teks aman, injeksi atribut, pengaksesan `dataset`, pengujian `classList`, dan mutasi style telah dirangkum dalam berkas praktik [`example.js`](example.js).

Berkas ini dirancang ganda (_dual-compatible_) untuk dapat diuji langsung di terminal Node.js maupun pada peramban web via [`index.html`](index.html).

Jalankan demonstrasi simulasi di terminal:

```bash
node 05-dom/03-element-manipulation/example.js
```

Atau buka [`index.html`](index.html) langsung di browser dan buka **DevTools Console (`F12`)** untuk mengamati perubahan warna, badge status, dan class secara visual.

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Implementasi Dark Mode Switcher**:
   ```javascript
   function toggleTheme() {
     const isDark = document.body.classList.toggle("dark-theme");
     localStorage.setItem("theme", isDark ? "dark" : "light");
   }
   ```
2. **Kustom Data pada E-Commerce Cart**:
   ```javascript
   function handleAddToCart(buttonElement) {
     const productId = buttonElement.dataset.productId;
     const price = Number(buttonElement.dataset.price);
     cart.addItem({ productId, price });
   }
   ```

### ⚠️ Common Pitfalls

- **Menggunakan `innerHTML` untuk Memasukkan Komentar/Nama Pengguna**: Celah keamanan fatal XSS. Jangan pernah me-render string yang berasal dari input pengguna menggunakan `innerHTML`. Gunakan `textContent`.
- **Menulis Nama Properti CSS Tanpa CamelCase pada `element.style`**: Menulis `el.style.background-color = 'red'` adalah sintaks salah dan memicu runtime error. Gunakan `el.style.backgroundColor = 'red'`.
- **Menimpa Seluruh Class Menggunakan `element.className = 'baru'`**: Cara lama ini akan menghapus semua class yang sudah ada sebelumnya. Gunakan `element.classList.add('baru')`.

### 🌟 Best Practice

- Pisahkan urusan styling ke berkas CSS dan gunakan `classList.add()`, `remove()`, atau `toggle()` di JavaScript. Hindari memasang inline style secara berlebihan melalui `element.style`.
- Manfaatkan atribut `data-*` dan `dataset` untuk menautkan data identitas (seperti ID database) langsung ke elemen DOM tanpa mengotori struktur HTML.

---

## 5. ✍️ Latihan Mandiri

1. Buka berkas [`index.html`](index.html) di peramban web. Melalui Console (`F12`), ubah teks `#pesan-status` menjadi `"Sistem Sedang Dalam Pemeliharaan"` menggunakan `textContent`.
2. Gunakan `classList.toggle('tema-gelap')` pada elemen `#kotak-status` berulang kali dan perhatikan perubahan warna latar belakang kotak tersebut di layar!

---

## 6. 🧭 Navigasi

- ⬅️ **Materi Sebelumnya:** [02 - DOM Selection](../02-dom-selection/README.md)
- ➡️ **Materi Selanjutnya:** [04 - DOM Manipulasi Node](../04-node-manipulation/README.md)
- 🏠 **Daftar Isi Modul 05:** [README Modul 05](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
