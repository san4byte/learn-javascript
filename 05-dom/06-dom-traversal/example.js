// Penjelasan lengkap materi ini dapat dilihat di README.md

if (typeof document === 'undefined') {
  console.log('--- 06. DOM Traversal & Event Delegation ---');
  console.log(
    "Buka file 'index.html' di browser untuk melihat demonstrasi Event Delegation!"
  );
} else {
  console.log('--- 06. DOM Traversal & Event Delegation (Browser) ---');

  // POLA EVENT DELEGATION:
  // Pasang HANYA 1 listener pada elemen kontainer induk
  const kontainerDaftar = document.getElementById('daftar-kartu');

  if (kontainerDaftar) {
    kontainerDaftar.addEventListener('click', function (e) {
      // Cek apakah elemen yang diklik memiliki class 'btn-tutup'
      if (e.target.classList.contains('btn-tutup')) {
        // DOM Traversal: ambil elemen kartu induk dari tombol tersebut
        const kartuInduk = e.target.parentElement;
        console.log(`[HAPUS KARTU]: Menghapus kartu: ${kartuInduk.id}`);

        // Hapus kartu dari tampilan
        kartuInduk.remove();
      }
    });
  }
}
