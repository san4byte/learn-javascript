/**
 * Modul 06: Asynchronous JavaScript (Fetch API, async/await)
 * Modul 07: Modern Web API (AbortController untuk mencegah Race Condition)
 *
 * Service komunikasi data ke DummyJSON Products API.
 */

const BASE_URL = 'https://dummyjson.com/products';

// Sinyal pembatalan request pencarian
let searchAbortController = null;

/**
 * Mengambil daftar produk dari server DummyJSON.
 * Mendukung pencarian teks (query) dan pagination (limit & skip).
 *
 * @param {string} query - Kata kunci pencarian produk (opsional)
 * @param {number} limit - Jumlah produk yang diambil per request
 * @param {number} skip - Offset jumlah produk yang dilewati
 * @returns {Promise<Object|null>} Objek respons berisi array produk atau null jika dibatalkan
 */
export async function getProducts(query = '', limit = 10, skip = 0) {
  let signal;

  // Pasang AbortController khusus untuk pencarian baru agar request lama dibatalkan
  if (query && skip === 0) {
    if (searchAbortController) {
      searchAbortController.abort();
    }
    searchAbortController = new AbortController();
    signal = searchAbortController.signal;
  }

  // Tentukan endpoint: pencarian atau katalog umum
  let endpoint = `${BASE_URL}?limit=${limit}&skip=${skip}`;
  if (query) {
    endpoint = `${BASE_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`;
  }

  try {
    const res = await fetch(endpoint, signal ? { signal } : {});

    if (!res.ok) {
      throw new Error(
        `Gagal mengambil data dari server (Status: ${res.status})`
      );
    }

    return await res.json();
  } catch (err) {
    // Jika request dibatalkan secara sengaja oleh AbortController, abaikan errornya
    if (err.name === 'AbortError') {
      return null;
    }
    throw err;
  }
}

/**
 * Mengambil rincian lengkap satu produk berdasarkan ID.
 *
 * @param {string|number} id - ID produk
 * @returns {Promise<Object>} Data produk mentah dari server
 */
export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    throw new Error(`Produk dengan ID #${id} tidak ditemukan`);
  }

  return await res.json();
}
