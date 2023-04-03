import { use, useEffect, useState } from "react";
import ShowOrClose from "../../../utils/showOrClose";
import PatronCard from "./PatronCard";
import { useHolders } from "../../../utils/useHolders";
import { EmptyPatronCard } from "./EmptyPatronCard";

export default function Patrons({ address }) {
  //Set loading for loading views
  const [loading, setLoading] = useState(true);

  //Toggle the "more/close" button
  const [show, setShow] = useState(false);

  const { holders, noMore, next } = useHolders(address, 100, 7);

  const [firstRow, setFirstRow] = useState(['empty', 'empty', 'empty']);
  const [secondRow, setSecondRow] = useState(['empty', 'empty', 'empty', 'empty']);
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
              <EmptyPatronCard key={idx} idx={idx} loading={loading} />
            ) : item === "next" && idx === 0 ? (
              <EmptyPatronCard
                key={idx}
                idx={idx}
                textOne="Be the first"
                textTwo="patron!"
              />
            ) : item === "next" && idx !== 0 ? (
              <EmptyPatronCard
                key={idx}
                idx={idx}
                textOne="Be the next"
                textTwo="patron!"
              />
            ) : (
              <PatronCard key={idx} item={item} />
            )
          )}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {secondRow.map((item, idx) =>
            !item || item === "empty" ? (
              <EmptyPatronCard key={idx + 3} idx={idx + 3} loading={loading} />
            ) : item === "next" ? (
              <EmptyPatronCard
                key={idx + 3}
                idx={idx + 3}
                textOne="Be the next"
                textTwo="patron!"
              />
            ) : (
              <PatronCard key={idx + 3} item={item} />
            )
          )}
        </div>
        <div
          className={`grid grid-cols-5 gap-3 ${show ? "visible" : "hidden"}`}
        >
          {restRow.map((item, idx) => (
            <PatronCard key={idx + 7} item={item} />
          ))}
        </div>
      </div>
      <ShowOrClose noMore={noMore} show={show} setShow={setShow} next={next} />
    </div>
  );
}
