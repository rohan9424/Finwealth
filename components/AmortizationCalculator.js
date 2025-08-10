import { useState } from "react";

export default function AmortizationCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [schedule, setSchedule] = useState([]);

  const calculateSchedule = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(tenure) * 12;

    if (p > 0 && r > 0 && n > 0) {
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      let balance = p;
      let amortization = [];

      for (let i = 1; i <= n; i++) {
        const interest = balance * r;
        const principalPaid = emi - interest;
        balance -= principalPaid;

        amortization.push({
          month: i,
          emi: emi.toFixed(2),
          principalPaid: principalPaid.toFixed(2),
          interestPaid: interest.toFixed(2),
          balance: balance > 0 ? balance.toFixed(2) : "0.00",
        });
      }

      setSchedule(amortization);
    } else {
      setSchedule([]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Amortization Calculator</h2>

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
        onClick={calculateSchedule}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Generate Schedule
      </button>

      {schedule.length > 0 && (
        <table className="table-auto border-collapse border border-gray-300 mt-4 w-full text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-2 py-1">Month</th>
              <th className="border border-gray-300 px-2 py-1">EMI (₹)</th>
              <th className="border border-gray-300 px-2 py-1">Principal (₹)</th>
              <th className="border border-gray-300 px-2 py-1">Interest (₹)</th>
              <th className="border border-gray-300 px-2 py-1">Balance (₹)</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row) => (
              <tr key={row.month}>
                <td className="border border-gray-300 px-2 py-1">{row.month}</td>
                <td className="border border-gray-300 px-2 py-1">{row.emi}</td>
                <td className="border border-gray-300 px-2 py-1">{row.principalPaid}</td>
                <td className="border border-gray-300 px-2 py-1">{row.interestPaid}</td>
                <td className="border border-gray-300 px-2 py-1">{row.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
