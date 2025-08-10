import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <Head>
        <title>Finwealth - Your Finance Companion</title>
        <meta
          name="description"
          content="EMI Calculator, ROI Calculator, Tax Calculator and more for Indian users."
        />
      </Head>

      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "blue" }}>Finwealth</h1>
        <p>Your one-stop finance solution</p>
      </header>

      <nav style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Link href="/emi-calculator">EMI Calculator</Link>
        <Link href="/amortisation">Amortisation Plan</Link>
        <Link href="/roi-calculator">ROI Calculator</Link>
        <Link href="/loan-comparison">Loan Comparison</Link>
        <Link href="/tax-calculator">Tax Calculator</Link>
      </nav>
    </div>
  );
}
