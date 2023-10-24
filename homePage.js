import iceCreams from './iceCreams.js';
import { getCartFromLocalStorage, updateCartInLocalStorage } from './localStorage.js';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');

  renderIceCreams();

  function renderIceCreams() {
    const cart = getCartFromLocalStorage();

    appContainer.innerHTML = '';

    iceCreams.forEach((iceCream, index) => {
      const iceCreamCard = createIceCreamCard(iceCream, cart, index);
      appContainer.appendChild(iceCreamCard);
    });

    updateCartCountInNavbar();
  }

  function createIceCreamCard(iceCream, cart, index) {
    const { name, flavors, price } = iceCream;

    const iceCreamCard = document.createElement('div');
    iceCreamCard.classList.add('ice-cream-card');

    const cardColors = [
      '#FFB6C1', '#FFD700', '#AFEEEE', '#98FB98', '#87CEEB',
      '#DDA0DD', '#B0E0E6', '#FFC0CB', '#87CEFA', '#98FB98'
    ];

    iceCreamCard.style.backgroundColor = cardColors[index % cardColors.length];

    const nameElement = document.createElement('h3');
    nameElement.innerText = name;
    iceCreamCard.appendChild(nameElement);

    const flavorsElement = document.createElement('p');
    flavorsElement.innerText = `Flavors: ${flavors.join(', ')}`;
    iceCreamCard.appendChild(flavorsElement);

    const priceElement = document.createElement('p');
    priceElement.innerText = `Price: $${price.toFixed(2)}`;
    iceCreamCard.appendChild(priceElement);

    const addButton = document.createElement('button');
    addButton.innerText = isInCart(cart, name) ? 'Remove from Cart' : 'Add to Cart';
    addButton.addEventListener('click', () => toggleCart(iceCream, name, cart));
    iceCreamCard.appendChild(addButton);

    const countElement = document.createElement('span');
    countElement.classList.add('count');
    countElement.innerText = ` (${getCount(cart, name)})`;
    iceCreamCard.appendChild(countElement);

    return iceCreamCard;
  }

  function getCount(cart, itemName) {
    return cart.filter(item => item === itemName).length;
  }

  function addToCart(itemName) {
    const cart = getCartFromLocalStorage();
    const updatedCart = [...cart, itemName];
    updateCartInLocalStorage(updatedCart);
    renderIceCreams();
  }

  function getCount(cart, itemName) {
    return cart.filter(item => item === itemName).length;
  }

  function isInCart(cart, itemName) {
    return cart.includes(itemName);
  }

  function toggleCart(iceCream) {
    const cart = getCartFromLocalStorage();
    const { name } = iceCream;

    if (isInCart(cart, name)) {
      const updatedCart = cart.filter(item => item !== name);
      updateCartInLocalStorage(updatedCart);
    } else {
      const updatedCart = [...cart, name];
      updateCartInLocalStorage(updatedCart);
    }

    renderIceCreams();
  }

  function updateCartCountInNavbar() {
    const cart = getCartFromLocalStorage();
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.innerText = cart.length;
      console.log('Cart count updated:', cart.length);
    }
  }

  window.toggleCartPage = function () {
    window.location.href = 'cart.html';
  };
});
