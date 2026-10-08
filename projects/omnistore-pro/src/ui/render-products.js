/**
 * Modul 05: DOM Manipulation & HTML Templating
 *
 * Fungsi rendering kartu katalog produk ke dalam grid HTML.
 * Menggunakan Tailwind CSS untuk styling dan data-src untuk Lazy Loading gambar.
 */
const html = String.raw;

/**
 * Merender daftar produk ke dalam elemen kontainer.
 *
 * @param {Array<import('../models/product.model.js').Product>} products - Array instance Product
 * @param {HTMLElement} container - Elemen grid kontainer (#product-grid)
 * @param {boolean} append - Jika true, tempelkan di akhir (untuk infinite scroll). Jika false, timpa isi lama.
 */
export function renderProducts(products, container, append = false) {
  if (!container) return;

  const markup = products
    .map(
      (product) => html`
        <div
          class="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden hover:shadow-md transition flex flex-col justify-between group"
        >
          <!-- Gambar Produk dengan Lazy Loading (data-src) -->
          <div
            class="h-48 bg-slate-100/50 p-4 flex items-center justify-center relative overflow-hidden"
          >
            <img
              data-src="${product.thumbnail}"
              alt="${product.title}"
              class="h-full object-contain opacity-0 transition-opacity duration-300 group-hover:scale-105 transition-transform"
            />
          </div>

          <!-- Rincian Informasi Produk -->
          <div class="p-4 flex flex-col flex-1 justify-between gap-3">
            <div>
              <h3 class="font-bold text-slate-800 text-sm line-clamp-1">
                ${product.title}
              </h3>
              <p class="text-xs text-slate-500 line-clamp-2 mt-1">
                ${product.description}
              </p>
            </div>

            <div>
              <div class="flex items-baseline justify-between">
                <span class="text-lg font-extrabold text-emerald-600">
                  ${product.formattedPrice}
                </span>
              </div>

              <!-- Tombol Aksi: Detail & Beli -->
              <div class="grid grid-cols-2 gap-2 mt-3">
                <a
                  href="/product-detail/index.html?id=${product.id}"
                  class="text-center bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 rounded-xl transition"
                >
                  Detail
                </a>
                <button
                  data-id="${product.id}"
                  class="btn-add-cart bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 rounded-xl transition cursor-pointer"
                >
                  + Beli
                </button>
              </div>
            </div>
          </div>
        </div>
      `
    )
    .join('');

  // Jika append true (infinite scroll), gunakan insertAdjacentHTML agar tidak merender ulang elemen lama
  if (append) {
    container.insertAdjacentHTML('beforeend', markup);
  } else {
    container.innerHTML = markup;
  }
}
