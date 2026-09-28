# 05 - DOM Events

## Tujuan Belajar
- Memahami konsep penanganan interaksi pengguna (*Event Handling*).
- Membandingkan metode Event Handler (inline HTML vs properti onclick) dengan `addEventListener()`.
- Mengetahui jenis-jenis event populer (mouse, keyboard, form).

## Penjelasan Konsep
Event adalah sinyal yang dikirimkan browser ketika interaksi pengguna terjadi (misal mouse diklik, kursor diarahkan, tombol keyboard ditekan):
- **Event Handler Klasik (`onclick`)**: Menimpa handler sebelumnya (hanya bisa punya 1 aksi untuk 1 event).
- **`addEventListener(event, callback)`**: Standar modern yang dapat mendaftarkan beberapa callback listener pada satu event yang sama tanpa saling menimpa.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Penanganan event pada elemen DOM

const p3 = document.querySelector(".p3");
function ubahWarnap3() {
  p3.style.backgroundColor = "salmon";
}
p3.onclick = ubahWarnap3;

const p4 = document.querySelector("#b p");
p4.addEventListener("click", function () {
  const ul = document.querySelector("#b ul");
  const liBaru = document.createElement("li");
  const textLibaru = document.createTextNode("Item Baru");
  liBaru.appendChild(textLibaru);
  ul.appendChild(liBaru);
});
```

---
[⬅️ Materi Sebelumnya: 04 - Manipulasi Node](../04-dom-manipulasi-node/README.md) | [Materi Selanjutnya: 06 - DOM Traversal ➡️](../06-dom-traversal/README.md)
