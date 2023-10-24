import iceCreams from './iceCreams.js';
import { getCartFromLocalStorage, updateCartInLocalStorage } from './localStorage.js';

document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cart-container');
  const clearCartButton = document.getElementById('clear-cart');
  const totalElement = document.getElementById('total');
  const cartCountElement = document.getElementById('cart-count');

  let cart = getCartFromLocalStorage();
  renderCart();

  clearCartButton.addEventListener('click', () => {
    cart = [];
    updateCartInLocalStorage(cart);
    renderCart();
  });

  function renderCart() {
    cartContainer.innerHTML = '';

    let total = 0;

    cart.forEach((itemName) => {
      const iceCream = findIceCreamByName(itemName);
      if (iceCream) {
        const itemPrice = iceCream.price;
        total += itemPrice;

        const cartItem = createCartItem(iceCream);
        cartContainer.appendChild(cartItem);
      }
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    cartCountElement.textContent = cart.length;
  }

  function findIceCreamByName(itemName) {
    return iceCreams.find((iceCream) => iceCream.name === itemName);
  }

  function createCartItem(iceCream) {
    const { name, price } = iceCream;
  
    const itemQuantity = cart.reduce((count, itemName) => {
      if (itemName === iceCream.name) {
        return count + 1;
      }
      return count;
    }, 0);
  
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
  
    const increaseButton = document.createElement('button');
    increaseButton.innerText = '+';
    increaseButton.addEventListener('click', () => increaseQuantity(iceCream, cart));
    cartItem.appendChild(increaseButton); 
  
    const nameElement = document.createElement('h3');
    nameElement.innerText = name;
    cartItem.appendChild(nameElement);
  
    const quantityElement = document.createElement('p');
    quantityElement.innerText = `Qty: ${itemQuantity}`;
    cartItem.appendChild(quantityElement);
  
    const priceElement = document.createElement('p');
    priceElement.innerText = `Price: $${(price * itemQuantity).toFixed(2)}`;
    cartItem.appendChild(priceElement);
  
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.addEventListener('click', () => removeItemFromCart(iceCream));
    cartItem.appendChild(removeButton);
  
    return cartItem;
  }

  function removeItemFromCart(iceCream) {
    cart = cart.filter((itemName) => itemName !== iceCream.name);
    updateCartInLocalStorage(cart);
    renderCart();
  }

});
