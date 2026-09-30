# 14 - Proxy (Metaprogramming, Interceptor Handler, Get dan Set Traps)

## 1. 🎯 Tujuan Belajar

- Memahami konsep **Metaprogramming** di JavaScript menggunakan objek `Proxy`.\n- Mampu membuat Proxy dengan mengikat objek target dan objek handler (`new Proxy(target, handler)`).\n- Menguasai perangkap pencegat (_traps_): trap **`get`** untuk membaca data dan trap **`set`** untuk memvalidasi penulisan properti.\n- Mampu menerapkan use-case nyata seperti validasi data otomatis, _property masking_, dan pencatatan log akses objek.

---

## 2. 📖 Penjelasan Konsep

**`Proxy`** adalah fitur tingkat lanjut di JavaScript (ES6) yang memungkinkan kita membungkus (_wrap_) suatu objek target dan mencegat (_intercept_) operasi mendasar objek tersebut, seperti pembacaan properti (_get_), penulisan properti (_set_), penghapusan properti (_delete_), hingga pemanggilan fungsi (_apply_).

### 1. Anatomi Proxy

```javascript
const proxy = new Proxy(target, handler);
```

- **`target`**: Objek asli yang ingin dibungkus atau dilindungi.
- **`handler`**: Objek berisi fungsi-fungsi pencegat (_traps_) yang akan dijalankan setiap kali operasi pada target dipicu.

### 2. Kumpulan Traps Lengkap pada Handler

| Trap                                        | Operasi yang Dicegat                                                                      |
| :------------------------------------------ | :---------------------------------------------------------------------------------------- |
| **`get(target, prop, receiver)`**           | Pembacaan properti: `proxy.prop` atau `proxy['prop']`                                     |
| **`set(target, prop, val, receiver)`**      | Penulisan nilai properti: `proxy.prop = val`                                              |
| **`has(target, prop)`**                     | Pemeriksaan keberadaan properti: `'prop' in proxy`                                        |
| **`deleteProperty(target, prop)`**          | Penghapusan properti: `delete proxy.prop`                                                 |
| **`apply(target, thisArg, argList)`**       | Pemanggilan jika target berupa function: `proxyFunc(...args)`                             |
| **`construct(target, argList, newTarget)`** | Pembuatan instance dengan keyword new: `new proxyClass()`                                 |
| **`ownKeys(target)`**                       | Pengambilan kunci properti: `Object.keys(proxy)` atau `Object.getOwnPropertyNames(proxy)` |
| **`defineProperty(target, prop, desc)`**    | Pendefinisian properti: `Object.defineProperty(proxy, ...)`                               |

### 3. Fitur Khusus: `Proxy.revocable(target, handler)`

Menghasilkan objek `{ proxy, revoke }` di mana Proxy dapat dicabut aksesnya kapan saja dengan memanggil fungsi `revoke()`. Setelah `revoke()` dipanggil, setiap interaksi lanjutan ke proxy akan langsung melempar `TypeError: Cannot perform 'get' on a proxy that has been revoked`. Sangat berguna untuk pengamanan memori dan izin akses temporer.

---

## 3. 💻 Contoh Kode (`contoh.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Dasar Pembuatan Proxy & Interceptor get ---');
const targetPengguna = {
  nama: 'Joko Santoso',
  kota: 'Jakarta',
};

const handlerBacaAman = {
  get(target, property) {
    if (property in target) {
      return target[property];
    }
    // Jika properti tidak ada, kembalikan nilai default ramah (bukan undefined)
    return `[Peringatan: Properti '${String(property)}' tidak ditemukan!]`;
  },
};

const proxyPengguna = new Proxy(targetPengguna, handlerBacaAman);
console.log('Akses properti ada   :', proxyPengguna.nama);
console.log('Akses properti gaib  :', proxyPengguna.alamat);

console.log('\n--- 2. Validasi Penulisan Data dengan Interceptor set ---');
const rekeningBank = {
  nomorRekening: '123-456-789',
  saldo: 1000000,
};

const handlerValidasi = {
  set(target, property, value) {
    if (property === 'saldo') {
      if (typeof value !== 'number' || isNaN(value)) {
        throw new TypeError('Saldo harus berupa angka valid!');
      }
      if (value < 0) {
        throw new RangeError('Saldo tidak boleh bernilai negatif!');
      }
    }
    console.log(`[LOG AUDIT]: Memperbarui properti '${property}' menjadi ${value}`);
    target[property] = value;
    return true; // Wajib me-return true menandakan operasi berhasil
  },
};

const proxyRekening = new Proxy(rekeningBank, handlerValidasi);

// Uji coba pengisian saldo yang valid:
proxyRekening.saldo = 1500000;
console.log('Saldo rekening saat ini:', proxyRekening.saldo);

// Uji coba pengisian data yang salah (validasi bekerja):
try {
  proxyRekening.saldo = -50000; // Memicu RangeError
} catch (err) {
  console.error('GAGAL UPDATE:', err.message);
}
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Dasar Pembuatan Proxy & Interceptor get ---
Akses properti ada   : Joko Santoso
Akses properti gaib  : [Peringatan: Properti 'alamat' tidak ditemukan!]

--- 2. Validasi Penulisan Data dengan Interceptor set ---
[LOG AUDIT]: Memperbarui properti 'saldo' menjadi 1500000
Saldo rekening saat ini: 1500000
GAGAL UPDATE: Saldo tidak boleh bernilai negatif!
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata

> `Proxy` seperti **resepsionis atau satpam di lobi kantor gedung direksi**: orang luar tidak boleh langsung masuk menyelonong ke meja direktur (objek target). Tamu harus lewat satpam terlebih dahulu; satpam akan memeriksa identitas tamu, memeriksa apakah barang yang dibawa aman (validasi `set`), dan jika tamu mencari ruangan yang tidak ada, satpam memberikan petunjuk sopan (default fallback `get`).

### 🏢 Real-World Use Case

1. **Reaktivitas Framework Modern**: Vue.js 3 menggunakan `Proxy` untuk mendeteksi perubahan state secara otomatis dan me-render ulang UI seketika (_fine-grained reactivity_).\n2. **Validasi Skema Model Runtime**: Memastikan tipe data objek database atau formulir sesuai aturan sebelum disimpan.\n3. **Audit Logging & Analitik**: Merekam setiap kali fungsi atau properti sensitif dipanggil di sistem backend.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Lupa me-return `true` pada trap `set`**: Jika Anda lupa menulis `return true` di dalam trap `set`, JavaScript akan menganggap mutasi gagal dan melempar error `TypeError: 'set' on proxy: trap returned falsish` di strict mode.\n* **Bypass Proxy dengan memanggil objek Target langsung**: Jika seseorang memegang referensi ke objek target asli (`target.saldo = -5000`), proteksi Proxy tidak akan berjalan. Pastikan referensi ke target asli disembunyikan.\n* **Overhead Performa**: Karena setiap pembacaan dan penulisan melewati fungsi pencegat, penggunaan Proxy berlebihan pada loop matematika intensif dapat menurunkan performa CPU.

### 🌟 Best Practice

- Gunakan Proxy bersamaan dengan `Reflect` bawaan JavaScript agar penanganan operasi default berjalan mulus dan standar.\n* Selalu lemparkan error deskriptif (`TypeError`, `RangeError`) pada trap `set` jika validasi tidak lolos.\n* Gunakan fungsi pembantu factory `createReactiveObject(target)` untuk membungkus objek secara terisolasi.

---

## 6. ✍️ Latihan Mandiri

1. Buatlah Proxy pada objek `profil` yang mengonversi otomatis semua nilai string menjadi huruf kapital (_UPPERCASE_) setiap kali dibaca menggunakan trap `get`.\n2. Buatlah Proxy validasi untuk objek `produk` yang menolak penambahan properti baru selain `['id', 'nama', 'harga']`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [13 - RegExp](../13-regexp/README.md)\n- ➡️ **Selanjutnya:** [15 - Reflect](../15-reflect/README.md)\n- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)\n- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
