import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/signup/Login";
import Register from "./components/signup/Register";
import Home from "./home";
import Home2 from "./components/Home";
import "./styles/App.css";
import ProvidersList from "./components/ProvidersList";

// Components
// import Header from "./components/Header";
// import Footer from "./components/Footer";

// Pages
//import Home from "./components/Home";
// import ProvidersList from "./components/ProvidersList";
import MyOrders from "./components/MyOrders"; // New MyOrders component

const App = () => {
  const [orders, setOrders] = useState([]); // State to store orders
  const [tiffinCount, setTiffinCount] = useState(0); // Track tiffin count

  // Cancel an order
  const cancelOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    setTiffinCount(updatedOrders.length); // Update tiffin count after canceling an order
  };

  // Confirm an order (prevents cancellation)
  const confirmOrder = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, isConfirmed: true } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <Router>
      <div className="app">
        <Header orderCount={tiffinCount} /> {/* Pass tiffin count to Header */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
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
          </Routes>
        </main>
        <Footer />
      </div>
      <Routes>
        <Route path="/" element={<Home2 />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home2 />} />
        <Route path="/providers" element={<ProvidersList/>} />
      </Routes>
    </Router>


    // <Router>
    //   <div className="app">
    //     {/* Header (Navigation Bar) */}
    //     <Header />

    //     {/* Main Application Routes */}
    //     <main>
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/providers" element={<ProvidersList />} />
    //       </Routes>
    //     </main>

    //     {/* Footer Section */}
    //     <Footer />
    //   </div>
    // </Router>
  );
}

export default App;
