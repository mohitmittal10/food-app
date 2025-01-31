import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "../signup/firebaseConfig";
import { 
  doc, 
  getDoc, 
  setDoc,
  collection,
  query, 
  where, 
  getDocs,
  updateDoc 
} from "firebase/firestore";
import AdminHeader from "./AdminHeader";
import "./admin.css";

const AdminPage = () => {
  const [selectedSection, setSelectedSection] = useState("profile");
  const [providerProfile, setProviderProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [menuItem, setMenuItem] = useState(null);
  const [providerOrders, setProviderOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [profileEditing, setProfileEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    isAvailable: true,
  });
  const [profileData, setProfileData] = useState({
    businessName: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    description: "",
    cuisineType: "",
    openingTime: "",
    closingTime: "",
    isOpen: true,
  });

  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        // Fetch Provider Profile
        const docRef = doc(db, "providers", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProviderProfile(data);
          setProfileData(data);
        }

        // Fetch Menu Item
        const menuRef = doc(db, "providers", user.uid, "currentMenu", "menu");
        const menuSnap = await getDoc(menuRef);
        if (menuSnap.exists()) {
          const menuData = menuSnap.data();
          setMenuItem(menuData);
          setFormData(menuData);
        }

        // Fetch Provider Orders
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("providerId", "==", user.uid));
        const ordersSnap = await getDocs(q);
        const orders = ordersSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProviderOrders(orders);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to update profile");
      return;
    }

    try {
      const profileRef = doc(db, "providers", user.uid);
      await updateDoc(profileRef, {
        ...profileData,
        updatedAt: new Date().toISOString()
      });

      setProviderProfile(profileData);
      setProfileEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile: " + error.message);
    }
  };

  const renderProfile = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="profile-container"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">
        Provider Profile
      </motion.h2>

      {profileEditing ? (
        <motion.form
          onSubmit={handleProfileSubmit}
          variants={itemVariants}
          className="profile-form"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="businessName">Business Name*</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={profileData.businessName}
                onChange={handleProfileChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ownerName">Owner Name*</label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                value={profileData.ownerName}
                onChange={handleProfileChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number*</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="form-group md:col-span-2">
              <label htmlFor="address">Address*</label>
              <textarea
                id="address"
                name="address"
                value={profileData.address}
                onChange={handleProfileChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="form-group md:col-span-2">
              <label htmlFor="description">Business Description</label>
              <textarea
                id="description"
                name="description"
                value={profileData.description}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cuisineType">Cuisine Type*</label>
              <select
                id="cuisineType"
                name="cuisineType"
                value={profileData.cuisineType}
                onChange={handleProfileChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Select Cuisine Type</option>
                <option value="North Indian">North Indian</option>
                <option value="South Indian">South Indian</option>
                <option value="Chinese">Chinese</option>
                <option value="Continental">Continental</option>
                <option value="Multi-Cuisine">Multi-Cuisine</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="isOpen"
                  checked={profileData.isOpen}
                  onChange={handleProfileChange}
                />
                Currently Open for Orders
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="openingTime">Opening Time</label>
              <input
                type="time"
                id="openingTime"
                name="openingTime"
                value={profileData.openingTime}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="form-group">
              <label htmlFor="closingTime">Closing Time</label>
              <input
                type="time"
                id="closingTime"
                name="closingTime"
                value={profileData.closingTime}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Save Profile
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setProfileEditing(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </motion.button>
          </div>
        </motion.form>
      ) : (
        <motion.div variants={containerVariants} className="profile-display">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Business Information</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setProfileEditing(true)}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Edit Profile
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="info-group">
              <h4 className="font-bold">Business Name</h4>
              <p>{providerProfile?.businessName}</p>
            </div>

            <div className="info-group">
              <h4 className="font-bold">Owner Name</h4>
              <p>{providerProfile?.ownerName}</p>
            </div>

            <div className="info-group">
              <h4 className="font-bold">Contact Information</h4>
              <p>Phone: {providerProfile?.phone}</p>
              <p>Email: {providerProfile?.email}</p>
            </div>

            <div className="info-group">
              <h4 className="font-bold">Business Hours</h4>
              <p>Opens: {providerProfile?.openingTime}</p>
              <p>Closes: {providerProfile?.closingTime}</p>
              <p className={providerProfile?.isOpen ? "text-green-600" : "text-red-600"}>
                {providerProfile?.isOpen ? "Currently Open" : "Currently Closed"}
              </p>
            </div>

            <div className="info-group md:col-span-2">
              <h4 className="font-bold">Address</h4>
              <p>{providerProfile?.address}</p>
            </div>

            <div className="info-group md:col-span-2">
              <h4 className="font-bold">Business Description</h4>
              <p>{providerProfile?.description || "No description provided"}</p>
            </div>

            <div className="info-group">
              <h4 className="font-bold">Cuisine Type</h4>
              <p>{providerProfile?.cuisineType}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  const renderOrders = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="orders-container"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">
        Orders
      </motion.h2>
  
      {providerOrders.length > 0 ? (
        <motion.div variants={containerVariants} className="orders-list">
          {providerOrders.map((order) => (
            <motion.div
              key={order.id}
              variants={itemVariants}
              className="order-card bg-white shadow-md rounded-lg p-4 mb-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">Order #{order.id.slice(-6)}</h3>
                <span className={`status-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
  
              <div className="order-details">
                <p><strong>Name:</strong> {order.name}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Item:</strong> {order.item}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Date:</strong> {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleString() : "N/A"}</p>
              </div>
  
              <div className="order-actions mt-4 flex space-x-2">
                {order.status === "pending" && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => handleOrderStatus(order.id, "accepted")}
                    >
                      Accept
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleOrderStatus(order.id, "rejected")}
                    >
                      Reject
                    </motion.button>
                  </>
                )}
  
                {order.status === "accepted" && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleOrderStatus(order.id, "completed")}
                  >
                    Mark as Completed
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </motion.div>
  );
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to manage menu items");
      return;
    }

    if (!formData.name || !formData.price) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const menuRef = doc(db, "providers", user.uid, "currentMenu", "menu");
      await setDoc(menuRef, {
        ...formData,
        price: parseFloat(formData.price),
        providerId: user.uid,
        updatedAt: new Date().toISOString(),
      });

      setMenuItem(formData);
      setIsEditing(false);
      alert("Menu updated successfully!");
    } catch (error) {
      console.error("Error updating menu:", error);
      alert("Error updating menu: " + error.message);
    }
  };

  const handleOrderStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await setDoc(orderRef, { status: newStatus }, { merge: true });
      
      // Update local state
      setProviderOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId
            ? { ...order, status: newStatus }
            : order
        )
      );
      
      alert(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error updating order status: " + error.message);
    }
  };

  const renderMenu = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="menu-container"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">
        Manage Menu
      </motion.h2>
      
      {isEditing ? (
        <motion.form
          onSubmit={handleSubmit}
          variants={itemVariants}
          className="menu-form"
        >
          <div className="form-group">
            <label htmlFor="name">Item Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price (₹)*</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
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
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
              />
              Available
            </label>
          </div>
          <div className="flex space-x-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Save Menu
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setIsEditing(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </motion.button>
          </div>
        </motion.form>
      ) : (
        <motion.div variants={containerVariants} className="menu-display">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Current Menu</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Modify Menu
            </motion.button>
          </div>
          
          {menuItem ? (
            <motion.div
              variants={itemVariants}
              className="menu-item-card bg-white shadow-md rounded-lg p-4"
            >
              <h4 className="font-bold">{menuItem.name}</h4>
              <p>{menuItem.description}</p>
              <p className="text-green-600">₹{menuItem.price}</p>
              <p>Category: {menuItem.category || "Uncategorized"}</p>
              <p>{menuItem.isAvailable ? "Available" : "Not Available"}</p>
            </motion.div>
          ) : (
            <p className="text-center text-gray-500">No menu item set. Click Modify Menu to add one.</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <>
      <AdminHeader />
      <div className="admin-page">
        <motion.nav
          className="admin-navbar"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="logo">
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              स्वाद अनुसार
            </motion.h1>
          </div>
          <ul className="nav-items">
            {["profile", "orders", "menu"].map((item) => (
              <motion.li
                key={item}
                whileHover={{ scale: 1.1, color: "#ff4757" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSection(item)}
                className={selectedSection === item ? "active" : ""}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        <main className="main-content">
          <AnimatePresence mode="wait">
            {selectedSection === "profile" && !isLoading && renderProfile()}
            {selectedSection === "orders" && renderOrders()}
            {selectedSection === "menu" && renderMenu()}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
};

export default AdminPage;