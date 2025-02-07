import React from "react";
import { Link } from "react-router-dom";
import "../styles/AddRestaurant.css";

// Import Images
import tiffinImage from "../components/assets/AddRestaurant.webp";
import customerIcon from "../components/assets/AttractCustomers.webp";
import deliveryIcon from "../components/assets/Doorstep.webp";
import supportIcon from "../components/assets/CallSupport.webp";

const AddRestaurant = () => {
  return (
    <div className="add-restaurant-container">
      {/* Background Image Section */}
      <div className="image-container">
        <img src={tiffinImage} alt="Indian Tiffin" className="background-image" />
        <div className="overlay">
          <h1>Partner with स्वाद अनुसार</h1>
          <h1>and grow your business</h1>
          <p>0% commission for 1st month!<br />Valid for new restaurant partners.</p>
          <Link to="/provider/register" className="register-button">Register Your Restaurant</Link>
        </div>
      </div>

      {/* Get Started Section */}
      <div className="get-started-section">
        <h2>Get Started - It only takes 10 minutes</h2>
        <p>Please keep these documents and details ready for a smooth sign-up</p>
        <div className="document-list">
          <div className="document-item">
            <span className="bullet">&#10003;</span>
            <span>PAN Card</span>
          </div>
          <div className="document-item">
            <span className="bullet">&#10003;</span>
            <span>GST number, if applicable</span>
          </div>
          <div className="document-item">
            <span className="bullet">&#10003;</span>
            <span>Bank account details</span>
          </div>
          <div className="document-item">
            <span className="bullet">&#10003;</span>
            <span>FSSAI license</span>
          </div>
          <div className="document-item">
            <span className="bullet">&#10003;</span>
            <span>Menu & profile food image</span>
          </div>
        </div>
      </div>

      {/* Why Partner Section */}
      <div className="why-partner-section">
        <h2>Why should you partner with स्वाद अनुसार?</h2>
        <div className="cards-container">
          <div className="info-card">
            <img src={customerIcon} alt="Attract Customers" />
            <h3>Attract new customers</h3>
            <p>Reach the millions of people ordering on स्वाद अनुसार</p>
          </div>
          <div className="info-card">
            <img src={deliveryIcon} alt="Doorstep Delivery" />
            <h3>Doorstep delivery convenience</h3>
            <p>Easily get your orders delivered through our trained delivery partners</p>
          </div>
          <div className="info-card">
            <img src={supportIcon} alt="Hotline Support" />
            <h3>Hotline support <br />+91 9999999999</h3>
            <p>On-call support for any issues or growth consultations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRestaurant;
