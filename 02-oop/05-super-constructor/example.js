// Penjelasan lengkap dapat dibaca pada README.md
// Memanggil constructor parent class dengan 'super()'

class Employee {
  constructor(firstName) {
    this.firstName = firstName;
  }

  sayHello(name) {
    console.log(`Halo ${name}, nama saya ${this.firstName} (Karyawan)`);
  }
}

class Manager extends Employee {
  constructor(firstName, lastName) {
    // Wajib panggil super() sebelum mengakses keyword 'this'
    super(firstName);
    this.lastName = lastName;
  }

  sayHello(name) {
    console.log(`Halo ${name}, nama saya ${this.firstName} ${this.lastName} (Manager)`);
  }
}

const budi = new Employee('Budi');
budi.sayHello('Joko');

const eko = new Manager('Eko', 'Khannedy');
eko.sayHello('Joko');
