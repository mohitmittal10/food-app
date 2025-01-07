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
        <a href="/home">Home</a>
        <a href="/providers">Providers</a>
        <a href="/track">Track Order</a>
        <a href="/orders">My Orders</a>
        <a href="/login">Login</a>
      </nav>
    </header>
  );
};

export default Header;
