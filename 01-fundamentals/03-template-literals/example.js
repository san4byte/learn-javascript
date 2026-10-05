// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. String Interpolasi vs Penggabungan Konvensional ---");
const namaProduk = "MacBook Pro M3";
const harga = 28000000;
const jumlah = 2;

// Cara Lama (ES5) - Rawan typo spasi dan tanda tambah
const caraLama = "Produk: " + namaProduk + ", Total: Rp " + (harga * jumlah);
console.log("Cara Lama:", caraLama);

// Cara Modern (ES6 Template Literals)
const caraModern = `Produk: ${namaProduk}, Total: Rp ${(harga * jumlah).toLocaleString('id-ID')}`;
console.log("Cara Modern:", caraModern);

console.log("\n--- 2. Multi-line String (Sangat Berguna untuk Template HTML) ---");
const kartuProfilHTML = `
<div class="user-card">
  <h2>${namaProduk}</h2>
  <p class="status">${jumlah > 0 ? "Stok Tersedia" : "Habis"}</p>
</div>
`.trim();

console.log("Output Multi-line:");
console.log(kartuProfilHTML);

console.log("\n--- 3. Tagged Template Literals (Contoh Sanitasi Sederhana) ---");
function sorotKataKunci(strings, ...values) {
  return strings.reduce((hasil, str, i) => {
    const nilai = values[i] ? `[**${values[i]}**]` : "";
    return `${hasil}${str}${nilai}`;
  }, "");
}

const pengguna = "Joko";
const statusAkun = "Super Admin";
const hasilTagged = sorotKataKunci`Halo ${pengguna}, peran Anda saat ini adalah ${statusAkun}.`;
console.log(hasilTagged);
