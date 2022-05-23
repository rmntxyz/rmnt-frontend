export default function ProgressBar({ currentPage, totalPages }) {
  const progressPercentage = (currentPage / totalPages) * 100;

  return (
    <div className="mx-auto w-full]">
      <div className="mx-auto border border-ourBlack h-2.5 rounded-xl">
        <div
          style={{ width: `${progressPercentage}%` }}
          className="h-full bg-ourBlack"
        ></div>
      </div>
      <div className="relative w-full">
        <div className="absolute inset-y-0 right-0 font-bold text-sm m-2 md:m-4 md:text-2xl xl:-right-24 xl:-top-10">
          <span className="text-[#CEA671]">
            {currentPage.toString().length < 2 ? (
              <span>{"0" + currentPage}</span>
            ) : (
              <span>{currentPage}</span>
            )}
          </span>
          <span>
            {totalPages.toString().length < 2 ? (
              <span>/{"0" + totalPages}</span>
            ) : (
              <span>/{totalPages}</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
