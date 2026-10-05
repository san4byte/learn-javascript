# 04 - DOM Manipulasi Node (Membuat & Menyisipkan Elemen)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memahami cara membuat elemen HTML baru di memori menggunakan `document.createElement()`.
> - **Kapan Digunakan**: Mampu menyisipkan elemen baru ke dalam DOM Tree menggunakan `appendChild()` dan `prepend()`.
> - **Aturan Praktis**: Manfaatkan `DocumentFragment` saat menyisipkan banyak node sekaligus.

## 1. 🎯 Tujuan Belajar

- Memahami cara membuat elemen HTML baru di memori menggunakan `document.createElement()`.
- Mampu menyisipkan elemen baru ke dalam DOM Tree menggunakan `appendChild()` dan `prepend()`.
- Mampu menyisipkan elemen pada posisi spesifik menggunakan `insertBefore()`.
- Mampu menghapus dan mengganti elemen menggunakan `removeChild()` dan `replaceChild()`.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> Membuat node baru seperti **merakit bingkai foto baru di gudang**: `createElement` adalah memotong kayu bingkainya di memori. `textContent` adalah memasang foto ke dalam bingkai. Dan `appendChild` adalah menancapkan paku dan menggantungkan bingkai foto tersebut ke dinding ruang tamu (menghubungkan ke DOM Tree).

Selain memodifikasi elemen yang sudah ada di HTML, kita sering kali perlu **membuat elemen baru dari nol secara dinamis** (misal: menambahkan baris baru ke tabel keranjang belanja atau menampilkan postingan baru).

### Alur 3 Langkah Membuat Node Baru:

1. **Buat Elemen**: `const liBaru = document.createElement('li');`
2. **Isi Kontennya**: `liBaru.textContent = 'Item Baru';`
3. **Sisipkan ke Induk (DOM Tree)**:
   - `parent.appendChild(elemen)`: Menaruh elemen baru di **urutan terakhir** anak parent.
   - `parent.prepend(elemen)`: Menaruh elemen baru di **urutan pertama** anak parent.
   - `parent.insertBefore(elemenBaru, elemenAcuan)`: Menaruh elemen baru persis **sebelum elemen acuan**.

### Menghapus & Mengganti:

- `parent.removeChild(elemenAnak)`: Menghapus anak elemen tertentu.
- `elemen.remove()`: Menghapus elemen itu sendiri secara langsung (Metode Modern).
- `parent.replaceChild(elemenBaru, elemenLama)`: Mengganti elemen lama dengan elemen baru.

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

if (typeof document === 'undefined') {
  console.log('--- 04. DOM Manipulasi Node ---');
  console.log(
    "Buka file 'index.html' di browser untuk melihat pembuatan elemen HTML baru!"
  );
} else {
  console.log('--- 04. DOM Manipulasi Node (Browser) ---');

  const kontainerList = document.getElementById('daftar-tugas');

  if (kontainerList) {
    // 1. Buat element <li> baru di memori
    const itemBaru1 = document.createElement('li');
    itemBaru1.textContent = 'Tugas Baru: Belajar Manipulasi Node (appendChild)';
    itemBaru1.style.color = '#16a34a'; // Hijau

    // 2. Sisipkan ke akhir daftar
    kontainerList.appendChild(itemBaru1);
    console.log('Berhasil menambahkan item di akhir.');

    // 3. Buat item prioritas tinggi di paling awal (prepend)
    const itemPrioritas = document.createElement('li');
    itemPrioritas.textContent = 'Tugas Mendesak: Minum Air Putih (prepend)';
    itemPrioritas.style.color = '#ea580c'; // Oranye
    kontainerList.prepend(itemPrioritas);
    console.log('Berhasil menambahkan item prioritas di awal.');
  }
}
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 04. DOM Manipulasi Node (Browser) ---
Berhasil menambahkan item di akhir.
Berhasil menambahkan item prioritas di awal.
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Aplikasi To-Do List**: Membuat elemen `<li>` baru beserta tombol checklist dan tombol hapus setiap kali pengguna menekan tombol 'Tambah Tugas'.
2. **Komentar Media Sosial**: Menyisipkan kotak komentar baru pengguna tepat di bawah postingan secara instan tanpa me-refresh halaman.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Reflow Berulang Kali di Dalam Loop (Performa Buruk)**: Memanggil `parent.appendChild()` 1.000 kali di dalam perulangan `for` akan memaksa browser merender ulang layar (_reflow_) 1.000 kali. Solusinya: gunakan **`document.createDocumentFragment()`** untuk mengumpulkan 1.000 elemen di memori terlebih dahulu, lalu lakukan append ke DOM hanya 1 KALI saja!

### 🌟 Best Practice

- Manfaatkan `DocumentFragment` saat menyisipkan banyak node sekaligus.
- Gunakan sintaks modern `element.remove()` untuk menghapus elemen secara ringkas alih-alih `parent.removeChild(element)`.

---

## 6. ✍️ Latihan Mandiri

1. Buat tombol 'Tambah Item' di `index.html`. Setiap kali tombol ditekan, buat elemen `<li>` baru berisi teks nomor urut counter dan sisipkan ke dalam daftar `<ul>`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [03 - DOM Manipulasi Element](../03-element-manipulation/README.md)
- ➡️ **Selanjutnya:** [05 - DOM Events](../05-dom-events/README.md)
- 🏠 **Daftar Isi Modul 05:** [README Modul 05](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
