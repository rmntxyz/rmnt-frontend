import Image from "next/image";
import Line from "../../../utils/Line";
import { PolyFrameImage } from "../../../utils/PolyFrameImage";
import PriceAvail from "./PriceAvail";

export default function Avatar({ avatars, exchangeRate, webtoon }) {
  return (
    <div className="mt-7 flex flex-col gap-4">
      <div className="text-2xl font-bold">Digital Avatars</div>
      <div className="flex flex-col gap-8 sm:flex-row">
        <div className="w-full aspect-square">
          <PolyFrameImage
            href={webtoon.attributes.avatarGIF.data.attributes.url}
            idx="gif"
          />
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-px">
            <div>Created by</div>
            <div className="flex gap-1.5">
              <Image
                src={
                  webtoon.attributes.artist_id.data.attributes.profile_image
                    .data.attributes.url
                }
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-lg font-bold">
                {webtoon.attributes.artist_id.data.attributes.first_name}
              </span>
            </div>
          </div>
          <Line />
          <div>
            <PriceAvail avatars={avatars} exchangeRate={exchangeRate} />
            <button aria-label="Collect NFT" className="py-3 mt-8">
              <span className="px-8 py-3 bg-mintGreen border-2 border-mintGreen text-navBg text-base leading-tight font-bold rounded-3xl hover:bg-navBg hover:text-white duration-200">
                Collect
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
