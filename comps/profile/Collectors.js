import { faXmarkSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

export default function Collectors({ users }) {
  //Enable collector list pop-up
  const [showModal, setShowModal] = useState(false);

  //Remove duplicate collectors from the array
  const uniqueIds = [];
  const uniqueUsers = users.filter((item) => {
    if (item === null) return false;
    else {
      const isDuplicate = uniqueIds.includes(item.attributes.user_id);
      if (!isDuplicate) {
        uniqueIds.push(item.attributes.user_id);
        return true;
      }
      return false;
    }
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
                  <div className="rounded-full border-2 border-white  w-[28px] h-[28px] md:w-[36px] md:h-[36px] lg:w-[32px] lg:h-[32px]">
                    <Image
                      src={
                        user.attributes.profile_image
                          ? "https://rmnt.herokuapp.com" +
                            user.attributes.profile_image.data.attributes.url
                          : "/profile/profile_1440_768@2x.png"
                      }
                      width={36}
                      height={36}
                      layout="responsive"
                      className="rounded-full "
                      alt="Rarement NFT Collector Profile Image"
                    />
                  </div>
                  <div className="opacity-0 w-8 transition-opacity absolute text-[#555555] group-hover:opacity-100">
                    <div>{user.attributes.first_name}</div>
                    <div className="px-3 py-1 min-w-fit bg-lightGray text-white text-xs rounded-full">
                      {user.attributes.wallet_address}
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
                  aria-label="View All Collector List"
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
            <div className="rounded-full border-2 border-white w-8 h-8">
              <Image
                src={
                  user.attributes.profile_image
                    ? "https://rmnt.herokuapp.com" +
                      user.attributes.profile_image.data.attributes.url
                    : "/profile/profile_1440_768@2x.png"
                }
                width={32}
                height={32}
                layout="responsive"
                className="rounded-full"
                alt="Rarement NFT Collector Profile Image"
              ></Image>
            </div>
            <div className="transition-opacity text-[#555555]">
              <div>{user.attributes.first_name}</div>
              <div className="px-3 py-1 bg-lightGray text-white text-xs rounded-full">
                {user.attributes.wallet_address}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
