import { useState } from "react";
import Head from "next/head";

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("");
  const [emi, setEmi] = useState(null);

  const calculateEmi = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseInt(months);

    if (!p || !r || !n) {
      alert("Please enter all values correctly!");
      return;
    }

    const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(emiValue.toFixed(2));
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <Head>
        <title>EMI Calculator - Finwealth</title>
        <meta
          name="description"
          content="Calculate your monthly EMI easily with Finwealth's EMI Calculator."
        />
      </Head>

      <h1 style={{ color: "blue" }}>EMI Calculator</h1>

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
          onClick={calculateEmi}
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
          Calculate EMI
        </button>

        {emi && (
          <h2 style={{ marginTop: "20px", color: "green" }}>
            Your EMI: ₹{emi}
          </h2>
        )}
      </div>
    </div>
  );
}
