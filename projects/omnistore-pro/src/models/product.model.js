/**
 * Modul 02: OOP - Class, Private Fields (#), Encapsulation & Getters
 * Modul 03: Standard Library - toJSON Serialization Hook
 *
 * Cetak biru objek produk di OmniStore Pro.
 * Menggunakan private fields (#) agar nilai id, harga, dan stok aman
 * dan tidak bisa dimanipulasi sembarangan dari luar class.
 */
import { formatCurrency } from '@/utils/format-currency.js';

export class Product {
  // Private fields (hanya bisa diakses di dalam kurung kurawal class ini)
  #id;
  #price;
  #stock;

  constructor(data) {
    this.#id = data.id;
    this.title = data.title;
    this.description = data.description;

    // Konversi kurs USD ke IDR (Rp 17.000).
    // Jika data berasal dari localStorage (sudah ada priceInIdr), gunakan langsung agar tidak dikali ulang.
    this.#price = data.priceInIdr ?? Math.round(data.price * 17000);
    this.#stock = data.stock ?? 0;
    this.thumbnail = data.thumbnail;
    this.images = data.images ?? [];
  }

  // Getter publik untuk membaca nilai private field secara aman (read-only)
  get id() {
    return this.#id;
  }

  get price() {
    return this.#price;
  }

  get stock() {
    return this.#stock;
  }

  get formattedPrice() {
    return formatCurrency(this.#price);
  }

  /**
   * Kunci Serialisasi JSON:
   * JSON.stringify() secara default tidak bisa membaca private fields (#).
   * Method toJSON() ini dipanggil otomatis oleh JSON.stringify() saat data disimpan
   * ke LocalStorage agar #id, #price, dan #stock tetap tersimpan dengan utuh.
   */
  toJSON() {
    return {
      id: this.#id,
      title: this.title,
      description: this.description,
      price: this.#price,
      priceInIdr: this.#price,
      stock: this.#stock,
      thumbnail: this.thumbnail,
      images: this.images,
    };
  }
}
