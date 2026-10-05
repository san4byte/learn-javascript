# 08 - Dynamic Module Loading (Dynamic Import)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memuat file modul JavaScript secara asinkron saat dibutuhkan (*on-demand / lazy loading*) menggunakan fungsi bawaan `import()`.
> * **Kapan Digunakan**: Menghemat bandwidth dan mempercepat loading awal aplikasi web dengan menunda pengunduhan modul berat hingga ada aksi dari pengguna.
> * **Aturan Praktis**: Fungsi `import('./path.js')` mengembalikan Promise sehingga dapat di-`await`: `const module = await import('./heavy.js')`.

## 1. 🎯 Tujuan Belajar
- Menggunakan fungsi bawaan `import('./path.js')` untuk memuat kode secara dinamis (*lazy loading*).
- Menghemat penggunaan bandwidth dan mempercepat waktu muat awal (*First Contentful Paint*) halaman web.
- Mengintegrasikan pemuatan modul dinamis dengan event listener interaksi pengguna.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Seperti **layanan pesan-antar makanan online (*on-demand*)**: Anda tidak perlu menyimpan seluruh menu makanan restoran di lemari es rumah Anda setiap hari (membuat rumah penuh sesak). Anda baru memesan makanan tersebut secara instan saat perut Anda lapar.

Import statis (`import ... from '...'`) wajib ditulis di baris paling atas dan dievaluasi di awal sebelum kode berjalan:
1. **Dynamic Import**: Fungsi bawaan `import('./modul.js')` dapat dipanggil di mana saja: di dalam blok percabangan `if`, loop, atau fungsi event handler tombol.
2. **Berbasis Promise**: Fungsi ini mengembalikan sebuah Promise yang me-resolve objek modul. Kita bisa menggunakan sintaks modern `const { renderChart } = await import('./heavy-module.js');`.
3. **Code Splitting**: Browser hanya akan mengunduh file JavaScript tersebut melalui jaringan HTTP saat fungsi `import()` benar-benar dipanggil.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// heavy-module.js
export function renderChart() {
  console.log('Grafik berhasil dirender dari modul yang dimuat secara dinamis!');
}

// example.js
const loadButton = document.getElementById('load-btn');

loadButton.addEventListener('click', async () => {
  console.log('Sedang memuat modul...');
  
  // Modul heavy-module.js baru didownload saat tombol diklik!
  const { renderChart } = await import('./heavy-module.js');
  renderChart();
});
```

---

## 4. 🖥️ Output yang Diharapkan
```text
Sedang memuat modul...
Grafik berhasil dirender dari modul yang dimuat secara dinamis!
```

---

## 5. 💡 Panduan Praktis & Studi Kasus
### 🏢 Real-World Use Case
Pemuatan library berat (*heavy dependencies*) seperti pustaka charting (Chart.js/ECharts), rich text editor, atau modul ekspor PDF yang hanya dibuka saat pengguna menekan tombol tertentu.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Kegagalan Jaringan Saat Fetch**: Karena dynamic import memicu network request baru saat runtime, koneksi internet yang putus bisa melempar error. Selalu bungkus dengan blok `try...catch`.
* **Salah Mengira Keyword**: Dynamic import adalah pemanggilan fungsi `import(path)`, bukan deklarasi statis `import ... from ...`.

### 🌟 Best Practice
* Selalu tampilkan indikator loading (spinner atau skeleton) saat menunggu dynamic import selesai diunduh.
* Terapkan lazy loading pada halaman rute (*route-based splitting*) dan fitur-fitur kompleks yang jarang dibuka oleh seluruh user.

---

## 6. ✍️ Latihan Mandiri
1. Buat file `kalkulator-pajak.js` dengan fungsi `hitungPajak(nominal)`.
2. Buat tombol di HTML dan gunakan `import()` dinamis agar file kalkulator pajak tersebut baru dimuat ke browser saat tombol ditekan.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [07 - Aggregating Modules](../07-aggregating-modules/README.md)
- ➡️ **Selanjutnya:** [01 - Modul 05 (JavaScript DOM)](../../05-dom/README.md)
- 🏠 **Daftar Isi Modul 04:** [README Modul 04](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
