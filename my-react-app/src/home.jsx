// import React from "react";
// 


// const Home = () => {
//     return (
//         <div className="home">
//             <Header />
//             {/* <TrackingProgress /> */}
//             <ProvidersList />
//         </div >
//     );
// };

// export default Home;

import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./components/signup/firebaseConfig";
import Header from "./components/Header";
import ProvidersList from "./components/ProvidersList";
const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Tiffin Ordering Website!</h1>
      <button onClick={handleLogout} style={{ padding: "10px 20px" }}>
        Logout
      </button>
      <Header />
      <ProvidersList />
    </div>
  );
};

export default Home;
