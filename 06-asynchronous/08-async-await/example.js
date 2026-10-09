// 08 - Async dan Await (Sintaks Asinkron Modern)
// File ini dapat dijalankan langsung di Node.js maupun di Browser.

console.log('========================================================');
console.log('📌 DEMONSTRASI ASYNC / AWAIT & TRY...CATCH HANDLING');
console.log('========================================================\n');

// 1. Fungsi penghasil Promise simulasi
const fetchUser = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1)
        resolve({ id: 1, nama: 'Joko Santoso', role: 'Lead Engineer' });
      else reject(new Error(`Pengguna dengan ID ${id} tidak ditemukan!`));
    }, 100);
  });

const fetchSettings = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ theme: 'dark', notifications: true }), 100);
  });

// 2. Deklarasi Fungsi Async dengan Berbagai Gaya
// A. Function Declaration
async function loadDashboard(userId) {
  try {
    console.log(`[ASYNC]: Memulai pengambilan data user ${userId}...`);

    // await menghentikan fungsi ini sementara hingga Promise selesai
    const user = await fetchUser(userId);
    console.log('[USER DITEMUKAN]:', user.nama, `(${user.role})`);

    const settings = await fetchSettings();
    console.log('[SETELAN DIBACA]:', settings);

    return { user, settings };
  } catch (err) {
    // Tangani error secara alami menggunakan try...catch
    console.error('[TRY-CATCH MENANGKAP ERROR]:', err.message);
    return null;
  } finally {
    console.log('[FINALLY]: Siklus eksekusi loadDashboard selesai.\n');
  }
}

// B. Arrow Function Async & Penggabungan dengan Promise.all
const loadParallelData = async () => {
  console.log('--- Eksekusi Paralel Efisien via Promise.all + await ---');
  const waktuMulai = Date.now();

  // Menjalankan kedua fetch bersamaan alih-alih berurutan
  const [user, settings] = await Promise.all([fetchUser(1), fetchSettings()]);
  const durasi = Date.now() - waktuMulai;

  console.log(
    `[PARALEL SUKSES] Data user "${user.nama}" dan tema "${settings.theme}" dimuat dalam ~${durasi}ms`,
  );
};

// 3. Menjalankan alur pengujian
async function main() {
  console.log('== 1. Pengujian Skenario Sukses ==');
  await loadDashboard(1);

  console.log('== 2. Pengujian Skenario Error (ID Tidak Valid) ==');
  await loadDashboard(99);

  await loadParallelData();
}

main();
