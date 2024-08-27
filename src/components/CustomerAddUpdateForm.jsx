import React from "react";

const CustomerAddUpdateForm = ({ formCustomer, onInputChange, onSave, onDelete, onCancel }) => {
  return (
    <div className="bg-light p-4 rounded shadow-sm">
      <h2 className="text-center mb-4">
        {formCustomer.id ? "Update Customer" : "Add Customer"}
      </h2>
      <form>
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formCustomer.name}
            onChange={onInputChange}
            placeholder="Customer name"
          />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formCustomer.email}
            onChange={onInputChange}
            placeholder="Customer email address"
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formCustomer.password}
            onChange={onInputChange}
            placeholder="Customer password"
          />
        </div>
        <div className="text-center">
          {formCustomer.id && (
            <button type="button" className="btn btn-danger mr-2" onClick={onDelete}>
              Delete
            </button>
          )}
          <button type="button" className="btn btn-success mr-2" onClick={onSave}>
            {formCustomer.id ? "Update" : "Add"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerAddUpdateForm;
