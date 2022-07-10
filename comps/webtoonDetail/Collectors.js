export default function Collectors({ users }) {
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
    <div
      className={`${
        uniqueUsers && uniqueUsers.length
          ? "bg-white text-ourBlack"
          : "bg-darkGray text-white"
      }  border-2 border-mediumGray flex flex-col p-6 md:p-8`}
    >
      <div className="font-bold mb-3 md:text-2xl md:mb-4">Collectors</div>
      <div className="text-sm mb-6 md:text-lg md:mb-8">
        By purchasing a limited edition NFT of the webtoon series, collectors
        can leave a comment.
      </div>
      <div
        className={`${
          uniqueUsers &&
          uniqueUsers.length &&
          "grid grid-cols-3 gap-x-5 gap-y-3 sm:grid-cols-5"
        }`}
      >
        {uniqueUsers && uniqueUsers.length ? (
          uniqueUsers.map((user, idx) => (
            <a
              href={"/users/" + user.id}
              key={idx}
              className="group relative hover:cursor-pointer"
            >
              {user.profile_picture !== null &&
              user.profile_picture !== undefined &&
              user.profile_picture !== "" ? (
                <img
                  src={user.profile_picture}
                  className="rounded-full col-span-1"
                />
              ) : (
                <img
                  src="/profile/profile_1440_768@2x.png"
                  className="rounded-full col-span-1"
                />
              )}
              <div className="opacity-0 transition-opacity absolute text-[#555555] group-hover:opacity-100">
                <div>{user.name}</div>
                <div className="px-3 py-1 bg-lightGray text-white text-xs rounded-full">
                  {user.wallet_address}
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
