import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function AddProduct({ onProductAdded }) {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productImage, setProductImage] = useState('');

  const submitProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5090/api/post', {
        name: productName,
        price: productDescription,
        description: productPrice,
        image: productImage,
      });

      const newProduct = response.data;
      console.log('Product added:', newProduct);

      // Reset the form fields after successful submission
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductImage('');

      // Trigger the callback to update the list of accessories
      if (onProductAdded) {
        onProductAdded();
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h2>Add product</h2>
      <form onSubmit={submitProduct} className="page">
        <div className="field field_v1">
          <label htmlFor="product-name" className="ha-screen-reader">
            food Name
          </label>
          <input
            id="product-name"
            className="field__input"
            placeholder="Your Product Name"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <span className="field__label-wrap" aria-hidden="true">
            <span className="field__label">Product Name</span>
          </span>
        </div>
        <div className="field field_v2">
          <label htmlFor="product-description" className="ha-screen-reader">
            Description
          </label>
          <input
            id="product-description"
            className="field__input"
            placeholder="Your Product Description"
            type="text"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
          <span className="field__label-wrap" aria-hidden="true">
            <span className="field__label">Description</span>
          </span>
        </div>
        <div className="field field_v3">
          <label htmlFor="product-price" className="ha-screen-reader">
            Price
          </label>
          <input
            id="product-price"
            className="field__input"
            placeholder="$"
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
          <span className="field__label-wrap" aria-hidden="true">
            <span className="field__label">Price</span>
          </span>
        </div>
        <div className="field field_v3">
          <label htmlFor="product-image" className="ha-screen-reader">
            Image
          </label>
          <input
            id="product-image"
            className="field__input"
            placeholder="Image"
            type="text"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            required
          />
          <span className="field__label-wrap" aria-hidden="true">
            <span className="field__label">Image</span>
          </span>
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
