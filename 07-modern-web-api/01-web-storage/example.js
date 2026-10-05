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
