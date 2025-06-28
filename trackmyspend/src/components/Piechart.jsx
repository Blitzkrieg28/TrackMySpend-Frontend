"use client"

import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { useEffect, useState } from "react"
import axios from "axios"

ChartJS.register(ArcElement, Tooltip, Legend)

const customColors = {
  grayText: "#6b7280",
  darkGrayText: "#9ca3af",
  whiteText: "#ffffff",
  border: "#374151",
  slices: [
    "#3b82f6", // blue
    "#ef4444", // red
    "#10b981", // green
    "#f59e0b", // yellow
    "#8b5cf6", // purple
    "#06b6d4", // cyan
    "#f97316", // orange
    "#84cc16", // lime
    "#ec4899", // pink
  ],
}

export function PieChartForRep({ month }) {
  const [chartData, setChartData] = useState(null)
  const [options, setOptions] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!month) return

    const [year, mon] = month.split("-")
    setLoading(true)

    axios
      .get(`https://trackmyspendapi-3.onrender.com/category/by-category?year=${year}&month=${mon}`)
      .then(({ data }) => {
        const { categories, totals } = data

        setChartData({
          labels: categories,
          datasets: [
            {
              data: totals,
              backgroundColor: customColors.slices,
              borderColor: "#ffffff",
              borderWidth: 3,
              hoverOffset: 15,
              hoverBorderWidth: 4,
            },
          ],
        })
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching categories:", err)
        setLoading(false)
      })
  }, [month])

  useEffect(() => {
    setOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
          labels: {
            color: customColors.grayText,
            font: {
              size: 12,
              weight: "500",
            },
            padding: 15,
            usePointStyle: true,
            pointStyle: "circle",
            generateLabels: (chart) => {
              const data = chart.data
              if (data.labels.length && data.datasets.length) {
                const dataset = data.datasets[0]
                const total = dataset.data.reduce((sum, value) => sum + value, 0)

                return data.labels.map((label, i) => {
                  const value = dataset.data[i]
                  const percentage = ((value / total) * 100).toFixed(1)

                  return {
                    text: `${label} (${percentage}%)`,
                    fillStyle: dataset.backgroundColor[i],
                    strokeStyle: dataset.borderColor,
                    lineWidth: dataset.borderWidth,
                    hidden: false,
                    index: i,
                  }
                })
              }
              return []
            },
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
          callbacks: {
            label: (context) => {
              const total = context.dataset.data.reduce((sum, value) => sum + value, 0)
              const percentage = ((context.parsed / total) * 100).toFixed(1)
              return `${context.label}: ₹${context.parsed.toLocaleString()} (${percentage}%)`
            },
          },
        },
      },
      layout: {
        padding: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
        },
      },
    })
  }, [])

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-600 border-t-transparent"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading category data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      {chartData && options ? (
        <Pie data={chartData} options={options} />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">No category data available</p>
        </div>
      )}
    </div>
  )
}
