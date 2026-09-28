# 02 - DOM Selection (Menyeleksi Elemen)

## Tujuan Belajar
- Menguasai 5 method utama seleksi elemen di DOM.
- Memahami perbedaan tipe nilai kembalian: `Element`, `HTMLCollection`, dan `NodeList`.
- Memahami konsep *live collection* vs *static collection*.

## Penjelasan Konsep
Method seleksi elemen DOM:
1. `document.getElementById(id)`: Cepat, mengembalikan 1 **Element** tunggal berdasarkan atribut id.
2. `document.getElementsByTagName(tag)`: Mengembalikan kumpulan elemen bertipe **HTMLCollection** (dinamis/live).
3. `document.getElementsByClassName(class)`: Mengembalikan kumpulan elemen bertipe **HTMLCollection**.
4. `document.querySelector(selectorCSS)`: Mengembalikan 1 **Element** pertama yang cocok dengan CSS selector.
5. `document.querySelectorAll(selectorCSS)`: Mengembalikan seluruh elemen yang cocok dalam bentuk **NodeList** (statis).

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Seleksi elemen DOM menggunakan berbagai method

const judul = document.getElementById("judul");
judul.style.color = "salmon";
judul.style.backgroundColor = "#ccc";
judul.innerHTML = "Joko santoso";

const p = document.getElementsByTagName("p");
for (let i = 0; i < p.length; i++) {
  p[i].style.backgroundColor = "lightblue";
}

const h1 = document.getElementsByTagName("h1")[0];
h1.style.fontSize = "50px";

const p1 = document.getElementsByClassName("p1")[0];
p1.innerHTML = "ini paragraf 1 yang diubah di javascript";

const p4 = document.querySelector("#b p");
p4.style.backgroundColor = "salmon";

const li2 = document.querySelector("#b ul li:nth-child(2)");
li2.style.color = "green";

const pDua = document.querySelectorAll("p");
for (let j = 0; j < pDua.length; j++) {
  pDua[j].style.backgroundColor = "grey";
}
```

### Output
Warna background judul berubah salmon, paragraf berubah background, dan teks di halaman termodifikasi seketika.

## Penjelasan Tambahan
- **HTMLCollection vs NodeList**:
  - `HTMLCollection` tidak mendukung method modern seperti `.forEach()` secara langsung (harus dikonversi dulu dengan `Array.from()`).
  - `NodeList` yang dihasilkan `querySelectorAll()` sudah memiliki method bawaan `.forEach()`.
- **Best Practice Modern**:
  Gunakan `document.querySelector()` dan `document.querySelectorAll()` untuk fleksibilitas tinggi karena mendukung semua sintaks CSS selector (`#id`, `.class`, `:nth-child`, `[attr=val]`).

## Latihan
1. Pilih elemen input pertama dengan tipe teks menggunakan `document.querySelector()`.
2. Gunakan `document.querySelectorAll('li')` dan looping `.forEach()` untuk menambahkan teks nomor urut di setiap tag list item.

---
[⬅️ Materi Sebelumnya: 01 - Pengenalan DOM](../01-intro/README.md) | [Materi Selanjutnya: 03 - Manipulasi Element ➡️](../03-dom-manipulasi-element/README.md)
