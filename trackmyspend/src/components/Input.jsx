import { useState } from "react";
import { HiMail } from "react-icons/hi";

export default function Input() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const isValid = email.includes("@");

  return (
    <div className="flex max-w-md flex-col gap-6">
      <div>
        <label
          htmlFor="email"
          className={`block mb-2 text-sm font-medium ${
            touched && isValid ? "text-[#addfad]" : touched ? "text-red-700" : "text-gray-700"
          }`}
        >
          Your Email
        </label>

        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <HiMail className="w-5 h-5" />
          </span>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onFocus={() => setTouched(true)}
            onBlur={() => setTouched(true)}
            onInput={(e) => setEmail(e.target.value)}
            className={`pl-10 p-2.5 w-full text-sm rounded-lg border shadow-sm
              ${
                touched
                  ? isValid
                    ? "border-[#addfad] text-[#addfad] focus:ring-[#addfad] focus:border-[#addfad]"
                    : "border-red-500 text-red-700 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              }
              bg-white dark:bg-customBlack dark:text-white dark:placeholder-gray-400 dark:border-gray-600
              dark:focus:ring-customLavender dark:focus:border-customLavender
            `}
            required
          />
        </div>

        {touched && (
          <p
            className={`mt-1 text-sm ${
              isValid ? "text-[#addfad]" : "text-red-600"
            }`}
          >
            {isValid ? (
              <>
                <span className="font-medium">Success!</span> Email is valid!
              </>
            ) : (
              <>
                <span className="font-medium">Oops!</span> Please enter a valid email.
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
