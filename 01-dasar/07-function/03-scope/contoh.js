// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Demonstrasi Scope Chain ---");
const variabelGlobal = "Saya berada di Global Scope";

function fungsiLuar() {
  const variabelLokalLuar = "Saya berada di Fungsi Luar";

  function fungsiDalam() {
    const variabelLokalDalam = "Saya berada di Fungsi Dalam";

    // fungsiDalam dapat mengakses variabelnya sendiri, variabel fungsi luar, dan global:
    console.log("Akses dari dalam:");
    console.log("- " + variabelLokalDalam);
    console.log("- " + variabelLokalLuar); // Scope chain ke fungsiLuar
    console.log("- " + variabelGlobal);     // Scope chain ke Global
  }

  fungsiDalam();
  // console.log(variabelLokalDalam); // ERROR: tidak bisa diakses dari luar
}

fungsiLuar();

console.log("\n--- 2. Variable Shadowing (Variabel Menutupi Variabel Luar) ---");
let mataUang = "IDR";

function konversi() {
  let mataUang = "USD"; // Shadowing: variabel lokal menutupi variabel global
  console.log("Mata uang di dalam fungsi:", mataUang); // USD
}

konversi();
console.log("Mata uang di luar fungsi :", mataUang); // Tetap IDR
