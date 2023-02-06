import { PolyFrameImage } from "../../utils/PolyFrameImage";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export default function PatronCard({ webtoon, user }) {
  return (
    <Tippy
      content={
        <div className="flex p-3 gap-2">
          <div className="w-[66px]">
            <PolyFrameImage
              href={
                user?.attributes.profile_image?.data
                  ? user?.attributes.profile_image.data.attributes.url
                  : "/profile.png"
              }
            />
          </div>
          <span className="w-[99px] truncate font-normal">
            {user.attributes.wallet_address}
          </span>
        </div>
      }
    >
      <button>
        <PolyFrameImage
          href={
            user.attributes.nfts.data[0].attributes.image.data[0].attributes.url
          }
        />
      </button>
    </Tippy>
  );
}
