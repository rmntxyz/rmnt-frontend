import Tippy from "@tippyjs/react/headless";
// import "tippy.js/dist/tippy.css";
import { PolyFrameImage } from "../../../utils/PolyFrameImage";

export default function PatronCard({ item }) {
  //Find the date of sale
  const dateTime = new Date(item.attributes.sold_timestamp * 1000);
  const year = dateTime.getFullYear() % 100;
  const month = dateTime.getMonth() + 1;
  const date = dateTime.getDate();
  // const fullDate = dateTime.toDateString().slice(4);
  return (
    <Tippy
      interactive="true"
      render={(attrs) => (
        <div
          {...attrs}
          id="tooltip"
          className="tooltip flex p-3 gap-2"
          role="tooltip"
        >
          <div className="w-[66px]">
            <PolyFrameImage
              href={
                item?.attributes.owned_by.data.attributes.profile_image?.data
                  ? item?.attributes.owned_by.data.attributes.profile_image
                      ?.data.attributes.url
                  : "/profile.png"
              }
              idx="tippy"
            />
          </div>
          <div>
            <div className="text-white/70 text-sm">
              {month}/{date}/{year}
            </div>
            <div className="w-[99px] truncate font-normal">
              {item.attributes.owned_by.data.attributes.wallet_address}
            </div>
          </div>
          <div id="arrow" className="arrow" data-popper-arrow=""></div>
        </div>
      )}
      // content={
      //   <div className="flex p-3 gap-2">
      //     <div className="w-[66px]">
      //       <PatronSVG
      //         href={
      //           item?.attributes.owned_by.data.attributes.profile_image?.data
      //             ? item?.attributes.owned_by.data.attributes.profile_image
      //                 ?.data.attributes.url
      //             : "/profile.png"
      //         }
      //       />
      //     </div>
      //     <div>
      //       <div className="text-white/70 text-sm">
      //         {month}/{date}/{year}
      //       </div>
      //       <div className="w-[99px] truncate font-normal">
      //         {item.attributes.owned_by.data.attributes.wallet_address}
      //       </div>
      //     </div>
      //   </div>
      // }
    >
      <button className="avatar">
        <PolyFrameImage
          idx={item.id}
          href={item.attributes.image.data.attributes.url}
        />
      </button>
    </Tippy>
  );
}
