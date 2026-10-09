# 📦 Modul 04: JavaScript Modules (Native ES Modules)

Selamat datang di **Modul 04**! Modularitas adalah pilar arsitektur perangkat lunak modern untuk memecah basis kode kompleks menjadi modul-modul independen, terisolasi, dan dapat digunakan kembali (_reusable_). Modul ini menyajikan panduan mendalam tentang standar resmi **ECMAScript Modules (ESM)**.

---

## 📚 Daftar Materi Pembelajaran:

1. [01 - Tanpa Module (Global Scope Collision)](01-without-module/README.md)
   - Memahami bahaya pencemaran ruang lingkup global (_Global Scope Pollution_), tabrakan variabel, pola klasik IIFE & Namespace, serta isolasi module scope.
2. [02 - Export dan Import](02-export-and-import/README.md)
   - Sintaks dasar _Named Export_ dan _Import_, aturan relative path dan ekstensi file, strict mode otomatis, dan perilaku top-level `this`.
3. [03 - Variable dan Class di Module](03-variables-and-classes/README.md)
   - Mendistribusikan konfigurasi dan Class OOP, _cross-module subclassing_, konsep reaktif _Live Bindings_, dan sifat _Read-Only View_.
4. [04 - Alias (Kata Kunci as)](04-alias/README.md)
   - Mengubah nama pengenal (_identifier_) pada export dan import serta menyelesaikan konflik tabrakan nama dari dua modul berbeda.
5. [05 - Export Default](05-export-default/README.md)
   - Menetapkan satu entitas utama sebagai _default export_, mengimpor tanpa tanda kurung kurawal `{}`, dan kombinasi default dengan named export.
6. [06 - Module Object (import \* as Namespace)](06-module-object/README.md)
   - Mengimpor seluruh isi modul sekaligus ke dalam satu objek namespace terkelompok, akses bracket dinamis, dan anatomi objek modul.
7. [07 - Aggregating Modules (Re-Export / Barrel Pattern)](07-aggregating-modules/README.md)
   - Pola Barrel File (`index.js`), menyederhanakan path impor publik, serta variasi re-exporting (named, alias, default, wildcard, namespace).
8. [08 - Dynamic Module Loading (import() Function)](08-dynamic-module-loading/README.md)
   - Pemuatan modul secara asinkron saat runtime (_on-demand / lazy loading_) menggunakan fungsi `import()`, _code-splitting_, dan penanganan error.

---

## 🛠️ Cara Menjalankan

Seluruh file contoh pada Modul 04 ini dapat dijalankan langsung di terminal menggunakan Node.js maupun di browser melalui berkas `index.html`:

```bash
# Contoh eksekusi langsung via terminal:
node 04-modules/02-export-and-import/example.js
node 04-modules/08-dynamic-module-loading/example.js
```

---

## 🧭 Navigasi

- ⬅️ **Modul Sebelumnya:** [03 - Standard Library](../03-standard-library/README.md)
- ➡️ **Modul Selanjutnya:** [05 - JavaScript DOM](../05-dom/README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../README.md)
