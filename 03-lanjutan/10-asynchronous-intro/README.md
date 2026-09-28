# 10 - Pengenalan Asynchronous JavaScript & Event Loop

## Tujuan Belajar
- Memahami model eksekusi *Single-Threaded Non-Blocking*.
- Mengetahui komponen Event Loop: Call Stack, Web APIs, Callback Queue.

## Penjelasan Konsep
JavaScript menjalankan kode utama secara single-threaded. Operasi I/O atau timer didelegasikan ke Web APIs browser agar tidak memblokir antarmuka pengguna.
