/**
 * Modul 02: OOP - Inheritance & Super Constructor
 * 
 * Class ProductDetail yang mewarisi (extends) seluruh kemampuan dari class Product.
 * Menambahkan atribut-atribut spesifik yang hanya dibutuhkan pada halaman rincian produk
 * (seperti garansi, ulasan, informasi pengiriman, dan brand).
 */
import { Product } from './product.model.js';

export class ProductDetail extends Product {
  constructor(data) {
    // Memanggil constructor milik class induk (Product) untuk inisialisasi id, harga, stok, dll.
    super(data);

    // Properti tambahan khusus detail produk
    this.brand = data.brand ?? 'Generic';
    this.category = data.category ?? 'Umum';
    this.rating = data.rating ?? 0;
    this.discountPercentage = data.discountPercentage ?? 0;
    this.warrantyInformation = data.warrantyInformation ?? 'Garansi Resmi 1 Tahun';
    this.shippingInformation = data.shippingInformation ?? 'Pengiriman Gratis';
    this.availabilityStatus = data.availabilityStatus ?? (this.stock > 0 ? 'Tersedia' : 'Habis');
    this.reviews = data.reviews ?? [];
  }
}
