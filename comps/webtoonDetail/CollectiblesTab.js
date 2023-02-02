import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isImage } from "../../utils/mediaType";
import { OpenSea } from "../../utils/svgs";
import { PolyFrameCard } from "../../utils/PolyFrameCard";
import Line from "../../utils/Line";

export default function CollectiblesTab({ NFTs, exchangeRate }) {
  let NFTUrl = "";

  return (
    <div className="mx-8 my-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
      {NFTs.length === 0 ? (
        <span className="text-lg">New NFTs are on the way—stay tuned!</span>
      ) : (
        NFTs.map(
          (item) => (
            (NFTUrl = item.attributes.image.data[0].attributes.url),
            (
              <div
                key={item.attributes.nft_id}
                // className={
                //   item.attributes.sold_timestamp?.toString().length > 0
                //     ? "collectibleCard overflow-hidden"
                //     : "gradientBorder-2 overflow-hidden"
                // }
                // className="gradientBorder-2 overflow-hidden"
                className="card relative overflow-hidden min-w-fit min-h-fit"
              >
                <PolyFrameCard
                  href={
                    isImage.includes(
                      NFTUrl.split(".")[NFTUrl.split(".").length - 1]
                    )
                      ? NFTUrl
                      : item.attributes.thumbnail.data.attributes.url
                  }
                />
                <div className="flex flex-col absolute h-full w-full rounded-lg top-0 left-0">
                  <div className="relative aspect-square">
                    {/* <Image
                      src={
                        isImage.includes(
                          NFTUrl.split(".")[NFTUrl.split(".").length - 1]
                        )
                          ? NFTUrl
                          : item.attributes.thumbnail.data.attributes.url
                      }
                      layout="fill"
                      objectFit="contain"
                      // className="rounded-tl-lg"
                      alt="Rarement NFT Image"
                      placeholder="blur"
                      blurDataURL={
                        isImage.includes(
                          NFTUrl.split(".")[NFTUrl.split(".").length - 1]
                        )
                          ? NFTUrl
                          : item.attributes.thumbnail.data.attributes.url
                      }
                    />{" "} */}
                    {isImage.includes(
                      NFTUrl.split(".")[NFTUrl.split(".").length - 1]
                    ) ? null : (
                      <FontAwesomeIcon
                        icon={faVideo}
                        className="absolute top-3 left-3 text-white bg-opaqueGray p-1 rounded-md"
                      />
                    )}
                    <a
                      href={item.attributes.opensea}
                      target="_blank"
                      className="absolute bottom-4 right-5 px-2 py-2.5 bg-mintGreen rounded-md border border-navBg sm:bottom-2 sm:right-2"
                    >
                      <OpenSea />
                    </a>
                    {/* {item.attributes.sold_timestamp?.toString().length > 0 ? (
                      <a
                        href={item.attributes.opensea}
                        target="_blank"
                        className="absolute bottom-2 right-2 px-2 py-2.5 bg-mintGreen rounded-md border border-navBg"
                      >
                        <OpenSea />
                      </a>
                    ) : null} */}
                  </div>
                  <div className="px-4 pb-1 w-full mx-auto my-auto flex flex-col gap-2 sm:pb-2">
                    <div className="truncate font-bold">
                      {item.attributes.name}
                    </div>
                    <Line />
                    {/* <PriceAvail item={item} exchangeRate={exchangeRate} /> */}
                    <div className="text-sm text-mintGreen">
                      edition {item.attributes.edition}/
                      {item.attributes.quantity}
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
