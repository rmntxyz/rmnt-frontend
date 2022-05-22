import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

// import required modules
import { Navigation, Scrollbar } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Viewer({ data }) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="container mx-auto max-w-[800px]">
      {data && data.length ? (
        <div className="flex flex-col items-center justify-center ">
          <div className="w-[95%] flex items-center justify-center md:gap-4 lg:gap-8 ">
            <button className="swiper-button-previous w-8 aspect-square rounded-full text-white bg-ourBlack disabled:bg-neutral-200 md:w-14">
              <FontAwesomeIcon icon={faArrowLeft} className="md:text-2xl" />
            </button>
            <Swiper
              modules={[Navigation, Scrollbar]}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1}
              navigation={{
                nextEl: ".swiper-button-toNext",
                prevEl: ".swiper-button-previous",
              }}
              scrollbar={{
                draggable: true,
                hide: false,
                el: ".swiper-scrollbar",
              }}
              onSlideChange={(swiper) => setCurrentPage(swiper.realIndex + 1)}
              observer={true}
              observeParents={true}
              className="w-[80%] border border-darkGray bg-white rounded-sm drop-shadow-medium lg:max-w-[590px]"
            >
              {data.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    width={590}
                    height={590}
                    src={item}
                    className="p-3.5 md:p-5 "
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="swiper-button-toNext w-8 aspect-square rounded-full text-white bg-ourBlack disabled:bg-neutral-200 md:w-14">
              <FontAwesomeIcon icon={faArrowRight} className="md:text-2xl" />
            </button>
          </div>
          <div className="container mx-auto mt-5 max-w-[78%] md:mt-8  lg:max-w-[75%] xl:max-w-[73%]">
            <div className="swiper-scrollbar border border-ourBlack h-2.5 rounded-xl !overflow-hidden  !bg-white">
              <div className="swiper-scrollbar-drag  !bg-ourBlack "></div>
            </div>
            <div className="relative w-full">
              <div className="absolute inset-y-0 right-0 font-bold text-sm m-2 md:m-4 md:text-2xl xl:-right-24 xl:-top-10">
                <span className="text-[#CEA671]">
                  {currentPage.toString().length < 2 ? (
                    <span>{"0" + currentPage}</span>
                  ) : (
                    <span>{currentPage}</span>
                  )}
                </span>
                <span>
                  {data.length.toString().length < 2 ? (
                    <span>/{"0" + data.length}</span>
                  ) : (
                    <span>/{data.length}</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
}
