import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import CustomerList from "./components/CustomerList";
import CustomerAddUpdateForm from "./components/CustomerAddUpdateForm";
import * as api from "./restdb";
import { ToastContainer, toast } from 'react-toastify';

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
        toast.success(`Customer "${formCustomer.name}" updated successfully.`);
      });
    } else {
      api.post(formCustomer, () => {
        setFormCustomer({ id: null, name: "", email: "", password: "" });
        api.getAll(setCustomers);
        toast.success(`Customer "${formCustomer.name}" added successfully.`);
      });
    }
  };

  const handleDelete = () => {
    if (formCustomer.id) {
      api.deleteById(formCustomer.id, () => {
        toast.success(`Customer "${formCustomer.name}" deleted successfully.`);
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
    <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh", padding: "20px" }}>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h1 className="text-center mb-4">Customer List</h1>
                <CustomerList 
                  customers={customers} 
                  selectedCustomer={selectedCustomer} 
                  onSelect={handleSelect} 
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-sm">
            {error && <div className="alert alert-danger">{error}</div>}
              <div className="card-body">
                <CustomerAddUpdateForm 
                  formCustomer={formCustomer} 
                  onInputChange={handleInputChange} 
                  onSave={handleSave} 
                  onDelete={handleDelete} 
                  onCancel={handleCancel} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
