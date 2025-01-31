import React, { useState, useEffect } from 'react';

const SingleMenuAdmin = ({ 
    initialMenuItem, 
    onSave, 
    onFetch, 
    isLoading 
  }) => {
    const [menuItem, setMenuItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      price: '',
      category: '',
      isAvailable: true,
    });
  
    useEffect(() => {
      if (onFetch) {
        const fetchData = async () => {
          try {
            const data = await onFetch();
            if (data) {
              setMenuItem(data);
              setFormData(data);
            }
          } catch (error) {
            console.error('Error fetching menu item:', error);
          }
        };
        fetchData();
      }
    }, [onFetch]);
  
    useEffect(() => {
      if (initialMenuItem) {
        setMenuItem(initialMenuItem);
        setFormData(initialMenuItem);
      }
    }, [initialMenuItem]);
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!onSave) return;
  
      try {
        await onSave({
          ...formData,
          price: parseFloat(formData.price),
          updatedAt: new Date().toISOString(),
        });
        setMenuItem(formData);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating menu:', error);
        alert('Error updating menu: ' + error.message);
      }
    };

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="text-center py-8">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Edit Menu Item</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block font-medium">Item Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block font-medium">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="price" className="block font-medium">Price (₹)*</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="block font-medium">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Category</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snacks">Snacks</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isAvailable"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="isAvailable">Available</label>
            </div>

            <div className="flex space-x-4">
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
              <button 
                type="button" 
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Current Menu Item</h2>
        <button 
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Edit Menu
        </button>
      </div>
      <div>
        {menuItem ? (
          <div className="space-y-4">
            <div>
              <h3 className="font-bold">Item Name</h3>
              <p className="text-lg">{menuItem.name}</p>
            </div>
            
            <div>
              <h3 className="font-bold">Description</h3>
              <p>{menuItem.description || 'No description provided'}</p>
            </div>
            
            <div>
              <h3 className="font-bold">Price</h3>
              <p className="text-lg">₹{menuItem.price}</p>
            </div>
            
            <div>
              <h3 className="font-bold">Category</h3>
              <p>{menuItem.category || 'Uncategorized'}</p>
            </div>
            
            <div>
              <h3 className="font-bold">Status</h3>
              <p>{menuItem.isAvailable ? 'Available' : 'Not Available'}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No menu item found. Click Edit Menu to add one.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleMenuAdmin;