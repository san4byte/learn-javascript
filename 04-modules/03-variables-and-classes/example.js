import { Person, DEFAULT_ROLE } from "./person.js";

const programmer = new Person("Joko Santoso");
console.log(programmer.getInfo());
console.log(`Default role: ${DEFAULT_ROLE}`);
