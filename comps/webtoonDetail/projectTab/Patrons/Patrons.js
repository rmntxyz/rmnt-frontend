import { useEffect, useState } from "react";
import PatronCard from "./PatronCard";
import { useHolders } from "../../../../utils/useHolders";
import { EmptyPatronCard } from "./EmptyPatronCard";
import MoreOrClose from "./MoreOrClose";

export default function Patrons({ rarement }) {
  //Set loading for patron cards
  const [loading, setLoading] = useState(true);

  //Toggle the "more/close" button
  const [show, setShow] = useState(false);

  const { contractAddress, chainId } = rarement ? rarement : {};

  const { holders, noMore, next, isLoading } = useHolders(contractAddress, chainId, 100, 7);

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
      <div className={`flex flex-col`}>
        <div className="grid grid-cols-3 gap-2 mb-2 sm:gap-3 sm:mb-3">
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
        <div className={`grid grid-cols-4 gap-2 mb-2 sm:gap-3 sm:mb-3`}>
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
          className={`grid grid-cols-5 gap-2 transition-all ease-in-out duration-300 overflow-hidden sm:gap-3 ${
            show ? "max-h-[5000px]" : "max-h-0"
          }`}
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
      </div>
      <MoreOrClose
        noMore={noMore}
        show={show}
        setShow={setShow}
        next={next}
        isLoading={isLoading}
        restRow={restRow}
        address={contractAddress}
      />
    </div>
  );
}
