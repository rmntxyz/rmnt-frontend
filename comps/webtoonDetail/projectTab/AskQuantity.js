import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CollectButton from "./CollectButton";

export default function AskQuantity(props) {
  const {
    // onCollect,
    // isReady,
    // isCollecting,
    // isCollected,
    // isCollectError,
    // notEnoughBalance,
    // supplyLimitReached,
    // holdingLimitReached,
    matic,
  } = props;
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState(1);

  return (
    <div>
      {/* <!-- Modal toggle --> */}
      <button
        onClick={() => setOpen(true)}
        className="border-2 bg-mintGreen border-mintGreen hover:bg-navBg hover:text-white duration-200 px-11 py-3 mt-8 text-navBg text-base leading-tight font-bold rounded-full"
        aria-label="Collect Avatar"
      >
        Collect
      </button>

      {/* <!-- Main modal --> */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-fit p-4"
        style={{ display: open ? "block" : "none" }}
      >
        <div clasName="relative w-full h-full max-w-md md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative bg-[#24262A] border border-[#3D3F42] rounded-lg shadow">
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-400 bg-transparent bg-[#373A40] border border-[#3D3F42] rounded-full text-sm w-6 aspect-square flex items-center justify-center hover:scale-110"
              onClick={() => setOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="px-6 py-6 sm:px-8">
              <h3 className="mb-4 text-xl font-medium">Collect Avatar</h3>
              <div className="space-y-6 flex flex-col justify-center">
                <div>
                  <div className="block mb-2 text-sm font-medium">
                    Select Quantity
                  </div>
                  <div class="flex items-center justify-center h-10 w-full rounded-lg relative bg-transparent mt-1">
                    <button
                      onClick={() => setCounter(counter - 1)}
                      className=" bg-gray-300 text-[#24262A] h-full w-20 rounded-l cursor-pointer  hover:text-navBg hover:bg-white"
                    >
                      <span class="m-auto text-2xl font-thin">−</span>
                    </button>
                    <div className="w-full h-full font-bold flex items-center justify-center bg-[#373A40]">
                      <span>{counter}</span>
                    </div>
                    <button
                      onClick={() => setCounter(counter + 1)}
                      className="bg-gray-300 text-[#24262A] h-full w-20 rounded-r cursor-pointer  hover:text-navBg hover:bg-white"
                    >
                      <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                </div>
                <div>
                  <div className="mb-2 text-sm font-medium">MATIC Amount</div>
                  <div className="bg-[#373A40] text-sm rounded-lg w-full p-2.5">
                    {matic * counter} MATIC
                  </div>
                </div>
                <CollectButton {...props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
