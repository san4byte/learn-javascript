// Penjelasan lengkap dapat dibaca pada README.md
// Public Class Field (Mendeklarasikan properti langsung di badan class)

class Customer {
  firstName;
  lastName;
  balance = 0; // Nilai default

  constructor(firstName, lastName, balance = 0) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.balance = balance;
  }

  sayHello(name) {
    console.info(`Halo ${name}, nama saya ${this.firstName} ${this.lastName}`);
  }
}

const joko = new Customer('Joko', 'Santoso', 100000);
console.info(joko);
console.info('Saldo Joko:', joko.balance);
joko.sayHello('Budi');

const anonim = new Customer();
console.info(anonim);
