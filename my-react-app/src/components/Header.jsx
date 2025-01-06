import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      {/* Title Section */}
      <div className="header-title">
        <h1>स्वाद अनुसार - Your Taste, Our Service</h1>
        <p>Fresh homemade tiffin delivered to your doorstep</p>
      </div>

      {/* Navigation Links */}
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/providers">Providers</Link>
        <Link to="/track">Track Order</Link>
        <Link to="/orders">My Orders</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
