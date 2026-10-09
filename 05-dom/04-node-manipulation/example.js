// 04 - DOM Manipulasi Node (Membuat, Menyisipkan, dan Menghapus Simpul)
// File ini dapat dijalankan langsung di Node.js maupun di Browser.

const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined';

if (!isBrowser) {
  console.log('========================================================');
  console.log('📌 SIMULASI DOM MANIPULASI NODE (NODE.JS RUNTIME)');
  console.log('========================================================\n');

  // Struktur list simulasi
  let mockList = [
    'Tugas 1: Review Desain',
    'Tugas 2: Unit Test',
    'Tugas 3: Deploy',
  ];
  console.log('Kondisi Awal List:', mockList);

  // 1. appendChild / append -> Menambah di akhir
  console.log('\n--- 1. appendChild() / append() ---');
  mockList.push('Tugas 4: Dokumentasi API (appendChild)');
  console.log('Hasil setelah append di akhir:', mockList);

  // 2. prepend -> Menambah di awal
  console.log('\n--- 2. prepend() ---');
  mockList.unshift('Tugas Mendesak: Standup Meeting (prepend)');
  console.log('Hasil setelah prepend di awal:', mockList);

  // 3. insertBefore -> Menyisipkan sebelum elemen acuan
  console.log('\n--- 3. insertBefore() ---');
  // Sisipkan sebelum 'Tugas 2: Unit Test' (indeks 2)
  const targetIndex = mockList.indexOf('Tugas 2: Unit Test');
  mockList.splice(targetIndex, 0, 'Tugas Sisipan: Code Review (insertBefore)');
  console.log('Hasil setelah insertBefore:', mockList);

  // 4. replaceChild / replaceWith -> Mengganti elemen
  console.log('\n--- 4. replaceChild() / replaceWith() ---');
  mockList[mockList.indexOf('Tugas 3: Deploy')] =
    'Tugas Terganti: Staging Smoke Test (replaceChild)';
  console.log('Hasil setelah replace:', mockList);

  // 5. removeChild / remove -> Menghapus elemen
  console.log('\n--- 5. removeChild() / remove() ---');
  mockList = mockList.filter((item) => !item.includes('Dokumentasi API'));
  console.log('Hasil setelah remove:', mockList);

  // 6. DocumentFragment -> Batch DOM mutation
  console.log('\n--- 6. DocumentFragment (Batch Optimization) ---');
  console.log(
    'Manfaat: Menggabungkan 100 simpul baru di memori virtual terlebih dahulu,',
  );
  console.log(
    'lalu hanya melakukan 1x operasi tempel ke dokumen nyata untuk mencegah lag reflow.',
  );

  console.log(
    '\n💡 Buka "index.html" di browser untuk menguji manipulasi visual pada layar!',
  );
} else {
  // LINGKUNGAN BROWSER
  console.log('========================================================');
  console.log('🌐 LIVE DOM MANIPULASI NODE DI BROWSER');
  console.log('========================================================');

  const daftar = document.getElementById('daftar-tugas');
  const tugas2 = document.getElementById('tugas-2');

  if (daftar) {
    // 1. Membuat elemen baru: document.createElement()
    const tugasBaru = document.createElement('li');
    tugasBaru.textContent = 'Item Tambahan: Optimasi Performa (appendChild)';
    tugasBaru.classList.add('tag-baru');

    // Menempelkan di urutan terbawah
    daftar.appendChild(tugasBaru);
    console.log('[1] appendChild berhasil ditambahkan di akhir');

    // 2. Menyisipkan di urutan teratas: prepend()
    const tugasPrioritas = document.createElement('li');
    tugasPrioritas.textContent =
      '🔥 Tugas Penting: Backup Database Pagi (prepend)';
    tugasPrioritas.classList.add('tag-prioritas');
    daftar.prepend(tugasPrioritas);
    console.log('[2] prepend berhasil ditambahkan di awal');

    // 3. Menyisipkan sebelum elemen acuan: insertBefore()
    if (tugas2) {
      const tugasSisipan = document.createElement('li');
      tugasSisipan.textContent =
        'Item Sisipan: Refactoring Kode (insertBefore)';
      daftar.insertBefore(tugasSisipan, tugas2);
      console.log('[3] insertBefore berhasil disisipkan tepat sebelum tugas-2');
    }

    // 4. Mengganti elemen: replaceChild() atau replaceWith()
    const tugas3 = document.getElementById('tugas-3');
    if (tugas3) {
      const tugasPengganti = document.createElement('li');
      tugasPengganti.textContent =
        'Item Pengganti: Verifikasi CI/CD Pipeline (replaceChild)';
      daftar.replaceChild(tugasPengganti, tugas3);
      console.log('[4] replaceChild berhasil menggantikan tugas-3');
    }

    // 5. Menghapus simpul langsung: element.remove()
    const tugas1 = document.getElementById('tugas-1');
    if (tugas1) {
      tugas1.remove(); // Standar modern Living DOM
      console.log('[5] tugas-1 berhasil dihapus menggunakan element.remove()');
    }

    // 6. Optimasi Batch menggunakan DocumentFragment
    const fragment = document.createDocumentFragment();
    ['Tugas Batch A', 'Tugas Batch B'].forEach((teks) => {
      const item = document.createElement('li');
      item.textContent = teks;
      fragment.appendChild(item);
    });
    daftar.appendChild(fragment); // 1x reflow saja!
    console.log(
      '[6] DocumentFragment berhasil menyisipkan kumpulan item sekaligus',
    );
  }
}
