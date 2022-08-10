import Image from "next/image";

export default function Collectors({ users }) {
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
    <div
      className={`bg-darkGray text-white border-2 border-mediumGray flex flex-col p-6 md:p-8`}
    >
      <div className="font-bold mb-3 text-sm md:text-lg md:mb-4">
        Collectors
      </div>
      <div className="text-xs text-lightGray mb-6 md:text-base md:mb-8">
        By purchasing a limited edition NFT of the webtoon series, collectors
        can leave a comment.
      </div>
      <div
        className={`${
          uniqueUsers &&
          uniqueUsers.length &&
          "grid grid-cols-4 gap-x-5 gap-y-3 sm:grid-cols-6"
        }`}
      >
        {uniqueUsers && uniqueUsers.length ? (
          uniqueUsers.map((user, idx) => (
            <a
              href={"/users/" + user?.id}
              key={idx}
              className="group relative hover:cursor-pointer rounded-full border-2 border-white w-14 h-14 md:w-[74px] md:h-[74px] lg:w-20 lg:h-20"
            >
              <Image
                src={
                  user?.attributes.profile_image.data.attributes.url?.length > 0
                    ? user?.attributes.profile_image.data.attributes.url
                    : "/profile/profile_1440_768@2x.png"
                }
                layout="fill"
                objectFit="contain"
                className="rounded-full col-span-1 "
                alt="Rarement NFT Collector Profile Picture"
              />
              <div className="opacity-0 transition-opacity absolute top-10 text-[#555555] p-2 rounded-md md:top-16 group-hover:opacity-100">
                <div className="text-white">{user?.attributes.first_name}</div>
                <div className="px-3 py-1 bg-lightGray text-white text-xs rounded-full">
                  {user?.attributes.wallet_address}
                </div>
              </div>
            </a>
          ))
        ) : (
          <div>
            <div className="h-px w-full bg-[#3A3A3A]"></div>
            <div className="mt-6 font-bold md:text-xl md:mt-8">
              :) Be the special backer!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
