import React from "react";

function App() {

  const customers = [
    { name: "Lalitha", email: "lalithaa@example.com", password: "lalli" },
    { name: "Venkat", email: "venkat@example.com", password: "ramana" },
    { name: "Satwik", email: "satwik@example.com", password: "sevenwick" },
    { name: "Shivani", email: "shivani@example.com", password: "shivani" },

  ];

  const handleSelect = (customer) => {
    console.log("Customer selected:", customer);
  };

  const handleDelete = () => {
    console.log("Delete button clicked");
  };

  const handleSave = () => {
    console.log("Save button clicked");
  };

  const handleCancel = () => {
    console.log("Cancel button clicked");
  };

  return (
    <div>
      <h1>Customer List</h1>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index} onClick={() => handleSelect(customer)}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.password}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <h2>Add / Update Customer</h2>
      <form>
        <div>
          <label>Name: </label>
          <input type="text" placeholder="Customer name" />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" placeholder="Customer email address" />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" placeholder="Customer password" />
        </div>
        <div>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
