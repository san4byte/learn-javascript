// 07 - HTML Form Elements (Pengelolaan Form & Validasi Input)
// File ini dapat dijalankan langsung di Node.js maupun di Browser.

const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined';

if (!isBrowser) {
  console.log('========================================================');
  console.log('📌 SIMULASI PENGELOLAAN FORM & INPUT (NODE.JS RUNTIME)');
  console.log('========================================================\n');

  // 1. Ekstraksi Nilai Form Tradisional vs Modern FormData
  console.log('--- 1. Ekstraksi Data Input Form ---');
  const mockFormData = {
    nama: 'Joko Santoso',
    kategori: 'saran',
    pesan: 'Dokumentasi JavaScript ini sangat lengkap dan membantu!',
    langganan: true,
  };
  console.log('Data Masukan Form:', mockFormData);

  // 2. Simulasi FormData API
  console.log('\n--- 2. Ekstraksi Menggunakan FormData API Modern ---');
  const entries = Object.entries(mockFormData);
  console.log('FormData Entries:');
  entries.forEach(([key, val]) => {
    console.log(`- ${key.padEnd(12)}: ${val}`);
  });
  const objectHasil = Object.fromEntries(entries);
  console.log(
    'Konversi ke Plain Object via Object.fromEntries():',
    objectHasil,
  );

  // 3. Simulasi Pencegahan Default Submit
  console.log('\n--- 3. Pentingnya event.preventDefault() ---');
  console.log(
    'Perilaku Default Browser : Mengirim HTTP GET/POST & me-refresh seluruh halaman.',
  );
  console.log(
    'Dengan preventDefault()  : Halaman tidak me-refresh, JavaScript bebas mengirim payload JSON via fetch/AJAX.',
  );

  // 4. Simulasi Validasi Bawaan
  console.log('\n--- 4. Validasi Form Bawaan (Constraint Validation API) ---');
  const validasiNama = mockFormData.nama.trim().length > 0;
  console.log('Apakah nama valid? (required check):', validasiNama);

  console.log(
    '\n💡 Buka "index.html" di browser untuk menguji pengiriman form interaktif!',
  );
} else {
  // LINGKUNGAN BROWSER
  console.log('========================================================');
  console.log('🌐 LIVE HTML FORM ELEMENTS DI BROWSER');
  console.log('========================================================');

  const form = document.getElementById('comment-form');
  const outputDiv = document.getElementById('output');
  const inputNama = document.getElementById('nama');

  // 1. Live Input Event Listener
  if (inputNama) {
    inputNama.addEventListener('input', function () {
      console.log(
        `[LIVE INPUT] Nama sedang diketik: "${this.value}" (${this.value.length} karakter)`,
      );
    });
  }

  // 2. Submit Event Listener
  if (form && outputDiv) {
    form.addEventListener('submit', function (event) {
      // Wajib: Mencegah browser me-refresh halaman web
      event.preventDefault();

      // Validasi form HTML5
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Ekstraksi data menggunakan FormData API modern
      const formData = new FormData(form);
      const dataPayload = Object.fromEntries(formData.entries());
      console.log('[SUBMIT] Form data berhasil diekstraksi:', dataPayload);

      // Membaca status checkbox khusus
      const isSubscribed = document.getElementById('langganan')?.checked;

      // Menampilkan hasil ringkasan ke antarmuka
      outputDiv.style.display = 'block';
      outputDiv.innerHTML = `
        <h4 style="margin: 0 0 8px 0; color: #065f46;">✅ Pesan Berhasil Terkirim:</h4>
        <p style="margin: 4px 0;"><strong>Pengirim:</strong> ${dataPayload.nama}</p>
        <p style="margin: 4px 0;"><strong>Kategori:</strong> ${dataPayload.kategori}</p>
        <p style="margin: 4px 0;"><strong>Isi Pesan:</strong> <em>"${dataPayload.pesan}"</em></p>
        <p style="margin: 4px 0;"><strong>Langganan:</strong> ${isSubscribed ? 'Ya, Berlangganan' : 'Tidak'}</p>
      `;

      // Reset isian form kembali bersih
      form.reset();
    });

    // 3. Reset Event Listener
    form.addEventListener('reset', function () {
      console.log('[RESET] Form telah dibersihkan kembali ke nilai awal.');
      outputDiv.style.display = 'none';
    });
  }
}
