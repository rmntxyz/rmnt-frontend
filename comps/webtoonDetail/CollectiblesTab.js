import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { isImage } from "../../utils/mediaType";
import { Eth, OpenSea } from "../svgs/svgs";

export default function CollectiblesTab({ NFTs, exchangeRate }) {
  let NFTUrl = "";

  return (
    <div className="mx-8 my-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
      {NFTs.length === 0 ? (
        <span className="text-lg">New NFTs are on the way—stay tuned!</span>
      ) : (
        NFTs.map(
          (item) => (
            (NFTUrl = item.attributes.image.data[0].attributes.url),
            (
              <div
                key={item.attributes.nft_id}
                className={
                  item.attributes.sold_timestamp?.toString().length > 0
                    ? "relative"
                    : "box"
                }
              >
                <div className="innerBox"></div>
                <div className="flex flex-col gap-3">
                  <div className="relative aspect-square">
                    <Image
                      src={
                        isImage.includes(
                          NFTUrl.split(".")[NFTUrl.split(".").length - 1]
                        )
                          ? NFTUrl
                          : item.attributes.thumbnail.data.attributes.url
                      }
                      layout="fill"
                      objectFit="contain"
                      alt="Rarement NFT Image"
                      placeholder="blur"
                      blurDataURL={
                        isImage.includes(
                          NFTUrl.split(".")[NFTUrl.split(".").length - 1]
                        )
                          ? NFTUrl
                          : item.attributes.thumbnail.data.attributes.url
                      }
                      className="scale-[98.5%] rounded-tl-lg rounded-tr-lg"
                    />{" "}
                    {isImage.includes(
                      NFTUrl.split(".")[NFTUrl.split(".").length - 1]
                    ) ? null : (
                      <FontAwesomeIcon
                        icon={faVideo}
                        className="absolute top-3 left-3 text-white bg-opaqueGray p-1 rounded-md"
                      />
                    )}
                    {item.attributes.sold_timestamp?.toString().length > 0 ? (
                      <a
                        href={item.attributes.opensea}
                        target="_blank"
                        className="absolute bottom-2 right-2 px-2 py-2.5 bg-mintGreen rounded-md border border-navBg"
                      >
                        <OpenSea />
                      </a>
                    ) : null}
                  </div>
                  <div className="px-4 flex flex-col gap-3 mb-7 z-10">
                    <div className="truncate font-bold">
                      {item.attributes.name}
                    </div>
                    <div className="w-full h-px bg-white/10"></div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-1">
                        <Eth />
                        <div className="font-bold text-sm">
                          {parseFloat(item.attributes.price_in_wei) /
                            Math.pow(10, 18)}{" "}
                          ETH
                        </div>
                        <div
                          className="text-white/50 text-sm"
                          style={{
                            visibility:
                              item.attributes.sold_timestamp?.toString()
                                .length > 0
                                ? "hidden"
                                : "visible",
                          }}
                        >
                          (≈{" "}
                          {(
                            (exchangeRate *
                              parseFloat(item.attributes.price_in_wei)) /
                            Math.pow(10, 18)
                          ).toFixed(3)}{" "}
                          USD)
                        </div>
                      </div>
                      <div className="ml-4">
                        {item.attributes.sold_timestamp?.toString().length >
                        0 ? (
                          <span className="text-sm text-white/50 ml-1">
                            (Soldout)
                          </span>
                        ) : (
                          <div>
                            <span className="font-bold"></span>
                            <span>/{item.attributes.quantity}</span>
                            <span className="text-sm text-white/50 ml-1">
                              (Available)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        )
      )}
    </div>
  );
}
