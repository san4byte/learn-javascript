// 08 - HTML Table Elements (Manipulasi Struktur Tabel Dinamis)
// File ini dapat dijalankan langsung di Node.js maupun di Browser.

const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined';

if (!isBrowser) {
  console.log('========================================================');
  console.log('📌 SIMULASI HTML TABLE ELEMENTS (NODE.JS RUNTIME)');
  console.log('========================================================\n');

  // 1. Properti Struktur HTMLTableElement Standar
  console.log('--- 1. Properti Struktur HTMLTableElement ---');
  console.log('- table.tHead   : Elemen <thead> tabel');
  console.log('- table.tBodies : HTMLCollection kumpulan elemen <tbody>');
  console.log('- table.tFoot   : Elemen <tfoot> tabel');
  console.log(
    '- table.rows    : Koleksi seluruh elemen <tr> dari header sampai footer',
  );

  // 2. Simulasi insertRow dan insertCell
  console.log('\n--- 2. Simulasi insertRow() dan insertCell() ---');
  const mockTable = {
    rows: [{ sectionRowIndex: 0, cells: ['1', 'Budi Santoso', '90'] }],
  };
  console.log('Kondisi Awal Tabel (1 Baris):', mockTable.rows[0].cells);

  // Tambah baris baru di posisi paling bawah (-1)
  const newRowIndex = mockTable.rows.length;
  mockTable.rows.push({
    sectionRowIndex: newRowIndex,
    cells: [(newRowIndex + 1).toString(), 'Siti Rahma', '95'],
  });
  console.log('Setelah insertRow(-1) dan 3x insertCell():');
  mockTable.rows.forEach((r) =>
    console.log(`  [Row ${r.sectionRowIndex + 1}]`, r.cells.join(' | ')),
  );

  // Hapus baris terakhir
  console.log('\n--- 3. Simulasi deleteRow() ---');
  mockTable.rows.pop();
  console.log('Setelah deleteRow(-1) dijalankan:');
  mockTable.rows.forEach((r) =>
    console.log(`  [Row ${r.sectionRowIndex + 1}]`, r.cells.join(' | ')),
  );

  console.log(
    '\n💡 Buka "index.html" di browser untuk menguji penambahan baris secara visual!',
  );
} else {
  // LINGKUNGAN BROWSER
  console.log('========================================================');
  console.log('🌐 LIVE HTML TABLE ELEMENTS DI BROWSER');
  console.log('========================================================');

  const table = document.getElementById('tabel-siswa');
  const tbody = document.getElementById('tabel-body');
  const btnTambah = document.getElementById('btn-tambah');
  const btnHapusAkhir = document.getElementById('btn-hapus-akhir');
  const infoTotal = document.getElementById('info-total');

  const daftarNama = [
    'Siti Rahma',
    'Ahmad Fauzi',
    'Dewi Lestari',
    'Rian Hidayat',
    'Fajar Pratama',
  ];

  function perbaruiInfoTotal() {
    if (infoTotal && tbody) {
      infoTotal.textContent = `Total Siswa: ${tbody.rows.length} Orang`;
    }
  }

  // 1. Menambah Baris Baru dengan insertRow(-1)
  if (btnTambah && tbody) {
    btnTambah.addEventListener('click', function () {
      if (daftarNama.length === 0) {
        alert('Seluruh data siswa contoh telah dimasukkan!');
        return;
      }

      const namaSiswa = daftarNama.shift();
      const nilaiAcak = Math.floor(Math.random() * 15) + 85;

      // insertRow(-1) otomatis menyisipkan <tr> baru di urutan paling bawah tbody
      const rowBaru = tbody.insertRow(-1);

      // insertCell(index) menyisipkan <td> pada kolom baris tersebut
      const cellNo = rowBaru.insertCell(0);
      const cellNama = rowBaru.insertCell(1);
      const cellNilai = rowBaru.insertCell(2);
      const cellAksi = rowBaru.insertCell(3);

      cellNo.textContent = tbody.rows.length;
      cellNama.textContent = namaSiswa;
      cellNilai.textContent = nilaiAcak;

      const btnHapus = document.createElement('button');
      btnHapus.textContent = 'Hapus';
      btnHapus.className = 'btn-row-del';
      cellAksi.appendChild(btnHapus);

      perbaruiInfoTotal();
      console.log(
        `[TABLE] Baris baru ditambahkan: ${namaSiswa} (Index baris: ${rowBaru.rowIndex})`,
      );
    });
  }

  // 2. Menghapus Baris Terakhir dengan deleteRow(-1)
  if (btnHapusAkhir && tbody) {
    btnHapusAkhir.addEventListener('click', function () {
      if (tbody.rows.length === 0) {
        alert('Tabel sudah kosong!');
        return;
      }
      tbody.deleteRow(-1);
      perbaruiInfoTotal();
      console.log('[TABLE] Baris terbawah berhasil dihapus.');
    });
  }

  // 3. Event Delegation untuk Menghapus Baris Spesifik
  if (tbody) {
    tbody.addEventListener('click', function (e) {
      if (e.target.classList.contains('btn-row-del')) {
        const row = e.target.closest('tr');
        if (row) {
          console.log(
            `[TABLE] Menghapus baris nomor ${row.cells[0]?.textContent}: ${row.cells[1]?.textContent}`,
          );
          row.remove();
          // Nomor urut dapat dinormalisasi ulang:
          Array.from(tbody.rows).forEach((r, idx) => {
            r.cells[0].textContent = idx + 1;
          });
          perbaruiInfoTotal();
        }
      }
    });
  }
}
