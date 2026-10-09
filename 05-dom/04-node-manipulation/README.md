# 04 - DOM Manipulasi Node (Membuat, Menyisipkan, dan Menghapus Simpul)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Membuat elemen HTML baru secara dinamis di memori, menempatkannya ke posisi tertentu pada DOM Tree, mengganti, menduplikasi, atau menghapusnya.
> - **Kapan Digunakan**: Penting untuk fitur Todo List, rendering daftar data dinamis hasil request API, modal dialog, hingga komponen UI interaktif.
> - **Aturan Praktis**: Gunakan `document.createElement()` untuk merakit elemen. Untuk penyisipan modern, gunakan `append()` dan `prepend()`. Untuk penghapusan, gunakan method modern `element.remove()` langsung tanpa repot memanggil elemen induk.

---

## 1. 🎯 Tujuan Belajar

- Memahami cara membuat simpul baru di memori browser menggunakan `document.createElement()`.
- Menguasai teknik menyisipkan elemen di akhir (`appendChild`, `append`) dan di awal (`prepend`).
- Mengetahui cara menyisipkan simpul sebelum elemen tertentu (`insertBefore`, `before`) atau sesudahnya (`after`).
- Memahami cara menghapus elemen menggunakan `removeChild()` dan method modern `element.remove()`.
- Menguasai penggantian elemen menggunakan `replaceChild()` dan `replaceWith()`.
- Memahami optimasi performa _batch DOM injection_ menggunakan `DocumentFragment` dan kloning dengan `cloneNode()`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Bayangkan DOM Tree seperti **rangkaian gerbong kereta api**:
>
> - `createElement('li')`: Seperti **membuat gerbong baru di dalam bengkel karoseri** (elemen sudah ada di memori RAM, tetapi belum terpasang di rel kereta).
> - `appendChild()`: **Menggandengkan gerbong baru tersebut di gerbong paling belakang**.
> - `prepend()`: **Menempatkan gerbong khusus tepat di belakang lokomotif terdepan**.
> - `insertBefore()`: **Menyelipkan gerbong baru di antara gerbong nomor 2 dan nomor 3**.
> - `element.remove()`: **Melepaskan kaitan gerbong tersebut dari rel kereta**.
> - `DocumentFragment`: Seperti **merakit satu rangkaian isi 10 gerbong sekaligus di bengkel**, baru kemudian ditarik ke rel utama dalam **1 kali perjalanan**, alih-alih mondar-mandir 10 kali (mencegah macet/lag _browser reflow_).

---

### Tabel Perbandingan Method Manipulasi Node

| Method                          | Posisi Target      | Mendukung String Teks      | Standar / Era       |
| :------------------------------ | :----------------- | :------------------------- | :------------------ |
| `parent.appendChild(node)`      | Anak terakhir      | ❌ Harus berupa Node       | W3C DOM Level 1     |
| `parent.append(...nodes/str)`   | Anak terakhir      | ✅ Ya (otomatis text node) | Modern (DOM Living) |
| `parent.prepend(...nodes/str)`  | Anak pertama       | ✅ Ya                      | Modern (DOM Living) |
| `parent.insertBefore(new, ref)` | Sebelum `ref`      | ❌ Harus berupa Node       | W3C DOM Level 1     |
| `child.before(...nodes/str)`    | Sebelum simpul     | ✅ Ya                      | Modern (DOM Living) |
| `child.after(...nodes/str)`     | Setelah simpul     | ✅ Ya                      | Modern (DOM Living) |
| `child.remove()`                | Hapus diri sendiri | -                          | Modern (DOM Living) |
| `parent.removeChild(child)`     | Hapus anak         | -                          | Tradisional         |
| `child.replaceWith(...new)`     | Ganti diri sendiri | ✅ Ya                      | Modern (DOM Living) |
| `node.cloneNode(deep)`          | Gandakan simpul    | -                          | W3C Standard        |

---

### Pembahasan Mendalam Fitur & API

#### 1. `document.createElement()` dan `document.createTextNode()`

Membuat elemen baru di memori RAM. Elemen ini belum terlihat di layar sampai Anda menyisipkannya ke salah satu kontainer DOM.

```javascript
// 1. Buat elemen HTML
const itemBaru = document.createElement("li");
// 2. Beri teks dan kelas
itemBaru.textContent = "Belajar Manipulasi Node";
itemBaru.classList.add("item-aktif");
```

#### 2. `parent.appendChild()` vs `parent.append()`

`appendChild` adalah method klasik yang hanya menerima 1 simpul objek Node. Sementara method modern `append` menerima banyak simpul sekaligus maupun string teks langsung.

```javascript
const list = document.querySelector("ul");
const li = document.createElement("li");

// Cara Klasik:
list.appendChild(li);

// Cara Modern (bisa menyisipkan teks langsung & multi-argumen):
list.append(li, "Teks Tambahan");
```

#### 3. `parent.prepend()`

Menyisipkan satu atau beberapa simpul baru di urutan paling awal (sebelum anak pertama yang sudah ada).

```javascript
const itemPrioritas = document.createElement("li");
itemPrioritas.textContent = "Prioritas #1: Review Keamanan";
list.prepend(itemPrioritas);
```

#### 4. `parent.insertBefore(newNode, referenceNode)`

Menyisipkan `newNode` tepat sebelum posisi `referenceNode`.

```javascript
const targetRef = document.getElementById("tugas-2");
const itemSisipan = document.createElement("li");
itemSisipan.textContent = "Tugas Sisipan";

// Menyisipkan sebelum tugas-2
list.insertBefore(itemSisipan, targetRef);
```

#### 5. `child.before()` dan `child.after()`

Method modern pada simpul target untuk menyisipkan elemen saudara (_sibling_) tanpa perlu memanggil elemen induk.

```javascript
const target = document.getElementById("tugas-2");

target.before(document.createElement("hr")); // Sisip garis tepat sebelum tugas-2
target.after(document.createElement("p")); // Sisip paragraf tepat setelah tugas-2
```

#### 6. `parent.removeChild()` vs `child.remove()`

Dahulu untuk menghapus elemen kita harus mencari parent-nya terlebih dahulu (`el.parentNode.removeChild(el)`). Standar modern menyediakan `el.remove()` yang jauh lebih ringkas.

```javascript
const itemHapus = document.getElementById("tugas-1");

// Standar Modern:
itemHapus.remove();

// Cara Tradisional (jika menargetkan browser lama):
// itemHapus.parentElement.removeChild(itemHapus);
```

#### 7. `parent.replaceChild()` vs `child.replaceWith()`

Menggantikan simpul lama dengan simpul baru.

```javascript
const tugasLama = document.getElementById("tugas-3");
const tugasBaru = document.createElement("li");
tugasBaru.textContent = "Tugas Terkini: QA Testing";

// Standar Modern:
tugasLama.replaceWith(tugasBaru);
```

#### 8. `node.cloneNode(deep)` dan Optimasi `DocumentFragment`

- `cloneNode(false)`: Mengkloning tag elemen beserta atributnya saja.
- `cloneNode(true)`: _Deep clone_ (menggandakan seluruh hierarki anak dan teks di dalamnya).
- `DocumentFragment`: Wadah memori virtual ringan untuk menampung ratusan elemen sebelum disisipkan bersamaan ke DOM dalam 1 kali proses render (_reflow_).

```javascript
// Menggandakan simpul lengkap dengan isinya:
const duplikat = tugasBaru.cloneNode(true);

// Batch insertion dengan DocumentFragment:
const fragment = document.createDocumentFragment();
for (let i = 1; i <= 10; i++) {
  const el = document.createElement("li");
  el.textContent = `Batch Item #${i}`;
  fragment.appendChild(el);
}
list.appendChild(fragment); // Hanya memicu 1x reflow browser!
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi pembuatan elemen, penyisipan terstruktur (`appendChild`, `prepend`, `insertBefore`), penggantian, penghapusan (`remove`), dan optimasi `DocumentFragment` telah dirangkum dalam berkas praktik [`example.js`](example.js).

Berkas ini siap diuji di terminal Node.js untuk melihat simulasi aliran data maupun dibuka langsung di browser via [`index.html`](index.html).

Jalankan demonstrasi simulasi di terminal:

```bash
node 05-dom/04-node-manipulation/example.js
```

Atau buka [`index.html`](index.html) langsung di browser dan buka **DevTools Console (`F12`)** untuk melihat perubahan susunan daftar tugas secara interaktif.

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Komponen Dinamis To-Do List**:
   ```javascript
   function addTodoItem(text) {
     const li = document.createElement("li");
     li.textContent = text;

     const btnDelete = document.createElement("button");
     btnDelete.textContent = "Hapus";
     btnDelete.onclick = () => li.remove();

     li.appendChild(btnDelete);
     document.getElementById("todo-list").appendChild(li);
   }
   ```
2. **Infinite Scroll Pagination**: Merender 20 item produk baru ke dalam `DocumentFragment` lalu menyematkannya ke bagian bawah katalog dalam 1 kali eksekusi render.

### ⚠️ Common Pitfalls

- **Menyisipkan di dalam Loop Tanpa Fragment**: Menjalankan `parent.appendChild()` 1.000 kali di dalam perulangan `for` akan memaksa browser menghitung ulang layout (_reflow_ dan _repaint_) 1.000 kali, menyebabkan halaman macet (_jank_). Kumpulkan di `DocumentFragment` terlebih dahulu.
- **Lupa Argumen Boolean pada `cloneNode()`**: Jika memanggil `node.cloneNode()` tanpa argumen `true`, teks dan anak elemen di dalamnya tidak akan ikut disalin.
- **Menyisipkan Simpul yang Sama Berulang Kali**: Simpul DOM di memori adalah unik. Jika Anda memanggil `appendChild(el)` pada elemen yang sudah ada di dokumen, elemen tersebut akan **dipindahkan**, bukan digandakan.

### 🌟 Best Practice

- Gunakan method modern seperti `append()`, `prepend()`, dan `element.remove()` untuk kode yang lebih bersih dan deklaratif.
- Manfaatkan `createDocumentFragment()` setiap kali Anda merender daftar data berjumlah lebih dari 5 item.

---

## 5. ✍️ Latihan Mandiri

1. Buka berkas [`index.html`](index.html) di browser. Melalui Console (`F12`), buat sebuah elemen tombol baru (`<button>`) dengan teks `"Selesaikan Semua"`, lalu sisipkan tepat di atas elemen `#daftar-tugas` menggunakan method `daftarTugas.before(tombol)`.
2. Lakukan kloning pada elemen `#tugas-2` dengan `cloneNode(true)` dan tempelkan hasil kloningan tersebut di akhir daftar.

---

## 6. 🧭 Navigasi

- ⬅️ **Materi Sebelumnya:** [03 - DOM Manipulasi Element](../03-element-manipulation/README.md)
- ➡️ **Materi Selanjutnya:** [05 - DOM Events](../05-dom-events/README.md)
- 🏠 **Daftar Isi Modul 05:** [README Modul 05](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
