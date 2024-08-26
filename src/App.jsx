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

  useEffect(() => {
    api.getAll(setCustomers);
  }, []);

  useEffect(() => {
    if (selectedCustomer) {
      setFormCustomer(selectedCustomer);
    } else {
      setFormCustomer({ id: null, name: "", email: "", password: "" });
    }
  }, [selectedCustomer]);

  const handleSelect = (customer) => {
    setSelectedCustomer(prev => (prev && prev.id === customer.id ? null : customer));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (formCustomer.id) {
      api.put(formCustomer.id, formCustomer, () => {
        setSelectedCustomer(null);
        api.getAll(setCustomers);
      });
    } else {
      api.post(formCustomer, () => {
        setFormCustomer({ id: null, name: "", email: "", password: "" });
        api.getAll(setCustomers);
      });
    }
  };

  const handleDelete = () => {
    if (formCustomer.id) {
      api.deleteById(formCustomer.id, () => {
        setSelectedCustomer(null);
        setFormCustomer({ id: null, name: "", email: "", password: "" });
        api.getAll(setCustomers);
      });
    }
  };

  const handleCancel = () => {
    setFormCustomer({ id: null, name: "", email: "", password: "" });
    setSelectedCustomer(null);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Customer List</h1>
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
