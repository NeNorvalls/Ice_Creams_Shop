// cartCountUpdate.js
export function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-number');
    const cart = getCartFromLocalStorage();
    cartCountElement.innerText = cart.length.toString();
  }
  
  function getCartFromLocalStorage() {
 
    return []; 
  }
  