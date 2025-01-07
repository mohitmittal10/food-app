// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import "../styles/ProvidersList.css";

// // Custom marker icons for Leaflet
// const userIcon = new L.Icon({
//   iconUrl: "https://example.com/user-icon.png", // Replace with your custom user icon URL
//   iconSize: [30, 30],
// });

// const providerIcon = new L.Icon({
//   iconUrl: "https://example.com/provider-icon.png", // Replace with your custom provider icon URL
//   iconSize: [30, 30],
// });

// const App = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [filteredProviders, setFilteredProviders] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   const providers = [
//     {
//       id: 1,
//       name: "Maa's Kitchen",
//       cuisine: "North Indian | Pure Veg",
//       location: "Bhusawar",
//       coordinates: { lat: 27.036, lng: 77.0522 },
//       rating: 4.5,
//       reviews: 120,
//       menu: "2 Rotis, Dal Fry, Mix Veg, Rice, Salad",
//       price: 80,
//       minDays: 7,
//     },
//     {
//       id: 2,
//       name: "Gujarati Rasoi",
//       cuisine: "Gujarati | Pure Veg",
//       location: "Ahmedabad",
//       coordinates: { lat: 23.0225, lng: 72.5714 },
//       rating: 4.0,
//       reviews: 85,
//       menu: "3 Rotis, Kathol, Bhindi, Rice, Buttermilk, Sweet",
//       price: 90,
//       minDays: 5,
//     },
//   ];

//   // Fetch user's live location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation({ lat: latitude, lng: longitude });
//           setLoading(false);
//         },
//         () => {
//           setError("Unable to fetch location. Please allow location access.");
//           setLoading(false);
//         }
//       );
//     } else {
//       setError("Geolocation is not supported by this browser.");
//       setLoading(false);
//     }
//   }, []);

//   // Filter providers based on proximity
//   useEffect(() => {
//     if (userLocation) {
//       const filtered = providers.filter((provider) => {
//         const distance = calculateDistance(
//           userLocation.lat,
//           userLocation.lng,
//           provider.coordinates.lat,
//           provider.coordinates.lng
//         );
//         return distance <= 10; // Show providers within 10 km
//       });
//       setFilteredProviders(filtered);
//     }
//   }, [userLocation]);

//   const calculateDistance = (lat1, lng1, lat2, lng2) => {
//     const toRad = (value) => (value * Math.PI) / 180;
//     const R = 6371; // Radius of Earth in km
//     const dLat = toRad(lat2 - lat1);
//     const dLng = toRad(lng2 - lng1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(toRad(lat1)) *
//         Math.cos(toRad(lat2)) *
//         Math.sin(dLng / 2) *
//         Math.sin(dLng / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   if (loading) {
//     return <p>Loading your location...</p>;
//   }

//   return (
//     <main className="providers-list">
//       <h2>Today's Available Providers</h2>

//       {error && <p className="error">{error}</p>}

//       {userLocation && (
//         <div className="map-container">
//           <MapContainer
//             center={[userLocation.lat, userLocation.lng]}
//             zoom={12}
//             style={{ height: "400px", width: "100%" }}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
//             />

//             {/* User location marker */}
//             <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
//               <Popup>Your Location</Popup>
//             </Marker>

//             {/* Provider markers */}
//             {filteredProviders.map((provider) => (
//               <Marker
//                 key={provider.id}
//                 position={[provider.coordinates.lat, provider.coordinates.lng]}
//                 icon={providerIcon}
//               >
//                 <Popup>
//                   <strong>{provider.name}</strong>
//                   <br />
//                   {provider.cuisine}
//                   <br />
//                   {provider.location}
//                   <br />
//                   ⭐ {provider.rating} ({provider.reviews} reviews)
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>
//       )}

//       {filteredProviders.length > 0 ? (
//         filteredProviders.map((provider) => (
//           <div key={provider.id} className="provider-card">
//             <div className="provider-header">
//               <h3>{provider.name}</h3>
//               <p>{provider.cuisine}</p>
//               <p>{provider.location}</p>
//               <p>
//                 <span className="rating">⭐ {provider.rating}</span> (
//                 {provider.reviews} reviews)
//               </p>
//             </div>
//             <div className="provider-body">
//               <p>
//                 <strong>Today's Menu:</strong> {provider.menu}
//               </p>
//               <div className="order-section">
//                 <label htmlFor={`tiffin-quantity-${provider.id}`}>
//                   Number of Tiffins:
//                 </label>
//                 <select id={`tiffin-quantity-${provider.id}`}>
//                   {[1, 2, 3, 4, 5].map((num) => (
//                     <option key={num} value={num}>
//                       {num}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div className="provider-footer">
//               <p>₹{provider.price}/meal</p>
//               <p>Min order: {provider.minDays} days</p>
//               <button className="order-btn">Order Now</button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No tiffin providers available within 10 km of your location.</p>
//       )}
//     </main>
//   );
// };

// export default App;






// import React, { useState } from "react";
// import "../styles/ProvidersList.css";

// const App = () => {
//   const [location, setLocation] = useState("");
//   const [filteredProviders, setFilteredProviders] = useState([]);

//   const providers = [
//     {
//       id: 1,
//       name: "Maa's Kitchen",
//       cuisine: "North Indian | Pure Veg",
//       location: "Jaipur",
//       rating: 4.5,
//       reviews: 120,
//       menu: "2 Rotis, Dal Fry, Mix Veg, Rice, Salad",
//       price: 80,
//       minDays: 7,
//     },
//     {
//       id: 2,
//       name: "Gujarati Rasoi",
//       cuisine: "Gujarati | Pure Veg",
//       location: "Ahmedabad",
//       rating: 4.0,
//       reviews: 85,
//       menu: "3 Rotis, Kathol, Bhindi, Rice, Buttermilk, Sweet",
//       price: 90,
//       minDays: 5,
//     },
//     {
//       id: 3,
//       name: "Rajasthani Rasoi",
//       cuisine: "Rajasthani | Pure Veg",
//       location: "Jaipur",
//       rating: 4.3,
//       reviews: 100,
//       menu: "3 Rotis, Dal Bati, Churma, Rice, Salad",
//       price: 85,
//       minDays: 6,
//     },
//   ];

//   // Filter providers based on location input
//   const handleSearch = () => {
//     if (location.trim() === "") {
//       setFilteredProviders(providers);
//     } else {
//       const filtered = providers.filter((provider) =>
//         provider.location.toLowerCase().includes(location.toLowerCase())
//       );
//       setFilteredProviders(filtered);
//     }
//   };

//   React.useEffect(() => {
//     // Initially display all providers
//     setFilteredProviders(providers);
//   }, []);

//   return (
//     <div className="app">
//       <header className="search-bar">
//         <input
//           type="text"
//           placeholder="Enter your location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </header>

//       <main className="providers-list">
//         <h2>Today's Available Providers</h2>

//         {filteredProviders.length > 0 ? (
//           filteredProviders.map((provider) => (
//             <div key={provider.id} className="provider-card">
//               <div className="provider-header">
//                 <h3>{provider.name}</h3>
//                 <p>{provider.cuisine}</p>
//                 <p>{provider.location}</p>
//                 <p>
//                   <span className="rating">⭐ {provider.rating}</span> (
//                   {provider.reviews} reviews)
//                 </p>
//               </div>
//               <div className="provider-body">
//                 <p>
//                   <strong>Today's Menu:</strong> {provider.menu}
//                 </p>
//                 <div className="order-section">
//                   <label htmlFor={`tiffin-quantity-${provider.id}`}>
//                     Number of Tiffins:
//                   </label>
//                   <select id={`tiffin-quantity-${provider.id}`}>
//                     {[1, 2, 3, 4, 5].map((num) => (
//                       <option key={num} value={num}>
//                         {num}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="provider-footer">
//                 <p>₹{provider.price}/meal</p>
//                 <p>Min order: {provider.minDays} days</p>
//                 <button className="order-btn">Order Now</button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No tiffin providers available for the entered location.</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import Header from "./Header";

import { useNavigate } from "react-router-dom";
import "../styles/ProvidersList.css";

const ProvidersList = ({ orders, setOrders, setTiffinCount }) => {
  const [location, setLocation] = useState("");
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [notification, setNotification] = useState(""); // Notification state
  const navigate = useNavigate();

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
      rating: 4.0,
      reviews: 85,
      menu: "3 Rotis, Kathol, Bhindi, Rice, Buttermilk, Sweet",
      price: 90,
      minDays: 5,
    },
  ];

  // Search and filter providers based on location
  const handleSearch = () => {
    const filtered = location.trim()
      ? providers.filter((provider) =>
          provider.location.toLowerCase().includes(location.toLowerCase())
        )
      : providers;
    setFilteredProviders(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [location]);

  // Handle quantity change for a provider
  const handleQuantityChange = (providerId, value) => {
    setSelectedQuantities((prevState) => ({
      ...prevState,
      [providerId]: value,
    }));
  };

  // Add provider to orders
  const handleOrderNow = (provider) => {
    const quantity = selectedQuantities[provider.id];

    if (!quantity || quantity < 1) {
      alert("Please select a valid quantity.");
      return;
    }

    // Check if the provider is already in the orders
    const isAlreadyOrdered = orders.some((order) => order.id === provider.id);
    if (isAlreadyOrdered) {
      alert("You have already ordered from this provider.");
      return;
    }

    // Add the provider to orders with selected quantity
    const newOrder = { ...provider, quantity, isConfirmed: false };

    // Update orders state and tiffin count
    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders, newOrder];
      setTiffinCount(updatedOrders.length); // Update tiffin count after adding an order
      return updatedOrders;
    });

    // Show confirmation notification
    setNotification(`Order confirmed for ${provider.name} with ${quantity} tiffins!`);

    // Automatically hide notification after 3 seconds
    setTimeout(() => {
      console.log("Clearing notification");
      setNotification(""); // Clear the notification
    }, 3000);

    navigate("/orders"); // Navigate to My Orders page
  };

  return (
    <div className="providers-page">
      
      {/* Search Bar */}
      <header className="search-bar">
        <input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </header>

      {/* Notification */}
      {notification && (
        <div className="notification">
          <p>{notification}</p>
        </div>
      )}

      {/* Providers List */}
      <main className="providers-list">
        <h2>Today's Available Providers</h2>

        {filteredProviders.length > 0 ? (
          <div className="providers-container">
            {filteredProviders.map((provider) => (
              <div key={provider.id} className="provider-card">
                <h3>{provider.name}</h3>
                <p>{provider.cuisine}</p>
                <p>{provider.location}</p>
                <p>
                  ⭐ {provider.rating} ({provider.reviews} reviews)
                </p>
                <p>
                  <strong>Today's Menu:</strong> {provider.menu}
                </p>
                <p>₹{provider.price}/meal</p>
                <p>Min order: {provider.minDays} days</p>

                {/* Quantity Selector */}
                <div className="quantity-selector">
                  <button
                    onClick={() => {
                      if (selectedQuantities[provider.id] > 1) {
                        handleQuantityChange(provider.id, selectedQuantities[provider.id] - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={selectedQuantities[provider.id] || 0}
                    onChange={(e) =>
                      handleQuantityChange(provider.id, parseInt(e.target.value, 10))
                    }
                    min="1"
                    max="5"
                  />
                  <button
                    onClick={() => {
                      if (selectedQuantities[provider.id] < 10) {
                        handleQuantityChange(provider.id, selectedQuantities[provider.id] + 1);
                      }
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  className="order-btn"
                  onClick={() => handleOrderNow(provider)}
                >
                  Order Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No tiffin providers available for the entered location.</p>
        )}
      </main>
    </div>
  );
};

export default ProvidersList;
