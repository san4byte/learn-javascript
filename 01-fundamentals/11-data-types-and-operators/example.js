// Tipe Data Khusus, Operator Typeof, In, dan Truthy/Falsy

// 1. Undefined vs Null
let belumDiisi;
console.log("Nilai belum diisi:", belumDiisi); // undefined

let sengajaKosong = null;
console.log("Nilai sengaja dikosongkan:", sengajaKosong); // null

// 2. Operator typeof
console.log("typeof 100:", typeof 100);             // number
console.log("typeof 'Halo':", typeof "Halo");       // string
console.log("typeof true:", typeof true);           // boolean
console.log("typeof null:", typeof null);           // object (quirk historis JS)
console.log("typeof undefined:", typeof undefined); // undefined

// 3. Operator 'in' (Mengecek keberadaan properti/index)
const orang = { nama: "Joko", umur: 25 };
console.log("'nama' in orang:", "nama" in orang);   // true
console.log("'alamat' in orang:", "alamat" in orang); // false

const buah = ["Apel", "Jeruk"];
console.log("0 in buah (cek index 0):", 0 in buah); // true
console.log("5 in buah (cek index 5):", 5 in buah); // false

// 4. Truthy dan Falsy
// Nilai falsy di JS: false, 0, -0, "", null, undefined, NaN
const nilaiUji = ["", 0, null, undefined, NaN, "Ada teks", 123, [], {}];
console.log("\n--- Evaluasi Truthy & Falsy ---");
nilaiUji.forEach((item) => {
  if (item) {
    console.log(`[TRUTHY]:`, item);
  } else {
    console.log(`[FALSY] :`, item);
  }
});
