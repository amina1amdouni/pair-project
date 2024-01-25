import React, { useState } from 'react';
import Home from './componenets/Home.js';

import AddProduct from './componenets/AddProduct.js';

import AllProducts from './componenets/AllProducts.js';

import './App.css';

function App() {
  const [view, setView] = useState('Home');

  const changeView = (view) => {
    setView(view);
  };

  return (
    <div className="App">
      <nav className="nav">
        <div className="nav-item is-active" onClick={() => setView("Home")}>
          Home
        </div>

        <div className="nav-item" onClick={() => setView("AllProducts")}>  {/* Removed extra space */}
          AllProducts
        </div>
        <div className="nav-item" onClick={() => setView("AddProduct")}>
          AddProduct
        </div>
        <div className="nav-item" active-color="black">
          <input type="text" />
          <button>search</button>
        </div>
        <span className="nav-indicator"></span>
      </nav>
      {view === 'Home' && <Home changeView={changeView} />}
      {view === 'AllProducts' && <AllProducts />}
      {view === 'AddProduct' && <AddProduct onProductAdded={() => changeView('AllProducts')} />}
      <div></div>
      <div></div>
    </div>
  );
}

export default App;