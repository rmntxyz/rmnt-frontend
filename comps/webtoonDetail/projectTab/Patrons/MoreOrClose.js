import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MoreOrClose({
  noMore,
  show,
  setShow,
  next,
  isLoading,
  restRow,
  address,
}) {
  return (
    <button
      className={`text-white/50 text-sm flex gap-1 items-center justify-center transition-all duration-300 ease-in-out ${
        (noMore && restRow.length === 0) || !address
          ? "hidden"
          : (!noMore && restRow.length === 0) ||
            (noMore && restRow.length > 0 && !show)
          ? "mt-3"
          : "mt-5 sm:mt-6"
      }`}
      onClick={(e) => {
        if (noMore) {
          setShow((show) => !show);
        } else {
          setShow(true);
          next(10);
        }
      }}
    >
      {show && isLoading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </div>
      ) : (
        <div className="flex gap-1 items-center justify-center">
          <span>{show && noMore ? "close" : "more"}</span>
          <FontAwesomeIcon
            icon={show && noMore ? faChevronUp : faChevronDown}
            size="xs"
          />
        </div>
      )}
    </button>
  );
}
