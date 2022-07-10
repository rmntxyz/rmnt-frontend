import { faXmarkSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Collectors({ users }) {
  const [showModal, setShowModal] = useState(false);
  const uniqueIds = [];
  const uniqueUsers = users.filter((item) => {
    const isDuplicate = uniqueIds.includes(item.id);
    if (!isDuplicate) {
      uniqueIds.push(item.id);
      return true;
    }
    return false;
  });
  return (
    <div>
      {uniqueUsers.length > 0 ? (
        <div className="text-xs mt-3.5 md:mt-4 md:text-sm">
          Collectors
          <div className="flex items-center gap-3">
            <div className="w-1/2 grid grid-cols-5">
              {uniqueUsers.slice(0, 5).map((user) => (
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
              ))}
            </div>
            {uniqueUsers.length > 5 ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    setShowModal(!showModal);
                  }}
                  className="text-xs text-[#555555] hover:underline md:text-sm"
                >
                  {!showModal ? (
                    <div className="whitespace-nowrap lg:pl-1 xl:pl-0">
                      view all
                    </div>
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

      <div
        className={`duration-200 absolute p-2 rounded-md bottom-12 left-1/2 bg-lightBeige bg-opacity-80 ${
          showModal ? "opacity-100" : "opacity-0"
        } `}
      >
        {uniqueUsers.map((user) => (
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
    </div>
  );
}
