# 07.9 - Project Perhitungan Volume Dua Kubus

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Menerapkan prinsip Modular Programming dan Dekomposisi Fungsi.
> * **Kapan Digunakan**: Membuat fungsi pembantu (*helper function*) yang dapat digunakan kembali.
> * **Aturan Praktis**: Berikan nama parameter yang jelas dan terstandarisasi.

## 1. 🎯 Tujuan Belajar
- Menerapkan prinsip Modular Programming dan Dekomposisi Fungsi.
- Membuat fungsi pembantu (*helper function*) yang dapat digunakan kembali.
- Menghindari duplikasi kode perhitungan matematika.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Modular programming seperti **merakit balok LEGO**: Daripada mencetak satu patung istana utuh yang kaku, kita membuat balok-balok kecil (fungsi pembantu) yang bisa dirakit menjadi istana, rumah, atau mobil kapan pun kita butuhkan.

Proyek **Perhitungan Volume Dua Kubus** adalah studi kasus klasik untuk memahami bagaimana memecah masalah besar menjadi fungsi-fungsi kecil yang rapi:

### Alur Masalah:
Diberikan panjang sisi dua buah kubus ($sisiA$ dan $sisiB$). Kita ingin menghitung **jumlah total volume** kedua kubus tersebut:
$$Total = sisiA^3 + sisiB^3$$

Daripada menuliskan rumus perhitungan pangkat tiga secara berulang-ulang di banyak tempat, kita mendefinisikan fungsi `hitungVolumeKubus(sisi)`, lalu memanggilnya di dalam fungsi `jumlahkanVolumeDuaKubus()`.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- Project Perhitungan Volume Dua Kubus ---');

// Fungsi pembantu independen (Modular Helper)
function hitungVolumeKubus(sisi) {
  return sisi * sisi * sisi; // atau Math.pow(sisi, 3)
}

// Fungsi utama yang mengombinasikan hasil
function jumlahVolumeDuaKubus(sisiA, sisiB) {
  const volumeA = hitungVolumeKubus(sisiA);
  const volumeB = hitungVolumeKubus(sisiB);
  
  return volumeA + volumeB;
}

const sisiKubus1 = 8;
const sisiKubus2 = 3;

const totalVolume = jumlahVolumeDuaKubus(sisiKubus1, sisiKubus2);

console.log(`Kubus 1 (sisi ${sisiKubus1}) volume : ${hitungVolumeKubus(sisiKubus1)}`);
console.log(`Kubus 2 (sisi ${sisiKubus2}) volume : ${hitungVolumeKubus(sisiKubus2)}`);
console.log(`Total gabungan volume      : ${totalVolume}`);
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- Project Perhitungan Volume Dua Kubus ---
Kubus 1 (sisi 8) volume : 512
Kubus 2 (sisi 3) volume : 27
Total gabungan volume      : 539
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **Sistem Perhitungan Pajak E-Commerce**: Fungsi `hitungPajak(nominal)` dipanggil berulang kali saat menghitung pajak barang, pajak ongkos kirim, dan biaya layanan admin.
2. **Kalkulator BMI & Kalori Kesehatan**: Fungsi menghitung BMR dan fungsi menghitung kalori aktivitas digabungkan untuk menghasilkan rekomendasi diet harian.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Fungsi Terlalu Gemuk (God Function)**: Menaruh seluruh logika perhitungan, validasi input, dan formatting teks ke dalam satu fungsi raksasa 200 baris. Selalu pecah menjadi fungsi-fungsi kecil yang spesifik.

### 🌟 Best Practice
* Berikan nama parameter yang jelas dan terstandarisasi.
* Buat fungsi pembantu murni (*pure function*) yang tidak bergantung pada variabel global di luarnya agar mudah diuji (*unit testing*).

---

## 6. ✍️ Latihan Mandiri
1. Kembangkan fungsi di atas agar dapat menjumlahkan volume dari **tiga buah kubus** sekaligus.
2. Buat fungsi pembantu serupa untuk menghitung volume balok: `hitungVolumeBalok(panjang, lebar, tinggi)`.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [07.8 - Fungsi Rekursif](../08-recursion/README.md)
- ➡️ **Selanjutnya:** [08.1 - Manipulasi Array](../../08-arrays/01-array-manipulation/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
