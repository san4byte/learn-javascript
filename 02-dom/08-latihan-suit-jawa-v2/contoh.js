// Penjelasan lengkap materi ini dapat dilihat di README.md

if (typeof document === 'undefined') {
  console.log("--- 08. Game Suit Jawa GUI ---");
  console.log("Buka file 'index.html' di browser Anda untuk memainkan game Suit Jawa visual!");
} else {
  console.log("--- 08. Game Suit Jawa GUI (Browser) ---");

  function getPilihanKomputer() {
    const acak = Math.random();
    if (acak < 0.34) return "gajah";
    if (acak <= 0.67) return "orang";
    return "semut";
  }

  function tentukanHasil(player, comp) {
    if (player === comp) return "SERI!";
    if (player === "gajah") return comp === "orang" ? "MENANG!" : "KALAH!";
    if (player === "orang") return comp === "gajah" ? "KALAH!" : "MENANG!";
    if (player === "semut") return comp === "orang" ? "KALAH!" : "MENANG!";
  }

  console.log("Mesin game Suit Jawa siap merespon klik gambar.");
}
