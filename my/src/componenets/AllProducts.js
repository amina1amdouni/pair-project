// AllProducts.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';
import ProductDetail from './singleProduct';
import '../App.css';

function AllProducts({ navigateToProductDetail }) {
  const [data, setData] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5090/api/get?name=${searchTerm}`);
      setData(response.data);
    } catch (error) {
      console.error('Error searching for product:', error);
    }
  };

  return (
    <div className="all-accessories-container">
     
      
      <ul className="item-list">
        {data.map((item) => (
          <div key={item.id} className={`item-container product-item-${item.id}`}>
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
              <button onClick={() => navigateToProductDetail(item)} className="bn31">
                  <span className="bn31span">View Details</span>
                </button>
                <button onClick={() => startEdit(item.id)} className="bn632-hover bn25">
                  Edit
                </button>
                <button onClick={() => deleteReview(item.id)} className="bn632-hover bn28">
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default AllProducts;
