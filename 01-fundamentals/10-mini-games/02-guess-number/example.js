// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- Mini Game: Tebak Angka (Simulasi Alur Logika) ---');

function jalankanPermainanTebakAngka(daftarTebakanPemain) {
  // 1. Komputer membangkitkan angka rahasia acak 1 sampai 10
  const angkaRahasia = 7; // Diset 7 untuk tujuan demonstrasi deterministik
  let kesempatan = 3;
  let menang = false;

  console.log('Komputer telah memikirkan angka antara 1 sampai 10.');
  console.log(`Anda memiliki ${kesempatan} kali kesempatan tebakan.\n`);

  for (let i = 0; i < daftarTebakanPemain.length; i++) {
    const tebakan = daftarTebakanPemain[i];
    kesempatan--;

    console.log(`[Tebakan ke-${i + 1}]: Anda menebak ${tebakan}`);

    if (tebakan === angkaRahasia) {
      console.log(`🎉 SELAMAT! Tebakan Anda BENAR! Angka rahasia adalah ${angkaRahasia}.`);
      menang = true;
      break;
    } else if (tebakan < angkaRahasia) {
      console.log(`-> Terlalu RENDAH! (Sisa kesempatan: ${kesempatan})`);
    } else {
      console.log(`-> Terlalu TINGGI! (Sisa kesempatan: ${kesempatan})`);
    }

    if (kesempatan === 0) {
      console.log(`\n💀 KESEMPATAN HABIS! Anda kalah. Angka rahasianya adalah ${angkaRahasia}.`);
      break;
    }
  }
}

// Simulasi pemain yang berhasil menang di tebakan ke-3
jalankanPermainanTebakAngka([3, 9, 7]);
