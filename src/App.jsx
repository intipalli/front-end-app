import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const customers = [
    { name: "Lalitha", email: "lalithaa@example.com", password: "lalli" },
    { name: "Venkat", email: "venkat@example.com", password: "ramana" },
    { name: "Satwik", email: "satwik@example.com", password: "sevenwick" },
    { name: "Shivani", email: "shivani@example.com", password: "shivani" },
  ];

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formCustomer, setFormCustomer] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSelect = (customer) => {
    if (selectedCustomer?.email === customer.email) {
      setSelectedCustomer(null);
      setFormCustomer({ name: "", email: "", password: "" });
    } else {
      setSelectedCustomer(customer);
      setFormCustomer(customer);
    }
  };

  const handleDelete = () => {
    console.log("Delete button clicked");
  };

  const handleSave = () => {
    console.log("Save button clicked");
  };

  const handleCancel = () => {
    console.log("Cancel button clicked");
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Customer List</h1>

      <table className="table table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr
              key={index}
              onClick={() => handleSelect(customer)}
              style={{ fontWeight: selectedCustomer?.email === customer.email ? "bold" : "normal" }}
            >
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.password}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-center mb-4">
        {selectedCustomer ? "Update Customer" : "Add Customer"}
      </h2>

      <form className="bg-light p-4 rounded shadow-sm">
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            className="form-control"
            value={formCustomer.name}
            onChange={(e) =>
              setFormCustomer({ ...formCustomer, name: e.target.value })
            }
            placeholder="Customer name"
          />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            className="form-control"
            value={formCustomer.email}
            onChange={(e) =>
              setFormCustomer({ ...formCustomer, email: e.target.value })
            }
            placeholder="Customer email address"
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            className="form-control"
            value={formCustomer.password}
            onChange={(e) =>
              setFormCustomer({ ...formCustomer, password: e.target.value })
            }
            placeholder="Customer password"
          />
        </div>
        <div className="text-center">
          <button type="button" className="btn btn-danger mr-2" onClick={handleDelete}>
            Delete
          </button>
          <button type="button" className="btn btn-success mr-2" onClick={handleSave}>
            Save
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
