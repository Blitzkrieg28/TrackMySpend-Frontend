import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Buttonfornav } from "./Buttonfornav";

export function Navbar1({onGetstarted,onGetstarted2}){
    const navigate= useNavigate();
  return <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-md">
    <h1 className="text-2xl">TrackMySpend</h1>
     <div className="flex gap-4">
       <Buttonfornav label="Sign-in" onClick={onGetstarted}/>
       <Buttonfornav label="Get Started" onClick={onGetstarted2}/>
     </div>
  </div>


}