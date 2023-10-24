// localStorage.js

export function getCartFromLocalStorage() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  return cart;
}

export function updateCartInLocalStorage(updatedCart) {
  localStorage.setItem('cart', JSON.stringify(updatedCart));
}
