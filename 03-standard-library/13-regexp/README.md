# 13 - RegExp (Pola Regex, Modifiers, Assertions, Character Classes, dan String Match)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mesin pencocokan pola teks tingkat lanjut bawaan JavaScript melalui objek `RegExp` dan integrasi method String.
> - **Kapan Digunakan**: Validasi form (email, password, nomor HP), ekstraksi token data log/dokumen (_scraping_), pembersihan kata terlarang, dan pemecahan teks dengan multi-delimiter.
> - **Aturan Praktis**: Gunakan literal `/pola/` untuk pola statis, hindari flag global `/g` saat melakukan validasi dengan `regex.test()` untuk mencegah bug state `lastIndex`, dan gunakan _Named Capturing Groups_ `(?<nama>...)` untuk ekstraksi yang mudah dibaca.

---

## 1. 🎯 Tujuan Belajar

- Memahami regular expression melalui objek bawaan `RegExp` di JavaScript.
- Menguasai seluruh method RegExp (`test()`, `exec()`) dan integrasi method String (`match()`, `matchAll()`, `replace()`, `split()`) beserta contoh kasusnya masing-masing.
- Membedakan cara deklarasi literal (`/.../`) dan konstruktor dinamis (`new RegExp()`).
- Menguasai modifiers / flags: `i` (_ignore case_), `g` (_global_), `m` (_multiline_), `s` (_dotAll_), dan `u` (_unicode_).
- Memahami blok pembangun pola: assertions, character classes (`\d`, `\w`, `\s`), quantifiers (greedy vs lazy), dan groups & ranges (`[]`, `()`, `(?<nama>...)`).
- Memahami jebakan state `lastIndex` pada regex dengan flag `/g` dan bahaya bencana ReDoS (_catastrophic backtracking_).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> `RegExp` seperti **anjing pelacak kepolisian yang telah dilatih mencium aroma pola spesifik**: ia tidak peduli apakah target yang Anda cari berwarna biru atau merah; ia hanya mencocokkan jejak pola bentuk yang Anda tentukan (misalnya: pola 2 huruf diikuti 4 angka) di antara ribuan tumpukan dokumen tebal.

---

### 🗺️ Visualisasi Anatomi Pola RegExp

Berikut adalah cara membaca pola regex yang tampak rumit menjadi sangat mudah dipahami dengan diagram penunjuk:

#### 1. Validasi Username

Aturan: Dimulai dengan huruf, panjang total 3–16 karakter, hanya boleh huruf, angka, dan garis bawah (`_`).

```text
/ ^ [a-zA-Z] [a-zA-Z0-9_]{2,15} $ /
│ │    │            │       │   │ │
│ │    │            │       │   │ └── Pembatas akhir RegExp (delimiter)
│ │    │            │       │   └──── Anchor Akhir ($): Wajib berakhir tepat di ujung string
│ │    │            │       └──────── Quantifier ({2,15}): Ulangi karakter set 2 s.d. 15 kali
│ │    │            └──────────────── Character Set: Boleh huruf besar/kecil, angka, atau underscore
│ │    └───────────────────────────── Karakter Pertama: Wajib 1 huruf (besar atau kecil)
│ └────────────────────────────────── Anchor Awal (^): Wajib berawal tepat dari awal string
└──────────────────────────────────── Pembatas awal RegExp (delimiter)
```

#### 2. Validasi Nomor HP Indonesia

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

---

### 1. Cara Pembuatan RegExp: Literal vs Konstruktor

| Cara Pembuatan           | Sintaks                                      | Kapan Digunakan?                                | Sifat & Performa                                                            |
| :----------------------- | :------------------------------------------- | :---------------------------------------------- | :-------------------------------------------------------------------------- |
| **Sintaks Literal**      | `const regex = /pola/flags;`                 | Pola sudah tetap/statis sejak awal coding.      | Dikompilasi saat skrip dimuat (lebih cepat).                                |
| **Konstruktor `RegExp`** | `const regex = new RegExp("pola", "flags");` | Pola dibuat dinamis (dari variabel/input user). | Dikompilasi saat runtime. Karakter khusus wajib _double-backslash_ (`\\d`). |

```javascript
// 1. Literal (Statis)
const regexStatis = /^\d{4}$/;

// 2. Konstruktor (Dinamis dari variabel)
const keyword = "javascript";
const regexDinamis = new RegExp(`\\b${keyword}\\b`, "i"); // Perhatikan double-backslash!
```

---

### 2. Modifiers (Flags) Utama

|  Flag   | Nama          | Efek & Penjelasan Singkat                                                         |
| :-----: | :------------ | :-------------------------------------------------------------------------------- |
| **`i`** | _Ignore Case_ | Mengabaikan perbedaan huruf besar dan kecil (`/halo/i` cocok dengan `"HALO"`).    |
| **`g`** | _Global_      | Mencari **seluruh** kecocokan di dalam dokumen, tidak berhenti di temuan pertama. |
| **`m`** | _Multiline_   | Mengubah anchor `^` dan `$` agar berlaku di setiap baris baru (`\n`).             |
| **`s`** | _Dot All_     | Mengizinkan tanda titik `.` mencocokkan karakter newline (`\n`).                  |
| **`u`** | _Unicode_     | Mengaktifkan penanganan karakter Unicode & Emoji (UTF-16 surrogate pairs).        |

---

### 3. Komponen Pola Sintaksis

- **Character Classes**: `\d` (digit angka), `\w` (huruf/angka/garis bawah), `\s` (spasi/tab/newline), `.` (sembarang karakter).
- **Assertions**: `^` (awal string), `$` (akhir string), `\b` (batas kata / word boundary).
- **Quantifiers**: `+` ($\ge 1$), `*` ($\ge 0$), `?` (0 atau 1), `{n,m}` (rentang frekuensi). Sifat default _Greedy_ dapat diubah menjadi _Lazy_ dengan menambahkan tanda `?` (contoh: `+?`).
- **Groups**: `[abc]` (himpunan karakter), `[^abc]` (negasi), `(abc)` (capturing group), `(?<nama>abc)` (named capturing group).

---

### 4. Tabel Ringkasan Method RegExp & String (Cheat-Sheet)

| Method                         | Pemilik  | Nilai Kembalian   | Deskripsi Singkat                                                          |
| :----------------------------- | :------: | :---------------- | :------------------------------------------------------------------------- |
| **`regex.test(str)`**          | `RegExp` | `boolean`         | Menguji apakah pola cocok (ideal untuk validasi form).                     |
| **`regex.exec(str)`**          | `RegExp` | `Array` \| `null` | Eksekusi pencarian dengan detail indeks & grup.                            |
| **`str.match(regex)`**         | `String` | `Array` \| `null` | Mengambil array hasil kecocokan teks.                                      |
| **`str.matchAll(regex)`**      | `String` | `Iterator`        | Mengambil seluruh kecocokan lengkap dengan named groups (wajib flag `/g`). |
| **`str.replace(regex, baru)`** | `String` | `string`          | Mengganti bagian teks yang cocok (bisa menggunakan replacer callback).     |
| **`str.split(regex)`**         | `String` | `Array`           | Memecah teks menjadi array berdasarkan delimiter regex.                    |

---

### 5. Eksplorasi Mendalam Setiap Method RegExp & Integrasi String

Berikut adalah rincian lengkap setiap method pencocokan pola teks beserta skenario kasusnya masing-masing:

---

#### 1. Pengujian Pola Boolean: `regex.test(str)`

Mengembalikan `true` jika string memuat pola yang dicari. Sangat ideal untuk validasi formulir:

```javascript
const regexHp = /^08\d{9,11}$/;
console.log(regexHp.test("081234567890")); // true
console.log(regexHp.test("08123abc")); // false
```

- **Jebakan Fatal State `lastIndex` pada Flag `/g`**:
  Jika regex memiliki flag global `/g`, method `.test()` akan mencatat posisi akhir pencarian pada `regex.lastIndex`, menyebabkan hasil validasi berganti-ganti:

  ```javascript
  const regG = /abc/g;
  console.log(regG.test("abc")); // true  (lastIndex = 3)
  console.log(regG.test("abc")); // false ❌ (karena mencari dari indeks 3!)
  console.log(regG.test("abc")); // true  (reset ke 0)

  // Aturan Emas: JANGAN gunakan flag /g jika hanya ingin validasi regex.test()!
  ```

---

#### 2. Eksekusi Pencarian Mendalam: `regex.exec(str)`

Mengeksekusi pencarian dan mengembalikan array informasi mendalam (teks cocok, capturing groups, index posisi, input asal) atau `null` jika tidak ditemukan:

```javascript
const regexToken = /ID-(?<kode>\d+)/;
const hasilExec = regexToken.exec("Member: ID-4592 Aktif");

console.log(hasilExec[0]); // "ID-4592" (teks penuh cocok)
console.log(hasilExec[1]); // "4592"    (capturing group 1)
console.log(hasilExec.groups.kode); // "4592"    (named group)
console.log(hasilExec.index); // 8         (posisi karakter awal)
```

---

#### 3. Pencocokan Teks: `str.match(regex)`

Mengekstrak kecocokan dari string. Jika regex tidak memiliki flag `/g`, hasilnya mirip `regex.exec()`. Jika memiliki flag `/g`, mengembalikan seluruh teks yang cocok dalam array sederhana:

```javascript
const teks = "Kucing 1, Kucing 2, Kucing 3";

// Tanpa /g: mengambil detail temuan pertama
console.log(teks.match(/Kucing \d/)); // ['Kucing 1', index: 0, ...]

// Dengan /g: mengambil SEMUA temuan
console.log(teks.match(/Kucing \d/g)); // ['Kucing 1', 'Kucing 2', 'Kucing 3']
```

---

#### 4. Ekstraksi Lengkap Iterable: `str.matchAll(regex)`

Mengembalikan objek iterator yang memuat seluruh kecocokan lengkap dengan capture groups dan named groups. **Wajib menyertakan flag global `/g`**:

```javascript
const log = "User: Joko (25 thn), User: Siti (30 thn)";
const pattern = /User:\s*(?<nama>\w+)\s*\((?<umur>\d+)\s*thn\)/g;

for (const match of log.matchAll(pattern)) {
  console.log(`${match.groups.nama} berusia ${match.groups.umur} tahun`);
}
// Joko berusia 25 tahun
// Siti berusia 30 tahun
```

---

#### 5. Penggantian Teks Dinamis: `str.replace(regex, replacement)`

Mengganti teks yang cocok. Parameter kedua bisa berupa string baru atau callback function untuk transformasi nilai dinamis:

```javascript
const hargaUSD = "Apel $5, Jeruk $3, Mangga $10";

// Konversi harga Dollar ke Rupiah menggunakan callback replacer:
const hargaIDR = hargaUSD.replace(/\$(\d+)/g, (_, nominal) => {
  const rupiah = Number(nominal) * 15000;
  return `Rp ${rupiah.toLocaleString("id-ID")}`;
});

console.log(hargaIDR); // "Apel Rp 75.000, Jeruk Rp 45.000, Mangga Rp 150.000"
```

---

#### 6. Pemecahan Delimiter Kompleks: `str.split(regex)`

Memecah string menjadi array menggunakan ekspresi reguler sebagai pemisah (_separator_):

```javascript
// Memecah teks dengan koma, titik koma, dan spasi yang tidak teratur:
const dataAcak = "apel, jeruk ; mangga ,pisang;anggur";
const listBuah = dataAcak.split(/\s*[,;]\s*/);

console.log(listBuah); // ['apel', 'jeruk', 'mangga', 'pisang', 'anggur']
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep validasi pola, jebakan `lastIndex`, literal vs dynamic regex, named capturing groups, greedy vs lazy, manipulasi teks callback, dan pemecahan string multi-delimiter di atas dirangkum ke dalam satu script laboratorium terpadu yang siap dijalankan langsung di terminal.

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 03-standard-library/13-regexp/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Validasi Formulir Registrasi**: Memeriksa kekuatan password (minimal 8 karakter, kombinasi huruf besar, kecil, angka, dan simbol) serta nomor HP Indonesia.
2. **Sanitasi Tag HTML (XSS Prevention)**: Menghapus tag-tag HTML liar dari input teks pengguna menggunakan `teks.replace(/<[^>]*>/g, '')`.
3. **Penyensoran Kata Sensitif Berbasis Kamus**: Mengganti kata-kata kasar dengan tanda bintang menggunakan callback dinamis `str.replace(regexKasar, '***')`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Jebakan `lastIndex` pada Flag `/g`**: Validasi form menghasilkan lolos dan gagal bergantian jika variabel regex disimpan di luar fungsi (_shared instance_).
- **Lupa Double-Backslash pada `new RegExp()`**: Menulis `new RegExp('\d+')` akan menghasilkan pola `/d+/` (mencocokkan huruf 'd') karena string escape sequence mengonsumsi backslash pertama. Selalu tulis `new RegExp('\\d+')`.
- **Bencana ReDoS (Catastrophic Backtracking)**: Menulis pola bersarang kompleks seperti `(a+)+$` pada teks masukan yang panjang dan tidak cocok dapat membuat thread Node.js mengalami CPU lock 100%.

### 🌟 Best Practice

- Gunakan literal `/.../` untuk pola statis dan hanya gunakan `new RegExp()` jika pola dirakit dari variabel dinamis pada runtime.
- Selalu batasi awal dan akhir pola dengan anchor `^` dan `$` saat melakukan validasi form agar seluruh teks terverifikasi tanpa kebocoran.
- Gunakan _Named Capturing Groups_ `(?<nama>...)` untuk kemudahan refactoring kode ekstraksi teks.

---

## 5. ✍️ Latihan Mandiri

1. Buat regex untuk memvalidasi format email standar dengan anchor `^` dan `$`.
2. Diberikan string postingan `"Belajar #javascript dan #nodejs di tahun 2026"`. Gunakan `str.match(/#\w+/g)` untuk mengekstrak seluruh tagar (_hashtags_).
3. Buat fungsi `formatNomorRupiah(teksAngka)` yang menyisipkan tanda titik pemisah ribuan pada string angka menggunakan regex _positive lookahead_.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [12 - Symbol](../12-symbol/README.md)
- ➡️ **Selanjutnya:** [14 - Proxy](../14-proxy/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
