import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ListItem from "./ListItem";

export default function List({ data }) {
  //Paginate webtoon cards
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexofFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexofFirstItem, indexOfLastItem);

  //Enable navigation between pages
  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="mx-auto xl:max-w-[1280px] 2xl:max-w-[1380px]">
      <div className="mx-8 mt-10 mb-20 md:ml-14 md:mb-32 lg:mt-16">
        <div className="relative flex items-center justify-between mb-8 md:mb-14 ">
          <div className="text-xl font-extrabold md:text-4xl lg:mx-auto">
            Featured Series
          </div>
          <div className="flex items-center lg:absolute lg:right-0">
            <a
              href="/webtoons"
              className="whitespace-nowrap px-6 py-2 my-2 text-sm font-normal bg-white text-ourBlack leading-tight rounded-3xl duration-200 md:text-base hover:drop-shadow-lg md:hover:underline md:hover:drop-shadow-none"
              style={
                data.length > 40
                  ? { display: "inline-block" }
                  : { display: "none" }
              }
            >
              View all
            </a>
            <div className={`${data.length > 8 ? "flex" : "hidden"}`}>
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
        </div>
        <div className="scroll-large overflow-x-auto">
          <div className="min-w-[956px] gap-x-5 gap-y-12 grid grid-cols-4 md:min-w-[1184px] md:gap-x-8 md:gap-y-16 ">
            {currentItems?.map((item) => (
              <ListItem key={item.webtoon_id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
