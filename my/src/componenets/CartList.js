import React, { useState } from 'react';

function ShoppingCart({ cart, onDeleteItem }) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phoneNumber: '',
    adress: '' // Corrected from 'localization'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

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

  const handlePlaceOrder = () => {
    // You can use customerInfo to send the order details to your backend or perform other actions.
    console.log('Placing order with customer info:', customerInfo);

    // Display an alert when the order is placed
    alert('Order placed successfully!');
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
      <p>Total Price: {calculateTotalPrice()} TND</p>

      <div className="order-container">
        <h3>Customer Information</h3>
        <form>
          <label>Name:</label>
          <input type="text" name="name" value={customerInfo.name} onChange={handleChange} />

          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={customerInfo.phoneNumber} onChange={handleChange} />

          <label>Address:</label>
          <input type="text" name="adress" value={customerInfo.adress} onChange={handleChange} />
        </form>
        <button onClick={handlePlaceOrder}>Confirm Order</button>
      </div>
    </div>
  );
}

export default ShoppingCart;
