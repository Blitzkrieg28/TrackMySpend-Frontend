import { useState, useEffect } from "react";
import NavbarComponent from "../components/navbar";
import Component from "../components/sidebar";
import ThemeToggle from "../components/Themetoggle";
import Input from "../components/Input";
import LineGraph from "../components/line";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import Splash from "../components/SplashScreen";
import ExampleComponent from "../components/TypeAnimation";
import { TypeAnimation } from 'react-type-animation';
import icon1 from "../assets/graph.png";
import icon2 from "../assets/checklist.png"
import InputFormModal from "../components/InputFormModal";
import IncomeListCard from "../components/IncomeList";
import InputForRep from "../components/InputforRep";
import InputForRep1 from "../components/InputForRep1";
export default function Income(){
const [showSplash,setShowSplash]= useState(false);
const [showIncomeList,setShowIncomeList]= useState(false);
 const dummyData = [
    { id: 1, from: "Freelance", amount: 5000, date: "2025-06-18" },
    { id: 2, from: "Gift", amount: 2000, date: "2025-06-19" },
  ];
  const navigate= useNavigate();
const handlestart5 = (link) => {
  setShowSplash(true);       

  setTimeout(() => {
    navigate(link);       
  }, 3000);
};

 const [showModal, setShowModal] = useState(false);
 const [showModal1, setShowModal1] = useState(false);
 const [showModal2, setShowModal2] = useState(false);
 const [showModal3, setShowModal3] = useState(false);


  const handleImageClick = () => {
    setShowModal(!showModal);
  };
   const handleImageClick1 = () => {
    setShowModal1(!showModal1);
  };
   const handleImageClick2 = () => {
    setShowModal2(!showModal2);
  };
   const handleImageClick3 = () => {
    setShowModal3(!showModal3);
  };
  

  

  if(showSplash) return <Splash/>
  return (
   <div className="min-h-screen flex flex-col bg-[#e8e8e8] dark:bg-customDarkBlue text-customIndigoDark font-segoe dark:text-custom1Blue transition-all">
  
  {/* Navbar at top */}
  <NavbarComponent />

  {/* Body: Sidebar + Main content */}
  <div className="flex">
    
    {/* Sidebar */}
<Component getstarted={handlestart5} />

    {/* Main Content Area */}
    { showIncomeList
  ? (
    // --- IncomeListCard component goes here ---
    <IncomeListCard
      onBack={() => setShowIncomeList(false)}
      data={dummyData} 
      /* pass your list data or fetch here */
    />
  ) :(
    <main className="flex-1 p-6 mb-10  flex justify-center ">
      {/* Your Card */}
      <div className=" flex flex-col mb-10 items-center w-[500px] rounded-xl shadow-md border border-customLavender bg-white dark:bg-customBlack p-6 transition-color">
        <h1 className="text-3xl text-[#333c4d] font-segoe font-bold dark:text-customLavender pb-2">Report</h1>
        <p className="font-segoe text-lg text-[#333c4d] dark:text-[#9fb9d0]">
  <TypeAnimation
    sequence={[
    "Wondering where all your rupees went?",
    2000,
    "Let’s break it down—choose a report type below!"
  ]}
    wrapper="span"
    cursor={true}
    repeat={0}
    style={{ fontSize: 'inherit', display: 'inline-block' }}
  />
</p>

{/* divider */}
<div className="mt-8 h-px w-full bg-[#8e8e8e] mb-10"></div>

{/* 2×2 grid of actions */}
<div className="relative grid grid-cols-2 grid-rows-2 gap-x-8 gap-y-10 justify-items-center mt-10">

  {/* Vertical Line in Center */}
  <div className="absolute inset-y-0 left-1/2 w-px bg-[#8e8e8e] transform -translate-x-1/2"></div>

  {/* Horizontal Line in Center */}
  <div className="absolute inset-x-0 top-1/2 h-px bg-[#8e8e8e] transform -translate-y-1/2"></div>

  {/* Top Left */}
  <div className="text-center cursor-pointer" onClick={handleImageClick}>
    <img src={icon1} alt="Add Income" className="w-16 h-16 mx-auto" />
    <p className="mt-2 text-sm text-gray-600 dark:text-customLavender">Monthly Report</p>
    <InputForRep isOpen={showModal} onClose={() => setShowModal(!showModal)} />
  </div>

  {/* Top Right */}
  <div className="text-center cursor-pointer" onClick={handleImageClick1}>
    <img src={icon2} alt="View Incomes" className="w-16 h-16 mx-auto" />
    <p className="mt-2 text-sm text-gray-600 dark:text-customLavender">View Incomes</p>
      <InputForRep1 isOpen={showModal1} onClose={() => setShowModal1(!showModal1)} />

  </div>

  {/* Bottom Left */}
  <div className="text-center cursor-pointer" onClick={handleImageClick2}>
    <img src="#" alt="Option 3" className="w-16 h-16 mx-auto" />
    <p className="mt-2 text-sm text-gray-600 dark:text-customLavender">Option 3</p>
        <InputForRep isOpen={showModal2} onClose={() => setShowModal2(!showModal2)} />

  </div>

  {/* Bottom Right */}
  <div className="text-center cursor-pointer" onClick={handleImageClick3}>
    <img src="#" alt="Option 4" className="w-16 h-16 mx-auto" />
    <p className="mt-2 text-sm text-gray-600 dark:text-customLavender">Option 4</p>
          <InputForRep isOpen={showModal3} onClose={() => setShowModal3(!showModal3)} />

  </div>
</div>


      </div>
    </main>
  )
}
    </div>

    </div>
)
}