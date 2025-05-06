import React, { useEffect, useState } from 'react';
import './ExchangeRates.css';

const ExchangeRates = () => {
  const [rates, setRates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch('https://v6.exchangerate-api.com/v6/9227d91a91dedb900c105fe0/latest/INR');
        const data = await res.json();
        if (data.result === 'success') {
          const rateEntries = Object.entries(data.conversion_rates);
          setRates(rateEntries);
        }
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    };

    fetchRates();
  }, []);

  const totalPages = Math.ceil(rates.length / rowsPerPage);
  const indexOfLastRate = currentPage * rowsPerPage;
  const indexOfFirstRate = indexOfLastRate - rowsPerPage;
  const currentRates = rates.slice(indexOfFirstRate, indexOfLastRate);

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="exchange-container">
      <h2>Exchange Rates (Base: INR)</h2>
      <table className="exchange-table">
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {currentRates.map(([currency, rate]) => (
            <tr key={currency}>
              <td>{currency}</td>
              <td>{rate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <div className="rows-selector">
          <label htmlFor="rowsPerPage">Rows per page:</label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={handleRowsChange}
          >
            {[5, 10, 25, 50, 100].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div className="page-controls">
          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>{'<<'}</button>
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</button>
          <span>{`${indexOfFirstRate + 1}-${Math.min(indexOfLastRate, rates.length)} of ${rates.length}`}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
          <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>{'>>'}</button>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRates;
