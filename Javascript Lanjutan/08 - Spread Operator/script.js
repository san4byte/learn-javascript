// Spread Operator

// const mhs = ["joko", "adi", "samsul"];
// const dosen = ["mamak", "bapak", "lelek"];

// * memecah iterabel menjadi single element
// console.log(...mhs[1]);

// * menggabungkan 2 array
// const gabung = mhs.concat(dosen);
// const gabung = [...mhs, "aji", ...dosen];
// console.log(gabung);

// * meng-copy array
// const mhs1 = [...mhs];
// mhs1[2] = "aji";
// // variable mhs akan tetap tidak berubah
// console.log(mhs1);

// * latihan
// const liMhs = document.querySelectorAll("ul li");
// ubah ke array
// const mhs = [...liMhs].map((e) => e.textContent);
// console.log(mhs);

const nama = document.querySelector(".nama");

const huruf = [...nama.textContent].map((e) => `<span>${e}</span>`).join("")

nama.innerHTML = huruf