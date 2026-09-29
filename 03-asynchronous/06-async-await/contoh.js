// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Perbandingan Rantai .then() vs Async/Await ---");

function ambilDataSiswa(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) resolve({ id: 1, nama: "Joko Santoso", kelas: "Teknik Informatika" });
      else reject(new Error("Data siswa tidak ditemukan"));
    }, 200);
  });
}

// Gaya Modern dengan Async/Await:
async function tampilkanProfilSiswa(id) {
  try {
    console.log("Memulai proses pengambilan data...");
    
    // Tunggu hasil Promise secara linier dan bersih
    const siswa = await ambilDataSiswa(id);
    console.log("Nama Siswa  :", siswa.nama);
    console.log("Jurusan     :", siswa.kelas);
    
  } catch (error) {
    // Tangkap error resolve/reject di sini
    console.error("Terjadi Kesalahan:", error.message);
  } finally {
    console.log("Proses tampilkanProfilSiswa selesai.");
  }
}

// Uji coba sukses dan gagal
async function jalankanUjiCoba() {
  console.log("== Uji Coba 1 (ID Valid) ==");
  await tampilkanProfilSiswa(1);
  
  console.log("\n== Uji Coba 2 (ID Tidak Ada) ==");
  await tampilkanProfilSiswa(99);
}

jalankanUjiCoba();
