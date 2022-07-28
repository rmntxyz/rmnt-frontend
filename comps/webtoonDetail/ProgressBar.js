export default function ProgressBar({ currentPage, totalPages }) {
  const progressPercentage = (currentPage / totalPages) * 100;

  return (
    <div className="mx-auto w-full]">
      <div className="mx-auto border border-ourBlack h-2.5 rounded-xl">
        <div
          style={{ width: `${progressPercentage}%` }}
          className="h-full bg-ourBlack rounded-xl duration-200"
        ></div>
      </div>
      <div className="relative w-full">
        <div className="absolute inset-y-0 right-0 font-bold text-sm m-2 md:m-4 md:text-lg xl:-right-24 xl:-top-10">
          <span className="text-[#CEA671]">
            {currentPage.toString().length < 2
              ? "0" + currentPage
              : currentPage}
          </span>
          <span>
            {totalPages.toString().length < 2
              ? "/0" + totalPages
              : "/" + totalPages}
          </span>
        </div>
      </div>
    </div>
  );
}
