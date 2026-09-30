# 06 - BigInt (Arbitrary-Precision Integers dan Batasan Operasi)

## 1. 🎯 Tujuan Belajar
- Memahami tipe data primitif `BigInt` untuk menangani bilangan bulat berukuran sangat besar.\n- Mengetahui cara deklarasi BigInt menggunakan literal berakhiran huruf `n` atau konstruktor `BigInt()`.\n- Memahami batas toleransi tipe data `Number` standar dan alasan mutlak diperlukannya BigInt.\n- Mengetahui batasan operasi aritmetika antara BigInt dan Number biasa (tidak bisa dioperasikan langsung tanpa konversi eksplisit).

---

## 2. 📖 Penjelasan Konsep
Tipe data bawaan `Number` di JavaScript menggunakan representasi *64-bit floating point* (IEEE 754), yang memiliki batas bilangan bulat aman maksimal sebesar **$2^{53} - 1$** atau `9007199254740991` (`Number.MAX_SAFE_INTEGER`). Jika kita melakukan operasi angka di atas angka ini, hasil kalkulasi akan menjadi tidak akurat (*precision loss*).

Untuk mengatasi kebutuhan kalkulasi angka raksasa (seperti kriptografi, ID database 64-bit Snowflake di Twitter/Discord, atau kalkulasi ilmiah), ES2020 memperkenalkan tipe data primitif baru bernama **`BigInt`**.

### 1. Cara Membuat BigInt
1. **Sufiks huruf `n` di akhir angka literal**:
   `const angkaBesar = 9007199254740991n;`
2. **Memanggil fungsi global `BigInt()`**:
   `const dariString = BigInt("9007199254740991999999");`

### 2. Aturan & Batasan Penting BigInt
1. **Tidak Dapat Dicampur dengan Number Biasa Secara Implisit**:
   `10n + 5` akan menghasilkan **`TypeError: Cannot mix BigInt and other types`**. Operasi harus dilakukan secara eksplisit: `10n + BigInt(5)` atau `Number(10n) + 5`.
2. **Tidak Mendukung Bilangan Desimal / Pecahan**:
   BigInt **hanya** untuk bilangan bulat. Hasil pembagian BigInt selalu dibulatkan ke bawah (*truncated*):
   `5n / 2n === 2n` (bukan `2.5n`).
3. **Objek Math Tidak Mendukung BigInt**:
   Method seperti `Math.max(1n, 2n)` atau `Math.sqrt(4n)` akan melempar TypeError.
4. **Perbandingan dengan Number**:
   Operator perbandingan longgar `==` menganggap sama (`10n == 10` bernilai `true`), tetapi operator identik `===` menganggap berbeda tipe (`10n === 10` bernilai `false`).

---

## 3. 💻 Contoh Kode (`contoh.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Masalah Batas Presisi Number Biasa ---");
const maxAman = Number.MAX_SAFE_INTEGER;
console.log("Max Safe Integer         :", maxAman);
console.log("maxAman + 1              :", maxAman + 1); // 9007199254740992
console.log("maxAman + 2 (TIDAK AKURAT):", maxAman + 2); // 9007199254740992 (Sama! Hasil korup)

console.log("\n--- 2. Solusi Presisi Sempurna dengan BigInt ---");
const bigAman = 9007199254740991n;
console.log("bigAman + 1n             :", bigAman + 1n); // 9007199254740992n
console.log("bigAman + 2n (AKURAT!)   :", bigAman + 2n); // 9007199254740993n

console.log("\n--- 3. Operasi Aritmetika BigInt ---");
const a = 100000000000000000000n;
const b = 50000000000000000000n;
console.log("Penjumlahan BigInt       :", a + b);
console.log("Perkalian BigInt         :", a * 2n);
console.log("Pembagian Bulat (5n / 2n):", 5n / 2n); // 2n (desimal dibuang)

console.log("\n--- 4. Penanganan Type Coercion & Perbandingan ---");
const angkaBiasa = 10;
const angkaBig = 10n;

console.log("Perbandingan longgar (==) :", angkaBiasa == angkaBig);  // true
console.log("Perbandingan ketat (===)  :", angkaBiasa === angkaBig); // false (Number vs BigInt)

// Konversi eksplisit jika ingin mengoperasikan bersama
const hasilCampur = angkaBig + BigInt(angkaBiasa);
console.log("Hasil campur via BigInt() :", hasilCampur);
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Masalah Batas Presisi Number Biasa ---
Max Safe Integer         : 9007199254740991
maxAman + 1              : 9007199254740992
maxAman + 2 (TIDAK AKURAT): 9007199254740992

--- 2. Solusi Presisi Sempurna dengan BigInt ---
bigAman + 1n             : 9007199254740992n
bigAman + 2n (AKURAT!)   : 9007199254740993n

--- 3. Operasi Aritmetika BigInt ---
Penjumlahan BigInt       : 150000000000000000000n
Perkalian BigInt         : 200000000000000000000n
Pembagian Bulat (5n / 2n): 2n

--- 4. Penanganan Type Coercion & Perbandingan ---
Perbandingan longgar (==) : true
Perbandingan ketat (===)  : false
Hasil campur via BigInt() : 20n
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> `Number` seperti timbangan dapur kue yang hanya akurat hingga 5 kilogram (angka di atas itu jarumnya meleset). Sedangkan `BigInt` seperti timbangan jembatan truk tronton di jalan tol: mampu menimbang bobot sebesar apa pun tanpa batasan kapasitas selama ada ruang memori di komputer Anda.

### 🏢 Real-World Use Case
1. **Twitter / Discord ID (Snowflake)**: ID unik tweet, user, dan message di Discord menggunakan format 64-bit integer yang melebihi batas `Number.MAX_SAFE_INTEGER` sehingga wajib diolah sebagai BigInt atau string.\n2. **Blockchain & Smart Contracts**: Nilai saldo mata uang kripto Ethereum (Wei) sering kali memiliki 18 digit desimal sehingga nominalnya mencapai puluhan digit integer.\n3. **Kriptografi & Matematika Teoretis**: Perhitungan faktorial angka besar dan algoritma kunci privat/publik RSA.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Mencampur BigInt dan Number tanpa konversi**: Menulis `1n + 2` langsung melempar `TypeError`. Anda harus mengonversinya secara sadar.\n* **Menghilangkan angka desimal tanpa disadari**: Pembagian `7n / 2n` menghasilkan `3n`, bukan `3.5n`. Jika membutuhkan presisi desimal, BigInt bukan solusi yang tepat.\n* **Tidak bisa langsung diserialisasi ke JSON**: `JSON.stringify({ id: 100n })` melempar `TypeError: Do not know how to serialize a BigInt`. Anda perlu mengonversinya ke string terlebih dahulu.

### 🌟 Best Practice
* Gunakan BigInt hanya jika data Anda benar-benar berpotensi melebihi $2^{53} - 1$. Untuk angka transaksi biasa di bawah 9 triliun, gunakan tipe `Number` standar.\n* Selalu simpan ID 64-bit dari database backend sebagai string atau BigInt saat dikonsumsi di frontend JavaScript.\n* Tambahkan method `BigInt.prototype.toJSON` jika sistem Anda sering melakukan serialisasi JSON yang memuat angka BigInt.

---

## 6. ✍️ Latihan Mandiri
1. Buatlah fungsi `faktorialBigInt(n)` yang menghitung faktorial dari bilangan `n` (contoh: 50!) menggunakan tipe data BigInt.\n2. Diberikan string ID transaksi dari server: `'9876543210987654321'`. Ubah ke BigInt, tambahkan nilai `100n`, lalu kembalikan hasilnya kembali dalam format string.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [05 - JSON](../05-json/README.md)\n- ➡️ **Selanjutnya:** [07 - Date](../07-date/README.md)\n- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)\n- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
