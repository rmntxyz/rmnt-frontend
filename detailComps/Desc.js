import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Collectors from "./Collectors";

export default function Desc({ item }) {
  return (
    <div className="container mx-auto my-20 md:my-36">
      <div className="max-w-[85%] mx-auto flex flex-col lg:max-w-[93%] lg:gap-16 lg:grid lg:grid-cols-2 xl:gap-24">
        <div className="mb-12 md:mb-20">
          <div className="flex mt-3.5 items-center md:mt-4">
            <div className="text-2xl font-extrabold uppercase md:text-5xl">
              {item.title}
            </div>
            <div className="w-1 aspect-square m-2 bg-lightGray rounded-full md:w-1.5 md:m-3"></div>
            <div className="whitespace-nowrap text-lg font-extrabold md:text-3xl">
              vol {item.vol}
            </div>
          </div>
          <div className="text-justify my-3.5 md:my-4 md:text-xl">{item.desc}</div>
          <a>
            <div className="text-[#CEA671] md:text-xl">
              View all series <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </a>
        </div>
        <div className="flex flex-col gap-5 md:gap-8">
          <div className="flex flex-col gap-4 border-2 border-mediumGray">
            <div className="flex gap-2.5 py-2.5 px-3.5 bg-[#F3F3F3] items-center md:p-5">
              <img
                src={item.profile}
                className="rounded-full w-16 h-16 md:w-20 md:h-20"
              />
              <div className="flex flex-col gap-1.5">
                <div className="font-bold md:text-2xl">{item.author}</div>
                <a href={item.authorWalletLink} target="_blank">
                  <button className="px-3 py-1 bg-lightGray text-white text-xs rounded-full md:text-base">
                    {item.authorWallet}
                  </button>
                </a>
              </div>
            </div>
            <div className="text-sm md:text-lg mx-5 md:mx-8">
              {item.authorDesc}
            </div>
            <div className="flex mb-6 mx-5 gap-5 text-[#555555] md:mx-8 md:gap-7">
              <div className="flex items-center gap-1.5 text-xs md:text-base">
                <FontAwesomeIcon icon={faInstagram} />
                {item.authorInstagram}
              </div>
              <div className="flex items-center gap-1.5 text-xs md:text-base">
                <FontAwesomeIcon icon={faEnvelope} />
                {item.authorEmail}
              </div>
            </div>
          </div>
          <Collectors collectors={item.collectors} />
        </div>
      </div>
    </div>
  );
}
