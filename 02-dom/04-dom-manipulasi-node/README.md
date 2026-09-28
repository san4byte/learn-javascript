# 04 - DOM Manipulasi Node

## Tujuan Belajar
- Membuat elemen dan teks baru dari nol (`createElement`, `createTextNode`).
- Menyisipkan node ke dalam pohon DOM (`appendChild`, `insertBefore`).
- Menghapus elemen (`removeChild`) dan mengganti elemen (`replaceChild`).

## Penjelasan Konsep
Jika materi sebelumnya memanipulasi elemen yang sudah ada, materi ini membuat node baru secara utuh di memori lalu menempelkannya ke dokumen:
1. `document.createElement('tag')`: Membuat kerangka tag elemen baru.
2. `document.createTextNode('teks')`: Membuat simpul teks isi elemen.
3. `parent.appendChild(anak)`: Menempelkan elemen anak di urutan paling akhir dari elemen induk.
4. `parent.insertBefore(elemenBaru, elemenAcuan)`: Menyisipkan elemen sebelum elemen acuan tertentu.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Membuat, menyisipkan, mengganti, dan menghapus node DOM

// 1. createElement & appendChild
const pBaru = document.createElement("p");
const textpBaru = document.createTextNode("Paragraf Baru");
pBaru.appendChild(textpBaru);

const sectionA = document.getElementById("a");
sectionA.appendChild(pBaru);

// 2. insertBefore
const liBaru = document.createElement("li");
const textLiBaru = document.createTextNode("Item Baru");
liBaru.appendChild(textLiBaru);

const ul = document.querySelector("#b ul");
const li2 = document.querySelector("#b ul li:nth-child(2)");
ul.insertBefore(liBaru, li2);

// 3. removeChild
const link = document.getElementsByTagName("a")[0];
sectionA.removeChild(link);

// 4. replaceChild
const sectionB = document.getElementById("b");
const p4 = sectionB.querySelector("p");
const h2Baru = document.createElement("h2");
const textH2Baru = document.createTextNode("Judul Baru!");
h2Baru.appendChild(textH2Baru);
sectionB.replaceChild(h2Baru, p4);
```

---
[⬅️ Materi Sebelumnya: 03 - Manipulasi Element](../03-dom-manipulasi-element/README.md) | [Materi Selanjutnya: 05 - DOM Events ➡️](../05-dom-events/README.md)
