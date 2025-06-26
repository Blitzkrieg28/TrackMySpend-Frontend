import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { TypeAnimation } from 'react-type-animation';
import { toast } from "react-toastify";
import { subscribeToPush } from "../utils/subscibeTopush";

export default function InputFormModal1({ isOpen, onClose }) {
  if (!isOpen) return null;
  const [subscriptionId, setSubscriptionId] = useState(null);

   const [showButton, setShowButton] = useState(false);
   const [to,setTo]= useState("");
   const [amount,setAmount]= useState(0);
   const [category,setCategory]= useState("");
   const [date,setDate]= useState("");
   const [time,setTime]= useState("");
   const [count,setCount]= useState(0);
const [incomeId, setIncomeId] = useState(null);


 

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center ">
      <motion.div

        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white dark:bg-customBlack p-6 rounded-xl shadow-lg w-full max-w-md  max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-customLavender">ADD EXPENSE</h2>
        <div className="h-px w-80 flex mx-auto bg-[#8e8e8e] mb-6"></div>

        <div className="flex justify-start pb-4">
            <TypeAnimation
  sequence={[
    'Manually enter the info!!..',
  ]}
  wrapper="p"
  cursor={true}
  repeat={0}       // Only once
  className="text-base font-segoe text-gray-700 dark:text-gray-300"
/>
        </div>
       <div className="flex justify-start gap-2  items-center">
        <p className="pb-2 font-bold text-lg text-segoe" >To:</p>
        <input
          type="text"
          placeholder="Sending to.."
          className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
          required
          onChange={(e) => {setTo(e.target.value)}}
        />
        </div>
        <div className="flex justify-start gap-2  items-center">
        <p className="pb-2 font-bold text-lg text-segoe" >Amount:</p>
        <input
          type="number"
          placeholder="Amount Spend"
          className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
          required
          onChange={(e) => {setAmount(e.target.value)}}
        />
        </div>
        <div className="flex justify-start gap-2  items-center">
        <p className="pb-2 font-bold text-lg text-segoe" >Date:</p>
        <input
          type="date"
          placeholder="On which date?"
          className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
          required
          onChange={(e)=>{setDate(e.target.value)}}
        />
        </div>
        <div className="mb-4 w-full">
  <div className="flex items-baseline gap-2 mb-1">
    <label htmlFor="time" className="text-lg font-bold text-segoe text-gray-700 dark:text-gray-200">
      Time:
    </label>
    <span className="text-sm text-gray-500">(optional)</span>
  </div>
  <input
    type="time"
    id="time"
    className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
    onChange={(e) => {setTime(e.target.value)}}
  />
</div>

        <div className="flex justify-start gap-2  items-center">
        <p className="pb-2 font-bold text-lg text-segoe" >Category:</p>
        <input
          type="text"
          placeholder="classify it!"
          className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
          required
          onChange={(e) => {setCategory(e.target.value)}}
        />
        </div>

        <div className="flex justify-start gap-2  items-center">
        <p className="pb-2 font-bold text-lg text-segoe" >Count:</p>
        <input
          type="number"
          placeholder="how many times?"
          className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
          required
          onChange={(e)=>{setCount(e.target.value)}}
        />
        </div>
        
        <div className="flex justify-center gap-3 pt-4">
          
          <button className=" dark:bg-customLavender bg-[#8e8e8e] text-white px-4 py-2 rounded hover:bg-[#737373] hover:dark:bg-[#825ec9]"
                onClick={async () => {
    try {
      const response = await axios.post(
        "https://trackmyspendapi-3.onrender.com/expense/addexpense",
        {
          to: to,
          amount: Number(amount),
          category: category,
          date: date,
          time: time,
          count: Number(count),
        }
      );
      toast.success("Expense added successfully!");
            setIncomeId(response.data._id || response.data.expense._id); 

            //onClose();
    } catch (err) {
      console.error("Add expense error:", err);
      toast.error(
        "Failed to add expense, please try again."
      );
    }
  }}
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <div className="flex justify-center pt-2">
            
</div>

        </div>
        <div className="mt-6">
        <TypeAnimation
  sequence={[
    ' you can also set a reminder for your future expenditure!!',
      () => setShowButton(true)
  ]}
  wrapper="p"
  cursor={true}
  repeat={0}       // Only once
  className="text-base font-segoe text-gray-700 dark:text-gray-300 pb-2"
/>

<button
  className="dark:bg-customLavender bg-[#8e8e8e] text-white px-4 py-2 rounded hover:bg-[#737373] hover:dark:bg-[#825ec9] mt-3"
  onClick={async () => {
    try {
      // 1️⃣ Subscribe to push and grab the ID
      const { subscriptionId } = await subscribeToPush();
      setSubscriptionId(subscriptionId);

      // 2️⃣ Build the JS Date for the reminder
      const remindAt = new Date(`${date}T${time || "09:00"}`);
      const now = new Date();

      // 3️⃣ Only proceed if remindAt is strictly in the future
      if (remindAt <= now) {
        toast.warn("Please select a future date and time for your reminder.");
        return;
      }

      // 4️⃣ Fire the reminder‐creation call
      await axios.post("https://trackmyspendapi-3.onrender.com/reminder/add", {
        incomeId,
        remindAt,
        subscriptionId,
      });

      toast.success("Reminder set!");
      onClose();
    } catch (err) {
      console.error("Failed to set reminder:", err);
      toast.error("Failed to set reminder");
    }
  }}
>
  🔔 Set Reminder
</button>
</div>


        <div className="flex items-center gap-4 my-4 ">
  <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
  <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
  <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
</div>
          <TypeAnimation
  sequence={[
    ' Try our new Auto-filling feature which fills the form just by using payment screenshot...',
      () => setShowButton(true)
  ]}
  wrapper="p"
  cursor={true}
  repeat={0}       // Only once
  className="text-base font-segoe text-gray-700 dark:text-gray-300 pb-2"
/>

{showButton && (
        <button className=" dark:bg-customLavender bg-[#8e8e8e] text-white px-4 py-2 rounded hover:bg-[#737373] hover:dark:bg-[#825ec9]">
            Try-Now
          </button>
      )}

      </motion.div>
    </div>
  );
}
