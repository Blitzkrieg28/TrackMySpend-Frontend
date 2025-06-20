import axios from "axios";
import { useEffect, useState } from "react";
import logo1 from '../assets/search .png';
import logo2 from '../assets/filter.png';
export default function IncomeListCard({ data, onBack }) {
   const [incomes, setIncomes] = useState([]);

  useEffect(()=> {
     axios.get("https://trackmyspendapi-3.onrender.com/income/viewincome")
     .then((res) => {setIncomes(res.data.incomelist)})
      .catch((err) => console.error(err));

  },[])

  const [totalIncome,setTotalIncome]= useState(0);

  useEffect(()=>{
  axios.get("https://trackmyspendapi-3.onrender.com/income/totalincome")
         .then((res) => {setTotalIncome(Number(res.data.totalIncome))})
         .catch((err) => console.error(err));

  },[]);
const [query, setQuery] = useState("");
const [searchBy, setSearchBy] = useState("from"); // or 'category'
const [filterBy, setFilterBy] = useState(""); // one of the filter types
useEffect(() => {
  if (query === "") {
    axios
      .get("https://trackmyspendapi-3.onrender.com/income/viewincome")
      .then((res) => setIncomes(res.data.incomes || res.data.incomelist || []))
      .catch((err) => console.error(err));
  }
}, [query]);

 const handleSearch = () => {
  console.log("Query:", query);

  axios
    .get(`https://trackmyspendapi-3.onrender.com/category/viewincomecategory?category=${query}`)
    .then((res) => {
      console.log("API response:", res.data);
      setIncomes(res.data.categories || []); // Adjust if key is renamed
    })
    .catch((err) => console.error("Search error:", err));
};
const [showFilter, setShowFilter] = useState(false);
const [month, setMonth] = useState("");
const [year, setYear] = useState("");
const [day, setDay] = useState("");
const applyFilter = () => {
  const params = {};
  if (month) params.month = month;
  if (year) params.year = year;
  if (day) params.day = day;

  const queryString = new URLSearchParams(params).toString();

  axios
    .get(`https://trackmyspendapi-3.onrender.com/category/filter?${queryString}`)
    .then((res) => {
      setIncomes(res.data.filtered || []);
      setShowFilter(false);
    })
    .catch((err) => console.error(err));
};

  return (
    <div className="flex-1 p-6 mb-10  w-full flex justify-center ">
    <div className="w-full rounded-xl shadow-md border bg-white dark:bg-customBlack p-6 ">
     <div className="flex flex-col">
        
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Income List</h2>
        <button
          onClick={onBack}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back
        </button>
    </div>
        <div className="mt-4 mb-4 flex flex gap-4 items-center justify-center">
  {/* Search Bar */}
  <div className="flex gap-2 w-full max-w-xl">
    <input
      className="pl-2 border rounded w-full border-[#8e8e8e] h-10 dark:bg-gray-800 dark:text-white"
      placeholder="Search by category.."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    
    <button
      onClick={handleSearch}
      className="bg-[#8e8e8e] hover:bg-[#6e6e6e] text-white rounded px-4 h-10"
    >
      Search
    </button>
  </div>

  {/* Filter Dropdown */}
 <button onClick={() => setShowFilter(!showFilter)}>
  <img src={logo2} alt="Filter" className="w-10 h-10" />
</button>

{showFilter && (
  <div className="fixed top-20 right-10 p-4 bg-white dark:bg-gray-800 border rounded shadow-md z-50">
    <div className="flex flex-col gap-3">
      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
      >
        <option value="">Select Month</option>
        {[
          "01", "02", "03", "04", "05", "06",
          "07", "08", "09", "10", "11", "12"
        ].map((m, i) => (
          <option key={m} value={m}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Year (e.g. 2025)"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
      />

      <input
        type="text"
        placeholder="Day (e.g. 15)"
        value={day}
        onChange={(e) => setDay(e.target.value)}
        className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
      />

      <div className="flex gap-2 justify-center">
        <button
          onClick={applyFilter}
          className="bg-[#8e8e8e] text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Apply Filter
        </button>
       
      </div>
    </div>
  </div>
)}

</div>

       <div> 
        <table className="w-full table-fixed ">
        <thead>
          <tr>
             <th className="px-4 py-2 border-b text-left text-gray-700 dark:text-gray-200">
        Sr.No.
      </th>
            {["Source", "Amount", "Category", "Date", "Time", "Count"].map((h) => (
              <th
                key={h}
                className=" px-4 py-2 border-b text-left text-gray-700 dark:text-gray-200"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
       <tbody>
          {incomes.map((inc,idx) => (
            <tr
              key={inc._id}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
            <td className="px-4 py-2 border-b">{idx + 1}</td>

              <td className="px-4 py-2 border-b">{inc.from}</td>
              <td className="px-4 py-2 border-b">{inc.amount}</td>
              <td className="px-4 py-2 border-b">{inc.category}</td>
              <td className="px-4 py-2 border-b">{inc.date}</td>
              <td className="px-4 py-2 border-b">{inc.time || "—"}</td>
              <td className="px-4 py-2 border-b">{inc.count}</td>
            </tr>
          ))}
        </tbody>
        </table>
       </div>
        <div className="mt-20">
            <div className="flex text-3xl justify-center gap-4 text-center ml-20">
            <h1 className="">Total Income:</h1>
            <h1>₹{totalIncome.toLocaleString("en-IN")}</h1>

            </div>
        </div>
      </div>
      
    </div>
    </div>
  );
}
