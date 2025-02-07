import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Adjust path if needed
import "../styles/Header.css";
import "../styles/Styles.css";
import { motion } from "framer-motion";

const Header = () => {
  const { user, handleLogout } = useAuth();
  const location = useLocation();

  const isOnAddRestaurantPage = location.pathname === "/add-restaurant";
  const isAuthenticated = Boolean(user);

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="header bg-white shadow-lg"
    >
      <motion.div className="header-title">
        <motion.h1 className="text-3xl font-bold text-gray-800">
          स्वाद अनुसार - Your Taste, Our Service
        </motion.h1>
        <motion.p className="text-gray-600 mt-2">
          Fresh homemade tiffin delivered to your doorstep
        </motion.p>
      </motion.div>

      <motion.nav className="nav-links flex gap-6">
        {/* Always show Home */}
        <motion.div>
          <Link to="/" className="nav-link">Home</Link>
        </motion.div>

        {/* If on Add Restaurant page, show only Home & Login */}
        {isOnAddRestaurantPage ? (
          <motion.div>
            <Link to="/provider/login" className="nav-link">Login</Link>
          </motion.div>
        ) : (
          <>
            <motion.div>
              <Link to="/add-restaurant" className="nav-link">Add Restaurant</Link>
            </motion.div>

            {isAuthenticated ? (
              <>
                <motion.div>
                  <Link to={user.role === "provider" ? "/admin" : "/profile"} className="nav-link">
                    Profile
                  </Link>
                </motion.div>
                <motion.button onClick={handleLogout} className="logout-button">
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <motion.div>
                  <Link to="/login" className="nav-link">Login</Link>
                </motion.div>
                <motion.div>
                  <Link to="/register" className="nav-link">Sign up</Link>
                </motion.div>
              </>
            )}
          </>
        )}
      </motion.nav>
    </motion.header>
  );
};

export default Header;
