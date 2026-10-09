# 12 - Sintaks Modern ES Lanjutan (Optional Chaining, Nullish Coalescing & Strict Mode)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengamankan pembacaan properti bertingkat dari crash fatal dengan _Optional Chaining_ (`?.`), menetapkan nilai default aman tanpa merusak nilai nol/string kosong dengan _Nullish Coalescing_ (`??`), serta mengunci eksekusi kode bersih bebas bug warisan dengan _Strict Mode_ (`'use strict'`).
> - **Kapan Digunakan**: Mengonsumsi data dinamis dari REST API yang bentuk propertinya tidak terjamin lengkap, konfigurasi aplikasi dengan nilai numerik default, dan debugging aplikasi.
> - **Aturan Praktis**: Gunakan `??` alih-alih `||` untuk penetapan fallback data angka atau teks. Jangan gunakan `?.` secara berlebihan jika suatu properti memang diwajibkan ada secara kontrak arsitektur sistem.

---

## 1. 🎯 Tujuan Belajar

- Menghindari galat fatal _TypeError: Cannot read properties of undefined_ menggunakan operator **Optional Chaining (`?.`)**.
- Menguasai pembacaan properti bersarang, elemen array opsional (`?.[]`), dan pemanggilan fungsi opsional (`?.()`).
- Membedakan perbedaan evaluasi antara operator Logika OR (`||`) dan **Nullish Coalescing (`??`)**.
- Menguasai penugasan ringkas modern menggunakan _Logical Assignment Operators_ (`??=`, `||=`, `&&=`).
- Memahami aturan pengamanan kode pada **Strict Mode (`'use strict'`)** dan teknik debugging menggunakan instruksi `debugger`.

---

## 2. 📖 Penjelasan Konsep & API Reference

### 🎭 Analogi Dunia Nyata

> - **Optional Chaining (`?.`)** seperti **mengetuk pintu pagar rumah secara sopan sebelum masuk**: Jika rumah tersebut ternyata tidak memiliki pintu samping (**undefined**), Anda langsung melangkah mundur dengan tenang dan selamat (**mengembalikan `undefined`**) tanpa mendobrak dinding dan memicu alarm kebakaran gedung (**crash `TypeError`**).
> - **Nullish Coalescing (`??`)** seperti **jaring pengaman barang jatuh**: Jaring hanya menangkap jika kotak yang dibawa kurir benar-benar hilang atau tidak berwujud (**`null` / `undefined`**). Jika kotak tersebut berisi uang koin nominal Rp 0 atau kertas kosong (**nilai `0` atau `""`**), kurir tetap diizinkan membawanya karena barang tersebut nyata ada.

---

### Tabel Perbandingan Operator Logika Modern

| Operator  | Nama Operator      | Kondisi Pemicu Evaluasi Kanan                                       | Contoh Kasus                     |
| :-------- | :----------------- | :------------------------------------------------------------------ | :------------------------------- | ----------------------------------------------------------------- | ------------------- | --- | ----------- |
| **`?.`**  | Optional Chaining  | Sisi kiri bernilai `null` atau `undefined` (langsung berhenti)      | `user?.address?.city`            |
| **`??`**  | Nullish Coalescing | Sisi kiri bernilai **HANYA** `null` atau `undefined`                | `const port = cfg.port ?? 3000;` |
| \*\*`     |                    | `\*\*                                                               | Logical OR Fallback              | Sisi kiri bernilai sembarang nilai **Falsy** (`0`, `""`, `false`) | `const teks = input |     | 'Default';` |
| **`??=`** | Nullish Assignment | Menetapkan nilai jika variabel saat ini bernilai `null`/`undefined` | `config.host ??= 'localhost';`   |

---

### Pembahasan Mendalam Fitur & API

#### 1. Sintaks Optional Chaining (`?.`) pada Properti Objek

Menghentikan evaluasi ekspresi dan segera menghasilkan `undefined` jika target sebelum tanda `?.` bernilai nullish:

```javascript
const response = { data: { profil: null } };
console.log(response.data.profil?.alamat?.kota); // undefined (tidak crash)
```

#### 2. Optional Chaining pada Indeks Array & Pemanggilan Method

- **Array indexing**: `daftarPesanan?.[0]`
- **Method call**: `logger.log?.('Pesan')` (jika method `log` tidak ada, tidak melempar error `is not a function`).

```javascript
const handler = {};
handler.onClick?.(); // Aman jika handler tidak mendefinisikan onClick
```

#### 3. Operator Nullish Coalescing (`??`) vs Logical OR (`||`)

Operator `||` salah mengartikan angka `0` atau string kosong `""` sebagai ketiadaan nilai:

```javascript
let totalSkor = 0;
const viaOR = totalSkor || 10; // 10 (Keliru: 0 ditimpa)
const viaNullish = totalSkor ?? 10; // 0 (Tepat: 0 dipertahankan)
```

#### 4. Operator Logical Assignment (`??=`, `||=`, `&&=`)

Menyederhanakan pola penugasan nilai bersyarat:

```javascript
let options = { timeout: 0 };
options.timeout ??= 5000; // timeout tetap 0
options.retries ??= 3; // retries dibuat dengan nilai 3
```

#### 5. Penegakan Disiplin Kode via Strict Mode (`'use strict'`)

Diletakkan di awal berkas atau fungsi untuk mengaktifkan aturan ketat compiler:

1. Menolak pembuatan variabel tanpa deklarasi (`x = 10` memicu `ReferenceError`).
2. Mencegah penulisan properti non-writable.
3. Menolak parameter duplikat pada fungsi (`function(a, a) {}`).

#### 6. Debugger Statement & Integrasi DevTools Breakpoints

Instruksi `debugger;` bertindak sebagai titik henti paksa (_breakpoint_) saat browser Developer Tools (F12) atau debugger VS Code sedang aktif:

```javascript
function hitungPajak(nilai) {
  // debugger; // Eksekusi browser akan dijeda di baris ini
  return nilai * 0.11;
}
```

---

## 3. 💻 Kode Praktik Terpadu (`example.js`)

Seluruh implementasi demonstrasi pemanfaatan Optional Chaining pada properti bersarang, array, dan method opsional, perbandingan akurasi Nullish Coalescing vs Logical OR pada data angka nol dan string kosong, penggunaan operator Logical Assignment `??=`, serta penegakan disiplin error Strict Mode telah dirangkum dalam berkas praktik [`example.js`](example.js).

Jalankan demonstrasi secara langsung di terminal Anda:

```bash
node 01-fundamentals/12-advanced-syntax/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Konsumsi Data Respons REST API**: Menghindari crash aplikasi frontend saat server merespons dengan data parsial:
   ```javascript
   const avatarUrl = user?.profile?.avatar?.url ?? "/images/default-avatar.png";
   ```
2. **Konfigurasi Pengaturan Aplikasi Audio / Skor**: Mempertahankan pengaturan volume suara `volume = 0` (mode senyap) tanpa dipaksa kembali ke volume 50%.

### ⚠️ Common Pitfalls

- **Menggabungkan `??` dengan `&&` atau `||` Tanpa Tanda Kurung**: Menulis `a || b ?? c` memicu `SyntaxError: Unexpected token '??'`. Mesin JavaScript mewajibkan pengelompokan eksplisit: `(a || b) ?? c`.
- **Menyalahgunakan `?.` di Sisi Kiri Penugasan**: Menulis `obj?.nama = 'Budi'` adalah kesalahan sintaks (_Invalid left-hand side in assignment_).

### 🌟 Best Practice

- Utamakan `??` daripada `||` untuk semua penanganan nilai fallback bawaan (_default value assignment_).
- Gunakan `?.` hanya pada batas data yang memang bersifat dinamis atau opsional.

---

## 5. ✍️ Latihan Mandiri

1. Diberikan objek `respons = { status: 200, payload: { user: { kontak: {} } } }`. Gunakan kombinasi Optional Chaining dan Nullish Coalescing untuk membaca `telepon` dengan fallback `'Nomor Tidak Tersedia'`.
2. Diberikan objek `setelan = { levelSuara: 0, kualitas: '' }`. Bandingkan nilai hasil saat mengisi properti tersebut menggunakan `setelan.levelSuara || 80` dan `setelan.levelSuara ?? 80`.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [11 - Tipe Data Lanjutan](../11-data-types-and-operators/README.md)
- ➡️ **Selanjutnya:** [Modul 02 - Object-Oriented Programming (OOP)](../../02-oop/01-constructor-function/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
