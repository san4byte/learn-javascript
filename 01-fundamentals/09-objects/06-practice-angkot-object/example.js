// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- Sistem Pengelolaan Angkot Berbasis Objek ---");

function Angkot(sopir, trayek, penumpang, kas) {
  this.sopir = sopir;
  this.trayek = trayek;
  this.penumpang = penumpang;
  this.kas = kas;

  // Method Penumpang Naik
  this.penumpangNaik = function (nama) {
    this.penumpang.push(nama);
    console.log(`[NAIK]: ${nama} naik ke angkot trayek ${this.trayek.join(" - ")}.`);
    return this.penumpang;
  };

  // Method Penumpang Turun & Pembayaran
  this.penumpangTurun = function (nama, ongkos) {
    if (this.penumpang.length === 0) {
      console.log("Angkot masih kosong!");
      return false;
    }

    for (let i = 0; i < this.penumpang.length; i++) {
      if (this.penumpang[i] === nama) {
        this.penumpang[i] = undefined; // Kursi kosong kembali
        this.kas += ongkos; // Kas bertambah
        console.log(`[TURUN & BAYAR]: ${nama} turun dan membayar Rp ${ongkos.toLocaleString('id-ID')}.`);
        console.log(`-> Kas Sopir ${this.sopir} saat ini: Rp ${this.kas.toLocaleString('id-ID')}`);
        return this.penumpang;
      }
    }

    console.log(`Penumpang '${nama}' tidak ada di angkot ini.`);
    return this.penumpang;
  };
}

// Inisialisasi Armada Angkot 1
const angkot1 = new Angkot("Pak Joko", ["Cicaheum", "Cibiru"], [], 0);

// Operasi Penumpang:
angkot1.penumpangNaik("Budi");
angkot1.penumpangNaik("Siti");
console.log("Daftar Penumpang:", angkot1.penumpang);

// Penumpang turun dan membayar ongkos Rp 5.000
angkot1.penumpangTurun("Budi", 5000);
angkot1.penumpangTurun("Siti", 5000);

console.log("Total Kas Akhir:", angkot1.kas);
