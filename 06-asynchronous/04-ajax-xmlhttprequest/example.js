// 04 - AJAX dengan XMLHttpRequest (XHR)
// File ini dapat dijalankan langsung di Node.js maupun di Browser.

const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined';

if (!isBrowser) {
  console.log('========================================================');
  console.log('📌 SIMULASI SIKLUS HIDUP XMLHttpRequest (NODE.JS)');
  console.log('========================================================\n');

  console.log('--- 1. 5 Tahapan Siklus Hidup readyState XHR ---');
  const readyStates = [
    {
      state: 0,
      name: 'UNSENT',
      desc: 'Objek XHR dibuat, xhr.open() belum dipanggil',
    },
    {
      state: 1,
      name: 'OPENED',
      desc: 'xhr.open() dipanggil, koneksi HTTP disiapkan',
    },
    {
      state: 2,
      name: 'HEADERS_RECEIVED',
      desc: 'xhr.send() dipanggil, header respons server diterima',
    },
    {
      state: 3,
      name: 'LOADING',
      desc: 'Data body respon sedang diunduh (streaming)',
    },
    { state: 4, name: 'DONE', desc: 'Operasi transfer tuntas sepenuhnya' },
  ];

  readyStates.forEach((s) => {
    console.log(`[readyState ${s.state}] ${s.name.padEnd(18)}: ${s.desc}`);
  });

  console.log('\n--- 2. Alur Simulasi Request HTTP GET ---');
  console.log(
    '> xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1", true);',
  );
  console.log('> xhr.send();');
  console.log('... Menunggu server membalas di latar belakang ...');

  const mockResponse = {
    userId: 1,
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum...',
  };

  setTimeout(() => {
    console.log('\n[SIMULASI RESPON DITERIMA]:');
    console.log('- Status HTTP : 200 (OK)');
    console.log('- Ready State : 4 (DONE)');
    console.log('- Data JSON   :', mockResponse);
    console.log(
      '\n💡 Buka "index.html" di browser untuk menguji live network request XHR!',
    );
  }, 100);
} else {
  // LINGKUNGAN BROWSER
  console.log('========================================================');
  console.log('🌐 LIVE AJAX XMLHTTPREQUEST DI BROWSER');
  console.log('========================================================');

  const btn = document.getElementById('btn-request');
  const output = document.getElementById('output');

  if (btn && output) {
    btn.addEventListener('click', () => {
      output.textContent = 'Sedang memuat data dari server via XHR...';

      const xhr = new XMLHttpRequest();
      const url = 'https://jsonplaceholder.typicode.com/posts/1';

      // 1. Membuka koneksi HTTP GET secara asynchronous (true)
      xhr.open('GET', url, true);

      // 2. Mendaftarkan listener status readyState
      xhr.onreadystatechange = function () {
        console.log(
          `[XHR Status Change] readyState: ${xhr.readyState}, status: ${xhr.status}`,
        );

        // readyState 4: DONE
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            output.textContent = JSON.stringify(responseData, null, 2);
            console.log('[XHR SUKSES]:', responseData);
          } else {
            output.textContent = `Gagal memuat data! Status: ${xhr.status} (${xhr.statusText})`;
            console.error('[XHR GAGAL]:', xhr.statusText);
          }
        }
      };

      // 3. Mengirimkan request
      xhr.send();
    });
  }
}
