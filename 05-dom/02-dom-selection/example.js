// Penjelasan lengkap materi ini dapat dilihat di README.md

if (typeof document === 'undefined') {
  console.log('--- 02. DOM Selection ---');
  console.log("Buka file 'index.html' di browser untuk melihat demonstrasi seleksi elemen secara visual!");
} else {
  console.log('--- 02. DOM Selection (Browser) ---');

  // 1. getElementById -> Mengembalikan 1 elemen unik
  const judul = document.getElementById('judul-utama');
  if (judul) {
    judul.style.color = '#2563eb';
    console.log('Berhasil menyeleksi ID:', judul.tagName);
  }

  // 2. querySelector -> Menyeleksi 1 elemen pertama menggunakan sintaks selector CSS
  const paragrafPertama = document.querySelector('.deskripsi');
  console.log('Teks paragraf pertama:', paragrafPertama?.textContent);

  // 3. querySelectorAll -> Menyeleksi SELURUH elemen yang cocok (NodeList)
  const semuaItem = document.querySelectorAll('ul.daftar-belajar li');
  console.log(`Ditemukan ${semuaItem.length} item daftar:`);
  
  // NodeList mendukung forEach langsung:
  semuaItem.forEach((item, index) => {
    item.textContent = `${index + 1}. ${item.textContent}`;
    console.log(`- Item ${index + 1}: ${item.textContent}`);
  });
}
