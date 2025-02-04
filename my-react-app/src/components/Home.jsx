import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { motion } from "framer-motion";
import whyChooseUs from "./assets/whyChooseUs.webp";


const Home2 = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");

  // Static provider data (only 3 cards for Home Page)
  const providers = [
    {
      id: 1,
      name: "Maa's Kitchen",
      cuisine: "North Indian | Pure Veg",
      location: "Jaipur",
      rating: 4.5,
      reviews: 120,
      menu: "2 Rotis, Dal Fry, Mix Veg, Rice, Salad",
      price: 80,
      minDays: 7,
    },
    {
      id: 2,
      name: "Gujarati Rasoi",
      cuisine: "Gujarati | Pure Veg",
      location: "Ahmedabad",
      rating: 4.0,
      reviews: 85,
      menu: "3 Rotis, Kathol, Bhindi, Rice, Buttermilk, Sweet",
      price: 90,
      minDays: 5,
    },
    {
      id: 3,
      name: "Rajasthani Rasoi",
      cuisine: "Rajasthani | Pure Veg",
      location: "Kota",
      rating: 4.3,
      reviews: 100,
      menu: "3 Rotis, Dal Bati, Churma, Rice, Salad",
      price: 85,
      minDays: 6,
    }
  ];

  const features = [
    {
      title: "Fresh and Hygienic",
      description: "Meals prepared with care and hygiene.",
      image: whyChooseUs,
    },
    {
      title: "Affordable Prices",
      description: "Delicious tiffins starting at just ₹80 per meal.",
      image: whyChooseUs,
    },
    {
      title: "Customizable Orders",
      description: "Select the number of meals and duration as per your needs.",
      image: whyChooseUs,
    },
    {
      title: "Wide Variety",
      description: "North Indian, Gujarati, Rajasthani, and more cuisines available.",
      image: whyChooseUs,
    }
  ];

  return (
    <motion.div className="home-page">
      {/* Background Section (Search Section) */}
      <div className="search-section">
        <header className="search-bar">
          <input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button>Search</button>
        </header>
      </div>

      {/* Providers List Section (Only 3 Cards) */}
      <main className="providers-list">
        <h2>Our Providers</h2>
        <div className="providers-container">
          {providers.map((provider) => (
            <div key={provider.id} className="provider-card">
              <h3>{provider.name}</h3>
              <p>{provider.cuisine} | {provider.location}</p>
              <p>⭐ {provider.rating} ({provider.reviews} reviews)</p>
              <p><strong>Today's Menu:</strong> {provider.menu}</p>
              <p>₹{provider.price}/meal | Min order: {provider.minDays} days</p>
              <button className="order-btn">Order Now</button>
            </div>
          ))}
        </div>
      </main>

      {/* Why Choose Us Section */}
      <motion.main className="home-features">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="features-container">
        {features.map((feature, index) => (
    <motion.div key={index} className="feature-card" style={{ backgroundImage: `url(${feature.image})` }}>
        <div className="feature-text">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
        </div>
    </motion.div>
))}

        </div>
      </motion.main>

      {/* Footer Section with CTA Button */}
      <motion.footer className="home-footer">
      <motion.button
          onClick={() => navigate("/providers")}
          className="explore-btn"
        >
          View More Providers
        </motion.button>
        <p>Join thousands of satisfied customers today!</p>       
      </motion.footer>
    </motion.div>
  );
};

export default Home2;
