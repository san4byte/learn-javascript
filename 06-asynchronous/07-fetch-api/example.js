// Fungsi pembungkus fetch dengan simulasi jika offline / tanpa internet
async function universalFetch(url, options = {}) {
  try {
    if (typeof fetch !== 'undefined') {
      const response = await fetch(url, options);
      return response;
    }
  } catch (err) {
    // Jika tidak ada koneksi internet (offline), gunakan data simulasi
  }
  return {
    ok: true,
    status: 200,
    json: async () => {
      if (options.method === 'POST') {
        return { id: 101, status: 'Tersimpan via simulasi offline' };
      }
      return {
        id: 1,
        title: 'Belajar JavaScript Asynchronous',
        body: 'Materi Fetch API modern (Simulasi)',
      };
    },
  };
}

console.log('--- 1. Mengambil Data via HTTP GET ---');
universalFetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
    return response.json();
  })
  .then((data) => {
    console.log('Data berhasil diambil dari server:');
    console.log('- ID Post    :', data.id);
    console.log('- Judul Post :', data.title);
  })
  .catch((err) => {
    console.error('Gagal melakukan fetch:', err.message);
  });

console.log('\\n--- 2. Mengirim Data via HTTP POST ---');
async function kirimDataBaru() {
  try {
    const payload = {
      title: 'Artikel Baru',
      body: 'Konten artikel berhasil dibuat',
      userId: 1,
    };
    const res = await universalFetch(
      'https://jsonplaceholder.typicode.com/posts',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    const hasil = await res.json();
    console.log('Sukses menyimpan data ke server! Respons ID:', hasil.id);
  } catch (error) {
    console.error('Error kirim data:', error.message);
  }
}

kirimDataBaru();
