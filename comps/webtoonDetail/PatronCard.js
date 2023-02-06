import { PolyFrameImage } from "../../utils/PolyFrameImage";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export default function PatronCard({ item }) {
  return (
    <Tippy
      content={
        <div className="flex p-3 gap-2">
          <div className="w-[66px]">
            <PolyFrameImage
              href={
                item?.attributes.owned_by.data.attributes.profile_image?.data
                  ? item?.attributes.owned_by.data.attributes.profile_image
                      ?.data.attributes.url
                  : "/profile.png"
              }
            />
          </div>
          <span className="w-[99px] truncate font-normal">
            {item.attributes.owned_by.data.attributes.wallet_address}
          </span>
        </div>
      }
    >
      <button>
        <PolyFrameImage href={item.attributes.image.data.attributes.url} />
      </button>
    </Tippy>
  );
}
