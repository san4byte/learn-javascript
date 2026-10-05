// Penjelasan lengkap materi ini dapat dilihat di README.md

if (typeof document === 'undefined') {
  console.log('--- 05. DOM Events ---');
  console.log("Buka file 'index.html' di browser untuk mencoba interaksi klik tombol dan input keyboard!");
} else {
  console.log('--- 05. DOM Events (Browser) ---');

  const tombolAksi = document.getElementById('btn-klik');
  const kotakInput = document.getElementById('input-teks');

  if (tombolAksi) {
    // 1. Mendaftarkan Event Listener Klik
    tombolAksi.addEventListener('click', function (e) {
      console.log(`[EVENT KLIK] Tombol diklik! Koordinat: (${e.clientX}, ${e.clientY})`);
      tombolAksi.textContent = 'Tombol Berhasil Diklik!';
      tombolAksi.style.backgroundColor = '#16a34a';
    });
  }

  if (kotakInput) {
    // 2. Mendaftarkan Event Listener Keyboard (keyup)
    kotakInput.addEventListener('keyup', function (e) {
      console.log(`[KEYBOARD]: Pengguna menekan tombol '${e.key}' | Nilai teks: "${this.value}"`);
    });
  }
}
