# 05 - JSON (JavaScript Object Notation: Serialize, Deserialize, Replacer, dan Reviver)

## 1. 🎯 Tujuan Belajar
- Memahami format pertukaran data standar industri: JSON (JavaScript Object Notation).\n- Menguasai serialisasi objek JavaScript menjadi string JSON dengan `JSON.stringify()`.\n- Menguasai deserialisasi string JSON menjadi objek JavaScript dengan `JSON.parse()`.\n- Memahami parameter canggih: fungsi **Replacer** dan format indentasi pada stringify, serta fungsi **Reviver** pada parse.

---

## 2. 📖 Penjelasan Konsep
**JSON (JavaScript Object Notation)** adalah format pertukaran data berbasis teks standar terbuka yang ringan dan mudah dibaca manusia maupun mesin. Di JavaScript, objek global bawaan **`JSON`** menyediakan dua method utama: `JSON.stringify` dan `JSON.parse`.

### 1. `JSON.stringify(value, [replacer], [space])`
Mengonversi objek atau nilai JavaScript menjadi string teks JSON.
* **`value`**: Objek/data yang ingin diubah menjadi string JSON.
* **`replacer`**: Opsional. Berupa array properti yang diizinkan untuk disertakan, atau fungsi filter/transformasi `(key, value) => modifiedValue`.
* **`space`**: Opsional. Jumlah spasi indentasi (misal `2`) untuk menghasilkan format teks yang rapi dan mudah dibaca (*pretty print*).

### 2. `JSON.parse(text, [reviver])`
Menganalisis string JSON dan merekonstruksinya kembali menjadi nilai atau objek JavaScript.
* **`text`**: String JSON yang valid (harus memakai tanda kutip ganda `"` untuk key dan string).
* **`reviver`**: Opsional. Fungsi transformasi `(key, value) => modifiedValue` yang dieksekusi pada setiap pasangan key-value sebelum hasil akhir dikembalikan (sangat berguna untuk mengonversi string ISO tanggal kembali menjadi objek `Date`).

### 3. Tipe Data yang Tidak Didukung JSON
JSON adalah format data murni, sehingga tidak mendukung:
* `undefined` (akan dihapus dari objek atau menjadi `null` di dalam array).
* `Function` / Method (akan diabaikan dan dihapus).
* `Symbol` (diabaikan).
* Nilai sirkular (*circular reference* akan melempar fatal error `TypeError: Converting circular structure to JSON`).

---

## 3. 💻 Contoh Kode (`contoh.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Dasar JSON.stringify & JSON.parse ---");
const dataUser = {
  id: 101,
  nama: "Joko Santoso",
  email: "joko@example.com",
  isVerified: true,
  tags: ["javascript", "developer"]
};

// Serialisasi ke String JSON
const jsonString = JSON.stringify(dataUser);
console.log("Tipe data jsonString :", typeof jsonString);
console.log("Hasil stringify      :", jsonString);

// Deserialisasi kembali ke Objek JavaScript
const userObj = JSON.parse(jsonString);
console.log("Kembali jadi objek   :", userObj.nama, "(ID:", userObj.id + ")");

console.log("\n--- 2. Pretty Print & Replacer Array (Filtering Properti) ---");
// Hanya menyertakan 'nama' dan 'email', diformat dengan indentasi 2 spasi
const jsonRapi = JSON.stringify(dataUser, ["nama", "email"], 2);
console.log("Pretty Print Terfilter:\n" + jsonRapi);

console.log("\n--- 3. Reviver Parameter pada JSON.parse (Konversi Tanggal Otomatis) ---");
const jsonDenganTanggal = JSON.stringify({
  transaksiId: "TRX-9988",
  total: 500000,
  waktu: new Date().toISOString()
});
console.log("String JSON mentah   :", jsonDenganTanggal);

// Gunakan reviver untuk mengembalikan string ISO kembali menjadi instance Date
const parsedTransaksi = JSON.parse(jsonDenganTanggal, (key, value) => {
  if (key === "waktu") {
    return new Date(value); // ubah string tanggal jadi objek Date asli
  }
  return value;
});

console.log("Tipe properti waktu  :", typeof parsedTransaksi.waktu);
console.log("Tahun transaksi      :", parsedTransaksi.waktu.getFullYear());
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Dasar JSON.stringify & JSON.parse ---
Tipe data jsonString : string
Hasil stringify      : {"id":101,"nama":"Joko Santoso","email":"joko@example.com","isVerified":true,"tags":["javascript","developer"]}
Kembali jadi objek   : Joko Santoso (ID: 101)

--- 2. Pretty Print & Replacer Array (Filtering Properti) ---
Pretty Print Terfilter:
{
  "nama": "Joko Santoso",
  "email": "joko@example.com"
}

--- 3. Reviver Parameter pada JSON.parse (Konversi Tanggal Otomatis) ---
String JSON mentah   : {"transaksiId":"TRX-9988","total":500000,"waktu":"2026-09-30T13:50:00.000Z"}
Tipe properti waktu  : object
Tahun transaksi      : 2026
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> JSON seperti **kontainer kargo kapal laut**: barang-barang mewah di rumah Anda (objek JS lengkap dengan fungsi dan memorinya) harus dibongkar dan dikemas ke dalam kotak kardus datar tersegel (teks JSON string) agar bisa dikirim menyeberangi samudra internet. Saat sampai di tujuan, pihak penerima membuka segel kardus dan merakitnya kembali menjadi perabot fisik (`JSON.parse`).

### 🏢 Real-World Use Case
1. **Komunikasi REST API**: Format standar pengiriman payload request (`fetch('/api/user', { body: JSON.stringify(data) })`) dan penerimaan respons JSON.\n2. **Penyimpanan Web Storage**: Menyimpan objek array ke `localStorage` yang hanya mendukung format string.\n3. **File Konfigurasi**: Standar file konfigurasi modern seperti `package.json` dan `tsconfig.json`.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Sintaks JSON tidak valid**: Key di dalam JSON **wajib** menggunakan tanda kutip ganda `"key"`. Menggunakan kutip tunggal `'key'` atau trailing comma di akhir objek akan menyebabkan `SyntaxError: Unexpected token` saat di-parse.\n* **Data tanggal menjadi string**: Saat objek memuat instance `Date`, `JSON.stringify` mengubahnya menjadi string ISO. Saat di-parse kembali dengan `JSON.parse()`, ia tetap berupa string biasa, bukan objek `Date`, kecuali Anda menggunakan fungsi *Reviver*.\n* **Data fungsi dan undefined hilang**: Properti bernilai `undefined` atau fungsi tidak akan ikut disimpan di dalam JSON.

### 🌟 Best Practice
* Selalu bungkus pemanggilan `JSON.parse()` di dalam blok `try...catch` untuk mengantisipasi data string yang rusak atau korup dari server/storage.\n* Manfaatkan parameter ketiga `space` pada `JSON.stringify(data, null, 2)` saat mencetak log debugging agar mudah dibaca di konsol.\n* Gunakan parameter *replacer* untuk menyembunyikan properti sensitif seperti password sebelum objek diserialisasi.

---

## 6. ✍️ Latihan Mandiri
1. Buat fungsi `sensorDataSensitif(userObj)` yang mengubah objek pengguna menjadi string JSON rapi, namun otomatis menghapus properti `password` dan `pin` menggunakan fungsi *Replacer*.\n2. Tulis fungsi `parseAman(jsonString, fallbackValue)` yang mencoba mem-parse string JSON dengan `try...catch`. Jika gagal, fungsi tidak melempar error melainkan mengembalikan nilai default `fallbackValue`.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [04 - Object](../04-object/README.md)\n- ➡️ **Selanjutnya:** [06 - BigInt](../06-bigint/README.md)\n- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)\n- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
