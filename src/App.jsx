import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerListPage from "./pages/CustomerListPage";
import CustomerAddUpdateFormPage from "./pages/CustomerAddUpdateFormPage";
import * as api from "./restdb";

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formCustomer, setFormCustomer] = useState({ id: null, name: "", email: "", password: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getAll(setCustomers);
  }, []);

  const handleSelect = (customer) => {
    setSelectedCustomer(customer);
    setFormCustomer(customer);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (navigate) => {
    if (!formCustomer.name || !formCustomer.email || !formCustomer.password) {
      setError("All fields are required.");
      return;
    }

    if (formCustomer.id) {
      api.put(formCustomer.id, formCustomer, () => {
        toast.success(`Customer ${formCustomer.name} updated successfully!`);
        navigate("/customers");
        setFormCustomer({ id: null, name: "", email: "", password: "" });
        api.getAll(setCustomers);
      });
    } else {
      api.post(formCustomer, () => {
        toast.success(`Customer ${formCustomer.name} added successfully!`);
        navigate("/customers");
        setFormCustomer({ id: null, name: "", email: "", password: "" });
        api.getAll(setCustomers);
      });
    }
  };

  const handleDelete = (navigate) => {
    if (formCustomer.id) {
      api.deleteById(formCustomer.id, () => {
        toast.success(`Customer ${formCustomer.name} deleted successfully!`);
        navigate("/customers");
        setFormCustomer({ id: null, name: "", email: "", password: "" });
        setSelectedCustomer(null);
        api.getAll(setCustomers);
      });
    }
  };

  const handleCancel = (navigate) => {
    setFormCustomer({ id: null, name: "", email: "", password: "" });
    navigate("/customers");
  };

  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route
          path="/customers"
          element={<CustomerListPage customers={customers} selectedCustomer={selectedCustomer} onSelect={handleSelect} />}
        />
        <Route
          path="/customers/:id"
          element={
            <CustomerAddUpdateFormPage
              formCustomer={formCustomer}
              error={error}
              onInputChange={handleInputChange}
              onSave={handleSave}
              onDelete={handleDelete}
              onCancel={handleCancel}
            />
          }
        />
        <Route path="*" element={<CustomerListPage customers={customers} selectedCustomer={selectedCustomer} onSelect={handleSelect} />} />
      </Routes>
    </Router>
  );
};

export default App;
