# 06.5 - Project Perhitungan Volume Dua Kubus

## Tujuan Belajar
- Mengimplementasikan rumus matematika ke dalam fungsi JavaScript.
- Memahami konsep *Refactoring* kode agar lebih ringkas, efisien, dan mudah dibaca.

## Penjelasan Konsep
Studi kasus menghitung jumlah total volume dari dua buah kubus yang masing-masing memiliki panjang sisi $sisiA$ dan $sisiB$:
$$V_{total} = sisiA^3 + sisiB^3$$
Versi awal menggunakan banyak variabel sementara, kemudian direfaktorisasi (*code refactoring*) menjadi satu baris ekspresi return yang bersih.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Menghitung total volume dua kubus
function volumeKubus(a, b) {
  return a * a * a + b * b * b;
}

console.log("Total volume kubus (sisi 10 dan 5):", volumeKubus(10, 5));
```

### Output
```text
Total volume kubus (sisi 10 dan 5): 1125
```

## Penjelasan Tambahan
- **Apa itu Code Refactoring?**:
  Refactoring adalah proses merestrukturisasi kode program yang sudah ada tanpa mengubah perilaku eksternal atau outputnya. Tujuannya adalah membuat kode lebih mudah dipahami (*readable*), mengurangi kompleksitas (*clean code*), dan membuang variabel perantara yang tidak diperlukan di memori.
- **Tips Operator Eksponen ES6**:
  Selain menulis `a * a * a`, JavaScript modern menyediakan operator pangkat `**`, sehingga dapat ditulis: `return (a ** 3) + (b ** 3);`.

## Latihan
1. Refaktorisasi fungsi `volumeKubus` di atas menggunakan operator eksponen modern `**`.
2. Buat fungsi `hitungSisiMiringPythagoras(a, b)` yang menghitung hipotenusa $\sqrt{a^2 + b^2}$ menggunakan bantuan fungsi bawaan `Math.sqrt()`.

## Ringkasan Poin Penting
- Refactoring meningkatkan kualitas dan keterbacaan kode tanpa mengubah fungsi utamanya.
- Menulis kode bersih (*clean code*) adalah kebiasaan penting seorang programmer profesional.

---
[⬅️ Materi Sebelumnya: 06.4 - Fungsi Rekursif](../04-rekursif/README.md) | [Materi Selanjutnya: 07.1 - Manipulasi Array ➡️](../../07-array/01-manipulasi-array/README.md)
