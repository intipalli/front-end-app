const baseURL = 'http://localhost:4000/customers';

// Get all customers
export async function getAll(setCustomers) {
  try {
    const response = await fetch(baseURL);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();
    setCustomers(data);
  } catch (error) {
    alert(error);
  }
}

// Add a new customer
export async function post(customer, callback) {
  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });
    if (!response.ok) {
      throw new Error(`Error adding customer: ${response.status}`);
    }
    await response.json();
    callback(); 
  } catch (error) {
    alert(error);
  }
}

// Update an existing customer
export async function put(id, customer, callback) {
  try {
    const response = await fetch(`${baseURL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });
    if (!response.ok) {
      throw new Error(`Error updating customer: ${response.status}`);
    }
    await response.json();
    callback(); 
  } catch (error) {
    alert(error);
  }
}

// Delete a customer by ID
export async function deleteById(id, callback) {
  try {
    const response = await fetch(`${baseURL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error deleting customer: ${response.status}`);
    }
    await response.json();
    callback();
  } catch (error) {
    alert(error);
  }
}
