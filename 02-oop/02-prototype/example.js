// Penjelasan lengkap dapat dibaca pada README.md
// Prototype Inheritance (Menyimpan method terpusat untuk menghemat memori)

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

// Menempelkan method pada prototype
Person.prototype.sayHello = function (name) {
  console.log(`Halo ${name}, nama saya ${this.firstName} ${this.lastName}`);
};

Person.prototype.sayBye = function () {
  console.log(`Sampai jumpa dari ${this.firstName}!`);
};

const joko = new Person("Joko", "Santoso");
const samsul = new Person("Samsul", "Arifin");

joko.sayHello("Budi");
samsul.sayHello("Budi");

joko.sayBye();
samsul.sayBye();
