
import '../App.css'
import React from 'react';

function Item({ item }) {
  return (
    <li>
      <img src={item.image} alt={item.name} />
      <h3> {item.name}</h3>
      <h4>Price: {item.price}</h4>
      
    </li>
  );
}

export default Item;
