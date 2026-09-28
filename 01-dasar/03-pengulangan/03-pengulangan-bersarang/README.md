# 03.3 - Pengulangan Bersarang (Nested Loops)

## Tujuan Belajar
- Memahami konsep perulangan di dalam perulangan (*loop inside a loop*).
- Memetakan koordinat 2 dimensi (baris dan kolom).
- Mampu membuat algoritma pembentukan pola karakter (seperti segitiga bintang).

## Penjelasan Konsep
Pada pengulangan bersarang:
- Loop luar (*outer loop*) mengontrol perpindahan baris vertikal.
- Loop dalam (*inner loop*) mengontrol pencetakan karakter kolom horizontal pada baris yang sedang aktif.
Setiap kali loop luar berputar satu kali, loop dalam akan berputar secara penuh dari awal sampai selesai.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Pola bintang segitiga siku-siku bertingkat
let s = "";

for (let i = 0; i < 10; i++) {
  for (let b = 0; b <= i; b++) {
    s += "*";
  }
  s += "\n";
}
console.log(s);

// Looping array menggunakan forEach
const pacarSaya = ["agus", "samsul", "bambang", "jancok"];
pacarSaya.forEach((pacar, index) => {
  console.log(pacar, index + 1);
});
```

### Output
```text
*
**
***
****
*****
******
*******
********
*********
**********
agus 1
samsul 2
bambang 3
jancok 4
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Seperti jarum jam dinding: Jarum detik (loop dalam) harus berputar penuh 60 kali agar jarum menit (loop luar) bergeser sebanyak 1 langkah.
- **Penerapan di Proyek Nyata**:
  Nested loop sangat sering digunakan saat memproses matriks tabel (baris & kolom), manipulasi piksel pada pengolahan gambar (koordinat X dan Y), atau membuat papan catur game.
- **Perhatian Kompleksitas Waktu**:
  Nested loop memiliki kompleksitas waktu $\mathcal{O}(n^2)$. Hati-hati menggunakannya pada dataset berskala besar karena waktu eksekusi akan meningkat drastis.

## Latihan
1. Buat kode untuk menghasilkan segitiga bintang terbalik (dari 5 bintang berkurang hingga 1 bintang):
   ```text
   *****
   ****
   ***
   **
   *
   ```
2. Buat tabel perkalian 1 sampai 5 menggunakan nested loop.

## Ringkasan Poin Penting
- Outer loop mengontrol baris; inner loop mengontrol kolom.
- Gunakan `\n` (newline) untuk berpindah ke baris berikutnya setelah inner loop selesai.

---
[⬅️ Materi Sebelumnya: 03.2 - Pengulangan For](../02-for/README.md) | [Materi Selanjutnya: 04.1 - Pengkondisian If Else ➡️](../../04-pengkondisian/01-if-else/README.md)
