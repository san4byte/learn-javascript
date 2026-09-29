# 09 - Private Class Field

## Tujuan Belajar
- Memahami pilar OOP: **Encapsulation (Enkapsulasi)** sejati di JavaScript.
- Menggunakan tanda pagar (**`#`**) untuk membuat field private.
- Mencegah manipulasi data internal objek secara ilegal dari luar class.

## Penjelasan Konsep
Secara default, semua field di class JavaScript bersifat publik. Sejak standar ES2022, JavaScript menambahkan fitur **Private Class Field**:
1. Ditandai dengan awalan simbol pagar (**`#`**), contoh: `#counter = 0`, `#saldo`, `#passwordHash`.
2. Field ini **HANYA bisa dibaca dan diubah dari dalam badan class itu sendiri**.
3. Jika kode di luar class mencoba mengakses `objek.#counter`, JavaScript langsung melempar `SyntaxError` saat parsing kode, bahkan sebelum script sempat berjalan!

## Contoh Kode
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

console.info("Nilai Counter:", joko.get()); // 4

// joko.#counter = 100; // ERROR!
```

### Output
```text
Nilai Counter: 4
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Seperti brankas di dalam kantor bank: Teller dan staf berwenang bisa menyetor uang ke brankas lewat sistem kasir (method `increment()`), tetapi nasabah biasa yang berdiri di lobi tidak boleh dan tidak bisa langsung membuka pintu brankas tersebut (`#counter`).
- **Sejarah & Solusi Masa Lalu**:
  Dulu developer menggunakan konvensi garis bawah (`this._counter`) yang sebenarnya tetap publik dan bisa diubah siapa saja. Tanda pagar `#` adalah solusi resmi bawaan engine browser (V8) untuk proteksi memori tingkat bahasa.
- **Apakah Child Class Bisa Mengakses Private Field Parent?**:
  **TIDAK BISA**. Private field benar-benar terisolasi hanya untuk class tempat ia dideklarasikan. Subclass turunan tidak bisa mengakses `#field` milik superclass-nya.

## Latihan
1. Buat class `Dompet` dengan private field `#saldo`. Sediakan method `isiSaldo(nominal)`, `tarikTunai(nominal)`, dan `cekSaldo()`. Pastikan penarikan gagal jika saldo tidak mencukupi.

## Ringkasan Poin Penting
- Gunakan `#` di awal nama properti untuk membuat field private.
- Private field menjamin integritas data internal objek dari manipulasi liar.

---
[⬅️ Materi Sebelumnya: 08 - Public Class Field](../08-public-class-field/README.md) | [Materi Selanjutnya: 10 - Private Method ➡️](../10-private-method/README.md)
