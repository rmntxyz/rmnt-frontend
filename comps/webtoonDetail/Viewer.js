import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// import required modules
import { Navigation, Scrollbar, Pagination } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faMinusCircle,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

export default function Viewer({ data }) {
  //Identify current page for the progress bar
  const [currentPage, setCurrentPage] = useState(0);

  //Add blur to the image being loaded
  const [blur, setBlur] = useState(true);
  const handleBlur = () => {
    setBlur(false);
  };

  //Enable maximization of the selected page
  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    document.addEventListener("fullscreenchange", exitHandler);
    document.addEventListener("webkitfullscreenchange", exitHandler);
    document.addEventListener("mozfullscreenchange", exitHandler);
    document.addEventListener("MSFullscreenChange", exitHandler);

    function exitHandler() {
      if (
        !document.fullscreenElement &&
        !document.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement
      ) {
        setIsFullscreen(false);
      }
    }
  });

  const handleFullscreen = () => {
    getOrExitFullscreen();
    setIsFullscreen(!isFullscreen);
  };

  const getOrExitFullscreen = () => {
    if (!document.fullscreenElement) {
      if (document.getElementById("maximizableElement").requestFullscreen) {
        document.getElementById("maximizableElement").requestFullscreen();
        // setIsFullscreen(true);
      } else if (
        document.getElementById("maximizableElement").mozRequestFullScreen
      ) {
        document.getElementById("maximizableElement").mozRequestFullScreen(); // Firefox
        // setIsFullscreen(true);
      } else if (
        document.getElementById("maximizableElement").webkitRequestFullscreen
      ) {
        document.getElementById("maximizableElement").webkitRequestFullscreen(); // Chrome and Safari
        // setIsFullscreen(true);
      }
    }
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        // setIsFullscreen(false);
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        // setIsFullscreen(false);
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        // setIsFullscreen(false);
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        // setIsFullscreen(false);
      }
    }
  };
  return (
    <div className={`container mx-auto max-w-[800px]`}>
      <div className="flex flex-col items-center justify-center ">
        <div
          id="maximizableElement"
          className={`relative w-[93%] flex items-center justify-center gap-4 sm:gap-8 sm:w-[590px]`}
        >
          <button
            aria-label="Previous Page"
            className={`absolute z-10 top-[50%] left-1 swiper-button-previous w-8 aspect-square rounded-full text-white bg-ourBlack duration-200 hover:shadow-large disabled:bg-neutral-200 disabled:hover:shadow-none sm:left-2 sm:relative sm:w-14 ${
              isFullscreen &&
              "lg:-top-20 lg:bg-neutral-200 lg:text-ourBlack lg:disabled:bg-darkGray "
            }`}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="sm:text-2xl" />
          </button>
          <Swiper
            modules={[Navigation, Scrollbar, Pagination]}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            // freeMode={true}
            navigation={{
              nextEl: ".swiper-button-toNext",
              prevEl: ".swiper-button-previous",
            }}
            scrollbar={{
              draggable: true,
              hide: false,
              el: ".swiper-scrollbar",
            }}
            pagination={{
              type: "bullets",
              el: ".swiper-pagination",
              clickable: true,
              renderBullet: function (index, className) {
                let pageNumber = {};
                if (index.toString().length < 2) {
                  pageNumber = "0" + index;
                } else pageNumber = index;
                return (
                  '<span class="' +
                  className +
                  '">' +
                  "<span>" +
                  pageNumber +
                  "</span>" +
                  "</span>"
                );
              },
            }}
            onSlideChange={(swiper) => {
              setCurrentPage(swiper.realIndex);
            }}
            // observer={true}
            // observeParents={true}
            onSwiper={handleBlur}
            lazy={{ enabled: true, loadPrevNext: true }}
            preloadImages={false}
            className={`group min-w-[296px] max-w-[442px] w-[80%] border border-darkGray bg-white rounded-sm shadow-medium lg:max-w-[590px] ${
              isFullscreen && "lg:max-w-[600px]"
            }`}
          >
            {data.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative p-3.5 mx-auto sm:p-5">
                  <img
                    // onClick={(e) => handleFullscreen()}
                    src={item}
                    style={{
                      filter: blur ? "blur(20px)" : "none",
                      transition: blur ? "none" : "filter 0.3s ease-out",
                    }}
                    // placeholder="blur"
                    // blurDataURL={item}
                    width={590}
                    height={590}
                    // layout="responsive"
                    alt="RMNT Webtoon Page"
                  />
                  <FontAwesomeIcon
                    onClick={(e) => handleFullscreen()}
                    icon={isFullscreen ? faMinusCircle : faPlusCircle}
                    size={isFullscreen ? "3x" : "2x"}
                    className={`absolute hidden right-7 bottom-7 text-opaqueGray lg:group-hover:block ${
                      isFullscreen
                        ? "hidden lg:hover:cursor-zoom-out lg:bottom-14 lg:right-14"
                        : "lg:hover:cursor-zoom-in"
                    }`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            aria-label="Next Page"
            className={`absolute z-10 top-[50%] right-1 swiper-button-toNext w-8 aspect-square rounded-full text-white bg-ourBlack duration-200 hover:shadow-large disabled:bg-neutral-200 disabled:hover:shadow-none sm:right-2 sm:relative sm:w-14 ${
              isFullscreen &&
              "lg:-top-20 lg:bg-neutral-200 lg:text-ourBlack lg:disabled:bg-darkGray "
            }`}
          >
            <FontAwesomeIcon icon={faArrowRight} className="sm:text-2xl" />
          </button>
        </div>
        <div className="container relative mx-auto mt-5 max-w-[78%] sm:w-[442px] sm:mt-8">
          <div className="absolute swiper-scrollbar top-2.5 h-2.5 rounded-xl border border-ourBlack !bg-transparent !overflow-hidden">
            <div className="swiper-scrollbar-drag z-20 !bg-transparent "></div>
          </div>
          <div className="absolute inset-y-0 h-10 flex items-center justify-center swiper-pagination"></div>
          <ProgressBar
            currentPage={currentPage}
            totalPages={data.length}
            className="absolute inset-y-0"
          />
        </div>
      </div>
    </div>
  );
}
