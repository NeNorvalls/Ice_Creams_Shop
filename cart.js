
import { getCartFromLocalStorage, updateCartInLocalStorage } from './localStorage.js';
import iceCreams from './iceCreams.js';

document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cart-container');
  const totalElement = document.getElementById('total');
  const clearButton = document.getElementById('clear-cart');

  renderCartItems();

  function renderCartItems() {
    const cart = getCartFromLocalStorage();

    cartContainer.innerHTML = '';

    let total = 0; 

    cart.forEach((itemName) => {
      const cartItem = createCartItem(itemName);
      cartContainer.appendChild(cartItem);

      const itemDetails = getItemDetails(itemName);
      const quantity = getQuantity(itemName);
      const subtotal = itemDetails.price * quantity;
      total += subtotal;
    });

    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart.length;

    totalElement.innerText = `Total: $${total.toFixed(2)}`;
  }

  function createCartItem(itemName) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
  
    const itemDetails = getItemDetails(itemName);
  
    const leftColumn = document.createElement('div');
    leftColumn.classList.add('left-column');
  
    const nameElement = document.createElement('p');
    nameElement.innerText = itemDetails.name;
  
    const priceElement = document.createElement('p');
    const quantity = getQuantity(itemName);
    const subtotal = itemDetails.price * quantity;
    priceElement.innerText = `Price: $${subtotal.toFixed(2)}`;
  
    const quantityElement = document.createElement('p');
    quantityElement.innerText = `Quantity: ${quantity}`;
  
    leftColumn.appendChild(nameElement);
    leftColumn.appendChild(priceElement);
    leftColumn.appendChild(quantityElement);
  
    const rightColumn = document.createElement('div');
    rightColumn.classList.add('right-column');
  
    const decrementButton = createButton('-', () => decrementItem(itemName));
    const incrementButton = createButton('+', () => incrementItem(itemName));
    const removeButton = createButton('Remove', () => removeItem(itemName));
  
    rightColumn.appendChild(decrementButton);
    rightColumn.appendChild(incrementButton);
    rightColumn.appendChild(removeButton);
  
    cartItem.appendChild(leftColumn);
    cartItem.appendChild(rightColumn);
  
    return cartItem;
  }
  
  

  function getItemDetails(itemName) {
    const iceCream = iceCreams.find(item => item.name === itemName);
  
    if (iceCream) {
      return iceCream;
    } else {
      console.error(`Item details not found for ${itemName}`);
      return { name: 'Unknown Item', price: 0.00 }; 
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
    console.log('Cart before remove:', cart);
    
    const index = cart.indexOf(itemName);
    
    if (index !== -1) {
      cart.splice(index, 1);
      console.log('Cart after remove:', cart);
      updateCartInLocalStorage(cart);
      renderCartItems();
    }
  }
  
  clearButton.addEventListener('click', () => {
    const confirmation = confirm('Are you sure you want to clear the cart?');
    if (confirmation) {
      updateCartInLocalStorage([]);
      renderCartItems();
    }
  });
});