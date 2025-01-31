import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

const SingleMenuProvider = ({ providerId, onUpdate }) => {
  const [menu, setMenu] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    isAvailable: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(formData);
      setMenu(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating menu:', error);
      alert('Error updating menu: ' + error.message);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Kitchen Menu</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isEditing ? 'Cancel' : 'Modify Menu'}
        </motion.button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Item Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Price (₹)*</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Category</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snacks">Snacks</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="mr-2"
            />
            <label>Available</label>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save Menu
          </motion.button>
        </form>
      ) : (
        <div className="space-y-4">
          {menu ? (
            <>
              <div>
                <h3 className="font-bold">Item Name</h3>
                <p className="text-lg">{menu.name}</p>
              </div>
              <div>
                <h3 className="font-bold">Description</h3>
                <p>{menu.description || 'No description provided'}</p>
              </div>
              <div>
                <h3 className="font-bold">Price</h3>
                <p className="text-lg">₹{menu.price}</p>
              </div>
              <div>
                <h3 className="font-bold">Category</h3>
                <p>{menu.category || 'Uncategorized'}</p>
              </div>
              <div>
                <h3 className="font-bold">Status</h3>
                <p>{menu.isAvailable ? 'Available' : 'Not Available'}</p>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">No menu item set. Click Modify Menu to add one.</p>
          )}
        </div>
      )}
    </Card>
  );
};

export default SingleMenuProvider;