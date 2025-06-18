import { useState } from "react";
import { HiMail } from "react-icons/hi";
import EmailInput from "./EmailInput";
import { PasswordInput } from "./PasswordInput";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { NameInput } from "./NameInput";
import { ConfirmPasswordInput } from "./ConfirmPassword";

export default function Input1({onGetStarted}) {
    const [password,setPassword]= useState("");

  return (
    <div className="flex flex-col justify-center items-center">
      <NameInput/>
      <EmailInput/>
      <PasswordInput password={password} setPassword={setPassword} />
      <ConfirmPasswordInput password={password} />

      <div className="pt-2 pb-6 font-segoe">Already Registered? <Link to="/signin">Click Here!</Link> </div>
      <Button label="Signup" trynow={onGetStarted}/>
    </div>
  );
}
