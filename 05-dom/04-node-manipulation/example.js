// Penjelasan lengkap materi ini dapat dilihat di README.md

if (typeof document === 'undefined') {
  console.log("--- 04. DOM Manipulasi Node ---");
  console.log("Buka file 'index.html' di browser untuk melihat pembuatan elemen HTML baru!");
} else {
  console.log("--- 04. DOM Manipulasi Node (Browser) ---");

  const kontainerList = document.getElementById("daftar-tugas");

  if (kontainerList) {
    // 1. Buat element <li> baru di memori
    const itemBaru1 = document.createElement("li");
    itemBaru1.textContent = "Tugas Baru: Belajar Manipulasi Node (appendChild)";
    itemBaru1.style.color = "#16a34a"; // Hijau

    // 2. Sisipkan ke akhir daftar
    kontainerList.appendChild(itemBaru1);
    console.log("Berhasil menambahkan item di akhir.");

    // 3. Buat item prioritas tinggi di paling awal (prepend)
    const itemPrioritas = document.createElement("li");
    itemPrioritas.textContent = "Tugas Mendesak: Minum Air Putih (prepend)";
    itemPrioritas.style.color = "#ea580c"; // Oranye
    kontainerList.prepend(itemPrioritas);
    console.log("Berhasil menambahkan item prioritas di awal.");
  }
}
