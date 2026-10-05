# 13 - RegExp (Pola Regex, Modifiers, Assertions, Character Classes, dan String Match)

## 1. 🎯 Tujuan Belajar

- Memahami regular expression melalui objek bawaan `RegExp` di JavaScript.
- Membedakan cara deklarasi literal (`/.../`) dan konstruktor (`new RegExp()`).
- Menguasai modifiers utama: `i` (case-insensitive), `g` (global), dan `m` (multiline).
- Memahami komponen pola: assertions, character classes (`\d`, `\w`, `\s`), groups & ranges (`[]`, `()`), dan quantifiers (`+`, `*`, `?`, `{n,m}`).
- Menguasai method RegExp (`test`, `exec`) dan method Regex pada String (`match`, `search`, `replace`, `replaceAll`, `split`).

---

## 2. 📖 Penjelasan Konsep & Referensi Lengkap

**Regular Expression (RegExp)** adalah serangkaian karakter yang membentuk pola pencarian (*search pattern*). RegExp digunakan untuk validasi format teks (email, username, nomor HP), pencarian substring tingkat lanjut, serta pembersihan atau penggantian pola teks.

---

### 🗺️ Visualisasi Anatomi Pola RegExp

Berikut adalah cara membaca pola regex yang tampak rumit menjadi sangat mudah dipahami dengan diagram penunjuk:

#### 1. Studi Kasus: Pola Validasi Username
Aturan: Dimulai dengan huruf, panjang total 3–16 karakter, hanya boleh huruf, angka, dan garis bawah (`_`).

```text
/ ^ [a-zA-Z] [a-zA-Z0-9_]{2,15} $ /
│ │    │            │       │   │ │
│ │    │            │       │   │ └── Pembatas akhir RegExp (delimiter)
│ │    │            │       │   └──── Anchor Akhir ($): Wajib berakhir tepat di ujung string
│ │    │            │       └──────── Quantifier ({2,15}): Ulangi karakter set sebanyak 2 s.d. 15 kali
│ │    │            └──────────────── Character Set: Boleh huruf besar/kecil, angka, atau underscore
│ │    └───────────────────────────── Karakter Pertama: Wajib 1 huruf (besar atau kecil)
│ └────────────────────────────────── Anchor Awal (^): Wajib berawal tepat dari awal string
└──────────────────────────────────── Pembatas awal RegExp (delimiter)
```

#### 2. Studi Kasus: Pola Nomor HP Indonesia (dari `example.js`)
Aturan: Diawali `08`, diikuti 9 sampai 11 digit angka (total panjang 11–13 digit).

```text
/ ^  08   \d   {9,11}  $ /
│ │  │    │      │     │ │
│ │  │    │      │     │ └── Pembatas akhir RegExp
│ │  │    │      │     └──── Anchor Akhir ($): Tidak boleh ada karakter tambahan di belakang
│ │  │    │      └────────── Quantifier: Digit diulang minimal 9x, maksimal 11x
│ │  │    └───────────────── Character Class (\d): Sembarang digit angka 0-9 (setara [0-9])
│ │  └────────────────────── Teks Literal: Wajib karakter '0' diikuti '8'
│ └───────────────────────── Anchor Awal (^): Wajib dimulai dari awal string
└─────────────────────────── Pembatas awal RegExp
```

#### 3. Studi Kasus: Ekstraksi Invoice dengan Flag Global
Aturan: Format `INV-YYYY-XXXXX`, diambil semua kecocokannya di dalam dokumen.

```text
/ INV - \d{4} - \d+ / g
│  │  │   │   │  │  │ │
│  │  │   │   │  │  │ └── Modifier / Flag Global: Ambil SEMUA yang cocok di seluruh teks
│  │  │   │   │  │  └──── Pembatas akhir RegExp
│  │  │   │   │  └─────── Quantifier (+): 1 atau lebih digit angka id pesanan
│  │  │   │   └────────── Karakter strip literal (-)
│  │  │   └────────────── Quantifier ({4}): Tepat 4 digit angka tahun
│  │  └────────────────── Karakter strip literal (-)
│  └───────────────────── Teks literal "INV"
└──────────────────────── Pembatas awal RegExp
```

#### 4. Studi Kasus: Pola Email Standar
Aturan: Format username, tanda `@`, nama domain, dan ekstensi minimal 2 huruf.

```text
/ ^ [\w.-]+ @ [\w-]+ \. [a-zA-Z]{2,} $ /
│ │    │    │    │   │       │       │ │
│ │    │    │    │   │       │       │ └── Pembatas akhir RegExp
│ │    │    │    │   │       │       └──── Anchor Akhir ($): Wajib berakhir di ujung string
│ │    │    │    │   │       └──────────── Ekstensi domain (com, id, net) minimal 2 huruf
│ │    │    │    │   └──────────────────── Titik literal (\.) yang di-escape
│ │    │    │    └──────────────────────── Nama domain penyedia email (gmail, yahoo, dsb)
│ │    │    └───────────────────────────── Karakter '@' literal
│ │    └────────────────────────────────── Username email (huruf, angka, titik, strip) minimal 1 karakter
│ └─────────────────────────────────────── Anchor Awal (^): Wajib dimulai dari awal string
└───────────────────────────────────────── Pembatas awal RegExp
```

---

### 1. Cara Pembuatan RegExp

JavaScript menyediakan dua cara untuk membuat objek RegExp:

| Cara Pembuatan | Sintaks | Kapan Digunakan? | Sifat & Performa |
| :--- | :--- | :--- | :--- |
| **Sintaks Literal** | `const regex = /pola/flags;` | Pola sudah tetap/statis sejak awal coding. | Dikompilasi saat skrip dimuat (lebih cepat & efisien). |
| **Konstruktor `RegExp`** | `const regex = new RegExp("pola", "flags");` | Pola dibuat dinamis (misal: dari input form/variabel). | Dikompilasi saat runtime. Karakter khusus wajib double backslash (`\\d`). |

```javascript
// 1. Literal (Statis)
const regexStatis = /^[a-z]+$/i;

// 2. Konstruktor (Dinamis dari variabel pengguna)
const kataKunci = "javascript";
const regexDinamis = new RegExp(kataKunci, "gi");

// Catatan penting: Pada konstruktor string, gunakan double-backslash:
const regexAngka = new RegExp("\\d{4}", "g"); // Sama dengan /\d{4}/g
```

---

### 2. Modifiers (Flags) Utama

Flags diletakkan setelah garis miring penutup `/pola/flags` untuk memodifikasi cara kerja pencarian:

| Flag | Nama | Penjelasan Singkat | Contoh & Efek |
| :---: | :--- | :--- | :--- |
| **`i`** | *Ignore Case* | Mengabaikan perbedaan huruf besar dan kecil. | `/halo/i` cocok dengan `"HALO"`, `"Halo"`, `"halo"`. |
| **`g`** | *Global* | Mencari **semua** kecocokan di dalam string, tidak berhenti di temuan pertama. | `"a a a".match(/a/g)` menghasilkan `['a', 'a', 'a']`. |
| **`m`** | *Multiline* | Mengubah anchor `^` dan `$` agar berlaku di **setiap baris** (`\n`), bukan hanya awal/akhir dokumen. | Cocok untuk validasi data teks multi-baris. |
| **`s`** | *Dot All* | Mengizinkan tanda titik `.` mencocokkan karakter baris baru (`\n`). | `/halo.dunia/s` cocok meski ada enter di antara kata. |
| **`u`** | *Unicode* | Mengaktifkan penanganan karakter Unicode & Emoji secara presisi (UTF-16 surrogate pairs). | `/\u{1F600}/u` mencocokkan emoji 😀. |
| **`y`** | *Sticky* | Pencarian hanya dilakukan tepat pada indeks `lastIndex` saat ini. | Digunakan pada parser atau tokenizer bahasa pemrograman. |

---

### 3. Komponen Pola Sintaksis

Pola RegExp tersusun dari blok-blok pembangun berikut:

#### A. Character Classes (Kategori Karakter)

| Simbol | Arti / Padanan | Contoh Kecocokan | Lawan / Negasi (Huruf Kapital) |
| :---: | :--- | :--- | :--- |
| **`\d`** | Digit angka `[0-9]` | `"5"`, `"0"` | **`\D`**: Bukan digit angka |
| **`\w`** | Karakter kata (alfanumerik + `_`) `[a-zA-Z0-9_]` | `"a"`, `"Z"`, `"9"`, `"_"` | **`\W`**: Bukan kata (spasi, tanda baca, simbol) |
| **`\s`** | Whitespace (spasi, tab, baris baru) | `" "`, `"\t"`, `"\n"` | **`\S`**: Bukan spasi |
| **`.`** | Sembarang karakter apapun (kecuali `\n`) | `"a"`, `"9"`, `"@"`, `"-"` | *(Aktifkan flag `s` agar mencakup `\n`)* |

#### B. Assertions & Boundaries (Posisi & Batas)

| Simbol | Arti | Contoh | Keterangan |
| :---: | :--- | :--- | :--- |
| **`^`** | Awal string / baris | `/^Halo/` | String harus dimulai dengan kata `"Halo"`. |
| **`$`** | Akhir string / baris | `/Dunia$/` | String harus diakhiri kata `"Dunia"`. |
| **`\b`** | Batas kata (*word boundary*) | `/\bcat\b/` | Hanya cocok dengan `"cat"`, bukan `"caterpillar"` atau `"bobcat"`. |
| **`\B`** | Bukan batas kata | `/\Bcat/` | Cocok jika `"cat"` berada di dalam kata lain (`"bobcat"`). |

#### C. Quantifiers (Frekuensi Kemunculan)

Quantifier menentukan berapa kali elemen sebelumnya boleh muncul berurutan:

| Simbol | Jumlah Kemunculan | Penjelasan Sederhana |
| :---: | :--- | :--- |
| **`+`** | 1 kali atau lebih ($\ge 1$) | Wajib ada minimal satu kali (`\d+` cocok `"1"`, `"1234"`). |
| **`*`** | 0 kali atau lebih ($\ge 0$) | Boleh tidak ada sama sekali, boleh ada banyak. |
| **`?`** | 0 atau 1 kali (opsional) | Boleh ada 1, boleh tidak ada (`https?` cocok `"http"` atau `"https"`). |
| **`{n}`** | Tepat $n$ kali | Tepat sekian kali (`\d{4}` cocok untuk 4 digit tahun). |
| **`{n,}`** | Minimal $n$ kali | Minimal sekian kali tanpa batas atas (`\d{3,}`). |
| **`{n,m}`** | Minimal $n$ kali, maksimal $m$ kali | Rentang batas kemunculan (`\d{9,11}`). |

> 💡 **Greedy vs Lazy:** 
> Secara default, quantifier bersifat **Greedy** (rakus mengambil kecocokan sepanjang mungkin). Tambahkan tanda `?` di belakang quantifier (`+?`, `*?`) untuk mengubahnya menjadi **Lazy** (berhenti di kecocokan terpendek).

#### D. Groups & Ranges (Himpunan & Pengelompokan)

| Simbol | Nama | Penjelasan & Contoh |
| :---: | :--- | :--- |
| **`[abc]`** | *Character Set* | Cocok dengan **salah satu** karakter di dalam kurung: `'a'`, `'b'`, atau `'c'`. |
| **`[^abc]`** | *Negated Set* | Cocok dengan karakter **apapun selain** `'a'`, `'b'`, dan `'c'`. |
| **`[a-z]`** | *Range* Huruf Kecil | Semua huruf kecil dari `a` sampai `z`. |
| **`[A-Z]`** | *Range* Huruf Besar | Semua huruf besar dari `A` sampai `Z`. |
| **`[0-9]`** | *Range* Angka | Semua angka dari `0` sampai `9` (setara `\d`). |
| **`(abc)`** | *Capturing Group* | Mengelompokkan pola bersama dan menyimpan kecocokannya untuk diekstrak. |
| **`(?:abc)`** | *Non-Capturing Group* | Mengelompokkan pola tanpa menyimpan hasil ekstraksi (menghemat memori). |
| **`(?<nama>abc)`** | *Named Group* | Memberikan nama alias pada grup ekstraksi agar dapat diakses via `result.groups.nama`. |
| **`a\|b`** | *Alternation (OR)* | Memilih salah satu: cocok dengan pola `'a'` **atau** pola `'b'`. |

#### E. Escape Characters (Karakter Khusus)

Jika Anda ingin mencari karakter simbol regex secara harfiah, beri tanda garis miring terbalik (`\`) di depannya:
```text
Karakter khusus:  .  *  +  ?  ^  $  {  }  (  )  [  ]  |  \  /
Contoh escape  :  \. (mencari titik), \$ (mencari dollar), \/ (mencari garis miring)
```

---

### 4. Method RegExp & Method String Terkait

| Method | Pemilik | Tipe Return | Kegunaan Utama |
| :--- | :---: | :---: | :--- |
| **`regex.test(str)`** | `RegExp` | `boolean` | **Validasi Form**: Menguji apakah string memenuhi pola (`true`/`false`). |
| **`regex.exec(str)`** | `RegExp` | `Array` / `null` | Mengambil detail pencocokan pertama beserta capturing groups & indeks. |
| **`str.match(regex)`** | `String` | `Array` / `null` | **Ekstraksi Data**: Mengambil array hasil kecocokan teks. |
| **`str.matchAll(regex)`** | `String` | `Iterator` | Mengambil seluruh temuan beserta grup ekstraksi (wajib flag `/g`). |
| **`str.search(regex)`** | `String` | `number` | Mencari posisi indeks pertama kecocokan (`-1` jika tidak ditemukan). |
| **`str.replace(regex, baru)`** | `String` | `string` | **Sensor / Sanitasi**: Mengganti substring yang cocok dengan teks baru. |
| **`str.replaceAll(regex, baru)`** | `String` | `string` | Mengganti seluruh kecocokan (regex wajib menggunakan flag `/g`). |
| **`str.split(regex)`** | `String` | `Array` | Memecah string menjadi array berdasarkan pemisah pola regex. |

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Validasi Pola dengan regex.test() ---');
// Pola: Diawali '08', diikuti 9 sampai 11 digit angka
const regexNoHp = /^08\d{9,11}$/;
const noHpBenar = '081234567890';
const noHpSalah = '08123abc45';

console.log(`Apakah '${noHpBenar}' valid? :`, regexNoHp.test(noHpBenar)); // true
console.log(`Apakah '${noHpSalah}' valid? :`, regexNoHp.test(noHpSalah)); // false

console.log('\n--- 2. Ekstraksi Data dengan str.match() ---');
const regexInvoice = /INV-\d{4}-\d+/g;
const pesan = 'Pesanan nomor INV-2026-001 dan INV-2026-002 telah berhasil dibayar.';

const daftarInvoice = pesan.match(regexInvoice);
console.log('Nomor Invoice Ditemukan   :', daftarInvoice);

console.log('\n--- 3. Penyensoran Teks dengan str.replace() ---');
const komentar = 'Website ini lambat dan jelek sekali, desainnya jelek.';

// Flag /gi: g (global/semua kecocokan) dan i (ignore case)
const komentarBersih = komentar.replace(/jelek/gi, '***');
console.log('Komentar Asli             :', komentar);
console.log('Komentar Disensor         :', komentarBersih);
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Validasi Pola dengan regex.test() ---
Apakah '081234567890' valid? : true
Apakah '08123abc45' valid? : false

--- 2. Ekstraksi Data dengan str.match() ---
Nomor Invoice Ditemukan   : [ 'INV-2026-001', 'INV-2026-002' ]

--- 3. Penyensoran Teks dengan str.replace() ---
Komentar Asli             : Website ini lambat dan jelek sekali, desainnya jelek.
Komentar Disensor         : Website ini lambat dan *** sekali, desainnya ***.
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata

> `RegExp` seperti **anjing pelacak kepolisian yang telah dilatih mencium aroma spesifik**: ia tidak peduli apakah target yang Anda cari berwarna biru atau merah; ia hanya mencocokkan jejak pola bentuk yang Anda berikan (misalnya: pola 3 huruf diikuti 4 angka) di antara ribuan tumpukan dokumen.

### 🏢 Real-World Use Case

1. **Validasi Input Pengguna**: Memeriksa format alamat email, kekuatan sandi password, nomor KTP, atau nomor HP di form registrasi.
2. **Pembersihan Data (Sanitasi String)**: Membuang tag HTML berbahaya dari input komentar user (`teks.replace(/<[^>]*>/g, '')`).
3. **Web Scraping & Log Parsing**: Mengekstrak kode status HTTP (200, 404, 500) dan alamat IP pengunjung dari file log server raksasa.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **State `lastIndex` pada regex dengan flag `/g`**: Jika Anda menggunakan `regex.test()` dengan flag `/g`, regex akan mengingat posisi karakter terakhir. Panggilan kedua berturut-turut pada string yang sama bisa menghasilkan `false` secara mengejutkan! Hindari flag `/g` untuk validasi `test()`.
- **Lupa double-backslash pada konstruktor string**: Saat menulis `new RegExp('\\d+')`, Anda harus menulis dua garis miring terbalik `\\d` karena string JavaScript mengonsumsi garis miring pertama sebagai escape sequence.
- **Bencana ReDoS (Regular Expression Denial of Service)**: Pola regex bersarang yang buruk (seperti `(a+)+$`) dapat menyebabkan prosesor CPU 100% _freeze_ saat mengevaluasi string panjang yang tidak cocok (_catastrophic backtracking_).

### 🌟 Best Practice

- Gunakan literal `/pola/` jika pola bersifat statis agar browser mengompilasi regex di awal dengan performa maksimal.
- Gunakan method `regex.test()` murni jika tujuan Anda hanya ingin memeriksa keabsahan boolean.
- Gunakan _Named Capturing Groups_ ES2018 `(?<tahun>\d{4})` untuk ekstraksi data yang lebih mudah dibaca daripada nomor urut grup numerik.

---

## 6. ✍️ Latihan Mandiri

1. Buat regex untuk memvalidasi format alamat email standar (harus memuat karakter alfanumerik, simbol `@`, domain, dan ekstensi minimal 2 huruf).
2. Buat fungsi `ekstrakHashtag(postingan)` yang mengekstrak semua kata berawalan `#` dari teks postingan media sosial menggunakan `match(/#\w+/g)`.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [12 - Symbol](../12-symbol/README.md)
- ➡️ **Selanjutnya:** [14 - Proxy](../14-proxy/README.md)
- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
