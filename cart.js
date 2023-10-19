import { getCartFromLocalStorage, updateCartInLocalStorage } from './localStorage.js';
import iceCreams from './iceCreams.js';

document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cart-container');
  const totalElement = document.getElementById('total');
  const clearButton = document.getElementById('clear-cart');

  renderCartItems();

  function renderCartItems() {
    const cart = getCartFromLocalStorage();

    // Clear the cart container before rendering
    cartContainer.innerHTML = '';

    let total = 0; // Initialize total

    cart.forEach((itemName) => {
      const cartItem = createCartItem(itemName);
      cartContainer.appendChild(cartItem);

      // Calculate subtotal for each item and add to the total
      const itemDetails = getItemDetails(itemName);
      const quantity = getQuantity(itemName);
      const subtotal = itemDetails.price * quantity;
      total += subtotal;
    });

    // Display the total
    totalElement.innerText = `Total: $${total.toFixed(2)}`;
  }

  function createCartItem(itemName) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    // Retrieve item details based on itemName from your iceCreams array or wherever it's stored
    const itemDetails = getItemDetails(itemName);

    // Create elements for cart item details (name, price, quantity, buttons)
    const nameElement = document.createElement('p');
    nameElement.innerText = `Name: ${itemDetails.name}`;

    const priceElement = document.createElement('p');
    const quantity = getQuantity(itemName);
    const subtotal = itemDetails.price * quantity;
    priceElement.innerText = `Price: $${subtotal.toFixed(2)}`;

    const quantityElement = document.createElement('p');
    quantityElement.innerText = `Quantity: ${quantity}`;

    const incrementButton = createButton('+', () => incrementItem(itemName));
    const decrementButton = createButton('-', () => decrementItem(itemName));
    const removeButton = createButton('Remove', () => removeItem(itemName));

    // Append elements to cartItem
    cartItem.appendChild(nameElement);
    cartItem.appendChild(priceElement);
    cartItem.appendChild(quantityElement);
    cartItem.appendChild(incrementButton);
    cartItem.appendChild(decrementButton);
    cartItem.appendChild(removeButton);

    return cartItem;
  }

  function getItemDetails(itemName) {
    // Retrieve item details based on itemName from your iceCreams array or wherever it's stored
    const iceCream = iceCreams.find(item => item.name === itemName);
  
    if (iceCream) {
      return iceCream;
    } else {
      console.error(`Item details not found for ${itemName}`);
      return { name: 'Unknown Item', price: 0.00 }; // Default values for unknown items
    }
  }

  function getQuantity(itemName) {
    const cart = getCartFromLocalStorage();
    return cart.filter(item => item === itemName).length;
  }

  function createButton(text, onClick) {
    const button = document.createElement('button');
    button.innerText = text;
    button.addEventListener('click', onClick);
    return button;
  }

  function incrementItem(itemName) {
    const cart = getCartFromLocalStorage();
    const updatedCart = [...cart, itemName];
    updateCartInLocalStorage(updatedCart);
    renderCartItems();
  }
  
  function decrementItem(itemName) {
    const cart = getCartFromLocalStorage();
    const index = cart.indexOf(itemName);
    
    if (index !== -1) {
      const updatedCart = [...cart.slice(0, index), ...cart.slice(index + 1)];
      updateCartInLocalStorage(updatedCart);
      renderCartItems();
    }
  }
  
  
  function removeItem(itemName) {
    const cart = getCartFromLocalStorage();
    const updatedCart = cart.filter(item => item !== itemName);
    updateCartInLocalStorage(updatedCart);
    renderCartItems();
  }

  // Clear the entire cart
  clearButton.addEventListener('click', () => {
    const confirmation = confirm('Are you sure you want to clear the cart?');
    if (confirmation) {
      updateCartInLocalStorage([]);
      renderCartItems();
    }
  });
});
