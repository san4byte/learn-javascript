# 06 - DOM Traversal & Event Delegation

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menelusuri hubungan silsilah keluarga antar-elemen (induk, anak, saudara) pada DOM Tree dan mengoptimalkan performa event penanganan aksi menggunakan pola **Event Delegation**.
> - **Kapan Digunakan**: Menghapus baris tabel saat tombol hapus diklik, membuat komponen kartu dinamis, tabs, dropdown, accordion, dan menangani elemen baru yang dibuat di masa depan tanpa mendaftarkan event berulang kali.
> - **Aturan Praktis**: Gunakan _Element Traversal_ (`parentElement`, `children`, `nextElementSibling`) alih-alih _Node Traversal_ agar terhindar dari simpul spasi/enter kosong. Manfaatkan `element.closest()` dan _Event Delegation_ untuk kode modular berkinerja tinggi.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep penelusuran (_traversal_) hubungan keluarga antar simpul elemen pada DOM Tree.
- Membedakan _Node Traversal_ (`childNodes`, `parentNode`) dengan _Element Traversal_ (`children`, `parentElement`).
- Menguasai method modern navigasi leluhur menggunakan `element.closest(selector)`.
- Memahami siklus hidup perambatan event di browser: _Capturing Phase_, _Target Phase_, dan _Bubbling Phase_.
- Mengimplementasikan pola arsitektur **Event Delegation** untuk menghemat konsumsi memori dan menangani elemen dinamis secara otomatis.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **DOM Traversal** seperti **menelusuri silsilah pohon keluarga**: Jika Anda memegang tangan seorang anak (`e.target`), Anda bisa melihat siapa ayah/ibunya (`parentElement`), siapa adik/kakaknya (`nextElementSibling`), atau mencari kepala suku marganya di atas (`closest('.keluarga-besar')`).
> - **Event Bubbling** seperti **gelembung udara di dalam air kolam**: Gelembung yang muncul dari dasar (klik tombol paling dalam) akan terus melayang naik ke permukaan air (mengalir naik melewati `<div>`, `<body>`, hingga `document`).
> - **Event Delegation** seperti **pos pos satpam di pintu gerbang utama perumahan**: Alih-alih setiap warga di 500 rumah memasang satpam pribadi di depan pintu kamarnya masing-masing (boros memori), cukup taruh 1 pos satpam di gerbang utama perumahan (`container`) yang memeriksa tanda pengenal setiap tamu yang datang (`e.target`).

---

### Tabel Perbandingan Properti Silsilah Traversal

| Kategori Hubungan   | Element Traversal (Direkomendasikan)          | Node Traversal (Memperhitungkan Spasi) |
| :------------------ | :-------------------------------------------- | :------------------------------------- |
| **Induk / Leluhur** | `element.parentElement` / `element.closest()` | `node.parentNode`                      |
| **Kumpulan Anak**   | `element.children` (`HTMLCollection`)         | `node.childNodes` (`NodeList`)         |
| **Anak Pertama**    | `element.firstElementChild`                   | `node.firstChild`                      |
| **Anak Terakhir**   | `element.lastElementChild`                    | `node.lastChild`                       |
| **Saudara Berikut** | `element.nextElementSibling`                  | `node.nextSibling`                     |
| **Saudara Sebelum** | `element.previousElementSibling`              | `node.previousSibling`                 |

---

### Pembahasan Mendalam Fitur & API

#### 1. Perbedaan Node Traversal vs Element Traversal

Browser menganggap spasi putih (_whitespace_) dan baris baru (_line break_) di file HTML sebagai simpul teks (`Text Node`). Akibatnya, `firstChild` sering kali menghasilkan simpul teks kosong bukan tag HTML yang diinginkan.

```javascript
const list = document.querySelector("ul");

// ❌ Node Traversal: Sering mengembalikan Text Node (spasi kosong)
console.log(list.firstChild); // #text "\n  "

// ✅ Element Traversal: Dijamin mengembalikan tag elemen HTML murni
console.log(list.firstElementChild); // <li>Item 1</li>
```

#### 2. Menelusuri Induk Elemen: `parentElement`

Mengambil satu simpul pembungkus tepat di atas elemen saat ini.

```javascript
const tombolClose = document.querySelector(".close");
const kartuInduk = tombolClose.parentElement; // Mengambil elemen <div class="card">
console.log("Class induk:", kartuInduk.className);
```

#### 3. Menelusuri Kumpulan Anak Elemen: `children`

Mengembalikan koleksi seluruh anak langsung yang bertipe elemen tanpa menyertakan spasi teks.

```javascript
const kontainer = document.querySelector(".container");
console.log("Jumlah kartu anak:", kontainer.children.length);
console.log("Kartu pertama:", kontainer.firstElementChild);
console.log("Kartu terakhir:", kontainer.lastElementChild);
```

#### 4. Menelusuri Saudara Kandung: `nextElementSibling` & `previousElementSibling`

Digunakan untuk mengambil elemen sejajar berikutnya atau sebelumnya di dalam induk yang sama.

```javascript
const kartuAktif = document.querySelector(".card-aktif");
const kartuBerikutnya = kartuAktif.nextElementSibling;
if (kartuBerikutnya) {
  kartuBerikutnya.classList.add("sorot");
}
```

#### 5. Navigasi Leluhur Fleksibel dengan `element.closest(selector)`

Mencari simpul leluhur terdekat (atau elemen itu sendiri) yang cocok dengan aturan CSS Selector tertentu. Sangat berguna ketika elemen target bersarang di dalam struktur yang dalam.

```javascript
// Pengguna mengklik icon di dalam span di dalam tombol:
const icon = document.querySelector("i.icon-trash");

// Langsung melompat ke pembungkus .card terdekat tanpa peduli berapa lapis div di antaranya:
const kartu = icon.closest(".card");
kartu?.remove();
```

#### 6. Mekanisme Event Bubbling

Ketika sebuah elemen diklik, event berjalan melalui 3 fase:

1. **Capturing Phase**: Event turun dari `window` ke bawah menuju elemen target.
2. **Target Phase**: Event tiba pada elemen target tempat interaksi dilakukan.
3. **Bubbling Phase**: Event memantul dan merambat naik dari target kembali ke `document` dan `window`.

```javascript
document.body.addEventListener("click", () => {
  console.log("Body mendengar klik karena gelembung (Bubbling)!");
});
```

#### 7. Pola Arsitektur Event Delegation

Teknik memasang **satu event listener tunggal** pada elemen kontainer pembungkus, kemudian memanfaatkan `e.target` untuk mengidentifikasi anak mana yang diklik pengguna.

```javascript
const daftar = document.getElementById("kontainer-kartu");

// Pasang HANYA 1 listener untuk seluruh kartu yang ada maupun yang akan datang:
daftar.addEventListener("click", function (e) {
  if (e.target.classList.contains("close")) {
    const kartu = e.target.closest(".card");
    kartu?.remove();
  }
});
```

#### 8. Menangani Elemen Dinamis Tanpa Re-Binding

Dengan Event Delegation, ketika Anda menambahkan kartu atau item baru ke dalam kontainer melalui `appendChild()`, item baru tersebut **langsung aktif dan merespon klik secara otomatis** tanpa perlu mendaftarkan event listener baru!

```javascript
// Tambah kartu baru secara dinamis
const kartuBaru = document.createElement("div");
kartuBaru.className = "card";
kartuBaru.innerHTML = '<span>User Baru</span><span class="close">×</span>';
daftar.appendChild(kartuBaru);
// Tombol × pada kartuBaru otomatis berfungsi seketika!
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi perbandingan traversal, navigasi silsilah `parentElement`, `children`, method `closest()`, dan demonstrasi interaktif pola arsitektur **Event Delegation** telah dirangkum dalam berkas praktik [`example.js`](example.js).

Berkas ini dirancang ganda (_dual-compatible_) untuk dapat diuji di terminal Node.js guna memahami alur data simpul, maupun langsung di peramban web via [`index.html`](index.html).

Jalankan demonstrasi simulasi di terminal:

```bash
node 05-dom/06-dom-traversal/example.js
```

Atau buka [`index.html`](index.html) langsung di browser dan buka **DevTools Console (`F12`)** untuk mencoba mengklik tombol close (`×`) pada kartu profil secara interaktif.

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Komponen Tabel Data Interaktif (Action Column)**:
   ```javascript
   tableBody.addEventListener("click", (e) => {
     const btnEdit = e.target.closest(".btn-edit");
     if (btnEdit) {
       const row = btnEdit.closest("tr");
       const rowId = row.dataset.id;
       bukaModalEdit(rowId);
     }
   });
   ```
2. **Tabs & Accordion Menu**: Memasang 1 listener pada wrapper accordion dan mengecek target header mana yang dibuka.

### ⚠️ Common Pitfalls

- **Menggunakan `parentNode` atau `nextSibling` Tanpa Sadar**: Terjebak pada simpul spasi enter kosong (_Text Node_) yang menyebabkan manipulasi salah sasaran atau melempar fatal error. Selalu gunakan versi elemen (_Element Traversal_).
- **Memasang Listener di Dalam Loop untuk Ratusan Elemen**: Memasang `btn.addEventListener()` pada 1.000 item daftar akan memakan alokasi RAM peramban secara signifikan dan menurunkan responsivitas halaman. Terapkan Event Delegation.

### 🌟 Best Practice

- Gunakan `e.target.closest('.selector')` di dalam Event Delegation untuk memastikan klik tetap tertangkap meskipun pengguna mengklik ikon anak di dalam tombol.
- Selalu prioritaskan `parentElement`, `children`, `firstElementChild`, dan `nextElementSibling` untuk kebutuhan traversal sehari-hari.

---

## 5. ✍️ Latihan Mandiri

1. Buka berkas [`index.html`](index.html) di peramban web. Melalui Console (`F12`), seleksi kartu kedua (`#card-2`), lalu ambil elemen kartu sebelum dan sesudahnya menggunakan `previousElementSibling` dan `nextElementSibling`.
2. Modifikasi event delegation pada `example.js` agar ketika area gambar profil pada kartu diklik, kartu tersebut diberi class toggle animasi kedip.

---

## 6. 🧭 Navigasi

- ⬅️ **Materi Sebelumnya:** [05 - DOM Events](../05-dom-events/README.md)
- ➡️ **Materi Selanjutnya:** [07 - HTML Form Elements](../07-html-form-elements/README.md)
- 🏠 **Daftar Isi Modul 05:** [README Modul 05](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
