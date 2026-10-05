# 08 - HTML Table Elements (Tabel Dinamis)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memanipulasi struktur tabel HTML secara programatik menggunakan API khusus `insertRow()` dan `insertCell()`.
> * **Kapan Digunakan**: Menampilkan data tabular dinamis (seperti daftar transaksi, rekap nilai siswa, atau inventaris barang) dari database/API.
> * **Aturan Praktis**: Gunakan `insertRow(-1)` untuk menambahkan baris baru di posisi paling bawah tabel secara terstruktur tanpa merusak struktur DOM.

## 1. 🎯 Tujuan Belajar
- Mengenal API khusus `HTMLTableElement`: `insertRow()` dan `deleteRow()`.
- Mengenal API khusus `HTMLTableRowElement`: `insertCell()` dan `deleteCell()`.
- Menambahkan baris dan kolom tabel secara terstruktur tanpa manipulasi string HTML manual (`innerHTML`).
- Memperbarui nomor urut dan isi cell tabel secara dinamis.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **buku kas bergaris akuntansi**:
> Saat ada transaksi baru yang masuk, akuntan menarik garis baris baru di halaman paling bawah (`insertRow(-1)`), lalu mengisi kotak kolom nomor urut, kolom nama barang, dan kolom nominal satu per satu (`insertCell`). Akuntan tidak perlu merobek seluruh halaman buku kas dan menulis ulang dari awal.

### 1. API Khusus Tabel vs `innerHTML`
Menambahkan baris tabel dengan merangkai string `tbody.innerHTML += '<tr><td>...</td></tr>'` sangat tidak disarankan karena browser akan mem-parsing ulang seluruh isi tabel dan memutus event listener yang sudah ada. JavaScript menyediakan API resmi khusus tabel:
1. **`table.insertRow(index)`**: Menambahkan baris `<tr>` baru. Argumen `-1` berarti menambahkan di baris paling akhir.
2. **`row.insertCell(index)`**: Menambahkan sel `<td>` baru pada baris tersebut.
3. **`table.deleteRow(index)`**: Menghapus baris pada indeks tertentu.

### 2. Efisiensi DOM
Dengan `insertRow()` dan `insertCell()`, elemen node langsung dibuat di pohon DOM secara efisien dan rapi, serta kita dapat langsung menyematkan properti `.textContent` tanpa risiko celah keamanan injeksi HTML.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// DOM: Menggunakan insertRow() dan insertCell() pada HTMLTableElement
const btnTambah = document.getElementById("btn-tambah");
const tableBody = document.getElementById("tabel-body");

let nomor = 2;
const daftarNama = ["Siti Rahma", "Ahmad Fauzi", "Dewi Lestari", "Rian Hidayat"];

btnTambah.addEventListener("click", () => {
  if (daftarNama.length === 0) {
    alert("Semua data siswa contoh telah ditambahkan!");
    return;
  }

  // insertRow(-1) menambahkan baris baru di posisi paling bawah tabel
  const newRow = tableBody.insertRow(-1);

  // insertCell(0), insertCell(1), insertCell(2) membuat <td> baru
  const cellNo = newRow.insertCell(0);
  const cellNama = newRow.insertCell(1);
  const cellNilai = newRow.insertCell(2);

  const nama = daftarNama.shift();
  const nilaiAcak = Math.floor(Math.random() * 20) + 80;

  cellNo.textContent = nomor++;
  cellNama.textContent = nama;
  cellNilai.textContent = nilaiAcak;
});
```

---

## 4. 🖥️ Output yang Diharapkan
```text
Baris tabel baru bertambah di posisi paling bawah:
| No | Nama Siswa   | Nilai |
| 1  | Budi Santoso | 90    |
| 2  | Siti Rahma   | 88    |
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
1. **Aplikasi Kasir / POS (Point of Sale)**: Setiap kali barcode barang di-scan, satu baris baru ditambahkan ke tabel belanjaan pelanggan lengkap dengan kolom nama barang, harga, dan tombol hapus.
2. **Dashboard Monitoring Real-time**: Menampilkan log aktivitas server yang masuk per detik dalam bentuk tabel terurut.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Memanggil `insertRow()` pada `<table>` alih-alih `<tbody>`**: Jika tabel Anda memiliki `<thead>` dan `<tbody>`, pastikan memanggil `insertRow()` pada elemen `<tbody>` agar baris baru tidak masuk ke area header.
* **Lupa Parameter `-1`**: Memanggil `insertRow()` tanpa parameter di beberapa browser lama bisa memasukkan baris di indeks 0 (paling atas). Gunakan `-1` untuk selalu menaruhnya di akhir.

### 🌟 Best Practice
* Selalu gunakan `cell.textContent` alih-alih `cell.innerHTML` untuk mencegah celah keamanan XSS saat menampilkan data pengguna.
* Jika menambahkan ribuan data sekaligus, gunakan `DocumentFragment` atau pagination agar performa render halaman tetap mulus.

---

## 6. ✍️ Latihan Mandiri
1. Tambahkan kolom ke-4 pada tabel bernama "Aksi" yang berisi tombol `<button>Hapus</button>`. Saat tombol tersebut diklik, hapus baris tabel yang bersangkutan menggunakan `row.remove()`.
2. Buat fitur yang menghitung rata-rata nilai seluruh siswa di tabel dan menampilkannya di bagian footer tabel (`<tfoot>`).

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [07 - HTML Form Elements](../07-html-form-elements/README.md)
- ➡️ **Selanjutnya:** [09 - Latihan Praktik: Color Picker](../09-practice-color-picker/README.md)
- 🏠 **Daftar Isi Modul 05:** [README Modul 05](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
