import { useEffect, useState } from "react";
import ShowOrClose from "../../../utils/showOrClose";
import PatronCard from "./PatronCard";
import { getHolders } from "../../../pages/api/getHolders"

export default function Patrons({ avatars, address = '0xC0A04721f549914B2356EE3a449c011dceA7D909' }) {
  //Find the sold avatars & list them on the order of time of sale

  const [minters, setMinters] = useState([]);

  //Toggle the "more/close" button
  const [show, setShow] = useState(false);

  //Find if the list is truncated & display the "more/close" button if the text is truncated
  const [truncated, setTruncated] = useState(false);

  useEffect(() => {
    getHolders(address)
      .then(res => {
        // TODO show holders
        console.log(res);
      })
  }, [])


  return (
    <div className="mt-7 flex flex-col">
      <div className="text-2xl font-bold">Patrons</div>
      <div className="mt-3">
        The order of the patrons' list is determined by time of support.
      </div>
      <div className="w-full h-px my-6 bg-white/10"></div>
      <div className="flex flex-col mb-6">
        <div className="grid grid-cols-3">
          {minters.slice(0, 3).map((item) => (
            <PatronCard key={item.id} item={item} />
          ))}
        </div>
        <div className="grid grid-cols-4">
          {minters.slice(3, 7).map((item) => (
            <PatronCard key={item.id} item={item} />
          ))}
        </div>
        <div className={`grid grid-cols-5 ${show ? "visible" : "hidden"}`}>
          {minters.slice(7).map((item) => (
            <PatronCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <ShowOrClose truncated={truncated} show={show} setShow={setShow} />
    </div>
  );
}