// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Perbedaan encodeURI vs encodeURIComponent ---");
const kueri = "buku & majalah / edisi #1 (edisi baru)";

// encodeURI: membiarkan karakter khusus URL (& / #)
console.log("encodeURI            :", encodeURI(kueri));

// encodeURIComponent: meng-encode seluruh karakter khusus menjadi kode persen
console.log("encodeURIComponent   :", encodeURIComponent(kueri));

console.log("\n--- 2. Membangun URL Search yang Aman ---");
const baseUrl = "https://toko-buku.com/search";
const kataKunci = "React & Node.js: Panduan Pemula 100% Bagus!";
const kategori = "IT / Programming";

// Gabungkan URL: baseUrl tetap utuh, nilai parameter dibungkus encodeURIComponent
const urlLengkap = `${baseUrl}?q=${encodeURIComponent(kataKunci)}&kategori=${encodeURIComponent(kategori)}`;
console.log("URL Lengkap Siap Pakai:\n" + urlLengkap);

console.log("\n--- 3. Mengembalikan Nilai dengan decodeURI & decodeURIComponent ---");
const parameterServer = "React%20%26%20Node.js%3A%20Panduan%20Pemula%20100%25%20Bagus!";

// decodeURI: tidak memulihkan karakter reserved (%26, %3A tetap persen)
console.log("decodeURI            :", decodeURI(parameterServer));

// decodeURIComponent: memulihkan seluruh karakter kembali ke teks asli
console.log("decodeURIComponent   :", decodeURIComponent(parameterServer));

