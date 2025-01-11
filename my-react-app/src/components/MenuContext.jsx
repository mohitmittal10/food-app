import React, { createContext, useState, useContext } from "react";

// Create Context
const MenuContext = createContext();

// Custom Hook to use Context
export const useMenu = () => useContext(MenuContext);

// Provider Component
export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([
    {
      name: "",
      price: 80,
      description: "",
      providerName: "Maa's Kitchen", // Added providerName to associate with a provider
    },
    {
      name: "",
      price: 100,
      description: "",
      providerName: "Rajasthani Rasoi", // Added providerName
    },
    {
      name: "", // The unwanted item
      price: 90,
      description: "",
      providerName: "Gujarati Rasoi", // Added providerName
    },
  ]);

  // Function to add menu item
  const addMenuItem = (newItem) => {
    if (newItem.name !== "3 Rotis, Kathol, Bhindi, Rice, Buttermilk, Sweet") {
      setMenuItems((prevItems) => [...prevItems, newItem]);
    } else {
      alert("This menu item is restricted and cannot be added.");
    }
  };

  // Filter the unwanted menu item from the displayed menu items (across all providers)
  const filteredMenuItems = menuItems.filter(
    (item) => item.name !== "3 Rotis, Kathol, Bhindi, Rice, Buttermilk, Sweet"
  );

  return (
    <MenuContext.Provider value={{ menuItems: filteredMenuItems, addMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};
