import React from 'react';

function ShoppingCart({ cart, onDeleteItem }) {
  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => {
      const productPrice = parseFloat(product.price);
      const productQuantity = parseInt(product.quantity, 10);

      if (!isNaN(productPrice) && !isNaN(productQuantity)) {
        return total + productPrice * productQuantity;
      } else {
        console.error(`Invalid price or quantity for product: ${product.name}`);
        return total;
      }
    }, 0);
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((product, index) => (
          <li key={index}>
            {product.name} - Quantity: {product.quantity} - Price: {product.price}
            <button onClick={() => onDeleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <p>Total Price: {calculateTotalPrice()}TND</p>
    </div>
  );
}

export default ShoppingCart;