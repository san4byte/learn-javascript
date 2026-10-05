# 09.6 - Latihan Pengelolaan Angkot Berbasis Objek

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Mengintegrasikan Constructor Function, Method, Array, dan Pengkondisian.
> * **Kapan Digunakan**: Merepresentasikan Angkot nyata menjadi Objek Utuh (Sopir, Trayek, Kas/Pendapatan, Penumpang).
> * **Aturan Praktis**: Kelompokkan data dan method yang saling terkait ke dalam satu objek utuh (*High Cohesion*).

## 1. 🎯 Tujuan Belajar
- Mengintegrasikan Constructor Function, Method, Array, dan Pengkondisian.
- Merepresentasikan Angkot nyata menjadi Objek Utuh (Sopir, Trayek, Kas/Pendapatan, Penumpang).
- Mampu menangani transaksi pembayaran saat penumpang turun.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Objek Angkot seperti **sebuah mobil angkot fisik nyata lengkap dengan buku catatan kas sopirnya**: di dalamnya ada sopir di balik kemudi, daftar bangku penumpang di belakang, dan kotak kayu tempat menyimpan uang kembalian dan setoran.

Latihan **Angkot Berbasis Objek** adalah puncak dari pemahaman objek dan logika dasar.

Daripada menyimpan data sopir, penumpang, dan kas dalam variabel-variabel terpisah yang rawan berantakan, kita membungkus seluruh karakteristik angkot ke dalam satu **Constructor Function `Angkot`**:

### Properti Objek Angkot:
* `sopir`: Nama sopir angkot.
* `trayek`: Rute perjalanan (contoh: `['Cicaheum', 'Cibiru']`).
* `penumpang`: Array daftar kursi penumpang.
* `kas`: Total uang pendapatan yang diperoleh dari ongkos penumpang.

### Method Objek Angkot:
* `penumpangNaik(namaPenumpang)`: Menambahkan nama penumpang ke kursi.
* `penumpangTurun(namaPenumpang, bayar)`: Menghapus penumpang dari kursi dan menambahkan uang bayar ke dalam kas angkot.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- Sistem Pengelolaan Angkot Berbasis Objek ---');

function Angkot(sopir, trayek, penumpang, kas) {
  this.sopir = sopir;
  this.trayek = trayek;
  this.penumpang = penumpang;
  this.kas = kas;

  // Method Penumpang Naik
  this.penumpangNaik = function (nama) {
    this.penumpang.push(nama);
    console.log(`[NAIK]: ${nama} naik ke angkot trayek ${this.trayek.join(' - ')}.`);
    return this.penumpang;
  };

  // Method Penumpang Turun & Pembayaran
  this.penumpangTurun = function (nama, ongkos) {
    if (this.penumpang.length === 0) {
      console.log('Angkot masih kosong!');
      return false;
    }

    for (let i = 0; i < this.penumpang.length; i++) {
      if (this.penumpang[i] === nama) {
        this.penumpang[i] = undefined; // Kursi kosong kembali
        this.kas += ongkos; // Kas bertambah
        console.log(`[TURUN & BAYAR]: ${nama} turun dan membayar Rp ${ongkos.toLocaleString('id-ID')}.`);
        console.log(`-> Kas Sopir ${this.sopir} saat ini: Rp ${this.kas.toLocaleString('id-ID')}`);
        return this.penumpang;
      }
    }

    console.log(`Penumpang '${nama}' tidak ada di angkot ini.`);
    return this.penumpang;
  };
}

// Inisialisasi Armada Angkot 1
const angkot1 = new Angkot('Pak Joko', ['Cicaheum', 'Cibiru'], [], 0);

// Operasi Penumpang:
angkot1.penumpangNaik('Budi');
angkot1.penumpangNaik('Siti');
console.log('Daftar Penumpang:', angkot1.penumpang);

// Penumpang turun dan membayar ongkos Rp 5.000
angkot1.penumpangTurun('Budi', 5000);
angkot1.penumpangTurun('Siti', 5000);

console.log('Total Kas Akhir:', angkot1.kas);
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- Sistem Pengelolaan Angkot Berbasis Objek ---
[NAIK]: Budi naik ke angkot trayek Cicaheum - Cibiru.
[NAIK]: Siti naik ke angkot trayek Cicaheum - Cibiru.
Daftar Penumpang: [ 'Budi', 'Siti' ]
[TURUN & BAYAR]: Budi turun dan membayar Rp 5.000.
-> Kas Sopir Pak Joko saat ini: Rp 5.000
[TURUN & BAYAR]: Siti turun dan membayar Rp 5.000.
-> Kas Sopir Pak Joko saat ini: Rp 10.000
Total Kas Akhir: 10000
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **Sistem Akuntansi Taksi Online (Grab/Gojek)**: Setiap trip perjalanan memiliki status driver, rute penjemputan-tujuan, dan wallet saldo yang bertambah setelah pembayaran transaksi selesai.
2. **Game Toko / RPG Inventory**: Karakter hero memiliki nama, kantong tas (array inventory), dan saldo koin emas (kas).

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Lupa `this.kas += ongkos`**: Lupa menyertakan keyword `this.` saat memodifikasi properti kas akan membuat JavaScript mencari variabel lokal kas yang tidak ada, sehingga saldo tidak pernah bertambah.

### 🌟 Best Practice
* Kelompokkan data dan method yang saling terkait ke dalam satu objek utuh (*High Cohesion*).
* Kembalikan data mutasi di akhir method agar pemanggil dapat memeriksa status hasil operasi.

---

## 6. ✍️ Latihan Mandiri
1. Buatlah armada kedua `angkot2 = new Angkot('Pak Herman', ['Kebon Kelapa', 'Ledeng'], [], 10000)`.
2. Lakukan simulasi 2 orang naik dan 1 orang turun dengan ongkos Rp 7.000.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [09.5 - Object Lanjutan](../05-advanced-objects/README.md)
- ➡️ **Selanjutnya:** [10.1 - Game Suit Jawa](../../10-mini-games/01-suit-jawa/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
