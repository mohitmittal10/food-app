import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { auth } from "./components/signup/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./components/signup/Login";
import Register from "./components/signup/Register";
import Home2 from "./components/Home";
import ProvidersList from "./components/ProvidersList";
import MyOrders from "./components/MyOrders";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import Admin from "./components/Admin/admin";
import { OrderProvider } from "./components/OrderContext";
import { MenuProvider } from "./components/MenuContext";
import "./styles/App.css";

const AppContent = () => {
  const [user, setUser] = useState(null);
  const [tiffinCount, setTiffinCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName || "Guest",
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

  return (
    <div className="app">
      {location.pathname !== "/admin" && (
        <Header orderCount={tiffinCount} user={user} onLogout={handleLogout} />
      )}
      <main>
        <Routes>
          <Route path="/" element={<Home2 />} />
          <Route
            path="/providers"
            element={<ProvidersList setTiffinCount={setTiffinCount} />}
          />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home2 />} />
          <Route path="/admin" element={<Admin />} />
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
      {location.pathname !== "/admin" && <Footer />}
    </div>
  );
};

const App = () => (
  <MenuProvider>
    <OrderProvider>
      <Router>
        <AppContent />
      </Router>
    </OrderProvider>
  </MenuProvider>
);

export default App;