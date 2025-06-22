import { TypeAnimation } from "react-type-animation";
import LineGraph from "./line";
import { useState,useEffect } from "react";
import axios from "axios";
export default function Analysis({onBack1}){
  const [totals, setTotals] = useState({
    total: 0,
    today: 0,
    yesterday: 0,
    thisMonth: 0,
    lastMonth: 0,
    thisYear: 0,
    lastYear: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();

        const [
          totalRes,
          todayRes,
          yesterdayRes,
          monthRes,
          lastMonthRes,
          yearRes,
          lastYearRes
        ] = await Promise.all([
          axios.get(`https://trackmyspendapi-3.onrender.com/income/totalincome?year=${year}`),
          axios.get(`https://trackmyspendapi-3.onrender.com/income/dailytotalincome?day=${day}&month=${month}&year=${year}`),
          axios.get(`https://trackmyspendapi-3.onrender.com/income/dailytotalincome?day=${day - 1}&month=${month}&year=${year}`),
          axios.get(`https://trackmyspendapi-3.onrender.com/income/monthlytotalincome?month=${month}&year=${year}`),
          axios.get(`https://trackmyspendapi-3.onrender.com/income/monthlytotalincome?month=${month - 1}&year=${year}`),
          axios.get(`https://trackmyspendapi-3.onrender.com/income/yearlytotalincome?year=${year}`),
          axios.get(`https://trackmyspendapi-3.onrender.com/income/yearlytotalincome?year=${year - 1}`)
        ]);

        setTotals({
          total: totalRes.data.totalIncome || 0,
          today: todayRes.data.totalDailyIncome || 0,
          yesterday: yesterdayRes.data.totalDailyIncome || 0,
          thisMonth: monthRes.data.totalMonthlyIncome || 0,
          lastMonth: lastMonthRes.data.totalMonthlyIncome || 0,
          thisYear: yearRes.data.totalYearlyIncome || 0,
          lastYear: lastYearRes.data.totalYearlyIncome || 0
        });
      } catch (err) {
        console.error("Error fetching income data:", err);
      }
    };

    fetchData();
  }, []);

  const percentChange = (current, previous) => {
    if (previous === 0) return current === 0 ? 0 : 100;
    return ((current - previous) / previous * 100).toFixed(1);
  };

    return <div className="flex flex-col ">
        <div className="flex justify-between items-center">
        <div></div>
        <div className="flex flex-col mt-3 ">
        <h1 className="text-4xl font-segoe font-semibold  text-center">ANALYSIS</h1>
        <TypeAnimation
  sequence={[
    'Analyze and manage your income...', 1000,
    'Track expenses and plan budgets...', 1000,
    'Stay financially smart with insights.', 1000
  ]}
  wrapper="p"
  className="text-lg font-segoe mt-2"
  repeat={0}
/>
        </div>
        <button className=" dark:bg-customLavender bg-[#8e8e8e] text-white px-4 py-2 rounded hover:bg-[#737373] hover:dark:bg-[#825ec9]"
                onClick={onBack1}
          >
            Back
          </button>
          </div>
          <div className="h-px w-full  bg-[#e8e8e8] mt-6 m-auto"></div>
         <div className="flex  gap-4 px-6 mt-4">
      {/* Total Income Card */}
      <Card
        title="Total Income"
        amount={totals.total}
        desc="this is your total income."
      />

      {/* Today's Income Card */}
      <Card
  title="Today's Income"
  amount={totals.today}
  desc={
    <span>
      <span
        className={
          percentChange(totals.today, totals.yesterday) >= 0
            ? "text-[#228B22]"
            : "text-red-500"
        }
      >
        {percentChange(totals.today, totals.yesterday)}%
      </span>{" "}
      {totals.today >= totals.yesterday ? "more" : "less"} than yesterday.
    </span>
  }
/>


      {/* Month's Income Card */}
      <Card
        title="Month's Income"
        amount={totals.thisMonth}
        desc={
          <span>
            <span
              className={
                percentChange(totals.thisMonth, totals.lastMonth) >= 0
                  ? "text-[#228B22]"
                  : "text-red-500"
              }
            >
              {percentChange(totals.thisMonth, totals.lastMonth)}%
            </span>{" "}
            than the last month
          </span>
        }
      />

      {/* Yearly Income Card */}
      <Card
        title="Yearly Income"
        amount={totals.thisYear}
        desc={
          <span>
            <span
              className={
                percentChange(totals.thisYear, totals.lastYear) >= 0
                  ? "text-[#228B22]"
                  : "text-red-500"
              }
            >
              {percentChange(totals.thisYear, totals.lastYear)}%
            </span>{" "}
            more than the last year.
          </span>
        }
      />
    </div>
  


              <div className="h-px w-96  bg-[#e8e8e8] mt-6 m-auto"></div>
          <main className=" p-6 pr-1">
      {/* Your Card */}
      <div className="flex justify-center w-full h-full rounded-xl w-fixed shadow-md border border-[#8e8e8e] dark:border-custom1Blue bg-[#e8e8e8] dark:bg-customBlack p-3 pt-6 pb-6">
       <LineGraph/>
      </div>
    </main>    

    </div>
}
function Card({ title, amount, desc }) {
  return (
    <main className="flex-2 w-64 rounded-xl shadow-md border border-[#8e8e8e] dark:border-custom1Blue bg-[#e8e8e8] dark:bg-customBlack p-3 pt-6 pb-6">
      <h1 className="text-2xl text-[#8e8e8e] font-segoe font-bold dark:text-customLavender">
        {title}:<span className="text-[#228B22]">₹{amount}</span>
      </h1>
      <p className="font-segoe text-[#333c4d] dark:text-[#9fb9d0]">{desc}</p>
    </main>
  );
}