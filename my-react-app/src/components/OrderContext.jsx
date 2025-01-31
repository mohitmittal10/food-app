import React, { createContext, useState, useContext, useEffect } from 'react';
import { db, auth } from './signup/firebaseConfig';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const placeOrder = async (orderDetails) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User must be logged in to place an order");
      }

      const orderRef = await addDoc(collection(db, 'orders'), {
        ...orderDetails,
        userId: user.uid,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      await fetchOrders();

      return orderRef;
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  };

  const fetchOrders = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, 'orders'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const fetchedOrders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const getTotalOrders = () => {
    return orders.length;
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ 
      orders, 
      placeOrder, 
      fetchOrders,
      getTotalOrders 
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);