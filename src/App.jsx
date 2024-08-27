import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerList from "./components/CustomerList";
import CustomerAddUpdateForm from "./components/CustomerAddUpdateForm";
import * as api from "./restdb";

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formCustomer, setFormCustomer] = useState({
    id: null,
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    api.getAll(setCustomers);
  }, []);

  const handleSelect = (customer) => {
    if (selectedCustomer && selectedCustomer.id === customer.id) {
      setSelectedCustomer(null);
      setFormCustomer({ id: null, name: "", email: "", password: "" });
    } else {
      setSelectedCustomer(customer);
      setFormCustomer(customer);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormCustomer(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formCustomer.name) return "Name is required.";
    if (!formCustomer.email) return "Email is required.";
    if (!formCustomer.password) return "Password is required.";
    return "";
  };

  const handleSave = () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    if (formCustomer.id) {
      api.put(formCustomer.id, formCustomer, () => {
        setSelectedCustomer(null);
        setFormCustomer({ id: null, name: "", email: "", password: "" });
        api.getAll(setCustomers);
        alert(`Customer "${formCustomer.name}" updated successfully.`);
      });
    } else {
      api.post(formCustomer, () => {
        setFormCustomer({ id: null, name: "", email: "", password: "" });
        api.getAll(setCustomers);
        alert(`Customer "${formCustomer.name}" added successfully.`);
      });
    }
  };

  const handleDelete = () => {
    if (formCustomer.id) {
      api.deleteById(formCustomer.id, () => {
        alert(`Customer "${formCustomer.name}" deleted successfully.`);
        setFormCustomer({ id: null, name: "", email: "", password: "" });
        setSelectedCustomer(null);
        api.getAll(setCustomers);
      });
    }
  };

  const handleCancel = () => {
    setFormCustomer({ id: null, name: "", email: "", password: "" });
    setSelectedCustomer(null);
    setError("");
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Customer List</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <CustomerList 
        customers={customers} 
        selectedCustomer={selectedCustomer} 
        onSelect={handleSelect} 
      />
      <CustomerAddUpdateForm 
        formCustomer={formCustomer} 
        onInputChange={handleInputChange} 
        onSave={handleSave} 
        onDelete={handleDelete} 
        onCancel={handleCancel} 
      />
    </div>
  );
};

export default App;
