import React, { useState } from 'react';
import axios from 'axios';

const FetchForm = () => {
  const [ticker, setTicker] = useState('');
  const [financialData, setFinancialData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/financials', {
        ticker: ticker,
      });
      setFinancialData(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching financial data');
      setFinancialData(null);
    }
  };

  return (
    <div>
      <h2>Enter Company Ticker</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g., AAPL"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <button type="submit">Get Financial Data</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {financialData && (
        <div>
          <h3>Financial Data</h3>
          <pre>{JSON.stringify(financialData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FetchForm;
