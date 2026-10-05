# 08.2 - Destructuring Array dan Spread Operator

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Memahami sintaks Destructuring Assignment pada Array.
> * **Kapan Digunakan**: Mampu menukar nilai dua variabel (*variable swap*) tanpa variabel sementara.
> * **Aturan Praktis**: Gunakan Spread Operator untuk penggabungan array alih-alih `array.concat()`.

## 1. 🎯 Tujuan Belajar
- Memahami sintaks Destructuring Assignment pada Array.
- Mampu menukar nilai dua variabel (*variable swap*) tanpa variabel sementara.
- Menguasai Spread Operator (`...`) untuk menyalin dan menggabungkan array.
- Mengetahui cara memberikan nilai default pada destructuring array.

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Destructuring seperti **membongkar paket parsel lebaran**: daripada membawa keranjang parselnya ke mana-mana, Anda langsung mengambil kaleng biskuit dan sirupnya ke tangan Anda. Spread operator seperti **menumpahkan isi kantong kelereng ke atas lantai**: seluruh butir kelereng tersebar bebas satu per satu.

ES6 memperkenalkan dua fitur yang menyederhanakan penanganan data Array:

### 1. Destructuring Array
Membongkar (*unpack*) elemen-elemen dari dalam array secara langsung ke dalam variabel-variabel terpisah:
```javascript
const [pertama, kedua, ketiga = "Default"] = arraySumber;
```
Dapat juga digunakan untuk menukar dua variabel (*swap*) secara instan:
`[a, b] = [b, a];`

### 2. Spread Operator (`...`)
Membongkar (*menyebarkan*) seluruh elemen array menjadi elemen individual. Sangat berguna untuk:
* Menggabungkan dua atau lebih array: `[...arr1, ...arr2]`.
* Membuat salinan (*shallow copy*) array tanpa referensi yang sama: `const copy = [...arr1]`.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Destructuring Array Dasar ---");
const koordinatGPS = [-6.2088, 106.8456, 15]; // [latitude, longitude, altitude]

// Membongkar elemen ke variabel mandiri
const [latitude, longitude, altitude = 0] = koordinatGPS;
console.log(`Latitude: ${latitude} | Longitude: ${longitude} | Ketinggian: ${altitude}m`);

console.log("\n--- 2. Trik Variable Swap (Tukar Nilai Tanpa Variabel Temp) ---");
let pemenang1 = "Budi";
let pemenang2 = "Joko";

console.log(`Sebelum ditukar: Juara 1 = ${pemenang1}, Juara 2 = ${pemenang2}`);
// Tukar posisi secara instan:
[pemenang1, pemenang2] = [pemenang2, pemenang1];
console.log(`Setelah ditukar : Juara 1 = ${pemenang1}, Juara 2 = ${pemenang2}`);

console.log("\n--- 3. Spread Operator: Menggabungkan & Mengklon Array ---");
const buahLokal = ["Pisang", "Mangga"];
const buahImpor = ["Apel", "Jeruk"];

// Menggabungkan array secara modern
const semuaBuah = ["Semangka", ...buahLokal, ...buahImpor];
console.log("Gabungan Buah:", semuaBuah);

// Kloning array independen
const klonBuahLokal = [...buahLokal];
klonBuahLokal.push("Durian");

console.log("Buah lokal asli :", buahLokal);      // Tetap 2 item (tidak termutasi)
console.log("Klon buah lokal :", klonBuahLokal);  // 3 item
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Destructuring Array Dasar ---
Latitude: -6.2088 | Longitude: 106.8456 | Ketinggian: 15m

--- 2. Trik Variable Swap (Tukar Nilai Tanpa Variabel Temp) ---
Sebelum ditukar: Juara 1 = Budi, Juara 2 = Joko
Setelah ditukar : Juara 1 = Joko, Juara 2 = Budi

--- 3. Spread Operator: Menggabungkan & Mengklon Array ---
Gabungan Buah: [ 'Semangka', 'Pisang', 'Mangga', 'Apel', 'Jeruk' ]
Buah lokal asli : [ 'Pisang', 'Mangga' ]
Klon buah lokal : [ 'Pisang', 'Mangga', 'Durian' ]
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **Return Value Majemuk dari Function**: Fungsi yang mengembalikan beberapa nilai sekaligus dalam format tuple (seperti `const [data, setData] = useState()` di React).
2. **Kloning State Immutability**: Menambahkan item baru ke array keranjang belanja tanpa memutasikan state asli: `setCart([...cart, newItem])`.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Spread Operator Hanya Melakukan Shallow Copy**: Jika array berisi objek di dalamnya, spread operator hanya menyalin alamat memorinya saja. Objek di dalamnya tetap saling terhubung (gunakan `structuredClone()` untuk deep copy).
* **Mengabaikan Elemen Kosong**: Jika ingin melewati elemen tertentu saat destructuring, gunakan koma kosong: `const [pertama, , ketiga] = arr`.

### 🌟 Best Practice
* Gunakan Spread Operator untuk penggabungan array alih-alih `array.concat()`.
* Selalu sediakan nilai default jika elemen array yang di-destructure berpotensi bernilai `undefined`.

---

## 6. ✍️ Latihan Mandiri
1. Diberikan array `rgb = [255, 128, 0]`. Lakukan destructuring ke dalam variabel `merah`, `hijau`, dan `biru`.
2. Gabungkan array `hobiPagi = ['Lari', 'Sepeda']` dan `hobiSore = ['Renang']` menggunakan spread operator.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [08.1 - Manipulasi Array](../01-array-manipulation/README.md)
- ➡️ **Selanjutnya:** [08.3 - Project Kelola Penumpang](../03-project-manage-passengers/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
