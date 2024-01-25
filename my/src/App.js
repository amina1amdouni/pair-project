import React, { useState } from 'react';
import axios from 'axios';
import Home from './componenets/Home';
import AddProduct from './componenets/AddProduct';
import AllProducts from './componenets/AllProducts';
import ProductDetail from './componenets/singleProduct';
import ShoppingCart from './componenets/CartList';

import './App.css';

function App() {
  const [view, setView] = useState('Home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const changeView = (view) => {
    setView(view);
  };

  const navigateToProductDetail = (product) => {
    setSelectedProduct(product);
    setView('ProductDetail');
  };

  const handleAddToCart = (selectedProduct) => {
    setCart([...cart, selectedProduct]);
  };

  const handleDeleteItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5090/api/get?name=${searchTerm}`);
      setView('AllProducts');
      setSelectedProduct(null);
      setCart([]);
      navigateToProductDetail(response.data[0]);
    } catch (error) {
      console.error('Error searching for product:', error);
    }
  };

  return (
    <div className="App">
      <nav className="nav">
        <div className="nav-item is-active" onClick={() => setView("Home")}>
          Home
        </div>
        <div className="nav-item" onClick={() => setView("AllProducts")}>
          AllProducts
        </div>
        <div className={`nav-item ${view === 'AddProduct' ? 'is-active' : ''}`} onClick={() => changeView('AddProduct')}>
          AddProduct
        </div>
        <div className={`nav-item ${view === 'Basket' ? 'is-active' : ''}`} onClick={() => changeView('Basket')}>
          Basket
        </div>
        <div className="nav-item" active-color="black">
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div>
          <h1>Your Food Website</h1>
        </div>
        <span className="nav-indicator"></span>
      </nav>
      {view === 'Home' && <Home changeView={changeView}/>}
      {view === 'AllProducts' && <AllProducts navigateToProductDetail={navigateToProductDetail} />}
      {view === 'AddProduct' && <AddProduct onProductAdded={() => changeView('AllProducts')} />}
      {view === 'ProductDetail' && <ProductDetail item={selectedProduct} onAddToCart={handleAddToCart} />}
      {view === 'Basket' && <ShoppingCart cart={cart} onDeleteItem={handleDeleteItem} />}
    </div>
  );
}

export default App;
