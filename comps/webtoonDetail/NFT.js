import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import DetailTimer from "./DetailTimer";

export default function NFT({ nft, undropped, exchangeRate }) {
  const editions = nft.length;
  const lastUndropped =
    undropped.length > 0 ? undropped[undropped.length - 1] : null;
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => {
    setIsHovered(true);
  };
  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div className="bg-lightBeige py-12 md:py-20">
      <div className="ml-8 md:ml-20 lg:ml-24 2xl:ml-52 3xl:ml-80">
        <div className="flex flex-col gap-8 md:gap-14">
          <div className="flex items-start gap-4 md:gap-7 md:items-center">
            <div className="font-bold text-[22px] md:text-[40px]">NFT</div>
            {lastUndropped ? (
              <DetailTimer
                targetTime={lastUndropped.targetTime}
                className="bg-white text-black"
              />
            ) : null}
          </div>

          <div className="scroll overflow-x-auto flex gap-8">
            {nft.map((item) => (
              <div key={item.id} className="drop-shadow-medium rounded-sm ">
                {item.sold ? (
                  <div className="flex gap-1.5 items-center bg-ourBlack text-white text-sm md:text-base py-3.5 px-4">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-base md:text-lg"
                    />
                    <span>Soldout</span>
                  </div>
                ) : (
                  <div className="flex gap-1 items-center bg-mediumBeige text-ourBlack text-sm md:text-base py-3.5 px-4">
                    <img
                      src="/nft_available_1440_768@2x.png"
                      className="w-4 md:w-5"
                    />
                    <span>Available</span>
                  </div>
                )}
                <div className="bg-white ">
                  <div className=" p-3.5 flex flex-col gap-3.5 md:p-4 ">
                    <a href={"/NFT/" + item.id} className="overflow-hidden">
                      <img
                        src={item.file}
                        width={304}
                        height={304}
                        className="max-w-[220px] duration-200 hover:scale-125 md:max-w-[304px] lg:max-w-[288px]"
                      />
                    </a>
                    <div className="font-bold text-lg md:text-xl">
                      {item.id.toString().length < 2 ? (
                        <span>
                          #{"0" + item.id}. {item.name}
                        </span>
                      ) : (
                        <span>
                          #{item.id}. {item.name}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="text-[#858585] text-base md:text-lg">
                          (≈ {(exchangeRate * item.price).toFixed(4)} USD)
                        </div>
                        <div className="font-bold text-lg md:text-xl">
                          {item.price} ETH
                        </div>
                      </div>
                      {item.sold ? (
                        <a
                          href="https://opensea.io/"
                          target="_blank"
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                          className="bg-ourBlack rounded-full border border-ourBlack w-11 h-11 p-2 duration-200 hover:bg-white "
                        >
                          <img
                            src={`${
                              !isHovered
                                ? "/openSea/openSea_white.png"
                                : "/openSea/openSea_black.png"
                            }`}
                          />
                        </a>
                      ) : null}
                    </div>
                  </div>
                  <div className="border-t flex justify-end p-3.5 md:p-4">
                    <div className="text-[#CEA671] text-base font-bold md:text-lg">
                      Edition {item.edition} of {editions}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
