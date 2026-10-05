# 06 - Project Simulasi Pengelolaan Angkot

## 1. 🎯 Tujuan Belajar
- Mengintegrasikan konsep Perulangan (for & while) dengan Pengkondisian (if, else if, else).
- Mampu menyelesaikan masalah logika bisnis dunia nyata bertahap dari kasus Angkot 1 sampai Angkot 6.
- Melatih kebiasaan menulis kode logika yang bersih, efisien, dan bebas duplikasi (DRY).

---

## 2. 📖 Penjelasan Konsep
Proyek **Simulasi Angkot** adalah latihan logika klasik dari kurikulum WPU (Pak Sandhika Galih) yang sangat ampuh untuk melatih kombinasi perulangan dan percabangan kondisi logika secara bertahap:

### Alur Masalah Bisnis:
1. **Total Armada**: Ada 10 angkot (Nomor 1 sampai 10).
2. **Kondisi 1**: Angkot 1 sampai 6 beroperasi dengan baik.
3. **Kondisi 2**: Angkot 7 dan 8 sedang rusak.
4. **Kondisi 3 (Lembur)**: Angkot nomor 8 dan 10 sedang lembur (khusus nomor 8 sedang lembur meski statusnya diperbaiki).

Struktur logika disusun menggunakan satu perulangan `for` dari 1 hingga 10, lalu disaring menggunakan kombinasi percabangan `if`, `else if`, dan operator logika `||`.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- Simulasi Status Operasional 10 Angkot ---");

const totalAngkot = 10;
const angkotBeroperasiNormal = 6;

for (let noAngkot = 1; noAngkot <= totalAngkot; noAngkot++) {
  // Angkot 8 dan 10 mendapat penugasan lembur khusus
  if (noAngkot === 8 || noAngkot === 10) {
    console.log(`Angkot No. ${noAngkot} sedang lembur.`);
  } else if (noAngkot <= angkotBeroperasiNormal) {
    console.log(`Angkot No. ${noAngkot} beroperasi dengan baik.`);
  } else {
    console.log(`Angkot No. ${noAngkot} sedang tidak beroperasi.`);
  }
}
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- Simulasi Status Operasional 10 Angkot ---
Angkot No. 1 beroperasi dengan baik.
Angkot No. 2 beroperasi dengan baik.
Angkot No. 3 beroperasi dengan baik.
Angkot No. 4 beroperasi dengan baik.
Angkot No. 5 beroperasi dengan baik.
Angkot No. 6 beroperasi dengan baik.
Angkot No. 7 sedang tidak beroperasi.
Angkot No. 8 sedang lembur.
Angkot No. 9 sedang tidak beroperasi.
Angkot No. 10 sedang lembur.
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> Simulasi ini seperti **papan monitor dispatcher bandara**: setiap pesawat diperiksa nomor penerbangannya secara berurutan. Pesawat reguler dinyatakan 'On Schedule', pesawat perbaikan dinyatakan 'Maintenance', dan beberapa penerbangan carter khusus dinyatakan 'Overtime Service'.

### 🏢 Real-World Use Case
1. **Penjadwalan Armada Kendaraan Logistik (Fleet Management)**: Menentukan armada truk kurir mana yang aktif mengirim paket hari ini, mana yang sedang servis rutin di bengkel, dan mana yang lembur pengiriman malam.
2. **Filtering Status Pengguna / Langganan**: Menyaring ribuan akun pengguna: pengguna aktif, akun ditangguhkan (*suspended*), dan akun VIP berbayar.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Urutan Pengecekan Kondisi yang Salah**: Jika kondisi `noAngkot <= 6` diletakkan paling atas, maka jika ada angkot nomor 5 yang lembur, ia tidak akan pernah masuk ke kondisi lembur karena sudah lolos di pengecekan pertama. Selalu tempatkan kondisi spesifik di atas kondisi umum.

### 🌟 Best Practice
* Gunakan konstanta konfigurasi (`const totalAngkot = 10`) daripada menuliskan *magic number* secara langsung di dalam kode perulangan.
* Hindari duplikasi teks output dengan menyimpannya ke dalam variabel pesan status sebelum dicetak.

---

## 6. ✍️ Latihan Mandiri
1. Modifikasi program di atas sehingga Angkot nomor 5 juga sedang lembur (jadi yang lembur adalah angkot 5, 8, dan 10).
2. Tambahkan kondisi baru: jika angkot nomor 7, cetak 'Angkot No. 7 sedang dalam perbaikan berat di bengkel'.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [05.2 - Else If dan Switch](../05-conditionals/02-else-if-switch/README.md)
- ➡️ **Selanjutnya:** [07.1 - Pengenalan Function](../07-functions/01-intro/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
