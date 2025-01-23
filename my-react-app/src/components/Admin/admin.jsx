import React, { useState, useEffect } from "react";
import { useOrders } from "../OrderContext"; // Use your OrderContext to fetch orders
import { useMenu } from "../MenuContext"; // Use your MenuContext to fetch and add menu items
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "../signup/firebaseConfig";
import { doc, getDoc, collection, addDoc, getDocs } from "firebase/firestore";
import AdminHeader from "./AdminHeader";
import "./admin.css";

const AdminPage = () => {
  const { orders } = useOrders(); // Fetch orders from OrderContext
  const { addMenuItem, menuItems } = useMenu(); // Fetch menu items from MenuContext
  const [selectedSection, setSelectedSection] = useState("profile");
  const [providerProfile, setProviderProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [menuItemsState, setMenuItemsState] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    isAvailable: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "providers", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProviderProfile(docSnap.data());
        }

        const menuRef = collection(db, "providers", user.uid, "menu");
        const menuSnap = await getDocs(menuRef);
        const items = menuSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMenuItemsState(items);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to add menu items");
      return;
    }

    if (!newItem.name || !newItem.price) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const menuRef = collection(db, "providers", user.uid, "menu");
      const docRef = await addDoc(menuRef, {
        ...newItem,
        price: parseFloat(newItem.price),
        providerId: user.uid,
        createdAt: new Date().toISOString(),
      });

      setMenuItemsState((prev) => [
        ...prev,
        {
          id: docRef.id,
          ...newItem,
          price: parseFloat(newItem.price),
        },
      ]);

      setNewItem({
        name: "",
        description: "",
        price: "",
        category: "",
        isAvailable: true,
      });

      alert("Menu item added successfully!");
    } catch (error) {
      console.error("Error adding menu item:", error);
      alert("Error adding menu item: " + error.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const renderProfile = () => (
    <motion.div className="provider-profile" variants={containerVariants}>
      <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">
        Provider Profile
      </motion.h2>
      {providerProfile && (
        <motion.div className="profile-card" variants={itemVariants}>
          <div className="mb-4">
            <h3 className="font-bold">Kitchen Details</h3>
            <p className="text-lg">{providerProfile.kitchenName}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Owner Name</h3>
            <p className="text-lg">{providerProfile.ownerName}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Contact</h3>
            <p className="text-lg">{providerProfile.contact}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Address</h3>
            <p className="text-lg">{providerProfile.address}</p>
          </div>
          <div>
            <h3 className="font-bold">Email</h3>
            <p className="text-lg">{providerProfile.email}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  const renderOrders = () => (
    <motion.div variants={containerVariants}>
      <motion.h2 variants={itemVariants}>Today's Orders</motion.h2>
      <motion.hr variants={itemVariants} />
      <motion.div className="orders" variants={containerVariants}>
        {orders.map((order, index) => (
          <motion.div
            key={index}
            className="order-card"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Mobile:</strong> {order.phone}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Ordered Item:</strong> {order.item}</p>
            <p><strong>Address:</strong> {order.address}</p>
          </motion.div>
        ))}
      </motion.div>
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
            {["profile", "orders", "addMenu"].map((item) => (
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
            {selectedSection === "addMenu" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="add-menu-container"
              >
                <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">
                  Manage Menu Items
                </motion.h2>
                <motion.form
                  onSubmit={handleSubmit}
                  variants={itemVariants}
                  className="add-menu-form"
                >
                  <div className="form-group">
                    <label htmlFor="name">Item Name*</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newItem.name}
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
                      value={newItem.description}
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
                      value={newItem.price}
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
                      value={newItem.category}
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
                        checked={newItem.isAvailable}
                        onChange={handleChange}
                      />
                      Available
                    </label>
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="submit-button"
                  >
                    Add Menu Item
                  </motion.button>
                </motion.form>

                <motion.div variants={containerVariants} className="menu-items-list">
                  <h3 className="text-xl font-bold mt-8 mb-4">Current Menu Items</h3>
                  {menuItemsState.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      className="menu-item-card"
                    >
                      <h4 className="font-bold">{item.name}</h4>
                      <p>{item.description}</p>
                      <p className="text-green-600">₹{item.price}</p>
                      <p>Category: {item.category || "Uncategorized"}</p>
                      <p>{item.isAvailable ? "Available" : "Not Available"}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
};

export default AdminPage;
