export default function ProgressBar({currentPage, totalPages}) {
  const progressPercentage = (currentPage / totalPages) * 100;
  return (
    <div className="bg-red-600">
    <div className="h-1 w-full bg-gray-300">
      <div
        style={{ width: `${progressPercentage}%` }}
        className={`h-full ${
          progressPercentage < 70 ? "bg-red-600" : "bg-green-600"
        }`}
      >
        Hi
      </div>
    </div>
    <div className="bg-red-500">
    {currentPage}/{totalPages}
  </div>
  </div>
  );
}
