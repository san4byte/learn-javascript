# 06 - Promise Concurrency (Promise.all, allSettled, race, dan any)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Menjalankan beberapa operasi asinkron secara paralel dan simultan untuk memangkas total waktu pemrosesan aplikasi web.
> - **Kapan Digunakan**: Mengambil data dari banyak endpoint REST API independen secara serentak, membuat batas waktu request (_timeout wrapper_), atau mengambil data dari server cadangan (_mirror_) tercepat.
> - **Aturan Praktis**: Gunakan `Promise.all()` jika seluruh data saling bergantung (_all-or-nothing_). Gunakan `Promise.allSettled()` jika Anda membutuhkan laporan lengkap dan tidak ingin satu kegagalan membatalkan proses lainnya.

---

## 1. 🎯 Tujuan Belajar

- Memahami perbedaan fundamental antara eksekusi asinkron sekuensial vs eksekusi paralel konkuren.
- Menguasai cara kerja **`Promise.all()`** dan sifat _Fail-Fast_ jika salah satu operasi ditolak (_rejected_).
- Memahami manfaat **`Promise.allSettled()`** untuk proses audit yang kebal terhadap kegagalan parsial.
- Memahami konsep balapan waktu pada **`Promise.race()`** (_first-to-settle_).
- Mengetahui keunggulan **`Promise.any()`** (_first-to-fulfill_) dan cara menangani `AggregateError`.
- Mampu memilih method kombinator yang tepat berdasarkan kebutuhan arsitektur bisnis.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Bayangkan Anda memesan **3 barang belanjaan online (Baju, Sepatu, Topi)**:
>
> - **Eksekusi Sekuensial**: Pesan Baju, tunggu paket tiba di rumah (2 hari), baru pesan Sepatu (2 hari), lalu pesan Topi (2 hari). Total waktu: **6 hari**.
> - **`Promise.all`**: Anda memesan ketiganya bersamaan. Jika seluruh paket tiba dengan selamat, Anda menerima ketiganya dalam **2 hari**. Namun jika penjual Topi kehabisan stok, seluruh pesanan dibatalkan otomatis (_all-or-nothing_).
> - **`Promise.allSettled`**: Anda memesan ketiganya bersamaan. Anda menerima Baju dan Sepatu, serta menerima surat pemberitahuan bahwa Topi gagal dikirim tanpa membatalkan barang lainnya.
> - **`Promise.race`**: Anda memesan taksi dari 3 aplikasi transportasi sekaligus; siapa pengemudi pertama yang tiba di depan pagar rumah Anda, itu yang Anda naiki (terlepas dari apakah taksi itu membawa kabar baik atau mogok).
> - **`Promise.any`**: Anda mengunduh film dari 3 server mirror; server mana pun yang **pertama kali berhasil mengunduh** itulah yang diambil, server yang gagal diabaikan.

---

### Tabel Matriks Perbandingan 4 Method Combinator

| Method Combinator        | Syarat Status Selesai (_Fulfilled_)     | Perilaku Saat Gagal (_Rejected_)                         | Kegunaan Ideal                                    |
| :----------------------- | :-------------------------------------- | :------------------------------------------------------- | :------------------------------------------------ |
| **`Promise.all`**        | **Semua** promise harus sukses          | Langsung gagal jika **1 saja** gagal (_Fail-Fast_)       | Memuat dependensi wajib (User + Permissions).     |
| **`Promise.allSettled`** | **Selalu sukses** setelah semua selesai | Tidak pernah melempar _rejection_ ke blok `.catch()`     | Dashboard analitik / laporan audit multi-service. |
| **`Promise.race`**       | Promise **tercepat** yang selesai       | Mengikuti status hasil tercepat (bisa sukses/gagal)      | Membuat mekanisme _request timeout_.              |
| **`Promise.any`**        | Promise **pertama yang sukses**         | Gagal hanya jika **seluruhnya gagal** (`AggregateError`) | Mengambil server mirror tercepat & paling sehat.  |

---

### Pembahasan Mendalam Fitur & API

#### 1. Perbedaan Eksekusi Sekuensial vs Konkuren

Jika 3 fungsi masing-masing membutuhkan waktu 1 detik:

- Sekuensial: $1 + 1 + 1 = 3\text{ detik}$.
- Konkuren: $\max(1, 1, 1) = 1\text{ detik}$.

```javascript
// Konkuren: Ketiga promise dimulai pada saat yang sama
const [user, produk] = await Promise.all([fetchUser(), fetchProduk()]);
```

#### 2. `Promise.all()` - Pola All-or-Nothing & Mekanisme Fail-Fast

Menerima array promise dan mengembalikan array data hasil jika semuanya sukses.

```javascript
Promise.all([p1, p2, p3])
  .then(([res1, res2, res3]) => {
    console.log("Ketiganya sukses:", res1, res2, res3);
  })
  .catch((err) => {
    console.error("Satu promise gagal, operasi dibatalkan:", err.message);
  });
```

#### 3. `Promise.allSettled()` - Audit Lengkap Toleran Kesalahan

Setiap elemen array hasil berupa objek `{ status: 'fulfilled', value }` atau `{ status: 'rejected', reason }`.

```javascript
Promise.allSettled([serviceA, serviceB]).then((hasil) => {
  hasil.forEach((item) => {
    if (item.status === "fulfilled") console.log("Sukses:", item.value);
    else console.log("Gagal:", item.reason.message);
  });
});
```

#### 4. `Promise.race()` - Pemenang Tercepat Pertama (First-to-Settle)

Mengembalikan hasil dari promise mana pun yang paling awal berpindah dari status `pending`, baik itu sukses maupun melempar error.

```javascript
const ambilData = fetch("/api/data");
const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error("Waktu habis!")), 5000),
);

// Balapan antara data server vs batas waktu 5 detik:
Promise.race([ambilData, timeout]);
```

#### 5. `Promise.any()` - Pemenang Sukses Tercepat Pertama (First-to-Fulfill)

Mengabaikan promise yang gagal dan hanya mencari promise pertama yang sukses menyelesaikan tugasnya.

```javascript
Promise.any([mirrorUS, mirrorEU, mirrorASIA]).then((dataTercepat) =>
  console.log("Data dari mirror tercepat:", dataTercepat),
);
```

#### 6. Penanganan `AggregateError` pada `Promise.any()`

Jika **seluruh** promise yang diuji di `Promise.any()` mengalami kegagalan, runtime akan melempar objek khusus `AggregateError` yang menampung seluruh daftar error di properti `.errors`.

```javascript
Promise.any([janjiGagal1, janjiGagal2]).catch((error) => {
  console.error(error.name); // "AggregateError"
  console.error(error.errors); // Array berisi error dari masing-masing promise
});
```

#### 7. Pola Destructuring Array Hasil pada `Promise.all()`

Gunakan sintaks _array destructuring_ agar hasil dapat langsung disimpan ke variabel yang bermakna.

```javascript
const [profil, riwayat, setelan] = await Promise.all([
  getProfilUser(),
  getRiwayatTransaksi(),
  getSetelanAplikasi(),
]);
```

#### 8. Panduan Keputusan Memilih Combinator yang Tepat

- Apakah satu kegagalan membuat seluruh halaman tidak berguna? $\rightarrow$ Gunakan **`Promise.all`**.
- Apakah Anda ingin menampilkan widget yang berhasil dan memberi tanda silang pada widget yang gagal? $\rightarrow$ Gunakan **`Promise.allSettled`**.
- Apakah Anda ingin membatasi durasi maksimal suatu aksi? $\rightarrow$ Gunakan **`Promise.race`**.
- Apakah Anda memiliki beberapa sumber data cadangan? $\rightarrow$ Gunakan **`Promise.any`**.

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi pengujian konkurensi paralel `Promise.all` dengan destrukturisasi hasil, toleransi error `Promise.allSettled`, perbandingan balapan waktu `Promise.race`, dan pencarian hasil sukses pertama `Promise.any` telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi menggunakan Node.js di terminal:

```bash
node 06-asynchronous/06-promise-concurrency/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Dashboard Home Multi-Widget**:
   ```javascript
   const widgets = await Promise.allSettled([
     loadWeatherWidget(),
     loadStockWidget(),
     loadNewsWidget(),
   ]);
   widgets.forEach(renderWidgetSafe);
   ```
2. **Global Network Ping Benchmark**: Menggunakan `Promise.race()` untuk mendeteksi CDN region mana yang memiliki latensi terendah bagi pengguna.

### ⚠️ Common Pitfalls

- **Menjalankan `await` di dalam Loop Biasa**: Menulis `for (const id of ids) { await fetch(id); }` adalah kesalahan fatal yang membuat request berjalan sekuensial lambat. Bungkus array dengan `.map()` dan gunakan `Promise.all(ids.map(fetch))`.
- **Mengira `Promise.all` Membatalkan Eksekusi Fungsi yang Lain**: Meskipun `Promise.all` langsung reject saat ada satu kegagalan, operasi jaringan pada promise lainnya di latar belakang tetap berjalan hingga selesai di level browser/jaringan, hanya saja nilainya diabaikan oleh JavaScript.

### 🌟 Best Practice

- Gunakan `Promise.allSettled` daripada `Promise.all` jika Anda memproses batch pengiriman email atau notifikasi agar kegagalan 1 email tidak membatalkan 99 email lainnya.
- Selalu tangani blok `.catch()` pada `Promise.any()` untuk memeriksa `error.errors`.

---

## 5. ✍️ Latihan Mandiri

1. Buat 3 promise dengan delay acak antara 100ms hingga 500ms. Gunakan `Promise.race()` untuk mencari tahu promise nomor berapa yang selesai paling pertama.
2. Buat simulasi pengiriman notifikasi massal ke 3 pengguna menggunakan `Promise.allSettled()`, di mana salah satu nomor telepon pengguna sengaja dibuat tidak valid untuk melihat hasil status `'fulfilled'` dan `'rejected'` secara berdampingan.

---

## 6. 🧭 Navigasi

- ⬅️ **Materi Sebelumnya:** [05 - Promise](../05-promise/README.md)
- ➡️ **Materi Selanjutnya:** [07 - Fetch API](../07-fetch-api/README.md)
- 🏠 **Daftar Isi Modul 06:** [README Modul 06](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
