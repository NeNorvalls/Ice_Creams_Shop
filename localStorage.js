// localStorage.js

export function getCartFromLocalStorage() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  return Array.isArray(cart) ? cart : [];
}

export function updateCartInLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
