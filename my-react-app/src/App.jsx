import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import { OrderProvider, useOrders } from "./components/OrderContext";
import { MenuProvider } from "./components/MenuContext";

// Components
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

// Styles
import "./styles/App.css";

const AppContent = () => {
  const { user, loading, handleLogout } = useAuth();
  const { orders, cancelOrder, confirmOrder, getTotalOrders } = useOrders();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="app min-h-screen flex flex-col">
      {location.pathname !== "/admin" && (
        <Header 
          orderCount={getTotalOrders()} 
          user={user} 
          onLogout={handleLogout} 
        />
      )}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home2 />} />
          <Route path="/home" element={<Home2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/provider/login" element={<ProviderLogin />} />
          <Route path="/provider/register" element={<ProviderRegister />} />

          {/* Protected Routes */}
          <Route
            path="/providers"
            element={
              <ProtectedRoute>
                <ProvidersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
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
          <Route
            path="/provider/profile"
            element={
              <ProtectedRoute requiredRole="provider">
                <ProviderProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {location.pathname !== "/admin" && <Footer />}
    </div>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
      <MenuProvider>
        <OrderProvider>
          <AppContent />
        </OrderProvider>
      </MenuProvider>
    </AuthProvider>
  </Router>
);

export default App;