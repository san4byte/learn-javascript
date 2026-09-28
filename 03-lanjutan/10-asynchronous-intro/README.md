# 10 - Pengenalan Asynchronous JavaScript & Event Loop

## Tujuan Belajar
- Memahami model eksekusi JavaScript: *Single-Threaded, Non-Blocking, Asynchronous, Concurrent*.
- Mengetahui komponen arsitektur Event Loop: Call Stack, Web APIs, Callback Queue, Event Loop.
- Mengetahui mengapa urutan eksekusi kode asinkron berbeda dari urutan penulisannya di file.

## Penjelasan Konsep
JavaScript adalah bahasa *single-threaded*, artinya hanya dapat mengerjakan satu instruksi dalam satu waktu pada Call Stack.
Agar proses yang lambat (seperti timer, pembacaan file, request server) tidak membekukan antarmuka, JavaScript mendelegasikan tugas tersebut ke **Web APIs browser**. Setelah tugas selesai, Web API memasukkan callback-nya ke **Callback Queue**. **Event Loop** akan memeriksa apakah Call Stack sudah kosong; jika kosong, callback dipindahkan ke Call Stack untuk dieksekusi.

## Contoh Kode
```javascript
// Penjelasan lengkap dapat dibaca pada README.md
// Model Event Loop: Single-Threaded Non-Blocking dengan Web API

console.log("satu");
setTimeout(function () {
  console.log("dua");
}, 0);
console.log("tiga");
```

### Output
```text
satu
tiga
dua
```

## Penjelasan Tambahan
- **Mengapa "dua" tercetak terakhir meskipun timer disetel 0 ms?**:
  `setTimeout` adalah fungsi Web API. Meskipun durasinya 0 milidetik, callback fungsi tidak langsung masuk ke Call Stack, melainkan harus mengantre di Callback Queue terlebih dahulu sampai seluruh baris kode sinkron di Call Stack (termasuk `console.log("tiga")`) selesai dijalankan.

---
[⬅️ Materi Sebelumnya: 09 - Rest Parameter](../09-rest-parameter/README.md) | [Materi Selanjutnya: 11 - Timing Events ➡️](../11-timing-events/README.md)
