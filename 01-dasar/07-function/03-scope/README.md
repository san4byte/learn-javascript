# 07.3 - Variable Scope dan Scope Chain

## 1. 🎯 Tujuan Belajar
- Memahami konsep Variable Scope (lingkup visibilitas variabel).
- Memahami perbedaan Global Scope, Function/Local Scope, dan Block Scope.
- Memahami konsep Scope Chain (bagaimana JavaScript mencari variabel).

---

## 2. 📖 Penjelasan Konsep
**Variable Scope** menentukan area di mana suatu variabel dapat diakses atau "terlihat" di dalam kode kita.

### 3 Jenis Scope di JavaScript:
1. **Global Scope**: Variabel yang dideklarasikan di luar semua fungsi atau blok kurung kurawal. Dapat diakses dari baris mana saja di seluruh file.
2. **Function / Local Scope**: Variabel yang dideklarasikan di dalam suatu fungsi. Hanya dapat diakses dari dalam fungsi tersebut.
3. **Block Scope (ES6 `let` & `const`)**: Variabel yang dideklarasikan di dalam tanda kurung kurawal `{}` (misal di dalam loop atau kondisi `if`).

### ⛓️ Konsep Scope Chain:
Jika sebuah variabel dipanggil di dalam suatu fungsi:
1. JavaScript mencari variabel tersebut di dalam **lingkup lokal fungsi itu sendiri**.
2. Jika tidak ditemukan, JavaScript akan **melihat ke lingkup satu tingkat di atasnya (luar)**.
3. Proses ini terus berlanjut hingga ke **Global Scope**. Jika di Global Scope tetap tidak ditemukan, JavaScript melempar `ReferenceError: x is not defined`.

---

## 3. 💻 Contoh Kode (`contoh.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Demonstrasi Scope Chain ---");
const variabelGlobal = "Saya berada di Global Scope";

function fungsiLuar() {
  const variabelLokalLuar = "Saya berada di Fungsi Luar";

  function fungsiDalam() {
    const variabelLokalDalam = "Saya berada di Fungsi Dalam";

    // fungsiDalam dapat mengakses variabelnya sendiri, variabel fungsi luar, dan global:
    console.log("Akses dari dalam:");
    console.log("- " + variabelLokalDalam);
    console.log("- " + variabelLokalLuar); // Scope chain ke fungsiLuar
    console.log("- " + variabelGlobal);     // Scope chain ke Global
  }

  fungsiDalam();
  // console.log(variabelLokalDalam); // ERROR: tidak bisa diakses dari luar
}

fungsiLuar();

console.log("\n--- 2. Variable Shadowing (Variabel Menutupi Variabel Luar) ---");
let mataUang = "IDR";

function konversi() {
  let mataUang = "USD"; // Shadowing: variabel lokal menutupi variabel global
  console.log("Mata uang di dalam fungsi:", mataUang); // USD
}

konversi();
console.log("Mata uang di luar fungsi :", mataUang); // Tetap IDR
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Demonstrasi Scope Chain ---
Akses dari dalam:
- Saya berada di Fungsi Dalam
- Saya berada di Fungsi Luar
- Saya berada di Global Scope

--- 2. Variable Shadowing (Variabel Menutupi Variabel Luar) ---
Mata uang di dalam fungsi: USD
Mata uang di luar fungsi : IDR
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> Scope Chain seperti **kaca film mobil satu arah**: Orang di dalam mobil (fungsi dalam) bisa dengan jelas melihat ke jalan raya di luar (global scope). Namun orang di jalan raya di luar (global scope) sama sekali tidak bisa melihat apa yang ada di dalam mobil (local scope).

### 🏢 Real-World Use Case
1. **Mencegah Tabrakan Nama Variabel (Name Collision)**: Menggunakan nama variabel umum seperti `counter`, `temp`, atau `index` di dalam beberapa fungsi berbeda tanpa khawatir saling merusak nilai satu sama lain.
2. **Modul Terenkapsulasi**: Menyembunyikan kunci API rahasia di dalam scope fungsi terisolasi.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Polusi Global Scope (Global Namespace Pollution)**: Mendeklarasikan terlalu banyak variabel global akan memperbesar risiko konflik nama variabel dan memboroskan memori karena variabel global tidak pernah dibersihkan oleh *Garbage Collector* selama halaman aktif.
* **Lupa Keyword `let/const` (Accidental Global)**: Menulis `angka = 10` tanpa `let` atau `const` akan membuat JavaScript secara otomatis menjadikannya variabel global window, sumber bug yang sangat berbahaya.

### 🌟 Best Practice
* Minimalkan pembuatan variabel global sebisa mungkin.
* Selalu gunakan deklarasi eksplisit (`const` atau `let`) di setiap pembuatan variabel.

---

## 6. ✍️ Latihan Mandiri
1. Analisis apakah kode berikut menghasilkan error dan jelaskan alasannya:
   ```javascript
   function uji() {
     let pesan = "Halo Dunia";
   }
   uji();
   console.log(pesan);
   ```
2. Buatlah contoh fungsi bersarang 3 tingkat yang mendemonstrasikan pencarian Scope Chain.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [07.2 - Parameter dan Argumen](../02-parameter-argumen/README.md)
- ➡️ **Selanjutnya:** [07.4 - Closures dan Lexical Scope](../04-closures/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
