import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Footer from "./Footer";
import Header from "./Header";
const Home2 = () => {
  const navigate = useNavigate(); // Use React Router's navigation

  return (
    <div className="home-page">
      <Header/>
      {/* Header Section */}
      <header className="home-header">
        {/* <h1>स्वाद अनुसार - Your Taste, Our Service</h1>
        <p>Fresh homemade tiffin delivered to your doorstep.</p> */}
        <button
          onClick={() => navigate("/providers")}
          className="explore-btn"
        >
          Explore Providers
        </button>
      </header>

      {/* Features Section */}
      <main className="home-features">
        <h2>Why Choose Us?</h2>
        <div className="features-container">
          <div className="feature-card">
            <h3>Fresh and Hygienic</h3>
            <p>We ensure every meal is prepared with care and hygiene.</p>
          </div>
          <div className="feature-card">
            <h3>Affordable Prices</h3>
            <p>Delicious tiffins starting at just ₹80 per meal.</p>
          </div>
          <div className="feature-card">
            <h3>Customizable Orders</h3>
            <p>Select the number of meals and duration as per your needs.</p>
          </div>
          <div className="feature-card">
            <h3>Wide Variety</h3>
            <p>North Indian, Gujarati, Rajasthani, and more cuisines available.</p>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="home-footer">
        <p>Join thousands of satisfied customers today!</p>
        <button
          onClick={() => navigate("/login")}
          className="signup-btn"
        >
          Get Started
        </button>
      </footer>
      <Footer/>
    </div>
  );
};

export default Home2;
