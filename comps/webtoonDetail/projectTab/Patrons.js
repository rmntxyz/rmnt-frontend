import { useEffect, useState } from "react";
import ShowOrClose from "../../../utils/showOrClose";
import PatronCard from "./PatronCard";
import { getHolders } from "../../../pages/api/getHolders";
import { EmptyPatronCard } from "./EmptyPatronCard";

export default function Patrons({
  address = "0x2414754f828e5c4a7613544614d87988ab5dad8f",
}) {
  //Populate the array of holders with null values before loading
  const [holders, setHolders] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  //Get holders and fill the array of holders with "empty" if the length of the array falls short of 7
  useEffect(() => {
    getHolders(address).then((holders) => {
      setHolders(holders);
      const length = holders.length;
      if (length < 7) {
        for (var i = 0; i < 7 - length; i++) {
          holders.push("empty");
        }
        setHolders(holders);
      }
    });
  }, []);

  //Divide the array of holders into rows
  const rowOne = holders.slice(0, 3);
  const rowTwo = holders.slice(3, 7);
  const rowsFinal = holders.slice(7);

  //Toggle the "more/close" button
  const [show, setShow] = useState(false);

  //Find if the list is truncated & display the "more/close" button if the text is truncated
  const [truncated, setTruncated] = useState(holders.length > 7);

  return (
    <div className="mt-7 flex flex-col">
      <div className="text-2xl font-bold">Patrons</div>
      <div className="mt-3">
        The order of the patrons' list is determined by time of support.
      </div>
      <div className="w-full h-px my-6 bg-white/10"></div>
      <div className="flex flex-col mb-6">
        <div className="grid grid-cols-3">
          {rowOne.map((item, idx) =>
            !item ? (
              <EmptyPatronCard key={idx} idx={idx} textOne="Loading..." />
            ) : item === "empty" ? (
              <EmptyPatronCard
                key={idx}
                idx={idx}
                textOne="Be the first"
                textTwo="patron!"
              />
            ) : (
              <PatronCard key={idx} item={item} />
            )
          )}
        </div>
        <div className="grid grid-cols-4">
          {rowTwo.map((item, idx) =>
            !item || item === "empty" ? (
              <EmptyPatronCard key={idx + 3} idx={idx + 3} />
            ) : (
              <PatronCard key={idx + 3} item={item} />
            )
          )}
        </div>
        <div className={`grid grid-cols-5 ${show ? "visible" : "hidden"}`}>
          {rowsFinal.map((item) => (
            <PatronCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <ShowOrClose truncated={truncated} show={show} setShow={setShow} />
    </div>
  );
}
