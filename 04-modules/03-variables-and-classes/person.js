export const DEFAULT_ROLE = "Software Engineer";

export class Person {
  constructor(name, role = DEFAULT_ROLE) {
    this.name = name;
    this.role = role;
  }

  getInfo() {
    return `${this.name} bekerja sebagai ${this.role}`;
  }
}
