// 05 - DOM Events (Penanganan Aksi Pengguna)
// File ini dapat dijalankan langsung di Node.js maupun di Browser.

const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined';

if (!isBrowser) {
  console.log('========================================================');
  console.log('📌 SIMULASI SISTEM EVENT DOM (NODE.JS RUNTIME)');
  console.log('========================================================\n');

  // 1. Perbandingan 3 Pendekatan Event Handler
  console.log('--- 1. Perbandingan 3 Cara Mendaftarkan Event ---');
  console.log(
    'a. Inline HTML: <button onclick="handleClick()"> (Tidak Disarankan - Mencampur logika & markup)',
  );
  console.log(
    'b. DOM Property: btn.onclick = fn; (Kelemahan: Hanya bisa 1 handler, saling menimpa)',
  );
  console.log(
    'c. addEventListener: btn.addEventListener("click", fn); (Standar W3C - Multi-listener, options)',
  );

  // 2. Simulasi Objek Event (Event Object 'e')
  console.log('\n--- 2. Anatomi Objek Event (Event Object "e") ---');
  const mockEvent = {
    type: 'click',
    target: { tagName: 'BUTTON', id: 'btn-klik' },
    currentTarget: { tagName: 'BUTTON', id: 'btn-klik' },
    clientX: 142,
    clientY: 285,
    defaultPrevented: false,
    propagationStopped: false,
    preventDefault() {
      this.defaultPrevented = true;
    },
    stopPropagation() {
      this.propagationStopped = true;
    },
  };

  console.log('Tipe Event      :', mockEvent.type);
  console.log(
    'Target Elemen   :',
    `<${mockEvent.target.tagName} id="${mockEvent.target.id}">`,
  );
  console.log(
    'Koordinat Mouse : X=' + mockEvent.clientX + ', Y=' + mockEvent.clientY,
  );

  mockEvent.preventDefault();
  console.log(
    'preventDefault() -> defaultPrevented:',
    mockEvent.defaultPrevented,
  );

  mockEvent.stopPropagation();
  console.log(
    'stopPropagation()-> propagationStopped:',
    mockEvent.propagationStopped,
  );

  // 3. Simulasi Keyboard Event Data
  console.log('\n--- 3. Properti Penting Keyboard Event ---');
  const mockKeyEvent = {
    type: 'keydown',
    key: 'Enter',
    code: 'Enter',
    ctrlKey: false,
    shiftKey: false,
  };
  console.log(
    `Pengguna menekan tombol: e.key="${mockKeyEvent.key}", e.code="${mockKeyEvent.code}"`,
  );

  console.log(
    '\n💡 Buka "index.html" di browser untuk menguji klik tombol dan pengetikan keyboard secara nyata!',
  );
} else {
  // LINGKUNGAN BROWSER
  console.log('========================================================');
  console.log('🌐 LIVE DOM EVENTS DI BROWSER');
  console.log('========================================================');

  // 1. Mouse Click Event dengan Counter
  const btnKlik = document.getElementById('btn-klik');
  let jumlahKlik = 0;

  if (btnKlik) {
    btnKlik.addEventListener('click', function (e) {
      jumlahKlik++;
      btnKlik.textContent = `Sudah Diklik: ${jumlahKlik}x!`;
      console.log(
        `[CLICK]: Tombol diklik ke-${jumlahKlik} pada koordinat (${e.clientX}, ${e.clientY})`,
      );
    });
  }

  // 2. Event Listener dengan opsi { once: true }
  const btnSekali = document.getElementById('btn-sekali');
  if (btnSekali) {
    btnSekali.addEventListener(
      'click',
      function () {
        btnSekali.textContent = 'Nonaktif (Hanya Sekali Klik)';
        btnSekali.style.backgroundColor = '#94a3b8';
        btnSekali.style.cursor = 'not-allowed';
        console.log(
          '[ONCE]: Event ini hanya dieksekusi 1x dan listener dilepas otomatis oleh browser',
        );
      },
      { once: true },
    );
  }

  // 3. Keyboard Event (keyup)
  const inputTeks = document.getElementById('input-teks');
  const infoKey = document.getElementById('info-key');

  if (inputTeks && infoKey) {
    inputTeks.addEventListener('keyup', function (e) {
      infoKey.textContent = `${e.key} (Kode: ${e.code})`;
      console.log(
        `[KEYUP]: Tombol "${e.key}" dilepas. Nilai input sekarang: "${this.value}"`,
      );
    });
  }

  // 4. Mouseenter & Mouseleave (Hover Area)
  const kotakHover = document.getElementById('kotak-hover');
  if (kotakHover) {
    kotakHover.addEventListener('mouseenter', function () {
      kotakHover.classList.add('box-hovered');
      kotakHover.textContent = 'Mouse Berada di Dalam Area Kotak!';
    });

    kotakHover.addEventListener('mouseleave', function () {
      kotakHover.classList.remove('box-hovered');
      kotakHover.textContent = 'Arahkan kursor mouse ke area kotak ini';
    });
  }
}
