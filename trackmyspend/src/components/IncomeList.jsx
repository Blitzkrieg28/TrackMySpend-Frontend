export default function IncomeListCard({ data, onBack }) {
  return (
    <div className="flex-1 p-6 mb-10  w-full flex justify-center ">
    <div className="w-[500px] rounded-xl shadow-md border bg-white dark:bg-customBlack p-6 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Income List</h2>
        <button
          onClick={onBack}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back
        </button>
      </div>
      
    </div>
    </div>
  );
}
