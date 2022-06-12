import { NFTData } from "../../../comps/Homedata";

// function getDropped(NFT) {
//   if (new Date(NFT.drop_timestamp).getTime() > new Date().getTime()) {
//     return false;
//   } else return true;
// }

function getAllEditions(NFT) {
  return NFTData.filter(
    (item) => item.created_by === NFT.created_by && item.name === NFT.name
  );
}

export default function handler(req, res) {
  try {
    const NFTs = NFTData;
    const NFTsWithTotalEditions = NFTs.map((NFT) => ({
      ...NFT,
      // all_editions: getAllEditions(NFT),
      total_editions: getAllEditions(NFT).length,
      editions_title:
        getAllEditions(NFT)[0].name +
        " by " +
        getAllEditions(NFT)[0].created_by,
    }));
    res.status(200).json(NFTsWithTotalEditions);
  } catch (err) {
    res.status(500).json({ error: "Failed to load" });
  }
}
