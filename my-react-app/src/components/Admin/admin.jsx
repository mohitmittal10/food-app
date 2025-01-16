import React, { useState } from "react";
import { useOrders } from "../OrderContext"; // Use your OrderContext to fetch orders
import { useMenu } from "../MenuContext"; // Use your MenuContext to fetch and add menu items
import "./admin.css";
import AdminHeader from "./AdminHeader";

const AdminPage = () => {
  const { orders } = useOrders(); // Fetch orders from OrderContext
  const { addMenuItem, menuItems } = useMenu(); // Fetch menu items from MenuContext
  const [selectedSection, setSelectedSection] = useState("orders"); // State to manage selected section
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    providerName: "",
  });

  // Handle form input changes for new menu item
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new menu item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.price && newItem.providerName) {
      addMenuItem({ ...newItem, price: parseFloat(newItem.price) }); // Add new item to the context
      setNewItem({ name: "", description: "", price: "", providerName: "" }); // Clear form fields
      alert("Menu item added successfully!");
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <>
      {/* Admin Header */}
      <AdminHeader />

      {/* Admin Page Content */}
      <div className="admin-page">
        <nav className="admin-navbar">
          <div className="logo">
            <h1>स्वाद अनुसार</h1>
          </div>
          <ul className="nav-items">
            <li>Dashboard</li>
            <li
              onClick={() => setSelectedSection("orders")}
              className={selectedSection === "orders" ? "active" : ""}
            >
              Orders
            </li>
            <li
              onClick={() => setSelectedSection("addMenu")}
              className={selectedSection === "addMenu" ? "active" : ""}
            >
              Menu
            </li>
            <li>Customer Reviews</li>
            <li>FAQs</li>
            <li>Help</li>
          </ul>
        </nav>

        <main className="main-content">
          {/* Orders Section */}
          {selectedSection === "orders" && (
            <>
              <h2>Today's Orders</h2>
              <hr />
              <div className="orders">
                {orders.length ? (
                  orders.map((order) => (
                    <div key={order.id} className="order-card">
                      <p><strong>Name:</strong> {order.name}</p>
                      <p><strong>Mobile:</strong> {order.phone}</p>
                      <p><strong>Quantity:</strong> {order.quantity}</p>
                      <p><strong>Ordered Item:</strong> {order.item}</p>
                      <p><strong>Address:</strong> {order.address}</p>
                      <div>
                        <a href="#" id="loc">Location</a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No orders available for today.</p>
                )}
              </div>
            </>
          )}

          {/* Add Menu Section */}
          {selectedSection === "addMenu" && (
            <>
              <h2>Add New Menu Item</h2>
              <div className="add-menu">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newItem.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={newItem.description}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      value={newItem.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Provider Name</label>
                    <input
                      type="text"
                      name="providerName"
                      value={newItem.providerName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit">Add Item</button>
                </form>

                {/* Menu Preview */}
                <div className="menu-preview">
                  <h3>Menu Preview</h3>
                  {menuItems.length ? (
                    <div className="menu-items">
                      {menuItems.map((item, index) => (
                        <div key={index} className="menu-item">
                          <p><strong>Name:</strong> {item.name}</p>
                          <p><strong>Description:</strong> {item.description}</p>
                          <p><strong>Price:</strong> ₹{item.price.toFixed(2)}</p>
                          <p><strong>Provider:</strong> {item.providerName}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No menu items available.</p>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminPage;
