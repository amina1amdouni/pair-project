// AllAccessories.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item.js';
import '../App.css'; 

function AllProducts () {
  const [data, setData] = useState([]);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPrix, setUpdatedPrix] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [editItemId, setEditItemId] = useState(null);
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

  const deleteReview = (id) => {
    axios.delete(`http://localhost:5090/api/delete/${id}`).then((result) => {
      console.log(result);
      setData(data.filter(item => item.id !== id));
    });
  };

  const startEdit = (id) => {
    setEditItemId(id);
    const itemToEdit = data.find(item => item.id === id);
    setUpdatedName(itemToEdit.name);
    setUpdatedDescription(itemToEdit.description);
    setUpdatedPrix(itemToEdit.price);
    setProductImage(itemToEdit.image);
  };

  const cancelEdit = () => {
    setEditItemId(null);
    setUpdatedName("");
    setUpdatedPrix("");
    setUpdatedDescription("");
    setProductImage("");
  };

  const updateReview = async (id) => {
    const updatedData = {
      name: updatedName,
      price: updatedPrix,
      description: updatedDescription,
      image: updateImage,
    };

    await axios
      .put(`http://localhost:5090/api/put/${id}`, updatedData)
      .then((result) => {
        console.log(result);
        setData(data.map(item => (item.id === id ? { ...item, ...updatedData } : item)));
      });

    setEditItemId(null);
    setUpdatedName("");
    setUpdatedPrix("");
    setUpdatedDescription("");
    setProductImage("");
  };

  return (
    <div className="all-accessories-container">
      
      <ul className="item-list">
        {data.map((item) => (
          <div key={item.id} className="item-container">
            <Item item={item} />
            {editItemId === item.id ? (
              <>
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
                <button onClick={() => updateReview(item.id)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => startEdit(item.id)}>Edit</button>
                <button onClick={() => deleteReview(item.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default AllProducts ;
