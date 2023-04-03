// importing the Alchemy SDK
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.NEXT_PUBLIC_POLYGON_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network:
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
      ? Network.MATIC_MAINNET
      : Network.MATIC_MUMBAI, // Replace with the network your NFT contract is deployed to.
};

const alchemy = new Alchemy(config);

// function to get all the minters of the NFT Collection
export async function getHolders(nftAddress, first = 7, max = 100) {
  let curIndex = 0;

  const { owners } = await alchemy.nft.getOwnersForContract(nftAddress, {
    withTokenBalances: true,
  });
  const ownersMap = owners
    .flatMap(({ ownerAddress, tokenBalances }) =>
      tokenBalances.map((t) => ({ [Number(t.tokenId)]: ownerAddress }))
    )
    .reduce((acc, x) => Object.assign(acc, x), {});

  // for minting order
  const minters = await getMinters(nftAddress, max);

  const holders = await Promise.all(
    minters.map(async (ordered) => {
      const { tokenId } = ordered;
      const metadata = await alchemy.nft.getNftMetadata(nftAddress, tokenId, {
        tokenType: "ERC721",
      });

      const owner = ownersMap[tokenId];
      const imageUrl = metadata.media.find(
        (m) => m.format === "png"
      )?.thumbnail;
      const { timeLastUpdated } = metadata;

      return { tokenId, owner, imageUrl, timeLastUpdated };
    })
  );

  return holders;
}

/**
 * @see https://docs.alchemy.com/docs/how-to-get-minters-of-an-nft-collection#checking-if-the-minters-still-hold-the-nft
 */
async function getMinters(nftAddress, quantity) {
  const minters = [];

  let pageKey;
  let firstCall = true;

  while ((firstCall || pageKey) && minters.length < quantity) {
    let res;
    if (pageKey) {
      res = await alchemy.core.getAssetTransfers({
        fromAddress: "0x0000000000000000000000000000000000000000",
        category: ["erc721"],
        contractAddresses: [nftAddress],
        pageKey: pageKey,
      });
    } else {
      res = await alchemy.core.getAssetTransfers({
        fromAddress: "0x0000000000000000000000000000000000000000",
        category: ["erc721"],
        contractAddresses: [nftAddress],
      });
    }

    firstCall = false; // Setting the `firstCall` variable to false, because it is not the first call anymore.

    // The API call returns an object with a `transfers` key, which is an array of all the transfers.

    // Looping through the response of the API call, that is, the transfers and pushing the `to` address to the `minters` array.
    // Because the `to` is the address that minted the NFT.
    for (let i = 0; i < res.transfers.length; i++) {
      const transfer = res.transfers[i];
      minters.push({ tokenId: parseInt(transfer.tokenId) }); // adding the `to` address to the `minters` array.
      if (minters.length === quantity) {
        break;
      }
    }

    pageKey = res.pageKey; // Setting the pageKey from the response of the API call.
  }

  return minters;
}
