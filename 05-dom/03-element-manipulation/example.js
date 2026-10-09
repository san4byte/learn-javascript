// 03 - DOM Manipulasi Element (Konten, Atribut, dan Style)
// File ini dapat dijalankan langsung di Node.js maupun di Browser.

const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined';

if (!isBrowser) {
  console.log('========================================================');
  console.log('📌 SIMULASI DOM MANIPULASI ELEMENT (NODE.JS RUNTIME)');
  console.log('========================================================\n');

  // 1. Perbandingan textContent vs innerText vs innerHTML
  console.log('--- 1. textContent vs innerText vs innerHTML ---');
  const mockRawHTML =
    'Halo <span style="display:none;">Dunia Rahasia</span> <strong>Semua!</strong>';
  console.log('HTML Mentah     :', mockRawHTML);
  console.log(
    'Simulasi textContent: "Halo Dunia Rahasia Semua!" (mengambil semua teks mentah)',
  );
  console.log(
    'Simulasi innerText  : "Halo Semua!" (hanya teks yang tampak secara visual)',
  );
  console.log(
    'Simulasi innerHTML  : Merender struktur tag HTML baru secara dinamis',
  );

  // 2. Simulasi Atribut Standar & Custom Dataset
  console.log('\n--- 2. Manipulasi Atribut & dataset ---');
  const mockElement = {
    tag: 'div',
    attributes: {
      id: 'kotak-status',
      class: 'panel',
      'data-role': 'admin',
      'data-user-id': '99',
    },
    style: {},
  };

  // setAttribute, getAttribute, hasAttribute, removeAttribute
  mockElement.attributes['title'] = 'Panel Kontrol Admin';
  console.log(
    'setAttribute("title", ...) -> title:',
    mockElement.attributes['title'],
  );
  console.log(
    'getAttribute("data-role")  ->',
    mockElement.attributes['data-role'],
  );
  console.log(
    'hasAttribute("data-role")  ->',
    'data-role' in mockElement.attributes,
  );

  delete mockElement.attributes['title'];
  console.log(
    'removeAttribute("title")   -> has title?',
    'title' in mockElement.attributes,
  );

  // dataset (data-* attributes dikonversi ke camelCase)
  const mockDataset = {
    role: mockElement.attributes['data-role'],
    userId: mockElement.attributes['data-user-id'],
  };
  console.log('dataset.role               ->', mockDataset.role);
  console.log('dataset.userId             ->', mockDataset.userId);

  // 3. Simulasi Manipulasi classList
  console.log(
    '\n--- 3. Manipulasi classList (add, remove, toggle, contains, replace) ---',
  );
  const classListSet = new Set(['panel']);

  // add
  classListSet.add('aktif');
  classListSet.add('tema-gelap');
  console.log(
    'classList.add("aktif", "tema-gelap")  ->',
    Array.from(classListSet).join(' '),
  );

  // remove
  classListSet.delete('aktif');
  console.log(
    'classList.remove("aktif")             ->',
    Array.from(classListSet).join(' '),
  );

  // toggle
  const toggleClass = (name) => {
    if (classListSet.has(name)) {
      classListSet.delete(name);
      return false;
    } else {
      classListSet.add(name);
      return true;
    }
  };
  console.log(
    'classList.toggle("tersembunyi") [1x]  -> ditambahkan?',
    toggleClass('tersembunyi'),
  );
  console.log(
    'classList.toggle("tersembunyi") [2x]  -> ditambahkan?',
    toggleClass('tersembunyi'),
  );

  // contains & replace
  console.log(
    'classList.contains("tema-gelap")      ->',
    classListSet.has('tema-gelap'),
  );
  if (classListSet.has('tema-gelap')) {
    classListSet.delete('tema-gelap');
    classListSet.add('tema-terang');
  }
  console.log(
    'classList.replace("tema-gelap", ...)  ->',
    Array.from(classListSet).join(' '),
  );

  console.log(
    '\n💡 Buka "index.html" di browser untuk menguji manipulasi visual pada layar!',
  );
} else {
  // LINGKUNGAN BROWSER
  console.log('========================================================');
  console.log('🌐 LIVE DOM MANIPULASI ELEMENT DI BROWSER');
  console.log('========================================================');

  const kotakStatus = document.getElementById('kotak-status');
  const pesanStatus = document.getElementById('pesan-status');
  const linkRef = document.getElementById('link-referensi');

  if (kotakStatus && pesanStatus) {
    // 1. Manipulasi Konten Teks & HTML
    pesanStatus.textContent =
      'Server Status: Sistem Berjalan Normal (Diperbarui via textContent)';

    // Demonstrasi innerHTML terstruktur
    const statusTitle = document.getElementById('status-title');
    if (statusTitle) {
      statusTitle.innerHTML =
        'Status Komponen <span class="badge-aktif">ONLINE</span>';
    }

    // 2. Manipulasi Atribut
    kotakStatus.setAttribute('title', 'Panel Kontrol Manajemen Sistem');
    console.log('[Atribut] title:', kotakStatus.getAttribute('title'));

    if (linkRef) {
      linkRef.setAttribute('target', '_blank');
      linkRef.setAttribute('rel', 'noopener noreferrer');
      console.log(
        '[Atribut] link target diubah ke:',
        linkRef.getAttribute('target'),
      );
    }

    // 3. Mengakses data-* via element.dataset
    console.log('[dataset] data-role:', kotakStatus.dataset.role);
    console.log('[dataset] data-id  :', kotakStatus.dataset.id);
    // Menambah atribut data baru secara dinamis
    kotakStatus.dataset.lastChecked = '2026-10-09';
    console.log(
      '[dataset] data-last-checked:',
      kotakStatus.dataset.lastChecked,
    );

    // 4. Manipulasi classList
    kotakStatus.classList.add('sorot');
    console.log(
      '[classList] Class setelah ditambahkan:',
      kotakStatus.className,
    );

    // Toggle kelas tema-gelap
    kotakStatus.classList.toggle('tema-gelap');
    console.log(
      '[classList] Apakah memiliki class tema-gelap?',
      kotakStatus.classList.contains('tema-gelap'),
    );

    // Ganti class
    kotakStatus.classList.replace('sorot', 'panel-aktif');
    console.log('[classList] Class setelah di-replace:', kotakStatus.className);

    // 5. Manipulasi Inline CSS
    kotakStatus.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    kotakStatus.style.transition = 'all 0.3s ease';
  }
}
