// Penjelasan lengkap dapat dibaca pada README.md
// Synchronous Callback sederhana

function sapa(callback) {
  const nama = "Joko";
  callback(nama);
}

sapa((nama) => {
  console.log(`Halo ${nama}, selamat datang!`);
});
