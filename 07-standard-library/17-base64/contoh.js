// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- 1. Dasar Encoding & Decoding Base64 (ASCII Murni) ---');
const teksBiasa = 'Joko Santoso:Programmer';
const textToBase64 = btoa(teksBiasa);
const base64ToText = atob(textToBase64);

console.log('Teks Asli                :', teksBiasa);
console.log('Hasil btoa() (Base64)    :', textToBase64);
console.log('Hasil atob() (Decode)    :', base64ToText);

console.log('\n--- 2. Penanganan Masalah Karakter Unicode / Emoji ---');
const teksUnicode = 'Halo Dunia! 🌟 Selamat Belajar JavaScript 🚀';

// Helper Encode Unicode ke Base64 (Aman untuk UTF-8 dan Emoji)
function encodeBase64Unicode(str) {
  // 1. Bongkar string/emoji menjadi deretan byte UTF-8 (Uint8Array: angka 0-255)
  const bytes = new TextEncoder().encode(str);
  // 2. Ubah tiap angka byte menjadi karakter Latin-1 (0-255) agar muat di btoa
  const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  // 3. Masukkan ke btoa yang hanya menerima karakter rentang 0-255
  return btoa(binString);
}

// Helper Decode Base64 ke Unicode Asli
function decodeBase64Unicode(base64) {
  // 1. Buka Base64 kembali menjadi string karakter biner Latin-1
  const binString = atob(base64);
  // 2. Ambil nilai kode angka asli (0-255) dari tiap karakter menjadi Uint8Array
  const bytes = Uint8Array.from(binString, (char) => char.charCodeAt(0));
  // 3. Rakit kembali deretan byte UTF-8 menjadi string teks/emoji asli
  return new TextDecoder().decode(bytes);
}

const base64Aman = encodeBase64Unicode(teksUnicode);
const hasilDecodeAman = decodeBase64Unicode(base64Aman);

console.log('Teks Unicode Asli        :', teksUnicode);
console.log('Base64 Aman UTF-8        :', base64Aman);
console.log('Hasil Decode Sempurna    :', hasilDecodeAman);
