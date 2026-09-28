# 03 - DOM Manipulasi Element

## Tujuan Belajar
- Mengubah teks dan HTML di dalam elemen (`innerHTML`, `textContent`).
- Memanipulasi inline CSS via properti `style`.
- Mengelola atribut elemen (`setAttribute`, `getAttribute`, `removeAttribute`).
- Mengelola class CSS secara efisien menggunakan `classList` (`add`, `remove`, `toggle`, `contains`).

## Penjelasan Konsep
Manipulasi elemen berfokus pada perubahan data visual dan atribut pada elemen HTML yang sudah terpasang di halaman:
- `element.innerHTML`: Mengubah konten HTML lengkap beserta tag anak di dalamnya.
- `element.style.property`: Mengatur style CSS (nama properti camelCase, misal `backgroundColor`).
- `element.classList.toggle('active')`: Menambah class jika belum ada, atau menghapus class jika sudah ada.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Manipulasi atribut dan isi elemen HTML

const judul = document.getElementById("judul");
judul.innerHTML = "Joko Santoso";
judul.style.color = "salmon";

const sectionA = document.querySelector("#a");
const a = document.querySelector("section#a a");
judul.setAttribute("name", "joko");

const p2 = document.querySelector(".p2");
p2.classList.add("label");
```

## Penjelasan Tambahan
- **Keamanan XSS (Cross-Site Scripting)**:
  Berhati-hatilah menggunakan `innerHTML` jika sumber teks berasal dari input pengguna tak terpercaya, karena dapat disusupi skrip berbahaya (`<script>`). Jika hanya ingin mengganti teks murni, gunakan `element.textContent`.
- **Best Practice Desain**:
  Hindari memanipulasi banyak inline style secara langsung di JS (`el.style.color = ...`, `el.style.fontSize = ...`). Lebih disarankan membuat class di file CSS lalu gunakan `el.classList.add('nama-class')`.

---
[⬅️ Materi Sebelumnya: 02 - DOM Selection](../02-dom-selection/README.md) | [Materi Selanjutnya: 04 - Manipulasi Node ➡️](../04-dom-manipulasi-node/README.md)
