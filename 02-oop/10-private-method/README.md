# 10 - Private Method

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Membuat fungsi pembantu internal dengan awalan `#` yang tidak dapat dipanggil dari luar class.
> - **Kapan Digunakan**: Menyederhanakan method publik yang rumit dengan memecahnya ke helper method tanpa mengotori interface publik.
> - **Aturan Praktis**: Awali nama method dengan tanda `#` (contoh: `#validasiInput()`).

## 1. 🎯 Tujuan Belajar

- Memahami konsep **Private Method** di JavaScript Class.
- Menggunakan tanda pagar (**`#`**) untuk menyembunyikan logika fungsi internal (_internal helper functions_).
- Menjaga antarmuka publik (_Public API_) class tetap bersih dan mudah digunakan.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata

> Seperti **mesin mobil di bawah kap**: Pengemudi hanya berinteraksi dengan antarmuka kemudi publik seperti pedal gas dan setir (`drive()`). Pengemudi tidak perlu (dan tidak boleh) menyentuh mekanisme pembakaran busi di dalam blok mesin tertutup (`#bakarBahanBakar()`).

Sama seperti field, method di dalam class juga bisa dibuat menjadi private dengan memberi awalan tanda pagar (**`#`**):

1. Private method hanya dapat dipanggil oleh method lain di dalam class yang sama (`this.#namaMethod()`).
2. Kode di luar class tidak dapat melihat atau memanggil private method ini.
3. Sangat ideal untuk fungsi validasi rumit, hashing password, atau fungsi pembantu kalkulasi yang tidak perlu diketahui oleh pengguna class.

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Private Method menggunakan tanda pagar (#) untuk fungsi internal rahasia

class Person {
  say(name) {
    if (name) {
      this.#sayWithName(name);
    } else {
      this.#sayWithoutName();
    }
  }

  #sayWithoutName() {
    console.info('Hello');
  }

  #sayWithName(name) {
    console.info(`Hello ${name}`);
  }
}

const joko = new Person();
joko.say('Joko Santoso');
joko.say();
```

---

## 4. 🖥️ Output yang Diharapkan

```text
Hello Joko Santoso
Hello
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

Enkapsulasi algoritma enkripsi internal, formatting data mentah internal, atau validasi parameter sebelum diproses.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **SyntaxError Saat Dipanggil di Luar**: Memanggil `#method()` dari luar class menyebabkan `SyntaxError: Private field '#...' must be declared in an enclosing class`.
- **Tidak Tersedia di Subclass**: Sama seperti private field, subclass tidak dapat memanggil private method superclass secara langsung.

### 🌟 Best Practice

- Pecah logika method publik yang panjang menjadi private helper method kecil yang bersih.
- Terapkan prinsip Abstraction: sembunyikan kerumitan implementasi dari pengguna luar class.

---

## 6. ✍️ Latihan Mandiri

1. Buat class `UserAuth` dengan method publik `register(username, password)`. Buat private method `#validatePassword(password)` yang memeriksa apakah panjang password minimal 8 karakter.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [09 - Private Class Field](../09-private-class-field/README.md)
- ➡️ **Selanjutnya:** [11 - Operator instanceof](../11-instanceof-operator/README.md)
- 🏠 **Daftar Isi Modul 02:** [README Modul 02](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
