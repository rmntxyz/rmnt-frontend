import Image from "next/image";
import { Eth } from "../../utils/svgs";

export default function Avatar({ NFT, exchangeRate, webtoon }) {
  return (
    <div className="mt-7 flex flex-col gap-4">
      <div className="text-2xl font-bold">Digital Avatars</div>
      <div className="flex flex-col gap-8 sm:flex-row">
        <div className="box w-full aspect-square">
          <Image
            src={NFT.attributes.image.data[0].attributes.url}
            layout="fill"
            className="clipped scale-[98.5%]"
          />
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
            <div className="flex items-center gap-1 mb-3">
              <Eth />
              <div className="font-bold">
                {parseFloat(NFT.attributes.price_in_wei) / Math.pow(10, 18)} ETH
              </div>
              <div
                className="text-white/50 text-sm"
                style={{
                  visibility:
                    NFT.attributes.sold_timestamp?.toString().length > 0
                      ? "hidden"
                      : "visible",
                }}
              >
                (≈{" "}
                {(
                  (exchangeRate * parseFloat(NFT.attributes.price_in_wei)) /
                  Math.pow(10, 18)
                ).toFixed(4)}{" "}
                USD)
              </div>
            </div>
            <div className="ml-4 mb-8">
              <span className="font-bold"></span>
              <span>/{NFT.attributes.quantity}</span>
              {NFT.attributes.sold_timestamp?.toString().length > 0 ? (
                <span className="text-sm text-white/50 ml-1">(Soldout)</span>
              ) : (
                <span className="text-sm text-white/50 ml-1">(Available)</span>
              )}
            </div>
            <button aria-label="Collect NFT" className="py-3">
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
