"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { useEffect, useState } from "react"
import axios from "axios"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const customColors = {
  income: "#10b981",
  expense: "#ef4444",
  incomeGradient: "rgba(16, 185, 129, 0.1)",
  expenseGradient: "rgba(239, 68, 68, 0.1)",
  grayText: "#6b7280",
  darkGrayText: "#9ca3af",
  whiteText: "#ffffff",
  border: "#374151",
  gridColor: "rgba(107, 114, 128, 0.1)",
  darkGridColor: "rgba(156, 163, 175, 0.1)",
}

export default function LineGraphForRep({ month }) {
  const [chartData, setChartData] = useState(null)
  const [options, setOptions] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!month) return

    const [year, mon] = month.split("-")
    const incomeUrl = `https://trackmyspendapi-3.onrender.com/income/eachweekincome?year=${year}&month=${mon}`
    const expenseUrl = `https://trackmyspendapi-3.onrender.com/expense/eachweekexpense?year=${year}&month=${mon}`

    setLoading(true)
    axios
      .all([axios.get(incomeUrl), axios.get(expenseUrl)])
      .then(
        axios.spread((incRes, expRes) => {
          const rawInc = incRes.data
          const rawExp = expRes.data
          const labels = rawInc.weeks
          const incTotals = rawInc.totals
          const expTotals = rawExp.totals

          setChartData({
            labels,
            datasets: [
              {
                label: "Weekly Income",
                data: incTotals,
                borderColor: customColors.income,
                backgroundColor: customColors.incomeGradient,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointBackgroundColor: customColors.income,
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                borderWidth: 3,
              },
              {
                label: "Weekly Expense",
                data: expTotals,
                borderColor: customColors.expense,
                backgroundColor: customColors.expenseGradient,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointBackgroundColor: customColors.expense,
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                borderWidth: 3,
              },
            ],
          })
          setLoading(false)
        }),
      )
      .catch((err) => {
        console.error("Error fetching weekly data:", err)
        setLoading(false)
      })
  }, [month])

  useEffect(() => {
    setOptions({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: customColors.grayText,
            font: {
              size: 12,
              weight: "500",
            },
            padding: 20,
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: customColors.whiteText,
          bodyColor: customColors.whiteText,
          borderColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: 1,
          cornerRadius: 8,
          padding: 12,
          displayColors: true,
          callbacks: {
            label: (context) => `${context.dataset.label}: ₹${context.parsed.y.toLocaleString()}`,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: customColors.grayText,
            font: {
              size: 11,
              weight: "500",
            },
          },
          grid: {
            color: customColors.gridColor,
            drawBorder: false,
            lineWidth: 1,
          },
          title: {
            display: true,
            text: "Week",
            color: customColors.grayText,
            font: {
              size: 12,
              weight: "600",
            },
          },
        },
        y: {
          ticks: {
            color: customColors.grayText,
            font: {
              size: 11,
              weight: "500",
            },
            callback: (value) => "₹" + value.toLocaleString(),
          },
          grid: {
            color: customColors.gridColor,
            lineWidth: 1,
          },
          title: {
            display: true,
            text: "Amount (₹)",
            color: customColors.grayText,
            font: {
              size: 12,
              weight: "600",
            },
          },
        },
      },
      elements: {
        point: {
          hoverRadius: 8,
          hitRadius: 12,
        },
        line: {
          borderWidth: 3,
        },
      },
    })
  }, [])

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading chart data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      {chartData && options ? (
        <Line data={chartData} options={options} />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">No data available</p>
        </div>
      )}
    </div>
  )
}
