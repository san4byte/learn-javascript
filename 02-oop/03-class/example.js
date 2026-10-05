// Penjelasan lengkap dapat dibaca pada README.md
// Pengenalan ES6 Class (Sintaks modern OOP di JavaScript)

class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello(name) {
    console.log(`Halo ${name}, nama saya ${this.name}`);
  }
}

const joko = new Person('Joko Santoso');
console.log(joko);
console.log(joko.name);
joko.sayHello('Budi');

const samsul = new Person('Samsul');
console.log(samsul);
samsul.sayHello('Eko');
