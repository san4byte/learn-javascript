# 09 - Boolean (Boolean Wrapper, Truthy/Falsy, dan Nilai Konversi)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Tipe data primitif logika bernilai biner (`true` atau `false`) beserta fungsi konversi bawaan `Boolean()`.
> - **Kapan Digunakan**: Percabangan kondisi `if/else`, sanitasi array data kosong, dan penentuan nilai flag/status.
> - **Aturan Praktis**: Jangan pernah menggunakan konstruktor `new Boolean()` karena membuat objek yang selalu bernilai truthy, gunakan `Boolean(x)` atau operator `!!x`, dan gunakan `??` jika angka `0` adalah nilai default yang sah.

---

## 1. 🎯 Tujuan Belajar

- Memahami tipe primitif `boolean` dan objek pembungkus (_wrapper object_) `Boolean`.
- Menguasai seluruh method dan fitur `Boolean` beserta berbagai kondisi kasus (_edge cases_).
- Mengetahui daftar lengkap 7 nilai _falsy_ di JavaScript serta mengenali jebakan nilai _truthy_ yang tak terduga (`[]`, `{}`, `'0'`).
- Menguasai teknik konversi tipe data ke boolean menggunakan fungsi `Boolean()` dan _double negation_ (`!!`).
- Memahami mengapa `new Boolean(false)` dilarang keras di industri dan linting ESLint (`no-new-wrappers`).
- Menguasai idiom fungsional sanitasi data array menggunakan `filter(Boolean)`.
- Memahami interaksi boolean dengan operator logika `&&`, `||`, dan Nullish Coalescing (`??`).

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> Tipe primitif `boolean` seperti **saklar lampu dinding**: hanya bisa berada di dua posisi: Nyala (`true`) atau Mati (`false`). Sedangkan menggunakan `new Boolean(false)` seperti **membungkus saklar mati tersebut ke dalam kardus pos**: kardus paketnya berwujud fisik nyata di hadapan Anda (sebuah objek / truthy), meskipun isi saklar di dalamnya mati.

---

### 1. Tabel Ringkasan Fitur & Method Boolean (Cheat-Sheet)

| Fitur / Pola        | Sintaks            | Nilai Kembalian      | Deskripsi Singkat                                                    |
| :------------------ | :----------------- | :------------------- | :------------------------------------------------------------------- |
| **Type Caster**     | `Boolean(value)`   | `boolean` (primitif) | Mengonversi nilai apa pun menjadi `true`/`false` murni.              |
| **Double Negation** | `!!value`          | `boolean` (primitif) | Shorthand populer identik dengan fungsi `Boolean(value)`.            |
| **Object Wrapper**  | `new Boolean(val)` | `object`             | ⚠️ **Dihindari!** Membuat wrapper objek yang selalu bernilai truthy. |
| **String Output**   | `bool.toString()`  | `string`             | Mengubah nilai boolean menjadi teks (`"true"` atau `"false"`).       |
| **Nilai Primitif**  | `bool.valueOf()`   | `boolean`            | Mengekstrak nilai primitif dari objek wrapper.                       |

---

### 2. Eksplorasi Mendalam Setiap Fitur & Method Boolean

Berikut adalah rincian lengkap setiap fitur dan method `Boolean` beserta skenario kasusnya masing-masing:

---

#### 1. Fungsi Konversi: `Boolean(value)`

Mengonversi nilai bertipe apa pun menjadi nilai boolean primitif (`true` atau `false`):

```javascript
console.log(Boolean("halo")); // true
console.log(Boolean("")); // false
console.log(Boolean(100)); // true
console.log(Boolean(0)); // false
```

---

#### 2. Shorthand Negasi Ganda: `!!value`

Operator negasi ganda mengevaluasi nilai kebenaran operand secara ringkas, bekerja identik dengan fungsi `Boolean()`:

```javascript
const user = "joko_dev";
console.log(!!user); // true
console.log(!!null); // false
console.log(!!0); // false
```

---

#### 3. Tujuh Nilai Falsy di JavaScript

Hanya ada tepat 7 nilai di seluruh bahasa JavaScript yang dievaluasi sebagai `false`:

```javascript
console.log(Boolean(false)); // 1. Literal false
console.log(Boolean(0)); // 2. Angka nol (0 dan -0)
console.log(Boolean(0n)); // 3. BigInt nol
console.log(Boolean("")); // 4. String kosong
console.log(Boolean(null)); // 5. Null
console.log(Boolean(undefined)); // 6. Undefined
console.log(Boolean(NaN)); // 7. Not-a-Number
```

---

#### 4. Jebakan Nilai Truthy yang Sering Menipu

Seluruh nilai di luar 7 nilai falsy di atas adalah **truthy** (termasuk yang tampak kosong):

```javascript
console.log(Boolean("0")); // true! (string berisi teks)
console.log(Boolean("false")); // true! (string berisi teks)
console.log(Boolean([])); // true! (array kosong adalah objek)
console.log(Boolean({})); // true! (objek kosong adalah objek)
console.log(Boolean(() => {})); // true! (fungsi kosong adalah objek)
```

---

#### 5. Jebakan Objek Pembungkus: `new Boolean(false)`

Menggunakan kata kunci `new` menghasilkan objek pembungkus (_wrapper object_). Karena semua objek di JavaScript bersifat truthy, percabangan `if` akan selalu tertipu:

```javascript
const statusAktif = new Boolean(false); // ❌ HINDARI

console.log(typeof statusAktif); // "object"

if (statusAktif) {
  // Blok ini SELALU dieksekusi meskipun nilainya false!
  console.log("Tertipu! Objek selalu bernilai truthy.");
}
```

---

#### 6. Ekstraksi Nilai Primitif: `bool.valueOf()`

Mengekstrak nilai primitif boolean asli dari dalam instance objek pembungkus:

```javascript
const boolObj = new Boolean(false);
console.log(typeof boolObj); // "object"
console.log(boolObj.valueOf()); // false (primitif)
console.log(typeof boolObj.valueOf()); // "boolean"
```

---

#### 7. Konversi ke String: `bool.toString()`

Mengonversi nilai boolean menjadi string teks `"true"` atau `"false"`:

```javascript
const aktif = true;
console.log(aktif.toString()); // "true"
console.log(typeof aktif.toString()); // "string"
```

---

#### 8. Sanitasi Data Array: Idiom `filter(Boolean)`

Pola elegan untuk membuang semua nilai kosong/falsy dari dalam array:

```javascript
const formulir = ["Andi", "", null, "Budi", undefined, 0, false, "Siti", NaN];
const bersih = formulir.filter(Boolean);
console.log(bersih); // ['Andi', 'Budi', 'Siti'] ✅
```

---

#### 9. Interaksi dengan Operator Logika: `&&`, `||`, dan `??`

- Operator `||` beralih jika operand bernilai _falsy_ (termasuk `0` dan `false`):
  ```javascript
  const kuantitas = 0;
  console.log(kuantitas || 10); // 10 (angka 0 tertimpa!)
  ```
- Operator `??` (_Nullish Coalescing_) hanya beralih jika operand bernilai `null` atau `undefined`:
  ```javascript
  console.log(kuantitas ?? 10); // 0 ✅ (angka 0 dipertahankan)
  ```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh konsep 7 nilai falsy, jebakan truthy pada array/objek kosong, shorthand `!!`, bahaya fatal `new Boolean(false)`, method `toString()`/`valueOf()`, idiom `filter(Boolean)`, dan operator `??` di atas dirangkum ke dalam satu laboratorium kode siap pakai:

📁 File: [`example.js`](./example.js)

```bash
# Jalankan langsung dari terminal:
node 03-standard-library/09-boolean/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Penyaringan Elemen Kosong Form**: Menggunakan `data.filter(Boolean)` untuk membersihkan baris kosong pada data unggahan file spreadsheet atau input tag.
2. **Flag Disabled Tombol UI**: Menggunakan `!!errorPesan` untuk mengaktifkan status nonaktif tombol simpan pada React/Vue jika ada pesan error.
3. **Pemberian Nilai Default yang Aman**: Menggunakan `??` daripada `||` untuk parameter konfigurasi kuantitas belanja agar angka `0` tidak dianggap hilang.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Mengira Array Kosong `[]` adalah Falsy**: Menulis `if (arr)` untuk mengecek apakah array berisi elemen akan selalu menghasilkan true meskipun `arr = []`. Selalu gunakan `if (arr.length > 0)`.
- **String `'false'` adalah Truthy**: Data query string dari URL browser `"?aktif=false"` bertipe string, sehingga `Boolean('false')` bernilai `true`. Parsing dengan `urlParam === 'true'`.
- **Menggunakan `new Boolean()`**: Menciptakan objek yang selalu lolos percabangan `if`.

### 🌟 Best Practice

- Gunakan `Boolean(x)` atau `!!x` untuk konversi tipe boolean primitif.
- Hindari penulisan redundan `if (isLolos === true)`, cukup tulis `if (isLolos)`.
- Gunakan operator Nullish Coalescing `??` untuk nilai default konfigurasi angka/boolean.

---

## 5. ✍️ Latihan Mandiri

1. Diberikan array formulir `['Andi', '', 0, 'Jakarta', null, 'Programmer', undefined]`. Bersihkan array tersebut sehingga hanya menyisakan data string valid menggunakan `filter(Boolean)`.
2. Buat fungsi `parseBooleanFromString(str)` yang mampu mengubah string `'true'` (atau `'TRUE'`) menjadi boolean `true`, dan string `'false'` menjadi boolean `false` tanpa terjebak sifat truthy string.
3. Jelaskan mengapa `Boolean(new Boolean(false))` bernilai `true`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [08 - Math](../08-math/README.md)
- ➡️ **Selanjutnya:** [10 - Map](../10-map/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
