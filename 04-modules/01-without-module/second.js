// Menimpa variabel di global scope yang dideklarasikan oleh first.js!
var name = 'Budi';

function sayHello() {
  console.log(`Halo, nama saya ${name} dari second.js`);
}

sayHello(); // Output: Halo, nama saya Budi dari second.js (fungsi first.js tertimpa)
