import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import Collectors from "./Collectors";

export default function Webtoons({ webtoons, artist }) {
  //Paginate webtoon cards
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const pages = [];
  for (let i = 1; i <= Math.ceil(webtoons.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexofFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = webtoons.slice(indexofFirstItem, indexOfLastItem);

  //Enable navigation between pages
  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div id="webtoons" className="container mx-auto mb-6 md:mb-8">
      <div className="mx-auto max-w-[82%] md:max-w-[77%] lg:max-w-[90%]">
        <div className="relative  mb-5 md:mb-8">
          <div className="flex justify-between">
            <div>
              <div className="font-bold text-lg py-2 px-[18px] md:text-2xl md:py-3 md:px-6">
                Webtoon {webtoons.length}
              </div>
              <div className="w-full h-[3px] bg-ourBlack rounded-sm"></div>
            </div>
            <div className={`${webtoons.length > 8 ? "flex" : "hidden"}`}>
              <button
                onClick={handlePrevbtn}
                disabled={currentPage === pages[0] ? true : false}
                className="m-2.5 w-8 h-8 rounded-full text-white bg-ourBlack duration-200 hover:drop-shadow-large disabled:bg-neutral-200 disabled:hover:drop-shadow-none"
                aria-label="Previous"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                onClick={handleNextbtn}
                disabled={
                  currentPage === pages[pages.length - 1] ? true : false
                }
                className="m-2.5 w-8 h-8 rounded-full text-white bg-ourBlack duration-200 hover:drop-shadow-large disabled:bg-neutral-200 disabled:hover:drop-shadow-none"
                aria-label="Next"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 w-full h-px bg-ourBlack opacity-[15%]"></div>
        </div>
        {webtoons.length > 0 ? (
          <div className="scroll-xlarge overflow-x-auto">
            <div className="min-w-[956px] grid grid-cols-4 gap-5 md:min-w-[1184px] md:gap-8">
              {currentItems.map((item) => (
                <div
                  key={item.webtoon_id}
                  className="border border-ourBlack rounded-sm p-3.5 drop-shadow-small bg-white md:p-4 "
                >
                  <a
                    href={"/webtoons/" + item.webtoon_id}
                    className="relative group"
                  >
                    <Image
                      src={item.cover_image}
                      width={256}
                      height={256}
                      layout="responsive"
                      className="duration-200 hover:scale-125"
                      alt="Rarement Webtoon Cover Image"
                    />
                    <button
                      className="opacity-0 transition-opacity absolute top-3/4 inset-x-1/4 border-2 py-2 border-ourBlack bg-ourBlack text-white text-sm leading-tight font-bold whitespace-nowrap rounded-full group-hover:opacity-100"
                      aria-label="View Webtoon"
                    >
                      View webtoon
                    </button>
                  </a>
                  <div className="flex mt-3.5 items-center md:mt-4">
                    <div className="truncate text-base font-extrabold uppercase md:text-lg">
                      {item.title}
                    </div>
                    <div className="w-1 aspect-square m-1 bg-lightGray rounded-full"></div>
                    <div className="whitespace-nowrap text-sm font-extrabold md:text-base">
                      vol {item.volume}
                    </div>
                  </div>
                  <Collectors users={item.NFTs?.map((NFT) => NFT.user)} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-base py-8 md:py-14 md:text-xl lg:py-20">
            {artist} has not listed any webtoon.
          </div>
        )}
      </div>
    </div>
  );
}
