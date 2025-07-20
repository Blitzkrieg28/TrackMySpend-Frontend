export function Button({label, trynow}){
    return (
        <button
            className="
                px-6 py-3 text-base font-semibold
                bg-customBlue hover:bg-customBlue/80
                text-white rounded-xl shadow-lg
                hover:shadow-xl transform hover:scale-105
                transition-all duration-300 ease-out
                focus:outline-none focus:ring-2 focus:ring-customBlue focus:ring-offset-2
            "
            onClick={trynow}
        >
            {label}
        </button>
    );
}