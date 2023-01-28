import {
  faArrowLeft,
  faArrowRight,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CurrentEpisode({ episode, allEpisodes }) {
  const imageUrl = episode.page_image.data.attributes.url;
  const width = episode.page_image.data.attributes.width;
  const height = episode.page_image.data.attributes.height;

  //Scroll to top when the up button is pressed
  const isBrowser = () => typeof window !== "undefined";

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  //Get scroll position on the webtoon image
  const [scrollPosition, setScrollPosition] = useState(0);
  const [imageHeight, setImageHeight] = useState();
  const [viewportHeight, setViewportHeight] = useState();
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
    setImageHeight(document.getElementById("scrollableElement").clientHeight);
    setViewportHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //Detect click on image to show navigation buttons
  const [click, setClick] = useState(false);

  return (
    <div>
      <Image
        id="scrollableElement"
        onClick={() => setClick(!click)}
        alt="Rarement NFT Image"
        src={imageUrl}
        width={width}
        height={height}
        layout="responsive"
        objectFit="cover"
        placeholder="blur"
        blurDataURL={imageUrl}
      />
      <div
        className="fixed w-full bottom-0"
        style={{
          display:
            //80 equals the navbar height & 32 equals the margin below the image
            scrollPosition + viewportHeight >= imageHeight + 80 + 32 ||
            click === false
              ? "none"
              : "block",
        }}
      >
        <div className="relative max-w-[768px]">
          <div className="flex items-center justify-center gap-8 py-8 font-bold">
            <a
              href={
                "/webtoons/episode/" + allEpisodes[episode.page_number - 2]?.id
              }
              style={{
                display: allEpisodes[episode.page_number - 2]
                  ? "block"
                  : "none",
              }}
              className="gradientBorder py-3 px-4"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-3 text-lg" />
              Ep.{episode.page_number - 1}
            </a>
            <a
              href={"/webtoons/episode/" + allEpisodes[episode.page_number]?.id}
              style={{
                display: allEpisodes[episode.page_number] ? "block" : "none",
              }}
              className="gradientBorder py-3 px-4"
            >
              Ep.{episode.page_number + 1}
              <FontAwesomeIcon icon={faArrowRight} className="ml-3 text-lg" />
            </a>
          </div>
          <button onClick={scrollToTop}>
            <FontAwesomeIcon
              icon={faArrowUp}
              className="absolute right-0 top-0 gradientBorder m-8 px-3.5 py-3 text-lg"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
