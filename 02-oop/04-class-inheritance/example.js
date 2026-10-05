// Penjelasan lengkap dapat dibaca pada README.md
// Pewarisan Class menggunakan kata kunci 'extends'

class Employee {
  sayHello(name) {
    console.log(`Halo ${name}, saya karyawan biasa.`);
  }
}

class Manager extends Employee {
  sayHello(name) {
    console.log(`Halo ${name}, saya adalah Manager.`);
  }
}

const budi = new Employee();
budi.sayHello("Joko");

const eko = new Manager();
eko.sayHello("Joko");
