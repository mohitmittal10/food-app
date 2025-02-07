import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { motion } from "framer-motion";
import whyChooseUs from "./assets/whyChooseUs.webp";
import fresh from "./assets/fresh&hygiene.webp";
import Affordable from "./assets/Affordable.webp";
import customizable from "./assets/customizable.webp";
import variety from "./assets/variety.webp";

const Home = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [filteredProviders, setFilteredProviders] = useState(null);
  const scrollRef = useRef(null);

  // Static provider data
  const providers = [
    {
      id: 1,
      name: "Maa's Kitchen",
      cuisine: "North Indian | Pure Veg",
      location: "Sodala",
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
      location: "Pratap Nagar",
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
      location: "Malviya Nagar",
      rating: 4.3,
      reviews: 100,
      menu: "3 Rotis, Dal Bati, Churma, Rice, Salad",
      price: 85,
      minDays: 6,
    },
    {
      id: 4,
      name: "Mumbai Meals",
      cuisine: "Rajasthani | Pure Veg",
      location: "Sodala",
      rating: 4.3,
      reviews: 100,
      menu: "3 Rotis, Dal Bati, Churma, Rice, Salad",
      price: 85,
      minDays: 6,
    },
  ];

  const features = [
    {
      title: "Fresh and Hygienic",
      description: "Meals prepared with care and hygiene.",
      image: fresh,
    },
    {
      title: "Affordable Prices",
      description: "Delicious tiffins starting at just ₹80 per meal.",
      image: Affordable,
    },
    {
      title: "Customizable Orders",
      description: "Select the number of meals and duration as per your needs.",
      image: customizable,
    },
    {
      title: "Wide Variety",
      description: "North Indian, Gujarati, Rajasthani, and more cuisines available.",
      image: variety,
    },
  ];

  // Scroll Functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -480, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 480, behavior: "smooth" });
    }
  };

  // Search Functionality
  const handleSearch = () => {
    if (location.trim() === "") {
      setFilteredProviders(null); // Reset to original providers if input is empty
    } else {
      const results = providers.filter(provider =>
        provider.location.toLowerCase().includes(location.toLowerCase())
      );
      setFilteredProviders(results);
    }
  };

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
          <button onClick={handleSearch}>Search</button>
        </header>
      </div>

      {/* Providers List Section */}
      <main className="providers-list">
        <h2>Our Providers</h2>
        {filteredProviders ? (
          <div className="filtered-providers-container">
            {filteredProviders.length > 0 ? (
              filteredProviders.map((provider) => (
                <div key={provider.id} className="provider-card">
                  <h3>{provider.name}</h3>
                  <p>{provider.cuisine} | {provider.location}</p>
                  <p>⭐ {provider.rating} ({provider.reviews} reviews)</p>
                  <p><strong>Today's Menu:</strong> {provider.menu}</p>
                  <p>₹{provider.price}/meal | Min order: {provider.minDays} days</p>
                  <button className="order-btn">Order Now</button>
                </div>
              ))
            ) : (
              <p>No providers found for this location.</p>
            )}
          </div>
        ) : (
          <div className="scroll-container">
            <button className="scroll-btn left" onClick={scrollLeft}>&#9665;</button>
            <div className="providers-container" ref={scrollRef}>
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
              <div className="provider-card cta-card">
                <button className="explore-btn" onClick={() => navigate("/providers")}>
                  View More Providers
                </button>
              </div>
            </div>
            <button className="scroll-btn right" onClick={scrollRight}>&#9655;</button>
          </div>
        )}
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
    </motion.div>
  );
};

export default Home;
