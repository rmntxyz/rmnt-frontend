import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Timer from "../home/TopCard/Timer";

export default function Specs({
  currentWebtoon,
  currentWebtoonNFTs,
  currentNFT,
}) {
  return (
    <div className="text-white text-sm md:text-lg lg:flex-row">
      <div className="flex flex-col gap-5 md:gap-8">
        <div className="flex flex-col gap-5 md:gap-8">
          <div className="flex flex-col border-2 border-[#333333]">
            <div className="flex gap-2.5 py-4 px-6 bg-[#333333] items-center text-white text-sm font-bold md:px-8 md:py-7 md:text-lg">
              <span className="bg-white rounded-full flex items-center justify-center w-5 aspect-square md:w-6">
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-[#CEA671] text-xs md:text-sm"
                />
              </span>
              <span>
                Edition {currentNFT.attributes.edition} of{" "}
                {
                  currentWebtoonNFTs.filter(
                    (NFT) => NFT.attributes.name === currentNFT.attributes.name
                  ).length
                }
              </span>
            </div>
            <div className="bg-white text-black ">
              {currentNFT.attributes.timeRemaining > 0 ? (
                <div className="px-6 md:px-8">
                  <Timer timeRemaining={currentNFT.attributes.timeRemaining} />
                  <div className="h-px w-full mt-4 bg-lightBeige md:mt-8"></div>
                </div>
              ) : null}
              <div className="text-xs text-black bg-white py-4 px-6 md:px-8 md:py-7 md:text-base">
                <a
                  href={
                    "/artists/" + currentWebtoon.attributes.artist_id.data.id
                  }
                >
                  <span>Created by </span>
                  <span className="text-[#CEA671] font-bold hover:underline">
                    {
                      currentWebtoon.attributes.artist_id.data.attributes
                        .first_name
                    }
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 bg-[#333333] text-white py-4 px-6 md:gap-4 md:px-8 md:py-7">
            <div className="text-sm font-bold md:text-lg">Reward</div>
            <div className="text-justify text-xs md:text-base">
              {currentNFT.attributes.reward}
            </div>
          </div>
        </div>
        <ul className="flex flex-col gap-12 border-2 border-[#333333] py-4 px-6 md:px-8 md:py-7 md:gap-16">
          <li className="flex gap-7 md:gap-9">
            <a href={currentNFT.attributes.metadata}>
              View Metadata{" "}
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-mediumBeige"
              />
            </a>
            <a href={currentNFT.attributes.contract}>
              View Contract{" "}
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-mediumBeige"
              />
            </a>
          </li>
          <li className="flex">
            <div className="text-sm md:text-lg">
              Properties
              <div className="flex gap-8 text-xs mt-2 md:mt-3 md:text-base">
                <div>
                  <div className="text-[#858585]">Dimensions</div>
                  <div>
                    {currentNFT.attributes.image.data[0].attributes.width}*
                    {currentNFT.attributes.image.data[0].attributes.height}
                  </div>
                </div>
                <div>
                  <div className="text-[#858585]">Dimensions</div>
                  <div>
                    {currentNFT.attributes.image.data[0].attributes.width}*
                    {currentNFT.attributes.image.data[0].attributes.height}
                  </div>
                </div>
                <div>
                  <div className="text-[#858585]">Dimensions</div>
                  <div>
                    {currentNFT.attributes.image.data[0].attributes.width}*
                    {currentNFT.attributes.image.data[0].attributes.height}
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="flex flex-col">
            <div>License</div>
            <div className="text-justify text-xs text-[#858585] mt-2 md:mt-3 md:text-base">
              {currentNFT.attributes.license}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
