import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/signup/Login";
import Register from "./components/signup/Register";
import Home from "./home";
import Home2 from "./components/Home";
import "./styles/App.css";
import ProvidersList from "./components/ProvidersList";

// Components
// import Header from "./components/Header";
// import Footer from "./components/Footer";

// Pages
//import Home from "./components/Home";
// import ProvidersList from "./components/ProvidersList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home2 />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home2 />} />
        <Route path="/providers" element={<ProvidersList/>} />
      </Routes>
    </Router>


    // <Router>
    //   <div className="app">
    //     {/* Header (Navigation Bar) */}
    //     <Header />

    //     {/* Main Application Routes */}
    //     <main>
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/providers" element={<ProvidersList />} />
    //       </Routes>
    //     </main>

    //     {/* Footer Section */}
    //     <Footer />
    //   </div>
    // </Router>
  );
}

export default App;
