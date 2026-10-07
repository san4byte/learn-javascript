/**
 * Modul 02: OOP - Encapsulation, Custom Error, Iterable & Iterator Protocol
 * Modul 03: Standard Library - Map & JSON Serialization Hook
 * 
 * Class Cart untuk mengelola keranjang belanjaan.
 * Menggunakan private Map (#items) untuk performa O(1) saat mencari/menambah produk berdasarkan ID.
 * Mengimplementasikan [Symbol.iterator] agar objek Cart bisa langsung di-looping
 * dengan `for..of` dan diubah menjadi array menggunakan spread operator `[...cart]`.
 */
import { formatCurrency } from '../utils/format-currency.js';
import { OutOfStockError } from './errors.js';
import { Product } from './product.model.js';

export class Cart {
  // Map internal: key = productId, value = { product: Product, qty: number }
  #items = new Map();

  /**
   * Rekonstruksi keranjang belanja dari LocalStorage (Re-hydration).
   * Objek mentah dari JSON diubah kembali menjadi instance Product resmi.
   */
  constructor(savedItems = []) {
    savedItems.forEach((item) => {
      const product =
        item.product instanceof Product
          ? item.product
          : new Product(item.product);

      this.#items.set(product.id, {
        product,
        qty: item.qty,
      });
    });
  }

  /**
   * Menambahkan barang ke keranjang dengan validasi stok.
   */
  addItem(product, qty = 1) {
    const existing = this.#items.get(product.id);
    const currentQty = existing ? existing.qty : 0;

    // Lempar custom error jika jumlah melebihi batas stok barang
    if (currentQty + qty > product.stock) {
      throw new OutOfStockError(
        `Stok produk tidak mencukupi (Tersisa: ${product.stock})`
      );
    }

    // Perbarui jumlah barang di dalam Map
    this.#items.set(product.id, {
      product,
      qty: currentQty + qty,
    });
  }

  /**
   * Menghapus barang dari keranjang berdasarkan ID produk.
   */
  removeItem(productId) {
    this.#items.delete(productId);
  }

  /**
   * Mengubah jumlah barang secara langsung.
   * Jika jumlah target <= 0, barang otomatis dihapus dari keranjang.
   */
  updateQty(productId, qty) {
    if (qty <= 0) {
      this.removeItem(productId);
      return;
    }

    const item = this.#items.get(productId);
    if (item) {
      // Validasi agar tidak melebihi stok yang ada
      if (qty > item.product.stock) {
        throw new OutOfStockError(
          `Stok produk tidak mencukupi (Tersisa: ${item.product.stock})`
        );
      }
      item.qty = qty;
    }
  }

  /**
   * Protokol Iterable (Modul 02 & 03):
   * Generator function ini membuat class Cart resmi bisa di-loop langsung
   * menggunakan `for (const item of cart)` atau dipecah dengan `[...this]`.
   */
  *[Symbol.iterator]() {
    for (const item of this.#items.values()) {
      yield item;
    }
  }

  /**
   * Menghitung total fisik pcs barang yang ada di keranjang.
   */
  get totalItems() {
    return [...this].reduce((total, item) => total + item.qty, 0);
  }

  /**
   * Menghitung total jenis produk unik (ala Tokopedia).
   */
  get totalUniqueItems() {
    return this.#items.size;
  }

  /**
   * Menghitung total tagihan harga belanjaan dalam format Rupiah.
   */
  get totalPrice() {
    const sum = [...this].reduce(
      (total, item) => total + item.product.price * item.qty,
      0
    );

    return formatCurrency(sum);
  }

  /**
   * Kunci Serialisasi JSON (Modul 03):
   * Dipanggil otomatis oleh JSON.stringify(cart).
   * Mengembalikan array biasa [...this] agar siap disimpan ke LocalStorage.
   */
  toJSON() {
    return [...this];
  }
}
