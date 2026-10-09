# 14 - Proxy (Metaprogramming, Interceptor Handler, dan 13 Traps Lengkap)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Membungkus (_wrap_) objek target untuk mencegat (_intercept_) dan mengontrol seluruh operasi internal JavaScript (baca, tulis, hapus, cek keberadaan, pemanggilan fungsi, hingga mutasi prototype).
> - **Kapan Digunakan**: Sistem reaktivitas UI (seperti Vue 3 atau State Store vanilla JS), validasi skema form otomatis, pencatatan log akses (audit log), dan pencabutan izin akses sementara.
> - **Aturan Praktis**: Gunakan `Proxy` selalu bersamaan dengan `Reflect` bawaan JavaScript agar penanganan operasi default berjalan standar, dan pastikan trap `set` selalu me-return nilai boolean `true`.

---

## 1. 🎯 Tujuan Belajar

- Memahami konsep **Metaprogramming** di JavaScript menggunakan objek `Proxy`.
- Mampu membuat Proxy dengan mengikat objek target dan objek handler (`new Proxy(target, handler)`).
- Menguasai seluruh **13 Perangkap Pencegat (_Traps_)** pada Proxy beserta contoh penerapannya masing-masing.
- Memahami integrasi Proxy dengan objek `Reflect` sebagai pasangan standar industri.
- Memahami fitur pencabutan izin akses sementara melalui `Proxy.revocable()`.
- Mengetahui implementasi nyata arsitektur reaktivitas state management (seperti pada OmniStore Pro).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> `Proxy` seperti **resepsionis atau satpam di lobi kantor gedung direksi**: orang luar tidak boleh langsung masuk menyelonong ke meja direktur (objek target asli). Tamu harus lewat satpam terlebih dahulu; satpam akan memeriksa identitas tamu, memeriksa apakah barang yang dibawa aman (validasi `set`), dan jika tamu mencari ruangan yang tidak ada, satpam memberikan petunjuk sopan (default fallback `get`).

---

### 1. Anatomi Proxy

```javascript
const proxy = new Proxy(target, handler);
```

- **`target`**: Objek asli yang dibungkus atau dilindungi (bisa berupa Objek, Array, atau Fungsi).
- **`handler`**: Objek penampung fungsi-fungsi pencegat (_traps_) yang akan aktif saat operasi pada target dipicu.

---

### 2. Kumpulan 13 Traps Lengkap pada Handler (Cheat-Sheet)

Di spesifikasi resmi ECMAScript, terdapat tepat **13 Traps bawaan** yang dapat dicegat:

| No  | Nama Trap & Parameter                    | Operasi JS yang Dicegat (Trigger)       |  Nilai Kembalian   | Deskripsi Singkat                                            |
| :-: | :--------------------------------------- | :-------------------------------------- | :----------------: | :----------------------------------------------------------- |
|  1  | **`get(target, prop, receiver)`**        | `proxy.prop` atau `proxy[prop]`         |       _Any_        | Mencegat pembacaan nilai properti.                           |
|  2  | **`set(target, prop, val, receiver)`**   | `proxy.prop = val`                      |     `boolean`      | Mencegat penulisan properti (**Wajib return `true`**).       |
|  3  | **`has(target, prop)`**                  | `'prop' in proxy`                       |     `boolean`      | Mencegat operator `in` (menyembunyikan properti rahasia).    |
|  4  | **`deleteProperty(target, prop)`**       | `delete proxy.prop`                     |     `boolean`      | Mencegat penghapusan properti.                               |
|  5  | **`apply(target, thisArg, argList)`**    | `proxyFunc(...args)`                    |       _Any_        | Mencegat pemanggilan fungsi (jika target berupa `function`). |
|  6  | **`construct(target, args, newTarget)`** | `new ProxyClass(...args)`               |      `object`      | Mencegat instansiasi objek dengan keyword `new`.             |
|  7  | **`ownKeys(target)`**                    | `Object.keys()`, `for...in`             |      `Array`       | Mengatur daftar kunci yang boleh terlihat saat di-loop.      |
|  8  | **`getOwnPropertyDescriptor(t, p)`**     | `Object.getOwnPropertyDescriptor()`     |      `Object`      | Mengambil atribut descriptor properti.                       |
|  9  | **`defineProperty(target, prop, desc)`** | `Object.defineProperty()`               |     `boolean`      | Mencegat pendefinisian properti kustom.                      |
| 10  | **`getPrototypeOf(target)`**             | `Object.getPrototypeOf()`, `instanceof` | `Object` \| `null` | Mencegat pembacaan prototype objek.                          |
| 11  | **`setPrototypeOf(target, proto)`**      | `Object.setPrototypeOf()`               |     `boolean`      | Mencegat pengubahan prototype objek.                         |
| 12  | **`isExtensible(target)`**               | `Object.isExtensible()`                 |     `boolean`      | Mencegat cek apakah objek boleh ditambah properti baru.      |
| 13  | **`preventExtensions(target)`**          | `Object.preventExtensions()`            |     `boolean`      | Mencegat pembekuan ekstensi objek.                           |

---

### 3. Eksplorasi Mendalam Seluruh 13 Traps & Kasus Penggunaan

Berikut adalah rincian lengkap ke-13 trap pencegat pada objek `Proxy`:

---

#### 1. Trap Membaca: `get(target, prop, receiver)`

Mencegat operasi pembacaan nilai properti. Sangat cocok untuk memberikan nilai bawaan (_default value / fallback_) jika properti belum ada.

```javascript
const profil = { nama: "Joko" };

const proxyProfil = new Proxy(profil, {
  get(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    }
    return `[Nilai default untuk '${String(prop)}']`;
  },
});

console.log(proxyProfil.nama); // "Joko"
console.log(proxyProfil.kota); // "[Nilai default untuk 'kota']"
```

---

#### 2. Trap Menulis: `set(target, prop, value, receiver)`

Mencegat penulisan properti. Sangat cocok untuk validasi tipe data saat runtime.

> ⚠️ **Wajib**: Trap `set` **harus mengembalikan boolean `true`** jika penetapan nilai berhasil! Mengembalikan nilai _falsy_ akan memicu `TypeError` di strict mode.

```javascript
const user = { umur: 20 };

const proxyUser = new Proxy(user, {
  set(target, prop, val, receiver) {
    if (prop === "umur") {
      if (typeof val !== "number" || val <= 0) {
        throw new TypeError("Umur harus angka lebih dari 0!");
      }
    }
    return Reflect.set(target, prop, val, receiver);
  },
});

proxyUser.umur = 25; // Sukses
// proxyUser.umur = -5; // ❌ TypeError: Umur harus angka lebih dari 0!
```

---

#### 3. Trap Pengecekan: `has(target, prop)`

Mencegat operasi operator `'prop' in proxy`. Berguna untuk menyembunyikan properti rahasia/internal agar tidak terdeteksi dari luar.

```javascript
const dataPrivat = { apiKey: "RAHASIA-123", publik: true };

const safeProxy = new Proxy(dataPrivat, {
  has(target, prop) {
    if (prop === "apiKey") return false; // Pura-pura tidak ada
    return Reflect.has(target, prop);
  },
});

console.log("publik" in safeProxy); // true
console.log("apiKey" in safeProxy); // false ✅ (tersembunyi)
```

---

#### 4. Trap Hapus Properti: `deleteProperty(target, prop)`

Mencegat eksekusi `delete proxy.prop`. Berguna untuk memproteksi field vital agar tidak dapat dihapus secara tidak sengaja.

```javascript
const rekening = { noRek: "12345", saldo: 500000 };

const rekeningProxy = new Proxy(rekening, {
  deleteProperty(target, prop) {
    if (prop === "saldo" || prop === "noRek") {
      console.warn(`Dilarang menghapus properti penting: ${prop}`);
      return false; // Tolak operasi delete
    }
    return Reflect.deleteProperty(target, prop);
  },
});

delete rekeningProxy.saldo; // Gagal & muncul peringatan
console.log(rekeningProxy.saldo); // 500000 (aman)
```

---

#### 5. Trap Pemanggilan Fungsi: `apply(target, thisArg, argumentsList)`

Mencegat eksekusi fungsi jika objek target berupa function. Sangat populer untuk audit logging atau pemantauan waktu eksekusi (_performance profiling_).

```javascript
function kali(a, b) {
  return a * b;
}

const proxyKali = new Proxy(kali, {
  apply(target, thisArg, argList) {
    console.log(`[AUDIT]: Memanggil fungsi dengan argumen:`, argList);
    return Reflect.apply(target, thisArg, argList);
  },
});

console.log(proxyKali(4, 5)); // [AUDIT] -> 20
```

---

#### 6. Trap Konstruktor: `construct(target, argumentsList, newTarget)`

Mencegat instansiasi objek ketika kelas atau fungsi dipanggil menggunakan operator `new`.

```javascript
class Mobil {
  constructor(merk) {
    this.merk = merk;
  }
}

const MobilProxy = new Proxy(Mobil, {
  construct(target, args, newTarget) {
    console.log(`Membuat instance baru merk: ${args[0]}`);
    const instance = Reflect.construct(target, args, newTarget);
    instance.dibuatTahun = 2026;
    return instance;
  },
});

const m1 = new MobilProxy("Toyota");
console.log(m1); // Mobil { merk: 'Toyota', dibuatTahun: 2026 }
```

---

#### 7. Trap Iterasi Kunci: `ownKeys(target)`

Mencegat pengambilan daftar kunci saat diakses melalui `Object.keys()`, `Object.getOwnPropertyNames()`, atau perulangan `for...in`.

```javascript
const karyawan = { id: 101, nama: "Budi", gaji: 8000000 };

const proxyKaryawan = new Proxy(karyawan, {
  ownKeys(target) {
    // Sembunyikan properti 'gaji' dari perulangan publik:
    return Reflect.ownKeys(target).filter((key) => key !== "gaji");
  },
});

console.log(Object.keys(proxyKaryawan)); // ['id', 'nama'] (gaji tidak terlihat!)
```

---

#### 8. Trap Definisi Properti: `defineProperty(target, prop, descriptor)`

Mencegat pemanggilan `Object.defineProperty()`. Berguna untuk memvalidasi atribut descriptor yang ingin dipasang pada objek.

```javascript
const setting = {};

const proxySetting = new Proxy(setting, {
  defineProperty(target, prop, desc) {
    if (desc.writable === false) {
      console.log(`Properti ${String(prop)} dikunci menjadi read-only`);
    }
    return Reflect.defineProperty(target, prop, desc);
  },
});

Object.defineProperty(proxySetting, "VERSION", {
  value: "1.0",
  writable: false,
});
```

---

#### 9. Trap Baca Descriptor: `getOwnPropertyDescriptor(target, prop)`

Mencegat pembacaan konfigurasi deskriptor properti melalui `Object.getOwnPropertyDescriptor()`.

```javascript
const obj = { rahasia: "xyz" };

const proxyObj = new Proxy(obj, {
  getOwnPropertyDescriptor(target, prop) {
    const desc = Reflect.getOwnPropertyDescriptor(target, prop);
    if (desc && prop === "rahasia") {
      desc.enumerable = false; // Paksa jadi non-enumerable
    }
    return desc;
  },
});

console.log(Object.getOwnPropertyDescriptor(proxyObj, "rahasia").enumerable); // false
```

---

#### 10. Trap Baca Prototype: `getPrototypeOf(target)`

Mencegat operasi pembacaan prototype saat kode memanggil `Object.getPrototypeOf(proxy)` atau operator `instanceof`.

```javascript
const hewan = { berkakiEmpat: true };
const anjing = {};

const proxyAnjing = new Proxy(anjing, {
  getPrototypeOf(target) {
    console.log("[Sensor Prototype]");
    return hewan;
  },
});

console.log(Object.getPrototypeOf(proxyAnjing)); // { berkakiEmpat: true }
```

---

#### 11. Trap Ubah Prototype: `setPrototypeOf(target, prototype)`

Mencegat operasi pengubahan prototype melalui `Object.setPrototypeOf(proxy, proto)`.

```javascript
const targetProto = {};

const safeProtoProxy = new Proxy(targetProto, {
  setPrototypeOf(target, proto) {
    console.warn("Pengubahan prototype dicegat dan ditolak!");
    return false; // Tolak penggantian prototype
  },
});

// Reflect.setPrototypeOf(safeProtoProxy, {}); // false
```

---

#### 12. Trap Cek Ekstensi: `isExtensible(target)`

Mencegat pemeriksaan apakah objek masih dapat menerima penambahan properti baru (`Object.isExtensible(proxy)`).

```javascript
const objekKunci = {};

const proxyExt = new Proxy(objekKunci, {
  isExtensible(target) {
    console.log("Mengecek status ekstensi objek...");
    return Reflect.isExtensible(target);
  },
});

console.log(Object.isExtensible(proxyExt)); // true
```

---

#### 13. Trap Kunci Ekstensi: `preventExtensions(target)`

Mencegat operasi penguncian penambahan properti melalui `Object.preventExtensions(proxy)`.

```javascript
const mapel = { nama: "Fisika" };

const proxyLock = new Proxy(mapel, {
  preventExtensions(target) {
    console.log("Objek sedang dikunci secara permanen...");
    return Reflect.preventExtensions(target);
  },
});

Object.preventExtensions(proxyLock);
```

---

#### 14. Fitur Khusus: Pencabutan Akses Instan `Proxy.revocable(target, handler)`

Menghasilkan objek `{ proxy, revoke }` di mana izin akses ke target dapat **dicabut total seketika** kapan pun dibutuhkan:

```javascript
const tokenData = { secret: "API_KEY_RAHASIA" };
const { proxy, revoke } = Proxy.revocable(tokenData, {});

console.log(proxy.secret); // "API_KEY_RAHASIA"

// Cabut izin akses:
revoke();

// Panggilan berikutnya akan melempar TypeError:
// console.log(proxy.secret); // ❌ TypeError: Cannot perform 'get' on a proxy that has been revoked
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep 13 perangkap pencegat di atas, logging fungsi `apply`, pencegatan konstruktor `construct`, mutasi prototype, hingga pencabutan izin akses `Proxy.revocable()` dirangkum ke dalam satu script laboratorium terpadu:

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 03-standard-library/14-proxy/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Reaktivitas Framework Modern**: Vue.js 3 menggunakan `Proxy` untuk mendeteksi perubahan state secara otomatis dan me-render ulang UI seketika (_fine-grained reactivity_).
2. **State Management Vanilla JS (Capstone OmniStore Pro)**: Diimplementasikan di [`projects/omnistore-pro/src/state/store.js`](../../projects/omnistore-pro/src/state/store.js) sebagai Single Source of Truth yang otomatis reaktif. Objek asli `rawState` disembunyikan dan dibungkus Proxy. Setiap kali nilai state diubah (`state.cart = ...`), trap `set()` otomatis menyimpan data ke `localStorage` dan mengabari semua komponen UI yang berlangganan (_Subscriber_).
   - **Trik `state.cart = state.cart`**: Pada operasi mutasi internal Map (`cart.addItem(product)`), referensi variabel tidak berganti. Penugasan ulang `state.cart = state.cart` digunakan sebagai pemicu formal agar sensor trap `set` pada Proxy terbangun dan UI seketika terbarui.
3. **Validasi Skema Model Runtime**: Memastikan tipe data objek database atau formulir sesuai aturan sebelum disimpan ke database.
4. **Audit Logging & Analitik**: Merekam setiap kali fungsi atau properti sensitif dipanggil di sistem backend.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Lupa Return `true` pada Trap `set`**: Jika lupa mengembalikan boolean `true`, JavaScript di _strict mode_ akan melempar fatal error `TypeError: 'set' on proxy: trap returned falsish`.
- **Error Konversi Symbol pada Trap `get`**: Konkatenasi string implisit (`'pesan' + prop`) akan melempar `TypeError` jika properti bertipe Symbol (seperti `Symbol.toPrimitive`). Selalu gunakan `String(prop)`.
- **Bypass Objek Target Langsung**: Jika referensi ke objek target asli bocor ke luar, mutasi langsung (`target.prop = val`) tidak akan terdeteksi oleh Proxy. Selalu sembunyikan objek target asli.

### 🌟 Best Practice

- Gunakan `Proxy` bersamaan dengan `Reflect` bawaan JavaScript agar penanganan operasi default berjalan mulus dan mempertahankan konteks `receiver` yang benar.
- Lemparkan error deskriptif (`TypeError`, `RangeError`) pada trap `set` jika validasi gagal.
- Gunakan `Proxy.revocable()` untuk pertukaran data temporer yang membutuhkan jaminan pencabutan akses (_revocation guarantee_).

---

## 5. ✍️ Latihan Mandiri

1. Buat Proxy untuk objek `profil` yang mengonversi otomatis semua nilai string menjadi huruf kapital (_UPPERCASE_) setiap kali dibaca menggunakan trap `get`.
2. Buat Proxy validasi untuk objek `produk` yang menolak penambahan properti baru selain `['id', 'nama', 'harga']` menggunakan trap `set`.
3. Buat wrapper fungsi menggunakan trap `apply` yang mencatat durasi waktu eksekusi fungsi menggunakan `performance.now()`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [13 - RegExp](../13-regexp/README.md)
- ➡️ **Selanjutnya:** [15 - Reflect](../15-reflect/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
