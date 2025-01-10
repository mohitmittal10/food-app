import React, { useState } from "react";
import "./admin.css";
import AdminHeader from "./AdminHeader";

const AdminPage = () => {
  const [selectedSection, setSelectedSection] = useState("orders");
  const [orders] = useState([
    {
      name: "John Doe",
      phone: "123-456-7890",
      quantity: 2,
      item: "Pizza",
      address: "123 Main St, City, Country",
    },
    {
      name: "John Doe",
      phone: "123-456-7890",
      quantity: 2,
      item: "Pizza",
      address: "123 Main St, City, Country",
    }, {
      name: "John Doe",
      phone: "123-456-7890",
      quantity: 2,
      item: "Pizza",
      address: "123 Main St, City, Country",
    }, {
      name: "John Doe",
      phone: "123-456-7890",
      quantity: 2,
      item: "Pizza",
      address: "123 Main St, City, Country",
    }, {
      name: "John Doe",
      phone: "123-456-7890",
      quantity: 2,
      item: "Pizza",
      address: "123 Main St, City, Country",
    }, {
      name: "John Doe",
      phone: "123-456-7890",
      quantity: 2,
      item: "Pizza",
      address: "123 Main St, City, Country",
    }, 
    // Other orders here...
  ]);

  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem({
      ...newMenuItem,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setNewMenuItem({
      ...newMenuItem,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleAddMenuItem = () => {
    if (newMenuItem.name && newMenuItem.price) {
      setMenuItems([...menuItems, newMenuItem]);
      setNewMenuItem({
        name: "",
        description: "",
        price: "",
        image: "",
      });
    } else {
      alert("Please fill out all required fields.");
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
              <br />
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
                <form>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newMenuItem.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={newMenuItem.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="number"
                      name="price"
                      value={newMenuItem.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                    />
                  </div>
                  <button type="button" onClick={handleAddMenuItem}>
                    Add Item
                  </button>
                </form>

                <div className="menu-preview">
                  <h3>Menu Preview</h3>
                  <div className="menu-items">
                    {menuItems.map((item, index) => (
                      <div key={index} className="menu-item-card">
                        <img src={item.image} alt={item.name} />
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                        <p>
                          <strong>Price:</strong>₹{item.price}
                        </p>
                      </div>
                    ))}
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
