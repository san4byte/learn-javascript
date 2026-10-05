# 01 - Web Storage API (localStorage, sessionStorage, dan Cookies)

## 1. 🎯 Tujuan Belajar
- Memahami perbedaan mendasar antara localStorage, sessionStorage, dan Cookies.\n- Mampu menyimpan, membaca, dan menghapus data tipe string maupun objek kompleks menggunakan JSON.\n- Memahami use case nyata di industri seperti penyimpanan Auth Token (JWT) dan preferensi Dark/Light Mode.\n- Mengetahui batasan keamanan (XSS vs HttpOnly Cookie) dan batasan kuota storage.

---

## 2. 📖 Penjelasan Konsep
Di era web modern, browser menyediakan mekanisme penyimpanan data di sisi klien (*Client-Side Storage*) agar aplikasi web dapat mempertahankan state pengguna tanpa harus selalu meminta ke server setiap saat.

### Perbandingan 3 Metode Penyimpanan Utama:

| Fitur | `localStorage` | `sessionStorage` | `Cookies` |
| :--- | :--- | :--- | :--- |
| **Masa Hidup Data** | Permanen (sampai dihapus user/script) | Sementara (hilang saat tab/jendela ditutup) | Dapat diatur expired date-nya |
| **Kapasitas** | ~5 MB - 10 MB | ~5 MB | ~4 KB |
| **Pengiriman ke Server** | Tidak pernah dikirim otomatis ke server | Tidak pernah dikirim otomatis ke server | Otomatis dikirim di setiap HTTP Header request |
| **Akses Tab** | Dibagikan antar semua tab pada domain yang sama | Terisolasi khusus untuk 1 tab tersebut saja | Dibagikan antar tab domain yang sama |
| **Keamanan** | Rentan serangan XSS jika token sensitif | Rentan XSS | Bisa diamankan dengan flag `HttpOnly` & `Secure` |

### Method Utama Web Storage API:
Baik `localStorage` maupun `sessionStorage` mengimplementasikan antarmuka antarmuka yang sama (`Storage` interface):
* `setItem(key, value)`: Menyimpan data (value selalu dikonversi menjadi string).
* `getItem(key)`: Mengambil data berdasarkan key (mengembalikan `null` jika tidak ditemukan).
* `removeItem(key)`: Menghapus data spesifik berdasarkan key.
* `clear()`: Menghapus seluruh data dalam storage domain tersebut.
* `key(index)`: Mendapatkan nama key berdasarkan urutan index.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

// 1. Fallback Mock untuk lingkungan Node.js (di browser otomatis memakai window.localStorage)
const storage = typeof localStorage !== 'undefined' ? localStorage : (() => {
  const store = new Map();
  return {
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, val) => store.set(key, String(val)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear()
  };
})();

console.log("--- 1. Menyimpan dan Membaca Data Tipe Primitif ---");
storage.setItem("app_theme", "dark");
storage.setItem("user_language", "id-ID");

const activeTheme = storage.getItem("app_theme");
console.log("Tema saat ini:", activeTheme);

console.log("\n--- 2. Menyimpan Objek Kompleks (JSON Serialize & Deserialize) ---");
// Web Storage hanya mendukung string. Objek harus di-stringify terlebih dahulu!
const userProfile = {
  id: 101,
  username: "jokosantoso",
  role: "Software Engineer",
  preferences: {
    notifications: true,
    newsletter: false
  }
};

// Simpan ke storage dalam bentuk JSON String
storage.setItem("user_session", JSON.stringify(userProfile));

// Ambil dan ubah kembali menjadi Objek JavaScript
const cachedSessionString = storage.getItem("user_session");
const parsedSession = JSON.parse(cachedSessionString);

console.log("Username dari storage:", parsedSession.username);
console.log("Role pengguna:", parsedSession.role);
console.log("Status notifikasi:", parsedSession.preferences.notifications);

console.log("\n--- 3. Helper Class Aman untuk Real-World Project ---");
// Di project skala besar, selalu bungkus Storage dalam wrapper helper untuk menangani error QuotaExceeded
class StorageHelper {
  static set(key, value) {
    try {
      storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Gagal menyimpan data ke storage untuk key '${key}':`, error);
      return false;
    }
  }

  static get(key, defaultValue = null) {
    try {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Gagal mem-parse data storage untuk key '${key}':`, error);
      return defaultValue;
    }
  }

  static remove(key) {
    storage.removeItem(key);
  }
}

// Simulasi Keranjang Belanja (Shopping Cart)
StorageHelper.set("cart_items", [
  { id: 1, name: "Mechanical Keyboard", qty: 1, price: 850000 },
  { id: 2, name: "Wireless Mouse", qty: 2, price: 250000 }
]);

const currentCart = StorageHelper.get("cart_items", []);
const totalBelanja = currentCart.reduce((acc, item) => acc + (item.price * item.qty), 0);
console.log(`Jumlah jenis barang di cart: ${currentCart.length}`);
console.log(`Total biaya keranjang: Rp ${totalBelanja.toLocaleString('id-ID')}`);
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Menyimpan dan Membaca Data Tipe Primitif ---
Tema saat ini: dark

--- 2. Menyimpan Objek Kompleks (JSON Serialize & Deserialize) ---
Username dari storage: jokosantoso
Role pengguna: Software Engineer
Status notifikasi: true

--- 3. Helper Class Aman untuk Real-World Project ---
Jumlah jenis barang di cart: 2
Total biaya keranjang: Rp 1.350.000
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> Bayangkan **localStorage** seperti *buku catatan permanen di meja kerja kantor Anda* (besok Anda datang, catatannya tetap ada). Sedangkan **sessionStorage** seperti *papan tulis temporary di ruang meeting* (segera dihapus bersih saat meeting selesai dan ruangan ditutup). Sementara **Cookies** seperti *tiket gelang bioskop di tangan Anda* (harus selalu Anda tunjukkan ke petugas tiket setiap kali lewat pintu bioskop / request HTTP).

### 🏢 Real-World Use Case
1. **Dark Mode & UI Customization**: Membaca tema dari `localStorage` sebelum halaman selesai di-render agar layar tidak berkedip (*flash of unstyled content*).
2. **Offline Shopping Cart**: Pengguna tamu yang belum mendaftar/login bisa memasukkan barang ke keranjang belanja, data disimpan di `localStorage`. Saat mereka login, data keranjang dikirim ke database.
3. **Session vs Remember Me**: Menggunakan `sessionStorage` untuk user yang login tanpa mencentang 'Remember Me', dan `localStorage` atau Cookie berumur panjang jika dicentang.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Lupa JSON.stringify**: Jika Anda menyimpan objek tanpa diubah ke string: `localStorage.setItem('user', { id: 1 })`, data yang tersimpan adalah string `"[object Object]"` dan data aslinya hilang selamanya.
* **Menyimpan Password atau Rahasia**: Jangan pernah menyimpan password mentah, API Secret, atau nomor kartu kredit di Web Storage karena skrip JavaScript jahat pihak ketiga (XSS) dapat membacanya dengan mudah.
* **QuotaExceededError**: Penyimpanan browser dibatasi (~5MB). Jika Anda mencoba menyimpan data gambar base64 yang sangat besar, browser akan melempar error.

### 🌟 Best Practice
* Selalu bungkus operasi `getItem` dan `setItem` dengan helper `try...catch` dan `JSON.parse`.
* Gunakan penamaan konstanta key yang terstruktur dengan prefix nama aplikasi, misalnya: `const APP_KEYS = { TOKEN: 'myApp_authToken', THEME: 'myApp_theme' }`.
* Untuk token autentikasi yang sangat sensitif di sistem perbankan/fintech, utamakan penggunaan **HttpOnly Cookies** dari sisi backend agar tidak bisa dicuri oleh skrip JavaScript di sisi browser.

---

## 6. ✍️ Latihan Mandiri
1. Buatlah sebuah fungsi bernama `simpanHistoriPencarian(keyword)` yang menyimpan riwayat kata kunci pencarian user ke dalam `localStorage`.
2. Batasi riwayat pencarian maksimal hanya 5 kata kunci terakhir (jika ada pencarian ke-6, hapus kata kunci paling lama).
3. Buat fungsi `ambilHistoriPencarian()` yang mengembalikan array riwayat tersebut.

---

## 7. 🧭 Navigasi
- ➡️ **Selanjutnya:** [02 - Modern Syntax ES2020-ES2023](../02-modern-syntax-es2020/README.md)\n- 🏠 **Daftar Isi Modul 06:** [README Modul 06](../README.md)\n- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
