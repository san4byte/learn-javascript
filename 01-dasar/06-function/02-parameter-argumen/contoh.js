//parameter(...)
function tambah1(a, b, c) {
  return a + b * c;
}

// argumen(....)
console.log(tambah1(10, 10, 10));

// arguments[....]
function tambah2() {
  return arguments;
}
console.log(tambah2(1, 2, 3, 4, "hi", true));

// ! test-1
// argument penjumlahan
function tambah3() {
  let hasil = 0;
  // looping
  for (let i = 0; i < arguments.length; i++) {
    hasil += arguments[i];
  }
  return hasil;
}
console.log(tambah3(1, 3, 5, 10, 82, 28));
