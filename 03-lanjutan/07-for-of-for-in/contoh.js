// Penjelasan lengkap dapat dibaca pada README.md
// Perulangan modern: for..of (iterable) dan for..in (properti objek)

const mhs = ["joko", "adi", "samsul"];
for (const [i, m] of mhs.entries()) {
  console.log(`${i + 1}. ${m}`);
}

const nama = "joko";
for (const n of nama) {
  console.log("Karakter:", n);
}

const mahasiswa = {
  nama: "joko santoso",
  umur: 20,
  email: "joko@gmail.com",
};
for (const prop in mahasiswa) {
  console.log(`${prop}: ${mahasiswa[prop]}`);
}
