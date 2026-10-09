// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('=== 1. PERBEDAAN ENCODEURI vs ENCODEURICOMPONENT ===');
const queryTeks = 'buku & majalah / edisi #1 (edisi baru)';

// encodeURI: Membiarkan karakter struktur URL (;,/?:@&=+$#) tetap utuh
console.log('encodeURI            :', encodeURI(queryTeks));
// encodeURIComponent: Mengubah SELURUH karakter khusus menjadi persen kode
console.log('encodeURIComponent   :', encodeURIComponent(queryTeks));

console.log('\n=== 2. MEMBANGUN URL QUERY YANG AMAN ===');
const baseUrl = 'https://toko-buku.com/search';
const keyword = 'React & Node.js: Panduan Pemula 100% Bagus!';
const kategori = 'IT / Web & Mobile';

// Gabungkan URL: baseUrl utuh, setiap nilai parameter di-encode secara individual
const urlLengkap = `${baseUrl}?q=${encodeURIComponent(keyword)}&kategori=${encodeURIComponent(kategori)}`;
console.log('URL Terformat Aman:\n' + urlLengkap);

console.log('\n=== 3. DECODING DATA (DECODEURI vs DECODEURICOMPONENT) ===');
const paramTersandi =
  'React%20%26%20Node.js%3A%20Panduan%20Pemula%20100%25%20Bagus!';

// decodeURI: Tidak memulihkan karakter reserved (%26 tetap %26)
console.log('decodeURI            :', decodeURI(paramTersandi));
// decodeURIComponent: Memulihkan seluruh karakter kembali ke teks murni
console.log('decodeURIComponent   :', decodeURIComponent(paramTersandi));

console.log('\n=== 4. PENANGANAN ERROR: JEBAKAN URIERROR ===');
function safeDecode(encodedStr, fallback = '') {
  try {
    return decodeURIComponent(encodedStr);
  } catch (err) {
    console.log(`[Error Tertangkap] ${err.name}: ${err.message}`);
    return fallback;
  }
}

// Persen ilegal atau tidak lengkap melempar URIError: URI malformed
const urlRusak = 'https://site.com/search?q=diskon100%';
console.log(
  'Decode aman URL rusak:',
  safeDecode(urlRusak, '[Fallback: String Rusak]'),
);

console.log('\n=== 5. PENANGANAN EMOJI & KARAKTER MULTIBYTE ===');
const teksEmoji = 'Selamat Pagi 🇮🇩 ☕';
const encodedEmoji = encodeURIComponent(teksEmoji);
console.log('Encoded Emoji        :', encodedEmoji);
console.log('Decoded Kembali      :', decodeURIComponent(encodedEmoji));

console.log('\n=== 6. STANDAR MODERN: URL & URLSEARCHPARAMS ===');
// API Modern browser & Node.js otomatis menangani percent-encoding komponen!
const myUrl = new URL('https://toko-buku.com/search');
myUrl.searchParams.set('q', keyword);
myUrl.searchParams.set('kategori', kategori);

console.log('Hasil via URL API    :\n' + myUrl.toString());
console.log('Nilai param dibaca   :', myUrl.searchParams.get('q'));
