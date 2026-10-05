# 10.2 - Game Interaktif: Tebak Angka (1 sampai 10)

> ⏱️ **TL;DR (Ringkasan Cepat):**
> * **Fungsi Utama**: Membangun logika permainan tebak angka acak dengan petunjuk 'Terlalu Tinggi' atau 'Terlalu Rendah'.
> * **Kapan Digunakan**: Mengelola batasan jumlah kesempatan tebakan (kuota tebakan).
> * **Aturan Praktis**: Pastikan angka acak integer dihasilkan dengan formula standar: `Math.floor(Math.random() * 10) + 1`.

## 1. 🎯 Tujuan Belajar
- Membangun logika permainan tebak angka acak dengan petunjuk 'Terlalu Tinggi' atau 'Terlalu Rendah'.
- Mengelola batasan jumlah kesempatan tebakan (kuota tebakan).
- Melatih algoritma pencarian biner (*binary search intuition*).

---

## 2. 📖 Penjelasan Konsep

### 🎭 Analogi Dunia Nyata
> Permainan ini melatih konsep **Binary Search**: strategi terbaik adalah selalu menebak angka tengah (misal angka 5). Jika terlalu rendah, pemain tahu pasti angka rahasia ada di rentang 6-10, sehingga separuh kemungkinan langsung tereliminasi.

Permainan **Tebak Angka** adalah mini-game di mana komputer memikirkan satu angka rahasia antara 1 sampai 10.

Pemain diberikan kesempatan terbatas (misal 3 kali kesempatan) untuk menebak angka tersebut:
* Jika tebakan pemain lebih kecil dari angka rahasia, komputer memberi petunjuk: **"Terlalu Rendah!"**.
* Jika tebakan pemain lebih besar dari angka rahasia, komputer memberi petunjuk: **"Terlalu Tinggi!"**.
* Jika tebakan tepat, pemain menang dan permainan selesai.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

console.log('--- Mini Game: Tebak Angka (Simulasi Alur Logika) ---');

function jalankanPermainanTebakAngka(daftarTebakanPemain) {
  // 1. Komputer membangkitkan angka rahasia acak 1 sampai 10
  const angkaRahasia = 7; // Diset 7 untuk tujuan demonstrasi deterministik
  let kesempatan = 3;
  let menang = false;

  console.log('Komputer telah memikirkan angka antara 1 sampai 10.');
  console.log(`Anda memiliki ${kesempatan} kali kesempatan tebakan.\n`);

  for (let i = 0; i < daftarTebakanPemain.length; i++) {
    const tebakan = daftarTebakanPemain[i];
    kesempatan--;

    console.log(`[Tebakan ke-${i + 1}]: Anda menebak ${tebakan}`);

    if (tebakan === angkaRahasia) {
      console.log(`🎉 SELAMAT! Tebakan Anda BENAR! Angka rahasia adalah ${angkaRahasia}.`);
      menang = true;
      break;
    } else if (tebakan < angkaRahasia) {
      console.log(`-> Terlalu RENDAH! (Sisa kesempatan: ${kesempatan})`);
    } else {
      console.log(`-> Terlalu TINGGI! (Sisa kesempatan: ${kesempatan})`);
    }

    if (kesempatan === 0) {
      console.log(`\n💀 KESEMPATAN HABIS! Anda kalah. Angka rahasianya adalah ${angkaRahasia}.`);
      break;
    }
  }
}

// Simulasi pemain yang berhasil menang di tebakan ke-3
jalankanPermainanTebakAngka([3, 9, 7]);
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- Mini Game: Tebak Angka (Simulasi Alur Logika) ---
Komputer telah memikirkan angka antara 1 sampai 10.
Anda memiliki 3 kali kesempatan tebakan.

[Tebakan ke-1]: Anda menebak 3
-> Terlalu RENDAH! (Sisa kesempatan: 2)
[Tebakan ke-2]: Anda menebak 9
-> Terlalu TINGGI! (Sisa kesempatan: 1)
[Tebakan ke-3]: Anda menebak 7
🎉 SELAMAT! Tebakan Anda BENAR! Angka rahasia adalah 7.
```

---

## 5. 💡 Panduan Praktis & Studi Kasus


### 🏢 Real-World Use Case
1. **Verifikasi Keamanan Captcha / Percobaan PIN**: Sistem membatasi percobaan login PIN maksimal 3 kali sebelum akun dibekukan sementara.
2. **Algoritma Pencarian Efisien (Binary Search)**: Konsep 'terlalu besar / terlalu kecil' adalah dasar dari algoritma pencarian tercepat di dunia komputasi ($O(\log n)$).

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Tidak Melakukan Konversi Tipe Data String ke Number**: Jika input berupa teks dari prompt, `tebakan < angkaRahasia` bisa menghasilkan perbandingan string leksikografis yang salah. Pastikan selalu menggunakan `parseInt()` atau `Number()`.

### 🌟 Best Practice
* Pastikan angka acak integer dihasilkan dengan formula standar: `Math.floor(Math.random() * 10) + 1`.

---

## 6. ✍️ Latihan Mandiri
1. Ubah rentang permainan menjadi angka antara 1 sampai 100 dengan total kesempatan 7 kali tebakan.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [10.1 - Game Suit Jawa](../01-suit-jawa/README.md)
- 🏠 **Daftar Isi Modul 01:** [README Modul 01](../../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
