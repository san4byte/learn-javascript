# 06 - DOM Traversal dan Event Bubbling

## Tujuan Belajar
- Menelusuri relasi keluarga elemen DOM (`parentElement`, `children`, `nextElementSibling`).
- Memahami mekanisme *Event Bubbling* (penjalaran event ke elemen induk).
- Menggunakan `e.target`, `e.preventDefault()`, dan `e.stopPropagation()`.
- Mengimplementasikan teknik efisien *Event Delegation*.

## Penjelasan Konsep
- **DOM Traversal**: Mengakses elemen berdasarkan posisinya terhadap elemen yang sedang aktif (misalnya tombol close ingin menutup kartu induknya via `e.target.parentElement`).
- **Event Bubbling**: Ketika elemen anak diklik, event tersebut otomatis merambat naik ke elemen induk, kakek, hingga `document`.
- **Event Delegation**: Cukup memasang satu event listener pada elemen container induk, lalu mendeteksi elemen mana yang diklik via `e.target`.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Penelusuran node (DOM Traversal) dan Event Delegation

const container = document.querySelector(".container");
container.addEventListener("click", (e) => {
  if (e.target.className == "close") {
    e.target.parentElement.classList.toggle("active");
    e.preventDefault();
  }
});
```

---
[⬅️ Materi Sebelumnya: 05 - DOM Events](../05-dom-events/README.md) | [Materi Selanjutnya: 07 - Latihan Ubah Warna ➡️](../07-latihan-ubah-warna/README.md)
