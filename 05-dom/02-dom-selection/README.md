# 02 - DOM Selection (Querying Elements)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memahami cara menyeleksi elemen HTML dari DOM menggunakan 5 method seleksi utama.
> - **Kapan Digunakan**: Memahami perbedaan return value: Single Element vs HTMLCollection vs NodeList.
> - **Aturan Praktis**: Standar industri modern merekomendasikan penggunaan **`querySelector()`** dan **`querySelectorAll()`** karena fleksibel mendukung sintaks CSS Selector lengkap (`#id`, `.class`, `div > p`, `[data-status="active"]`).

## 1. 🎯 Tujuan Belajar

- Memahami cara menyeleksi elemen HTML dari DOM menggunakan 5 method seleksi utama.
- Memahami perbedaan return value: Single Element vs HTMLCollection vs NodeList.
- Memahami perbedaan Live Collection vs Static Collection.
- Mengetahui method seleksi yang paling direkomendasikan di industri modern.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> DOM Selection seperti **sistem pencarian buku di perpustakaan**: `getElementById` seperti mencari buku berdasarkan nomor barcode unik (pasti dapat 1 buku). `querySelector` seperti mencari buku pertama yang bersampul biru. Sedangkan `querySelectorAll` seperti mengambil seluruh buku di rak nomor 3 ke dalam satu keranjang belanja.

Sebelum kita bisa mengubah teks, warna, atau menambahkan aksi klik pada sebuah elemen HTML, kita harus **menyeleksi** (_query_) elemen tersebut terlebih dahulu.

### 5 Method DOM Selection:

| Method                                     | Mengembalikan                 | Sifat Koleksi | Kemudahan           |
| :----------------------------------------- | :---------------------------- | :------------ | :------------------ |
| `document.getElementById('id')`            | 1 Elemen (_Single Element_)   | -             | Cepat, berbasis ID  |
| `document.getElementsByTagName('tag')`     | `HTMLCollection` (Array-like) | **Live**      | Berbasis nama tag   |
| `document.getElementsByClassName('class')` | `HTMLCollection` (Array-like) | **Live**      | Berbasis nama class |
| `document.querySelector('selectorCSS')`    | 1 Elemen Pertama              | -             | Sangat Fleksibel    |
| `document.querySelectorAll('selectorCSS')` | `NodeList` (Array-like)       | **Static**    | Sangat Fleksibel    |

### Perbedaan HTMLCollection vs NodeList:

- **HTMLCollection**: Hanya berisi element node. Bersifat _Live_ (otomatis terupdate jika ada elemen yang ditambah/dihapus dari DOM). **Tidak memiliki method bawaan `.forEach()`** (harus diubah dulu ke Array via `Array.from()`).
- **NodeList**: Bisa berisi element, text, atau comment node. Bersifat _Static_. **Sudah memiliki method bawaan `.forEach()`**.

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

if (typeof document === 'undefined') {
  console.log('--- 02. DOM Selection ---');
  console.log(
    "Buka file 'index.html' di browser untuk melihat demonstrasi seleksi elemen secara visual!"
  );
} else {
  console.log('--- 02. DOM Selection (Browser) ---');

  // 1. getElementById -> Mengembalikan 1 elemen unik
  const judul = document.getElementById('judul-utama');
  if (judul) {
    judul.style.color = '#2563eb';
    console.log('Berhasil menyeleksi ID:', judul.tagName);
  }

  // 2. querySelector -> Menyeleksi 1 elemen pertama menggunakan sintaks selector CSS
  const paragrafPertama = document.querySelector('.deskripsi');
  console.log('Teks paragraf pertama:', paragrafPertama?.textContent);

  // 3. querySelectorAll -> Menyeleksi SELURUH elemen yang cocok (NodeList)
  const semuaItem = document.querySelectorAll('ul.daftar-belajar li');
  console.log(`Ditemukan ${semuaItem.length} item daftar:`);

  // NodeList mendukung forEach langsung:
  semuaItem.forEach((item, index) => {
    item.textContent = `${index + 1}. ${item.textContent}`;
    console.log(`- Item ${index + 1}: ${item.textContent}`);
  });
}
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 02. DOM Selection (Browser) ---
Berhasil menyeleksi ID: H1
Teks paragraf pertama: Memahami seleksi elemen di web
Ditemukan 3 item daftar:
- Item 1: 1. HTML Dasar
- Item 2: 2. CSS Styling
- Item 3: 3. JavaScript Modern
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Validasi Form Input**: Menyeleksi input email dan password: `const emailInput = document.querySelector('#input-email')`.
2. **Pemberian Event Listener Massal**: Mengambil seluruh tombol dengan class `.btn-action` untuk dipasangi aksi klik.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Lupa Tanda Titik atau Pagar pada querySelector**: `querySelector('tombol')` mencari tag `<tombol>`, bukan class `.tombol`! Selalu gunakan tanda titik `.` untuk class dan tanda pagar `#` untuk ID.
- **Memanggil .forEach pada HTMLCollection**: `document.getElementsByTagName('p').forEach(...)` akan melempar `TypeError: ...forEach is not a function`. Ubah dulu ke array: `Array.from(koleksi).forEach(...)`.

### 🌟 Best Practice

- Standar industri modern merekomendasikan penggunaan **`querySelector()`** dan **`querySelectorAll()`** karena fleksibel mendukung sintaks CSS Selector lengkap (`#id`, `.class`, `div > p`, `[data-status="active"]`).
- Gunakan `getElementById()` jika performa eksekusi kecepatan tinggi menjadi prioritas mutlak.

---

## 6. ✍️ Latihan Mandiri

1. Buka file `index.html` modul ini di browser. Gunakan `document.querySelectorAll('li')` untuk mengubah warna teks seluruh elemen list menjadi hijau (`item.style.color = 'green'`).

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [01 - Pengenalan DOM](../01-intro/README.md)
- ➡️ **Selanjutnya:** [03 - DOM Manipulasi Element](../03-element-manipulation/README.md)
- 🏠 **Daftar Isi Modul 05:** [README Modul 05](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
