# 09 - Boolean (Boolean Wrapper, toString, dan valueOf)

## 1. 🎯 Tujuan Belajar
- Memahami tipe primitif `boolean` dan objek wrapper bawaan `Boolean`.\n- Mengetahui jebakan fatal penggunaan `new Boolean()` dan mengapa konstruktor objek ini dihindari di industri.\n- Menguasai fungsi konversi truthy/falsy menggunakan `Boolean(value)` dan double-negation (`!!value`).\n- Memahami method instance `toString()` dan `valueOf()` pada objek Boolean.

---

## 2. 📖 Penjelasan Konsep
Tipe data primitif **`boolean`** hanya memiliki dua nilai: `true` dan `false`. Di JavaScript, terdapat juga objek pembungkus bawaan bernama **`Boolean`**.

### 1. Fungsi Konversi `Boolean(value)` vs `new Boolean(value)`
* **`Boolean(value)` (Tanpa keyword `new`)**: Berfungsi sebagai fungsi konversi tipe (*type caster*) untuk mengubah nilai apa pun menjadi boolean primitif (`true` atau `false`) berdasarkan aturan *Truthy* dan *Falsy*.
* **`new Boolean(value)` (Dengan keyword `new`)**: Membuat **objek wrapper** bertipe `object`.
  > ⚠️ **Jebakan Fatal**: Seluruh objek di JavaScript bernilai **Truthy**! Oleh karena itu, `new Boolean(false)` di dalam pernyataan `if` akan dievaluasi sebagai **`true`**! Hindari penggunaan `new Boolean()`.

### 2. Nilai-Nilai Falsy di JavaScript
Segala nilai berikut akan menghasilkan `false` saat dikonversi ke Boolean:
1. `false`
2. `0`, `-0`, `0n` (BigInt nol)
3. `""` (string kosong)
4. `null`
5. `undefined`
6. `NaN`
Selain 6 nilai di atas, semua nilai lainnya di JavaScript adalah **Truthy** (termasuk string spasi `" "`, array kosong `[]`, dan objek kosong `{}`).

### 3. Method Bawaan `Boolean`
* **`bool.toString()`**: Mengembalikan representasi teks string `"true"` atau `"false"`.
* **`bool.valueOf()`**: Mengembalikan nilai primitif boolean dari wrapper objek.

---

## 3. 💻 Contoh Kode (`contoh.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Konversi Nilai Menggunakan Boolean() ---");
// Nilai-nilai Falsy:
console.log("Boolean(0)             :", Boolean(0));         // false
console.log("Boolean('')            :", Boolean(""));        // false
console.log("Boolean(null)          :", Boolean(null));      // false
console.log("Boolean(undefined)     :", Boolean(undefined)); // false
console.log("Boolean(NaN)           :", Boolean(NaN));       // false

// Nilai-nilai Truthy:
console.log("Boolean('Halo')        :", Boolean("Halo"));    // true
console.log("Boolean([])            :", Boolean([]));        // true (Array kosong tetap truthy!)
console.log("Boolean({})            :", Boolean({}));        // true (Objek kosong tetap truthy!)

console.log("\n--- 2. Jebakan Fatal: new Boolean(false) ---");
const statusPalsu = new Boolean(false);
console.log("Tipe data statusPalsu  :", typeof statusPalsu); // "object"

if (statusPalsu) {
  console.log("EKSEKUSI TERJADI: new Boolean(false) dianggap TRUTHY karena bertipe object!");
}

console.log("\n--- 3. Teknik Modern Double Negation (!!) ---");
const namaPengguna = "joko_santoso";
const isNamaTerisi = !!namaPengguna; // Setara dengan Boolean(namaPengguna)
console.log("Apakah nama terisi (!!):", isNamaTerisi);

console.log("\n--- 4. Method toString() dan valueOf() ---");
const aktif = true;
console.log("toString()             :", aktif.toString(), "(tipe:", typeof aktif.toString() + ")");
console.log("valueOf()              :", aktif.valueOf(), "(tipe:", typeof aktif.valueOf() + ")");
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Konversi Nilai Menggunakan Boolean() ---
Boolean(0)             : false
Boolean('')            : false
Boolean(null)          : false
Boolean(undefined)     : false
Boolean(NaN)           : false
Boolean('Halo')        : true
Boolean([])            : true
Boolean({})            : true

--- 2. Jebakan Fatal: new Boolean(false) ---
Tipe data statusPalsu  : object
EKSEKUSI TERJADI: new Boolean(false) dianggap TRUTHY karena bertipe object!

--- 3. Teknik Modern Double Negation (!!) ---
Apakah nama terisi (!!): true

--- 4. Method toString() dan valueOf() ---
toString()             : true (tipe: string)
valueOf()              : true (tipe: boolean)
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> Tipe primitif `boolean` seperti **saklar lampu dinding**: hanya bisa berada di posisi Nyala (`true`) atau Mati (`false`). Menggunakan `new Boolean(false)` seperti **membungkus saklar mati tersebut ke dalam kardus paket pos**: kardus paketnya berwujud nyata ada di depan mata Anda (bertipe objek / truthy), meskipun saklar di dalamnya mati.

### 🏢 Real-World Use Case
1. **Validasi Keberadaan Input**: Memastikan string pencarian tidak kosong menggunakan `Boolean(searchQuery.trim())` atau `!!searchQuery`.\n2. **Pengalihan Nilai State UI**: Mengonversi nilai non-boolean dari API menjadi murni `true`/`false` untuk properti disabled tombol di React/Vue.\n3. **Penyaringan Elemen Falsy**: Membuang nilai-nilai kosong dari array menggunakan `array.filter(Boolean)`.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Menggunakan `new Boolean()`**: Selalu hindari `new Boolean()`. Ia menciptakan objek yang selalu bernilai truthy dalam evaluasi percabangan logika.\n* **Mengira array kosong `[]` bernilai falsy**: Di JavaScript, array dan objek kosong tetap bernilai truthy (`Boolean([]) === true`). Untuk mengecek kekosongan array, periksa panjangnya: `arr.length > 0`.\n* **String 'false' bernilai truthy**: `Boolean('false')` menghasilkan `true` karena string tidak kosong. Hanya string kosong `""` yang menghasilkan `false`.

### 🌟 Best Practice
* Gunakan fungsi `Boolean(x)` atau operator double negation `!!x` untuk mengonversi data menjadi boolean primitif murni.\n* Gunakan idiom fungsional `daftar.filter(Boolean)` untuk membersihkan array dari elemen `null`, `undefined`, atau string kosong secara instan.\n* Hindari membandingkan nilai boolean secara eksplisit seperti `if (isAktif === true)`, cukup tulis `if (isAktif)`.

---

## 6. ✍️ Latihan Mandiri
1. Diberikan array campuran `[0, 'Joko', '', null, 'Budi', undefined, NaN, 'Siti']`. Bersihkan seluruh nilai falsy sehingga hanya tersisa nama-nama yang valid menggunakan `filter()` dan `Boolean`.\n2. Buat fungsi `cekKetersediaanBarang(stok)` yang mengembalikan `false` jika stok bernilai 0 atau tidak didefinisikan, dan mengembalikan `true` jika stok lebih dari 0.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [08 - Math](../08-math/README.md)\n- ➡️ **Selanjutnya:** [10 - Map](../10-map/README.md)\n- 🏠 **Daftar Isi Modul 07:** [README Modul 07](../README.md)\n- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
