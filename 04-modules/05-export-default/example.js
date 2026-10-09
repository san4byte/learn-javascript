/**
 * 05 - Export Default
 *
 * Demonstrasi penggunaan Default Export di ES Modules:
 * 1. Mengimpor default export tanpa tanda kurung kurawal {}
 * 2. Menggabungkan default import dan named import dalam satu pernyataan
 * 3. Mengimpor default export menggunakan sintaks alias { default as MyName }
 * 4. Penggunaan instance dari class default export
 */

// 1 & 2. Mengimpor default (AppLogger) dan named exports ({ LOG_LEVELS, APP_VERSION })
import AppLogger, { LOG_LEVELS, APP_VERSION } from './logger.js';

// 3. Sintaks alternatif: mengimpor default via kurung kurawal menggunakan alias 'default as ...'
import { default as BaseLogger } from './logger.js';

console.log('=== 1. Menggunakan Default Export (Class Logger) ===');
const logger = new AppLogger('AuthService');
console.log(logger.log('Pengguna berhasil login.', LOG_LEVELS.INFO));
console.log(
  logger.log('Token akan kedaluwarsa dalam 5 menit.', LOG_LEVELS.WARN),
);
console.log();

console.log('=== 2. Memanfaatkan Named Exports Pendamping ===');
console.log(`Versi Modul Logger : ${APP_VERSION}`);
console.log('Level yang tersedia:', Object.keys(LOG_LEVELS).join(', '));
console.log();

console.log('=== 3. Pembuktian Kesetaraan Default Alias ===');
console.log(
  'Apakah AppLogger identik dengan BaseLogger?',
  AppLogger === BaseLogger,
); // true
