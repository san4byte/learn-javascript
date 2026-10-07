/**
 * OmniStore Pro — Main Entry Point (Katalog & Cart)
 * 
 * Mengintegrasikan seluruh modul:
 * - Modul 02: OOP (Product, Cart, OutOfStockError)
 * - Modul 03: Standard Library (Proxy Reactive State)
 * - Modul 05: DOM (Event Delegation, Card Rendering)
 * - Modul 06 & 07: Async & Modern Web API (Fetch, Debounce, IntersectionObserver, URLSearchParams)
 */
import { getProducts } from '@/services/api.js';
import { Product } from '@/models/product.model.js';
import { state, subscribe } from '@/state/store.js';
import { renderProducts } from '@/ui/render-products.js';
import { renderCartItems } from '@/ui/render-cart-modal.js';
import { debounce } from '@/utils/debounce.js';
import { initLazyImages, initInfiniteScroll } from '@/utils/observer.js';

// ============================================================================
// 1. ELEMEN DOM SELEKTOR
// ============================================================================
const grid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const cartBadge = document.getElementById('cart-badge');
const sentinel = document.getElementById('scroll-sentinel');

// Elemen Modal Keranjang (Slide-over Drawer)
const btnCartToggle = document.getElementById('btn-cart-toggle');
const cartModal = document.getElementById('cart-modal');
const cartBackdrop = document.getElementById('cart-backdrop');
const btnCloseCart = document.getElementById('btn-close-cart');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartDrawerCount = document.getElementById('cart-drawer-count');
const cartTotalPrice = document.getElementById('cart-total-price');

// ============================================================================
// 2. REAKTIVITAS STATE STORE (SUBSCRIBE)
// ============================================================================
// Setiap kali state.cart diperbarui, otomatis sinkronkan tampilan badge & isi modal
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
// 4. EVENT DELEGATION: KERANJANG BELANJA (INCREASE, DECREASE, DELETE)
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
      state.cart.updateQty(id, item.qty + 1);
    } else if (action === 'decrease') {
      state.cart.updateQty(id, item.qty - 1);
    } else if (action === 'delete') {
      state.cart.removeItem(id);
    }

    // Picu Proxy setter agar otomatis tersimpan & memicu subscribe()
    state.cart = state.cart;
  } catch (err) {
    alert(err.message); // Tangkap OutOfStockError jika melebihi stok
  }
});

// ============================================================================
// 5. EVENT DELEGATION: TOMBOL BELI DI GRID KATALOG
// ============================================================================
grid.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-add-cart');
  if (btn) {
    const id = Number(btn.dataset.id);
    const product = state.products.find((p) => p.id === id);
    if (product) {
      try {
        state.cart.addItem(product);
        state.cart = state.cart; // Memicu Proxy setter
      } catch (err) {
        alert(err.message); // Notifikasi jika stok habis
      }
    }
  }
});

// ============================================================================
// 6. LIVE SEARCH DENGAN DEBOUNCE & PERSISTENSI URL
// ============================================================================
searchInput.addEventListener(
  'input',
  debounce(async (e) => {
    const query = e.target.value.trim();
    state.searchQuery = query;
    state.skip = 0; // Reset ke halaman pertama

    // Simpan kata kunci ke URL query (?q=...) agar kebal refresh
    const url = new URL(window.location);
    if (query) {
      url.searchParams.set('q', query);
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState({}, '', url);

    const data = await getProducts(query, 10, state.skip);
    if (data) {
      state.total = data.total;
      state.products = data.products.map((p) => new Product(p));
      renderProducts(state.products, grid, false);
      initLazyImages();

      // Perbarui status teks sentinel
      if (state.products.length >= state.total) {
        sentinel.textContent =
          state.total === 0
            ? 'Produk tidak ditemukan'
            : 'Semua produk sudah ditampilkan';
      } else {
        sentinel.textContent = 'Memuat lebih banyak produk...';
      }
    }
  }, 300)
);

// ============================================================================
// 7. INFINITE SCROLL (MAKSIMAL 30 PRODUK ATAU SAMPAI STOK HABIS)
// ============================================================================
initInfiniteScroll(sentinel, async () => {
  // Berhenti jika semua produk di server sudah termuat ATAU sudah menyentuh batas 30
  if (state.products.length >= state.total || state.products.length >= 30) {
    sentinel.textContent = 'Semua produk sudah ditampilkan';
    return;
  }

  state.skip += 10; // Geser offset data 10 ke depan

  const data = await getProducts(state.searchQuery, 10, state.skip);
  if (data && data.products.length > 0) {
    const newItems = data.products.map((p) => new Product(p));
    state.products.push(...newItems);
    renderProducts(newItems, grid, true); // Append ke bawah
    initLazyImages();

    if (state.products.length >= state.total || state.products.length >= 30) {
      sentinel.textContent = 'Semua produk sudah ditampilkan';
    }
  } else {
    sentinel.textContent = 'Semua produk sudah ditampilkan';
  }
});

// ============================================================================
// 8. INISIALISASI AWAL APLIKASI (INIT)
// ============================================================================
async function init() {
  // 1. Tampilkan jumlah barang dari keranjang yang tersimpan
  cartBadge.textContent = state.cart.totalItems;

  // 2. Baca kata kunci pencarian dari URL (?q=...) jika ada
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('q') || '';
  searchInput.value = initialQuery;
  state.searchQuery = initialQuery;

  // 3. Muat 10 produk pertama
  const data = await getProducts(initialQuery, 10, 0);
  if (data) {
    state.total = data.total;
    state.products = data.products.map((p) => new Product(p));
    renderProducts(state.products, grid);
    initLazyImages();

    if (state.products.length >= state.total) {
      sentinel.textContent =
        state.total === 0
          ? 'Produk tidak ditemukan'
          : 'Semua produk sudah ditampilkan';
    }
  }
}

// Jalankan inisialisasi awal
init();
