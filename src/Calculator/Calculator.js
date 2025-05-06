import React, { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Calculator() {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [termYears, setTermYears] = useState('');
  const [schedule, setSchedule] = useState([]);
  const [monthlyEMI, setMonthlyEMI] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const r = parseFloat(interestRate) / 12 / 100;
    const N = parseFloat(termYears) * 12;

    const emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    setMonthlyEMI(emi.toFixed(2));

    // Generate amortization schedule
    const scheduleData = [];
    let balance = P;
    for (let i = 1; i <= N; i++) {
      const interest = balance * r;
      const principalPaid = emi - interest;
      balance -= principalPaid;
      scheduleData.push({
        month: i,
        principal: principalPaid.toFixed(2),
        interest: interest.toFixed(2),
        balance: balance > 0 ? balance.toFixed(2) : 0,
      });
    }

    setSchedule(scheduleData);
  };

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

      {monthlyEMI && (
        <>
          <h3 style={{ marginTop: 20 }}>Monthly EMI: ${monthlyEMI}</h3>

          <TableContainer component={Paper}>
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
                    <TableCell>{row.principal} INR</TableCell>
                    <TableCell>{row.interest} INR</TableCell>
                    <TableCell>{row.balance} INR</TableCell>
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
