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
