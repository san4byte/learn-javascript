/**
 * 08 - Dynamic Module Loading (import() Function)
 *
 * Demonstrasi pemuatan modul secara asinkron saat runtime:
 * 1. Pemuatan on-demand menggunakan top-level await import()
 * 2. Mengambil named export dan default export dari hasil Promise
 * 3. Conditional Module Loading (Hanya memuat jika kondisi terpenuhi)
 * 4. Dynamic specifier (Path modul berbentuk variabel)
 * 5. Penanganan kegagalan jaringan / modul tidak ditemukan dengan try...catch
 * 6. Kompatibilitas ganda (Berjalan di Node.js terminal maupun browser)
 */

async function muatModulAnalitik() {
  console.log('1. Memulai permintaan download modul dinamis...');

  // Dynamic import mengembalikan Promise yang resolve ke Module Namespace Object
  const chartModule = await import('./heavy-module.js');

  console.log('2. Modul berhasil dimuat ke memori.');
  console.log('- Versi Chart   :', chartModule.CHART_VERSION);
  console.log('- Konfigurasi   :', chartModule.default);
  console.log('- Hasil Render  :', chartModule.renderChart([120, 250, 430]));
  console.log();
}

console.log('=== 1. Eksekusi Dynamic Import Dasar ===');
await muatModulAnalitik();

console.log('=== 2. Conditional Loading Berdasarkan Logika ===');
const butuhModul = true;
if (butuhModul) {
  const { renderChart } = await import('./heavy-module.js');
  console.log(
    'Eksekusi kedua (menggunakan cache memori):',
    renderChart([10, 20]),
  );
}
console.log();

console.log('=== 3. Penanganan Error Modul Tidak Ditemukan ===');
try {
  await import('./modul-yang-tidak-ada.js');
} catch (error) {
  console.log(`Pemuatan gagal ditangani: [${error.name}] ${error.message}`);
}
console.log();

// 4. Kompatibilitas Browser Event Listener (Jika dibuka via index.html)
if (typeof document !== 'undefined') {
  const loadButton = document.getElementById('load-btn');
  if (loadButton) {
    loadButton.addEventListener('click', () => muatModulAnalitik());
  }
}
