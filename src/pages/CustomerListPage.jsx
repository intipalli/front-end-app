import React from "react";
import { useNavigate } from "react-router-dom";
import CustomerList from "../components/CustomerList";

const CustomerListPage = ({ customers, selectedCustomer, onSelect }) => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h1 class="text text-primary">Customer Manager</h1>
        <div>
          <button className="btn btn-success mr-2" disabled={selectedCustomer} onClick={() => navigate("/customers/add")}>
            Add Customer
          </button>
          <button
            className="btn btn-secondary"
            disabled={!selectedCustomer}
            onClick={() => navigate(`/customers/${selectedCustomer?.id}`)}
          >
            Update Customer
          </button>
        </div>
      </div>
      <CustomerList customers={customers} selectedCustomer={selectedCustomer} onSelect={onSelect} />
    </div>
  );
};

export default CustomerListPage;
