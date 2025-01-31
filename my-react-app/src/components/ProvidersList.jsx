// ProvidersList.jsx
import React, { useState, useEffect } from 'react';
import { useMenu } from './MenuContext';
import { useOrders } from './OrderContext';
import { auth, db } from './signup/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProvidersList = () => {
  const { menuItems } = useMenu();
  const { placeOrder } = useOrders();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({
    quantity: 1
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data());
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
    
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setUserProfile(null);
      } else {
        fetchUserProfile();
      }
    });

    return () => unsubscribe();
  }, []);

  const handleOrderSubmit = async (providerId, itemName) => {
    const user = auth.currentUser;
    
    if (!user) {
      alert('Please login to place an order');
      navigate('/login');
      return;
    }

    if (!user.emailVerified) {
      alert('Please verify your email before placing orders');
      return;
    }

    if (!userProfile || !userProfile.contact || !userProfile.address) {
      alert('Please complete your profile before placing an order');
      return;
    }

    try {
      const orderData = {
        item: itemName,
        quantity: orderDetails.quantity,
        name: userProfile.name,
        phone: userProfile.contact, // Using contact from your user schema
        address: userProfile.address,
        providerId,
        userId: user.uid,
        status: 'pending',
        createdAt: new Date(),
      };

      await placeOrder(orderData);
      alert('Order placed successfully!');
      setOrderDetails({ quantity: 1 });
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order: ' + error.message);
    }
  };

  const renderOrderModal = (providerId, itemName) => (
    <motion.div 
      className="order-modal"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {auth.currentUser ? (
        userProfile ? (
          <div className="p-4">
            <div className="user-details-preview mb-4">
              <p className="mb-2"><strong>Name:</strong> {userProfile.name}</p>
              <p className="mb-2"><strong>Phone:</strong> {userProfile.contact}</p>
              <p className="mb-2"><strong>Address:</strong> {userProfile.address}</p>
            </div>
            <div className="quantity-input mb-4">
              <label className="block mb-2">Quantity:</label>
              <input
                type="number"
                value={orderDetails.quantity}
                onChange={(e) => setOrderDetails({ 
                  quantity: Math.max(1, parseInt(e.target.value) || 1) 
                })}
                min="1"
                className="w-full p-2 border rounded"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOrderSubmit(providerId, itemName)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Confirm Order
            </motion.button>
          </div>
        ) : (
          <div className="p-4">
            <p className="text-center text-red-500">
              Please complete your profile before placing orders
            </p>
          </div>
        )
      ) : (
        <div className="p-4">
          <p className="text-center mb-4">Please login to place orders</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/login')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Login
          </motion.button>
        </div>
      )}
    </motion.div>
  );

  // Group menu items by kitchen
  const menuByKitchen = menuItems.reduce((acc, item) => {
    if (!acc[item.kitchenName]) {
      acc[item.kitchenName] = [];
    }
    acc[item.kitchenName].push(item);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="providers-list p-4">
      {Object.entries(menuByKitchen).map(([kitchenName, items]) => (
        <motion.div
          key={kitchenName}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="kitchen-section mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">{kitchenName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className="menu-item bg-white rounded-lg shadow-md p-4"
              >
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-green-600 font-bold mb-4">₹{item.price}</p>
                {renderOrderModal(item.providerId, item.name)}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProvidersList;