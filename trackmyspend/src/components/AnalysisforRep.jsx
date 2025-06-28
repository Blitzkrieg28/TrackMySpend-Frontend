"use client";

import { TypeAnimation } from "react-type-animation";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Clock,
  Calendar,
  BarChart3,
} from "lucide-react";
import LineGraphForRep from "./lineforRep";
import { PieChartForRep } from "./Piechart";
import html2pdf from "html2pdf.js";

export default function AnalysisForRep({ onBack1, month }) {
  const [totals, setTotals] = useState({ income: 0, expense: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reportRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [incomeRes, expenseRes] = await Promise.all([
          axios.get(
            `https://trackmyspendapi-3.onrender.com/income/monthlytotalincome?month=${month.split("-")[1]}&year=${month.split("-")[0]}`
          ),
          axios.get(
            `https://trackmyspendapi-3.onrender.com/expense/monthlytotalexpense?month=${month.split("-")[1]}&year=${month.split("-")[0]}`
          ),
        ]);
        setTotals({
          income: incomeRes.data.totalMonthlyIncome || 0,
          expense: expenseRes.data.totalmonthlyExpense || 0,
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    if (month) fetchData();
  }, [month]);

 const handleDownload = () => {
  const element = reportRef.current;

  const width = element.offsetWidth;
  const height = element.offsetHeight;

  const opt = {
    margin: 0,
    filename: `Report_${month}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "px", format: [width, height], orientation: "portrait" },
  };

  html2pdf().set(opt).from(element).save();
};

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const balance = totals.income - totals.expense;

  return (
    <div
      ref={reportRef}
      className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8"
    >
      <div className="w-full max-w-none">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          
          <div className="flex-1 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-2">
              ANALYSIS FOR {month}
            </h1>
            <div className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
              <TypeAnimation
                sequence={[
                  "Analyze and manage your income...",
                  1000,
                  "Track expenses and plan budgets...",
                  1000,
                  "Stay financially smart with insights.",
                  1000,
                ]}
                wrapper="p"
                repeat={0}
              />
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-300 dark:bg-gray-700 mb-8"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <StatsCard
            title="Total Income"
            amount={totals.income}
            icon={<Clock className="w-6 h-6" />}
            formatCurrency={formatCurrency}
          />
          <StatsCard
            title="Total Expense"
            amount={totals.expense}
            icon={<Calendar className="w-6 h-6" />}
            formatCurrency={formatCurrency}
          />
          <StatsCard
            title="Balance"
            amount={balance}
            icon={<BarChart3 className="w-6 h-6" />}
            formatCurrency={formatCurrency}
          />
        </div>

        <div className="h-px bg-gray-300 dark:bg-gray-700 mb-8"></div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">Income Trends</h2>
          <div className="w-full h-[400px]">
            <LineGraphForRep month={month} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">Expense by Category</h2>
          <div className="w-full h-[400px]">
            <PieChartForRep month={month} />
          </div>
        </div>

        <div className="flex justify-start items-center mt-6">
          <button
            onClick={handleDownload}
            className="dark:bg-customLavender bg-[#8e8e8e] text-white px-4 py-2 rounded hover:bg-[#737373] hover:dark:bg-[#825ec9]"
          >
            Download As PDF
          </button>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, amount, icon, formatCurrency }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <div className="text-blue-600 dark:text-blue-400">{icon}</div>
        </div>
      </div>
      <h3 className="text-sm sm:text-base font-semibold text-gray-600 dark:text-gray-300 mb-1">{title}</h3>
      <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{formatCurrency(amount)}</p>
    </div>
  );
}
