// Dynamic import mengembalikan Promise sehingga modul hanya didownload saat dibutuhkan
const loadButton = document.getElementById("load-btn");

loadButton.addEventListener("click", async () => {
  console.log("Sedang memuat modul...");
  const { renderChart } = await import("./heavy-module.js");
  renderChart();
});
