import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';
import ProductDetail from './singleProduct';
// import ShoppingCart from './CartList'; // Removed ShoppingCart import
import '../App.css';

function AllProducts({ navigateToProductDetail }) {
  const [data, setData] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  // const [cart, setCart] = useState([]); // Removed cart state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5090/api/get');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:5090/api/delete/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const startEdit = (id) => {
    setEditItemId(id);
  };

  const updateReview = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:5090/api/put/${id}`, updatedData);
      setData(data.map(item => (item.id === id ? { ...item, ...updatedData } : item)));
    } catch (error) {
      console.error('Error updating review:', error);
    }

    setEditItemId(null);
  };

  return (
    <div className="all-accessories-container">
      <ul className="item-list">
        {data.map((item) => (
          <div key={item.id} className="item-container">
            <Item item={item} />
            {editItemId === item.id ? (
              <div>
                <input type="text" value={item.name} onChange={() => {}} placeholder="Name" required />
                <input type="text" value={item.description} onChange={() => {}} placeholder="Description" required />
                <input type="text" value={item.price} onChange={() => {}} placeholder="Price" required />
                <input type="text" value={item.image} onChange={() => {}} placeholder="Image" required />
                <button onClick={() => updateReview(item.id, { name: item.name, description: item.description, price: item.price, image: item.image })}>Save</button>
                <button onClick={() => {}}>Cancel</button>
              </div>
            ) : (
              <div>
                <button onClick={() => navigateToProductDetail(item)}>View Details</button>
                <button onClick={() => startEdit(item.id)}>Edit</button>
                <button onClick={() => deleteReview(item.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </ul>
      
    </div>
  );
}

export default AllProducts;
