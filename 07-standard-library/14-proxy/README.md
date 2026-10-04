# 14 - Proxy (Metaprogramming, Interceptor Handler, Get dan Set Traps)

## 1. 🎯 Tujuan Belajar

- Memahami konsep **Metaprogramming** di JavaScript menggunakan objek `Proxy`.
- Mampu membuat Proxy dengan mengikat objek target dan objek handler (`new Proxy(target, handler)`).
- Menguasai perangkap pencegat (_traps_): trap **`get`** untuk membaca data dan trap **`set`** untuk memvalidasi penulisan properti.
- Mampu menerapkan use-case nyata seperti validasi data otomatis, _property masking_, dan pencatatan log akses objek.

---

## 2. 📖 Penjelasan Konsep

**`Proxy`** adalah fitur tingkat lanjut di JavaScript (ES6) yang memungkinkan kita membungkus (_wrap_) suatu objek target dan mencegat (_intercept_) operasi mendasar objek tersebut, seperti pembacaan properti (_get_), penulisan properti (_set_), penghapusan properti (_delete_), hingga pemanggilan fungsi (_apply_).

### 1. Anatomi Proxy

```javascript
const proxy = new Proxy(target, handler);
```

- **`target`**: Objek asli yang ingin dibungkus atau dilindungi.
- **`handler`**: Objek berisi fungsi-fungsi pencegat (_traps_) yang akan dijalankan setiap kali operasi pada target dipicu.

### 2. Kumpulan 13 Traps Lengkap pada Handler

Di JavaScript (spesifikasi resmi ECMAScript), terdapat tepat **13 Traps bawaan** yang dapat dicegat oleh objek `handler`. Setiap trap bertugas mencegat satu operasi fundamental objek:

| No | Nama Trap & Parameter | Operasi JS yang Dicegat (Trigger) | Tipe Return | Keterangan & Kegunaan |
| :---: | :--- | :--- | :---: | :--- |
| 1 | **`get(target, prop, receiver)`** | `proxy.prop` atau `proxy[prop]` | *Any* | Mencegat pembacaan nilai properti. |
| 2 | **`set(target, prop, val, receiver)`** | `proxy.prop = val` | `boolean` | Mencegat penulisan properti. **Wajib return `true`** jika sukses. |
| 3 | **`has(target, prop)`** | `'prop' in proxy` | `boolean` | Mencegat operator `in` (menyembunyikan properti rahasia). |
| 4 | **`deleteProperty(target, prop)`** | `delete proxy.prop` | `boolean` | Mencegat penghapusan properti. Return `true` jika diizinkan. |
| 5 | **`apply(target, thisArg, argList)`** | `proxyFunc(...args)` | *Any* | Mencegat pemanggilan fungsi (jika target berupa `function`). |
| 6 | **`construct(target, argList, newTarget)`** | `new ProxyClass(...args)` | `object` | Mencegat instansiasi objek dengan keyword `new`. |
| 7 | **`ownKeys(target)`** | `Object.keys()`, `for...in`, `Object.getOwnPropertyNames()` | `Array` | Mengatur daftar kunci properti yang boleh terlihat saat di-loop. |
| 8 | **`getOwnPropertyDescriptor(target, prop)`** | `Object.getOwnPropertyDescriptor(proxy, prop)` | `Object` / `undefined` | Mengambil konfigurasi atribut properti (*enumerable, writable, configurable*). |
| 9 | **`defineProperty(target, prop, descriptor)`** | `Object.defineProperty(proxy, prop, desc)` | `boolean` | Mencegat pendefinisian properti tingkat lanjut. |
| 10 | **`getPrototypeOf(target)`** | `Object.getPrototypeOf(proxy)`, `proxy.__proto__`, `proxy instanceof Class` | `Object` / `null` | Mencegat pembacaan prototype objek. |
| 11 | **`setPrototypeOf(target, prototype)`** | `Object.setPrototypeOf(proxy, prototype)` | `boolean` | Mencegat pengubahan prototype objek. |
| 12 | **`isExtensible(target)`** | `Object.isExtensible(proxy)` | `boolean` | Mencegat pengecekan apakah objek boleh ditambah properti baru. |
| 13 | **`preventExtensions(target)`** | `Object.preventExtensions(proxy)` | `boolean` | Mencegat pembekuan objek agar tidak bisa ditambah properti baru. |

---

### 3. Bedah Detail & Contoh Penggunaan Traps Populer

#### A. Traps Properti Dasar (`get`, `set`, `has`, `deleteProperty`)
Kelompok trap yang paling sering digunakan untuk pengamanan data, validasi, dan masking properti:

```javascript
const akun = { username: "joko", sandi: "rahasia123", role: "user" };

const handlerDasar = {
  // 1. Trap get: Fallback pesan ramah jika properti tidak ada
  get(target, prop) {
    if (prop in target) return target[prop];
    return `[Properti '${String(prop)}' tidak ditemukan]`;
  },

  // 2. Trap set: Validasi nilai sebelum disimpan (Wajib return true)
  set(target, prop, val) {
    if (prop === "role" && !["admin", "user"].includes(val)) {
      throw new Error("Role hanya boleh 'admin' atau 'user'!");
    }
    target[prop] = val;
    return true;
  },

  // 3. Trap has: Sembunyikan properti 'sandi' dari operator 'in'
  has(target, prop) {
    if (prop === "sandi") return false; // Pura-pura sandi tidak ada
    return prop in target;
  },

  // 4. Trap deleteProperty: Larang penghapusan properti 'username'
  deleteProperty(target, prop) {
    if (prop === "username") {
      throw new Error("Properti 'username' dilarang dihapus!");
    }
    delete target[prop];
    return true;
  }
};

const proxyAkun = new Proxy(akun, handlerDasar);
console.log("sandi" in proxyAkun);      // false (Disembunyikan!)
delete proxyAkun.username;             // 💥 Error: Properti 'username' dilarang dihapus!
```

#### B. Traps Fungsi & Konstruktor (`apply`, `construct`)
Digunakan jika objek target adalah sebuah **Function** atau **Class**:

```javascript
function kali(a, b) {
  return a * b;
}

const handlerFungsi = {
  // Mencegat setiap kali fungsi dipanggil
  apply(target, thisArg, argList) {
    console.log(`[AUDIT]: Memanggil fungsi dengan argumen:`, argList);
    const hasil = target.apply(thisArg, argList);
    return hasil * 2; // Memodifikasi hasil output
  }
};

const proxyKali = new Proxy(kali, handlerFungsi);
console.log(proxyKali(3, 4)); // [AUDIT] -> Output: 24 (hasil 12 x 2)
```

#### C. Trap Kunci Properti (`ownKeys`)
Mencegah properti sensitif bocor saat objek di-loop dengan `Object.keys()` atau `for...in`:

```javascript
const userRahasia = { nama: "Joko", token: "xyz-999", pin: 1234 };

const handlerKeys = {
  ownKeys(target) {
    // Hanya tampilkan kunci yang BUKAN 'token' dan 'pin'
    return Object.keys(target).filter(key => key !== "token" && key !== "pin");
  }
};

const proxyRahasia = new Proxy(userRahasia, handlerKeys);
console.log(Object.keys(proxyRahasia)); // [ 'nama' ] (token & pin aman tersembunyi!)
```

---

### 4. Fitur Khusus: `Proxy.revocable(target, handler)`

Menghasilkan objek `{ proxy, revoke }` di mana akses Proxy dapat **dicabut total kapan saja** dengan memanggil fungsi `revoke()`. 

Setelah `revoke()` dipanggil, setiap interaksi lanjutan ke proxy akan langsung melempar `TypeError: Cannot perform 'get' on a proxy that has been revoked`. Sangat berguna untuk memberikan izin akses data sementara yang dapat dimatikan seketika demi keamanan.

---

## 3. 💻 Contoh Kode (`contoh.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Pembuatan Proxy & Interceptor Trap get ---");
const user = {
  nama: "Joko",
  umur: 25,
};

const handler = {
  get(target, property) {
    if (property in target) {
      return target[property];
    }

    // Menggunakan String(property) agar aman jika properti bertipe Symbol
    return `[Peringatan: Properti '${String(property)}' tidak ditemukan!]`;
  },

  set(target, property, value) {
    if (property === "umur") {
      if (typeof value !== "number" || value <= 0) {
        throw new Error("Umur harus berupa angka tidak boleh 0 dan tidak boleh negatif!");
      }
    }

    // Simpan nilai ke target untuk semua properti yang lolos validasi
    target[property] = value;
    return true; // Wajib me-return true menandakan operasi penulisan berhasil
  },
};

const proxyUser = new Proxy(user, handler);

// Uji coba pembacaan properti:
console.log("Akses properti ada   :", proxyUser.nama);
console.log("Akses properti gaib  :", proxyUser.alamat);

console.log("\n--- 2. Validasi Penulisan Data dengan Trap set ---");
try {
  // Uji coba nilai yang benar:
  proxyUser.umur = 2;
  console.log("Berhasil update umur menjadi:", proxyUser.umur);

  // Uji coba nilai yang salah (memicu error):
  proxyUser.umur = -5;
} catch (err) {
  console.error("Gagal update umur:", err.message);
}
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Pembuatan Proxy & Interceptor Trap get ---
Akses properti ada   : Joko
Akses properti gaib  : [Peringatan: Properti 'alamat' tidak ditemukan!]

--- 2. Validasi Penulisan Data dengan Trap set ---
Berhasil update umur menjadi: 2
Gagal update umur: Umur harus berupa angka tidak boleh 0 dan tidak boleh negatif!
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata

> `Proxy` seperti **resepsionis atau satpam di lobi kantor gedung direksi**: orang luar tidak boleh langsung masuk menyelonong ke meja direktur (objek target). Tamu harus lewat satpam terlebih dahulu; satpam akan memeriksa identitas tamu, memeriksa apakah barang yang dibawa aman (validasi `set`), dan jika tamu mencari ruangan yang tidak ada, satpam memberikan petunjuk sopan (default fallback `get`).

### 🏢 Real-World Use Case

1. **Reaktivitas Framework Modern**: Vue.js 3 menggunakan `Proxy` untuk mendeteksi perubahan state secara otomatis dan me-render ulang UI seketika (_fine-grained reactivity_).
2. **Validasi Skema Model Runtime**: Memastikan tipe data objek database atau formulir sesuai aturan sebelum disimpan.
3. **Audit Logging & Analitik**: Merekam setiap kali fungsi atau properti sensitif dipanggil di sistem backend.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Error Konversi Symbol pada String Concatenation di Trap `get`**: Saat JavaScript melakukan konversi objek secara implisit (misal: `'teks' + proxy`), JavaScript mencari properti internal `Symbol.toPrimitive`. Jika di trap `get` Anda menulis `"..." + property`, akan terjadi `TypeError: Cannot convert a Symbol value to a string`. Selalu gunakan `String(property)` di dalam trap `get`.
- **Lupa me-return `true` pada trap `set`**: Jika Anda lupa menulis `return true` di dalam trap `set`, JavaScript akan menganggap mutasi gagal dan melempar error `TypeError: 'set' on proxy: trap returned falsish` di strict mode.
- **Bypass Proxy dengan memanggil objek Target langsung**: Jika seseorang memegang referensi ke objek target asli (`target.saldo = -5000`), proteksi Proxy tidak akan berjalan. Pastikan referensi ke target asli disembunyikan.
- **Overhead Performa**: Karena setiap pembacaan dan penulisan melewati fungsi pencegat, penggunaan Proxy berlebihan pada loop matematika intensif dapat menurunkan performa CPU.

### 🌟 Best Practice

- Gunakan Proxy bersamaan dengan `Reflect` bawaan JavaScript agar penanganan operasi default berjalan mulus dan standar.
- Selalu lemparkan error deskriptif (`TypeError`, `RangeError`) pada trap `set` jika validasi tidak lolos.
- Gunakan fungsi pembantu factory `createReactiveObject(target)` untuk membungkus objek secara terisolasi.

---

## 6. ✍️ Latihan Mandiri

1. Buatlah Proxy pada objek `profil` yang mengonversi otomatis semua nilai string menjadi huruf kapital (_UPPERCASE_) setiap kali dibaca menggunakan trap `get`.
2. Buatlah Proxy validasi untuk objek `produk` yang menolak penambahan properti baru selain `['id', 'nama', 'harga']`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [13 - RegExp](../13-regexp/README.md)
- ➡️ **Selanjutnya:** [15 - Reflect](../15-reflect/README.md)
- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
