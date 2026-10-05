// Worker Thread (Terpisah dari Main UI Thread)
self.onmessage = function (event) {
  const number = event.data;
  console.log('[WORKER]: Menerima tugas komputasi berat untuk angka:', number);

  // Simulasi komputasi intensif CPU tanpa memblokir layar browser
  let total = 0;
  for (let i = 0; i <= number; i++) {
    total += i;
  }

  // Mengirim hasil kembali ke Main Thread
  self.postMessage(total);
};
