import React, { createContext, useState, useContext, useCallback } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = useCallback((newOrder) => {
    if (!newOrder.id || !newOrder.name || !newOrder.quantity) {
      throw new Error('Invalid order data: missing required fields');
    }

    setOrders((prevOrders) => {
      const isDuplicate = prevOrders.some(order => order.id === newOrder.id);
      if (isDuplicate) {
        throw new Error('This order already exists');
      }

      return [...prevOrders, {
        ...newOrder,
        orderId: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        orderDate: new Date().toISOString(),
        status: 'pending',
        isConfirmed: false
      }];
    });
  }, []);

  const confirmOrder = useCallback((orderId) => {
    setOrders((prevOrders) => {
      const orderExists = prevOrders.some(order => order.orderId === orderId);
      if (!orderExists) {
        throw new Error('Order not found');
      }

      return prevOrders.map((order) =>
        order.orderId === orderId
          ? { ...order, isConfirmed: true, status: 'confirmed', confirmationDate: new Date().toISOString() }
          : order
      );
    });
  }, []);

  const cancelOrder = useCallback((orderId) => {
    setOrders((prevOrders) => {
      const orderExists = prevOrders.some(order => order.orderId === orderId);
      if (!orderExists) {
        throw new Error('Order not found');
      }

      return prevOrders.map((order) =>
        order.orderId === orderId
          ? { ...order, status: 'cancelled', cancellationDate: new Date().toISOString() }
          : order
      );
    });
  }, []);

  const updateOrderQuantity = useCallback((orderId, newQuantity) => {
    if (newQuantity < 1) {
      throw new Error('Quantity must be at least 1');
    }

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId
          ? { ...order, quantity: newQuantity, lastUpdated: new Date().toISOString() }
          : order
      )
    );
  }, []);

  const getOrderById = useCallback((orderId) => {
    return orders.find(order => order.orderId === orderId);
  }, [orders]);

  const getOrdersByStatus = useCallback((status) => {
    return orders.filter(order => order.status === status);
  }, [orders]);

  const getTotalOrders = useCallback(() => {
    return orders.length;
  }, [orders]);

  const getTotalAmount = useCallback(() => {
    return orders.reduce((total, order) => total + (order.price * order.quantity), 0);
  }, [orders]);

  const clearOrders = useCallback(() => {
    setOrders([]);
  }, []);

  const value = {
    orders,
    addOrder,
    confirmOrder,
    cancelOrder,
    updateOrderQuantity,
    getOrderById,
    getOrdersByStatus,
    getTotalOrders,
    getTotalAmount,
    clearOrders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};