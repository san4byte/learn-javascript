// Penjelasan lengkap dapat dibaca pada README.md
// Konsep Promise: Pending, Fulfilled, Rejected

// Contoh 1: Promise sederhana
let ditepati = true;
const janji1 = new Promise((resolve, reject) => {
  if (ditepati) {
    resolve("Janji telah ditepati!");
  } else {
    reject("Ingkar janji..");
  }
});

janji1
  .then((response) => console.log("OK: " + response))
  .catch((response) => console.log("NOT OK: " + response));

// Contoh 2: Promise Asinkron dengan setTimeout
const janji2 = new Promise((resolve, reject) => {
  if (ditepati) {
    setTimeout(() => {
      resolve("Ditepati setelah beberapa detik!");
    }, 1000);
  } else {
    setTimeout(() => {
      reject("Tidak ditepati setelah beberapa detik!");
    }, 1000);
  }
});

janji2
  .then((response) => console.log("OK: " + response))
  .catch((response) => console.log("NOT OK: " + response));
