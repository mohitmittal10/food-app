import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext"; // Import the new AuthContext
import Login from "./components/signup/Login";
import Register from "./components/signup/Register";
import Home2 from "./components/Home";
import ProvidersList from "./components/ProvidersList";
import MyOrders from "./components/MyOrders";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import ProviderProfile from "./components/Provider/ProviderProfile";
import ProviderLogin from "./components/Provider/ProviderLogin";
import ProviderRegister from "./components/Provider/ProviderRegister";
import Admin from "./components/Admin/admin";
import "./styles/App.css";

const AppContent = () => {
  const [orders, setOrders] = useState([]);
  const [tiffinCount, setTiffinCount] = useState(0);
  const { user, loading, handleLogout } = useAuth();
  const location = useLocation();

  // Handle orders
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

  if (loading) {
    return <div>Loading...</div>; // Add proper loading state UI
  }

  return (
    <div className="app">
      {location.pathname !== "/admin" && (
        <Header
          orderCount={tiffinCount}
          user={user}
          onLogout={handleLogout}
        />
      )}
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
              <ProtectedRoute user={user}>
                <MyOrders
                  orders={orders}
                  cancelOrder={cancelOrder}
                  confirmOrder={confirmOrder}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/provider/login" element={<ProviderLogin />} />
          <Route path="/provider/register" element={<ProviderRegister />} />
          <Route path="/home" element={<Home2 />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/provider/profile"
            element={
              <ProtectedRoute requiredRole="provider">
                <ProviderProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute requiredRole="user">
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {location.pathname !== "/admin" && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;