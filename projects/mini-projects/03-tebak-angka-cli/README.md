# Mini Project 03 - Game Tebak Angka (CLI / Console)

> ⏱️ **TL;DR (Ringkasan Cepat):**
>
> - **Fungsi Utama**: Mengimplementasikan simulasi game tebak angka rahasia berbasis penentuan acak integer dan kuota kesempatan terbatas.
> - **Kapan Digunakan**: Melatih pengkondisian relasional bertingkat (Terlalu Tinggi vs Terlalu Rendah) dan kontrol penghentian loop dengan `break`.
> - **Aturan Praktis**: Bangkitkan bilangan bulat acak menggunakan formula `Math.floor(Math.random() * rentang) + min` dan pastikan input angka dikonversi dengan `Number()` atau `parseInt()`.

---

## 1. 🎯 Tujuan Belajar

- Memahami formula pembangkitan bilangan bulat acak dalam rentang tertentu di JavaScript.
- Mengelola kuota perulangan dan kondisi terminasi dini (_early loop termination_) menggunakan `break`.
- Mengimplementasikan logika pemandu relasional (_binary search intuition_: terlalu tinggi / terlalu rendah).
- Memisahkan logika evaluasi komputasi dari penanganan input/output interaktif.

---

## 2. 📖 Penjelasan Konsep & Logika Permainan

### 🎭 Analogi Dunia Nyata

> Permainan ini mencerminkan algoritma **Binary Search**: bayangkan mencari kata di dalam kamus 1.000 halaman. Jika tebakan awal Anda membuka halaman 500 dan kata yang dicari berada di alfabet lebih awal, Anda langsung mengeliminasi halaman 501–1.000 hanya dalam satu langkah.

### Alur Keputusan Logika Tebak Angka

| Kondisi Evaluasi       | Tindakan / Output           | Status Kesempatan | Alur Eksekusi                  |
| :--------------------- | :-------------------------- | :---------------- | :----------------------------- |
| `tebakan === rahasia`  | Menang (_Success_)          | Berhenti          | `break` mengakhiri perulangan  |
| `tebakan < rahasia`    | Petunjuk: "Terlalu Rendah!" | Berkurang 1       | Lanjut iterasi berikutnya      |
| `tebakan > rahasia`    | Petunjuk: "Terlalu Tinggi!" | Berkurang 1       | Lanjut iterasi berikutnya      |
| Kesempatan habis (`0`) | Kalah (_Game Over_)         | Selesai           | Cetak angka rahasia yang benar |

---

### Penjelasan Detail Komponen Logika

#### 1. Pembangkitan Bilangan Bulat Acak

`Math.random()` menghasilkan desimal antara `0` dan `1`. Penggandaan dengan `10` menghasilkan `0.0` sampai `9.999...`, dibulatkan ke bawah dengan `Math.floor()` menjadi `0` sampai `9`, lalu ditambah `1` untuk rentang `1` sampai `10`:

```javascript
const angkaRahasia = Math.floor(Math.random() * 10) + 1;
```

#### 2. Dekrementasi Kuota Kesempatan

Variabel kuota kesempatan didekremasikan setiap kali pemain memasukkan tebakan:

```javascript
kesempatan--;
console.log(`Sisa kesempatan: ${kesempatan}`);
```

#### 3. Terminasi Dini Saat Menang (`break`)

Ketika tebakan cocok dengan angka rahasia, status kemenangan diubah menjadi `true` dan perintah `break` segera menghentikan perulangan:

```javascript
if (tebakan === angkaRahasia) {
  console.log(`🎉 SELAMAT! Tebakan Anda BENAR!`);
  menang = true;
  break;
}
```

#### 4. Umpan Balik Relasional

Memberikan panduan arah kepada pemain untuk tebakan selanjutnya:

```javascript
if (tebakan < angkaRahasia) {
  console.log("-> Terlalu RENDAH!");
} else {
  console.log("-> Terlalu TINGGI!");
}
```

---

## 3. 💻 Kode Praktik Terpadu (example.js)

Logika permainan tebak angka dikemas dalam fungsi deterministik di berkas [`example.js`](example.js). Skrip mendemonstrasikan simulasi alur tebakan pemain secara berurutan dan penanganan kondisi menang maupun kuota habis.

Jalankan program di terminal:

```bash
node projects/mini-projects/03-tebak-angka-cli/example.js
```

---

## 4. 💡 Panduan Praktis & Studi Kasus

### 🏢 Real-World Use Case

1. **Percobaan Keamanan PIN / Otentikasi**: Membatasi percobaan input kode OTP atau PIN hingga maksimal 3 kali sebelum akun dibekukan sementara.
2. **Pencarian Data Biner (Binary Search)**: Algoritma pencarian tercepat pada struktur data terurut ($O(\log n)$) bekerja dengan prinsip komparasi "terlalu besar atau terlalu kecil" untuk mengeliminasi setengah kandidat setiap langkah.

### ⚠️ Common Pitfalls

- **Tidak Mengonversi Input String ke Number**: Jika input didapat dari formulir teks atau dialog browser tanpa konversi (`Number(input)`), perbandingan string `tebakan < angkaRahasia` menghasilkan perbandingan leksikografis yang salah (misal: `"9" > "10"` bernilai `true`).
- **Lupa Statement `break`**: Jika `break` tidak dipanggil saat tebakan benar, loop akan tetap meminta tebakan sisa sampai kuota habis meskipun pemain sudah berhasil menebak.

### 🌟 Best Practice

- Selalu validasi bahwa input tebakan adalah angka valid dalam rentang yang diizinkan (`!isNaN(tebakan) && tebakan >= 1 && tebakan <= 10`).
- Pisahkan status permainan (state: `menang`, `sisaKesempatan`, `history`) dari proses rendering log terminal.

---

## 5. ✍️ Latihan Mandiri

1. Ubah rentang angka acak menjadi antara 1 sampai 100 dengan total kuota kesempatan 7 kali tebakan.
2. Tambahkan pencatatan riwayat tebakan sebelumnya ke dalam array `riwayatTebakan` sehingga program dapat memperingatkan pemain jika menebak angka yang sama dua kali tanpa memotong kuota.

---

## 6. 🧭 Navigasi

- ⬅️ **Sebelumnya:** [02 - Suit Jawa CLI](../02-suit-jawa-cli/README.md)
- ➡️ **Selanjutnya:** [04 - Color Picker](../04-color-picker/README.md)
- 🏠 **Daftar Isi Mini Projects:** [README Mini Projects](../README.md)
- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../../README.md)
