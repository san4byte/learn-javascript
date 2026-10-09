// index.js - Barrel File / Facade Agregasi Modul
// 1. Named Re-export langsung
export { currentUser } from './user.js';

// 2. Named Re-export dengan Alias
export { userRole as role } from './user.js';

// 3. Re-export Default dari modul lain sebagai Named Export
export { default as getUserAvatar } from './user.js';

// 4. Wildcard Re-export seluruh named exports dari auth.js
export * from './auth.js';

// 5. Re-export Namespace Object dari auth.js
export * as AuthTools from './auth.js';
