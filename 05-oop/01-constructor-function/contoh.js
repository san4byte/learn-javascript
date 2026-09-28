// Penjelasan lengkap dapat dibaca pada README.md
// Pengenalan Constructor Function (Cara membuat cetak biru objek sebelum ES6 Class)

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  this.sayHello = function (name) {
    console.log(`Halo ${name}, nama saya ${this.firstName} ${this.lastName}`);
  };
}

const joko = new Person("Joko", "Santoso");
const samsul = new Person("Samsul", "Arifin");

console.log(joko);
joko.sayHello("Budi");

console.log(samsul);
samsul.sayHello("Budi");
