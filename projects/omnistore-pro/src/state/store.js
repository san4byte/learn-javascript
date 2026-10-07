/**
 * Modul 03: Standard Library - Proxy, Reflect & Set
 * 
 * Pusat Penyimpanan State Global Aplikasi (State Store).
 * Menggunakan Proxy untuk mendeteksi setiap perubahan properti secara otomatis (Reaktif),
 * otomatis menyinkronkan data keranjang ke LocalStorage, dan memberi tahu (notify)
 * seluruh komponen UI yang berlangganan (subscribe).
 */
import { Cart } from '@/models/cart.model.js';
import { loadCart, saveCart } from '@/services/storage.js';

// Kumpulan fungsi pendengar (listeners) yang terdaftar.
// Menggunakan Set agar callback yang didaftarkan tidak duplikat.
const listeners = new Set();

// Objek data mentah yang menjadi Single Source of Truth aplikasi
const rawState = {
  cart: new Cart(loadCart()), // Memuat keranjang belanja lama dari localStorage
  products: [],               // Daftar produk yang sedang ditampilkan
  searchQuery: '',            // Kata kunci pencarian saat ini
  skip: 0,                    // Offset data pagination
  total: 0,                   // Total keseluruhan produk dari API
};

/**
 * State Reaktif (Proxy Wrapper)
 * Setiap kali ada perubahan nilai (misal: state.cart = ... atau state.skip = ...),
 * trap `set()` akan otomatis mencegatnya.
 */
export const state = new Proxy(rawState, {
  set(target, prop, value, receiver) {
    // 1. Eksekusi pengubahan data secara resmi menggunakan Reflect
    const success = Reflect.set(target, prop, value, receiver);

    if (success) {
      // 2. Jika keranjang belanja berubah, otomatis simpan ke LocalStorage
      if (prop === 'cart') {
        saveCart(target.cart.toJSON());
      }

      // 3. Kabari semua komponen UI yang berlangganan bahwa ada data yang diperbarui
      listeners.forEach((callback) => callback(target, prop));
    }

    return success;
  },
});

/**
 * Mendaftarkan fungsi callback yang ingin dipanggil setiap kali state berubah.
 * 
 * @param {Function} callback - Fungsi pendengar (target, prop) => void
 */
export function subscribe(callback) {
  listeners.add(callback);
}
