import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
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
      <div className="min-w-[50%] flex items-center justify-center">
        <button
          onClick={handlePrevbtn}
          disabled={currentPage == pages[0] ? true : false}
          className="m-2.5 w-8 h-8 rounded-full text-white bg-ourBlack disabled:bg-neutral-200"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        {currentItems?.map((item, idx) => (
          <div
            key={idx}
            className="p-3 border border-darkGray rounded-sm bg-white drop-shadow-medium"
          >
            <Image width={268} height={268} src={item} />
          </div>
        ))}

        <button
          onClick={handleNextbtn}
          disabled={currentPage == pages[pages.length - 1] ? true : false}
          className="m-2.5 w-8 h-8 rounded-full text-white bg-ourBlack disabled:bg-neutral-200"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <ProgressBar currentPage={currentPage} totalPages={pages.length} />
    </div>
  );
}
