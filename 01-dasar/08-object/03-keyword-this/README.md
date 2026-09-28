# 08.3 - Konsep Keyword `this`

## Tujuan Belajar
- Memahami nilai `this` pada berbagai cara pemanggilan fungsi.
- Mengetahui perbedaan konteks `this` pada fungsi biasa, method, dan konstruktor.

## Penjelasan Konsep
Nilai `this` ditentukan oleh cara sebuah fungsi dipanggil:
1. Fungsi biasa -> `globalThis` / `window`.
2. Method objek -> objek pemilik method tersebut.
3. Constructor dengan `new` -> instance objek yang baru saja dibuat.

## Contoh Kode
```javascript
let obj = {
  nama: "Joko",
  sapa: function() {
    console.log("Halo, " + this.nama);
  }
};
obj.sapa();
```

### Output
`Halo, Joko`
