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
    syncCartCounts(cart);
    renderCart();
  })

  function renderCart() {
    cartContainer.innerHTML = '';

    let total = 0;

    cart.forEach((itemName) => {
      const iceCream = findIceCreamByName(itemName);
      if (iceCream) {
        const itemPrice = iceCream.price;
        total += itemPrice;

        const cartItem = createCartItem(iceCream, cart);
        cartContainer.appendChild(cartItem);
      }
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    cartCountElement.textContent = cart.length;
  }

  function findIceCreamByName(itemName) {
    return iceCreams.find((iceCream) => iceCream.name === itemName);
  }

  function createCartItem(iceCream, cart) {
    const { name, price } = iceCream;
    const itemQuantity = getCount(cart, name); // Use the getCount function to get the quantity

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

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
    removeButton.addEventListener('click', () => removeItemFromCart(iceCream, cart));
    cartItem.appendChild(removeButton);

    return cartItem;
  }

  function getCount(cart, itemName) {
    return cart.filter(item => item === itemName).length;
  }

  function syncCartCounts(cart) {
    // Iterate through the iceCreams array and update counts based on the cart
    iceCreams.forEach((iceCream) => {
      const { name } = iceCream;
      const count = getCount(cart, name);
      // Update the count in the card for this item
      updateCardCount(name, count);
    });
  }

  // Function to update the count in the cards
  function updateCardCount(itemName, count) {
    const cards = document.getElementsByClassName('ice-cream-card');
    for (let card of cards) {
      if (card.querySelector('h3').innerText === itemName) {
        card.querySelector('.count').innerText = ` (${count})`;
      }
    }
  }
  
  function increaseQuantity(iceCream, cart) {
    cart.push(iceCream.name); // Add the item to the cart
    updateCartInLocalStorage(cart);
    renderCart();
  }
  

  function removeItemFromCart(iceCream) {
    cart = cart.filter((itemName) => itemName !== iceCream.name);
    updateCartInLocalStorage(cart);
    renderCart();
  }

});
