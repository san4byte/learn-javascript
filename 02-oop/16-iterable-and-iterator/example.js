// Penjelasan lengkap dapat dibaca pada README.md
// Iterable dan Iterator Protocol (PZN Implementation + Real World Project Example)

// ====================================================================
// 1. IMPLEMENTASI DASAR ITERABLE PROTOCOL (Sesuai Silabus PZN)
// ====================================================================

// Objek hasil kontrak Iterator
class CounterIteratorResult {
  constructor(value, done) {
    this.value = value;
    this.done = done;
  }
}

// Iterator yang memiliki method next()
class CounterIterator {
  constructor(value, max) {
    this.value = value;
    this.max = max;
  }

  next() {
    try {
      if (this.value > this.max) {
        return new CounterIteratorResult(undefined, true);
      } else {
        return new CounterIteratorResult(this.value, false);
      }
    } finally {
      this.value++;
    }
  }
}

// Objek Iterable yang memiliki method [Symbol.iterator]()
class Counter {
  constructor(value, max) {
    this.value = value;
    this.max = max;
  }

  [Symbol.iterator]() {
    return new CounterIterator(this.value, this.max);
  }
}

console.info("--- 1. Loop Counter Iterable (PZN) ---");
const counter = new Counter(1, 5);

// Karena mematuhi kontrak Iterable, objek counter bisa langsung di-loop dengan for..of!
for (const val of counter) {
  console.info("Nilai counter:", val);
}


// ====================================================================
// 2. CONTOH NYATA DI REAL PROJECT: Custom Product Catalog & Pagination
// ====================================================================
// Bayangkan Anda membuat aplikasi E-Commerce. Anda ingin katalog produk
// bisa langsung di-for..of atau di-spread [...catalog] tanpa harus membuka
// struktur data internalnya (encapsulation).

class ProductCatalog {
  constructor() {
    this.products = [];
  }

  addProduct(name, price) {
    this.products.push({ name, price });
  }

  // Membuat katalog ini menjadi Iterable secara ringkas & native!
  [Symbol.iterator]() {
    let index = 0;
    const items = this.products;

    return {
      next() {
        if (index < items.length) {
          return { value: items[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }
}

console.info("\n--- 2. Real Project: E-Commerce Product Catalog ---");
const catalog = new ProductCatalog();
catalog.addProduct("Laptop Gaming", 15000000);
catalog.addProduct("Mouse Wireless", 250000);
catalog.addProduct("Mechanical Keyboard", 800000);

// Bisa langsung di-for..of secara elegan:
for (const product of catalog) {
  console.info(`Barang: ${product.name} | Harga: Rp ${product.price}`);
}

// Bisa langsung dibongkar dengan Spread Operator:
const allItems = [...catalog];
console.info("Total item katalog via spread:", allItems.length);


// ====================================================================
// 3. CARA MODERN & PRAKTIS DI INDUSTRI: Generator Function (function*)
// ====================================================================
// Di industri modern, menulis objek Iterator manual dengan next() dan done
// cukup panjang. JavaScript menyediakan Generator (function*) dengan 'yield'
// yang otomatis membuat Iterable & Iterator di balik layar!

class BookShelf {
  constructor() {
    this.books = ["Clean Code", "JavaScript: The Good Parts", "Refactoring"];
  }

  // Generator method otomatis menjadi [Symbol.iterator]
  *[Symbol.iterator]() {
    for (const book of this.books) {
      yield book; // yield mengembalikan value dan menunggu pemanggilan berikutnya
    }
  }
}

console.info("\n--- 3. Modern Real-World: Generator Function* di Class ---");
const shelf = new BookShelf();
for (const book of shelf) {
  console.info("Buku di rak:", book);
}
