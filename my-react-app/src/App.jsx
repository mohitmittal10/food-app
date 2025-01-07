import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/signup/Login";
import Register from "./components/signup/Register";
import Home2 from "./components/Home";
import ProvidersList from "./components/ProvidersList";
import MyOrders from "./components/MyOrders";
import Header from "./components/Header";
import Footer from "./components/Footer";
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

  return (
    <Router>
      <div className="app">
        <Header orderCount={tiffinCount} />
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
            <Route path="/home" element={<Home2/>}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
