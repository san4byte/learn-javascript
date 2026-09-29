// Penjelasan lengkap dapat dibaca pada README.md
// Private Method menggunakan tanda pagar (#) untuk fungsi internal rahasia

class Person {
  say(name) {
    if (name) {
      this.#sayWithName(name);
    } else {
      this.#sayWithoutName();
    }
  }

  // Method privat: fungsi pembantu internal yang tidak boleh dipanggil dari luar
  #sayWithoutName() {
    console.info("Hello");
  }

  #sayWithName(name) {
    console.info(`Hello ${name}`);
  }
}

const joko = new Person();
joko.say("Joko Santoso");
joko.say();

// Mencoba memanggil method privat dari luar akan ERROR:
// joko.#sayWithName("Budi"); // SyntaxError: Private field '#sayWithName' must be declared in an enclosing class
