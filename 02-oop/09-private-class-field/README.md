# 09 - Private Class Field

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menyembunyikan properti menggunakan tanda pagar (`#`) sehingga hanya bisa diakses dari dalam class itu sendiri.
> - **Kapan Digunakan**: Mencegah data internal penting diubah sembarangan dari luar class (prinsip Enkapsulasi murni).
> - **Aturan Praktis**: Deklarasikan field dengan `#` di body class (contoh: `#counter = 0;`).

## 1. 🎯 Tujuan Belajar

- Memahami pilar OOP: **Encapsulation (Enkapsulasi)** sejati di JavaScript.
- Menggunakan tanda pagar (**`#`**) untuk membuat field private.
- Mencegah manipulasi data internal objek secara ilegal dari luar class.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> Seperti **brankas uang di bank**: Teller bisa menyetor dan menarik uang lewat loket kasir resmi (`deposit()`), tetapi pengunjung umum tidak boleh dan tidak bisa membongkar pintu brankas secara langsung (`#saldo`).

Secara default, semua field di class JavaScript bersifat publik. Sejak standar ES2022, JavaScript menambahkan fitur **Private Class Field**:

1. Ditandai dengan awalan simbol pagar (**`#`**), contoh: `#counter = 0`, `#saldo`, `#passwordHash`.
2. Field ini **HANYA bisa dibaca dan diubah dari dalam badan class itu sendiri**.
3. Jika kode di luar class mencoba mengakses `objek.#counter`, JavaScript langsung melempar `SyntaxError` saat parsing kode, bahkan sebelum script sempat berjalan!

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Private Class Field menggunakan tanda pagar (#) untuk enkapsulasi sejati

class Counter {
  #counter = 0; // Private: hanya bisa diakses di dalam class Counter

  increment() {
    this.#counter++;
  }

  decrement() {
    this.#counter--;
  }

  get() {
    return this.#counter;
  }
}

const joko = new Counter();

joko.increment();
joko.increment();
joko.increment();
joko.increment();
joko.increment();
joko.decrement();

console.info('Nilai Counter:', joko.get()); // 4

// joko.#counter = 100; // ERROR!
```

---

## 4. 🖥️ Output yang Diharapkan

```text
Nilai Counter: 4
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

Menyimpan API Key, secret token, atau counter saldo keuangan yang integritasnya wajib dilindungi.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Akses dari Luar Melempar Error**: Mencoba mengakses `objek.#properti` dari luar class akan langsung memicu error kompilasi/runtime syntax error.
- **Tidak Diwarisi ke Subclass**: Private field benar-benar privat; child class turunan TIDAK BISA mengakses `#field` milik parent-nya.

### 🌟 Best Practice

- Gunakan private field `#` asli ES2022 alih-alih sekadar konvensi nama `_underscore` yang sebenarnya tetap bersifat publik.
- Sediakan method publik atau getter jika data private perlu dibaca pihak luar secara terkontrol.

---

## 6. ✍️ Latihan Mandiri

1. Buat class `Dompet` dengan private field `#saldo`. Sediakan method `isiSaldo(nominal)`, `tarikTunai(nominal)`, dan `cekSaldo()`. Pastikan penarikan gagal jika saldo tidak mencukupi.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [08 - Public Class Field](../08-public-class-field/README.md)
- ➡️ **Selanjutnya:** [10 - Private Method](../10-private-method/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
