import { useState } from "react";
import ShowOrClose from "../../utils/showOrClose";
import PatronCard from "./PatronCard";

export default function Patrons({ uniqueUsers, webtoon }) {
  //Toggle the "more/close" button
  const [show, setShow] = useState(false);

  //Find if the list is truncated & display the "more/close" button if the text is truncated
  const [truncated, setTruncated] = useState(uniqueUsers.length > 7);

  return (
    <div className="mt-7 flex flex-col">
      <div className="text-2xl font-bold">Patrons</div>
      <div className="mt-3">
        The order of the patrons' list is determined by time of support.
      </div>
      <div className="w-full h-px my-6 bg-white/10"></div>
      <div className="flex flex-col mb-6">
        <div className="grid grid-cols-3">
          {uniqueUsers.slice(0, 3).map((user) => (
            <PatronCard key={user.id} webtoon={webtoon} user={user} />
          ))}
        </div>
        <div className="grid grid-cols-4">
          {uniqueUsers.slice(3, 7).map((user) => (
            <PatronCard key={user.id} webtoon={webtoon} user={user} />
          ))}
        </div>
        <div className={`grid grid-cols-5 ${show ? "visible" : "hidden"}`}>
          {uniqueUsers.slice(7).map((user) => (
            <PatronCard key={user.id} webtoon={webtoon} user={user} />
          ))}
        </div>
      </div>
      <ShowOrClose truncated={truncated} show={show} setShow={setShow} />
    </div>
  );
}
