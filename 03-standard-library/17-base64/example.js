/**
 * ==============================================================================
 * MATERI 17: BASE64 (btoa, atob, UTF-8 UNICODE, & BASE64URL)
 * ==============================================================================
 *
 * File ini mendemonstrasikan secara komprehensif:
 * 1. Dasar Encoding & Decoding Base64 (ASCII Murni via btoa & atob)
 * 2. Jebakan Fatal Latin-1 Range Error pada btoa()
 * 3. Solusi Universal Modern UTF-8 (TextEncoder & TextDecoder)
 * 4. Pendekatan Spesifik Node.js (Buffer API)
 * 5. Varian Base64URL (URL-Safe Base64 untuk JWT & URL Parameter)
 * 6. Studi Kasus Nyata: Basic Auth Header, Data URL, & Peringatan Keamanan
 *
 * Eksekusi: node 03-standard-library/17-base64/example.js
 * ==============================================================================
 */

// ==============================================================================
// 1. DASAR ENCODING & DECODING BASE64 (ASCII MURNI)
// ==============================================================================
console.log('--- 1. DASAR btoa() DAN atob() (ASCII MURNI) ---');

const credentials = 'admin:secret123';

// btoa() = binary to ASCII (Encode)
const encodedAscii = btoa(credentials);

// atob() = ASCII to binary (Decode)
const decodedAscii = atob(encodedAscii);

console.log('Teks Asli        :', credentials);
console.log('Hasil btoa()     :', encodedAscii);
console.log('Hasil atob()     :', decodedAscii);
console.log('Apakah Cocok?    :', credentials === decodedAscii);

// Penjelasan Padding Base64 (=):
// Setiap 3 byte (24 bit) data diubah menjadi 4 karakter Base64 (6 bit per karakter).
// Jika panjang string bukan kelipatan 3 byte, karakter '=' ditambahkan di akhir sebagai padding.
console.log('\nDemonstrasi Padding Base64 (=):');
console.log('"a"   (1 byte) ->', btoa('a')); // "YQ==" (2 padding =)
console.log('"ab"  (2 byte) ->', btoa('ab')); // "YWI=" (1 padding =)
console.log('"abc" (3 byte) ->', btoa('abc')); // "YWJj"  (0 padding)

// ==============================================================================
// 2. JEBAKAN FATAL: LATIN-1 RANGE ERROR PADA btoa()
// ==============================================================================
console.log('\n--- 2. JEBAKAN FATAL: LATIN-1 RANGE ERROR PADA btoa() ---');

// btoa() HANYA mendukung karakter 8-bit Latin-1 (code point 0x00 - 0xFF / 0 - 255).
// Karakter Unicode, aksara non-Latin, atau emoji (> 255) akan melempar error fatal!
const teksUnicode = 'Halo Dunia! 🌟 Kopi ☕';

try {
  btoa(teksUnicode);
} catch (error) {
  console.log('Error tertangkap saat btoa(emoji):');
  console.log('Nama Error  :', error.name);
  console.log('Pesan Error :', error.message);
}

// ==============================================================================
// 3. SOLUSI UNIVERSAL MODERN UTF-8 (TextEncoder & TextDecoder)
// ==============================================================================
console.log('\n--- 3. SOLUSI UNIVERSAL MODERN: TextEncoder & TextDecoder ---');

/**
 * Meng-encode string Unicode / UTF-8 apa pun ke Base64 dengan aman.
 * Berjalan di Browser Modern dan Node.js 18+.
 */
function utf8ToBase64(str) {
  // 1. Ubah string UTF-8 menjadi deretan Uint8Array (angka 0 - 255 per byte)
  const bytes = new TextEncoder().encode(str);
  // 2. Ubah Uint8Array menjadi binary string (setiap byte jadi 1 char Latin-1)
  const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join(
    '',
  );
  // 3. Encode binary string menggunakan btoa bawaan
  return btoa(binString);
}

/**
 * Memulihkan string Base64 kembali menjadi string UTF-8 Unicode asli.
 */
function base64ToUtf8(base64) {
  // 1. Decode Base64 menjadi binary string Latin-1
  const binString = atob(base64);
  // 2. Ubah binary string menjadi Uint8Array byte buffer
  const bytes = Uint8Array.from(binString, (char) => char.charCodeAt(0));
  // 3. Decode byte buffer UTF-8 kembali ke string JavaScript asli
  return new TextDecoder().decode(bytes);
}

const inputMultiBahasa = 'Indonesia 🇮🇩 • 日本語 (Konnichiwa) • 🚀';
const encodedMulti = utf8ToBase64(inputMultiBahasa);
const decodedMulti = base64ToUtf8(encodedMulti);

console.log('String Asli      :', inputMultiBahasa);
console.log('Base64 UTF-8     :', encodedMulti);
console.log('Hasil Restore    :', decodedMulti);
console.log('Validasi Restore :', inputMultiBahasa === decodedMulti);

// ==============================================================================
// 4. PENDEKATAN SPESIFIK NODE.JS (Buffer API)
// ==============================================================================
console.log('\n--- 4. PENDEKATAN SPESIFIK NODE.JS (Buffer API) ---');

// Di lingkungan Node.js murni, objek Buffer adalah cara paling ringkas dan berkinerja tinggi:
const nodeTeks = 'Belajar JavaScript Modern 🚀';

// Encode string ke Base64 via Buffer
const nodeBase64 = Buffer.from(nodeTeks, 'utf-8').toString('base64');

// Decode Base64 ke string via Buffer
const nodeRestore = Buffer.from(nodeBase64, 'base64').toString('utf-8');

console.log('Teks Asli        :', nodeTeks);
console.log('Buffer -> Base64 :', nodeBase64);
console.log('Base64 -> Buffer :', nodeRestore);
console.log('Hasil Sama?      :', nodeBase64 === utf8ToBase64(nodeTeks));

// ==============================================================================
// 5. BASE64URL (URL-SAFE BASE64 UNTUK JWT & URL PARAMETERS)
// ==============================================================================
console.log('\n--- 5. BASE64URL (URL-SAFE BASE64) ---');

// Karakter '+' dan '/' dalam Base64 standar bisa bentrok dengan reserved character di URL.
// Base64URL menyelesaikan masalah ini:
// '+' diganti '-'
// '/' diganti '_'
// '=' padding dipangkas (opsional / opsional dihapus)

function toBase64Url(base64) {
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(base64Url) {
  // 1. Kembalikan '-' ke '+' dan '_' ke '/'
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  // 2. Tambahkan padding '=' kembali jika diperlukan (kelipatan 4)
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  return base64;
}

const teksDenganKarakterKhusus = 'subjects? > 100 & scores < 50'; // Menghasilkan '+' atau '/' di base64 biasa
const b64Standar = utf8ToBase64(teksDenganKarakterKhusus);
const b64Url = toBase64Url(b64Standar);
const restoredB64 = fromBase64Url(b64Url);
const restoredText = base64ToUtf8(restoredB64);

console.log('Teks Asli        :', teksDenganKarakterKhusus);
console.log('Base64 Standar   :', b64Standar);
console.log('Base64URL        :', b64Url);
console.log('Restored Text    :', restoredText);

// ==============================================================================
// 6. STUDI KASUS NYATA: BASIC AUTH, DATA URL, & KEAMANAN
// ==============================================================================
console.log('\n--- 6. STUDI KASUS NYATA & ANALISIS KEAMANAN ---');

// Kasus A: HTTP Basic Authorization Header
function createBasicAuthHeader(username, password) {
  const credentials = `${username}:${password}`;
  const encoded = btoa(credentials);
  return `Basic ${encoded}`;
}

const authHeader = createBasicAuthHeader('joko_dev', 'P@ssw0rd123');
console.log('HTTP Header Authorization:', authHeader);

// Kasus B: Data URL (Inline Plain Text / JSON Data)
function createDataUrl(payload, mimeType = 'text/plain') {
  const base64Data = utf8ToBase64(payload);
  return `data:${mimeType};charset=utf-8;base64,${base64Data}`;
}

const dummyJson = JSON.stringify({ name: 'Laptop Pro', price: 15000000 });
const dataUrl = createDataUrl(dummyJson, 'application/json');
console.log('Generated Data URL       :', dataUrl);

// Kasus C: JEBAKAN KEAMANAN - Base64 BUKAN Enkripsi!
console.log('\n[PERINGATAN KEAMANAN]: Mengapa Base64 BUKAN Enkripsi?');
const passwordSensitif = 'RahasiaSuperBank123!';
const pseudoTersimpan = utf8ToBase64(passwordSensitif);

console.log('Disimpan sebagai Base64  :', pseudoTersimpan);

// Siapa pun dapat dengan mudah membukanya tanpa kunci dekripsi:
const dibongkarHacker = base64ToUtf8(pseudoTersimpan);
console.log('Dibongkar Semudah atob() :', dibongkarHacker);
console.log(
  'Kesimpulan: JANGAN PERNAH gunakan Base64 untuk menyembunyikan data sensitif / password!',
);
