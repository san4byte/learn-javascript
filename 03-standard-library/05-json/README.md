# 05 - JSON (JavaScript Object Notation: Serialize, Deserialize, Replacer, dan Reviver)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami format pertukaran data standar industri: JSON (JavaScript Object Notation).
> * **Kapan Digunakan**: Menguasai serialisasi objek JavaScript menjadi string JSON dengan `JSON.stringify()`.
> * **Aturan Praktis**: Selalu bungkus pemanggilan `JSON.parse()` di dalam blok `try...catch` untuk mengantisipasi data string yang rusak atau korup dari server/storage.

## 1. 🎯 Tujuan Belajar

- Memahami format pertukaran data standar industri: JSON (JavaScript Object Notation).
- Menguasai serialisasi objek JavaScript menjadi string JSON dengan `JSON.stringify()`.
- Menguasai deserialisasi string JSON menjadi objek JavaScript dengan `JSON.parse()`.
- Memahami parameter lanjutan: fungsi **Replacer** dan format indentasi pada stringify, serta fungsi **Reviver** pada parse.
- Mengetahui cara kerja method kustom `toJSON()`.

---

## 2. 📖 Penjelasan Konsep & Referensi Lengkap

### 🎭 Analogi Dunia Nyata
> JSON seperti **kontainer kargo kapal laut**: barang-barang mewah di rumah Anda (objek JS lengkap dengan fungsi dan memorinya) harus dibongkar dan dikemas ke dalam kotak kardus datar tersegel (teks JSON string) agar bisa dikirim menyeberangi samudra internet. Saat sampai di tujuan, pihak penerima membuka segel kardus dan merakitnya kembali menjadi perabot fisik (`JSON.parse`).

**JSON (JavaScript Object Notation)** adalah format pertukaran data berbasis teks standar terbuka yang ringan, independen dari bahasa pemrograman, dan mudah dibaca manusia maupun mesin. Di JavaScript, objek global bawaan **`JSON`** menyediakan API esensial untuk transformasi data:

### Tabel Referensi API `JSON`

| Method / Fitur | Parameter | Tipe Return | Penjelasan & Contoh Singkat |
| :--- | :--- | :--- | :--- |
| `JSON.stringify()` | `(value, [replacer], [space])` | `string` | Mengubah nilai/objek JS menjadi string JSON. Mendukung filtering & indentasi. |
| `JSON.parse()` | `(text, [reviver])` | `any` (Object/Array/primitif) | Mem-parsing string JSON valid menjadi struktur data JavaScript asli. |
| `toJSON()` | `()` | `any` | Method khusus pada objek/class yang otomatis dipanggil oleh `JSON.stringify()` untuk kustomisasi hasil serialisasi. |

---

### Komponen Parameter Lanjutan

#### 1. Replacer (`JSON.stringify`)
Dapat berupa:
- **Array of Strings/Numbers**: Bertindak sebagai *whitelist* properti yang diizinkan masuk ke output string JSON.
- **Fungsi `(key, value) => any`**: Berjalan untuk setiap key-value (termasuk root objek di awal dengan `key: ""`). Jika me-return `undefined`, properti tersebut dihilangkan.

#### 2. Space Indentasi (`JSON.stringify`)
- Berupa angka (misal: `2` atau `4`) atau karakter string (misal: `"\t"`).
- Digunakan untuk menghasilkan output rapi bertingkat (*pretty print*), sangat ideal untuk logging atau penulisan file konfigurasi.

#### 3. Reviver (`JSON.parse`)
- Fungsi `(key, value) => any` yang berjalan pada setiap pasangan properti hasil deserialisasi.
- Sangat berguna untuk mengubah kembali string ISO 8601 menjadi objek `Date` asli, atau memodifikasi nilai primitif saat objek direkonstruksi.

---

### Perbandingan Tipe Data: Didukung vs Tidak Didukung

| Tipe Data | Status di JSON | Perilaku Saat `JSON.stringify()` |
| :--- | :--- | :--- |
| `String`, `Number`, `Boolean`, `null` | ✅ Didukung penuh | Dikonversi persis sesuai representasi JSON. |
| `Object` (Plain `{}`) & `Array` (`[]`) | ✅ Didukung penuh | Direpresentasikan rekursif menjadi `{ ... }` atau `[ ... ]`. |
| `Date` | ⚠️ Terserialisasi ke String | Otomatis diubah ke string ISO 8601 (`toISOString()`), bukan tipe objek khusus JSON. |
| `undefined` | ❌ Tidak didukung | Dihapus jika berada di dalam objek, diubah menjadi `null` jika di dalam array. |
| `Function` / Method | ❌ Tidak didukung | Dihapus / diabaikan sepenuhnya. |
| `Symbol` | ❌ Tidak didukung | Dihapus / diabaikan sepenuhnya. |
| `BigInt` | ❌ Tidak didukung bawaan | Melempar error `TypeError: Do not know how to serialize a BigInt` (kecuali didefinisikan `toJSON`). |
| Circular Reference (Objek sirkular) | ❌ Dilarang | Melempar error `TypeError: Converting circular structure to JSON`. |

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Serialisasi Objek ke JSON (Filtering Replacer & Indentasi) ---');
const transaksi = {
  id: 'TRX-001',
  total: 150000,
  status: 'LUNAS',
  pinRahasia: 1234,
  waktu: '2026-10-02T10:00:00.000Z'
};

// Filter data: sembunyikan 'pinRahasia' dengan menyertakan whitelist properti, indentasi 2 spasi
const jsonString = JSON.stringify(transaksi, ['id', 'total', 'status', 'waktu'], 2);
console.log('Hasil stringify (Pretty Print):');
console.log(jsonString);

console.log('\n--- 2. Deserialisasi JSON ke Objek (Reviver Tanggal) ---');
// Parse kembali teks JSON dengan reviver untuk merekonstruksi objek Date asli
const transaksiBaru = JSON.parse(jsonString, (key, val) => {
  if (key === 'waktu') {
    return new Date(val);
  }
  return val;
});

console.log('Hasil parse objek         :', transaksiBaru);
console.log('Apakah waktu berupa Date? :', transaksiBaru.waktu instanceof Date);
console.log('Tahun transaksi           :', transaksiBaru.waktu.getFullYear());
console.log('Format tanggal lokal      :', transaksiBaru.waktu.toLocaleDateString('id-ID'));
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Serialisasi Objek ke JSON (Filtering Replacer & Indentasi) ---
Hasil stringify (Pretty Print):
{
  "id": "TRX-001",
  "total": 150000,
  "status": "LUNAS",
  "waktu": "2026-10-02T10:00:00.000Z"
}

--- 2. Deserialisasi JSON ke Objek (Reviver Tanggal) ---
Hasil parse objek         : {
  id: 'TRX-001',
  total: 150000,
  status: 'LUNAS',
  waktu: 2026-10-02T10:00:00.000Z
}
Apakah waktu berupa Date? : true
Tahun transaksi           : 2026
Format tanggal lokal      : 2/10/2026
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **Komunikasi REST API**: Format standar pengiriman payload request (`fetch('/api/user', { body: JSON.stringify(data) })`) dan penerimaan respons JSON.
2. **Penyimpanan Web Storage**: Menyimpan objek array ke `localStorage` yang hanya mendukung format string.
3. **File Konfigurasi**: Standar file konfigurasi modern seperti `package.json` dan `tsconfig.json`.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Sintaks JSON tidak valid**: Key di dalam JSON **wajib** menggunakan tanda kutip ganda `"key"`. Menggunakan kutip tunggal `'key'` atau trailing comma di akhir objek akan menyebabkan `SyntaxError: Unexpected token` saat di-parse.
* **Data tanggal menjadi string**: Saat objek memuat instance `Date`, `JSON.stringify` mengubahnya menjadi string ISO. Saat di-parse kembali dengan `JSON.parse()`, ia tetap berupa string biasa, bukan objek `Date`, kecuali Anda menggunakan fungsi *Reviver*.
* **Data fungsi dan undefined hilang**: Properti bernilai `undefined` atau fungsi tidak akan ikut disimpan di dalam JSON.

### 🌟 Best Practice
* Selalu bungkus pemanggilan `JSON.parse()` di dalam blok `try...catch` untuk mengantisipasi data string yang rusak atau korup dari server/storage.
* Manfaatkan parameter ketiga `space` pada `JSON.stringify(data, null, 2)` saat mencetak log debugging agar mudah dibaca di konsol.
* Gunakan parameter *replacer* untuk menyembunyikan properti sensitif seperti password sebelum objek diserialisasi.

---

## 6. ✍️ Latihan Mandiri
1. Buat fungsi `sensorDataSensitif(userObj)` yang mengubah objek pengguna menjadi string JSON rapi, namun otomatis menghapus properti `password` dan `pin` menggunakan fungsi *Replacer*.
2. Tulis fungsi `parseAman(jsonString, fallbackValue)` yang mencoba mem-parse string JSON dengan `try...catch`. Jika gagal, fungsi tidak melempar error melainkan mengembalikan nilai default `fallbackValue`.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [04 - Object](../04-object/README.md)
- ➡️ **Selanjutnya:** [06 - BigInt](../06-bigint/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
