# 🚀 Panduan Belajar JavaScript (Learn JS)

Selamat datang di repositori dokumentasi belajar JavaScript lengkap! Repositori ini dirancang dengan alur pembelajaran yang terstruktur, rapi, dan mudah dipahami, mulai dari fondasi dasar logika pemrograman & sintaks modern ES6+, manipulasi DOM di browser, pemrograman asinkron berbasis Event Loop & Promise, build tools modular industri, Pemrograman Berorientasi Objek (OOP), hingga Web API esensial standar industri.

Setiap topik materi dilengkapi dengan file dokumentasi terstandarisasi (`README.md`) dengan **7 bagian pembelajaran** (Tujuan Belajar, Penjelasan Konsep Mendalam, Contoh Kode, Output yang Diharapkan, Analogi Nyata + Use Case + Common Pitfalls + Best Practice, Latihan Mandiri, dan Navigasi 4 Arah), contoh kode bersih dan universal (`contoh.js`), serta file antarmuka browser (`index.html`).

---

## 📚 Daftar Isi dan Urutan Belajar

### 1. [01 - JavaScript Dasar & Modern ES6+](01-dasar/)

Fondasi logika pemrograman, sintaks dasar, dan fitur modern ES6+ yang terintegrasi:

1. [01 - Popup Box (alert, prompt, confirm)](01-dasar/01-popup-box/README.md)
2. [02 - Variabel dan Scope (var, let, const, Hoisting & TDZ)](01-dasar/02-variabel-dan-scope/README.md)
3. [03 - Template Literals & String Interpolation](01-dasar/03-template-literals/README.md)
4. [04 - Pengulangan (Looping)](01-dasar/04-pengulangan/)
   - [04.1 - While Loop & Do-While](01-dasar/04-pengulangan/01-while/README.md)
   - [04.2 - For Loop](01-dasar/04-pengulangan/02-for/README.md)
   - [04.3 - Pengulangan Bersarang (Nested Loops)](01-dasar/04-pengulangan/03-pengulangan-bersarang/README.md)
   - [04.4 - Perulangan Modern: For..of dan For..in](01-dasar/04-pengulangan/04-for-of-for-in/README.md)
5. [05 - Pengkondisian (Conditional Flow)](01-dasar/05-pengkondisian/)
   - [05.1 - If Else dan Ternary Operator](01-dasar/05-pengkondisian/01-if-else/README.md)
   - [05.2 - Else If dan Switch Case](01-dasar/05-pengkondisian/02-else-if-switch/README.md)
6. [06 - Project Simulasi Pengelolaan Angkot](01-dasar/06-project-angkot/README.md)
7. [07 - Function](01-dasar/07-function/)
   - [07.1 - Pengenalan Function](01-dasar/07-function/01-intro/README.md)
   - [07.2 - Parameter, Argumen & Default Parameter](01-dasar/07-function/02-parameter-argumen/README.md)
   - [07.3 - Variable Scope dan Scope Chain](01-dasar/07-function/03-scope/README.md)
   - [07.4 - Closures dan Lexical Scope](01-dasar/07-function/04-closures/README.md)
   - [07.5 - Arrow Function & Konteks Keyword This](01-dasar/07-function/05-arrow-function/README.md)
   - [07.6 - Higher-Order Functions (Filter, Map, Reduce)](01-dasar/07-function/06-higher-order-functions/README.md)
   - [07.7 - Rest Parameter (...args)](01-dasar/07-function/07-rest-parameter/README.md)
   - [07.8 - Fungsi Rekursif](01-dasar/07-function/08-rekursif/README.md)
   - [07.9 - Project Perhitungan Volume Dua Kubus](01-dasar/07-function/09-project-volume-kubus/README.md)
8. [08 - Array](01-dasar/08-array/)
   - [08.1 - Manipulasi Array](01-dasar/08-array/01-manipulasi-array/README.md)
   - [08.2 - Destructuring Array dan Spread Operator](01-dasar/08-array/02-destructuring-spread/README.md)
   - [08.3 - Project Pengelolaan Kursi Penumpang Angkot](01-dasar/08-array/03-project-kelola-penumpang/README.md)
9. [09 - Object](01-dasar/09-object/)
   - [09.1 - Dasar Object (Properti dan Method)](01-dasar/09-object/01-dasar-object/README.md)
   - [09.2 - Tiga Cara Membuat Object](01-dasar/09-object/02-membuat-object/README.md)
   - [09.3 - Konsep Keyword This](01-dasar/09-object/03-keyword-this/README.md)
   - [09.4 - Destructuring Object dan Object Spread](01-dasar/09-object/04-destructuring-spread/README.md)
   - [09.5 - Object Lanjutan: Prototype Inheritance](01-dasar/09-object/05-object-lanjutan/README.md)
   - [09.6 - Latihan Pengelolaan Angkot Berbasis Objek](01-dasar/09-object/06-latihan-angkot-object/README.md)
10. [10 - Project Game Interaktif](01-dasar/10-project-game/)
    - [10.1 - Game Suit Jawa](01-dasar/10-project-game/01-suit-jawa/README.md)
    - [10.2 - Game Tebak Angka](01-dasar/10-project-game/02-tebak-angka/README.md)

---

### 2. [02 - JavaScript DOM (Document Object Model)](02-dom/)

Interaksi JavaScript dengan dokumen web dan antarmuka HTML dinamis:

1. [01 - Pengenalan DOM & DOM Tree](02-dom/01-intro/README.md)
2. [02 - DOM Selection](02-dom/02-dom-selection/README.md)
3. [03 - DOM Manipulasi Element](02-dom/03-dom-manipulasi-element/README.md)
4. [04 - DOM Manipulasi Node](02-dom/04-dom-manipulasi-node/README.md)
5. [05 - DOM Events](02-dom/05-dom-events/README.md)
6. [06 - DOM Traversal dan Event Delegation](02-dom/06-dom-traversal/README.md)
7. [07 - Latihan Mandiri: Manipulasi Warna Background](02-dom/07-latihan-ubah-warna/README.md)
8. [08 - Latihan Mandiri: Game Suit Jawa GUI Interaktif](02-dom/08-latihan-suit-jawa-v2/README.md)
9. [09 - Latihan Mandiri: Galeri Gambar Interaktif](02-dom/09-latihan-image-gallery/README.md)

---

### 3. [03 - Asynchronous JavaScript (Event Loop, Promise, Fetch & Async/Await)](03-asynchronous/)

Pemrograman asinkron modern untuk menangani proses non-blocking dan request jaringan internet:

1. [01 - Asynchronous Intro & Event Loop Architecture](03-asynchronous/01-event-loop-intro/README.md)
2. [02 - Timing Events (setTimeout & setInterval)](03-asynchronous/02-timing-events/README.md)
3. [03 - Callbacks dan Masalah Callback Hell](03-asynchronous/03-callbacks/README.md)
4. [04 - Promise (Pending, Fulfilled, Rejected)](03-asynchronous/04-promise/README.md)
5. [05 - Fetch API (HTTP Request Modern)](03-asynchronous/05-fetch/README.md)
6. [06 - Async dan Await](03-asynchronous/06-async-await/README.md)

---

### 4. [04 - JavaScript Modular (Webpack & Tooling)](04-modular/)

Pengembangan aplikasi skala industri menggunakan modul dan bundler:

- [Arsitektur Webpack 5, SCSS Loader, dan Code Splitting](04-modular/README.md)

---

### 5. [05 - JavaScript OOP (Programmer Zaman Now)](05-oop/)

Pemrograman Berorientasi Objek mendalam mengikuti silabus Programmer Zaman Now (PZN):

1. [01 - Constructor Function](05-oop/01-constructor-function/README.md)
2. [02 - Prototype Inheritance](05-oop/02-prototype/README.md)
3. [03 - Class](05-oop/03-class/README.md)
4. [04 - Class Inheritance (extends)](05-oop/04-class-inheritance/README.md)
5. [05 - Super Constructor](05-oop/05-super-constructor/README.md)
6. [06 - Super Method (Method Overriding)](05-oop/06-super-method/README.md)
7. [07 - Getter dan Setter](05-oop/07-getter-setter/README.md)
8. [08 - Public Class Field](05-oop/08-public-class-field/README.md)
9. [09 - Private Class Field (#)](05-oop/09-private-class-field/README.md)
10. [10 - Private Method (#)](05-oop/10-private-method/README.md)
11. [11 - Operator instanceof](05-oop/11-operator-instanceof/README.md)
12. [12 - Static Field](05-oop/12-static-field/README.md)
13. [13 - Static Method](05-oop/13-static-method/README.md)
14. [14 - Error Handling Class](05-oop/14-error-handling-class/README.md)
15. [15 - Custom Error Class](05-oop/15-custom-error/README.md)
16. [16 - Iterable dan Iterator](05-oop/16-iterable-iterator/README.md)

---

### 6. [06 - Modern Web API & Real-World JavaScript](06-modern-web-api/)

Pola arsitektur, Web API browser modern, dan teknik optimasi performa yang digunakan sehari-hari di industri:

1. [01 - Web Storage API (localStorage, sessionStorage, Cookies)](06-modern-web-api/01-web-storage/README.md)
2. [02 - Modern Syntax ES2020-ES2023 (Optional Chaining, Nullish Coalescing, Immutability)](06-modern-web-api/02-modern-syntax-es2020/README.md)
3. [03 - URL, URLSearchParams, dan FormData API](06-modern-web-api/03-url-and-formdata/README.md)
4. [04 - Asynchronous Paralel & AbortController](06-modern-web-api/04-async-parallel-abort/README.md)
5. [05 - Optimasi Performa Event (Debounce dan Throttle)](06-modern-web-api/05-debounce-throttle/README.md)
6. [06 - Intersection Observer API (Lazy Loading & Infinite Scroll)](06-modern-web-api/06-intersection-observer/README.md)

---

### 7. [07 - JavaScript Standard Library (Programmer Zaman Now)](07-standard-library/)

Pustaka standar bawaan (Standard Library) JavaScript mencakup objek global, tipe primitif modern, penanganan data waktu, koleksi modern, dan metaprogramming:

1. [01 - Number (Static Properties, Methods, dan Number Parsing)](07-standard-library/01-number/README.md)
2. [02 - String (Instance Methods, Search, Transform, dan Padding)](07-standard-library/02-string/README.md)
3. [03 - Array (Queue FIFO, Stack LIFO, Search, dan Advanced Transform)](07-standard-library/03-array/README.md)
4. [04 - Object (Static Methods: Freeze, Seal, Assign, Values, Keys, Entries)](07-standard-library/04-object/README.md)
5. [05 - JSON (Serialization, Deserialization, Replacer, dan Reviver)](07-standard-library/05-json/README.md)
6. [06 - BigInt (Arbitrary-Precision Integers dan Batasan Operasi)](07-standard-library/06-bigint/README.md)
7. [07 - Date (Epoch Timestamp, ISO 8601, Parsing, Getter dan Setter)](07-standard-library/07-date/README.md)
8. [08 - Math (Konstanta Matematika, Pembulatan, dan Operasi Angka)](07-standard-library/08-math/README.md)
9. [09 - Boolean (Boolean Wrapper, toString, dan valueOf)](07-standard-library/09-boolean/README.md)
10. [10 - Map (Key-Value Collection Modern, Perbedaan dengan Object)](07-standard-library/10-map/README.md)
11. [11 - Set (Koleksi Nilai Unik dan Eliminasi Duplikasi)](07-standard-library/11-set/README.md)
12. [12 - Symbol (Primitive Unik dan Global Symbol Registry)](07-standard-library/12-symbol/README.md)
13. [13 - RegExp (Pola Regex, Modifiers, Assertions, dan String Match)](07-standard-library/13-regexp/README.md)
14. [14 - Proxy (Metaprogramming, Interceptor Handler, Get dan Set Traps)](07-standard-library/14-proxy/README.md)
15. [15 - Reflect (Refleksi Objek Modern dan Pasangan Ideal Proxy)](07-standard-library/15-reflect/README.md)
16. [16 - URL Encoding (encodeURI, encodeURIComponent, dan Decode)](07-standard-library/16-encode/README.md)
17. [17 - Base64 (btoa, atob, dan Penanganan Teks UTF-8 Unicode)](07-standard-library/17-base64/README.md)
18. [18 - Eval (Eksekusi Dinamis, Analisis Risiko Keamanan, dan Alternatif)](07-standard-library/18-eval/README.md)

---

## 🛠️ Cara Menjalankan Kode

### 1. Menjalankan File JavaScript via Node.js

Seluruh materi logika, algoritma, OOP, dan Web API yang tidak mewajibkan interaksi layar dapat langsung dijalankan di terminal menggunakan Node.js:

```bash
# Menjalankan materi fungsi
node 01-dasar/07-function/01-intro/contoh.js

# Menjalankan materi Promise
node 03-asynchronous/04-promise/contoh.js

# Menjalankan materi OOP
node 05-oop/16-iterable-iterator/contoh.js

# Menjalankan materi Standard Library
node 07-standard-library/01-number/contoh.js
```

### 2. Menjalankan Materi DOM & Browser di Browser

Untuk materi yang melibatkan DOM atau event visual, cukup buka file `index.html` yang ada di setiap folder materi langsung di browser Anda, atau gunakan ekstensi seperti **Live Server** di VS Code.

### 3. Menjalankan Proyek Modular Webpack

```bash
cd 04-modular
npm install
npm run serve    # Mode dev server interaktif
npm run build    # Membangun bundle produksi
```
