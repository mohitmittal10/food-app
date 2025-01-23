import React from "react";
import { useOrders } from "./OrderContext";
import "../styles/MyOrders.css";

const MyOrders = () => {
  const { 
    orders, 
    cancelOrder, 
    confirmOrder,
    getTotalAmount
  } = useOrders();

  const handleCancelOrder = (orderId) => {
    try {
      cancelOrder(orderId);
    } catch (error) {
      alert(`Error canceling order: ${error.message}`);
    }
  };

  const handleConfirmOrder = (orderId) => {
    try {
      confirmOrder(orderId);
    } catch (error) {
      alert(`Error confirming order: ${error.message}`);
    }
  };

  return (
    <div className="my-orders-page">
      <h2>My Orders</h2>
      {orders.length > 0 ? (
        <>
          <div className="orders-summary">
            <p>Total Orders: {orders.length}</p>
            <p>Total Amount: ₹{getTotalAmount()}</p>
          </div>
          <div className="orders-container">
            {orders.map((order) => (
              <div 
                key={order.orderId} 
                className={`order-card ${order.status === 'cancelled' ? 'cancelled' : ''}`}
              >
                <div className="order-header">
                  <h3>{order.name}</h3>
                  <span className="order-id">#{order.orderId}</span>
                </div>

                <div className="order-details">
                  <p>{order.cuisine}</p>
                  <p>Location: {order.location}</p>
                  <p>₹{order.price}/meal</p>
                  <p>Quantity: {order.quantity}</p>
                  <p>Total: ₹{order.price * order.quantity}</p>
                  <p>Min order: {order.minDays} days</p>
                  
                  {/* Show menu items from the provider */}
                  {order.menu && (
                    <div className="menu-details">
                      <p><strong>Menu:</strong> {order.menu}</p>
                    </div>
                  )}

                  {/* Show order date */}
                  <p className="order-date">
                    Ordered on: {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="order-status">
                  {order.status === 'cancelled' && (
                    <span className="status cancelled">Cancelled</span>
                  )}
                  {order.status === 'confirmed' && (
                    <span className="status confirmed">Confirmed ✅</span>
                  )}
                  {order.status === 'pending' && (
                    <span className="status pending">Pending</span>
                  )}
                </div>

                <div className="order-actions">
                  {order.status === 'pending' && (
                    <>
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancelOrder(order.orderId)}
                      >
                        Cancel Order
                      </button>
                      <button
                        className="confirm-btn"
                        onClick={() => handleConfirmOrder(order.orderId)}
                      >
                        Confirm Order
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-orders">
          <p>No orders placed yet!</p>
          <p>Visit our providers page to place your first order.</p>
        </div>
      )}
    </div>
  );
};

export default MyOrders;