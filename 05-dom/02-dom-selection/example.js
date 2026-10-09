// 02 - DOM Selection (Querying Elements)
// File ini dapat dijalankan langsung di Node.js maupun di Browser.

const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined';

if (!isBrowser) {
  console.log('========================================================');
  console.log('📌 SIMULASI 5 METHOD DOM SELECTION (NODE.JS RUNTIME)');
  console.log('========================================================\n');

  // Struktur DOM simulasi
  const mockDOM = [
    {
      tag: 'h1',
      id: 'judul-utama',
      classList: [],
      text: '02 - DOM Selection Playground',
    },
    {
      tag: 'p',
      id: null,
      classList: ['paragraf', 'p1'],
      text: 'Paragraf 1 (Class p1)',
      parent: 'section-a',
    },
    {
      tag: 'p',
      id: null,
      classList: ['paragraf', 'p2'],
      text: 'Paragraf 2 (Class p2)',
      parent: 'section-a',
    },
    {
      tag: 'p',
      id: null,
      classList: ['paragraf', 'p3'],
      text: 'Paragraf 3 (Class p3)',
      parent: 'section-a',
    },
    {
      tag: 'p',
      id: null,
      classList: ['paragraf'],
      text: 'Paragraf 4 di Section B',
      parent: 'section-b',
    },
    {
      tag: 'li',
      id: null,
      classList: ['card-item'],
      text: 'Item Belajar 1',
      parent: 'daftar-item',
    },
    {
      tag: 'li',
      id: null,
      classList: ['card-item'],
      text: 'Item Belajar 2',
      parent: 'daftar-item',
    },
    {
      tag: 'li',
      id: null,
      classList: ['card-item'],
      text: 'Item Belajar 3',
      parent: 'daftar-item',
    },
  ];

  // 1. getElementById -> Single Element
  console.log('--- 1. getElementById("judul-utama") ---');
  const elById = mockDOM.find((el) => el.id === 'judul-utama');
  console.log('Tipe Pengembalian: Single Element');
  console.log(
    'Hasil Seleksi    :',
    elById ? `<${elById.tag} id="${elById.id}">` : null,
  );

  // 2. getElementsByTagName -> HTMLCollection (Live)
  console.log('\n--- 2. getElementsByTagName("p") ---');
  const elByTag = mockDOM.filter((el) => el.tag === 'p');
  console.log('Tipe Pengembalian: HTMLCollection (Live)');
  console.log(`Jumlah Ditemukan : ${elByTag.length} elemen`);
  console.log(
    'Catatan          : Tidak memiliki method bawaan .forEach() (gunakan Array.from).',
  );

  // 3. getElementsByClassName -> HTMLCollection (Live)
  console.log('\n--- 3. getElementsByClassName("card-item") ---');
  const elByClass = mockDOM.filter((el) => el.classList.includes('card-item'));
  console.log('Tipe Pengembalian: HTMLCollection (Live)');
  console.log(`Jumlah Ditemukan : ${elByClass.length} elemen`);

  // 4. querySelector -> Single Element Pertama yang cocok
  console.log('\n--- 4. querySelector(".paragraf.p2") ---');
  const elQuery = mockDOM.find(
    (el) => el.classList.includes('paragraf') && el.classList.includes('p2'),
  );
  console.log('Tipe Pengembalian: Single Element Pertama');
  console.log('Hasil Seleksi    :', elQuery ? `"${elQuery.text}"` : null);

  // 5. querySelectorAll -> NodeList (Static)
  console.log('\n--- 5. querySelectorAll("#section-b li") ---');
  const elQueryAll = mockDOM.filter((el) => el.parent === 'daftar-item');
  console.log('Tipe Pengembalian: NodeList (Static)');
  console.log(`Jumlah Ditemukan : ${elQueryAll.length} elemen`);
  console.log('Mendukung .forEach() langsung:');
  elQueryAll.forEach((item, idx) => {
    console.log(`  [${idx + 1}] ${item.text}`);
  });

  console.log(
    '\n💡 Buka "index.html" di browser untuk menguji seleksi visual!',
  );
} else {
  // LINGKUNGAN BROWSER
  console.log('========================================================');
  console.log('🌐 LIVE DOM SELECTION DI BROWSER');
  console.log('========================================================');

  // 1. getElementById -> Single Element
  const judul = document.getElementById('judul-utama');
  if (judul) {
    judul.style.color = '#1d4ed8';
    console.log('[1] getElementById:', judul.textContent);
  }

  // 2. getElementsByTagName -> HTMLCollection
  const semuaParagraf = document.getElementsByTagName('p');
  console.log('[2] getElementsByTagName("p") total:', semuaParagraf.length);
  // HTMLCollection perlu diubah ke Array untuk iterasi fungsional modern
  Array.from(semuaParagraf).forEach((p, idx) => {
    p.title = `Paragraf indeks ke-${idx}`;
  });

  // 3. getElementsByClassName -> HTMLCollection
  const items = document.getElementsByClassName('card-item');
  console.log('[3] getElementsByClassName("card-item") total:', items.length);

  // 4. querySelector -> Elemen Pertama
  const p2 = document.querySelector('#section-a .p2');
  if (p2) {
    p2.classList.add('highlight');
    console.log('[4] querySelector("#section-a .p2"):', p2.textContent);
  }

  // 5. querySelectorAll -> NodeList
  const allCardItems = document.querySelectorAll('#daftar-item li');
  console.log(
    '[5] querySelectorAll("#daftar-item li") total:',
    allCardItems.length,
  );
  allCardItems.forEach((li, idx) => {
    li.textContent = `[${idx + 1}] ${li.textContent}`;
  });
}
