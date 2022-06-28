import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Specs({ currentNFT }) {
  return (
    <div className="px-8 bg-ourBlack text-white flex items-center justify-center py-12 text-sm md:text-lg md:py-20">
      <ul className="container flex flex-col items-center gap-12 md:items-start md:grid md:grid-cols-2 xl:grid-cols-3">
        <li className="w-[325px] md:order-1">
          <a href={currentNFT.metadata}>
            View Metadata{" "}
            <FontAwesomeIcon icon={faArrowRight} className="text-mediumBeige" />
          </a>
        </li>
        <li className="w-[325px] md:order-3 xl:order-2">
          <a href={currentNFT.contract}>
            View Contract{" "}
            <FontAwesomeIcon icon={faArrowRight} className="text-mediumBeige" />
          </a>
        </li>
        <li className="flex md:justify-end md:order-2">
          <div className="w-[325px]">
            <div className="text-sm md:text-lg">
              Properties
              <div className="flex gap-8 text-xs mt-2 md:mt-3 md:text-base">
                <div>
                  <div className="text-[#858585]">Dimensions</div>
                  <div>
                    {currentNFT.width}*{currentNFT.height}
                  </div>
                </div>
                <div>
                  <div className="text-[#858585]">Dimensions</div>
                  <div>
                    {currentNFT.width}*{currentNFT.height}
                  </div>
                </div>
                <div>
                  <div className="text-[#858585]">Dimensions</div>
                  <div>
                    {currentNFT.width}*{currentNFT.height}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="flex md:justify-end md:order-4 xl:col-end-4">
          <div className="w-[325px]">
            License
            <div className="text-justify text-xs text-[#858585] mt-2 md:mt-3 md:text-base">
              {currentNFT.license}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
