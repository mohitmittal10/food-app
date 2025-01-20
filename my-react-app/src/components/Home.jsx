import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { motion } from "framer-motion";

const Home2 = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="home-page"
    >
      <motion.header variants={itemVariants} className="home-header">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/providers")}
          className="explore-btn bg-blue-500 text-white px-6 py-3 rounded-lg"
        >
          Explore Providers
        </motion.button>
      </motion.header>

      <motion.main variants={itemVariants} className="home-features">
        <motion.h2 
          variants={itemVariants}
          className="text-3xl font-bold text-center mb-12"
        >
          Why Choose Us?
        </motion.h2>
        <div className="features-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Fresh and Hygienic",
              description: "We ensure every meal is prepared with care and hygiene."
            },
            {
              title: "Affordable Prices",
              description: "Delicious tiffins starting at just ₹80 per meal."
            },
            {
              title: "Customizable Orders",
              description: "Select the number of meals and duration as per your needs."
            },
            {
              title: "Wide Variety",
              description: "North Indian, Gujarati, Rajasthani, and more cuisines available."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="feature-card bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.main>

      <motion.footer 
        variants={itemVariants} 
        className="home-footer mt-16 text-center"
      >
        <p className="text-xl mb-6">Join thousands of satisfied customers today!</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          className="signup-btn bg-green-500 text-white px-8 py-3 rounded-lg"
        >
          Get Started
        </motion.button>
      </motion.footer>
    </motion.div>
  );
};

export default Home2;
