// Penjelasan lengkap dapat dibaca pada README.md
// Lexical scope dan closure untuk private variable

function ucapSalam(waktu) {
  return function (nama) {
    console.log(`halo ${nama}, selamat ${waktu}, semoga harimu menyenangkan`);
  };
}

let selamatPagi = ucapSalam("pagi");
selamatPagi("joko");

let add = (function () {
  let counter = 0;
  return function () {
    return ++counter;
  };
})();

console.log(add());
console.log(add());
console.log(add());
