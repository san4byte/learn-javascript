// auth.js - Modul otentikasi dan token
export const isAuthenticated = true;
export const token = 'JWT-SECURE-TOKEN-XYZ-789';

export function checkPermission(action) {
  return `Izin untuk aksi '${action}': DIIZINKAN`;
}
