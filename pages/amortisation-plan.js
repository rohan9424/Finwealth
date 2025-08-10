import { useState } from "react";
import Head from "next/head";

export default function AmortisationPlan() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("");
  const [schedule, setSchedule] = useState([]);

  const calculatePlan = () => {
    const p = parseFloat(principal);
    const monthlyRate = parseFloat(rate) / 12 / 100;
    const n = parseInt(months);

    if (!p || !monthlyRate || !n) {
      alert("Please enter all values correctly!");
      return;
    }

    const emi =
      (p * monthlyRate * Math.pow(1 + monthlyRate, n)) /
      (Math.pow(1 + monthlyRate, n) - 1);

    let balance = p;
    let plan = [];

    for (let i = 1; i <= n; i++) {
      const interest = balance * monthlyRate;
      const principalPaid = emi - interest;
      balance -= principalPaid;

      plan.push({
        month: i,
        emi: emi.toFixed(2),
        principalPaid: principalPaid.toFixed(2),
        interestPaid: interest.toFixed(2),
        remaining: balance > 0 ? balance.toFixed(2) : "0.00",
      });
    }

    setSchedule(plan);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <Head>
        <title>Amortisation Plan - Finwealth</title>
        <meta
          name="description"
          content="Get a month-by-month breakdown of your loan repayment with Finwealth's Amortisation Plan tool."
        />
      </Head>

      <h1 style={{ color: "blue" }}>Amortisation Plan</h1>

      <div style={{ maxWidth: "400px", margin: "auto" }}>
        <label>Loan Amount (₹):</label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "5px 0" }}
        />

        <label>Annual Interest Rate (%):</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "5px 0" }}
        />

        <label>Loan Tenure (months):</label>
        <input
          type="number"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "5px 0" }}
        />

        <button
          onClick={calculatePlan}
          style={{
            width: "100%",
            padding: "10px",
            background: "blue",
            color: "white",
            border: "none",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Generate Plan
        </button>
      </div>

      {schedule.length > 0 && (
        <div style={{ marginTop: "20px", overflowX: "auto" }}>
          <table
            border="1"
            cellPadding="8"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              <tr style={{ background: "#f0f0f0" }}>
                <th>Month</th>
                <th>EMI (₹)</th>
                <th>Principal Paid (₹)</th>
                <th>Interest Paid (₹)</th>
                <th>Remaining Balance (₹)</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.month}>
                  <td>{row.month}</td>
                  <td>{row.emi}</td>
                  <td>{row.principalPaid}</td>
                  <td>{row.interestPaid}</td>
                  <td>{row.remaining}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
