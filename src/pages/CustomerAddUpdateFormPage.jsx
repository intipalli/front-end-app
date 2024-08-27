import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerAddUpdateForm from "../components/CustomerAddUpdateForm";

const CustomerAddUpdateFormPage = ({ formCustomer, error, onInputChange, onSave, onDelete, onCancel }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="container mt-4">
      <CustomerAddUpdateForm
        formCustomer={formCustomer}
        error={error}
        onInputChange={onInputChange}
        onSave={() => onSave(navigate)}
        onDelete={() => onDelete(navigate)}
        onCancel={() => onCancel(navigate)}
      />
    </div>
  );
};

export default CustomerAddUpdateFormPage;
