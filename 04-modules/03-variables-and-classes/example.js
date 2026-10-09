/**
 * 03 - Variable dan Class di Module
 *
 * Demonstrasi penggunaan Variable, Class, dan Live Binding di ES Modules:
 * 1. Mengimpor dan menginstansiasi Class dari modul eksternal
 * 2. Memanggil static method dari class impor
 * 3. Mewarisi class hasil impor (Subclassing across modules)
 * 4. Pembuktian konsep 'Live Bindings' pada ES Modules
 * 5. Pembuktian sifat 'Read-Only View' pada variabel hasil import
 */

import {
  Person,
  DEFAULT_ROLE,
  activeUserCount,
  incrementUserCount,
} from './person.js';

console.log('=== 1. Menginstansiasi Class Hasil Import ===');
const programmer = new Person('Joko Santoso');
console.log('Info Pengguna :', programmer.getInfo());
console.log('Peran Default :', DEFAULT_ROLE);
console.log('Perusahaan    :', Person.getCompany());
console.log();

console.log('=== 2. Mewarisi Class Lintas Modul (Subclassing) ===');
class LeadDeveloper extends Person {
  constructor(name, teamSize) {
    super(name, 'Lead Engineer');
    this.teamSize = teamSize;
  }

  getLeadInfo() {
    return `${this.getInfo()} memimpin tim beranggotakan ${this.teamSize} orang.`;
  }
}

const lead = new LeadDeveloper('Budi Pratama', 8);
console.log(lead.getLeadInfo());
console.log();

console.log('=== 3. Pembuktian Live Bindings di ES Modules ===');
console.log('Jumlah user aktif saat ini:', activeUserCount); // 2 (otomatis terupdate dari constructor Person)

incrementUserCount(); // Memanggil mutator di person.js
console.log('Jumlah setelah incrementUserCount():', activeUserCount); // 3 (Live reference terbukti!)
console.log();

console.log('=== 4. Pembuktian Read-Only View (Immutable Binding) ===');
try {
  // Evaluasi penugasan ulang ilegal pada variabel hasil import
  eval("DEFAULT_ROLE = 'Manager';");
} catch (err) {
  console.log(`Penugasan langsung ditolak: [${err.name}] ${err.message}`);
}
