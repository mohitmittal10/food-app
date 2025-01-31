import React, { createContext, useState, useContext, useEffect } from 'react';
import { db, auth } from './signup/firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);

  const fetchMenuItems = async () => {
    try {
      const providersRef = collection(db, 'providers');
      const providersSnapshot = await getDocs(providersRef);
      
      const allMenuItems = [];
      
      for (const providerDoc of providersSnapshot.docs) {
        const provider = providerDoc.data();
        const menuRef = collection(db, 'providers', providerDoc.id, 'menu');
        const menuSnapshot = await getDocs(menuRef);
        
        const providerMenuItems = menuSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          kitchenName: provider.kitchenName, // Add kitchen name to each menu item
          providerId: providerDoc.id
        }));
        
        allMenuItems.push(...providerMenuItems);
      }
      
      setMenuItems(allMenuItems);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const addMenuItem = async (newItem) => {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("You must be logged in to add menu items");
    }

    try {
      const menuRef = collection(db, 'providers', user.uid, 'menu');
      const docRef = await addDoc(menuRef, {
        ...newItem,
        price: parseFloat(newItem.price),
        providerId: user.uid,
        createdAt: new Date().toISOString(),
      });

      // Refetch all menu items to update the context
      await fetchMenuItems();

      return docRef;
    } catch (error) {
      console.error("Error adding menu item:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <MenuContext.Provider value={{ 
      menuItems, 
      addMenuItem, 
      fetchMenuItems 
    }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  return useContext(MenuContext);
};