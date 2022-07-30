import Collection from "./Collection";

export default function UserNFT({ user, NFTs }) {
  //Remove duplicate NFT names from the array (so if the user has purchased multiple editions of a single NFT, only one card will be displayed as opposed to multiple cards)
  const uniqueIds = [];
  const uniqueCollections = NFTs.filter((item) => {
    const isDuplicate = uniqueIds.includes(item.attributes.name);
    if (!isDuplicate) {
      uniqueIds.push(item.attributes.name);
      return true;
    }
    return false;
  });
  return (
    <div className="bg-lightBeige py-12 md:py-20">
      <div className="container mx-auto">
        <div className="mx-auto max-w-[82%] md:max-w-[77%] lg:max-w-[90%]">
          <ul className="relative flex gap-4 mb-5 md:gap-6 md:mb-8">
            <li>
              <div className="text-lg font-bold py-2 px-[18px] md:py-3 md:px-6 md:text-2xl">
                Collection {uniqueCollections.length}
              </div>
              <div className="w-full h-[3px] bg-ourBlack rounded-sm"></div>
            </li>
            <div className="absolute bottom-0 w-full h-px bg-ourBlack opacity-[15%]"></div>
          </ul>
          <div>
            {NFTs.length > 0 ? (
              <Collection collections={uniqueCollections} />
            ) : (
              <div className="text-center text-base py-8 md:py-14 md:text-xl lg:py-20">
                {user.attributes.first_name} does not own any RMNT NFT.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
