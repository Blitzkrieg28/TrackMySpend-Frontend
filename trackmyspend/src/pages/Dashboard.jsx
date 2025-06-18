// App.jsx
import { useState, useEffect } from "react";
import NavbarComponent from "../components/navbar";
import Component from "../components/sidebar";
import ThemeToggle from "../components/Themetoggle";
import Input from "../components/Input";
import LineGraph from "../components/line";
import { Button } from "../components/Button";

function Dashboard() {
 
  
  return (
   <div className="min-h-screen flex flex-col bg-[#e8e8e8] dark:bg-customDarkBlue text-customIndigoDark dark:text-custom1Blue transition-all">
  
  {/* Navbar at top */}
  <NavbarComponent />

  {/* Body: Sidebar + Main content */}
  <div className="flex">
    
    {/* Sidebar */}
    <Component />

    {/* Main Content Area */}
    <main className="flex-2 p-6">
      {/* Your Card */}
      <div className="rounded-xl shadow-md border border-customLavender dark:border-custom1Blue bg-white dark:bg-customBlack p-6">
        <h1 className="text-xl text-[#333c4d] font-segoe font-bold dark:text-customLavender">Your Card Content</h1>
        <p className="font-segoe text-[#333c4d] dark:text-[#9fb9d0]">This is the main content area next to the sidebar.</p>
      </div>
    </main>
<div className="flex ">
  {/* Column 1: Two stacked cards */}
  <div className="flex-2 flex flex-col gap-6 p-6">
    {/* Top Card */}
    <div className="rounded-xl shadow-md border border-[#e5e6e7] dark:border-custom1Blue bg-white dark:bg-customBlack p-6">
      <h1 className="text-xl text-[#161616]  dark:text-customLavender">Top Card</h1>
      <p>This is the main content area next to the sidebar.</p>
      <div className="p-3 flex justify-center">
        <Button label="click me"/>
      </div>
    </div>


  {/* Column 2: Single card */}
        <div className="rounded-xl shadow-md border border-customLavender dark:border-custom1Blue bg-white dark:bg-customBlack p-6">

   <LineGraph/>
    </div>
  </div>
</div>
    
    <div className="flex">
    <main className="flex-2 p-6 flex flex-col gap-4">
      {/* Your Card */}
      <div className="rounded-xl shadow-md border border-[#e5e6e7] dark:border-custom1Blue bg-white dark:bg-customBlack p-6">
        <h1 className="text-xl font-semibold dark:text-customLavender">Your Card Content</h1>
        <p>This is the main content area next to the sidebar.</p>
      </div>
    
    <main >
      {/* Your Card */}
      <div className="rounded-xl shadow-md border border-[#e5e6e7] dark:border-custom1Blue bg-white dark:bg-customBlack p-6">
        <h1 className="text-xl font-semibold dark:text-customLavender">Your Card Content</h1>
        <p>This is the main content area next to the sidebar.</p>
        <Input/>
      </div>
    </main>
    </main>
    </div>

    
  </div>
</div>
  );
}

export default Dashboard;
