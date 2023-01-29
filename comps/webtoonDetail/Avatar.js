import Image from "next/image";
import { PolyFrameImage } from "./PolyFrameImage";
import PriceAvail from "./PriceAvail";

export default function Avatar({ NFT, exchangeRate, webtoon }) {
  return (
    <div className="mt-7 flex flex-col gap-4">
      <div className="text-2xl font-bold">Digital Avatars</div>
      <div className="flex flex-col gap-8 sm:flex-row">
        <div className="w-full aspect-square">
          <PolyFrameImage href={NFT.attributes.image.data[0].attributes.url} />
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="text-lg">
            Created by{" "}
            <span className="font-bold">
              {webtoon.attributes.artist_id.data.attributes.first_name}
            </span>
          </div>
          <div className="w-full h-px bg-white/10"></div>
          <div>
            <PriceAvail item={NFT} exchangeRate={exchangeRate} />
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
