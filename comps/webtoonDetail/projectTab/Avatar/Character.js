import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import Image from "next/image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Character({ item }) {
  return (
    <Tippy
      render={(attrs) => (
        <div
          {...attrs}
          id="tooltip"
          className="tooltip p-3 flex items-center gap-2 h-fit"
        >
          <Image
            src={item.attributes.image.data.attributes.url}
            width={68}
            height={68}
            alt="Rarement Webtoon Character Image"
            className="rounded-md"
          />
          <div className="flex flex-col gap-0.5">
            <div className="text-base">{item.attributes.name}</div>
            <div className="text-sm">
              <ReactMarkdown children={item.attributes.description} />
            </div>
          </div>
          <div id="arrow" className="arrow" data-popper-arrow=""></div>
        </div>
      )}
    >
      <button aria-label="Rarement Webtoon Character Image">
        <Image
          src={item.attributes.image.data.attributes.url}
          width={44}
          height={44}
          alt="Rarement Webtoon Character Image"
          className="rounded-md"
        />
      </button>
    </Tippy>
  );
}
