import React from "react";
import "./styles/App.css";
import Header from "./components/Header";

// import TrackingProgress from "./components/TrackingProgress";
import ProvidersList from "./components/ProvidersList";

const App = () => {
  return (
    <div className="app">
      <Header />
      {/* <TrackingProgress /> */}
      <ProvidersList />
    </div>
  );
};

export default App;
