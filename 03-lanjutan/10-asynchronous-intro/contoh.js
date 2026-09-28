// Penjelasan lengkap dapat dibaca pada README.md
// Model Event Loop: Single-Threaded Non-Blocking dengan Web API

console.log("satu");
setTimeout(function () {
  console.log("dua");
}, 0);
console.log("tiga");
// Output yang dihasilkan: satu -> tiga -> dua
