import Image from "next/image";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import ShowOrClose from "../../../utils/showOrClose";
import Avatar from "./Avatar";
import Benefits from "./Benefits";
import Patrons from "./Patrons";

export default function ProjectTab({
  webtoon,
  avatars,
  exchangeRate,
  benefits,
}) {
  //Find if the text is truncated & display the "more/close" button if the text is truncated
  const [truncated, setTruncated] = useState(false);

  useEffect(() => {
    const element = document.getElementById("desc");
    if (element.offsetHeight < element.scrollHeight) {
      setTruncated(true);
    }
  });

  //Toggle the "more/close" button
  const [show, setShow] = useState(false);

  return (
    <div className="mx-8 my-8 flex flex-col gap-8">
      <div className="relative w-fit">
        <span className="text-3xl font-bold">{webtoon.attributes.title}</span>
        <div className="bg-mintGreen/20 absolute h-1/2 w-full bottom-0"></div>
      </div>
      <div className="text-justify flex flex-col gap-3 justify-center items-start">
        <div className="text-2xl flex gap-1.5 items-center justify-start">
          {/* <FontAwesomeIcon icon={faPencil} /> */}
          <Image
            src="/KakaoTalk_Photo_2023-01-27-11-57-45.png"
            width={20}
            height={20}
            alt="Pencil Image"
          />
          <span>Synopsis</span>
        </div>
        <div id="desc" className={`${show ? "" : "truncate-5"}`}>
          <ReactMarkdown children={webtoon.attributes.description} />
        </div>
        <ShowOrClose truncated={truncated} show={show} setShow={setShow} />
      </div>
      <Avatar avatars={avatars} exchangeRate={exchangeRate} webtoon={webtoon} />
      <Benefits benefits={benefits} />
      <Patrons avatars={avatars} />
    </div>
  );
}
