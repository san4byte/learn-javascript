// Main UI Thread
const btnCalculate = document.getElementById("btn-hitung");
const resultEl = document.getElementById("hasil");

// Membuat Web Worker
const worker = new Worker("worker.js");

btnCalculate.addEventListener("click", () => {
  resultEl.textContent = "Sedang menghitung di background...";
  // Mengirim data ke worker
  worker.postMessage(100000000);
});

// Menerima pesan hasil dari worker
worker.onmessage = function (event) {
  resultEl.textContent = `Hasil Perhitungan: ${event.data}`;
  console.log("[MAIN THREAD]: Hasil diterima:", event.data);
};
