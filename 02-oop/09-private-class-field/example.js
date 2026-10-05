// Penjelasan lengkap dapat dibaca pada README.md
// Private Class Field menggunakan tanda pagar (#) untuk enkapsulasi sejati

class Counter {
  #counter = 0; // Private: hanya bisa diakses di dalam class Counter

  increment() {
    this.#counter++;
  }

  decrement() {
    this.#counter--;
  }

  get() {
    return this.#counter;
  }
}

const joko = new Counter();

joko.increment();
joko.increment();
joko.increment();
joko.increment();
joko.increment();
joko.decrement();

console.info('Nilai Counter:', joko.get()); // 4

// Mencoba mengakses langsung dari luar akan ERROR:
// console.info(joko.#counter); // SyntaxError: Private field '#counter' must be declared in an enclosing class
