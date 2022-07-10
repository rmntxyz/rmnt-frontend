import Collection from "./Collection";

export default function UserNFT({ user, NFTs, users, webtoons }) {
  return (
    <div className="bg-lightBeige py-12 md:py-20">
      <div className="container mx-auto">
        <div className="mx-auto max-w-[82%] md:max-w-[77%] lg:max-w-[90%]">
          <ul className="relative flex gap-4 mb-5 md:gap-6 md:mb-8">
            <li>
              <button className="text-lg font-bold py-2 px-[18px] md:py-3 md:px-6 md:text-2xl">
                Collection {user.NFTs.length}
              </button>
              <div className="w-full h-[3px] bg-ourBlack rounded-sm"></div>
            </li>
            <div className="absolute bottom-0 w-full h-px bg-ourBlack opacity-[15%]"></div>
          </ul>
          <div>
            {user.NFTs.length > 0 ? (
              <Collection
                collections={user.NFTs}
                // users={users}
                // webtoons={webtoons}
                // NFTs={NFTs}
              />
            ) : (
              <div className="text-center text-base py-8 md:py-14 md:text-xl lg:py-20">
                {user.name} does not own any RMNT NFT.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
