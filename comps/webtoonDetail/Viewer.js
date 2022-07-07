import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// import required modules
import { Navigation, Scrollbar, Pagination } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ProgressBar from "./ProgressBar";

export default function Viewer({ data }) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="container mx-auto max-w-[800px]">
      <div className="flex flex-col items-center justify-center ">
        <div className="w-[95%] flex items-center justify-center md:gap-4 lg:gap-8 ">
          <button className="swiper-button-previous w-8 aspect-square rounded-full text-white bg-ourBlack duration-200 hover:drop-shadow-large disabled:bg-neutral-200 disabled:hover:drop-shadow-none md:w-14">
            <FontAwesomeIcon icon={faArrowLeft} className="md:text-2xl" />
          </button>
          <Swiper
            modules={[Navigation, Scrollbar, Pagination]}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            freeMode={true}
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
                if ((index + 1).toString().length < 2) {
                  pageNumber = "0" + (index + 1);
                } else pageNumber = index + 1;
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
          <button className="swiper-button-toNext w-8 aspect-square rounded-full text-white bg-ourBlack duration-200 hover:drop-shadow-large disabled:bg-neutral-200 disabled:hover:drop-shadow-none md:w-14">
            <FontAwesomeIcon icon={faArrowRight} className="md:text-2xl" />
          </button>
        </div>
        <div className="container relative mx-auto mt-5 max-w-[78%] md:mt-8  lg:max-w-[75%] xl:max-w-[73%]">
          <div className="absolute swiper-scrollbar top-2.5 h-2.5 rounded-xl border border-ourBlack !bg-transparent !overflow-hidden">
            <div className="swiper-scrollbar-drag z-20 !bg-ourBlack "></div>
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
