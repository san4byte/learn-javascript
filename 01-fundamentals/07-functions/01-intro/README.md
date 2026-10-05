# 07.1 - Pengenalan Function (Deklarasi, Pemanggilan & Return)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami fungsi sebagai blok kode mandiri yang dapat digunakan berulang kali (*reusable*).
> * **Kapan Digunakan**: Mengenal struktur deklarasi fungsi: keyword `function`, nama fungsi, parameter, body, dan `return`.
> * **Aturan Praktis**: Satu fungsi sebaiknya hanya memiliki **satu tanggung jawab tunggal** (*Single Responsibility Principle*).

## 1. 🎯 Tujuan Belajar
- Memahami fungsi sebagai blok kode mandiri yang dapat digunakan berulang kali (*reusable*).
- Mengenal struktur deklarasi fungsi: keyword `function`, nama fungsi, parameter, body, dan `return`.
- Memahami perbedaan antara Function Declaration dan Function Expression.
- Memahami peran krusial keyword `return` dalam menghasilkan nilai keluaran.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Fungsi seperti **mesin pembuat kopi (*coffee maker*)**: Anda memasukkan biji kopi dan air (parameter input), mesin memprosesnya di dalam wadah tertutup (body fungsi), lalu mengeluarkan secangkir kopi hangat ke cangkir Anda (nilai `return`).

**Fungsi (Function)** adalah sub-program berisi kumpulan instruksi logika yang dibungkus dalam satu blok nama untuk menyelesaikan tugas spesifik.

### Dua Cara Utama Mendefinisikan Fungsi:
1. **Function Declaration**:
   ```javascript
   function namaFungsi(param1, param2) {
     return hasil;
   }
   ```
   *Karakteristik*: Mengalami *Hoisting*, sehingga dapat dipanggil **sebelum** baris deklarasinya ditulis.
2. **Function Expression**:
   ```javascript
   const namaFungsi = function(param1, param2) {
     return hasil;
   };
   ```
   *Karakteristik*: Disimpan ke dalam variabel. Tidak bisa dipanggil sebelum dideklarasikan (mengikuti aturan `const`/`let`).

### Peran Keyword `return`:
* Keyword `return` menghentikan eksekusi di dalam badan fungsi dan melempar (*return*) nilai kembali ke pemanggil fungsi.
* Fungsi yang **tidak memiliki** keyword `return` secara implisit akan selalu mengembalikan nilai **`undefined`**.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Function Declaration (Contoh Kasus Nyata: Hitung Diskon) ---');
// Dapat dipanggil sebelum deklarasi karena di-hoist oleh JavaScript
const totalBelanja = hitungHargaDiskon(100000, 10);
console.log(`Total setelah diskon 10%: Rp ${totalBelanja.toLocaleString('id-ID')}`);

function hitungHargaDiskon(hargaAwal, persentaseDiskon) {
  const nominalPotongan = (hargaAwal * persentaseDiskon) / 100;
  const hargaAkhir = hargaAwal - nominalPotongan;
  return hargaAkhir; // Mengembalikan hasil perhitungan
}

console.log('\n--- 2. Function Expression ---');
// Disimpan ke dalam variabel const
const sapaPengguna = function (nama, peran = 'Pengunjung') {
  return `Halo, ${nama}! Anda masuk sebagai [${peran}].`;
};

console.log(sapaPengguna('Joko Santoso', 'Software Engineer'));

console.log('\n--- 3. Efek Fungsi Tanpa Keyword return ---');
function fungsiTanpaReturn() {
  const rahasia = 12345;
  // Lupa me-return nilai
}

const hasilUji = fungsiTanpaReturn();
console.log('Nilai kembalian fungsi:', hasilUji); // undefined
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Function Declaration (Contoh Kasus Nyata: Hitung Diskon) ---
Total setelah diskon 10%: Rp 90.000

--- 2. Function Expression ---
Halo, Joko Santoso! Anda masuk sebagai [Software Engineer].

--- 3. Efek Fungsi Tanpa Keyword return ---
Nilai kembalian fungsi: undefined
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **Kalkulator Tagihan / Kasir POS**: Fungsi yang menghitung total belanjaan, pajak PPN 11%, dan potongan voucher diskon.
2. **Helper Validasi Email**: Fungsi `isValidEmail(email)` yang mengembalikan nilai boolean `true` atau `false`.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Lupa Keyword `return`**: Jika Anda menulis rumus komputasi rumit tetapi lupa kata kunci `return`, variabel pemanggil akan bernilai `undefined`.
* **Menulis Kode Setelah `return` (Unreachable Code)**: Baris kode apapun yang diletakkan persis setelah baris `return` di blok yang sama tidak akan pernah dieksekusi oleh JavaScript.

### 🌟 Best Practice
* Satu fungsi sebaiknya hanya memiliki **satu tanggung jawab tunggal** (*Single Responsibility Principle*).
* Gunakan kata kerja deskriptif (*verb*) untuk menamai fungsi, seperti: `hitungTotal()`, `validasiForm()`, `ambilDataUser()`.

---

## 6. ✍️ Latihan Mandiri
1. Buatlah fungsi `hitungLuasLingkaran(radius)` yang mengembalikan nilai luas lingkaran ($\pi 	imes r^2$). Gunakan `Math.PI`.
2. Buatlah function expression `cekKelayakanKredit(skorKredit)` yang mengembalikan pesan 'Disetujui' jika skor >= 700, dan 'Ditolak' jika < 700.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [06 - Project Simulasi Angkot](../../06-project-angkot/README.md)
- ➡️ **Selanjutnya:** [07.2 - Parameter dan Argumen](../02-parameters-arguments/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
