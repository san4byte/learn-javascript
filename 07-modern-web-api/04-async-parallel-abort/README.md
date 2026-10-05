# 04 - Asynchronous Paralel (Promise.all/allSettled) dan AbortController

## 1. 🎯 Tujuan Belajar
- Memahami perbedaan eksekusi asinkron Sekuensial (satu per satu) vs Paralel (bersamaan).\n- Mampu menggunakan `Promise.all` dan `Promise.allSettled` sesuai kebutuhan skenario proyek.\n- Memahami bahaya Race Condition pada input pencarian live (Search Autocomplete).\n- Menguasai `AbortController` untuk membatalkan request HTTP `fetch` yang sudah tidak dibutuhkan.

---

## 2. 📖 Penjelasan Konsep
Dalam pengembangan aplikasi web skala produksi, hampir semua halaman membutuhkan pengambilan data dari lebih dari satu endpoint API (misalnya: data profil user, data notifikasi, dan data daftar pesanan).

### 1. Masalah Eksekusi Sekuensial (Sequential Await)
Jika Anda menulis:
```javascript
const user = await fetchUser();       // butuh 2 detik
const orders = await fetchOrders();   // butuh 2 detik
const notifs = await fetchNotifs();   // butuh 2 detik
// Total waktu tunggu: 6 detik!
```
Karena ketiga data tersebut independen, menunggu satu per satu membuat aplikasi lambat.

### 2. Eksekusi Paralel Modern:
* **`Promise.all([p1, p2, p3])`**:
  * Menjalankan semua promise secara serentak.
  * Selesai dalam waktu request terlama (misal hanya 2 detik!).
  * **Karakteristik Fail-Fast**: Jika **SATU SAJA** promise gagal (reject), seluruh operasi dianggap gagal dan langsung melempar error.
* **`Promise.allSettled([p1, p2, p3])`**:
  * Menjalankan semua promise secara serentak.
  * **TIDAK PERNAH FAIL-FAST**: Menunggu semua promise selesai, baik berhasil (`fulfilled`) maupun gagal (`rejected`).
  * Mengembalikan array objek status: `[{ status: 'fulfilled', value: ... }, { status: 'rejected', reason: ... }]`.

### 3. Membatalkan HTTP Request dengan `AbortController`
Ketika pengguna mengetik di kotak pencarian:
1. User mengetik "lap" -> Fetch request 1 dikirim.
2. User cepat mengetik "laptop" -> Fetch request 2 dikirim.
Jika server memproses request 1 lebih lambat daripada request 2, hasil pencarian "lap" bisa muncul belakangan dan menimpa hasil pencarian "laptop" (**Race Condition**).
Solusi: Batalkan (*abort*) request 1 sebelum mengirim request 2 menggunakan `AbortController`.

---

## 3. 💻 Contoh Kode (`example.js`)
```javascript
// Penjelasan lengkap materi ini dapat dilihat di README.md

// Fungsi simulasi fetch dengan delay
function fetchMock(endpoint, delayMs, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`Gagal memuat data dari ${endpoint}`));
      } else {
        resolve({ endpoint, data: `Hasil dari ${endpoint}`, waktu: `${delayMs}ms` });
      }
    }, delayMs);
  });
}

async function loadDashboardCepat() {
  console.log("--- 1. Eksekusi Paralel dengan Promise.all ---");
  console.time("Durasi Promise.all");
  try {
    // Semua request berjalan bersamaan!
    const [profil, ringkasan, notifikasi] = await Promise.all([
      fetchMock("/api/user/profile", 300),
      fetchMock("/api/dashboard/stats", 500),
      fetchMock("/api/notifications", 200)
    ]);

    console.log("Berhasil memuat dashboard:");
    console.log("- Profil     :", profil.data);
    console.log("- Ringkasan  :", ringkasan.data);
    console.log("- Notifikasi :", notifikasi.data);
  } catch (error) {
    console.error("Dashboard gagal dimuat:", error.message);
  }
  console.timeEnd("Durasi Promise.all"); // Sekitar ~500ms, bukan 1000ms!
}

async function loadWidgetHalaman() {
  console.log("\n--- 2. Eksekusi Tahan Banting dengan Promise.allSettled ---");
  const hasil = await Promise.allSettled([
    fetchMock("/api/berita-utama", 200),
    fetchMock("/api/widget-cuaca", 150, true), // Simulasi endpoint cuaca sedang down/error
    fetchMock("/api/kurs-mata-uang", 300)
  ]);

  console.log("Hasil pemrosesan multi-widget:");
  hasil.forEach((res, index) => {
    if (res.status === "fulfilled") {
      console.log(`Widget ${index + 1} [SUKSES]:`, res.value.endpoint);
    } else {
      console.log(`Widget ${index + 1} [GAGAL]:`, res.reason.message, "(Tampilkan fallback UI)");
    }
  });
}

async function demonstrasiAbort() {
  console.log("\n--- 3. Membatalkan Fetch dengan AbortController ---");
  const controller = new AbortController();
  const { signal } = controller;

  // Jadwalkan pembatalan setelah 100 milidetik
  setTimeout(() => {
    console.log("[User menekan tombol Batal / mengetik kata baru] -> Membatalkan request!");
    controller.abort();
  }, 100);

  try {
    console.log("Mengirim request fetch download file besar...");
    // Di real-world: await fetch('/api/file-besar', { signal });
    // Simulasi native Promise yang mendengarkan signal abort:
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => resolve("Download selesai"), 400);
      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("The user aborted a request.", "AbortError"));
      });
    });
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Request berhasil dibatalkan secara aman tanpa membocorkan memori.");
    } else {
      console.error("Terjadi error lain:", err);
    }
  }
}

// Jalankan demonstrasi secara berurutan
async function runAll() {
  await loadDashboardCepat();
  console.log("");
  await loadWidgetHalaman();
  console.log("");
  await demonstrasiAbort();
}

runAll();
```

---

## 4. 🖥️ Output yang Diharapkan
```text
--- 1. Eksekusi Paralel dengan Promise.all ---
Berhasil memuat dashboard:
- Profil     : Hasil dari /api/user/profile
- Ringkasan  : Hasil dari /api/dashboard/stats
- Notifikasi : Hasil dari /api/notifications
Durasi Promise.all: ~500ms

--- 2. Eksekusi Tahan Banting dengan Promise.allSettled ---
Hasil pemrosesan multi-widget:
Widget 1 [SUKSES]: /api/berita-utama
Widget 2 [GAGAL]: Gagal memuat data dari /api/widget-cuaca (Tampilkan fallback UI)
Widget 3 [SUKSES]: /api/kurs-mata-uang

--- 3. Membatalkan Fetch dengan AbortController ---
Mengirim request fetch download file besar...
[User menekan tombol Batal / mengetik kata baru] -> Membatalkan request!
Request berhasil dibatalkan secara aman tanpa membocorkan memori.
```

---

## 5. 💡 Penjelasan Tambahan

### 🎭 Analogi Dunia Nyata
> **Eksekusi Sekuensial** seperti Anda memesan burger di kasir, menunggu burger matang, baru kemudian memesan es teh (lama). **Promise.all** seperti memesan burger dan es teh sekaligus ke dua pelayan berbeda. Sedangkan **AbortController** seperti tombol 'Batalkan Pesanan' di aplikasi ojek online ketika driver belum berangkat.

### 🏢 Real-World Use Case
1. **Halaman Dashboard**: Memuat data profil user, grafik penjualan, dan saldo rekening secara paralel menggunakan `Promise.all`.
2. **Widget Independen**: Pada portal berita, widget kurs uang dan ramalan cuaca tidak boleh membuat berita utama gagal dimuat jika API cuaca mati. Solusinya: gunakan `Promise.allSettled`.
3. **Live Search / Typeahead Input**: Saat user mengetik cepat di form pencarian Google/Tokopedia, request lama dibatalkan via `controller.abort()` sehingga hanya request kata kunci terakhir yang diproses.

### ⚠️ Common Pitfalls (Jebakan Umum)
* **Salah Menggunakan Promise.all untuk Data Non-Kritis**: Menggunakan `Promise.all` untuk memuat seluruh halaman menyebabkan jika satu widget iklan/sponsor error, seluruh dashboard ikut blank/crash. Gunakan `Promise.allSettled` untuk widget independen.
* **Lupa Menangkap AbortError**: Saat request dibatalkan dengan `AbortController`, fetch akan melempar error dengan nama `AbortError`. Anda harus mengecek `if (err.name === 'AbortError')` agar tidak menampilkan pesan error merah yang membingungkan ke user.

### 🌟 Best Practice
* Selalu sediakan timeout otomatis menggunakan `AbortSignal.timeout(5000)` agar request tidak menggantung selamanya saat jaringan internet user lambat.
* Kelola satu instance `AbortController` aktif di tingkat komponen pencarian, dan panggil `.abort()` sebelum membuat request baru.

---

## 6. ✍️ Latihan Mandiri
1. Diberikan tiga fungsi API: `getUser()`, `getNotifications()`, dan `getRecommendations()`. Jika rekomendasi gagal dimuat, halaman tetap harus menampilkan user dan notifikasi. Tuliskan kodenya menggunakan `Promise.allSettled()`.
2. Buatlah fungsi `fetchDenganTimeout(url, timeoutMs)` yang menggunakan `AbortController` untuk membatalkan fetch jika respon server tidak kunjung diterima melebihi waktu `timeoutMs`.

---

## 7. 🧭 Navigasi
- ⬅️ **Sebelumnya:** [03 - URL dan FormData API](../03-url-and-formdata/README.md)\n- ➡️ **Selanjutnya:** [05 - Debounce dan Throttle Optimization](../05-debounce-and-throttle/README.md)\n- 🏠 **Daftar Isi Modul 06:** [README Modul 06](../README.md)\n- 📑 **Daftar Isi Utama:** [Kembali ke Root README](../../README.md)
