/**
 * OmniStore Pro — Product Detail Entry Point
 * 
 * Mengintegrasikan:
 * - Modul 02: OOP (ProductDetail extends Product, Cart, OutOfStockError)
 * - Modul 03: Standard Library (Proxy State & Subscribe)
 * - Modul 05: DOM (Gallery Interaction, Modal Control)
 * - Modul 06 & 07: Async & Modern Web API (URLSearchParams, Fetch Detail)
 */
import { getProductById } from '@/services/api.js';
import { ProductDetail } from '@/models/product-detail.model.js';
import { renderDetail } from '@/ui/render-detail.js';
import { renderCartItems } from '@/ui/render-cart-modal.js';
import { state, subscribe } from '@/state/store.js';

const html = String.raw;

// ============================================================================
// 1. ELEMEN DOM SELEKTOR
// ============================================================================
const container = document.getElementById('detail-container');
const cartBadge = document.getElementById('cart-badge');
const btnCartToggle = document.getElementById('btn-cart-toggle');
const cartModal = document.getElementById('cart-modal');
const cartBackdrop = document.getElementById('cart-backdrop');
const btnCloseCart = document.getElementById('btn-close-cart');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartDrawerCount = document.getElementById('cart-drawer-count');
const cartTotalPrice = document.getElementById('cart-total-price');

// ============================================================================
// 2. REAKTIVITAS STATE KERANJANG (SUBSCRIBE)
// ============================================================================
subscribe((target, prop) => {
  if (prop === 'cart') {
    cartBadge.textContent = state.cart.totalItems;
    cartDrawerCount.textContent = `${state.cart.totalItems} item`;
    cartTotalPrice.textContent = state.cart.totalPrice;
    renderCartItems(state.cart, cartItemsContainer);
  }
});

// ============================================================================
// 3. KONTROL BUKA & TUTUP MODAL KERANJANG
// ============================================================================
function openCart() {
  cartModal.classList.remove('hidden');
  renderCartItems(state.cart, cartItemsContainer);
  cartTotalPrice.textContent = state.cart.totalPrice;
  cartDrawerCount.textContent = `${state.cart.totalItems} item`;
}

function closeCart() {
  cartModal.classList.add('hidden');
}

btnCartToggle.addEventListener('click', openCart);
btnCloseCart.addEventListener('click', closeCart);
cartBackdrop.addEventListener('click', closeCart);

// ============================================================================
// 4. EVENT DELEGATION: KONTROL KERANJANG (INCREASE, DECREASE, DELETE)
// ============================================================================
cartItemsContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;

  const action = btn.dataset.action;
  const id = Number(btn.dataset.id);

  const item = [...state.cart].find((i) => i.product.id === id);
  if (!item && action !== 'delete') return;

  try {
    if (action === 'increase') {
      state.cart.addItem(item.product, 1);
    } else if (action === 'decrease') {
      state.cart.updateQty(id, item.qty - 1);
    } else if (action === 'delete') {
      state.cart.removeItem(id);
    }

    state.cart = state.cart; // Memicu Proxy setter untuk simpan & notifikasi
  } catch (err) {
    alert(err.message);
  }
});

// ============================================================================
// 5. INISIALISASI HALAMAN DETAIL PRODUK
// ============================================================================
async function initDetail() {
  // 1. Tampilkan jumlah barang tersimpan di badge navbar
  cartBadge.textContent = state.cart.totalItems;

  // 2. Baca parameter ?id=... dari query string URL (Modul 07)
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    container.innerHTML = html`
      <div class="text-center py-20 bg-white rounded-3xl border border-slate-200">
        <p class="text-rose-500 font-bold text-lg">ID produk tidak ditemukan di URL.</p>
        <a href="/index.html" class="inline-block mt-4 text-sm text-emerald-600 font-semibold hover:underline">
          ← Kembali ke Katalog
        </a>
      </div>
    `;
    return;
  }

  try {
    // 3. Tampilkan efek loading animasi
    container.innerHTML = html`
      <div class="text-center py-24 text-slate-400 animate-pulse">
        <p class="text-lg font-bold">Memuat rincian produk...</p>
      </div>
    `;

    // 4. Ambil data rincian produk dari DummyJSON API (Modul 06)
    const rawData = await getProductById(id);
    // Buat objek dari class turunan ProductDetail (Modul 02 OOP Inheritance)
    const product = new ProductDetail(rawData);

    // 5. Render konten ke DOM
    renderDetail(product, container);

    // 6. Pasang Interaktivitas Galeri Foto Thumbnail
    const mainImg = document.getElementById('main-product-image');
    document.querySelectorAll('.thumb-image').forEach((thumb) => {
      thumb.addEventListener('click', () => {
        mainImg.src = thumb.dataset.full;
        document.querySelectorAll('.thumb-image').forEach((t) => {
          t.classList.remove('ring-2', 'ring-emerald-500', 'border-transparent');
          t.classList.add('opacity-70');
        });
        thumb.classList.remove('opacity-70');
        thumb.classList.add('ring-2', 'ring-emerald-500', 'border-transparent');
      });
    });

    // 7. Pasang event klik pada tombol "+ Tambah ke Keranjang"
    const btnAddDetail = document.getElementById('btn-add-detail');
    if (btnAddDetail) {
      btnAddDetail.addEventListener('click', () => {
        try {
          state.cart.addItem(product);
          state.cart = state.cart; // Memicu Proxy setter
          openCart(); // Buka keranjang otomatis agar user langsung melihat item masuk
        } catch (err) {
          alert(err.message); // Tangkap OutOfStockError jika stok habis
        }
      });
    }
  } catch (err) {
    container.innerHTML = html`
      <div class="text-center py-20 bg-white rounded-3xl border border-rose-100">
        <p class="text-rose-500 font-bold text-lg">${err.message}</p>
        <a href="/index.html" class="inline-block mt-4 text-sm text-emerald-600 font-semibold hover:underline">
          ← Kembali ke Katalog
        </a>
      </div>
    `;
  }
}

// Jalankan inisialisasi halaman detail
initDetail();
