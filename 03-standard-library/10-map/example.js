// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('=== 1. INISIALISASI & METHOD CHAINING (.set) ===');
// A. Inisialisasi dari array pasangan [key, value]
const konfigurasi = new Map([
  ['tema', 'dark'],
  ['bahasa', 'id'],
]);

// B. Inisialisasi kosong lalu isi dengan method chaining (.set mengembalikan Map)
const sesiUser = new Map();
const userAdmin = { id: 1, username: 'jokosantoso' };
const fnLog = () => console.log('Logger');

sesiUser
  .set(101, 'Data User Primitif ID 101')
  .set('token', 'JWT-TOKEN-XYZ-999')
  .set(userAdmin, { role: 'Administrator', level: 99 })
  .set(fnLog, 'Handler Fungsi Log');

console.log('Inisialisasi konfigurasi      :', konfigurasi);
console.log('Total data sesiUser (.size)   :', sesiUser.size);

console.log('\n=== 2. MEMBACA & MEMERIKSA DATA (.get, .has) ===');
console.log('Ambil key number (101)        :', sesiUser.get(101));
console.log('Ambil key token               :', sesiUser.get('token'));
console.log('Ambil key objek (userAdmin)   :', sesiUser.get(userAdmin));
console.log('Ambil key tidak ada           :', sesiUser.get('nonExistent')); // undefined

console.log('Cek keberadaan key "token"    :', sesiUser.has('token')); // true
console.log('Cek keberadaan key "rahasia"  :', sesiUser.has('rahasia')); // false

console.log(
  '\n=== 3. PENELUSURAN & ITERASI (.keys, .values, .entries, forEach) ===',
);
// A. map.keys() - Mengambil iterator seluruh kunci
console.log('-- Iterator Keys (.keys()) --');
for (const key of sesiUser.keys()) {
  console.log(
    'Key:',
    typeof key === 'object'
      ? JSON.stringify(key)
      : typeof key === 'function'
        ? '[Function]'
        : key,
  );
}

// B. map.values() - Mengambil iterator seluruh nilai
console.log('\n-- Iterator Values (.values()) --');
for (const val of sesiUser.values()) {
  console.log('Value:', typeof val === 'object' ? JSON.stringify(val) : val);
}

// C. map.entries() - Mengambil iterator pasangan [key, value]
console.log('\n-- Iterator Entries (.entries()) --');
for (const [key, value] of sesiUser.entries()) {
  const labelKey =
    typeof key === 'object'
      ? key.username
      : typeof key === 'function'
        ? 'fnLog()'
        : key;
  console.log(
    `[Entry] Key: ${labelKey} => Value:`,
    typeof value === 'object' ? JSON.stringify(value) : value,
  );
}

// D. map.forEach(callback(value, key, map))
// PERHATIKAN: Parameter value urutan pertama, key urutan kedua!
console.log('\n-- Iterasi forEach --');
sesiUser.forEach((value, key) => {
  const labelKey =
    typeof key === 'object'
      ? `User(${key.username})`
      : typeof key === 'function'
        ? 'fnLog()'
        : key;
  const labelVal =
    typeof value === 'object' ? value.role || JSON.stringify(value) : value;
  console.log(`forEach: ${labelKey} -> ${labelVal}`);
});

// E. Iterasi langsung dengan for...of (default Map iterator adalah entries)
console.log('\n-- Iterasi Langsung dengan for...of --');
for (const [key, val] of konfigurasi) {
  console.log(`Config ${key}: ${val}`);
}

console.log('\n=== 4. KONVERSI: MAP <--> ARRAY & OBJECT ===');
// Map ke Array
const arrayEntries = Array.from(konfigurasi); // atau [...konfigurasi]
console.log('Map ke Array (entries)        :', arrayEntries);
console.log('Hanya Keys ke Array           :', [...konfigurasi.keys()]);
console.log('Hanya Values ke Array         :', [...konfigurasi.values()]);

// Map ke Object biasa (jika semua kuncinya string/symbol)
const configObj = Object.fromEntries(konfigurasi);
console.log('Map ke Object murni           :', configObj);

// Object biasa ke Map
const profilObj = { nama: 'Joko', kota: 'Jakarta' };
const mapDariObj = new Map(Object.entries(profilObj));
console.log('Object ke Map                 :', mapDariObj);

console.log('\n=== 5. MENGHAPUS & MEMBERSIHKAN (.delete, .clear) ===');
console.log('Hapus key 101 (.delete)       :', sesiUser.delete(101)); // true
console.log('Hapus key tidak ada           :', sesiUser.delete('unknown')); // false
console.log('Ukuran setelah delete         :', sesiUser.size);

// .clear() menghapus seluruh isi Map
konfigurasi.clear();
console.log('Ukuran konfigurasi sesudah .clear():', konfigurasi.size); // 0
