/**
 * Modul 02: OOP - Custom Error Handling
 *
 * Class error kustom turunan dari Error bawaan JavaScript.
 * Digunakan untuk menangani situasi spesifik di aplikasi agar pesan error lebih bermakna.
 */

// Dilempar ketika user ingin menambah barang ke keranjang melebihi stok yang tersedia
export class OutOfStockError extends Error {
  constructor(message = 'Stok produk tidak mencukupi') {
    super(message);
    this.name = 'OutOfStockError';
  }
}

// Dilempar ketika terjadi kegagalan jaringan/koneksi saat memanggil API
export class NetworkError extends Error {
  constructor(message = 'Terjadi kesalahan pada jaringan') {
    super(message);
    this.name = 'NetworkError';
  }
}
