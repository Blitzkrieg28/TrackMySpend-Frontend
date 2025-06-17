// App.jsx

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import logo from "./assets/budgeting.gif";
import { lazy, useEffect, useState,Suspense } from "react";
import { AnimatedHeading } from "./components/AnimatedHeading";
import Splash from "./components/SplashScreen";

const Landing= lazy(() => import('./pages/Landing'));
const Signin= lazy(() => import('./pages/Signin'));
const Signup= lazy(() => import('./pages/Signup'));


function App() {
 
  const [showSplash,setShowSplash]= useState(true);
   
  useEffect(function(){
  const timer= setTimeout(function(){
    setShowSplash(false)
  },3000)

  return function(){
    clearTimeout(timer);
  }
  },[]);


  if(showSplash){
    return <Splash/>
    }


  return (
  <>
  <BrowserRouter>
    <Routes>
       <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/" element={<Suspense fallback={<Splash />}><Landing /></Suspense>}/> 
        <Route path="/signin" element={<Suspense fallback={<Splash />}><Signin/></Suspense>}></Route>
        <Route path="/signup" element={<Suspense fallback={<Splash/>}><Signup/></Suspense>}></Route>  
         </Routes>
  </BrowserRouter>
  
  
  </>
  );
}

export default App;
