// Penjelasan lengkap materi ini dapat dilihat di README.md

if (typeof document === 'undefined') {
  console.log("--- 03. DOM Manipulasi Element ---");
  console.log("Buka file 'index.html' di browser untuk melihat demonstrasi manipulasi teks dan style!");
} else {
  console.log("--- 03. DOM Manipulasi Element (Browser) ---");

  const kotakAlert = document.getElementById("kotak-pesan");

  if (kotakAlert) {
    // 1. Mengubah teks secara aman dengan textContent
    kotakAlert.textContent = "Status Sistem: Berhasil Diperbarui Secara Real-Time!";

    // 2. Memanipulasi Atribut
    kotakAlert.setAttribute("data-status", "success");
    console.log("Atribut data-status:", kotakAlert.getAttribute("data-status"));

    // 3. Memanipulasi Class via classList
    kotakAlert.classList.add("aktif", "tema-hijau");
    console.log("Daftar Class:", kotakAlert.className);

    // Toggle class
    kotakAlert.classList.toggle("animasi-kedip");
    console.log("Punya class animasi-kedip?", kotakAlert.classList.contains("animasi-kedip"));
  }
}
