# 07.7 - Rest Parameter (...args)

## 1. 🎯 Tujuan Belajar
- Memahami konsep Rest Parameter (`...args`) pada fungsi modern.
- Memahami perbedaan mutlak antara Rest Parameter dan Spread Operator.
- Mampu menggabungkan parameter posisi tetap dengan Rest Parameter.
- Mengetahui keunggulan Rest Parameter dibanding objek `arguments` lama.

---

## 2. 📖 Penjelasan Konsep
**Rest Parameter** (diperkenalkan pada ES6) memungkinkan kita untuk merepresentasikan jumlah argumen yang tidak terbatas ke dalam **sebuah Array sungguhan**.

Sintaksnya diawali dengan tiga titik: `...namaArray`.

### Perbedaan dengan Objek `arguments` Lama:
1. Rest parameter menghasilkan **Array Asli**, sehingga langsung memiliki method array seperti `.map()`, `.filter()`, `.reduce()`.
2. Objek `arguments` menampung semua parameter, sedangkan Rest parameter hanya menampung **sisa argumen** yang belum ditangkap oleh parameter sebelumnya.
3. Rest parameter bekerja sempurna di **Arrow Function**, sedangkan objek `arguments` tidak tersedia di Arrow Function.

---

## 3. 💻 Contoh Kode (`contoh.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Rest Parameter Dasar (Array Asli) ---");
function jumlahkanAngka(...angkaList) {
  // angkaList adalah Array sungguhan, bisa langsung pakai reduce!
  return angkaList.reduce((total, n) => total + n, 0);
}

console.log("Hasil penjumlahan:", jumlahkanAngka(10, 20, 30, 40));

console.log("\n--- 2. Menggabungkan Parameter Tetap dengan Rest Parameter ---");
function catatLogAplikasi(level, modul, ...pesanDetail) {
  const gabunganPesan = pesanDetail.join(" | ");
  console.log(`[${level.toUpperCase()}] [${modul}] -> ${gabunganPesan}`);
}

catatLogAplikasi("info", "AuthService", "Pengguna berhasil login", "ID: 42", "IP: 192.168.1.1");
catatLogAplikasi("error", "Database", "Koneksi terputus ke server PostgreSQL");
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Rest Parameter Dasar (Array Asli) ---
Hasil penjumlahan: 100

--- 2. Menggabungkan Parameter Tetap dengan Rest Parameter ---
[INFO] [AuthService] -> Pengguna berhasil login | ID: 42 | IP: 192.168.1.1
[ERROR] [Database] -> Koneksi terputus ke server PostgreSQL
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> Rest Parameter seperti **kantong 'serbaguna' di koper pakaian Anda**: 2 slot utama di koper sudah khusus untuk laptop dan dompet (parameter tetap). Semua barang bawaan tambahan lainnya (baju, celana, charger) dimasukkan semuanya ke dalam kantong serbaguna tersebut (Rest parameter).

### 🏢 Real-World Use Case
1. **Fungsi Logger / Pelacak Error**: Mengizinkan pengembang mengirimkan berapapun jumlah pesan debug tambahan.
2. **Helper Kalkulasi Finansial**: Menghitung rata-rata atau total dari jumlah item yang dinamis tanpa perlu mewajibkan pengguna membungkusnya ke dalam kurung siku array terlebih dahulu.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Rest Parameter Harus Berada di Posisi Terakhir**: Anda tidak boleh menempatkan parameter lain setelah rest parameter (contoh: `function salah(...a, b) {}` akan melempar `SyntaxError: Rest parameter must be last formal parameter`).
* **Hanya Boleh Ada Satu Rest Parameter**: Anda tidak bisa menulis `function(...a, ...b) {}`.

### 🌟 Best Practice
* Gunakan Rest Parameter untuk menggantikan seluruh penggunaan objek lama `arguments`.
* Gunakan nama jamak yang deskriptif untuk rest parameter, seperti: `...items`, `...daftarNilai`, `...tags`.

---

## 6. ✍️ Latihan Mandiri
1. Buatlah fungsi `formatDaftarJuara(namaKompetisi, juara1, juara2, ...pesertaLainnya)`.
2. Tampilkan nama kompetisi, juara 1, juara 2, serta cetak berapa total jumlah peserta lainnya yang belum beruntung.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [07.6 - Higher-Order Functions](../06-higher-order-functions/README.md)
- ➡️ **Selanjutnya:** [07.8 - Fungsi Rekursif](../08-rekursif/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
