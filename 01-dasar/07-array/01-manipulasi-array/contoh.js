// Penjelasan lengkap dapat dibaca pada README.md
// Manipulasi elemen array
let arr = ["a", 1, true];
arr[3] = "tiga";
console.log("Tambah via index:", arr);

let arr2 = ["satu", "dua", "tiga", "empat"];
arr2[1] = undefined;
console.log("Hapus nilai:", arr2);

let arr3 = ["joko", "santoso", "gege", "selena"];
for (let i = 0; i < arr3.length; i++) {
  console.log("Nama ke - " + (i + 1) + " : " + arr3[i]);
}

let arr4 = ["agus", "rehan", "samsul"];
arr4.push("lutfi", "roy");
console.log("Setelah push:", arr4);
arr4.pop();
console.log("Setelah pop:", arr4);
