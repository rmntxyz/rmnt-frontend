import {
  faArrowLeft,
  faArrowRight,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import CurrentEpisode from "./CurrentEpisode";

export default function Viewer({ webtoon, allEpisodes, episode }) {
  // //Get screen size to change object fit on mobile
  // const [screenWidth, setScreenWidth] = useState();
  // useEffect(() => {
  //   setScreenWidth(window.outerWidth);
  // });

  //Scroll to top when the up button is pressed
  const isBrowser = () => typeof window !== "undefined";

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="container mx-auto">
      <div className="mx-auto">
        <div className="flex flex-col scroll">
          <div>
            <CurrentEpisode episode={episode} allEpisodes={allEpisodes} />
            <div className="relative">
              <div className="flex items-center justify-center gap-8 py-8 font-bold">
                <a
                  href={
                    "/webtoons/episode/" +
                    allEpisodes[episode.page_number - 2]?.id
                  }
                  style={{
                    display: allEpisodes[episode.page_number - 2]
                      ? "block"
                      : "none",
                  }}
                  className="py-3 px-4 border border-black/20 bg-black/[0.04] rounded-full"
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="mr-3 text-lg"
                  />
                  Ep.{episode.page_number - 1}
                </a>
                <a
                  href={
                    "/webtoons/episode/" + allEpisodes[episode.page_number]?.id
                  }
                  style={{
                    display: allEpisodes[episode.page_number]
                      ? "block"
                      : "none",
                  }}
                  className="py-3 px-4 border border-black/20 bg-black/[0.04] rounded-full"
                >
                  Ep.{episode.page_number + 1}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="ml-3 text-lg"
                  />
                </a>
              </div>
              <button onClick={scrollToTop}>
                <FontAwesomeIcon
                  icon={faArrowUp}
                  className="absolute right-0 top-0 m-8 px-3.5 py-3 border border-black/20 bg-black/[0.04] rounded-full text-lg"
                />
              </button>
            </div>
            <a
              href={"/webtoons/" + episode.webtoon_id.data.id}
              className="flex items-center max-w-[931px] mt-4"
            >
              <div className="mx-auto flex items-center max-w-full">
                <div className="truncate font-extrabold uppercase text-sm md:text-2xl">
                  {webtoon.title}
                </div>
              </div>
            </a>
          </div>
          <div className="mx-auto max-w-full mt-[22px] md:mt-6 md:max-w-[931px]">
            <div className="flex overflow-x-auto pb-3 gap-x-2 md:gap-x-5">
              {allEpisodes.map((item, idx) => (
                <a key={idx} href={"/webtoons/episode/" + item.id}>
                  <Image
                    alt="Rarement Webtoon Episode"
                    width={158}
                    height={158}
                    src={webtoon.cover_image.data.attributes.url}
                    layout="responsive"
                  />
                  <div className="w-[158px]">
                    <div className="truncate mx-auto text-xs md:text-base">
                      Ep.{item.attributes.page_number}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
