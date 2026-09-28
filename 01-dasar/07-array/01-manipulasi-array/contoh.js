// manipulasi array
// ? 1. menambah iai array
let arr = ["a", 1, true];
arr[3] = "tiga";

console.log(arr);

// ? 2. menghapus isi array
let arr2 = ["satu", "dua", "tiga", "empat"];
arr2[1] = undefined; // <==

console.log(arr2);

// ? 3. menampilkan isi array
let arr3 = ["joko", "santoso", "gege", "selena"];
// pakai looping
for (let i = 0; i < arr.length; i++) {
  console.log("Nama ke - " + (i + 1) + " : " + arr3[i]);
}
// kunci = arr3 & i(variabel looping)

// ? 4. method pada array
// * 1. join
let arr4 = ["agus", "rehan", "samsul"];

// * 2. push & pop
// push - menambah nilai akhir sebuah array
arr4.push("lutfi", "roy"); // bisa langsung sekaligus
// pop - menghapus nilai akhir sebuah array
arr4.pop();
arr4.pop(); // harus satu persatu

// * 3. unshift & shift
// sama seperti push dan pop
// namun unshift dan shif di awal nilai sebubah array
arr4.unshift("joko"); //unshift
arr4.shift("joko"); //shift

// * 4. splice
// rumus: .splice(indexAwal, mauHapusBerapa, elemenBaru, elemenBaru2, dst..)
arr4.splice(1, 2, "bambang", "yamaha", "fitri", "hahaha"); //splice

// * 5. slice
// untuk memotong array
// rumus: .slice(indexAwal, indexAwalSetelahAkhir)
// buat variabel baru
let arr5 = arr4.slice(1, 4);

//bisa tambah pemisah antar array
console.log(arr4.join(" - ")); // arr4
console.log(arr5.join(" - ")); // arr5

// * 6. foreach
// foreach tidak mengembalikan array
arr4.forEach(function (e, index) {
  console.log(e, index + 1);
});

// * 7. map
// sama seperti map
// namun map mengembalikan array

// * 8. sort
// untuk mengurutkan array
let angka = [9, 8, 7, 6, 5, 4, 3, 2, 1];

console.log(angka.join(" - ")); //sebelum diurutkan
console.log(angka.sort()); //sesudah diurutkan

// * 9. filter
// untuk mencari elemen pada array
// fillter bisa mengembalikan banyak nilai
// hasil dalam bentuk array
let angka2 = [2, 45, 2, 22, 4, 5, 10];
let angka3 = angka2.filter(function (x) {
  return x > 5;
});
console.log(angka3);
console.log(angka3.join(" -")); // bisa di beri method

// * 10. find
// untuk mencari elemen pada array
// find hanya bisa mengembalikan satu nilai saja
// hasil tidak dalam bentuk array namun dalam bentuk nilai
let angka4 = angka.find(function (y) {
  return y > 5;
});
console.log(angka4); // tidak bisa di beri method
