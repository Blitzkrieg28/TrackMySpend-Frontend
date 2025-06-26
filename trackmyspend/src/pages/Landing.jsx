import React, { useEffect, useState } from "react";
import irregularImg from "../assets/Screenshot-2025-06-17-013357.png"; // adjust path if needed
import NavbarComponent from "../components/navbar"; // ensure correct casing
import { Button } from "../components/Button";
import { motion } from "framer-motion";
import { Navbar1 } from "../components/navbar1";
import { Buttonfornav } from "../components/Buttonfornav";
import { FooterComponent } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Splash from "../components/SplashScreen";

export default function Landing() {
    const navigate= useNavigate();
    const [showSplash,SetShowSplash]= useState(false);

    const handlestart= function(){
        SetShowSplash(true);
        setTimeout(() => {
      navigate("/signin");
    }, 3000); 
    }
    const handlestart2= function(){
        SetShowSplash(true);
        setTimeout(() => {
      navigate("/signup");
    }, 3000); 
    }
    if (showSplash) return <Splash />;

  return (
    <div className="bg-[#e8e8e8] dark:bg-customDarkBlue h-screen">
      {/* Navbar at top */}
      <Navbar1 onGetstarted= {handlestart} onGetstarted2={handlestart2}/>
   <section className="h-screen bg-[#e8e8e8] pb-20">
      {/* Centered card */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="bg-white rounded-3xl shadow-lg max-w-6xl w-full flex flex-col md:flex-row p-10 gap-10">
         {/* Left Section */}
<motion.div
  className="flex-1 space-y-5"
  initial="hidden"
  whileInView="show"
  viewport={{ once: false, amount: 0.2 }}
  transition={{ staggerChildren: 0.2 }}
  variants={{
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }}
>
  {/* Heading */}
  <motion.h2
    className="text-3xl font-segoe font-bold text-[#333c4d] dark:text-[#9fb9d0]"
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.6 }}
  >
TrackMySpend
  </motion.h2>

  {/* Description */}
  <motion.p
    className="font-segoe font-semibold text-[#333c4d] dark:text-[#9fb9d0]"
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.6 }}
  >
    TrackMySpend is your personal finance sidekick, built to simplify money management and empower smarter decisions. In just a few taps, you can record every rupee you earn and spend, set flexible budgets that evolve with your needs, and generate insightful reports that shine a light on your financial habits. Whether you’re mapping out monthly goals or tracking long‑term milestones, TrackMySpend puts clarity and control at your fingertips. Say goodbye to guesswork and hello to a healthier financial future.
  </motion.p>

  {/* List Items */}
  <ul className="space-y-3 font-segoe text-[#333c4d] dark:text-[#9fb9d0]">
    {[
      "Quickly log transactions with intuitive forms, categories, and tags—so you always know exactly where your money goes.",
      "Create and adjust budgets in real time, receive alerts when you’re nearing limits, and keep spending aligned with your goals.",
      "Visualize trends with charts and summaries, compare periods, and uncover saving opportunities through easy-to-read dashboards."
      
    ].map((item, index) => (
      <motion.li
        key={index}
        className="flex items-center space-x-3"
        variants={{
          hidden: { opacity: 0, x: -20 },
          show: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.5 }}
      >
        <span className="w-3 h-3 bg-red-400 rounded-full" />
        <span className="text-gray-700">{item}</span>
      </motion.li>
    ))}
  </ul>

  {/* Button */}
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.6 }}
  >
    <Button label="Get-Started!!" trynow={handlestart2} />
  </motion.div>
</motion.div>

          <motion.div
  className="flex-1 flex justify-center items-center"
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: false, amount: 0.2 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <img
    src={irregularImg}
    alt="Irregular Expenses"
    className="max-w-md w-full rounded-lg shadow-md"
  />
</motion.div>

        </div>
      </div>
      </section>
 <section className="h-screen bg-[#e8e8e8] ">
  <div className="flex flex-col items-center justify-center px-6 bg-[#e8e8e8]">
    {/* Card Wrapper */}
    <div className="mt-10 p-6 rounded-3xl shadow-lg max-w-6xl w-full   bg-white dark:bg-customBlack ">
      
      {/* Heading inside the card wrapper */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-segoe font-bold text-[#333c4d] dark:text-[#9fb9d0]">Features</h2>
      </div>

     {/* Cards Grid */}
<motion.div
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
  initial="hidden"
  whileInView="show"
  viewport={{ once: false, amount: 0.2 }}
  transition={{ staggerChildren: 0.2 }}
  variants={{
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }}
>
  {/* Card Variants */}
  {[
    {
      title: "Expense Tracking",
      desc: [
        "Log every purchase and outgoing payment in seconds with customizable categories and tags.",
        "Gain real‑time visibility into your spending habits to curb unnecessary expenses.",
      ],
    },
    {
      title: "Income Management",
      desc: [
        "Record all your income sources—salary, freelance gigs, investments—effortlessly.",
        "Track inflows over time to see how your earnings grow and diversify.",
      ],
    },
    {
      title: "Budget Planner",
      desc: [
        "Set up monthly or project‑based budgets that adapt as your needs change.",
        "Receive alerts before you breach limits, keeping you on track with your financial goals.",
      ],
    },
    {
      title: "Advanced Reports",
      desc: [
        "Generate detailed charts and summaries to visualize trends across any period.",
        "Compare past performance, spot anomalies, and identify saving opportunities at a glance.",
      ],
    },
    {
      title: "Reminder System",
      desc: [
        "Schedule custom reminders for bill payments, subscriptions, and financial milestones.",
        "Never miss a due date again with timely notifications delivered straight to your device.",
      ],
    },
  ].map((item, i) => (
    <motion.div
      key={i}
      className="flex flex-col rounded-xl shadow-md border border-customLavender dark:border-custom1Blue bg-white dark:bg-customBlack p-6"
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="text-xl font-bold font-segoe">{item.title}</h1>
      <ul className="flex-grow list-disc list-inside mt-2 font-segoe text-[#333c4d] dark:text-[#9fb9d0]">
        {item.desc.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
      <div className="flex justify-center mt-4">
        <Buttonfornav label="Try now" />
      </div>
    </motion.div>
  ))}
</motion.div>

    </div>
  </div>
</section>

<section className="bg-[#e8e8e8] ">
    <div className="bg-[#e8e8e8] mt-20">
    <FooterComponent/>
    </div>
</section>
    </div>
  );
}
