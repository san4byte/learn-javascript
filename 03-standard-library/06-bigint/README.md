# 06 - BigInt (Arbitrary-Precision Integers dan Batasan Operasi)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Tipe data primitif untuk merepresentasikan bilangan bulat dengan presisi tak terbatas tanpa batasan $2^{53} - 1$ (`Number.MAX_SAFE_INTEGER`).
> - **Kapan Digunakan**: Mengolah ID Twitter/Discord 64-bit (_Snowflake_), saldo token kripto/blockchain (Wei), dan kriptografi matematika.
> - **Aturan Praktis**: Dilarang mencampur BigInt dan Number secara implisit (`10n + 5` memicu `TypeError`), pembagian BigInt selalu membuang desimal, dan gunakan fungsi replacer untuk serialisasi JSON.

---

## 1. 🎯 Tujuan Belajar

- Memahami batasan IEEE 754 pada tipe `Number` standar dan alasan mutlak diperlukannya `BigInt`.
- Menguasai inisialisasi BigInt menggunakan literal `n` dan fungsi `BigInt()`.
- Menguasai seluruh method & properti `BigInt` beserta berbagai kondisi kasus (_edge cases_).
- Menguasai operasi aritmetika (`+`, `-`, `*`, `/`, `%`, `**`) serta memahami efek pembulatan desimal (_truncation_).
- Memahami aturan ketat _type coercion_ dan cara konversi eksplisit antara BigInt dan Number.
- Menguasai perbandingan longgar (`==`) vs ketat (`===`) serta pengurutan array campuran.
- Memahami fungsi pembatas bit: `BigInt.asIntN()` dan `BigInt.asUintN()`.
- Mengetahui keterbatasan ekosistem: ketiadaan dukungan di objek `Math` dan cara mengatasi kegagalan `JSON.stringify()`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Tipe `Number` seperti timbangan dapur digital yang hanya akurat menimbang hingga 5 kilogram (beban di atas itu jarumnya melenceng). Sedangkan `BigInt` seperti jembatan timbang truk tronton di jalan tol: mampu menimbang bobot sebesar apa pun tanpa batasan kapasitas selama komputer Anda masih memiliki sisa ruang memori.

Tipe data bawaan `Number` di JavaScript menggunakan representasi _64-bit floating point_ (IEEE 754), dengan batas bilangan bulat aman maksimal sebesar **$2^{53} - 1$** atau `9007199254740991` (`Number.MAX_SAFE_INTEGER`). Di atas angka tersebut, kalkulasi akan kehilangan presisi bit terakhir:

```javascript
console.log(9007199254740991 + 1 === 9007199254740991 + 2); // true! ❌ (Bug kalkulasi angka besar)
```

Tipe data primitif **`BigInt`** hadir di ES2020 untuk menyelesaikan masalah ini secara tuntas.

---

### 1. Tabel Ringkasan Fitur & Method BigInt (Cheat-Sheet)

| Fitur / Method                     | Parameter                     | Nilai Kembalian | Deskripsi Singkat                                                     |
| :--------------------------------- | :---------------------------- | :-------------- | :-------------------------------------------------------------------- |
| **Sufiks `n`**                     | Literal angka                 | `bigint`        | Menandai angka sebagai BigInt: `const x = 100n;`                      |
| **`BigInt(value)`**                | `number`, `string`, `boolean` | `bigint`        | Mengonversi nilai ke BigInt: `BigInt("9007199254740993")`             |
| **`BigInt.asIntN(bits, bigint)`**  | `(bits, bigint)`              | `bigint`        | Membatasi nilai ke rentang integer bertanda (_signed_) $n$-bit.       |
| **`BigInt.asUintN(bits, bigint)`** | `(bits, bigint)`              | `bigint`        | Membatasi nilai ke rentang integer tak bertanda (_unsigned_) $n$-bit. |
| **`bigint.toString([radix])`**     | `radix` _(opsional 2-36)_     | `string`        | Mengubah BigInt menjadi teks string basis tertentu.                   |
| **`bigint.toLocaleString([loc])`** | `locale` _(opsional)_         | `string`        | Memformat angka BigInt sesuai bahasa/wilayah lokal.                   |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Method BigInt

Berikut adalah rincian lengkap setiap fitur dan method `BigInt` beserta skenario kasusnya masing-masing:

---

#### 1. Sintaks Literal Sufiks: `n`

Membuat nilai `BigInt` secara langsung dengan menambahkan huruf `n` di akhir deretan angka.

```javascript
const idBesar = 9007199254740995n;
console.log(typeof idBesar); // "bigint"
```

---

#### 2. Fungsi Konstruktor: `BigInt(value)`

Mengonversi tipe data lain (string, number, boolean) menjadi `BigInt`.

- **Kasus A: Dari String Angka Raksasa (Sangat Dianjurkan)**

  ```javascript
  const idDiscord = BigInt("1234567890123456789");
  console.log(idDiscord); // 1234567890123456789n
  ```

- **Kasus B: Dari Tipe Number & Boolean**

  ```javascript
  console.log(BigInt(42)); // 42n
  console.log(BigInt(true)); // 1n
  console.log(BigInt(false)); // 0n
  ```

- **Kasus C: Jebakan Input Desimal atau Teks Rusak**
  ```javascript
  // BigInt(10.5);   // ❌ RangeError: The number 10.5 cannot be converted to a BigInt
  // BigInt('42px'); // ❌ SyntaxError: Cannot convert 42px to a BigInt
  ```

---

#### 3. Pembatasan Signed Integer: `BigInt.asIntN(bits, bigint)`

Membatasi angka ke dalam rentang _signed_ integer ($-2^{bits-1}$ hingga $2^{bits-1} - 1$). Sangat berguna untuk simulasi arsitektur perangkat keras atau WebAssembly:

```javascript
// Simulasi 64-bit Signed Integer (Batas: 9223372036854775807n)
const batas64 = 2n ** 63n - 1n;
console.log(BigInt.asIntN(64, batas64)); // 9223372036854775807n

// Overflow akan membungkus (wrap-around) ke nilai negatif:
console.log(BigInt.asIntN(64, batas64 + 1n)); // -9223372036854775808n
```

---

#### 4. Pembatasan Unsigned Integer: `BigInt.asUintN(bits, bigint)`

Membatasi angka ke dalam rentang _unsigned_ integer ($0$ hingga $2^{bits} - 1$):

```javascript
// Simulasi 8-bit Unsigned Integer (0 s.d. 255)
console.log(BigInt.asUintN(8, 255n)); // 255n
console.log(BigInt.asUintN(8, 256n)); // 0n (wrap ke 0)
```

---

#### 5. Konversi String & Basis: `bigint.toString([radix])`

Mengubah nilai BigInt menjadi string teks, mendukung konversi basis bilangan (2 hingga 36):

```javascript
const angka = 255n;
console.log(angka.toString()); // "255"
console.log(angka.toString(16)); // "ff" (heksadesimal)
console.log(angka.toString(2)); // "11111111" (biner)
```

---

#### 6. Pemformatan Lokal: `bigint.toLocaleString([locale, options])`

Memformat angka raksasa sesuai konvensi bahasa dan pemisah ribuan regional:

```javascript
const triliun = 1000000000000n;
console.log(triliun.toLocaleString("id-ID")); // "1.000.000.000.000"
```

---

#### 7. Operasi Aritmetika & Pembagian Bulat (_Truncation_)

BigInt mendukung operator `+`, `-`, `*`, `/`, `%`, dan `**`.

- **Jebakan Desimal Lenyap pada Pembagian**:
  BigInt membuang seluruh angka di belakang koma (_integer truncation_):

  ```javascript
  console.log(10n / 3n); // 3n (angka .333 dibuang sepenuhnya!)
  console.log(5n / 2n); // 2n (bukan 2.5n)
  console.log(10n % 3n); // 1n
  ```

- **Jebakan Unary Plus (`+`)**:
  Operator `+10n` akan melempar `TypeError`. Gunakan `Number(10n)` secara eksplisit jika ingin mengubahnya menjadi number.

---

#### 8. Aturan Ketat Type Coercion

JavaScript melarang keras mencampur `BigInt` dan `Number` secara implisit dalam kalkulasi aritmetika:

```javascript
const a = 10n;
const b = 5;

// console.log(a + b); // ❌ TypeError: Cannot mix BigInt and other types

// Solusi: Konversi eksplisit salah satu tipe:
console.log(a + BigInt(b)); // 15n (jika ingin hasil BigInt)
console.log(Number(a) + b); // 15  (jika ingin hasil Number)
```

---

#### 9. Perbandingan & Pengurutan Campuran

- **Perbandingan Longgar vs Ketat**:
  ```javascript
  console.log(10n == 10); // true  (nilai sama)
  console.log(10n === 10); // false (tipe data berbeda)
  ```
- **Pengurutan Array**:
  ```javascript
  const campuran = [10n, 2, 5n, 1];
  campuran.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  console.log(campuran); // [1, 2, 5n, 10n]
  ```

---

#### 10. Serialisasi JSON untuk BigInt

JSON standar tidak mendukung BigInt secara bawaan. `JSON.stringify()` akan crash jika menerima BigInt tanpa bantuan replacer:

```javascript
const payload = { id: 123456789012345678n };

// Solusi A: Menggunakan Replacer Function
const json = JSON.stringify(payload, (_, v) =>
  typeof v === "bigint" ? v.toString() : v,
);
console.log(json); // '{"id":"123456789012345678"}' ✅

// Solusi B: Global Prototype Hook
BigInt.prototype.toJSON = function () {
  return this.toString();
};
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep inisialisasi, truncation desimal, aturan type coercion, komparasi lintas tipe, pembatasan bitwise, dan solusi serialisasi JSON di atas dirangkum ke dalam satu script laboratorium terpadu yang siap dijalankan langsung di terminal.

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 03-standard-library/06-bigint/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Integrasi API Discord & Twitter**: ID channel, user, dan tweet menggunakan format 64-bit Snowflake ID (melebihi 9 triliun) yang wajib diolah sebagai BigInt agar ID tidak tertukar.
2. **Platform Web3 / Blockchain**: Nilai terkecil koin Ethereum adalah Wei ($1 \text{ ETH} = 10^{18} \text{ Wei}$), yang membutuhkan angka hingga 30 digit integer.
3. **Kalkulasi Faktorial & Kombinatorika**: Menghitung probabilitas atau permutasi angka besar ($50!$) tanpa distorsi angka floating-point.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mencampur BigInt dan Number**: Kesalahan `TypeError: Cannot mix BigInt and other types` sering terjadi jika lupa mengonversi variabel number biasa.
- **Kehilangan Angka Desimal**: Mengira `5n / 2n` menghasilkan desimal, padahal nilai desimal dibuang tanpa peringatan.
- **Mengirim BigInt Langsung ke `JSON.stringify`**: Memicu server/aplikasi crash seketika karena JSON tidak mendukung serialisasi BigInt secara native.

### 🌟 Best Practice

- Gunakan BigInt hanya untuk angka yang berpotensi melampaui `Number.MAX_SAFE_INTEGER` ($> 9 \text{ triliun}$). Untuk angka counter atau harga toko biasa, gunakan `Number`.
- Simpan ID 64-bit sebagai string di payload API atau database kolom teks untuk interoperabilitas yang aman.
- Pasang replacer string saat melakukan serialisasi data yang memuat BigInt.

---

## 5. ✍️ Latihan Mandiri

1. Buatlah fungsi `faktorial(n)` yang mampu menghitung nilai faktorial dari bilangan bulat besar ($50!$) secara akurat menggunakan tipe data `BigInt`.
2. Diberikan string ID transaksi dari server: `'9876543210987654321'`. Ubah ke BigInt, tambahkan nilai `100n`, lalu kembalikan hasilnya kembali dalam format string.
3. Buat fungsi pembagian aman `bagiDenganSisa(a, b)` yang menerima dua BigInt dan mengembalikan objek `{ hasil: bigint, sisa: bigint }`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [05 - JSON](../05-json/README.md)
- ➡️ **Selanjutnya:** [07 - Date](../07-date/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
