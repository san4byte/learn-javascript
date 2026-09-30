# 📦 Modul 07: JavaScript Standard Library (PZN)

Selamat datang di **Modul 07**! JavaScript dilengkapi dengan pustaka standar bawaan (_Standard Library_) yang kaya akan objek global, tipe data primitif modern, utilitas manipulasi data, dan API metaprogramming. Modul ini mengikuti silabus mendalam **Programmer Zaman Now (PZN)** yang disempurnakan dengan standar spesifikasi ECMAScript dan MDN Web Docs terkini.

---

## 📚 Daftar Materi Pembelajaran:

1. [01 - Number](01-number/README.md)
   - Static properties (`MAX_VALUE`, `MIN_VALUE`, `MAX_SAFE_INTEGER`), validasi ketat `Number.isNaN()` dan `Number.isInteger()`, serta formatting `toLocaleString()` dan `toString(radix)`.
2. [02 - String](02-string/README.md)
   - Instance methods modern, pencarian substring (`includes`, `startsWith`, `endsWith`), pembersihan & padding (`trim`, `padStart`, `padEnd`), serta `replaceAll()`.
3. [03 - Array](03-array/README.md)
   - Struktur data antrean Queue (FIFO: `push` + `shift`), tumpukan Stack (LIFO: `push` + `pop`), pencarian predikat (`find`, `findIndex`), serta transformasi mendalam (`reduce`, `reduceRight`).
4. [04 - Object](04-object/README.md)
   - Static methods bawaan kelas `Object`: proteksi integritas (`Object.freeze()` vs `Object.seal()`), penggabungan objek (`Object.assign()`), serta inspeksi (`keys`, `values`, `entries`, `getOwnPropertyNames`).
5. [05 - JSON](05-json/README.md)
   - Serialisasi (`JSON.stringify`) dan deserialisasi (`JSON.parse`), penyaringan properti via _Replacer_, formatting _pretty print_, dan konversi objek tanggal otomatis via fungsi _Reviver_.
6. [06 - BigInt](06-bigint/README.md)
   - Penanganan bilangan bulat presisi arbitrer di atas $2^{53} - 1$, sufiks literal `n`, fungsi `BigInt()`, serta batasan operasi dengan tipe Number biasa.
7. [07 - Date](07-date/README.md)
   - Penanggalan dan waktu berbasis Unix Epoch Timestamp, parsing standar internasional ISO 8601, aturan bulan 0-indexed, serta method Getter & Setter.
8. [08 - Math](08-math/README.md)
   - Namespace statis konstanta matematika (`Math.PI`, `Math.E`), 4 ragam pembulatan (`round`, `floor`, `ceil`, `trunc`), min/max, dan randomisasi angka (khusus tipe Number).
9. [09 - Boolean](09-boolean/README.md)
   - Tipe primitif vs objek wrapper `Boolean`, evaluasi Truthy/Falsy, operator double negation (`!!`), serta bahaya fatal `new Boolean(false)`.
10. [10 - Map](10-map/README.md)
    - Koleksi kunci-nilai modern dengan sembarang tipe data sebagai kunci, properti `size`, operasi instan (`set`, `get`, `has`, `delete`, `clear`), dan perbandingannya dengan Object biasa.
11. [11 - Set](11-set/README.md)
    - Himpunan koleksi nilai unik tanpa duplikasi, pencarian kilat $O(1)$ (`has`), dan trik industri eliminasi duplikasi array instan via Spread Operator (`[...new Set(arr)]`).
12. [12 - Symbol](12-symbol/README.md)
    - Tipe data primitif beridentitas unik 100%, pembuatan kunci objek tersembunyi (_non-enumerable_), serta Global Symbol Registry (`Symbol.for()` dan `Symbol.keyFor()`).
13. [13 - RegExp](13-regexp/README.md)
    - Pola pencocokan teks tingkat lanjut, modifiers (`i`, `g`, `m`), assertions, character classes (`\d`, `\w`, `\s`), groups, quantifiers, method RegExp (`test`, `exec`), dan method String terkait (`match`, `replace`, `split`).
14. [14 - Proxy](14-proxy/README.md)
    - Konsep metaprogramming tingkat lanjut: membungkus objek dan mencegat operasi dasar menggunakan handler trap `get` dan `set` untuk validasi otomatis dan logging.
15. [15 - Reflect](15-reflect/README.md)
    - Namespace refleksi JavaScript modern berorientasi return boolean (`get`, `set`, `has`, `deleteProperty`), dan integrasi pasangan ideal di dalam Proxy trap.
16. [16 - URL Encoding](16-encode/README.md)
    - Standardisasi pengiriman data web: perbedaan krusial `encodeURI()` untuk seluruh alamat URL vs `encodeURIComponent()` untuk parameter query string, serta pasangan fungsi decoding-nya.
17. [17 - Base64](17-base64/README.md)
    - Encoding biner ke string teks ASCII via `btoa()` dan `atob()`, batasan rentang Latin-1, dan solusi penanganan string UTF-8 Unicode / Emoji modern.
18. [18 - Eval](18-eval/README.md)
    - Evaluasi eksekusi string kode dinamis, analisis risiko fatal keamanan (XSS / Code Injection) dan performa V8 engine, serta alternatif arsitektur yang aman (Lookup Table & JSON).

---

## 🛠️ Cara Menjalankan Kode

Setiap sub-folder telah dilengkapi dengan:

- `README.md`: Penjelasan konsep komprehensif, analogi dunia nyata, real-world use case, common pitfalls, best practice, dan latihan mandiri.
- `contoh.js`: Berkas tempat pengerjaan dan pengujian latihan kode (dapat dijalankan via Node.js: `node contoh.js`).
- `index.html`: Antarmuka HTML modern untuk menjalankan skrip langsung di browser via DevTools Console (tekan `F12`).

---

## 🧭 Navigasi

- ⬅️ **Modul Sebelumnya:** [06 - Modern Web API & Real-World JS](../06-modern-web-api/README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../README.md)
