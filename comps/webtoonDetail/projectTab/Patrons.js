import { useEffect, useState } from "react";
import ShowOrClose from "../../../utils/showOrClose";
import PatronCard from "./PatronCard";
import { getHolders } from "../../../pages/api/getHolders";
import { EmptyPatronCard } from "./EmptyPatronCard";

export default function Patrons({
  avatars,
  address = "0xC0A04721f549914B2356EE3a449c011dceA7D909",
}) {
  //Find the sold avatars & list them on the order of time of sale

  const [minters, setMinters] = useState([]);

  //Divide minters into rows and push null values when the length of the array for each row falls short of 3 or 4.
  function firstRow() {
    const array = minters.slice(0, 3);
    const length = array.length;
    if (length === 3) {
      return array;
    } else {
      for (var i = 0; i < 3 - length; i++) {
        array.push(null);
      }
      return array;
    }
  }
  function secondRow() {
    const array = minters.slice(3, 7);
    const length = array.length;
    if (length === 4) {
      return array;
    } else {
      for (var i = 0; i < 4 - length; i++) {
        array.push(null);
      }
      return array;
    }
  }
  const finalRows = minters.slice(7);

  //Toggle the "more/close" button
  const [show, setShow] = useState(false);

  //Find if the list is truncated & display the "more/close" button if the text is truncated
  const [truncated, setTruncated] = useState(minters.length > 7);

  useEffect(() => {
    getHolders(address).then((res) => {
      // TODO show holders
      console.log(res);
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
          {firstRow().map((item, idx) =>
            item ? (
              <PatronCard key={item.id} item={item} />
            ) : (
              <EmptyPatronCard idx={idx} />
            )
          )}
        </div>
        <div className="grid grid-cols-4">
          {secondRow().map((item, idx) =>
            item ? (
              <PatronCard key={item.id} item={item} />
            ) : (
              <EmptyPatronCard idx={idx + 3} />
            )
          )}
        </div>
        <div className={`grid grid-cols-5 ${show ? "visible" : "hidden"}`}>
          {finalRows.map((item) => (
            <PatronCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <ShowOrClose truncated={truncated} show={show} setShow={setShow} />
    </div>
  );
}
