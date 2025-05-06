import React, { useState } from 'react';
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import axios from 'axios';

const currenciesList = ['USD', 'INR', 'EUR', 'GBP', 'JPY', 'CAD'];

function Calculator() {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [termYears, setTermYears] = useState('');
  const [schedule, setSchedule] = useState([]);
  const [monthlyEMI, setMonthlyEMI] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [currency, setCurrency] = useState('INR');
  const [conversionRate, setConversionRate] = useState(1);

  const calculateEMI = async () => {
    const P = parseFloat(principal);
    const r = parseFloat(interestRate) / 12 / 100;
    const N = parseFloat(termYears) * 12;

    const emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    setMonthlyEMI(emi.toFixed(2));

    let balance = P;
    const scheduleData = [];

    for (let i = 1; i <= N; i++) {
      const interest = balance * r;
      const principalPaid = emi - interest;
      balance -= principalPaid;
      scheduleData.push({
        month: i,
        principal: principalPaid,
        interest: interest,
        balance: balance > 0 ? balance : 0,
      });
    }

    setSchedule(scheduleData);
    setShowOptions(true);
    fetchConversionRate(currency); // Default conversion
  };

  const resetTable = () => {
    setMonthlyEMI(null);
    setSchedule([]);
    setShowOptions(false);
    setCurrency('INR');
    setConversionRate(1);
  };

  const fetchConversionRate = async (selectedCurrency) => {
    try {
      // INR is the base currency, so no need to convert
      if (selectedCurrency === 'INR') {
        setConversionRate(1);
        return;
      }
  
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/9227d91a91dedb900c105fe0/latest/INR`
      );
  
      const rate = response.data.conversion_rates[selectedCurrency];
      setConversionRate(rate || 1);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      setConversionRate(1);
    }
  };
  

  const handleCurrencyChange = (e) => {
    const selected = e.target.value;
    setCurrency(selected);
    fetchConversionRate(selected);
  };

  const convert = (amount) => (amount * conversionRate).toFixed(2);

  return (
    <div style={{ padding: 20 }}>
      <h2>Loan Calculator Dashboard</h2>
      <TextField
        label="Loan Amount"
        type="number"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <TextField
        label="Interest Rate (%)"
        type="number"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <TextField
        label="Term (Years)"
        type="number"
        value={termYears}
        onChange={(e) => setTermYears(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <Button variant="contained" onClick={calculateEMI}>
        CALCULATE
      </Button>

      {showOptions && (
        <>
          <h3 style={{ marginTop: 20 }}>
            Monthly EMI: {currency} {convert(monthlyEMI)}
          </h3>

          <FormControl style={{ minWidth: 120, marginBottom: 10 }}>
            <InputLabel>Currency</InputLabel>
            <Select value={currency} onChange={handleCurrencyChange}>
              {currenciesList.map((cur) => (
                <MenuItem key={cur} value={cur}>
                  {cur}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="outlined" color="secondary" onClick={resetTable} style={{ float: 'right' }}>
            RESET TABLE
          </Button>

          <TableContainer component={Paper} style={{ marginTop: 20 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Principal</TableCell>
                  <TableCell>Interest</TableCell>
                  <TableCell>Remaining Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedule.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell>{convert(row.principal)} {currency}</TableCell>
                    <TableCell>{convert(row.interest)} {currency}</TableCell>
                    <TableCell>{convert(row.balance)} {currency}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
}

export default Calculator;
