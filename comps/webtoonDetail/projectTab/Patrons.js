import { use, useEffect, useState } from "react";
import ShowOrClose from "../../../utils/showOrClose";
import PatronCard from "./PatronCard";
import { useHolders } from "../../../utils/useHolders";
import { EmptyPatronCard } from "./EmptyPatronCard";
import { Loading } from "../../../utils/svgs";

export default function Patrons({ address }) {
  //Set loading for patron cards
  const [loading, setLoading] = useState(true);

  //Toggle the "more/close" button
  const [show, setShow] = useState(false);

  const { holders, noMore, next, isLoading } = useHolders(address, 100, 7);

  const [firstRow, setFirstRow] = useState(["first", "empty", "empty"]);
  const [secondRow, setSecondRow] = useState([
    "empty",
    "empty",
    "empty",
    "empty",
  ]);
  const [restRow, setRestRow] = useState([]);
  useEffect(() => {
    for (let i = 0; i < holders.length; i++) {
      if (i < 3) {
        setFirstRow((prev) => {
          const newArr = [...prev];
          newArr[i] = holders[i];
          return newArr;
        });
      } else if (i < 7) {
        setSecondRow((prev) => {
          const newArr = [...prev];
          newArr[i - 3] = holders[i];
          return newArr;
        });
      } else {
        setRestRow((prev) => {
          const newArr = [...prev];
          newArr[i - 7] = holders[i];
          return newArr;
        });
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [holders]);

  return (
    <div className="mt-7 flex flex-col">
      <div className="text-2xl font-bold">Patrons</div>
      <div className="mt-3">
        The order of the patrons' list is determined by time of support.
      </div>
      <div className="w-full h-px my-6 bg-white/10"></div>
      <div className="flex flex-col gap-3 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {firstRow.map((item, idx) =>
            !item || item === "empty" ? (
              <EmptyPatronCard
                key={idx}
                idx={idx}
                loading={isLoading || loading}
              />
            ) : item === "first" && idx === 0 ? (
              <EmptyPatronCard
                key={idx}
                idx={idx}
                textOne="Be the first"
                textTwo="patron!"
                loading={isLoading || loading}
              />
            ) : (
              <PatronCard key={idx} item={item} />
            )
          )}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {secondRow.map((item, idx) =>
            !item || item === "empty" ? (
              <EmptyPatronCard
                key={idx + 3}
                idx={idx + 3}
                loading={isLoading || loading}
              />
            ) : (
              <PatronCard key={idx + 3} item={item} />
            )
          )}
        </div>

        <div
          className={`grid grid-cols-5 gap-3 ${show ? "visible" : "hidden"}`}
        >
          {restRow.map((item, idx) =>
            !item && show ? (
              <EmptyPatronCard
                key={idx + 3}
                idx={idx + 3}
                loading={isLoading || loading}
              />
            ) : (
              <PatronCard key={idx + 7} item={item} />
            )
          )}
        </div>
        {isLoading && show && (
          <div className="flex items-center justify-center mt-6">
            <svg
              className="animate-spin -ml-1 mr-3 h-6 w-6"
              viewBox="0 0 24 24"
            >
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
            Loading more...
          </div>
        )}
      </div>
      <div
        className={`${
          (noMore && restRow.length === 0) || !address
            ? "hidden"
            : "flex items-center justify-center"
        }`}
      >
        <ShowOrClose
          noMore={noMore}
          show={show}
          setShow={setShow}
          next={next}
        />
      </div>
    </div>
  );
}
