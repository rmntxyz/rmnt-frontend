import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Collectors from "../../detailPageComps/Collectors";
import NFT from "../../detailPageComps/NFT";
import { webtoonData } from "../../homeComps/Homedata";

export default function WebtoonItem() {
  const router = useRouter();
  const { id } = router.query;
  const item = webtoonData.find((item) => item.id === parseInt(id));
  if (!router.isReady) {
    return <h4>Loading...</h4>;
  } else
    return (
      <div>
      <div className="flex flex-col md:flex-row">
        <div>
          <div className="flex mt-3.5 items-center md:mt-4">
            <div className="truncate text-2xl font-extrabold uppercase">
              {item.title}
            </div>
            <div className="w-1 aspect-square m-2 bg-lightGray rounded-full md:m-4"></div>
            <div className="whitespace-nowrap text-base font-extrabold">
              vol {item.vol}
            </div>
          </div>
          <div>{item.desc}</div>
          <a>
            View all series
            <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
        <div className="flex flex-col">
          <div>
            <div className="flex">
              <img
                src={item.profile}
                className="rounded-full w-8 h-8 md:w-10 md:h-10"
              />
              <div>
                <div>{item.author}</div>
                <a href={item.authorWalletLink} rel="noreferrer" target="_blank">
                  <button className=" border-ourBlack bg-lightGray text-white text-md leading-tight whitespace-nowrap rounded-full transition duration-150 ease-in-out">
                    {item.authorWallet}
                  </button>
                </a>
              </div>
            </div>
            <div>{item.authorDesc}</div>
            <div className="flex">
              <div>
                <FontAwesomeIcon icon={faInstagram} />
                {item.authorInstagram}
              </div>
              <div>
                <FontAwesomeIcon icon={faEnvelope} />
                {item.authorEmail}
              </div>
            </div>
          </div>
          <Collectors collectors={item.collectors} />
        </div>
      </div>
      <NFT nft={item.nft} />
      </div>
    );
}
