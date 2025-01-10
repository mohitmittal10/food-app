import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/signup/Login";
import Register from "./components/signup/Register";
import Home2 from "./components/Home";
import ProvidersList from "./components/ProvidersList";
import MyOrders from "./components/MyOrders";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Admin from "./components/Admin/admin"; // Ensure this matches the exact casing
import "./styles/App.css";

const App = () => {
  const [orders, setOrders] = useState([]);
  const [tiffinCount, setTiffinCount] = useState(0);

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

  const location = useLocation();

  return (
    <div className="app">
      {/* Render Header only if not on /admin route */}
      {location.pathname !== "/admin" && <Header orderCount={tiffinCount} />}
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
          <Route path="/admin" element={<Admin />} /> {/* Added Admin route */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default () => (
  <Router>
    <App />
  </Router>
);
