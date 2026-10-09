// person.js - Modul Domain Entity dan State
export const DEFAULT_ROLE = 'Software Engineer';

// Exporting a mutable variable with live binding
export let activeUserCount = 0;

export function incrementUserCount() {
  activeUserCount++;
}

export class Person {
  constructor(name, role = DEFAULT_ROLE) {
    this.name = name;
    this.role = role;
    incrementUserCount();
  }

  getInfo() {
    return `${this.name} (${this.role})`;
  }

  static getCompany() {
    return 'Tech Global Nusantara';
  }
}
