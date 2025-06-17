export function Button({label,trynow}){
          return  <button
          className="
            px-2 py-1 text-xs
            sm:px-3 sm:py-1.5 sm:text-sm
            md:px-4 md:py-2 md:text-base
            lg:px-5 lg:py-2.5 lg:text-lg
            xl:px-6 xl:py-3 xl:text-xl
            border border-gray-500 text-[#f9fafb] rounded hover:bg-[#e8e8e8] hover:text-[#333c4d] bg-[#333c4d]
            dark:text-white dark:border-gray-400 dark:bg-customLavender dark:hover:bg-customDarkBlue
            transition
          "
          onClick={trynow}
        >
          {label}
        </button>
}