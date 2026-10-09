// Penjelasan lengkap materi ini dapat dilihat di README.md

if (typeof document === 'undefined') {
  console.log('--- 07. Latihan Manipulasi Warna Background ---');
  console.log(
    "Buka file 'index.html' di browser Anda untuk mencoba tombol warna dan slider RGB secara visual!",
  );
} else {
  console.log('--- 07. Latihan Warna (Browser) ---');

  const btnAcak = document.getElementById('btn-warna-acak');

  if (btnAcak) {
    btnAcak.addEventListener('click', function () {
      const r = Math.round(Math.random() * 255);
      const g = Math.round(Math.random() * 255);
      const b = Math.round(Math.random() * 255);

      const warnaBaru = `rgb(${r}, ${g}, ${b})`;
      document.body.style.backgroundColor = warnaBaru;
      console.log(`Warna background diubah ke: ${warnaBaru}`);
    });
  }
}
