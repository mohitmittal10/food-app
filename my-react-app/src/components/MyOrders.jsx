import React from "react";
import "../styles/MyOrders.css";

const MyOrders = ({ orders, cancelOrder, confirmOrder }) => {
  return (
    <div className="my-orders-page">
      <h2>My Orders</h2>
      {orders.length > 0 ? (
        <div className="orders-container">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h3>{order.name}</h3>
              <p>{order.cuisine}</p>
              <p>Menu: {order.menu}</p>
              <p>Location: {order.location}</p>
              <p>₹{order.price}/meal</p>
              <p>Min order: {order.minDays} days</p>

              <div className="order-actions">
                {!order.isConfirmed && (
                  <button
                    className="cancel-btn"
                    onClick={() => cancelOrder(order.id)}
                  >
                    Cancel Order
                  </button>
                )}
                {!order.isConfirmed && (
                  <button
                    className="confirm-btn"
                    onClick={() => confirmOrder(order.id)}
                  >
                    Confirm Order
                  </button>
                )}
                {order.isConfirmed && <p className="confirmed">Order Confirmed ✅</p>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders placed yet!</p>
      )}
    </div>
  );
};

export default MyOrders;
