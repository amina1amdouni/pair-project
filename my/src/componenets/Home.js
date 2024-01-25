// Home.js
import React from 'react';


const Home = ({ changeView }) => {
  const navigateToAllProducts = () => {
    changeView('AllProducts'); // Assume 'AllProducts' is the identifier for the AllProducts component
  };

  return (
    <div className="home-container">
      {/* Add background styling directly to the home-container */}
      <div >
        <h1 className="header">Welcome to Your Restaurant</h1>
        <p className="description">Explore our delicious menu and enjoy a wonderful dining experience!</p>
        <button onClick={navigateToAllProducts} className="bn30">See All Products</button>
        {/* Add more content as needed */}
      </div>
    </div>
  );
};

export default Home;
