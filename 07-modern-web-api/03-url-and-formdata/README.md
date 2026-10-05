# 03 - URL, URLSearchParams, dan FormData API

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami manipulasi query string URL secara dinamis menggunakan `URLSearchParams`.
> * **Kapan Digunakan**: Mampu membuat fitur sinkronisasi filter dan search e-commerce ke URL browser.
> * **Aturan Praktis**: Manfaatkan `window.history.pushState({}, '', urlKatalog)` di browser agar URL di address bar browser berubah saat filter diganti tanpa me-reload seluruh halaman.

## 1. 🎯 Tujuan Belajar
- Memahami manipulasi query string URL secara dinamis menggunakan `URLSearchParams`.
- Mampu membuat fitur sinkronisasi filter dan search e-commerce ke URL browser.
- Menguasai penggunaan `FormData` untuk membaca input formulir HTML secara otomatis.
- Mengetahui cara mengirim file upload (gambar/dokumen) ke backend via `fetch` secara aman.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> **URLSearchParams** seperti formulir pesanan yang ditempel di kaca mobil truk ekspedisi (semua orang di jalan raya bisa melihat pesanan Anda di alamat URL). Sedangkan **FormData** seperti kardus paket bersegel tertutup rapat yang dikirim oleh kurir (dapat menampung barang padat/file fisik maupun surat dokumen, tertutup rapi di dalam payload HTTP request).

Dua aspek fundamental dari komunikasi data di aplikasi web adalah:
1. **Navigasi & Filter berbasis URL**: Menyimpan state filter (kategori, harga, halaman) di URL agar link bisa dibagikan (*shareable link*).
2. **Pengiriman Formulir & Berkas (Form & File Upload)**: Mengambil data input user dan berkas fisik (file) untuk dikirim ke server.

### 1. Objek `URL` dan `URLSearchParams`
Sebelum adanya `URLSearchParams`, developer harus menulis Regular Expression rumit untuk memecah string `?search=baju&kategori=pria&halaman=2`.
Dengan `URLSearchParams`, kita bisa melakukan manipulasi query string layaknya sebuah Map:
* `get(name)`: Mengambil nilai parameter pertama.
* `set(name, value)`: Menyetel atau menimpa nilai parameter.
* `append(name, value)`: Menambahkan nilai baru (bisa untuk parameter jamak).
* `delete(name)`: Menghapus parameter dari URL.
* `toString()`: Mengubah seluruh parameter menjadi string query yang valid.

### 2. Objek `FormData`
Objek `FormData` menyediakan cara mudah untuk menyusun kumpulan pasangan kunci/nilai yang merepresentasikan field formulir beserta nilainya.
Data ini dapat langsung dikirimkan melalui `fetch()` dengan encoding `multipart/form-data`.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Manipulasi Query Param dengan URLSearchParams ---");
// Simulasi URL katalog produk di toko online
const urlKatalog = new URL("https://toko-online.com/katalog?kategori=elektronik&halaman=1");

const params = urlKatalog.searchParams;

console.log("Kategori awal  :", params.get("kategori"));
console.log("Halaman awal   :", params.get("halaman"));

// Update parameter dan tambahkan filter harga & pencarian
params.set("halaman", "2");
params.append("tag", "flash-sale");
params.append("tag", "gratis-ongkir");
params.set("sort", "harga-terendah");

console.log("Query String baru :", params.toString());
console.log("Full URL baru     :", urlKatalog.toString());

console.log("\n--- 2. Membaca Query String dari URL Saat Ini ---");
const queryStringContoh = "?keyword=laptop+gaming&min_price=10000000&brand=asus";
const pencarianParams = new URLSearchParams(queryStringContoh);

console.log("Kata kunci cari :", pencarianParams.get("keyword"));
console.log("Punya brand?    :", pencarianParams.has("brand"));

// Iterasi semua pasangan query
console.log("Daftar seluruh filter:");
for (const [kunci, nilai] of pencarianParams.entries()) {
  console.log(`- ${kunci}: ${nilai}`);
}

console.log("\n--- 3. Bekerja dengan FormData (Simulasi Pengiriman Formulir) ---");
// Di browser, Anda bisa membuat FormData langsung dari elemen HTML: new FormData(formElement)
// Di sini kita demonstrasikan pembuatan dan manipulasi FormData terprogram:
const formData = new FormData();

// Menambahkan field teks
formData.append("username", "jokosantoso");
formData.append("email", "joko@example.com");
formData.append("bio", "Web Developer & Lifelong Learner");

// Simulasi lampiran file berkas foto profil (Blob / File)
const fileSimulasi = new Blob(["konten binary gambar simulasi"], { type: "image/png" });
formData.append("avatar", fileSimulasi, "avatar-joko.png");

// Menginspeksi isi FormData
console.log("Kunci username dalam FormData:", formData.get("username"));
console.log("Nama file yang diunggah      :", formData.get("avatar").name);

/*
Contoh Pengiriman Nyata ke Server Backend via Fetch:
async function kirimDataRegistrasi(formData) {
  const response = await fetch('/api/register', {
    method: 'POST',
    body: formData
    // CATATAN PENTING: JANGAN menyetel 'Content-Type': 'multipart/form-data' secara manual!
    // Browser akan otomatis menyetel boundary multipart yang benar.
  });
  return await response.json();
}
*/
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Manipulasi Query Param dengan URLSearchParams ---
Kategori awal  : elektronik
Halaman awal   : 1
Query String baru : kategori=elektronik&halaman=2&tag=flash-sale&tag=gratis-ongkir&sort=harga-terendah
Full URL baru     : https://toko-online.com/katalog?kategori=elektronik&halaman=2&tag=flash-sale&tag=gratis-ongkir&sort=harga-terendah

--- 2. Membaca Query String dari URL Saat Ini ---
Kata kunci cari : laptop gaming
Punya brand?    : true
Daftar seluruh filter:
- keyword: laptop gaming
- min_price: 10000000
- brand: asus

--- 3. Bekerja dengan FormData (Simulasi Pengiriman Formulir) ---
Kunci username dalam FormData: jokosantoso
Nama file yang diunggah      : avatar-joko.png
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **E-Commerce Shareable Filter**: Ketika user menyortir sepatu berdasarkan harga, URL otomatis diperbarui ke `?kategori=sepatu&sort=termurah`. Link ini bisa di-copy dan dikirim ke teman, dan teman akan melihat halaman dengan filter yang persis sama.
2. **Form Pendaftaran Lamaran Kerja**: Mengirimkan data identitas diri berupa teks bersamaan dengan lampiran Curriculum Vitae (PDF) dalam satu kali klik submit.
3. **Pagination Komponen**: Tombol 'Halaman Berikutnya' cukup membaca `params.get('page')`, menambahkan +1, lalu memanggil fungsi fetch data.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Salah Memasang Header Content-Type pada Fetch FormData**:
  Kesalahan paling sering terjadi adalah developer secara manual menulis `headers: { 'Content-Type': 'multipart/form-data' }`. Hal ini menyebabkan server gagal memproses upload karena browser kehilangan *boundary delimiter*. Biarkan browser yang mengatur header `Content-Type` secara otomatis saat `body` diisi objek `FormData`.
* **Karakter Khusus di Query URL**: Jangan merakit query string dengan penggabungan string manual (`url + '?a=' + input`) karena karakter spasi atau tanda `&` akan merusak URL. Selalu gunakan `URLSearchParams` yang otomatis melakukan *URL encoding* aman.

### 🌟 Best Practice
* Manfaatkan `window.history.pushState({}, '', urlKatalog)` di browser agar URL di address bar browser berubah saat filter diganti tanpa me-reload seluruh halaman.
* Validasi ukuran file (misal maksimal 2MB) dan tipe ekstensi (*MIME type*) di sisi JavaScript sebelum memasukkannya ke `FormData`.

---

## 6. ✍️ Latihan Mandiri
1. Buatlah fungsi `generateSearchUrl(baseUrl, query, page, limit)` yang menghasilkan URL string lengkap dengan parameter `q`, `page`, dan `limit` menggunakan `URL` dan `URLSearchParams`.
2. Diberikan elemen form HTML dengan input nama dan file dokumen. Tuliskan kode untuk mengecek apakah ukuran file yang dipilih user lebih besar dari 2MB sebelum dimasukkan ke `FormData`.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [02 - Modern Syntax ES2020-ES2023](../02-modern-syntax-es2020/README.md)
- ➡️ **Selanjutnya:** [04 - Async Paralel dan AbortController](../04-async-parallel-abort/README.md)
- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
