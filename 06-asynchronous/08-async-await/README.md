# 06 - Async dan Await (Sintaks Asinkron Modern)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami konsep `async` dan `await` sebagai syntactic sugar di atas Promise.
> * **Kapan Digunakan**: Mampu menulis kode asinkron dengan gaya penulisan yang terbaca bersih seperti kode sinkron.
> * **Aturan Praktis**: Selalu bungkus blok `await` di dalam `try...catch` agar tidak terjadi error unhandled rejection.

## 1. 🎯 Tujuan Belajar
- Memahami konsep `async` dan `await` sebagai syntactic sugar di atas Promise.
- Mampu menulis kode asinkron dengan gaya penulisan yang terbaca bersih seperti kode sinkron.
- Menguasai penanganan error asinkron menggunakan blok `try...catch...finally`.
- Memahami kapan harus menggunakan `await` langsung dan kapan menggabungkannya dengan `Promise.all`.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> **Async/Await** seperti **membeli tiket kereta cepat melalui mesin tiket otomatis**: Anda menekan tombol (memanggil `await`), mesin memproses beberapa detik sementara Anda berdiri menunggu hasilnya langsung keluar ke tangan Anda. Anda tidak perlu lagi mondar-mandir mendaftarkan nomor telepon ke loket lain (`.then`). Kodenya mengalir rapi dari atas ke bawah!

Sintaks **`async / await`** diperkenalkan di ES2017 (ES8) untuk mempermudah penulisan dan pembacaan kode berbasis Promise.

Dengan `async / await`, kita dapat menulis kode asinkron yang terlihat dan berperilaku mirip seperti kode sinkron linier biasa, tanpa perlu rantai `.then()` yang panjang (*Promise Chaining*).

### Aturan Utama:
1. **Keyword `async`**:
   * Diletakkan sebelum deklarasi fungsi: `async function fetchData() {}`.
   * Sebuah fungsi yang diawali dengan `async` **otomatis selalu mengembalikan Promise**.
2. **Keyword `await`**:
   * Hanya dapat digunakan **di dalam fungsi `async`** (atau di top-level script ES Modules).
   * Berfungsi menghentikan sementara (*pause*) eksekusi fungsi tersebut sampai Promise selesai (settled), lalu mengembalikan hasil *resolve*-nya secara langsung.
3. **Error Handling**:
   * Ditangani menggunakan blok standar **`try...catch`**.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Perbandingan Rantai .then() vs Async/Await ---');

function ambilDataSiswa(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) resolve({ id: 1, nama: 'Joko Santoso', kelas: 'Teknik Informatika' });
      else reject(new Error('Data siswa tidak ditemukan'));
    }, 200);
  });
}

// Gaya Modern dengan Async/Await:
async function tampilkanProfilSiswa(id) {
  try {
    console.log('Memulai proses pengambilan data...');
    
    // Tunggu hasil Promise secara linier dan bersih
    const siswa = await ambilDataSiswa(id);
    console.log('Nama Siswa  :', siswa.nama);
    console.log('Jurusan     :', siswa.kelas);
    
  } catch (error) {
    // Tangkap error resolve/reject di sini
    console.error('Terjadi Kesalahan:', error.message);
  } finally {
    console.log('Proses tampilkanProfilSiswa selesai.');
  }
}

// Uji coba sukses dan gagal
async function jalankanUjiCoba() {
  console.log('== Uji Coba 1 (ID Valid) ==');
  await tampilkanProfilSiswa(1);
  
  console.log('\n== Uji Coba 2 (ID Tidak Ada) ==');
  await tampilkanProfilSiswa(99);
}

jalankanUjiCoba();
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Perbandingan Rantai .then() vs Async/Await ---
== Uji Coba 1 (ID Valid) ==
Memulai proses pengambilan data...
Nama Siswa  : Joko Santoso
Jurusan     : Teknik Informatika
Proses tampilkanProfilSiswa selesai.

== Uji Coba 2 (ID Tidak Ada) ==
Memulai proses pengambilan data...
Terjadi Kesalahan: Data siswa tidak ditemukan
Proses tampilkanProfilSiswa selesai.
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **Standar Industri Saat Ini**: 99% aplikasi web modern (React, Next.js, Express, Nest.js) menggunakan sintaks `async/await` daripada `.then()`.
2. **Autentikasi Multi-Langkah**:
   ```javascript
   const user = await authService.login(credentials);
   const token = await tokenService.generate(user);
   const permissions = await roleService.get(user.role);
   ```
   Sangat bersih, rapi, dan mudah dibaca oleh siapapun.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Lupa Keyword `async`**: Menulis `await` di dalam fungsi biasa tanpa kata kunci `async` akan memicu error kompilasi: `SyntaxError: await is only valid in async functions`.
* **Sequential Await Trap**: Menulis beberapa `await` berturut-turut untuk tugas-tugas yang sebenarnya tidak saling bergantung membuat aplikasi lambat (Gunakan `Promise.all([p1, p2])` seperti yang dipelajari di Modul 06).

### 🌟 Best Practice
* Selalu bungkus blok `await` di dalam `try...catch` agar tidak terjadi error unhandled rejection.
* Buat fungsi async kecil yang memiliki tanggung jawab tunggal (*Single Responsibility Principle*).

---

## 6. ✍️ Latihan Mandiri
1. Ubah kode berbasis rantai Promise `.then()` pada materi 05 (Fetch API) menjadi fungsi yang menggunakan sintaks `async / await` dan `try...catch`.
2. Pastikan blok `finally` digunakan untuk mencetak pesan 'Selesai menjalankan request API'.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [05 - Fetch API](../07-fetch-api/README.md)
- 🏠 **Daftar Isi Modul 06:** [README Modul 06](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
