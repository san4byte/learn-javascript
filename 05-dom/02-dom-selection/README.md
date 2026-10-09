# 02 - DOM Selection (Querying Elements)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengambil (_query_) referensi simpul elemen HTML dari struktur DOM agar dapat dimanipulasi melalui skrip JavaScript.
> - **Kapan Digunakan**: Langkah wajib pertama sebelum membaca isi teks, mengubah style, memanipulasi atribut, atau memasang _event listener_.
> - **Aturan Praktis**: Gunakan `querySelector()` untuk mengambil satu elemen unik dan `querySelectorAll()` untuk mengambil kumpulan elemen menggunakan sintaks CSS Selector modern. Gunakan `getElementById()` saat memprioritaskan performa mikro pada ID unik.

---

## 1. 🎯 Tujuan Belajar

- Menguasai 5 method seleksi elemen W3C DOM.
- Memahami perbedaan tipe nilai balik: _Single Element_, `HTMLCollection`, dan `NodeList`.
- Memahami perbedaan mendasar antara _Live Collection_ (dinamis) dan _Static Collection_ (rekaman statis).
- Memahami teknik _Scoped Querying_ (menyeleksi simpul turunan dari elemen induk tertentu).
- Mengetahui standar industri modern dalam menyeleksi elemen secara efisien dan aman.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Bayangkan DOM Tree seperti **gedung perpustakaan raksasa**:
>
> - `getElementById('ISBN-123')`: Mencari buku dengan kode barcode unik. Petugas langsung mengambil **tepat 1 buku spesifik**.
> - `querySelector('.buku-resep')`: Mengambil **buku resep pertama** yang terlihat di rak paling depan.
> - `querySelectorAll('section#komik .manga')`: Mengumpulkan **seluruh komik manga** yang ada di bagian rak komik ke dalam satu keranjang belanja.
> - `getElementsByTagName('p')`: Seperti sensor otomatis (_Live_) yang selalu menghitung total kertas di ruangan secara seketika (_real-time_).

---

### Tabel Perbandingan 5 Method DOM Selection

| Method Seleksi                             | Nilai Kembali (_Return Value_) | Sifat Koleksi | Dukungan `.forEach()` | Kecepatan Relatif |
| :----------------------------------------- | :----------------------------- | :------------ | :-------------------- | :---------------- |
| `document.getElementById('id')`            | `Element` (atau `null`)        | -             | Tidak Berlaku         | Paling Cepat      |
| `document.getElementsByTagName('tag')`     | `HTMLCollection`               | **Live**      | ❌ Tidak Ada          | Sangat Cepat      |
| `document.getElementsByClassName('class')` | `HTMLCollection`               | **Live**      | ❌ Tidak Ada          | Sangat Cepat      |
| `document.querySelector('selector')`       | `Element` (atau `null`)        | -             | Tidak Berlaku         | Cepat & Fleksibel |
| `document.querySelectorAll('selector')`    | `NodeList`                     | **Static**    | ✅ Tersedia           | Fleksibel         |

---

### Pembahasan Mendalam Fitur & API

#### 1. `document.getElementById(id)`

Mencari satu elemen berdasarkan atribut `id` persis tanpa tanda pagar (`#`). Mengembalikan objek `Element` atau `null` jika tidak ditemukan.

```javascript
const judul = document.getElementById("judul-utama");
if (judul) {
  judul.style.color = "#1d4ed8";
}
```

#### 2. `document.getElementsByTagName(tagName)`

Mengambil seluruh elemen yang memiliki nama tag HTML yang ditentukan (misalnya `'p'`, `'div'`, `'li'`). Mengembalikan `HTMLCollection`.

```javascript
const semuaParagraf = document.getElementsByTagName("p");
console.log("Jumlah paragraf:", semuaParagraf.length);
console.log("Paragraf pertama:", semuaParagraf[0].textContent);
```

#### 3. `document.getElementsByClassName(className)`

Mengambil seluruh elemen yang memiliki nama kelas CSS tertentu tanpa tanda titik (`.`). Mengembalikan `HTMLCollection` yang bersifat _live_.

```javascript
const cards = document.getElementsByClassName("card-item");
for (let i = 0; i < cards.length; i++) {
  cards[i].classList.add("border-aktif");
}
```

#### 4. `document.querySelector(selector)`

Mengembalikan elemen **pertama** yang cocok dengan CSS Selector yang diberikan. Sangat ekspresif karena mendukung kombinasi ID, class, atribut, maupun pseudo-class.

```javascript
// Mengambil tombol submit di dalam form komentar
const btnKirim = document.querySelector(
  'form#form-kontak button[type="submit"]',
);
if (btnKirim) {
  btnKirim.disabled = true;
}
```

#### 5. `document.querySelectorAll(selector)`

Mengembalikan seluruh elemen yang cocok dalam bentuk `NodeList` statis. Koleksi ini memiliki method bawaan `.forEach()` untuk mempermudah perulangan modern.

```javascript
const items = document.querySelectorAll("#daftar-item li");
items.forEach((item, index) => {
  item.textContent = `${index + 1}. ${item.textContent}`;
});
```

#### 6. Perbandingan `HTMLCollection` vs `NodeList`

`HTMLCollection` hanya dapat menampung _Element Node_, sedangkan `NodeList` dapat menampung _Element_, _Text_, atau _Comment Node_.

```javascript
const liveItems = document.getElementsByTagName("li"); // HTMLCollection
// liveItems.forEach(...) // ❌ TypeError: liveItems.forEach is not a function

// Konversi HTMLCollection ke Array asli:
Array.from(liveItems).forEach((li) => console.log(li.textContent));
```

#### 7. Perilaku Live Collection vs Static Collection

_Live Collection_ (`HTMLCollection`) otomatis memperbarui panjang array-nya saat DOM berubah, sedangkan _Static Collection_ (`NodeList` dari `querySelectorAll`) mempertahankan rekaman saat query dijalankan (_snapshot_).

```javascript
const staticList = document.querySelectorAll("li"); // snapshot (misal 3 item)
const liveCol = document.getElementsByTagName("li"); // live (misal 3 item)

// Menambah elemen baru ke DOM...
document.body.appendChild(document.createElement("li"));
console.log(staticList.length); // Tetap 3 (tidak berubah)
console.log(liveCol.length); // Berubah menjadi 4 (live updated)
```

#### 8. Scoped Querying (Pencarian dari Elemen Induk)

Method `querySelector` dan `querySelectorAll` juga tersedia pada setiap objek `Element`, bukan hanya pada `document`.

```javascript
const sectionB = document.getElementById("section-b");
// Mencari hanya di dalam batas elemen <section id="section-b">
const liDiSectionB = sectionB.querySelectorAll("li");
console.log("Item khusus Section B:", liDiSectionB.length);
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi kelima method seleksi, perbandingan live vs static collection, dan iterasi modern telah dirangkum dalam berkas praktik [`example.js`](example.js).

Berkas tersebut mendukung eksekusi terminal (Node.js) untuk pengujian alur logika seleksi serta pengujian langsung di peramban web via [`index.html`](index.html).

Jalankan demonstrasi simulasi seleksi di terminal:

```bash
node 05-dom/02-dom-selection/example.js
```

Atau buka [`index.html`](index.html) langsung di browser dan buka **DevTools Console (`F12`)** untuk melihat perubahan gaya visual dan log seleksi.

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Seleksi Komponen Form Dinamis**:
   ```javascript
   const inputEmail = document.querySelector('input[name="user_email"]');
   const isChecked = document.querySelector("#terms:checked");
   ```
2. **Pemasangan Listener Massal pada Tombol Aksi**:
   ```javascript
   document.querySelectorAll(".btn-delete").forEach((btn) => {
     btn.addEventListener("click", handleDelete);
   });
   ```

### ⚠️ Common Pitfalls

- **Lupa Prefix Simbol CSS**: Menulis `document.querySelector('judul')` alih-alih `document.querySelector('#judul')` (mencari tag kustom `<judul>` bukan elemen dengan ID `judul`).
- **Memanggil `.forEach()` pada `HTMLCollection`**: Memanggil method `.forEach` langsung pada hasil `getElementsByTagName` atau `getElementsByClassName` menyebabkan runtime error. Selalu gunakan `Array.from()` atau beralih ke `querySelectorAll()`.
- **Tidak Melakukan Pengecekan `null`**: Memanggil `el.textContent` saat `querySelector()` mengembalikan `null` akan melempar fatal error `Cannot read properties of null`. Gunakan _Optional Chaining_ (`el?.textContent`) atau percabangan `if (el)`.

### 🌟 Best Practice

- Utamakan `querySelector()` dan `querySelectorAll()` sebagai standar utama proyek modern karena fleksibilitas CSS selector yang seragam.
- Manfaatkan _Scoped Querying_ (`parentEl.querySelector(...)`) untuk menghindari pencarian global yang lambat di seluruh dokumen.

---

## 5. ✍️ Latihan Mandiri

1. Buka berkas [`index.html`](index.html) di browser. Menggunakan Console (`F12`), seleksi seluruh elemen `<p>` yang berada di dalam `#section-a` menggunakan `querySelectorAll()`, lalu ubah warna teksnya menjadi merah (`item.style.color = 'red'`).
2. Uji perbedaan kecepatan dan fleksibilitas antara:
   - `document.getElementById('link-mdn')`
   - `document.querySelector('#section-a a[target="_blank"]')`

---

## 6. 🧭 Navigasi

- ⬅️ **Materi Sebelumnya:** [01 - Pengenalan DOM & DOM Tree](../01-intro/README.md)
- ➡️ **Materi Selanjutnya:** [03 - DOM Manipulasi Element](../03-element-manipulation/README.md)
- 🏠 **Daftar Isi Modul 05:** [README Modul 05](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
