/**
 * Modul 05: DOM Manipulation & HTML Templating
 *
 * Fungsi rendering tampilan halaman rincian produk (Product Detail).
 * Menampilkan galeri foto interaktif, informasi spesifikasi, rating bintang,
 * status ketersediaan stok, dan tombol tambah ke keranjang.
 */
const html = String.raw;

/**
 * Merender rincian produk ke dalam kontainer halaman detail.
 *
 * @param {import('../models/product-detail.model.js').ProductDetail} product - Instance ProductDetail
 * @param {HTMLElement} container - Elemen kontainer (#detail-container)
 */
export function renderDetail(product, container) {
  if (!container) return;

  // Pastikan array gambar tidak kosong (fallback ke thumbnail)
  const images =
    product.images.length > 0 ? product.images : [product.thumbnail];

  container.innerHTML = html`
    <div
      class="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10"
    >
      <!-- Galeri Foto Interaktif -->
      <div class="flex flex-col gap-4">
        <div
          class="h-80 md:h-96 bg-slate-50/80 rounded-2xl p-6 flex items-center justify-center overflow-hidden border border-slate-100"
        >
          <img
            id="main-product-image"
            src="${images[0]}"
            alt="${product.title}"
            class="max-h-full object-contain transition-all duration-300"
          />
        </div>

        <!-- Daftar Thumbnail Foto -->
        <div class="flex gap-2.5 overflow-x-auto pb-2">
          ${images
            .map(
              (img, i) => html`
                <button
                  type="button"
                  data-full="${img}"
                  class="thumb-image w-16 h-16 rounded-xl border border-slate-200 p-1.5 shrink-0 bg-slate-50/50 hover:opacity-100 cursor-pointer transition ${i ===
                  0
                    ? 'ring-2 ring-emerald-500 border-transparent'
                    : 'opacity-70'}"
                >
                  <img
                    src="${img}"
                    alt="Thumbnail ${i + 1}"
                    class="w-full h-full object-contain"
                  />
                </button>
              `
            )
            .join('')}
        </div>
      </div>

      <!-- Info Rincian Produk -->
      <div class="flex flex-col justify-between">
        <div class="space-y-4">
          <!-- Kategori & Nama Brand -->
          <div class="flex items-center gap-2">
            <span
              class="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full"
            >
              ${product.category}
            </span>
            <span class="text-xs text-slate-400 font-medium"
              >Brand:
              <strong class="text-slate-600">${product.brand}</strong></span
            >
          </div>

          <!-- Judul Produk -->
          <h1
            class="text-2xl md:text-3xl font-black text-slate-900 leading-tight"
          >
            ${product.title}
          </h1>

          <!-- Rating Bintang & Ketersediaan Stok -->
          <div class="flex items-center gap-4 text-sm">
            <div class="flex items-center text-amber-500 font-bold">
              ★ <span class="ml-1 text-slate-800">${product.rating}</span>
            </div>
            <span class="text-slate-300">•</span>
            <span
              class="text-xs font-semibold ${product.stock > 0
                ? 'text-emerald-600'
                : 'text-rose-500'}"
            >
              ${product.stock > 0
                ? `Stok Tersedia: ${product.stock} unit`
                : 'Stok Habis'}
            </span>
          </div>

          <!-- Harga dan Diskon -->
          <div class="pt-2">
            <span class="text-3xl font-black text-emerald-600">
              ${product.formattedPrice}
            </span>
            ${product.discountPercentage > 0
              ? html`
                  <span
                    class="ml-2 text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full"
                  >
                    Diskon ${product.discountPercentage}%
                  </span>
                `
              : ''}
          </div>

          <!-- Deskripsi Produk -->
          <div class="pt-3 border-t border-slate-100">
            <h3
              class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5"
            >
              Deskripsi Produk
            </h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              ${product.description}
            </p>
          </div>

          <!-- Informasi Pengiriman & Garansi -->
          <div class="grid grid-cols-2 gap-3 pt-4 text-xs text-slate-500">
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span class="font-bold text-slate-700 block mb-0.5"
                >🛡️ Garansi</span
              >
              ${product.warrantyInformation}
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span class="font-bold text-slate-700 block mb-0.5"
                >🚚 Pengiriman</span
              >
              ${product.shippingInformation}
            </div>
          </div>
        </div>

        <!-- Tombol Tambah ke Keranjang -->
        <div class="pt-8 border-t border-slate-100 mt-6">
          <button
            id="btn-add-detail"
            ${product.stock <= 0 ? 'disabled' : ''}
            class="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-2xl shadow-sm hover:shadow transition cursor-pointer flex items-center justify-center gap-2"
          >
            🛒 + Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  `;
}
