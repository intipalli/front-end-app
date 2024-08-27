import React from "react";

const CustomerAddUpdateForm = ({ formCustomer, onInputChange, onSave, onDelete, onCancel, error }) => {
  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="text-center mb-4">
          {formCustomer.id ? "Update Customer" : "Add Customer"}
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
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
            <button type="button" className="btn btn-danger mr-2" onClick={onDelete} disabled={!formCustomer.id}>
              Delete
            </button>
            <button type="button" className="btn btn-success mr-2" onClick={onSave}>
              Save
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerAddUpdateForm;
