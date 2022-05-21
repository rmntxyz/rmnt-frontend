import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ProgressBar from "./ProgressBar";

export default function Viewer({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexofFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexofFirstItem, indexOfLastItem);

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center gap-1.5 md:gap-4 md:mx-8 lg:gap-8">
        <button
          onClick={handlePrevbtn}
          disabled={currentPage == pages[0] ? true : false}
          className="w-8 aspect-square rounded-full text-white bg-ourBlack disabled:bg-neutral-200 md:w-14"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-base md:text-2xl"
          />
        </button>

        {currentItems?.map((item, idx) => (
          <div
            key={idx}
            className="max-w-[70%] overflow-x-scroll p-3.5 border border-darkGray rounded-sm bg-white drop-shadow-medium md:p-5"
          >
            <img
              width={590}
              height={590}
              src={item}
              className="xl:max-w-[590px]"
            />
          </div>
        ))}

        <button
          onClick={handleNextbtn}
          disabled={currentPage == pages[pages.length - 1] ? true : false}
          className="w-8 aspect-square rounded-full text-white bg-ourBlack disabled:bg-neutral-200 md:w-14"
        >
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-base md:text-2xl"
          />
        </button>
      </div>
      <ProgressBar currentPage={currentPage} totalPages={pages.length} />
    </div>
  );
}

