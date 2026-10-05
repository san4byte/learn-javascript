// Penjelasan lengkap materi ini dapat dilihat di README.md

// 1. Helper Universal (agar kode tidak crash saat dijalankan via terminal Node.js)
const universalAlert = typeof alert !== 'undefined' ? alert : (msg) => console.log(`[ALERT]: ${msg}`);
const universalPrompt = typeof prompt !== 'undefined' ? prompt : (msg) => "Joko Santoso";
const universalConfirm = typeof confirm !== 'undefined' ? confirm : (msg) => false; // agar loop berhenti di terminal

universalAlert("Selamat datang di Pembelajaran JavaScript!");

let lanjut = true;
let hitungan = 1;

while (lanjut && hitungan <= 2) {
  const nama = universalPrompt("Masukkan nama Anda:");
  universalAlert(`Halo ${nama}, ini iterasi ke-${hitungan}`);
  
  // Konfirmasi apakah ingin mengulang lagi
  lanjut = universalConfirm("Apakah Anda ingin mencoba lagi?");
  hitungan++;
}

universalAlert("Terima kasih telah berkunjung!");
