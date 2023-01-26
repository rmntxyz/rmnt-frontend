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

  // //Enable maximization of the selected NFT
  // const [isFullscreen, setIsFullscreen] = useState(false);
  // useEffect(() => {
  //   document.addEventListener("fullscreenchange", exitHandler);
  //   document.addEventListener("webkitfullscreenchange", exitHandler);
  //   document.addEventListener("mozfullscreenchange", exitHandler);
  //   document.addEventListener("MSFullscreenChange", exitHandler);

  //   function exitHandler() {
  //     if (
  //       !document.fullscreenElement &&
  //       !document.webkitIsFullScreen &&
  //       !document.mozFullScreen &&
  //       !document.msFullscreenElement
  //     ) {
  //       setIsFullscreen(false);
  //     }
  //   }
  // });
  // const handleFullscreen = () => {
  //   getOrExitFullscreen();
  //   setIsFullscreen(!isFullscreen);
  // };

  // const getOrExitFullscreen = () => {
  //   if (!document.fullscreenElement) {
  //     if (document.getElementById("maximizableElement").requestFullscreen) {
  //       document.getElementById("maximizableElement").requestFullscreen();
  //       // setIsFullscreen(true);
  //     } else if (
  //       document.getElementById("maximizableElement").mozRequestFullScreen
  //     ) {
  //       document.getElementById("maximizableElement").mozRequestFullScreen(); // Firefox
  //       // setIsFullscreen(true);
  //     } else if (
  //       document.getElementById("maximizableElement").webkitRequestFullscreen
  //     ) {
  //       document.getElementById("maximizableElement").webkitRequestFullscreen(); // Chrome and Safari
  //       // setIsFullscreen(true);
  //     }
  //   }
  //   if (document.fullscreenElement) {
  //     if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //       // setIsFullscreen(false);
  //     } else if (document.msExitFullscreen) {
  //       document.msExitFullscreen();
  //       // setIsFullscreen(false);
  //     } else if (document.mozCancelFullScreen) {
  //       document.mozCancelFullScreen();
  //       // setIsFullscreen(false);
  //     } else if (document.webkitExitFullscreen) {
  //       document.webkitExitFullscreen();
  //       // setIsFullscreen(false);
  //     }
  //   }
  // };

  // //Get screen size to disable autoplay on mobile
  // const [screenWidth, setScreenWidth] = useState();
  // useEffect(() => setScreenWidth(window.outerWidth));

  //Add blur to the image being loaded
  // const [blur, setBlur] = useState(true);
  // const handleBlur = () => {
  //   setBlur(false);
  // };
  return (
    <div
      // onClick={(e) => handleFullscreen()}
      // className={`${
      //   isFullscreen ? "hover:cursor-pointer" : "hover:cursor-zoom-in"
      // }

      className="container"
      // style={{ opacity: loading ? 0 : 100 }}
    >
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
        className="fixed w-full container bottom-0"
        style={{
          display:
            scrollPosition + viewportHeight >= imageHeight + 80 ||
            click === false
              ? "none"
              : "block",
        }}
      >
        <div className="flex items-center justify-center gap-8 py-8 font-bold">
          <a
            href={
              "/webtoons/episode/" + allEpisodes[episode.page_number - 2]?.id
            }
            style={{
              display: allEpisodes[episode.page_number - 2] ? "block" : "none",
            }}
            className="gradientBorder py-3 px-4 bg-black"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-3 text-lg" />
            Ep.{episode.page_number - 1}
          </a>
          <a
            href={"/webtoons/episode/" + allEpisodes[episode.page_number]?.id}
            style={{
              display: allEpisodes[episode.page_number] ? "block" : "none",
            }}
            className="gradientBorder py-3 px-4 bg-black"
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
  );
}
