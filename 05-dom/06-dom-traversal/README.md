# 06 - DOM Traversal dan Teknik Event Delegation

## 1. 🎯 Tujuan Belajar
- Memahami konsep penelusuran elemen silsilah keluarga DOM (*DOM Traversal*).
- Mengenal navigasi: `parentElement`, `nextElementSibling`, `previousElementSibling`, `children`.
- Memahami fenomena Event Bubbling di DOM Tree.
- Menguasai teknik Event Delegation untuk efisiensi memori tingkat tinggi.

---

## 2. 📖 Penjelasan Konsep
**DOM Traversal** adalah proses berpindah atau menelusuri node-node lain berdasarkan hubungan kekerabatan (*silsilah*) dari elemen yang sedang kita pilih saat ini:
* **Induk**: `element.parentElement`
* **Anak**: `element.children` (hanya element node)
* **Saudara Sejajar**: `element.nextElementSibling` dan `element.previousElementSibling`

### 🫧 Konsep Event Bubbling & Event Delegation
Ketika sebuah elemen anak (misal `<button>`) diklik, event klik tersebut tidak hanya berhenti di tombol itu saja, melainkan akan **merambat naik (*bubble up*)** ke elemen induknya (`<div>`), lalu ke `<body>`, `<html>`, hingga ke `document`.

**Event Delegation (Teknik Standar Industri)**:
Jika Anda memiliki daftar 1.000 item keranjang belanja dengan tombol 'Hapus':
* *Cara Buruk*: Memasang `addEventListener` sebanyak 1.000 kali ke setiap tombol (boros memori).
* *Cara Jenius (Event Delegation)*: Pasang **1 buah listener saja pada kontainer induknya (`<ul>`)**, lalu periksa apakah yang diklik adalah tombol hapus menggunakan `e.target.classList.contains('btn-hapus')`!

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

if (typeof document === 'undefined') {
  console.log("--- 06. DOM Traversal & Event Delegation ---");
  console.log("Buka file 'index.html' di browser untuk melihat demonstrasi Event Delegation!");
} else {
  console.log("--- 06. DOM Traversal & Event Delegation (Browser) ---");

  // POLA EVENT DELEGATION:
  // Pasang HANYA 1 listener pada elemen kontainer induk
  const kontainerDaftar = document.getElementById("daftar-kartu");

  if (kontainerDaftar) {
    kontainerDaftar.addEventListener("click", function (e) {
      // Cek apakah elemen yang diklik memiliki class 'btn-tutup'
      if (e.target.classList.contains("btn-tutup")) {
        // DOM Traversal: ambil elemen kartu induk dari tombol tersebut
        const kartuInduk = e.target.parentElement;
        console.log(`[HAPUS KARTU]: Menghapus kartu: ${kartuInduk.id}`);
        
        // Hapus kartu dari tampilan
        kartuInduk.remove();
      }
    });
  }
}
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 06. DOM Traversal & Event Delegation (Browser) ---
[HAPUS KARTU]: Menghapus kartu: kartu-1
[HAPUS KARTU]: Menghapus kartu: kartu-3
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> Event Bubbling seperti **gelembung udara di dalam air aquarium**: gelembung muncul dari dasar air (elemen anak) dan terus bergerak naik ke permukaan air (elemen induk/document). Event Delegation seperti **satpam di pintu gerbang utama perumahan**: daripada menaruh 1 satpam di setiap pintu 100 rumah, cukup taruh 1 satpam di gerbang utama untuk memeriksa seluruh orang yang masuk.

### 🏢 Real-World Use Case
1. **Daftar Pesan Chat / Feed Dinamis**: Pesan chat baru yang masuk secara real-time via WebSocket tidak perlu dipasangi event listener manual satu per satu karena sudah tertangani oleh Event Delegation di kontainer chat.
2. **Tabel Data Besar (DataGrid)**: Tombol aksi edit/delete pada tabel dengan ribuan baris data.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Mengira Elemen Dinamis Otomatis Punya Listener**: Jika Anda memasang listener konvensional pada tombol yang sudah ada, lalu menambahkan tombol baru via `appendChild`, tombol baru tersebut TIDAK AKAN bisa diklik! Event Delegation menyelesaikan masalah ini secara otomatis.

### 🌟 Best Practice
* Selalu gunakan teknik **Event Delegation** jika Anda mengelola daftar elemen yang jumlahnya banyak atau elemennya dapat bertambah/berkurang secara dinamis.

---

## 6. ✍️ Latihan Mandiri
1. Buatlah daftar `<ul>` berisi 3 buah `<li>` dengan tombol hapus di setiap barisnya. Terapkan Event Delegation pada tag `<ul>` agar tombol hapus dapat menghilangkan baris `<li>` terkait.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [05 - DOM Events](../05-dom-events/README.md)
- ➡️ **Selanjutnya:** [07 - Latihan Ubah Warna](../09-practice-color-picker/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
