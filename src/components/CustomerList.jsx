import React, { useState, useEffect } from "react";

const PAGE_SIZE = 10;

const CustomerList = ({ customers, selectedCustomer, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
    setPageCount(Math.ceil(filtered.length / PAGE_SIZE));
    setCurrentPage(1);
  }, [searchTerm, customers]);



  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <h3>Customer List ({filteredCustomers.length} records)</h3>
          <div>
            <input
              type="text"
              className="form-control mr-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email"
            />

          </div>
        </div>
        <div style={{ height: '400px', overflowY: 'auto' }}>
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  onClick={() => onSelect(customer)}
                  style={{
                    fontWeight: selectedCustomer && selectedCustomer.id === customer.id ? "bold" : "normal",
                    backgroundColor: selectedCustomer && selectedCustomer.id === customer.id ? "#f0f0f0" : "white",
                    cursor: "pointer",
                  }}
                >
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-primary"
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>Page {currentPage} of {pageCount}</span>
          <button
            className="btn btn-primary"
            onClick={() => handlePageChange('next')}
            disabled={currentPage === pageCount}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
