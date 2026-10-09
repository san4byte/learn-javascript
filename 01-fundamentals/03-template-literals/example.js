// =============================================================================
// MODUL 01 - FUNDAMENTALS: 03 - TEMPLATE LITERALS & STRING INTERPOLATION
// =============================================================================

console.log('=== 1. STRING INTERPOLATION & EKSPRESI DINAMIS ===');
const namaProduk = 'MacBook Pro M3';
const harga = 28000000;
const jumlah = 2;

// Interpolasi dengan ekspresi matematika dan format lokal
const ringkasanBelanja = `Produk: ${namaProduk}, Jumlah: ${jumlah}, Total: Rp ${(harga * jumlah).toLocaleString('id-ID')}`;
console.log(ringkasanBelanja);

// Evaluasi ternary kondisional langsung di dalam template
const statusStok = `Status Ketersediaan: ${jumlah > 0 ? 'Stok Tersedia' : 'Habis'}`;
console.log(statusStok);

console.log('\n=== 2. MULTI-LINE STRINGS & NESTED TEMPLATES ===');
const daftarFitur = ['M3 Chip 16-Core', 'Liquid Retina XDR', 'Baterai 22 Jam'];

// Template literal bersarang (Nested Template Literal)
const kartuHTML = `
<article class="kartu-produk">
  <header>
    <h2>${namaProduk}</h2>
  </header>
  <ul>
    ${daftarFitur.map((fitur) => `<li>${fitur}</li>`).join('\n    ')}
  </ul>
</article>
`.trim();

console.log('Hasil Render Kartu HTML:');
console.log(kartuHTML);

console.log('\n=== 3. TAGGED TEMPLATE LITERALS (FORMATTING & SANITASI) ===');
// Fungsi Tagged Template menerima array potongan string dan daftar nilai interpolasi
function sorotKataKunci(strings, ...values) {
  return strings.reduce((hasil, str, i) => {
    const nilai = values[i] !== undefined ? `[**${values[i]}**]` : '';
    return `${hasil}${str}${nilai}`;
  }, '');
}

const pengguna = 'Joko';
const peran = 'Super Admin';
const pesanSorot = sorotKataKunci`Pengguna ${pengguna} terautentikasi dengan hak akses ${peran}.`;
console.log(pesanSorot);

// Tagged template untuk sanitasi XSS sederhana
function sanitizeHTML(strings, ...values) {
  const escapeHTML = (str) =>
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  return strings.reduce((acc, str, i) => {
    const safeVal = values[i] !== undefined ? escapeHTML(values[i]) : '';
    return `${acc}${str}${safeVal}`;
  }, '');
}

const komentarPengguna = '<script>alert("XSS Attack!")</script>';
const htmlAman = sanitizeHTML`<div class="komentar">${komentarPengguna}</div>`;
console.log('Hasil Sanitasi Tagged Template:');
console.log(htmlAman);

console.log('\n=== 4. STRING.RAW (RAW STRINGS) ===');
// String.raw mencegah interpretasi karakter escape sequence seperti \n atau \t
const pathFileBiasa = `C:\\Users\\Joko\\Documents\\new_folder`;
const pathFileRaw = String.raw`C:\Users\Joko\Documents\new_folder`;

console.log('Teks biasa (dengan escape) :', pathFileBiasa);
console.log('Teks mentah via String.raw  :', pathFileRaw);
