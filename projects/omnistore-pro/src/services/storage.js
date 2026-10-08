/**
 * Modul 07: Modern Web API - Web Storage (localStorage)
 *
 * Service untuk menyimpan dan memulihkan data keranjang belanja
 * dari memori lokal browser pengguna.
 */

const CART_STORAGE_KEY = 'omnistore_cart';

/**
 * Membaca data keranjang yang tersimpan dari localStorage.
 * Menggunakan try..catch untuk mencegah crash jika data JSON corrupt/rusak.
 *
 * @returns {Array} Array barang belanjaan (atau array kosong [] jika belum ada)
 */
export const loadCart = () => {
  try {
    const rawData = localStorage.getItem(CART_STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : [];
  } catch (error) {
    console.error('Gagal membaca keranjang dari storage:', error);
    return []; // Fallback aman jika data rusak
  }
};

/**
 * Menyimpan data array keranjang belanja ke localStorage dalam format teks JSON.
 *
 * @param {Array} cartItems - Array barang belanjaan dari cart.toJSON()
 */
export const saveCart = (cartItems) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error('Gagal menyimpan keranjang ke storage:', error);
  }
};
