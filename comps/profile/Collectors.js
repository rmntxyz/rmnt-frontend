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
                      <a
                        href={"/users/" + user.id}
                        key={user.id}
                        className="group relative hover:cursor-pointer"
                      >
                        {user.profile_picture !== null &&
                        user.profile_picture !== undefined &&
                        user.profile_picture !== "" ? (
                          <img
                            src={user.profile_picture}
                            className="rounded-full border-2 border-white min-w-[28px] md:min-w-[36px] lg:min-w-[32px]"
                          ></img>
                        ) : (
                          <img
                            src="/profile/profile_1440_768@2x.png"
                            className="rounded-full border-2 border-white min-w-[28px] md:min-w-[36px] lg:min-w-[32px]"
                          />
                        )}
                        <div className="opacity-0 w-8 transition-opacity absolute text-[#555555] group-hover:opacity-100">
                          <div>{user.name}</div>
                          <div className="px-3 py-1 min-w-fit bg-lightGray text-white text-xs rounded-full">
                            {user.wallet_address}
                          </div>
                        </div>
                      </a>
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
                      <a
                        href={"/users/" + user.id}
                        key={user.id}
                        className="group relative hover:cursor-pointer"
                      >
                        {user.profile_picture !== null &&
                        user.profile_picture !== undefined &&
                        user.profile_picture !== "" ? (
                          <img
                            src={user.profile_picture}
                            className="rounded-full border-2 border-white min-w-[28px] md:min-w-[36px] lg:min-w-[32px]"
                          ></img>
                        ) : (
                          <img
                            src="/profile/profile_1440_768@2x.png"
                            className="rounded-full border-2 border-white min-w-[28px] md:min-w-[36px] lg:min-w-[32px]"
                          />
                        )}
                        <div className="opacity-0 transition-opacity absolute text-[#555555] group-hover:opacity-100">
                          <div>{user.name}</div>
                          <div className="px-3 py-1 bg-lightGray text-white text-xs rounded-full">
                            {user.wallet_address}
                          </div>
                        </div>
                      </a>
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
              <a href={"/users/" + user.id} key={user.id} className="flex">
                {user.profile_picture !== null &&
                user.profile_picture !== undefined &&
                user.profile_picture !== "" ? (
                  <img
                    src={user.profile_picture}
                    className="rounded-full border-2 border-white w-8 h-8"
                  ></img>
                ) : (
                  <img
                    src="/profile/profile_1440_768@2x.png"
                    className="rounded-full border-2 border-white w-8 h-8"
                  />
                )}
                <div className="transition-opacity text-[#555555]">
                  <div>{user.name}</div>
                  <div className="px-3 py-1 bg-lightGray text-white text-xs rounded-full">
                    {user.wallet_address}
                  </div>
                </div>
              </a>
            ))}
        </div>
      ) : null}
    </div>
  );
}
