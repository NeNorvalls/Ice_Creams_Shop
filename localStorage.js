const CART_KEY = 'cart';

const getCartFromLocalStorage = () => {
  const cartJson = localStorage.getItem(CART_KEY);
  return cartJson ? JSON.parse(cartJson) : [];
};

const updateCartInLocalStorage = (cart) => {
  const cartJson = JSON.stringify(cart);
  localStorage.setItem(CART_KEY, cartJson);
};

export { getCartFromLocalStorage, updateCartInLocalStorage };
