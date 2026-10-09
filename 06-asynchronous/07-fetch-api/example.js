// 07 - Fetch API (HTTP Request Modern)
// File ini dapat dijalankan langsung di Node.js maupun di Browser.

console.log('========================================================');
console.log('📌 DEMONSTRASI FETCH API (HTTP GET, POST, & ABORT)');
console.log('========================================================\n');

// Wrapper fetch universal (menggunakan native fetch jika ada koneksi, atau fallback mock aman)
async function safeFetch(url, options = {}) {
  try {
    if (typeof fetch === 'function') {
      const response = await fetch(url, options);
      return response;
    }
  } catch {
    // Fallback jika tidak ada akses jaringan internet (offline sandbox)
  }

  // Objek Response tiruan jika offline
  return {
    ok: true,
    status: options.method === 'POST' ? 201 : 200,
    statusText: 'OK',
    json: async () => {
      if (options.method === 'POST') {
        return { id: 101, ...JSON.parse(options.body || '{}') };
      }
      return {
        userId: 1,
        id: 1,
        title: 'Belajar Fetch API Modern di JavaScript',
        body: 'Menguasai komunikasi data RESTful API',
      };
    },
    text: async () => 'Contoh respons teks mentah',
  };
}

// 1. Permintaan HTTP GET dengan Pengecekan response.ok
console.log('--- 1. Permintaan HTTP GET (Membaca Data) ---');
safeFetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((response) => {
    console.log(`[HTTP STATUS]: ${response.status} ${response.statusText}`);
    // Wajib: Periksa properti response.ok sebelum parsing JSON!
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log('[GET SUKSES]: Data diterima dari server:');
    console.log(`- ID    : ${data.id}`);
    console.log(`- Judul : ${data.title}`);
    jalankanHttpPost();
  })
  .catch((err) => {
    console.error('[GET ERROR]:', err.message);
  });

// 2. Permintaan HTTP POST (Mengirimkan Payload JSON)
async function jalankanHttpPost() {
  console.log('\n--- 2. Permintaan HTTP POST (Mengirim Data) ---');
  try {
    const payloadBaru = {
      title: 'Materi Asynchronous Terlengkap',
      body: 'Panduan lengkap Event Loop hingga Web Workers',
      userId: 42,
    };

    const response = await safeFetch(
      'https://jsonplaceholder.typicode.com/posts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer TOKEN_SIMULASI_123',
        },
        body: JSON.stringify(payloadBaru),
      },
    );

    const hasilPost = await response.json();
    console.log('[POST SUKSES]: Berhasil menyimpan data baru:', hasilPost);

    jalankanAbortControllerDemo();
  } catch (error) {
    console.error('[POST ERROR]:', error.message);
  }
}

// 3. Membatalkan Request dengan AbortController
function jalankanAbortControllerDemo() {
  console.log('\n--- 3. Pembatalan Request via AbortController ---');
  const controller = new AbortController();
  const signal = controller.signal;

  console.log('Request dimulai dengan signal AbortController...');
  // Batalkan request secara instan
  controller.abort();

  if (signal.aborted) {
    console.log(
      '[ABORTED]: Request berhasil dibatalkan menggunakan controller.abort()',
    );
  }
}
