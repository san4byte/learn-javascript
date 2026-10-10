# 08 - HTML Table Elements (Manipulasi Struktur Tabel Dinamis)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memanipulasi elemen tabel data HTML (`<table>`) menggunakan API bawaan antarmuka `HTMLTableElement` seperti `insertRow()`, `insertCell()`, dan `deleteRow()`.
> - **Kapan Digunakan**: Menampilkan data transaksional, dashboard laporan admin, tabel daftar siswa/karyawan, keranjang belanja, hingga grid data interaktif.
> - **Aturan Praktis**: Gunakan `tbody.insertRow(-1)` untuk menambahkan baris baru di posisi paling bawah dan `newRow.insertCell(index)` untuk menyisipkan kolom sel data secara terstruktur, bersih, dan bebas dari celah injeksi XSS.

---

## 1. 🎯 Tujuan Belajar

- Memahami arsitektur antarmuka khusus `HTMLTableElement` pada standar W3C DOM.
- Menguasai properti penunjuk bagian tabel semantik: `tHead`, `tBodies`, dan `tFoot`.
- Mengetahui cara mengakses koleksi baris (`table.rows`) dan sel kolom (`row.cells`).
- Mampu menambah baris dan sel secara terstruktur menggunakan `insertRow()` dan `insertCell()`.
- Menguasai teknik menghapus baris dengan `deleteRow()` serta sel dengan `deleteCell()`.
- Memahami perbedaan antara `row.rowIndex` (urutan di seluruh tabel) dan `row.sectionRowIndex` (urutan di bagian tbody terkait).
- Mengetahui perbandingan efisiensi dan keamanan antara API tabel bawaan vs manipulasi string `innerHTML`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Bayangkan sebuah tabel HTML seperti **rak lemari arsip dokumen modular**:
>
> - `<table>` adalah **seluruh lemari arsip**.
> - `<thead>` adalah **label nama kategori di baris paling atas rak**.
> - `<tbody>` adalah **badan laci utama tempat seluruh berkas tersimpan**.
> - `insertRow(-1)` seperti **menambahkan satu laci map gantung baru di susunan paling bawah**.
> - `insertCell()` seperti **membagi laci baru tersebut menjadi beberapa kompartemen bersekat** (sekat nomor urut, nama berkas, dan tanggal).
> - `deleteRow()` seperti **mencabut satu laci rusak dari susunan lemari** tanpa mengganggu laci-laci di atasnya.

---

### Tabel Ringkasan Properti & Method HTMLTableElement

| Properti / Method        | Nilai Kembali             | Deskripsi Singkat                                                |
| :----------------------- | :------------------------ | :--------------------------------------------------------------- |
| `table.tHead`            | `HTMLTableSectionElement` | Mengakses elemen pembungkus header (`<thead>`).                  |
| `table.tBodies`          | `HTMLCollection`          | Mengakses seluruh elemen badan tabel (`<tbody>`).                |
| `table.tFoot`            | `HTMLTableSectionElement` | Mengakses elemen pembungkus kaki tabel (`<tfoot>`).              |
| `table.rows`             | `HTMLCollection`          | Mengambil seluruh baris `<tr>` yang ada di seluruh bagian tabel. |
| `tbody.insertRow(index)` | `HTMLTableRowElement`     | Menyisipkan baris `<tr>` baru pada posisi indeks tertentu.       |
| `row.insertCell(index)`  | `HTMLTableCellElement`    | Menyisipkan sel `<td>` baru pada posisi indeks kolom.            |
| `tbody.deleteRow(index)` | `undefined`               | Menghapus satu baris `<tr>` pada posisi indeks tertentu.         |
| `row.cells`              | `HTMLCollection`          | Koleksi seluruh sel `<td>` atau `<th>` di dalam satu baris.      |

---

### Pembahasan Mendalam Fitur & API

#### 1. Arsitektur Antarmuka `HTMLTableElement`

Elemen tabel memiliki antarmuka khusus dalam spesifikasi DOM yang dirancang untuk mempermudah manipulasi grid tanpa perlu membuat tag `<tr>` dan `<td>` secara manual via `createElement`.

```javascript
const table = document.getElementById("tabel-siswa");
console.log("Tipe interface:", table.constructor.name); // "HTMLTableElement"
```

#### 2. Properti Bagian Semantik: `table.tHead`, `tBodies`, dan `tFoot`

Memudahkan akses langsung ke bagian-bagian tabel tanpa perlu melakukan `querySelector`:

```javascript
console.log("Header tabel ada?", table.tHead !== null);
console.log("Jumlah tbody  :", table.tBodies.length);
console.log("TFoot tabel ada ?", table.tFoot !== null);
```

#### 3. Koleksi Baris dan Sel: `table.rows` dan `row.cells`

Dapat diakses seperti susunan array bertingkat (baris lalu kolom):

```javascript
// Mengakses baris pertama:
const barisPertama = table.rows[0];

// Mengakses sel kolom kedua pada baris pertama:
const selNama = barisPertama.cells[1];
console.log("Judul Kolom:", selNama.textContent);
```

#### 4. Menambah Baris Terstruktur: `tbody.insertRow(index)`

Parameter `index`:

- `0`: Menyisipkan di baris teratas.
- `-1`: Menyisipkan di baris paling akhir (posisi default yang paling umum).

```javascript
const tbody = table.tBodies[0];
const rowBaru = tbody.insertRow(-1); // Menambah <tr> di urutan paling bawah
```

#### 5. Menambah Sel Data: `row.insertCell(index)`

Menyisipkan tag `<td>` secara otomatis ke dalam baris yang baru dibuat:

```javascript
const cellNo = rowBaru.insertCell(0);
const cellNama = rowBaru.insertCell(1);

cellNo.textContent = tbody.rows.length;
cellNama.textContent = "Ahmad Fauzi";
```

#### 6. Menghapus Baris dan Sel: `deleteRow()` dan `deleteCell()`

Menghapus baris berdasarkan posisi indeks numeriknya. Nilai `-1` akan menghapus baris paling terakhir.

```javascript
// Menghapus baris paling bawah dari tbody:
tbody.deleteRow(-1);

// Menghapus baris ke-2 (indeks 1):
tbody.deleteRow(1);
```

#### 7. Perbedaan `row.rowIndex` vs `row.sectionRowIndex`

- `row.rowIndex`: Nomor urut baris dihitung dari awal dokumen tabel (termasuk baris `<thead>`).
- `row.sectionRowIndex`: Nomor urut baris dihitung hanya di dalam seksi induknya (`<tbody>` saja).

```javascript
const baris = tbody.rows[0];
console.log("Index total tabel (rowIndex):", baris.rowIndex); // Misal: 1 (karena ada <thead> di index 0)
console.log("Index seksi tbody (sectionRowIndex):", baris.sectionRowIndex); // 0
```

#### 8. Perbandingan `insertRow` vs `innerHTML` String Templating

| Fitur                        | `insertRow()` / `insertCell()`              | String Templating via `innerHTML`               |
| :--------------------------- | :------------------------------------------ | :---------------------------------------------- |
| **Keamanan XSS**             | ✅ Sangat Aman (menggunakan `.textContent`) | ⚠️ Rawan jika tidak disanitasi                  |
| **Event Listener Terpasang** | ✅ Listener pada baris lain tidak hilang    | ❌ Me-reset dan merusak listener yang sudah ada |
| **Ketepatan Parsing**        | ✅ Browser langsung membuat DOM node        | ⚠️ Browser harus mem-parse teks berulang        |

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi penambahan baris otomatis via `tbody.insertRow(-1)`, penyisipan sel data aman (`insertCell`), penghapusan baris terbawah, dan integrasi Event Delegation untuk tombol aksi hapus baris spesifik telah dirangkum dalam berkas praktik [`example.js`](example.js).

Berkas ini dirancang untuk dapat dijalankan langsung di terminal Node.js guna memverifikasi manipulasi struktur matriks data, maupun di peramban web via [`index.html`](index.html).

Jalankan demonstrasi simulasi di terminal:

```bash
node 05-dom/08-html-table-elements/example.js
```

Atau buka [`index.html`](index.html) langsung di browser dan buka **DevTools Console (`F12`)** untuk mencoba tombol tambah baris siswa dan tombol hapus baris secara visual.

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Keranjang Belanja E-Commerce (Cart Table)**:

   ```javascript
   function renderCartItem(tbody, item) {
     const row = tbody.insertRow(-1);
     row.dataset.sku = item.sku;

     row.insertCell(0).textContent = item.name;
     row.insertCell(1).textContent = `Rp ${item.price.toLocaleString("id-ID")}`;
     row.insertCell(2).textContent = item.quantity;

     const cellAction = row.insertCell(3);
     const btnRemove = document.createElement("button");
     btnRemove.textContent = "Hapus";
     btnRemove.className = "btn-row-del";
     cellAction.appendChild(btnRemove);
   }
   ```

2. **Auto-Numbering Kolom Tabel**: Menghitung ulang nomor urut kolom pertama (`cells[0].textContent = idx + 1`) setelah baris dihapus.

### ⚠️ Common Pitfalls

- **Memanggil `insertRow()` pada `<table>` Alih-alih pada `<tbody>`**: Jika tabel memiliki `<thead>` dan Anda memanggil `table.insertRow()`, baris baru bisa saja tidak sengaja masuk ke `<thead>` tergantung implementasi browser. Selalu panggil `tbody.insertRow()`.
- **Indeks Kolom `insertCell` Tidak Urut**: Memanggil `row.insertCell(2)` sebelum sel indeks `0` dan `1` dibuat dapat menyebabkan runtime exception `IndexSizeError`. Selalu isi sel secara berurutan `0, 1, 2...` atau gunakan `-1` untuk akhir baris.

### 🌟 Best Practice

- Selalu targetkan elemen `<tbody>` secara eksplisit saat menambah baris data transaksi.
- Pasang event handler pada level `<tbody>` (Event Delegation) untuk menangani tombol aksi seperti hapus atau edit pada baris tabel agar tidak perlu mendaftarkan ribuan listener baru.

---

## 5. ✍️ Latihan Mandiri

1. Buka berkas [`index.html`](index.html) di peramban web. Tambahkan satu kolom baru berjudul `"Predikat"` di `<thead>`, lalu modifikasi skrip agar nilai $\ge 90$ mendapatkan predikat `"A"` dan nilai $< 90$ mendapatkan predikat `"B"`.
2. Gunakan Console (`F12`) untuk menghitung rata-rata nilai seluruh siswa yang ada di dalam tabel dan tampilkan hasilnya pada elemen `<tfoot>`.

---

## 6. 🧭 Navigasi

- ⬅️ **Materi Sebelumnya:** [07 - HTML Form Elements](../07-html-form-elements/README.md)
- ➡️ **Modul Selanjutnya:** [01 - Event Loop & Asynchronous Architecture (Modul 06)](../../06-asynchronous/01-event-loop-intro/README.md)
- 🏠 **Daftar Isi Modul 05:** [README Modul 05](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
