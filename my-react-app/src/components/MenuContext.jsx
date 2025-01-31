import React, { createContext, useState, useContext, useEffect } from 'react';
import { db, auth } from './signup/firebaseConfig';
import { 
  collection, 
  getDocs, 
  setDoc,
  doc,
  getDoc
} from 'firebase/firestore';

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
        const menuDoc = await getDoc(doc(db, 'providers', providerDoc.id, 'currentMenu', 'menu'));
        
        if (menuDoc.exists()) {
          const menuData = menuDoc.data();
          allMenuItems.push({
            id: menuDoc.id,
            ...menuData,
            kitchenName: provider.kitchenName,
            providerId: providerDoc.id
          });
        }
      }
      
      setMenuItems(allMenuItems);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const updateMenuItem = async (menuItem) => {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("You must be logged in to update menu items");
    }

    try {
      const menuRef = doc(db, 'providers', user.uid, 'currentMenu', 'menu');
      await setDoc(menuRef, {
        ...menuItem,
        price: parseFloat(menuItem.price),
        providerId: user.uid,
        updatedAt: new Date().toISOString(),
      });

      // Refetch all menu items to update the context
      await fetchMenuItems();
    } catch (error) {
      console.error("Error updating menu item:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <MenuContext.Provider value={{ 
      menuItems, 
      updateMenuItem, 
      fetchMenuItems 
    }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);