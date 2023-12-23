// rekursif bisa disebut juga dengan looping/pengulanagn
// looping/pengulangan
for (i = 10; i >= 1; i--) {
  console.log(i);
}

// rekursif
// harus menyertakan base case supaya looping dapat berhenti
function tampilAngka(n) {
  // base case
  if (n === 0) {
    return;
  }
  console.log(n);
  return tampilAngka(n - 1);
}
tampilAngka(10);

// contoh lain rekursif
function faktorial(n) {
  if (n === 0) return 1;
  return n * faktorial(n - 1);
}
console.log(faktorial(5));
// hasil = 5 * 4 * 3 * 2 * 1 = 120

// ! fungsi rekursif
// ? menggantikan looping
// ? fibonacci
// ? pencarian struktur data list dan tree
// ? untuk bahasa pemograman yang tidak ada pengulangan
