import Tippy from "@tippyjs/react/headless";
import Image from "next/image";
import getDate from "../../../utils/getDate";
// import "tippy.js/dist/tippy.css";
import { PolyFrameImage } from "../../../utils/PolyFrameImage";

export default function PatronCard({ item }) {
  //Find the date of sale
  // const { year, month, date } = getDate(item.attributes.sold_timestamp);
  // const fullDate = dateTime.toDateString().slice(4);
  return (
    <Tippy
      interactive="true"
      render={(attrs) => (
        <div
          {...attrs}
          id="tooltip"
          className="tooltip flex p-3 gap-2 items-center"
          role="tooltip"
        >
          <Image
            src="/profile/popup_profile.png"
            width={44}
            height={44}
            alt="Rarement Patron Image"
          />

          <div>
            {/* <div className="text-white/70 text-sm">
              {month}/{date}/{year}
            </div> */}
            <div className="w-[99px] truncate font-normal">{item.owner}</div>
          </div>
          <div id="arrow" className="arrow" data-popper-arrow=""></div>
        </div>
      )}
    >
      <button className="avatar" aria-label="Rarement Avatar Image">
        <PolyFrameImage idx={item.tokenId} href={item.imageUrl} />
      </button>
    </Tippy>
  );
}
