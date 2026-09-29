# 10 - Private Method

## Tujuan Belajar
- Memahami konsep **Private Method** di JavaScript Class.
- Menggunakan tanda pagar (**`#`**) untuk menyembunyikan logika fungsi internal (*internal helper functions*).
- Menjaga antarmuka publik (*Public API*) class tetap bersih dan mudah digunakan.

## Penjelasan Konsep
Sama seperti field, method di dalam class juga bisa dibuat menjadi private dengan memberi awalan tanda pagar (**`#`**):
1. Private method hanya dapat dipanggil oleh method lain di dalam class yang sama (`this.#namaMethod()`).
2. Kode di luar class tidak dapat melihat atau memanggil private method ini.
3. Sangat ideal untuk fungsi validasi rumit, hashing password, atau fungsi pembantu kalkulasi yang tidak perlu diketahui oleh pengguna class.

## Contoh Kode
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
    console.info("Hello");
  }

  #sayWithName(name) {
    console.info(`Hello ${name}`);
  }
}

const joko = new Person();
joko.say("Joko Santoso");
joko.say();
```

### Output
```text
Hello Joko Santoso
Hello
```

## Penjelasan Tambahan
- **Analogi Kehidupan Sehari-hari**:
  Seperti mesin mobil: Anda sebagai pengemudi hanya berinteraksi dengan antarmuka publik: pedal gas dan setir (`say()`). Anda tidak perlu (dan tidak boleh sembarangan) menyentuh mekanisme pembakaran busi di ruang mesin tertutup (`#sayWithName()`).
- **Prinsip Abstraction**:
  Menyembunyikan detail teknis yang rumit dari pengguna class, sehingga pengguna class hanya fokus menggunakan method utama yang bersih.

## Latihan
1. Buat class `UserAuth` dengan method publik `register(username, password)`. Buat private method `#validatePassword(password)` yang memeriksa apakah panjang password minimal 8 karakter.

## Ringkasan Poin Penting
- Awali nama method dengan `#` untuk menjadikannya private.
- Private method merapikan kode internal tanpa mencemari API publik class.

---
[⬅️ Materi Sebelumnya: 09 - Private Class Field](../09-private-class-field/README.md) | [Materi Selanjutnya: 11 - Operator instanceof ➡️](../11-operator-instanceof/README.md)
