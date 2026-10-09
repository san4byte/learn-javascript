// =============================================================================
// MODUL 01 - FUNDAMENTALS: 07.4 - CLOSURES & LEXICAL SCOPE
// =============================================================================

console.log('=== 1. FUNCTION FACTORY DENGAN CLOSURE ===');
// Fungsi luar mengembalikan fungsi dalam yang mempertahankan akses ke 'salam'
function buatPenyapa(salam) {
  return function (nama) {
    return `${salam}, ${nama}! Selamat beraktivitas.`;
  };
}

const sapaPagi = buatPenyapa('Selamat Pagi');
const sapaMalam = buatPenyapa('Selamat Malam');

console.log(sapaPagi('Joko'));
console.log(sapaMalam('Budi'));

console.log('\n=== 2. DATA ENKAPSULASI (PRIVATE STATE) ===');
function buatRekening(saldoAwal) {
  let saldo = saldoAwal; // Variabel privat (tidak dapat diakses atau diubah langsung dari luar)

  return {
    setor(jumlah) {
      if (jumlah > 0) {
        saldo += jumlah;
        console.log(
          `Setor: Rp ${jumlah.toLocaleString('id-ID')} | Saldo Baru: Rp ${saldo.toLocaleString('id-ID')}`,
        );
      }
    },
    tarik(jumlah) {
      if (jumlah <= saldo) {
        saldo -= jumlah;
        console.log(
          `Tarik: Rp ${jumlah.toLocaleString('id-ID')} | Sisa Saldo: Rp ${saldo.toLocaleString('id-ID')}`,
        );
      } else {
        console.log('Penarikan ditolak: Saldo tidak mencukupi!');
      }
    },
    cekSaldo() {
      return saldo;
    },
  };
}

const tabungan = buatRekening(500000);
tabungan.setor(150000);
tabungan.tarik(200000);

// Pembuktian enkapsulasi privat:
console.log('Akses langsung tabungan.saldo:', tabungan.saldo); // undefined
console.log(
  'Saldo resmi via cekSaldo()   : Rp',
  tabungan.cekSaldo().toLocaleString('id-ID'),
);

console.log('\n=== 3. MEMOIZATION / CACHING DENGAN CLOSURE ===');
// Memanfaatkan closure cache untuk menyimpan hasil komputasi berat
function buatKalkulatorPangkat() {
  const cache = {}; // Tertutup rapat dalam closure

  return function (angka) {
    if (angka in cache) {
      console.log(
        `[CACHE HIT]: Mengambil hasil pangkat 2 dari ${angka} dari cache`,
      );
      return cache[angka];
    }
    console.log(`[KOMPUTASI]: Menghitung pangkat 2 dari ${angka}...`);
    const hasil = angka * angka;
    cache[angka] = hasil;
    return hasil;
  };
}

const kuadrat = buatKalkulatorPangkat();
console.log('Hasil 1:', kuadrat(9));
console.log('Hasil 2:', kuadrat(9)); // Diambil dari cache
console.log('Hasil 3:', kuadrat(5));
