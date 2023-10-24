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

    const cartItems = {};

    cart.forEach((itemName) => {
      if (!cartItems[itemName]) {
        cartItems[itemName] = { count: 1, iceCream: findIceCreamByName(itemName) };
      } else {
        cartItems[itemName].count += 1;
      }
    });

    for (const item in cartItems) {
      const cartItem = createCartItem(cartItems[item]);
      cartContainer.appendChild(cartItem);
      total += cartItems[item].iceCream.price * cartItems[item].count;
    }

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    cartCountElement.textContent = cart.length;
  }

  function findIceCreamByName(itemName) {
    return iceCreams.find((iceCream) => iceCream.name === itemName);
  }

  function createCartItem(cartItemData) {
    const { iceCream, count } = cartItemData;
    const { name, price } = iceCream;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    const nameElement = document.createElement('h3');
    nameElement.innerText = name;
    cartItem.appendChild(nameElement);

    const quantityElement = document.createElement('p');
    quantityElement.innerText = `Qty: ${count}`;
    cartItem.appendChild(quantityElement);

    const priceElement = document.createElement('p');
    priceElement.innerText = `Price: $${(price * count).toFixed(2)}`;
    cartItem.appendChild(priceElement);

    const increaseButton = createQuantityButton('+', () => increaseQuantity(iceCream));
    cartItem.appendChild(increaseButton);

    const decreaseButton = createQuantityButton('-', () => decreaseQuantity(iceCream));
    cartItem.appendChild(decreaseButton);

    const removeButton = createQuantityButton('Remove', () => removeItemFromCart(iceCream));
    cartItem.appendChild(removeButton);

    return cartItem;
  }

  function createQuantityButton(text, clickHandler) {
    const button = document.createElement('button');
    button.innerText = text;
    button.addEventListener('click', clickHandler);
    return button;
  }

  function increaseQuantity(iceCream) {
    cart.push(iceCream.name);
    updateCartInLocalStorage(cart);
    renderCart();
  }

  function decreaseQuantity(iceCream) {
    const index = cart.lastIndexOf(iceCream.name);
    if (index !== -1) {
      cart.splice(index, 1);
      updateCartInLocalStorage(cart);
      renderCart();
    }
  }

  function removeItemFromCart(iceCream) {
    const index = cart.findIndex((itemName) => itemName === iceCream.name);
    if (index !== -1) {
      cart.splice(index, 1);
      updateCartInLocalStorage(cart);
      renderCart();
    }
  }
});
