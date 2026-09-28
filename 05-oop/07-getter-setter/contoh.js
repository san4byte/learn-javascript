// Penjelasan lengkap dapat dibaca pada README.md
// Getter dan Setter di JavaScript Class

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // Getter: membaca properti dengan format tertentu seolah-olah properti biasa
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // Setter: memvalidasi dan mengubah properti saat diberi nilai baru
  set fullName(value) {
    const parts = value.split(" ");
    this.firstName = parts[0];
    this.lastName = parts.slice(1).join(" ");
  }
}

const joko = new Person("Joko", "Santoso");
console.log(joko.fullName); // Memanggil getter (tanpa tanda kurung ())

// Mengubah nilai menggunakan setter
joko.fullName = "Eko Kurniawan Khannedy";
console.log(joko.fullName);
console.log(joko.firstName);
console.log(joko.lastName);
