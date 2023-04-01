import { faInfoCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Line from "../../../../utils/Line";
import CollectButtonOnModal from "./CollectButtonOnModal";

export default function Modal(props) {
  const { matic, holdingCount, setOpen } = props;
  const [counter, setCounter] = useState(1);
  const [show, setShow] = useState(false);
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 min-[296px] bg-[#343434] rounded-2xl">
      <div className="">
        <div className="w-full flex items-center justify-between p-4">
          <span></span>
          <span className="font-bold">Collect Avatar</span>
          <button
            type="button"
            className="text-sm flex items-center justify-center hover:scale-110"
            onClick={() => setOpen(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <Line />
        <div className="flex items-center justify-between gap-20 p-4 text-[15px]">
          <div>{matic * counter} MATIC</div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCounter(counter - 1)}
              disabled={counter === 1}
              className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-opaqueGray text-mintGreen border border-mintGreen/20  disabled:text-mintGreen/20 disabled:border-none"
            >
              <span>−</span>
            </button>
            <div className="">
              <span>{counter}</span>
            </div>
            <button
              onClick={() => setCounter(counter + 1)}
              disabled={counter === 3 - holdingCount}
              className="flex items-center justify-center w-[34px] h-[34px] rounded-full bg-opaqueGray text-mintGreen border border-mintGreen/20 disabled:text-mintGreen/20 disabled:border-none"
            >
              <span className="">+</span>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-end gap-1 text-white/80 text-[13px] px-4 pt-2">
          <div
            className="relative"
            style={{ display: show ? "block" : "none" }}
          >
            <svg
              width="137"
              height="24"
              viewBox="0 0 137 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_2969_7591" fill="white">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 0C1.79086 0 0 1.79086 0 4V20C0 22.2091 1.79086 24 4 24H129C131.209 24 133 22.2091 133 20V14.6393L137 12L133 9.36068V4C133 1.79086 131.209 0 129 0H4Z"
                />
              </mask>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 0C1.79086 0 0 1.79086 0 4V20C0 22.2091 1.79086 24 4 24H129C131.209 24 133 22.2091 133 20V14.6393L137 12L133 9.36068V4C133 1.79086 131.209 0 129 0H4Z"
                fill="#3C3C3C"
              />
              <path
                d="M133 14.6393L132.449 13.8046L132 14.1011V14.6393H133ZM137 12L137.551 12.8347L138.816 12L137.551 11.1653L137 12ZM133 9.36068H132V9.89893L132.449 10.1954L133 9.36068ZM1 4C1 2.34315 2.34315 1 4 1V-1C1.23858 -1 -1 1.23858 -1 4H1ZM1 20V4H-1V20H1ZM4 23C2.34315 23 1 21.6569 1 20H-1C-1 22.7614 1.23858 25 4 25V23ZM129 23H4V25H129V23ZM132 20C132 21.6569 130.657 23 129 23V25C131.761 25 134 22.7614 134 20H132ZM132 14.6393V20H134V14.6393H132ZM136.449 11.1653L132.449 13.8046L133.551 15.474L137.551 12.8347L136.449 11.1653ZM132.449 10.1954L136.449 12.8347L137.551 11.1653L133.551 8.52601L132.449 10.1954ZM132 4V9.36068H134V4H132ZM129 1C130.657 1 132 2.34315 132 4H134C134 1.23858 131.761 -1 129 -1V1ZM4 1H129V-1H4V1Z"
                fill="white"
                fillOpacity="0.2"
                mask="url(#path-1-inside-1_2969_7591)"
              />
            </svg>
            <div className="absolute top-0.5 left-2 flex gap-2">
              <span>Max 3 per wallet</span>
              <button
                onClick={() => setShow(false)}
                className="hover:text-white"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>
          <button onClick={() => setShow(true)}>
            <FontAwesomeIcon icon={faInfoCircle} />
          </button>
          <span>Max : {3 - holdingCount}</span>
        </div>
        <div className="flex items-center justify-center p-4">
          <CollectButtonOnModal {...props} />
        </div>
      </div>
    </div>
  );
}
