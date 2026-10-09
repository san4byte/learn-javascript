/**
 * 04 - Alias (Kata Kunci as)
 *
 * Demonstrasi penggunaan Alias pada Export dan Import:
 * 1. Mengubah nama identifier pada saat Import (as)
 * 2. Menyelesaikan konflik tabrakan nama dari dua modul berbeda (math vs geometry)
 * 3. Menggunakan fungsi yang di-alias pada saat Export
 * 4. Pembuktian error saat mencoba memanggil nama identifier asli setelah di-alias
 */

// 1 & 2. Mengimpor dua fungsi bernama sama 'hitungLuas' dengan alias unik
import { hitungLuas as luasLingkaran, hitungVolumeKubus } from './math.js';
import {
  hitungLuas as luasPersegiPanjang,
  hitungKeliling,
} from './geometry.js';

console.log('=== 1. Penyelesaian Konflik Nama via Import Alias ===');
console.log('Luas Lingkaran (r=7)           :', luasLingkaran(7).toFixed(2));
console.log('Luas Persegi Panjang (p=5, l=4):', luasPersegiPanjang(5, 4));
console.log('Keliling Persegi Panjang       :', hitungKeliling(5, 4));
console.log();

console.log('=== 2. Memanggil Fungsi dari Export Alias ===');
console.log('Volume Kubus (s=3):', hitungVolumeKubus(3));
console.log();

console.log('=== 3. Pembuktian Nama Asli Tidak Dideklarasikan ===');
try {
  // Nama 'hitungLuas' tidak terdaftar di scope file ini karena sudah di-alias
  eval('hitungLuas(10);');
} catch (err) {
  console.log(`Pemanggilan nama asli ditolak: [${err.name}] ${err.message}`);
}
