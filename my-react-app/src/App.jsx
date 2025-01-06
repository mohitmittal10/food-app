import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./components/Home";
import ProvidersList from "./components/ProvidersList";

const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Header (Navigation Bar) */}
        <Header />

        {/* Main Application Routes */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/providers" element={<ProvidersList />} />
          </Routes>
        </main>

        {/* Footer Section */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
