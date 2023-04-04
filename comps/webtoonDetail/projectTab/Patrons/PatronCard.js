import Tippy from "@tippyjs/react/headless";
import Image from "next/image";
import { PolyFrameImage } from "../../../../utils/PolyFrameImage";
import { LoadingRarement } from "../../../../utils/svgs";
import useDate from "../../../../utils/useDate";

export default function PatronCard({ item }) {
  //Find the date of sale
  const { month, date, year } = useDate(item.timeLastUpdated);

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
            <div className="text-white/70 text-sm">
              {month}/{date}/{year}
            </div>
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
