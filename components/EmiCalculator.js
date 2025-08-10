import { useState } from "react";

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(null);

  const calculateEmi = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(tenure) * 12;

    if (p > 0 && r > 0 && n > 0) {
      const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(emiValue.toFixed(2));
    } else {
      setEmi(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">EMI Calculator</h2>

      <input
        type="number"
        placeholder="Principal (₹)"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />

      <input
        type="number"
        placeholder="Annual Interest Rate (%)"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />

      <input
        type="number"
        placeholder="Loan Tenure (Years)"
        value={tenure}
        onChange={(e) => setTenure(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <button
        onClick={calculateEmi}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Calculate
      </button>

      {emi && (
        <p className="mt-4 text-lg font-semibold">
          Monthly EMI: ₹{emi}
        </p>
      )}
    </div>
  );
}
