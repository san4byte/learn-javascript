# 07.4 - Closures dan Lexical Scope

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami fase Execution Context: Creation Phase dan Execution Phase.
> * **Kapan Digunakan**: Memahami konsep Lexical Scope dan definisi mutlak Closure.
> * **Aturan Praktis**: Manfaatkan Closure untuk melindungi data sensitif agar tidak bisa diubah sembarangan dari luar tanpa melalui fungsi validasi (*setter/getter*).

## 1. 🎯 Tujuan Belajar
- Memahami fase Execution Context: Creation Phase dan Execution Phase.
- Memahami konsep Lexical Scope dan definisi mutlak Closure.
- Mampu menggunakan Closure untuk membuat Private Variable (Enkapsulasi Data).
- Mampu membuat Function Factory (pembuat fungsi dinamis).

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Closure seperti **membawa ransel bekal tamasya saat meninggalkan rumah**: Meskipun Anda sudah berjalan jauh meninggalkan rumah Anda (fungsi luar selesai dieksekusi), Anda tetap membawa dan bisa memakan bekal yang disiapkan dari rumah tersebut di mana pun Anda berada (fungsi dalam mengingat variabel fungsi luar).

**Closure** adalah kombinasi antara sebuah fungsi dan lingkungan leksikal (*lexical environment*) di mana fungsi tersebut dideklarasikan.

Closure terjadi ketika:
1. Sebuah fungsi dalam (*inner function*) mengacu pada variabel di fungsi luarnya (*outer function*).
2. Fungsi luar tersebut selesai dieksekusi dan dikeluarkan dari Call Stack.
3. **Fungsi dalam tetap mengingat dan memiliki akses ke variabel fungsi luar tersebut!**

### 🧠 Diagram Call Stack & Closure Memory

```text
  1. Saat fungsiLuar() berjalan:
  +-------------------------------------+
  | CALL STACK                          |
  | [ fungsiLuar() -> let counter = 0 ] |
  +-------------------------------------+
  
  2. Saat fungsiLuar() selesai dieksekusi & keluar dari Call Stack:
  +-------------------------------------+
  | CALL STACK                          |
  | (Kosong dari fungsiLuar)            |
  +-------------------------------------+
                     |
                     v
  +-------------------------------------+
  | HEAP MEMORY (CLOSURE SCOPE)         |
  | [ Closure (fungsiLuar) ]            |
  |  -> counter: 0 (DIJAGA TETAP HIDUP!)| <--- fungsiDalam tetap memegang
  +-------------------------------------+      akses ke variabel ini!
```

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Function Factory dengan Closure ---");
function buatFungsiPenyapa(waktu) {
  // Variabel 'waktu' berada di outer lexical environment
  return function (nama) {
    return `Selamat ${waktu}, ${nama}! Selamat beraktivitas.`;
  };
}

// Membuat fungsi spesifik dari factory
const sapaPagi = buatFungsiPenyapa("Pagi");
const sapaMalam = buatFungsiPenyapa("Malam");

console.log(sapaPagi("Joko"));
console.log(sapaMalam("Budi"));

console.log("\n--- 2. Enkapsulasi / Private Variable dengan Closure ---");
function buatRekeningTabungan(saldoAwal) {
  let saldo = saldoAwal; // Private variable (tidak bisa diakses langsung dari luar)

  return {
    setorUang: function (jumlah) {
      saldo += jumlah;
      console.log(`Setor Rp ${jumlah.toLocaleString('id-ID')} | Saldo saat ini: Rp ${saldo.toLocaleString('id-ID')}`);
    },
    tarikUang: function (jumlah) {
      if (jumlah <= saldo) {
        saldo -= jumlah;
        console.log(`Tarik Rp ${jumlah.toLocaleString('id-ID')} | Sisa saldo: Rp ${saldo.toLocaleString('id-ID')}`);
      } else {
        console.log("Penarikan gagal: Saldo tidak mencukupi!");
      }
    },
    cekSaldo: function () {
      return saldo;
    }
  };
}

const rekeningJoko = buatRekeningTabungan(500000);
rekeningJoko.setorUang(200000);
rekeningJoko.tarikUang(100000);

// Mencoba membobol saldo secara langsung:
console.log("Akses langsung rekeningJoko.saldo:", rekeningJoko.saldo); // undefined (AMAN!)
console.log("Saldo resmi via cekSaldo()          : Rp", rekeningJoko.cekSaldo().toLocaleString('id-ID'));
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Function Factory dengan Closure ---
Selamat Pagi, Joko! Selamat beraktivitas.
Selamat Malam, Budi! Selamat beraktivitas.

--- 2. Enkapsulasi / Private Variable dengan Closure ---
Setor Rp 200.000 | Saldo saat ini: Rp 700.000
Tarik Rp 100.000 | Sisa saldo: Rp 600.000
Akses langsung rekeningJoko.saldo: undefined
Saldo resmi via cekSaldo()          : Rp 600.000
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **Hook `useState` di React**: Bagaimana React mengingat nilai state komponen antar siklus render diimplementasikan sepenuhnya menggunakan konsep Closure.
2. **Private Method / Private State**: Menyembunyikan token autentikasi atau logika enkripsi di dalam closure sebelum diperkenalkannya private field `#` di class modern.
3. **Currying & Middleware**: Pola pipeline request middleware di framework backend Express/Nest.js.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Memory Leak Akibat Closure yang Tidak Dilepas**: Variabel yang tertangkap di dalam closure tidak akan dibersihkan oleh *Garbage Collector* selama fungsi pemanggilnya masih aktif. Jika closure memegang objek data berukuran megabyte yang sudah tidak dipakai, memori browser akan bocor.
* **Bug Looping dengan `var`**: Sebelum adanya `let`, meletakkan closure/event listener di dalam perulangan `var` membuat semua fungsi memegang referensi ke angka terakhir dari loop.

### 🌟 Best Practice
* Manfaatkan Closure untuk melindungi data sensitif agar tidak bisa diubah sembarangan dari luar tanpa melalui fungsi validasi (*setter/getter*).
* Lepaskan referensi fungsi closure jika sudah selesai digunakan agar memori dibersihkan oleh Garbage Collector.

---

## 6. ✍️ Latihan Mandiri
1. Buatlah fungsi `buatPenghitungID(prefix)` menggunakan closure yang setiap kali dipanggil menghasilkan ID unik berurutan, misalnya: `'USER-1'`, `'USER-2'`, `'USER-3'`.
2. Uji fungsi tersebut dengan membuat dua generator ID berbeda: untuk `'PROD'` dan `'USER'`.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [07.3 - Variable Scope](../03-scope/README.md)
- ➡️ **Selanjutnya:** [07.5 - Arrow Function](../05-arrow-functions/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
