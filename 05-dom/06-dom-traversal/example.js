// 06 - DOM Traversal & Event Delegation
// File ini dapat dijalankan langsung di Node.js maupun di Browser.

const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined';

if (!isBrowser) {
  console.log('========================================================');
  console.log('📌 SIMULASI DOM TRAVERSAL & EVENT DELEGATION (NODE.JS)');
  console.log('========================================================\n');

  // 1. Perbedaan Node vs Element Traversal
  console.log('--- 1. Perbedaan Node Traversal vs Element Traversal ---');
  console.log(
    'Node Traversal    (memperhitungkan whitespace / spasi sebagai text node):',
  );
  console.log(
    '- parentNode, childNodes, firstChild, lastChild, nextSibling, previousSibling',
  );
  console.log(
    '\nElement Traversal (hanya memperhitungkan tag HTML murni - Direkomendasikan):',
  );
  console.log(
    '- parentElement, children, firstElementChild, lastElementChild, nextElementSibling, previousElementSibling',
  );

  // 2. Simulasi Traversal Pohon DOM
  console.log('\n--- 2. Simulasi Silsilah Traversal ---');
  const mockCard = {
    tag: 'div',
    className: 'card',
    id: 'card-1',
    parent: { tag: 'div', id: 'kontainer-kartu' },
    children: [
      { tag: 'img', src: 'img/profil.jpg' },
      { tag: 'span', className: 'nama', text: 'Joko Santoso' },
      { tag: 'span', className: 'telp', text: '082299841605' },
      { tag: 'span', className: 'close', text: '×' },
    ],
  };

  const closeBtn = mockCard.children[3];
  console.log(
    'Elemen Asal       :',
    `<${closeBtn.tag} class="${closeBtn.className}">${closeBtn.text}</${closeBtn.tag}>`,
  );
  console.log(
    'parentElement     :',
    `<${mockCard.tag} id="${mockCard.id}" class="${mockCard.className}">`,
  );
  console.log('firstElementChild :', `<${mockCard.children[0].tag}>`);
  console.log(
    'nextElementSibling dari [nama]:',
    `<${mockCard.children[2].tag} class="${mockCard.children[2].className}">`,
  );

  // 3. Konsep Event Delegation
  console.log('\n--- 3. Pola Arsitektur Event Delegation ---');
  console.log(
    'Alih-alih memasang 100 event listener pada 100 tombol close (boros memori):',
  );
  console.log('Cukup pasang 1 listener pada elemen induk (#kontainer-kartu).');
  console.log('Saat tombol di dalam kontainer diklik:');
  console.log('1. Event bergelembung naik (Event Bubbling) ke kontainer.');
  console.log(
    '2. Induk mengecek: if (e.target.classList.contains("close")) { ... }',
  );
  console.log(
    '3. Induk menghapus kartu terkait: e.target.closest(".card").remove()',
  );
  console.log(
    '4. Elemen baru yang ditambahkan di masa depan otomatis berfungsi tanpa pasang listener ulang!',
  );

  console.log(
    '\n💡 Buka "index.html" di browser untuk menguji penghapusan kartu dengan tombol close!',
  );
} else {
  // LINGKUNGAN BROWSER
  console.log('========================================================');
  console.log('🌐 LIVE DOM TRAVERSAL & EVENT DELEGATION DI BROWSER');
  console.log('========================================================');

  const kontainer = document.getElementById('kontainer-kartu');

  if (kontainer) {
    // 1. Demonstrasi Element Traversal
    const kartuPertama = kontainer.firstElementChild;
    if (kartuPertama) {
      console.log(
        '[Traversal] Jumlah anak kartu pertama (children):',
        kartuPertama.children.length,
      );
      console.log(
        '[Traversal] Kartu saudara berikutnya (nextElementSibling):',
        kartuPertama.nextElementSibling?.id,
      );
    }

    // 2. POLA EVENT DELEGATION
    // Pasang HANYA 1 listener pada elemen pembungkus terluar
    kontainer.addEventListener('click', function (e) {
      // Cek apakah target yang diklik adalah tombol close (×)
      if (e.target.classList.contains('close')) {
        // Gunakan method modern element.closest() untuk mencari leluhur kartu terdekat
        const kartu = e.target.closest('.card');
        if (kartu) {
          const nama = kartu.querySelector('.nama')?.textContent || 'Kartu';
          console.log(
            `[EVENT DELEGATION]: Tombol close diklik untuk kontak "${nama}". Menghapus kartu...`,
          );

          // Hapus elemen kartu
          kartu.remove();
        }
      }
    });

    console.log(
      '[Siap] Event delegation aktif pada #kontainer-kartu. Coba klik tanda × pada kartu profil!',
    );
  }
}
