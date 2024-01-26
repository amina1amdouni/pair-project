// AllProducts.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';
import '../App.css';

function AllProducts({ navigateToProductDetail }) {
  const [data, setData] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPrix, setUpdatedPrix] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updateImage, setProductImage] = useState('');

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
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const startEdit = (id) => {
    setEditItemId(id);
    const itemToEdit = data.find((item) => item.id === id);
    setUpdatedName(itemToEdit.name);
    setUpdatedDescription(itemToEdit.description);
    setUpdatedPrix(itemToEdit.price);
    setProductImage(itemToEdit.image);
  };

  const updateReview = async (id) => {
    const updatedData = {
      name: updatedName,
      price: updatedPrix,
      description: updatedDescription,
      image: updateImage,
    };

    try {
      await axios.put(`http://localhost:5090/api/put/${id}`, updatedData);
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
      );
    } catch (error) {
      console.error('Error updating review:', error);
    }

    setEditItemId(null);
    setUpdatedName('');
    setUpdatedPrix('');
    setUpdatedDescription('');
    setProductImage('');
  };

  const cancelEdit = () => {
    setEditItemId(null);
    setUpdatedName('');
    setUpdatedPrix('');
    setUpdatedDescription('');
    setProductImage('');
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
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  placeholder="Name"
                  required
                />
                <input
                  type="text"
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  placeholder="Description"
                  required
                />
                <input
                  type="text"
                  value={updatedPrix}
                  onChange={(e) => setUpdatedPrix(e.target.value)}
                  placeholder="Price"
                  required
                />
                <input
                  type="text"
                  value={updateImage}
                  onChange={(e) => setProductImage(e.target.value)}
                  placeholder="Image"
                  required
                />
                <button className="buttons" onClick={() => updateReview(item.id)}>
                  Save
                </button>
                <button className="cancelButton" onClick={cancelEdit}>
                  Cancel
                </button>
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
