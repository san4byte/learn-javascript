# 05 - Template Literals dan Tagged Templates

## Tujuan Belajar
- Menggunakan backtick (`` ` ``) untuk membuat string template.
- Memahami *String Interpolation* (`${ekspresi}`).
- Membuat fragmen template HTML multi-line tanpa penggabungan `+`.
- Memahami teknik advance *Tagged Template Literals*.

## Penjelasan Konsep
Template Literals mempermudah manipulasi teks di JavaScript:
1. **Multiline String**: Teks dapat memiliki baris baru tanpa perlu menuliskan karakter `\n`.
2. **String Interpolation**: Menyisipkan nilai variabel atau ekspresi JavaScript (operator ternary, pemanggilan fungsi) di dalam `${}`.
3. **Tagged Templates**: Bentuk ekspresi fungsi khusus yang menerima pecahan string dan argumen ekspresi template untuk diproses khusus (misal sanitasi string atau styling CSS).

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Template literals: string interpolation dan multi-line string

const nama = "joko";
const umur = 20;
console.log(`hallo nama saya ${nama}, umur saya ${umur}`);

const x = 10;
console.log(`Angka 10 adalah: ${x % 2 == 0 ? "genap" : "ganjil"}`);

const mhs = {
  nama: "joko",
  umur: 20,
  nirm: "12142119184",
  email: "joko744@gmail.com",
};

const el = `
<div class="mhs">
  <h2>${mhs.nama}</h2>
  <span class="nirm">${mhs.nirm}</span>
</div>`;
console.log(el);
```

### Output
```text
hallo nama saya joko, umur saya 20
Angka 10 adalah: genap

<div class="mhs">
  <h2>joko</h2>
  <span class="nirm">12142119184</span>
</div>
```

---
[⬅️ Materi Sebelumnya: 04 - Higher-Order Functions](../04-higher-order-functions/README.md) | [Materi Selanjutnya: 06 - Destructuring Assignment ➡️](../06-destructuring/README.md)
