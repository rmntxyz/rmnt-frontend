import { faXmarkSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Collectors({ collectors, users }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      {collectors.length > 0 ? (
        <div className="text-xs mt-3.5 md:mt-4 md:text-sm">
          Collectors
          <div className="flex items-center gap-3">
            <div className="w-1/2 grid grid-cols-5">
              {collectors.filter(
                (collector, index) => collectors.indexOf(collector) === index
              ).length > 5
                ? collectors
                    .filter(
                      (collector, index) =>
                        collectors.indexOf(collector) === index
                    )
                    .slice(0, 5)
                    .map((uniqueCollector) =>
                      users.find((user) => user.id === uniqueCollector)
                    )
                    .map((user) => (
                      <div
                        key={user.id}
                        className="group relative hover:cursor-pointer"
                      >
                        <img
                          src={user.profile_picture}
                          className="rounded-full border-2 border-white min-w-[28px] md:min-w-[36px] lg:min-w-[32px]"
                        ></img>
                        <div className="opacity-0 w-8 transition-opacity absolute text-[#555555] group-hover:opacity-100">
                          id: {user.id}
                        </div>
                      </div>
                    ))
                : collectors
                    .filter(
                      (collector, index) =>
                        collectors.indexOf(collector) === index
                    )
                    .map((uniqueCollector) =>
                      users.find((user) => user.id === uniqueCollector)
                    )
                    .map((user) => (
                      <div
                        key={user.id}
                        className="group relative hover:cursor-pointer"
                      >
                        <img
                          src={user.profile_picture}
                          className="rounded-full border-2 border-white min-w-[28px] md:min-w-[36px] lg:min-w-[32px]"
                        ></img>
                        <div className="opacity-0 w-8 transition-opacity absolute text-[#555555] group-hover:opacity-100">
                          id: {user.id}
                        </div>
                      </div>
                    ))}
            </div>
            {collectors.filter(
              (collector, index) => collectors.indexOf(collector) === index
            ).length > 5 ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    setShowModal(!showModal);
                  }}
                  className="text-xs text-[#555555] hover:underline md:text-sm"
                >
                  {!showModal ? (
                    "view all"
                  ) : (
                    <div className="flex items-center gap-1">
                      close
                      <FontAwesomeIcon icon={faXmarkSquare} />
                    </div>
                  )}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      {showModal ? (
        <div className="absolute p-2 rounded-md bottom-12 left-1/2 bg-lightBeige bg-opacity-80">
          {collectors
            .filter(
              (collector, index) => collectors.indexOf(collector) === index
            )
            .map((uniqueCollector) =>
              users.find((user) => user.id === uniqueCollector)
            )
            .map((user) => (
              <div key={user.id} className="flex">
                <img
                  key={user.id}
                  src={user.profile_picture}
                  className="rounded-full border-2 border-white w-8 "
                ></img>
                <div className="transition-opacity text-[#555555]">
                  id: {user.id}
                </div>
              </div>
            ))}
        </div>
      ) : null}
    </div>
  );
}
