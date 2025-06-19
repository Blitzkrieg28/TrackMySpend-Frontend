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

  const handleImageClick = () => {
    setShowModal(true);
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
        <h1 className="text-3xl text-[#333c4d] font-segoe font-bold dark:text-customLavender pb-2">INCOME</h1>
        <p className="font-segoe text-lg text-[#333c4d] dark:text-[#9fb9d0]">
  <TypeAnimation
    sequence={[
      'Did someone gave you money?!  add here...',
      2000,
      'or you got a suprising gift?'
    ]}
    wrapper="span"
    cursor={true}
    repeat={0}
    style={{ fontSize: 'inherit', display: 'inline-block' }}
  />
</p>

<div className=" mt-8 h-px w-full bg-[#8e8e8e] mb-10"></div>
<div className="flex justify-center items-center gap-24 mt-20">
  <div className="text-center">
  <img src={icon1} className="w-16 h-16 mx-auto cursor-pointer" onClick={handleImageClick}></img>
    <p className="mt-2 text-sm text-gray-600 dark:text-customLavender">Add Income</p>
<InputFormModal isOpen={showModal} onClose={() => setShowModal(false)} />

  </div>
    <div className="w-px h-32 bg-[#8e8e8e]"></div> 
<div className="text-center">
  <img src={icon2} className="w-16 h-16 mx-auto cursor-pointer" onClick={()=> setShowIncomeList(true)} ></img>
  <p className="text-sm mt-2 text-gray-600 dark:text-customLavender" >View Incomes</p>
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