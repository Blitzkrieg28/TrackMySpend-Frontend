import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { useEffect, useState } from 'react';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const customColors = {
  expense: '#e6a943',       // customOrange
  income: '#78b39b',        // customTealLight
  background: '#242933',    // customDarkBlue
  border: '#353d63',        // customIndigoDark
  grayText: '#ededed',      // customLightGray
  whiteText: '#fefeff',     // customNearWhite
};

import { chartData } from './line_data';
export default function LineGraph() {
  const data= chartData;
  const [options, setOptions] = useState();
useEffect(() => {
  setOptions({
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: customColors.grayText,
          font: { family: 'Inter', size: 12 }
        }
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: customColors.border,
        titleColor: customColors.whiteText,
        bodyColor: customColors.grayText,
        borderColor: customColors.grayText,
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        ticks: {
          color: customColors.grayText,
          font: { size: 11 }
        },
        grid: {
          color: 'rgba(255,255,255,0.05)', // regular grid lines
          drawBorder: false
        }
      },
      y: {
        display: false,
        grid: {
          display: false
        }
      }
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 6,
        hitRadius: 10,
        backgroundColor: customColors.income,
        borderColor: customColors.background,
        borderWidth: 2,
      },
      line: {
        tension: 0.4,
        borderWidth: 2
      }
    }
  });
}, []);



  return (
    <div className="max-w-sm w-full bg-white dark:bg-[#242933] rounded-lg shadow-sm p-4 md:p-6">
      <div className="flex justify-between mb-5">
        <h2 className="text-gray-900 dark:text-[#fefeff] text-lg font-semibold">Weekly Finance Report</h2>
        <span className="text-sm text-gray-500 dark:text-customLavender">Last 7 Days</span>
      </div>

      {data && options ? (
        <Line data={data} options={options} />
      ) : (
        <p className="text-sm text-gray-400">Loading chart...</p>
      )}

      <div className="pt-5">
        <button className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg focus:outline-none">
          View Full Report
        </button>
      </div>
    </div>
  );
}
