// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log("--- 1. Optional Chaining (?.) ---");
const responseAPI = {
  status: 200,
  data: {
    user: {
      id: 42,
      profile: {
        name: "Joko Santoso"
        // address sengaja tidak ada
      }
    }
  }
};

// Akses aman properti bersarang tanpa khawatir TypeError
const userCity = responseAPI?.data?.user?.profile?.address?.city;
console.log("Kota pengguna:", userCity); // undefined (tidak crash!)

// Panggilan method opsional
const hitungBonus = responseAPI?.data?.user?.calculateBonus?.();
console.log("Panggilan method opsional:", hitungBonus); // undefined

console.log("\n--- 2. Nullish Coalescing (??) vs Logical OR (||) ---");
const konfigurasiUser = {
  volume: 0,            // User sengaja menyetel volume 0 (mute)
  namaTampilan: "",     // User mengosongkan nama tampilan
  delayDetik: null      // Belum dikonfigurasi
};

// Masalah dengan Logical OR (||):
console.log("Volume dengan || :", konfigurasiUser.volume || 50); // 50 (SALAH: 0 dianggap false!)
console.log("Volume dengan ?? :", konfigurasiUser.volume ?? 50); // 0 (BENAR: 0 dipertahankan)

console.log("Nama dengan ||   :", konfigurasiUser.namaTampilan || "Anonim"); // "Anonim"
console.log("Nama dengan ??   :", konfigurasiUser.namaTampilan ?? "Anonim"); // "" (string kosong valid)

console.log("Delay dengan ??  :", konfigurasiUser.delayDetik ?? 5); // 5 (karena null)

console.log("\n--- 3. Deep Clone dengan structuredClone() ---");
const masterProduk = {
  sku: "PRD-001",
  tags: new Set(["elektronik", "gadget"]),
  spesifikasi: {
    beratGram: 500,
    dimensi: { panjang: 20, lebar: 15 }
  }
};

// Deep copy independen
const klonProduk = structuredClone(masterProduk);
klonProduk.spesifikasi.dimensi.panjang = 99; // Mengubah hasil klon

console.log("Panjang asli :", masterProduk.spesifikasi.dimensi.panjang); // Tetap 20
console.log("Panjang klon :", klonProduk.spesifikasi.dimensi.panjang); // 99

console.log("\n--- 4. Immutable Array Methods (ES2023) ---");
const daftarSkor = [85, 92, 78, 95, 60];

// toSorted() tidak memutasikan array asli
const skorUrut = daftarSkor.toSorted((a, b) => a - b);
const skorBalik = daftarSkor.toReversed();

console.log("Array Asli   :", daftarSkor);
console.log("Hasil toSorted :", skorUrut);
console.log("Hasil toReversed :", skorBalik);
