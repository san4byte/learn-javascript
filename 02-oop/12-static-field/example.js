// Penjelasan lengkap dapat dibaca pada README.md
// Static Field (Properti milik Class, bukan milik instance objek)

class Configuration {
  static name = "Centinela";
  static version = 1.0;
  static author = "Joko Santoso";
}

const config = new Configuration();

// Static field TIDAK BISA diakses melalui instance objek:
console.info("Akses via instance:", config.name); // undefined

// Static field diakses langsung melalui nama Class-nya:
console.info("Akses via Class:", Configuration.name);
console.info("Versi:", Configuration.version);
console.info("Author:", Configuration.author);

// Bisa dimodifikasi secara global via Class:
Configuration.name = "Rekap Uang";
console.info("Nama baru:", Configuration.name);
