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
