# 09 - Boolean (Boolean Wrapper, toString, dan valueOf)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Memahami tipe primitif `boolean` dan objek wrapper bawaan `Boolean`.
> - **Kapan Digunakan**: Mengetahui jebakan fatal penggunaan `new Boolean()` dan mengapa konstruktor objek ini dihindari di industri.
> - **Aturan Praktis**: Gunakan fungsi `Boolean(x)` atau operator double negation `!!x` untuk mengonversi data menjadi boolean primitif murni.

## 1. 🎯 Tujuan Belajar

- Memahami tipe primitif `boolean` dan objek wrapper bawaan `Boolean`.
- Mengetahui jebakan fatal penggunaan `new Boolean()` dan mengapa konstruktor objek ini dihindari di industri.
- Menguasai fungsi konversi truthy/falsy menggunakan `Boolean(value)` dan double-negation (`!!value`).
- Memahami method instance `toString()` dan `valueOf()` pada objek Boolean.

---

## 2. 📖 Penjelasan Konsep & Referensi Lengkap

### 🎭 Analogi Dunia Nyata

> Tipe primitif `boolean` seperti **saklar lampu dinding**: hanya bisa berada di posisi Nyala (`true`) atau Mati (`false`). Menggunakan `new Boolean(false)` seperti **membungkus saklar mati tersebut ke dalam kardus paket pos**: kardus paketnya berwujud nyata ada di depan mata Anda (bertipe objek / truthy), meskipun saklar di dalamnya mati.

Tipe data primitif **`boolean`** hanya memiliki dua nilai: `true` dan `false`. Di JavaScript, terdapat juga fungsi dan objek pembungkus bawaan bernama **`Boolean`**.

### Tabel Referensi API & Konversi `Boolean`

| Fitur / Pola        | Sintaks              | Tipe Return          | Kegunaan & Contoh Singkat                                                                |
| :------------------ | :------------------- | :------------------- | :--------------------------------------------------------------------------------------- |
| **Type Caster**     | `Boolean(value)`     | `boolean` (primitif) | Mengonversi nilai apa pun menjadi `true`/`false` murni: `Boolean(1) // true`             |
| **Double Negation** | `!!value`            | `boolean` (primitif) | Shorthand modern identik dengan `Boolean(value)`: `!!"teks" // true`                     |
| **Object Wrapper**  | `new Boolean(value)` | `object`             | ⚠️ **Dihindari!** Membuat wrapper objek yang selalu bernilai truthy di percabangan `if`. |
| **String Output**   | `bool.toString()`    | `string`             | Mengembalikan representasi teks: `(true).toString() // "true"`                           |
| **Nilai Primitif**  | `bool.valueOf()`     | `boolean`            | Mengekstrak nilai primitif dari objek wrapper.                                           |

---

### Tabel 6 Nilai Falsy vs Nilai Truthy di JavaScript

| Kategori Falsy (Menghasilkan `false`)       | Kategori Truthy (Menghasilkan `true`)                |
| :------------------------------------------ | :--------------------------------------------------- |
| `false` (boolean literal)                   | `true` (boolean literal)                             |
| `0`, `-0`, `0n` (angka nol dan BigInt nol)  | Semua angka bukan nol (`1`, `-10`, `3.14`)           |
| `""` (string kosong 0 karakter)             | Semua string berisi karakter (`"Halo"`, `" "` spasi) |
| `null` (ketiadaan nilai sengaja)            | Objek kosong `{}` dan Array kosong `[]`              |
| `undefined` (variabel belum diinisialisasi) | Fungsi / method `function() {}`                      |
| `NaN` (Not a Number)                        | Objek pembungkus apa pun (`new Boolean(false)`)      |

> ⚠️ **Jebakan Fatal**: Seluruh objek di JavaScript bernilai **Truthy**! Oleh karena itu, `new Boolean(false)` di dalam pernyataan `if` akan dievaluasi sebagai **`true`**! Hindari penggunaan `new Boolean()`. Selalu gunakan `Boolean(x)` atau `!!x`.

---

## 3. 💻 Contoh Kode (`example.js`)

```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Jebakan Fatal: new Boolean(false) ---');
const statusMember = new Boolean(false);
console.log('Tipe data statusMember   :', typeof statusMember);

if (statusMember) {
  console.log(
    'Status percabangan if    : Status dianggap aktif! (karena semua objek bernilai truthy)'
  );
}

console.log('\n--- 2. Konversi Primitif & Shorthand Double Negation (!!) ---');
const username = 'joko_santoso';
console.log('Username asli            :', username);
console.log('Boolean(username)        :', Boolean(username));
console.log('!!username (Shorthand)   :', !!username);

console.log(
  '\n--- 3. Sanitasi Data: Membersihkan Nilai Falsy dengan filter(Boolean) ---'
);
const dataInput = ['Joko', '', null, 'Admin', undefined, 0, false, 'Aktif'];
console.log('Data Mentah              :', dataInput);

// Menghapus elemen falsy ('', null, undefined, 0, false) secara fungsional
const dataBersih = dataInput.filter(Boolean);
console.log('Data Bersih (Hanya Truthy):', dataBersih);
```

---

## 4. 🖥️ Output yang Diharapkan

```text
--- 1. Jebakan Fatal: new Boolean(false) ---
Tipe data statusMember   : object
Status percabangan if    : Status dianggap aktif! (karena semua objek bernilai truthy)

--- 2. Konversi Primitif & Shorthand Double Negation (!!) ---
Username asli            : joko_santoso
Boolean(username)        : true
!!username (Shorthand)   : true

--- 3. Sanitasi Data: Membersihkan Nilai Falsy dengan filter(Boolean) ---
Data Mentah              : [
  'Joko',    '',
  null,      'Admin',
  undefined, 0,
  false,     'Aktif'
]
Data Bersih (Hanya Truthy): [ 'Joko', 'Admin', 'Aktif' ]
```

---

## 5. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Validasi Keberadaan Input**: Memastikan string pencarian tidak kosong menggunakan `Boolean(searchQuery.trim())` atau `!!searchQuery`.
2. **Pengalihan Nilai State UI**: Mengonversi nilai non-boolean dari API menjadi murni `true`/`false` untuk properti disabled tombol di React/Vue.
3. **Penyaringan Elemen Falsy**: Membuang nilai-nilai kosong dari array menggunakan `array.filter(Boolean)`.

### ⚠️ Common Pitfalls (Jebakan Umum)

- **Menggunakan `new Boolean()`**: Selalu hindari `new Boolean()`. Ia menciptakan objek yang selalu bernilai truthy dalam evaluasi percabangan logika.
- **Mengira array kosong `[]` bernilai falsy**: Di JavaScript, array dan objek kosong tetap bernilai truthy (`Boolean([]) === true`). Untuk mengecek kekosongan array, periksa panjangnya: `arr.length > 0`.
- **String 'false' bernilai truthy**: `Boolean('false')` menghasilkan `true` karena string tidak kosong. Hanya string kosong `""` yang menghasilkan `false`.

### 🌟 Best Practice

- Gunakan fungsi `Boolean(x)` atau operator double negation `!!x` untuk mengonversi data menjadi boolean primitif murni.
- Gunakan idiom fungsional `daftar.filter(Boolean)` untuk membersihkan array dari elemen `null`, `undefined`, atau string kosong secara instan.
- Hindari membandingkan nilai boolean secara eksplisit seperti `if (isAktif === true)`, cukup tulis `if (isAktif)`.

---

## 6. ✍️ Latihan Mandiri

1. Diberikan array campuran `[0, 'Joko', '', null, 'Budi', undefined, NaN, 'Siti']`. Bersihkan seluruh nilai falsy sehingga hanya tersisa nama-nama yang valid menggunakan `filter()` dan `Boolean`.
2. Buat fungsi `cekKetersediaanBarang(stok)` yang mengembalikan `false` jika stok bernilai 0 atau tidak didefinisikan, dan mengembalikan `true` jika stok lebih dari 0.

---

## 7. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [08 - Math](../08-math/README.md)
- ➡️ **Selanjutnya:** [10 - Map](../10-map/README.md)
- 🏠 **Daftar Isi Modul 03:** [README Modul 03](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
