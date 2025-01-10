import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = ({ orderCount }) => {
  return (
    <header className="header">
      <div className="header-title">
        <h1>स्वाद अनुसार - Your Taste, Our Service</h1>
        <p>Fresh homemade tiffin delivered to your doorstep</p>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/providers">Providers</Link>
        <Link to="/track">Track Order</Link>
        <Link to="/orders">My Orders ({orderCount || 0})</Link>
        <Link to="/admin">Admin</Link> {/* Added Admin Link */}
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
