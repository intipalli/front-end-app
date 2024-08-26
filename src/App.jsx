import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  getAll as getAllCustomers,
  post as addCustomer,
  put as updateCustomer,
  deleteById as deleteCustomer
} from './memdb';

const blankCustomer = { name: "", email: "", password: "" };

function App() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formCustomer, setFormCustomer] = useState(blankCustomer);

  useEffect(() => {
    const fetchCustomers = () => {
      const allCustomers = getAllCustomers();
      setCustomers(allCustomers);
    };
    fetchCustomers();
  }, []);

  const handleSelect = (customer) => {
    if (selectedCustomer?.id === customer.id) {
      setSelectedCustomer(null);
      setFormCustomer(blankCustomer);
    } else {
      setSelectedCustomer(customer);
      setFormCustomer(customer);
    }
  };

  const handleDelete = () => {
    if (selectedCustomer) {
      deleteCustomer(selectedCustomer.id);
      const updatedCustomers = getAllCustomers();
      setCustomers(updatedCustomers);
      setSelectedCustomer(null);
      setFormCustomer(blankCustomer);
    }
  };

  const handleSave = () => {
    if (selectedCustomer) {
      const updatedCustomer = { ...formCustomer, id: selectedCustomer.id };
      updateCustomer(selectedCustomer.id, updatedCustomer);
    } else {
      addCustomer(formCustomer);
    }
    const updatedCustomers = getAllCustomers();
    setCustomers(updatedCustomers);
    setSelectedCustomer(null);
    setFormCustomer(blankCustomer);
  };

  const handleCancel = () => {
    setSelectedCustomer(null);
    setFormCustomer(blankCustomer);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormCustomer(prevFormCustomer => ({
      ...prevFormCustomer,
      [name]: value
    }));
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
          {customers.map((customer) => (
            <tr
              key={customer.id}
              onClick={() => handleSelect(customer)}
              style={{ fontWeight: selectedCustomer?.id === customer.id ? "bold" : "normal" }}
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
            name="name"
            value={formCustomer.name}
            onChange={handleInputChange}
            placeholder="Customer name"
          />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formCustomer.email}
            onChange={handleInputChange}
            placeholder="Customer email address"
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formCustomer.password}
            onChange={handleInputChange}
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
