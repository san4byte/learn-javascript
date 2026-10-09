# Mini Project 01 - Simulasi Pengelolaan Angkot

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengintegrasikan konsep perulangan (`for` & `while`) dengan seleksi kondisi (`if`, `else if`, `else`) untuk memproses status entitas secara berurutan.
> - **Kapan Digunakan**: Menyelesaikan masalah logika bisnis berbasis aturan prioritas berurutan (alur bertahap Angkot 1 sampai Angkot 10).
> - **Aturan Praktis**: Dahulukan kondisi yang paling spesifik (misal: angkot lembur khusus) sebelum mengevaluasi kondisi umum (rentang angkot normal). Simpan parameter dalam konstanta konfigurasi.

---

## 1. 🎯 Tujuan Belajar

- Mengintegrasikan sintaks perulangan counter-controlled (`for`) dengan struktur logika percabangan bertingkat.
- Memahami urutan prioritas evaluasi ekspresi kondisi dan operator logika boolean (`||`).
- Menghindari jebakan _shadowing conditions_ di mana kondisi spesifik terabaikan akibat evaluasi rentang yang terlalu luas.
- Melatih kebiasaan menulis kode modular yang bersih, konsisten, dan mudah diperluas (_scalable_).

---

## 2. 📖 Penjelasan Konsep & Logika Simulasi

### 🎭 Analogi Dunia Nyata

> Simulasi ini seperti **papan monitor dispatcher pangkalan transportasi**: setiap kendaraan diperiksa nomor lambungnya secara berurutan saat keluar gerbang. Petugas mencocokkan nomor kendaraan ke lembar jadwal tugas: armada lembur mendapat stempel khusus, armada aktif harian dilepas jalan, dan armada rusak diarahkan ke bengkel.

### Tabel Ringkasan Aturan Operasional

| No. Angkot | Status Operasional      | Prioritas Evaluasi              | Keterangan Aturan                    |
| :--------- | :---------------------- | :------------------------------ | :----------------------------------- |
| `1` - `6`  | Beroperasi dengan baik  | Sedang (`<= 6`)                 | Angkot reguler rute normal pagi-sore |
| `7`, `9`   | Sedang tidak beroperasi | Terendah (`else`)               | Armada cadangan/istirahat di pool    |
| `8`, `10`  | Sedang lembur           | Tertinggi (`=== 8 \|\| === 10`) | Penugasan lembur shift malam khusus  |

---

### Penjelasan Detail Komponen Logika

#### 1. Inisialisasi Parameter & Konstanta Konfigurasi

Menyimpan batasan armada ke dalam variabel deskriptif mencegah munculnya _magic numbers_ yang menyulitkan perawatan kode di kemudian hari.

```javascript
const totalAngkot = 10;
const angkotBeroperasiNormal = 6;
```

#### 2. Evaluasi Kondisi Khusus / Lembur (Prioritas Utama)

Kondisi lembur memiliki cakupan sempit dan berlaku untuk nomor tertentu (`8` dan `10`). Operator logika OR (`||`) memastikan kedua nomor ini langsung diproses sebelum dicek oleh batasan angka lainnya.

```javascript
if (noAngkot === 8 || noAngkot === 10) {
  console.log(`Angkot No. ${noAngkot} sedang lembur.`);
}
```

#### 3. Evaluasi Rentang Beroperasi Normal

Setelah memastikan kendaraan bukan unit lembur, evaluasi relasional `<=` digunakan untuk menyaring armada 1 sampai 6.

```javascript
else if (noAngkot <= angkotBeroperasiNormal) {
  console.log(`Angkot No. ${noAngkot} beroperasi dengan baik.`);
}
```

#### 4. Penanganan Status Default (Kondisi Sisanya)

Blok `else` menangkap semua nilai yang tidak memenuhi kedua kondisi di atas (dalam hal ini armada 7 dan 9).

```javascript
else {
  console.log(`Angkot No. ${noAngkot} sedang tidak beroperasi.`);
}
```

---

## 3. 💻 Kode Praktik Terpadu (example.js)

Seluruh logika simulasi operasional armada angkot diimplementasikan dalam skrip mandiri [`example.js`](example.js). Skrip ini mendemonstrasikan perulangan iteratif dari 1 hingga 10 dengan evaluasi kondisional yang presisi.

Jalankan program di terminal:

```bash
node projects/mini-projects/01-juragan-angkot/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Penjadwalan Armada Kendaraan Logistik (Fleet Management)**: Menentukan armada truk kurir mana yang aktif mengirim paket hari ini, armada yang menjalani servis rutin berkala, dan armada yang ditugaskan lembur pengiriman darurat.
2. **Filtering Status Pengguna / Langganan**: Menyaring ribuan akun pengguna: pengguna aktif, akun ditangguhkan (_suspended_), dan akun VIP prioritas.

### ⚠️ Common Pitfalls

- **Urutan Pengecekan Kondisi yang Terbalik**: Jika kondisi `noAngkot <= 8` diletakkan paling atas, maka angkot nomor 8 akan lolos sebagai "beroperasi normal" dan tidak akan pernah mencapai pengecekan "lembur". Selalu tempatkan kondisi spesifik di atas kondisi rentang umum.
- **Kesalahan Operator Logika**: Menggunakan `&&` alih-alih `||` pada ekspresi `noAngkot === 8 && noAngkot === 10`. Nilai variabel tidak mungkin bernilai 8 sekaligus 10 pada saat bersamaan, sehingga kondisi tidak akan pernah terpenuhi.

### 🌟 Best Practice

- Gunakan konstanta konfigurasi (`const totalAngkot = 10`) daripada menuliskan nilai literal secara langsung di dalam perulangan.
- Gunakan template literals (`` `Angkot No. ${noAngkot}` ``) agar format teks konsisten dan mudah dibaca.

---

## 5. ✍️ Latihan Mandiri

1. Modifikasi program sehingga Angkot nomor 5 juga mendapat giliran lembur (armada lembur menjadi 5, 8, dan 10).
2. Tambahkan kondisi baru: jika nomor angkot adalah 7, cetak status `'Angkot No. 7 sedang dalam perbaikan berat di bengkel'`.

---

## 6. 🧭 Navigasi

- ➡️ **Selanjutnya:** [02 - Suit Jawa CLI](../02-suit-jawa-cli/README.md)
- 🏠 **Daftar Isi Mini Projects:** [README Mini Projects](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
