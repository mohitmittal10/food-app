import React from "react";
import "../styles/Footer.css"; // Create this CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img
            src="./components/assets/images.png" // Replace this with the Swad Anusar logo URL
            alt="Swad Anusar Logo"
          />
         
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Swad Anussar Corporate</li>
            <li>Careers</li>
            <li>Team</li>
            <li>Swad Anusar One</li>
            <li>Swad Anusar Instamart</li>
            <li>Swad Anusar Dineout</li>
            <li>Swad Anusar Genie</li>
            <li>Minis</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Contact Us</h4>
          <ul>
            <li>Help & Support</li>
            <li>Partner With Us</li>
            <li>Ride With Us</li>
          </ul>
          <h4>Legal</h4>
          <ul>
            <li>Terms & Conditions</li>
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Available in:</h4>
          <ul>
            <li>Jaipur</li>
          </ul>
          <select className="footer-dropdown">
            <option>1 city</option>
          </select>
        </div>
        <div className="footer-column">
          <h4>Life at Swad Anusar</h4>
          <ul>
            <li>Explore With Swad Anusar</li>
            <li>Swad Anusar News</li>
            <li>Snackables</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
