// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Perbandingan Sintaks Regular vs Arrow Function ---");
// Regular Function
const kaliRegular = function (a, b) {
  return a * b;
};

// Arrow Function (Multi-line)
const kaliArrow = (a, b) => {
  return a * b;
};

// Arrow Function (Satu Baris / Implicit Return)
const kaliRingkas = (a, b) => a * b;

console.log("Hasil kaliRingkas(5, 4):", kaliRingkas(5, 4));

console.log("\n--- 2. Perilaku Lexical 'this' pada Objek ---");
const kotakPesan = {
  judul: "Pemberitahuan Sistem",
  daftarPenerima: ["Joko", "Budi"],

  kirimNotifikasi: function () {
    // Di dalam regular function ini, 'this' mengacu pada objek kotakPesan
    console.log(`Mengirim: ${this.judul}`);

    // Menggunakan Arrow Function di dalam forEach:
    // Arrow Function mempertahankan 'this' milik kotakPesan!
    this.daftarPenerima.forEach((nama) => {
      console.log(`-> Notifikasi '${this.judul}' terkirim ke ${nama}`);
    });
  }
};

kotakPesan.kirimNotifikasi();
