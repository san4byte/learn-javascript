# 📚 Modul 03: JavaScript Standard Library

Selamat datang di **Modul 03**! JavaScript Standard Library mencakup objek bawaan global (_built-in standard objects_), tipe primitif modern, penanganan data waktu, koleksi modern, dan kemampuan metaprogramming tingkat lanjut. Modul ini disusun secara komprehensif dan mendalam.

---

## 📚 Daftar Materi Pembelajaran:

1. [01 - Number](01-number/README.md)
   - Static properties (`MAX_VALUE`, `MIN_SAFE_INTEGER`, `EPSILON`), parsing angka (`parseInt`, `parseFloat`), dan validasi numerik aman (`isNaN`, `isInteger`, `isFinite`).
2. [02 - String](02-string/README.md)
   - Metode instansiasi teks: manipulasi ukuran teks, pencarian indeks, pemotongan (`slice`, `substring`), penggantian (`replace`, `replaceAll`), padding (`padStart`, `padEnd`), dan pemecahan string (`split`).
3. [03 - Array](03-array/README.md)
   - Struktur data antrean (Queue FIFO via `shift`/`push`), tumpukan (Stack LIFO via `pop`/`push`), pencarian (`find`, `findIndex`, `includes`), dan transformasi data modern (`filter`, `map`, `reduce`).
4. [04 - Object](04-object/README.md)
   - Manajemen integritas data dan manipulasi kunci-nilai: `Object.freeze()` (imutable total), `Object.seal()`, `Object.assign()`, serta ekstraksi `keys()`, `values()`, dan `entries()`.
5. [05 - JSON](05-json/README.md)
   - Pertukaran data standar web: serialisasi (`JSON.stringify()`) dengan fungsi replacer dan format indentasi, serta deserialisasi (`JSON.parse()`) dengan fungsi reviver rekursif.
6. [06 - BigInt](06-bigint/README.md)
   - Representasi integer presisi tak hingga untuk mengatasi limitasi 64-bit IEEE 754, penanganan ID transaksi finansial skala besar, dan aturan konversi tipe data eksplisit.
7. [07 - Date](07-date/README.md)
   - Penanganan waktu dan tanggal: Epoch Unix Timestamp (milidetik sejak 1 Jan 1970), parsing format ISO 8601, metode Getter & Setter waktu lokal vs UTC, serta perhitungan selisih durasi.
8. [08 - Math](08-math/README.md)
   - Objek statis operasi matematika: konstanta (`PI`, `E`), teknik pembulatan (`floor`, `ceil`, `round`, `trunc`), nilai mutlak, perpangkatan, trigonometri, dan angka acak terdistribusi.
9. [09 - Boolean](09-boolean/README.md)
   - Objek pembungkus primitif logika: perbedaan krusial antara tipe primitif `boolean` dengan instansiasi `new Boolean()`, konversi objek ke primitif (`valueOf`), dan stringifikasi.
10. [10 - Map](10-map/README.md)
    - Koleksi pasangan key-value berurutan modern: mendukung kunci bertipe data apapun (termasuk Object dan Function), performa tinggi penambahan/penghapusan, dan properti `size`.
11. [11 - Set](11-set/README.md)
    - Koleksi nilai unik berurutan: teknik eliminasi duplikasi array otomatis, operasi himpunan (Union, Intersection, Difference), dan metode `has()`, `add()`, `delete()`.
12. [12 - Symbol](12-symbol/README.md)
    - Tipe data primitif unik dan tidak dapat diubah: pembuatan pengenal unik untuk properti objek, pencegahan tabrakan kunci (property collision), dan Global Symbol Registry (`Symbol.for`, `Symbol.keyFor`).
13. [13 - RegExp](13-regexp/README.md)
    - Validasi teks dan pencocokan pola: konstruksi pola regex, flags (`g`, `i`, `m`), karakter set, kuantifier, assertions, serta metode pengujian (`test`, `exec`, `match`, `search`).
14. [14 - Proxy](14-proxy/README.md)
    - Metaprogramming dan interceptor: mencegat operasi internal objek melalui handler traps (`get`, `set`, `has`, `deleteProperty`), validasi tipe data runtime otomatis, dan observabilitas mutasi.
15. [15 - Reflect](15-reflect/README.md)
    - API refleksi objek modern standar ES6: alternatif terstandarisasi untuk memanggil operasi internal objek secara konsisten, pasangan ideal interceptor Proxy, dan penanganan return value boolean.
16. [16 - URL Encoding](16-encode/README.md)
    - Standardisasi pengiriman data web: perbedaan krusial `encodeURI()` untuk seluruh alamat URL vs `encodeURIComponent()` untuk parameter query string, serta pasangan fungsi decoding-nya.
17. [17 - Base64](17-base64/README.md)
    - Encoding biner ke string teks ASCII via `btoa()` dan `atob()`, batasan rentang Latin-1, dan solusi penanganan string UTF-8 Unicode / Emoji modern.
18. [18 - Eval](18-eval/README.md)
    - Evaluasi eksekusi string kode dinamis, analisis risiko fatal keamanan (XSS / Code Injection) dan performa V8 engine, serta alternatif arsitektur yang aman (Lookup Table & JSON).

---

## 🛠️ Cara Menjalankan Kode

Setiap sub-folder telah dilengkapi dengan `README.md` dan `example.js`. Seluruh kode berjalan murni di Node.js:

```bash
node 03-standard-library/01-number/example.js
node 03-standard-library/10-map/example.js
```

---

## 🧭 Navigasi

- ⬅️ **Modul Sebelumnya:** [02 - JavaScript OOP](../02-oop/README.md)
- ➡️ **Modul Selanjutnya:** [04 - JavaScript Modules](../04-modules/README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../README.md)
