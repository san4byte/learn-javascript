// 09 - Web Workers (Multi-Threading di Browser)
// File ini dapat dijalankan langsung di Node.js maupun di Browser.

const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined';

if (!isBrowser) {
  console.log('========================================================');
  console.log('📌 SIMULASI WEB WORKERS MULTI-THREADING (NODE.JS)');
  console.log('========================================================\n');

  console.log('--- 1. Arsitektur Main Thread vs Worker Thread ---');
  console.log(
    'Main Thread   : Menangani antarmuka UI, render DOM, scroll, dan event klik',
  );
  console.log(
    'Worker Thread : Thread sistem operasi terpisah untuk komputasi berat',
  );
  console.log(
    'Jembatan Komunikasi : postMessage() dan event listener onmessage\n',
  );

  console.log('--- 2. Simulasi Komputasi Intensif CPU ---');
  const targetAngka = 10000000;
  console.log(
    `[MAIN THREAD]: Mengirim tugas menjumlahkan 1 s/d ${targetAngka} ke Worker...`,
  );

  // Simulasi kalkulasi worker
  const waktuMulai = Date.now();
  let total = 0;
  for (let i = 0; i <= targetAngka; i++) {
    total += i;
  }
  const durasi = Date.now() - waktuMulai;

  console.log(`[WORKER THREAD]: Komputasi selesai dalam ~${durasi}ms`);
  console.log(
    `[MAIN THREAD]: Menerima hasil total: ${total.toLocaleString('id-ID')}`,
  );
  console.log(
    '\n💡 Buka "index.html" di browser untuk menguji responsivitas ketikan UI saat komputasi berjalan!',
  );
} else {
  // LINGKUNGAN BROWSER
  console.log('========================================================');
  console.log('🌐 LIVE WEB WORKERS DI BROWSER');
  console.log('========================================================');

  const btnCalculate = document.getElementById('btn-hitung');
  const resultEl = document.getElementById('hasil');

  // Inisialisasi Web Worker dari berkas eksternal terpisah
  if (window.Worker) {
    const worker = new Worker('worker.js');

    if (btnCalculate && resultEl) {
      btnCalculate.addEventListener('click', () => {
        resultEl.textContent =
          '⏳ Sedang menghitung 100 Juta angka di background worker... (Coba ketik di input atas, UI tidak macet!)';
        btnCalculate.disabled = true;

        // Mengirimkan pesan data ke Worker Thread
        worker.postMessage(100000000);
      });

      // Menerima pesan hasil kembali dari Worker Thread
      worker.onmessage = function (event) {
        resultEl.textContent = `✅ Perhitungan Selesai! Total: ${event.data.toLocaleString('id-ID')}`;
        btnCalculate.disabled = false;
        console.log('[MAIN THREAD]: Hasil diterima dari worker:', event.data);
      };

      // Menangani error jika terjadi kesalahan di dalam worker
      worker.onerror = function (error) {
        resultEl.textContent = `❌ Terjadi kesalahan pada worker: ${error.message}`;
        btnCalculate.disabled = false;
        console.error('[WORKER ERROR]:', error);
      };
    }
  } else {
    console.warn('Browser Anda tidak mendukung Web Workers API.');
  }
}
