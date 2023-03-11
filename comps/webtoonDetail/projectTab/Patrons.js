import { useEffect, useState } from "react";
import ShowOrClose from "../../../utils/showOrClose";
import PatronCard from "./PatronCard";
import { getHolders } from "../../../pages/api/getHolders";
import { EmptyPatronCard } from "./EmptyPatronCard";

export default function Patrons({
  avatars,
  address = "0x2414754f828e5c4a7613544614d87988ab5dad8f",
}) {
  //Find the sold avatars & list them on the order of time of sale

  const [holders, setHolders] = useState([]);

  //Populate the array of holders with null values if the length of the array falls short of 7
  const rows = () => {
    const array = holders;
    const length = array.length;
    if (length < 7) {
      for (var i = 0; i < 7 - length; i++) {
        array.push(null);
      }
      return array;
    } else return array;
  };

  //Divide the array of holders into rows
  const rowOne = rows().slice(0, 3);
  const rowTwo = rows().slice(3, 7);
  const rowsFinal = rows().slice(7);

  //Toggle the "more/close" button
  const [show, setShow] = useState(false);

  //Find if the list is truncated & display the "more/close" button if the text is truncated
  const [truncated, setTruncated] = useState(holders.length > 7);

  useEffect(() => {
    getHolders(address).then((holders) => {
      setHolders(holders);
    });
  }, []);

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
            item ? (
              <PatronCard key={idx} item={item} />
            ) : (
              <EmptyPatronCard key={idx} idx={idx} />
            )
          )}
        </div>
        <div className="grid grid-cols-4">
          {rowTwo.map((item, idx) =>
            item ? (
              <PatronCard key={idx + 3} item={item} />
            ) : (
              <EmptyPatronCard key={idx} idx={idx + 3} />
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
