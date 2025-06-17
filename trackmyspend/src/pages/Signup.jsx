import Input from "../components/Input";
import Input1 from "../components/Input1";

export default function Signin(){
    return <div className="flex min-h-screen justify-center items-center bg-[#e8e8e8]">
        <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg">
            <h1 className="pb-6 text-4xl text-center">Sign-up</h1>
            <div className="h-0.5 bg-[#e8e8e8] w-full mb-4"></div>
           <Input1/>

        </div>
    </div>
}