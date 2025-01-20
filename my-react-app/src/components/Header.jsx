import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import "../styles/Styles.css"


import { motion } from "framer-motion";


const Header = ({ orderCount, user, onLogout }) => {
  const isProvider = user?.role === "provider";
  const isAuthenticated = user?.isAuthenticated;

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="header bg-white shadow-lg"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="header-title"
      >
        <motion.h1 
          whileHover={{ scale: 1.05 }}
          className="text-3xl font-bold text-gray-800"
        >
          स्वाद अनुसार - Your Taste, Our Service
        </motion.h1>
        <motion.p className="text-gray-600 mt-2">
          Fresh homemade tiffin delivered to your doorstep
        </motion.p>
      </motion.div>

      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="nav-links flex gap-6"
      >
        <motion.div variants={linkVariants} whileHover="hover">
          <Link to="/" className="nav-link">Home</Link>
        </motion.div>
        <motion.div variants={linkVariants} whileHover="hover">
          <Link to="/providers" className="nav-link">Providers</Link>
        </motion.div>
        
        {isAuthenticated && (
          <>
            <motion.div variants={linkVariants} whileHover="hover">
              <Link to="/track" className="nav-link">Track Order</Link>
            </motion.div>
            <motion.div variants={linkVariants} whileHover="hover">
              <Link to="/orders" className="nav-link">My Orders ({orderCount || 0})</Link>
            </motion.div>
          </>
        )}

        {!isAuthenticated && (
          <>
            <motion.div variants={linkVariants} whileHover="hover">
              <Link to="/provider/register" className="nav-link">Provider Register</Link>
            </motion.div>
            <motion.div variants={linkVariants} whileHover="hover">
              <Link to="/provider/login" className="nav-link">Provider Login</Link>
            </motion.div>
            <motion.div variants={linkVariants} whileHover="hover">
              <Link to="/login" className="nav-link">Login</Link>
            </motion.div>
            <motion.div variants={linkVariants} whileHover="hover">
              <Link to="/register" className="nav-link">Register</Link>
            </motion.div>
          </>
        )}

        {isAuthenticated && (
          <>
            <motion.div variants={linkVariants} whileHover="hover">
              <Link to={isProvider ? "/admin" : "/profile"} className="nav-link">
                Profile
              </Link>
            </motion.div>
            <motion.button
              variants={linkVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="logout-button bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </motion.button>
          </>
        )}
      </motion.nav>
    </motion.header>
  );
};

export default Header;