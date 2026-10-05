// Penjelasan lengkap materi ini dapat dilihat di README.md

if (typeof document === 'undefined') {
  console.log('--- 09. Image Gallery ---');
  console.log("Buka file 'index.html' di browser Anda untuk melihat interaksi galeri foto!");
} else {
  console.log('--- 09. Image Gallery (Browser) ---');

  const kontainerGaleri = document.querySelector('.galeri-kontainer');
  const gambarUtama = document.querySelector('.gambar-jumbo');

  if (kontainerGaleri && gambarUtama) {
    // Terapkan Event Delegation pada kontainer thumbnail
    kontainerGaleri.addEventListener('click', function (e) {
      if (e.target.classList.contains('thumb')) {
        // Ganti sumber gambar jumbo
        gambarUtama.src = e.target.src;
        console.log(`Gambar aktif diubah ke: ${e.target.src}`);
      }
    });
  }
}
