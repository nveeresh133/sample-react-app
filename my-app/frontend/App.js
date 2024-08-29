import React, { useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (error) {
      setError(error.message);
      setData(null);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Information Dashboard</h1>
      <button onClick={() => fetchData('/api/contact')}>Get Contact Details</button>
      <button onClick={() => fetchData('/api/company')}>Get Company Details</button>
      <button onClick={() => fetchData('/api/project')}>Get Project Details</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <div style={{ marginTop: '20px' }}>
          {Object.keys(data).map((key) => (
            <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {data[key]}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
