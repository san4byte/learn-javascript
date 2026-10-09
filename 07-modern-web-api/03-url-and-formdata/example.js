// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Manipulasi Query Param dengan URLSearchParams ---');
// Simulasi URL katalog produk di toko online
const urlKatalog = new URL(
  'https://toko-online.com/katalog?kategori=elektronik&halaman=1',
);

const params = urlKatalog.searchParams;

console.log('Kategori awal  :', params.get('kategori'));
console.log('Halaman awal   :', params.get('halaman'));

// Update parameter dan tambahkan filter harga & pencarian
params.set('halaman', '2');
params.append('tag', 'flash-sale');
params.append('tag', 'gratis-ongkir');
params.set('sort', 'harga-terendah');

console.log('Query String baru :', params.toString());
console.log('Full URL baru     :', urlKatalog.toString());

console.log('\n--- 2. Membaca Query String dari URL Saat Ini ---');
const queryStringContoh =
  '?keyword=laptop+gaming&min_price=10000000&brand=asus';
const pencarianParams = new URLSearchParams(queryStringContoh);

console.log('Kata kunci cari :', pencarianParams.get('keyword'));
console.log('Punya brand?    :', pencarianParams.has('brand'));

// Iterasi semua pasangan query
console.log('Daftar seluruh filter:');
for (const [kunci, nilai] of pencarianParams.entries()) {
  console.log(`- ${kunci}: ${nilai}`);
}

console.log(
  '\n--- 3. Bekerja dengan FormData (Simulasi Pengiriman Formulir) ---',
);
// Di browser, Anda bisa membuat FormData langsung dari elemen HTML: new FormData(formElement)
// Di sini kita demonstrasikan pembuatan dan manipulasi FormData terprogram:
const formData = new FormData();

// Menambahkan field teks
formData.append('username', 'jokosantoso');
formData.append('email', 'joko@example.com');
formData.append('bio', 'Web Developer & Lifelong Learner');

// Simulasi lampiran file berkas foto profil (Blob / File)
const fileSimulasi = new Blob(['konten binary gambar simulasi'], {
  type: 'image/png',
});
formData.append('avatar', fileSimulasi, 'avatar-joko.png');

// Menginspeksi isi FormData
console.log('Kunci username dalam FormData:', formData.get('username'));
console.log('Nama file yang diunggah      :', formData.get('avatar').name);

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
