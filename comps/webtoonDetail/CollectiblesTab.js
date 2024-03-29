import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isImage } from "../../utils/mediaType";
import { OpenSea } from "../../utils/svgs";
import Line from "../../utils/Line";
import { PolyFrameCard } from "../../utils/PolyFrameCard";
import styles from "./CollectiblesTab.module.css";

export default function CollectiblesTab({ collectibles, exchangeRate }) {
  let NFTUrl = "";

  //Enable card border animation
  function switchStroke(e, idx) {
    e.currentTarget
      .querySelector("g")
      .setAttribute("stroke", `url(#cardGradientHover${idx})`);
  }

  function switchBackStroke(e, idx) {
    e.currentTarget
      .querySelector("g")
      .setAttribute("stroke", `url(#cardGradient${idx})`);
  }

  return (
    <div className="mx-8 mt-8 mb-14">
      {collectibles.length === 0 ? (
        <div className="h-60 flex items-center justify-center">
          <span className="text-lg">
            New collectibles are on the way—stay tuned!
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {collectibles.map(
            (item, idx) => (
              (NFTUrl = item.attributes.image.data.attributes.url),
              (
                <div
                  key={idx}
                  className={`${styles.card} relative overflow-hidden min-w-fit min-h-fit`}
                  onMouseEnter={(e) => switchStroke(e, idx)}
                  onMouseLeave={(e) => switchBackStroke(e, idx)}
                >
                  <PolyFrameCard
                    href={
                      isImage.includes(
                        NFTUrl.split(".")[NFTUrl.split(".").length - 1]
                      )
                        ? NFTUrl
                        : item.attributes.thumbnail.data.attributes.url
                    }
                    idx={idx}
                  />
                  <div className="flex flex-col absolute h-full w-full rounded-lg top-0 left-0">
                    <div className="relative aspect-square">
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
                        className="absolute bottom-4 right-4 px-2 py-2.5 bg-mintGreen rounded-md border border-navBg"
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
                    <div className="px-4 pb-5 w-full mx-auto my-auto flex flex-col gap-1 sm:pb-4 sm:gap-2">
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
          )}
        </div>
      )}
    </div>
  );
}
