# 05.2 - Pengkondisian Lanjutan: Else If dan Switch Case

## 1. 🎯 Tujuan Belajar
- Mampu menangani percabangan dengan lebih dari dua kondisi menggunakan `else if`.
- Memahami struktur pengkondisian `switch...case`.
- Mengetahui peran penting keyword `break` dan `default` pada blok switch.
- Mampu memilih kapan harus menggunakan `else if` dan kapan menggunakan `switch`.

---

## 2. 📖 Penjelasan Konsep
Ketika sebuah keputusan membutuhkan evaluasi lebih dari dua pilihan kemungkinan, kita dapat menggunakan **`else if`** atau **`switch...case`**.

### 1. `else if`
Digunakan saat kondisi melibatkan perbandingan rentang nilai (misal: `< 60`, `>= 75`, `&&`, `||`).

### 2. `switch...case`
Digunakan ketika sebuah variabel tunggal dicocokkan dengan **nilai pasti (*exact value*)**.
Komponen penting `switch`:
* `case nilai:`: Nilai pembanding yang diuji (menggunakan perbandingan identik `===`).
* `break`: Wajib ditulis untuk mencegah eksekusi 'bocor' ke case berikutnya (*fall-through*).
* `default`: Pilihan terakhir jika tidak ada case yang cocok (serupa dengan blok `else`).

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Percabangan Rentang Nilai dengan Else If ---");
const skorAkademik = 85;
let predikatHuruf;

if (skorAkademik >= 90) {
  predikatHuruf = "A (Istimewa)";
} else if (skorAkademik >= 80) {
  predikatHuruf = "B (Sangat Baik)";
} else if (skorAkademik >= 70) {
  predikatHuruf = "C (Cukup)";
} else {
  predikatHuruf = "D (Kurang)";
}

console.log(`Skor: ${skorAkademik} -> Predikat: ${predikatHuruf}`);

console.log("\n--- 2. Pencocokan Nilai Spesifik dengan Switch Case ---");
const kodePesananMakanan = "B02";
let rincianMenu;

switch (kodePesananMakanan) {
  case "A01":
    rincianMenu = "Paket Nasi Goreng Spesial";
    break;
  case "B02":
    rincianMenu = "Paket Ayam Bakar Madu";
    break; // Hentikan evaluasi setelah cocok
  case "C03":
    rincianMenu = "Paket Mie Goreng Seafood";
    break;
  default:
    rincianMenu = "Menu tidak terdaftar dalam sistem";
}

console.log(`Kode Menu: ${kodePesananMakanan} -> Pesanan: ${rincianMenu}`);
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Percabangan Rentang Nilai dengan Else If ---
Skor: 85 -> Predikat: B (Sangat Baik)

--- 2. Pencocokan Nilai Spesifik dengan Switch Case ---
Kode Menu: B02 -> Pesanan: Paket Ayam Bakar Madu
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> `else if` seperti **pengukur tinggi badan di wahana bermain**: petugas mengecek apakah tinggi Anda di atas 150cm, jika tidak dicek apakah di atas 120cm, dst. Sedangkan `switch case` seperti **tombol lift di gedung perkantoran**: Anda menekan tombol lantai 3, lift langsung meluncur ke lantai 3.

### 🏢 Real-World Use Case
1. **Penanganan HTTP Status Code**:
   ```javascript
   switch (statusCode) {
     case 200: return 'OK';
     case 401: return 'Unauthorized';
     case 404: return 'Not Found';
     case 500: return 'Internal Server Error';
   }
   ```
2. **Redux / State Management Reducer**: Komponen action reducer di React & Redux hampir selalu menggunakan `switch(action.type)`.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Lupa Keyword `break` pada Switch (Fall-through Bug)**: Jika Anda lupa menuliskan `break` pada case yang cocok, JavaScript akan terus mengeksekusi case di bawahnya tanpa memeriksa kondisi lagi sampai menemukan break atau akhir blok.
* **Perbedaan Tipe Data pada Switch**: `switch` menggunakan perbandingan *strict equality* (`===`). Jika input Anda adalah string `"1"` dan case bertuliskan `case 1:` (number), case tersebut tidak akan cocok!

### 🌟 Best Practice
* Gunakan `else if` jika kondisi berupa rentang (range), relasional (`>`, `<`), atau gabungan logika kompleks (`&&`, `||`).
* Gunakan `switch` jika mengecek satu variabel diskrit yang memiliki banyak nilai teks/angka spesifik.

---

## 6. ✍️ Latihan Mandiri
1. Buat program `switch case` yang menerima nama hari (contoh: 'Senin', 'Sabtu', 'Minggu') dan mencetak apakah hari tersebut adalah 'Hari Kerja' atau 'Akhir Pekan'.
2. Manfaatkan sifat *fall-through* yang disengaja untuk menggabungkan beberapa hari ke dalam satu output.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [05.1 - If Else](../01-if-else/README.md)
- ➡️ **Selanjutnya:** [06 - Project Simulasi Angkot](../../06-project-angkot/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
