/**
 * Modul 05: DOM Manipulation & HTML Templating
 *
 * Fungsi rendering komponen daftar barang belanjaan di dalam Cart Drawer / Modal.
 * Menggunakan data atribut (data-action & data-id) untuk mendukung Event Delegation.
 */
const html = String.raw;

/**
 * Merender daftar barang di dalam Cart Drawer / Modal.
 * Fungsi ini murni menangani tampilan UI (tanpa event listener / logic langsung).
 *
 * @param {import('../models/cart.model.js').Cart} cart - Instance Cart dari state
 * @param {HTMLElement} container - Elemen wadah (#cart-items-container)
 */
export function renderCartItems(cart, container) {
  if (!container) return;

  const items = [...cart]; // Memanfaatkan protokol iterable dari Cart

  // 1. Tampilan jika Keranjang Kosong (Empty State)
  if (items.length === 0) {
    container.innerHTML = html`
      <div
        class="h-full flex flex-col items-center justify-center text-center py-16 text-slate-400"
      >
        <span class="text-6xl mb-3">🛒</span>
        <p class="font-bold text-slate-700 text-base">
          Keranjang Anda masih kosong
        </p>
        <p class="text-xs text-slate-400 mt-1 max-w-xs">
          Yuk jelajahi produk kami dan tambahkan barang impianmu ke sini!
        </p>
      </div>
    `;
    return;
  }

  // 2. Tampilan jika Ada Barang Belanjaan
  container.innerHTML = items
    .map(
      (item) => html`
        <div class="py-4 flex gap-4 items-center group">
          <!-- Thumbnail Foto Produk -->
          <img
            src="${item.product.thumbnail}"
            alt="${item.product.title}"
            class="w-16 h-16 object-contain rounded-xl bg-slate-100 p-2 shrink-0 border border-slate-200/60"
          />

          <!-- Info Produk & Kontrol Tombol Qty -->
          <div class="flex-1 min-w-0">
            <h4 class="font-bold text-slate-800 text-sm truncate">
              ${item.product.title}
            </h4>
            <p class="text-emerald-600 font-extrabold text-xs mt-0.5">
              ${item.product.formattedPrice}
            </p>

            <div class="flex items-center gap-3 mt-2.5">
              <!-- Stepper Quantity (- / QTY / +) -->
              <div
                class="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs"
              >
                <button
                  data-id="${item.product.id}"
                  data-action="decrease"
                  class="btn-qty px-2.5 py-0.5 hover:bg-slate-100 text-slate-600 font-bold text-xs transition cursor-pointer"
                >
                  -
                </button>
                <span class="px-2.5 text-xs font-bold text-slate-800"
                  >${item.qty}</span
                >
                <button
                  data-id="${item.product.id}"
                  data-action="increase"
                  class="btn-qty px-2.5 py-0.5 hover:bg-slate-100 text-slate-600 font-bold text-xs transition cursor-pointer"
                >
                  +
                </button>
              </div>

              <!-- Tombol Hapus Barang -->
              <button
                data-id="${item.product.id}"
                data-action="delete"
                class="btn-remove-item text-xs text-rose-500 hover:text-rose-600 font-semibold transition cursor-pointer hover:underline"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      `
    )
    .join('');
}
