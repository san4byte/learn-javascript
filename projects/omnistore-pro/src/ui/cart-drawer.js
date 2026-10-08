/**
 * Modul 03 & 05: UI & Reactive Drawer Keranjang Belanja
 *
 * Modul terpusat untuk mengelola slide-over drawer modal keranjang:
 * - Reaktivitas state badge & modal via subscribe
 * - Kontrol buka & tutup modal keranjang
 * - Event delegation aksi keranjang (increase, decrease, delete)
 */
import { state, subscribe } from '@/state/store.js';
import { renderCartItems } from '@/ui/render-cart-modal.js';

let cartModal = null;
let cartItemsContainer = null;
let cartTotalPrice = null;
let cartDrawerCount = null;

/**
 * Membuka drawer keranjang dan menyinkronkan data tampilan
 */
export function openCart() {
  if (!cartModal) cartModal = document.getElementById('cart-modal');
  if (!cartItemsContainer)
    cartItemsContainer = document.getElementById('cart-items-container');
  if (!cartTotalPrice)
    cartTotalPrice = document.getElementById('cart-total-price');
  if (!cartDrawerCount)
    cartDrawerCount = document.getElementById('cart-drawer-count');

  if (cartModal) cartModal.classList.remove('hidden');
  if (cartItemsContainer) renderCartItems(state.cart, cartItemsContainer);
  if (cartTotalPrice) cartTotalPrice.textContent = state.cart.totalPrice;
  if (cartDrawerCount)
    cartDrawerCount.textContent = `${state.cart.totalItems} item`;
}

/**
 * Menutup drawer keranjang
 */
export function closeCart() {
  if (!cartModal) cartModal = document.getElementById('cart-modal');
  if (cartModal) cartModal.classList.add('hidden');
}

/**
 * Menginisialisasi seluruh event dan reaktivitas modal keranjang
 */
export function initCartDrawer() {
  const cartBadge = document.getElementById('cart-badge');
  const btnCartToggle = document.getElementById('btn-cart-toggle');
  cartModal = document.getElementById('cart-modal');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const btnCloseCart = document.getElementById('btn-close-cart');
  cartItemsContainer = document.getElementById('cart-items-container');
  cartDrawerCount = document.getElementById('cart-drawer-count');
  cartTotalPrice = document.getElementById('cart-total-price');

  // Inisialisasi awal badge navbar
  if (cartBadge) {
    cartBadge.textContent = state.cart.totalItems;
  }

  // 1. Reaktivitas state keranjang (subscribe)
  subscribe((target, prop) => {
    if (prop === 'cart') {
      if (cartBadge) cartBadge.textContent = state.cart.totalItems;
      if (cartDrawerCount)
        cartDrawerCount.textContent = `${state.cart.totalItems} item`;
      if (cartTotalPrice) cartTotalPrice.textContent = state.cart.totalPrice;
      if (cartItemsContainer) renderCartItems(state.cart, cartItemsContainer);
    }
  });

  // 2. Kontrol buka & tutup modal
  btnCartToggle?.addEventListener('click', openCart);
  btnCloseCart?.addEventListener('click', closeCart);
  cartBackdrop?.addEventListener('click', closeCart);

  // 3. Event Delegation aksi belanja (increase, decrease, delete)
  cartItemsContainer?.addEventListener('click', (e) => {
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

      state.cart = state.cart; // Memicu Proxy setter agar otomatis tersimpan & memicu subscribe()
    } catch (err) {
      alert(err.message); // Tangkap OutOfStockError jika melebihi stok
    }
  });

  // 4. Tombol Checkout
  const btnCheckout = document.getElementById('btn-checkout');
  btnCheckout?.addEventListener('click', () => {
    if (state.cart.totalItems === 0) {
      alert(
        'Keranjang belanja Anda masih kosong! Yuk pilih produk terlebih dahulu.'
      );
      return;
    }
    const totalPrice = state.cart.totalPrice;
    alert(
      `Terima kasih telah berbelanja di OmniStore!\nPesanan Anda dengan total tagihan ${totalPrice} berhasil diproses.`
    );
    state.cart.clear();
    state.cart = state.cart;
    closeCart();
  });
}
