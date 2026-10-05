// Penjelasan lengkap materi ini dapat dilihat di README.md

if (typeof document === 'undefined') {
  console.log('--- 01. Pengenalan DOM (Document Object Model) ---');
  console.log('Status: Berjalan di runtime Node.js (lingkungan non-browser).');
  console.log("DOM adalah API milik browser. Buka file 'index.html' di browser Anda untuk melihat objek 'document'.");
} else {
  console.log('--- 01. Pengenalan DOM (Browser Environment) ---');
  console.log('Objek Document:', document);
  console.log('Judul Halaman :', document.title);
  console.log('URL Halaman   :', document.URL);
}
