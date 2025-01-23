import React, { createContext, useState, useContext } from "react";

const MenuContext = createContext();

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([
    {
      name: "North Indian Thali",
      price: 80,
      description: "",
      providerName: "Maa's Kitchen",
    },
    {
      name: "Rajasthani Thali",
      price: 100,
      description: "",
      providerName: "Rajasthani Rasoi",
    },
    {
      name: "Gujarati Thali",
      price: 90,
      description: "",
      providerName: "Gujarati Rasoi",
    },
  ]);

  const addMenuItem = (newItem) => {
    setMenuItems((prevItems) => [...prevItems, newItem]);
  };

  const updateMenuItem = (providerName, updatedItem) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.providerName === providerName ? { ...item, ...updatedItem } : item
      )
    );
  };

  return (
    <MenuContext.Provider value={{ 
      menuItems, 
      addMenuItem, 
      updateMenuItem 
    }}>
      {children}
    </MenuContext.Provider>
  );
};