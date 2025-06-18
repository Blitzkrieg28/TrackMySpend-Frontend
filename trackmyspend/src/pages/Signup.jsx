import { useState } from "react";
import Input from "../components/Input";
import Input1 from "../components/Input1";
import { useNavigate } from "react-router-dom";
import Splash from "../components/SplashScreen";

export default function Signin(){
    const [showsplash,setShowSplash]= useState(false);
    const navigate= useNavigate();

    const handlestart4= function(){
        setShowSplash(true);
        setTimeout(()=>{
         navigate("/signin");
        },3000)
    }
    if(showsplash) return <Splash/>
    return <div className="flex min-h-screen justify-center items-center bg-[#e8e8e8]">
        <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg">
            <h1 className="pb-6 text-4xl text-center">Sign-up</h1>
            <div className="h-0.5 bg-[#e8e8e8] w-full mb-4"></div>
           <Input1 onGetStarted={handlestart4}/>

        </div>
    </div>
}