import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Header.css";


const AdminHeader = () => {
  return (
    <header className="header">
      <div className="header-title">
        <h1>स्वाद अनुसार - Your Taste, Our Service</h1>
        <p>Fresh homemade tiffin delivered to your doorstep</p>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/admin">Account</Link>
        <Link to="/admin">LogOut</Link>
      </nav>
    </header>
  );
};

export default AdminHeader;
