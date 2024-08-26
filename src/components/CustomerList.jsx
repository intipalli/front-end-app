import React from "react";

const CustomerList = ({ customers, selectedCustomer, onSelect }) => {
  return (
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
            onClick={() => onSelect(customer)}
            style={{ 
              fontWeight: selectedCustomer && selectedCustomer.id === customer.id ? "bold" : "normal",
              cursor: 'pointer'
            }}
          >
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.password}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerList;
