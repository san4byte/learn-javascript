/**
 * 07 - Aggregating Modules (Barrel Pattern & Re-export)
 *
 * Demonstrasi penggabungan modul melalui satu pintu masuk (index.js):
 * 1. Mengimpor named re-export (currentUser)
 * 2. Mengimpor re-export dengan alias (role)
 * 3. Mengimpor default re-export sebagai named (getUserAvatar)
 * 4. Mengimpor hasil wildcard re-export dari auth.js (isAuthenticated, token, checkPermission)
 * 5. Mengimpor re-export namespace (AuthTools)
 */

import {
  currentUser,
  role,
  getUserAvatar,
  isAuthenticated,
  token,
  checkPermission,
  AuthTools,
} from './index.js';

console.log('=== 1. Entitas Hasil Re-Export dari user.js ===');
console.log('Nama Pengguna       :', currentUser);
console.log('Peran (Re-export As):', role);
console.log('Avatar (Default As) :', getUserAvatar());
console.log();

console.log('=== 2. Entitas Hasil Wildcard Re-Export dari auth.js ===');
console.log('Status Terotentikasi:', isAuthenticated);
console.log('Token Akses         :', token);
console.log('Pengecekan Izin     :', checkPermission('DELETE_RECORD'));
console.log();

console.log('=== 3. Entitas Hasil Re-Export Namespace Object ===');
console.log('Namespace AuthTools :', Object.keys(AuthTools).join(', '));
