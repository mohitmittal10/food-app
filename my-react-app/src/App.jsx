import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./components/signup/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./components/signup/Login";
import Register from "./components/signup/Register";
import Home2 from "./components/Home";
import ProvidersList from "./components/ProvidersList";
import MyOrders from "./components/MyOrders";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import Profile from "./components/Profile"; // Import the Profile component
import "./styles/App.css";

const App = () => {
  const [orders, setOrders] = useState([]);
  const [tiffinCount, setTiffinCount] = useState(0);
  const [user, setUser] = useState(null); // State to store user details

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName || "Guest", // Default to "Guest" if displayName is not available
          email: user.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
    } catch (error) {
      alert("Error logging out: " + error.message);
    }
  };

  const cancelOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    setTiffinCount(updatedOrders.length);
  };

  const confirmOrder = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, isConfirmed: true } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <Router>
      <div className="app">
        <Header orderCount={tiffinCount} user={user} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Home2 />} />
            <Route
              path="/providers"
              element={
                <ProvidersList
                  orders={orders}
                  setOrders={setOrders}
                  setTiffinCount={setTiffinCount}
                />
              }
            />
            <Route
              path="/orders"
              element={
                <MyOrders
                  orders={orders}
                  cancelOrder={cancelOrder}
                  confirmOrder={confirmOrder}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home2 />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute user={user}>
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />
           

          </Routes>
        </main>

      </div>
    </Router>
  );
};

export default App;
