import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ListItem from "./ListItem";

export default function List({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

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
      <div className="my-36">
        <div className="relative mx-3 flex items-center justify-between ">
          <div className="text-xl font-extrabold md:text-4xl lg:mx-auto">
            Featured Series
          </div>
          <div className="flex items-center lg:absolute lg:right-0">
            <a
              href="/webtoons"
              className="inline-block whitespace-nowrap px-6 py-2 my-2 text-sm font-normal bg-white text-ourBlack leading-tight rounded-3xl transition duration-150 ease-in-out md:text-base hover:drop-shadow-lg md:hover:underline md:hover:drop-shadow-none"
            >
              View all
            </a>
            <div className="hidden md:flex">
              <button
                onClick={handlePrevbtn}
                disabled={currentPage == pages[0] ? true : false}
                className="m-2.5 w-8 h-8 rounded-full text-white bg-ourBlack disabled:bg-neutral-200"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                onClick={handleNextbtn}
                disabled={currentPage == pages[pages.length - 1] ? true : false}
                className="m-2.5 w-8 h-8 rounded-full text-white bg-ourBlack disabled:bg-neutral-200"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto flex my-5 md:grid md:grid-cols-2 md:my-10 xl:grid-cols-4">
          {currentItems?.map((item) => (
            <ListItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
