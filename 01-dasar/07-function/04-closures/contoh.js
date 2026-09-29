// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Function Factory dengan Closure ---");
function buatFungsiPenyapa(waktu) {
  // Variabel 'waktu' berada di outer lexical environment
  return function (nama) {
    return `Selamat ${waktu}, ${nama}! Selamat beraktivitas.`;
  };
}

// Membuat fungsi spesifik dari factory
const sapaPagi = buatFungsiPenyapa("Pagi");
const sapaMalam = buatFungsiPenyapa("Malam");

console.log(sapaPagi("Joko"));
console.log(sapaMalam("Budi"));

console.log("\n--- 2. Enkapsulasi / Private Variable dengan Closure ---");
function buatRekeningTabungan(saldoAwal) {
  let saldo = saldoAwal; // Private variable (tidak bisa diakses langsung dari luar)

  return {
    setorUang: function (jumlah) {
      saldo += jumlah;
      console.log(`Setor Rp ${jumlah.toLocaleString('id-ID')} | Saldo saat ini: Rp ${saldo.toLocaleString('id-ID')}`);
    },
    tarikUang: function (jumlah) {
      if (jumlah <= saldo) {
        saldo -= jumlah;
        console.log(`Tarik Rp ${jumlah.toLocaleString('id-ID')} | Sisa saldo: Rp ${saldo.toLocaleString('id-ID')}`);
      } else {
        console.log("Penarikan gagal: Saldo tidak mencukupi!");
      }
    },
    cekSaldo: function () {
      return saldo;
    }
  };
}

const rekeningJoko = buatRekeningTabungan(500000);
rekeningJoko.setorUang(200000);
rekeningJoko.tarikUang(100000);

// Mencoba membobol saldo secara langsung:
console.log("Akses langsung rekeningJoko.saldo:", rekeningJoko.saldo); // undefined (AMAN!)
console.log("Saldo resmi via cekSaldo()          : Rp", rekeningJoko.cekSaldo().toLocaleString('id-ID'));
