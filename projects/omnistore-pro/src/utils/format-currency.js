/**
 * Modul 03: Standard Library - Intl.NumberFormat
 *
 * Helper untuk memformat angka desimal/integer menjadi format mata uang Rupiah (IDR).
 * Contoh: 1700000 -> "Rp 1.700.000"
 *
 * @param {number} price - Nilai nominal harga
 * @returns {string} String harga terformat dalam Rupiah
 */
export const formatCurrency = (price = 0) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price);
};
