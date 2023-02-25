import Image from "next/image";
import Line from "../../../utils/Line";
import { PolyFrameImage } from "../../../utils/PolyFrameImage";
import Character from "./Character";
import PriceAvail from "./PriceAvail";

export default function Avatar({ avatars, exchangeRate, webtoon }) {
  return (
    <div className="mt-7 flex flex-col gap-4">
      <div className="text-2xl font-bold">Avatar</div>
      <div className="flex flex-col gap-8 items-center sm:flex-row">
        <div className="w-full aspect-square">
          <PolyFrameImage
            href={webtoon.attributes.avatarGIF.data.attributes.url}
            idx="gif"
          />
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-px">
            <div className="flex gap-1.5 items-center">
              <Image
                src={
                  webtoon.attributes.artist_id.data.attributes.profile_image
                    .data.attributes.url
                }
                width={24}
                height={24}
                className="rounded-full"
              />
              <a
                href={
                  "/artists/" +
                  webtoon.attributes.artist_id.data.attributes.first_name
                }
                className="hover:underline"
              >
                <span>Created by </span>
                <span className="font-bold">
                  {webtoon.attributes.artist_id.data.attributes.first_name}
                </span>
              </a>
            </div>
          </div>
          <Line />
          <div className="characters flex gap-2">
            {webtoon.attributes.characters?.data.map((item, idx) => (
              <Character item={item} key={idx} />
            ))}
          </div>
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