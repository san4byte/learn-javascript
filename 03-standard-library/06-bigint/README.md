# 06 - BigInt (Arbitrary-Precision Integers dan Batasan Operasi)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memahami tipe data primitif `BigInt` untuk menangani bilangan bulat berukuran sangat besar.
> - **Kapan Digunakan**: Mengetahui cara deklarasi BigInt menggunakan literal berakhiran huruf `n` atau fungsi global `BigInt()`.
> - **Aturan Praktis**: Gunakan BigInt hanya jika data Anda benar-benar berpotensi melebihi $2^{53} - 1$. Untuk angka transaksi biasa di bawah 9 triliun, gunakan tipe `Number` standar.

## 1. 🎯 Tujuan Belajar

- Memahami tipe data primitif `BigInt` untuk menangani bilangan bulat berukuran sangat besar.
- Mengetahui cara deklarasi BigInt menggunakan literal berakhiran huruf `n` atau fungsi global `BigInt()`.
- Memahami batas toleransi tipe data `Number` standar dan alasan mutlak diperlukannya BigInt.
- Mengetahui batasan operasi aritmetika antara BigInt dan Number biasa (tidak bisa dioperasikan langsung tanpa konversi eksplisit).

---

## 2. 📖 Penjelasan Konsep & Referensi Lengkap

### 🎭 Analogi Dunia Nyata

> `Number` seperti timbangan dapur kue yang hanya akurat hingga 5 kilogram (angka di atas itu jarumnya meleset). Sedangkan `BigInt` seperti timbangan jembatan truk tronton di jalan tol: mampu menimbang bobot sebesar apa pun tanpa batasan kapasitas selama ada ruang memori di komputer Anda.

Tipe data bawaan `Number` di JavaScript menggunakan representasi _64-bit floating point_ (IEEE 754), yang memiliki batas bilangan bulat aman maksimal sebesar **$2^{53} - 1$** atau `9007199254740991` (`Number.MAX_SAFE_INTEGER`). Jika kita melakukan operasi angka di atas angka ini, hasil kalkulasi akan menjadi tidak akurat (_precision loss_).

Untuk mengatasi kebutuhan kalkulasi angka raksasa (seperti kriptografi, ID database 64-bit Snowflake di Twitter/Discord, atau kalkulasi ilmiah), ES2020 memperkenalkan tipe data primitif baru bernama **`BigInt`**.

### Tabel Referensi Fitur & Method `BigInt`

| Fitur / Method                     | Parameter                     | Tipe Return | Deskripsi & Contoh Singkat                                                                 |
| :--------------------------------- | :---------------------------- | :---------- | :----------------------------------------------------------------------------------------- |
| **Sufiks `n`**                     | Literal angka                 | `bigint`    | Menandai angka sebagai BigInt: `const x = 100n;`                                           |
| **`BigInt(value)`**                | `number`, `string`, `boolean` | `bigint`    | Mengonversi nilai ke BigInt: `BigInt("9007199254740993")`                                  |
| **`BigInt.asIntN(bits, bigint)`**  | `(bits, bigint)`              | `bigint`    | Membatasi nilai BigInt ke rentang integer bertanda (_signed_) sejumlah bit tertentu.       |
| **`BigInt.asUintN(bits, bigint)`** | `(bits, bigint)`              | `bigint`    | Membatasi nilai BigInt ke rentang integer tak bertanda (_unsigned_) sejumlah bit tertentu. |
| **`bigint.toString([radix])`**     | `radix` (opsional 2-36)       | `string`    | Mengubah BigInt jadi string: `(255n).toString(16) // "ff"`                                 |
| **`bigint.toLocaleString([loc])`** | `locale` (opsional)           | `string`    | Memformat tampilan angka BigInt sesuai bahasa/region lokal.                                |

---

### Aturan & Batasan Penting BigInt

| Aspek                                 | Perilaku pada `BigInt`            | Contoh & Keterangan                                                                             |
| :------------------------------------ | :-------------------------------- | :---------------------------------------------------------------------------------------------- |
| **Pencampuran dengan Number**         | ❌ Dilarang keras secara implisit | `10n + 5` menghasilkan `TypeError: Cannot mix BigInt and other types`. Wajib `10n + BigInt(5)`. |
| **Bilangan Pecahan / Desimal**        | ❌ Tidak didukung                 | `5n / 2n` menghasilkan `2n` (angka desimal dibuang/dibulatkan ke bawah).                        |
| **Dukungan Objek `Math`**             | ❌ Tidak didukung                 | `Math.max(10n, 20n)` atau `Math.sqrt(16n)` melempar `TypeError`.                                |
| **Perbandingan Longgar (`==`)**       | ✅ Boleh (mengecek nilai)         | `10n == 10` bernilai `true`.                                                                    |
| **Perbandingan Ketat (`===`)**        | ✅ Boleh (mengecek tipe & nilai)  | `10n === 10` bernilai `false` karena tipe datanya berbeda (`bigint` vs `number`).               |
| **Pengurutan (`<`, `>`, `<=`, `>=`)** | ✅ Berfungsi normal               | `10n < 20` bernilai `true`.                                                                     |
| **Serialisasi ke JSON**               | ❌ Gagal bawaan                   | `JSON.stringify(10n)` melempar `TypeError` kecuali ditambahkan kustomisasi method `toJSON`.     |

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Inisialisasi BigInt (Literal n vs BigInt()) ---');
const saldoAwal = 9007199254740991n; // Literal n di batas maksimal Number aman
const transferMasuk = BigInt('5000000000000000'); // Dari string angka raksasa
const biayaAdmin = 1000; // Tipe Number biasa

console.log('Saldo Awal              :', saldoAwal);
console.log('Transfer Masuk          :', transferMasuk);
console.log('Biaya Admin (Number)    :', biayaAdmin);

console.log('\n--- 2. Operasi Aritmetika & Konversi Eksplisit ---');
const totalSaldo = saldoAwal + transferMasuk;
console.log('Total Saldo Akumulasi   :', totalSaldo);

// Wajib konversi biayaAdmin dari Number ke BigInt agar tidak melempar TypeError
const saldoSetelahAdmin = totalSaldo - BigInt(biayaAdmin);
console.log('Saldo Setelah Biaya Admin:', saldoSetelahAdmin);

// Pembagian bulat ke 2 rekening (desimal otomatis dibuang)
const saldoBagiDua = saldoSetelahAdmin / 2n;
console.log('Saldo Dibagi Rata (2 Rek):', saldoBagiDua);

console.log('\n--- 3. Inspeksi Tipe Data & Perbandingan Identik ---');
console.log('Tipe data saldoBagiDua  :', typeof saldoBagiDua);
console.log('Apakah identik BigInt?  :', totalSaldo === BigInt(totalSaldo));
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Inisialisasi BigInt (Literal n vs BigInt()) ---
Saldo Awal              : 9007199254740991n
Transfer Masuk          : 5000000000000000n
Biaya Admin (Number)    : 1000

--- 2. Operasi Aritmetika & Konversi Eksplisit ---
Total Saldo Akumulasi   : 14007199254740991n
Saldo Setelah Biaya Admin: 14007199254739991n
Saldo Dibagi Rata (2 Rek): 7003599627369995n

--- 3. Inspeksi Tipe Data & Perbandingan Identik ---
Tipe data saldoBagiDua  : bigint
Apakah identik BigInt?  : true
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Twitter / Discord ID (Snowflake)**: ID unik tweet, user, dan message di Discord menggunakan format 64-bit integer yang melebihi batas `Number.MAX_SAFE_INTEGER` sehingga wajib diolah sebagai BigInt atau string.
2. **Blockchain & Smart Contracts**: Nilai saldo mata uang kripto Ethereum (Wei) sering kali memiliki 18 digit desimal sehingga nominalnya mencapai puluhan digit integer.
3. **Kriptografi & Matematika Teoretis**: Perhitungan faktorial angka besar dan algoritma kunci privat/publik RSA.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mencampur BigInt dan Number tanpa konversi**: Menulis `1n + 2` langsung melempar `TypeError`. Anda harus mengonversinya secara sadar.
- **Menghilangkan angka desimal tanpa disadari**: Pembagian `7n / 2n` menghasilkan `3n`, bukan `3.5n`. Jika membutuhkan presisi desimal, BigInt bukan solusi yang tepat.
- **Tidak bisa langsung diserialisasi ke JSON**: `JSON.stringify({ id: 100n })` melempar `TypeError: Do not know how to serialize a BigInt`. Anda perlu mengonversinya ke string terlebih dahulu.

### 🌟 Best Practice

- Gunakan BigInt hanya jika data Anda benar-benar berpotensi melebihi $2^{53} - 1$. Untuk angka transaksi biasa di bawah 9 triliun, gunakan tipe `Number` standar.
- Selalu simpan ID 64-bit dari database backend sebagai string atau BigInt saat dikonsumsi di frontend JavaScript.
- Tambahkan method `BigInt.prototype.toJSON` jika sistem Anda sering melakukan serialisasi JSON yang memuat angka BigInt.

---

## 6. ✍️ Latihan Mandiri

1. Buatlah fungsi `faktorialBigInt(n)` yang menghitung faktorial dari bilangan `n` (contoh: 50!) menggunakan tipe data BigInt.
2. Diberikan string ID transaksi dari server: `'9876543210987654321'`. Ubah ke BigInt, tambahkan nilai `100n`, lalu kembalikan hasilnya kembali dalam format string.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [05 - JSON](../05-json/README.md)
- ➡️ **Selanjutnya:** [07 - Date](../07-date/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
