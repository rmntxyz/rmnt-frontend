import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import ShowOrClose from "../../../utils/showOrClose";
import Avatar from "./Avatar/Avatar";
import Benefits from "./Benefits";
import Patrons from "./Patrons/Patrons";

export default function ProjectTab(props) {
  const { webtoon, benefits } = props;

  //Find if the text is truncated & display the "more/close" button if the text is truncated
  const [truncated, setTruncated] = useState(false);
  const descRef = useRef();

  useEffect(() => {
    const desc = descRef?.current;
    if (desc.offsetHeight < desc.scrollHeight) {
      setTruncated(true);
    }
  });

  //Toggle the "more/close" button
  const [show, setShow] = useState(false);

  //Store the rarement data and pass it to the Patrons component
  const rarement = webtoon.attributes?.rarement.data?.attributes;

  return (
    <div className="mx-8 mt-8 mb-14 flex flex-col gap-8">
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
        <div
          id="desc"
          ref={descRef}
          className={`transition-[max-height] duration-300 ease-in-out ${
            show ? "max-h-[5000px]" : "max-h-[120px] overflow-y-hidden"
          }`}
        >
          <ReactMarkdown children={webtoon.attributes.description} />
        </div>
        <ShowOrClose truncated={truncated} show={show} setShow={setShow} />
      </div>
      <Avatar {...props} />
      <Benefits benefits={benefits} />
      <Patrons rarement={rarement} />
    </div>
  );
}
