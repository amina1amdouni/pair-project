import React, { useState } from 'react';

function ProductDetail({ item, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [extraCheese, setExtraCheese] = useState(false);

  const handleAddToCart = () => {
    const selectedProduct = {
      ...item,
      quantity,
      extraCheese,
    };
    onAddToCart(selectedProduct);
  };

  return (
    <div className="product-detail">
        <img  src=  {item.image}/>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>Price: {item.price}</p>
      <label htmlFor="quantity">Quantity:</label>
      <input
        id="quantity"
        type="number"
        min="1"
        pattern="\d*"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <label>
        Extra Cheese:
        <input
          type="checkbox"
          checked={extraCheese}
          onChange={() => setExtraCheese(!extraCheese)}
        />
      </label>
      <button onClick={handleAddToCart}className="bn632-hover bn23">Add to Cart</button>
    </div>
  );
}

export default ProductDetail;