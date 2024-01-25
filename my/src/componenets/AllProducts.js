import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';

function AllProducts({ navigateToProductDetail }) {
  const [originalData, setOriginalData] = useState([]); // New state variable for original data
  const [data, setData] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPrix, setUpdatedPrix] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updateImage, setProductImage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5090/api/get');
        setOriginalData(response.data); // Set the original data
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
    const itemToEdit = data.find(item => item.id === id);
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
      setData(data.map(item => (item.id === id ? { ...item, ...updatedData } : item)));
    } catch (error) {
      console.error('Error updating review:', error);
    }

    setEditItemId(null);
    setUpdatedName("");
    setUpdatedPrix("");
    setUpdatedDescription("");
    setProductImage("");
  };

  const cancelEdit = () => {
    setEditItemId(null);
    setUpdatedName("");
    setUpdatedPrix("");
    setUpdatedDescription("");
    setProductImage("");
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5090/api/get?name=${searchTerm}`);
      setData(response.data);
    } catch (error) {
      console.error('Error searching for product:', error);
    }
  };

  const resetSearch = () => {
    setData(originalData); // Reset data to the original data
    setSearchTerm("");
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
                <button onClick={() => navigateToProductDetail(item)}>View Details</button>
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

export default AllProducts;
