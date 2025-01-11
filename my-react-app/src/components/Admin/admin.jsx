import React, { useState } from "react";
import "./admin.css";
import AdminHeader from "./AdminHeader";
import { useMenu } from "../MenuContext"; // Assuming you're using a context for menu items

const AdminPage = () => {
  const { addMenuItem } = useMenu(); // Using the context to add items
  const [selectedSection, setSelectedSection] = useState("orders");
  const [orders] = useState([
    {
      name: "John Doe",
      phone: "123-456-7890",
      quantity: 2,
      item: "Pizza",
      address: "123 Main St, City, Country",
    },
    // Other orders...
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    providerName: "", // Make sure to add providerName for the new item
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.price && newItem.providerName) {
      addMenuItem({ ...newItem, price: parseFloat(newItem.price) });
      setNewItem({ name: "", description: "", price: "", providerName: "" });
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
          {selectedSection === "orders" && (
            <>
              <h2>Today's Orders</h2>
              <hr />
              <div className="orders">
                {orders.map((order, index) => (
                  <div key={index} className="order-card">
                    <p>
                      <strong>Name:</strong> {order.name}
                    </p>
                    <p>
                      <strong>Mobile:</strong> {order.phone}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {order.quantity}
                    </p>
                    <p>
                      <strong>Ordered Item:</strong> {order.item}
                    </p>
                    <p>
                      <strong>Address:</strong> {order.address}
                    </p>
                    <div>
                      <a href="#" id="loc">
                        Location
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

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
                    <label>Price</label>
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

                <div className="menu-preview">
                  <h3>Menu Preview</h3>
                  <div className="menu-items">
                    {/* Add preview logic for newly added items here */}
                  </div>
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
