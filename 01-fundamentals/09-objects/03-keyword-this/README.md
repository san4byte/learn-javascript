# 09.3 - Konsep Keyword This pada Berbagai Konteks

## 1. 🎯 Tujuan Belajar
- Memahami peran keyword `this` sebagai penunjuk konteks objek yang sedang aktif.
- Memahami nilai `this` saat dipanggil secara global, di dalam method objek, dan di dalam constructor.
- Memahami bahaya kehilangan konteks `this` saat mempassing method sebagai callback.

---

## 2. 📖 Penjelasan Konsep
Keyword **`this`** adalah kata kunci spesial di JavaScript yang merepresentasikan **objek pemilik yang sedang mengeksekusi kode saat ini**.

Nilai dari `this` **bersifat dinamis** dan ditentukan sepenuhnya oleh **bagaimana cara fungsi tersebut dipanggil**:

### 4 Aturan Nilai `this`:
1. **Pemanggilan Fungsi Biasa (Global)**:
   * Pada fungsi reguler bebas: `this` menunjuk ke objek global (`window` di browser, atau `global` di Node.js). Pada mode `use strict`, bernilai `undefined`.
2. **Method Objek**:
   * Jika fungsi dipanggil sebagai properti objek (`obj.method()`): `this` menunjuk ke **objek itu sendiri**.
3. **Constructor Function (`new`)**:
   * Saat fungsi dipanggil dengan `new`: `this` menunjuk ke **objek baru yang baru saja diinstansiasi**.
4. **Manipulasi Manual (`call`, `apply`, `bind`)**:
   * Nilai `this` dapat dipatok secara eksplisit ke objek tertentu.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. 'this' di dalam Method Objek ---");
const akunPengguna = {
  nama: "Joko Santoso",
  saldo: 1500000,
  
  tampilkanInfo: function () {
    // 'this' menunjuk ke objek akunPengguna
    console.log(`Pemilik: ${this.nama} | Saldo: Rp ${this.saldo.toLocaleString('id-ID')}`);
  }
};

akunPengguna.tampilkanInfo();

console.log("\n--- 2. 'this' di dalam Constructor Function ---");
function Mobil(merk) {
  // 'this' mengacu pada instance mobil yang baru diciptakan
  this.merk = merk;
  this.klakson = function () {
    console.log(`Brum brum! Mobil ${this.merk} membunyikan klakson.`);
  };
}

const avanza = new Mobil("Toyota");
avanza.klakson();

console.log("\n--- 3. Mengikat 'this' secara Eksplisit dengan bind() ---");
const fungsiLepas = akunPengguna.tampilkanInfo;
// Jika dipanggil langsung: fungsiLepas(); -> this.nama undefined!

// Kita ikat kembali nilai 'this' ke akunPengguna:
const fungsiTerikat = fungsiLepas.bind(akunPengguna);
fungsiTerikat();
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. 'this' di dalam Method Objek ---
Pemilik: Joko Santoso | Saldo: Rp 1.500.000

--- 2. 'this' di dalam Constructor Function ---
Brum brum! Mobil Toyota membunyikan klakson.

--- 3. Mengikat 'this' secara Eksplisit dengan bind() ---
Pemilik: Joko Santoso | Saldo: Rp 1.500.000
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> Keyword `this` seperti kata ganti orang **'Saya'**: Jika Joko yang berbicara di depan umum, kata 'Saya' merujuk ke Joko. Jika Budi yang berbicara, kata 'Saya' merujuk ke Budi. Arti kata 'Saya' (*this*) selalu bergantung pada siapa yang sedang memegang mikrofon (siapa yang memanggil fungsi).

### 🏢 Real-World Use Case
1. **Komponen UI Berbasis Class / Prototype**: Method `this.render()`, `this.setState()` di arsitektur komponen.
2. **Event Listener DOM**: Pada event listener reguler `btn.addEventListener('click', function() {})`, `this` secara otomatis menunjuk ke elemen tombol HTML yang sedang diklik.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Kehilangan Konteks `this` pada Callback**: Saat Anda melewatkan method objek ke dalam `setTimeout(obj.method, 1000)`, fungsi dieksekusi oleh timer global sehingga `this` menjadi hilang/berubah menjadi window. Gunakan arrow function `() => obj.method()` atau `.bind(obj)`.

### 🌟 Best Practice
* Gunakan Arrow Function di dalam callback internal method jika ingin mempertahankan konteks `this` dari method pembungkusnya (*lexical this*).
* Selalu perhatikan titik pemanggilan fungsi di sebelah kiri tanda titik (misal pada `user.sapa()`, maka `this` adalah `user`).

---

## 6. ✍️ Latihan Mandiri
1. Buatlah objek `kalkulator` dengan properti `angka1: 10`, `angka2: 5`, dan method `tambah()` serta `kurang()` yang memanfaatkan `this.angka1` dan `this.angka2`.
2. Lepaskan method `tambah` ke dalam variabel mandiri dan gunakan `.bind()` agar method tetap berfungsi normal.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [09.2 - Tiga Cara Membuat Object](../02-creating-objects/README.md)
- ➡️ **Selanjutnya:** [09.4 - Destructuring & Spread Object](../04-destructuring-spread/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
