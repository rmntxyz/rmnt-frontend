// importing the Alchemy SDK
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.NEXT_PUBLIC_GOERLI_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with the network your NFT contract is deployed to.
};
console.log(config);

if (process.env.NODE_ENV === 'production') {
  config.apiKey = process.env.NEXT_PUBLIC_MAINNET_ALCHEMY_API_KEY;
  config.network = Network.ETH_MAINNET;
}

const alchemy = new Alchemy(config);

// function to get all the minters of the NFT Collection
export async function getHolders(nftAddress) {

  const { owners } = await alchemy.nft.getOwnersForContract(nftAddress, { withTokenBalances: true });
  const ownersMap = owners.flatMap(({ ownerAddress, tokenBalances }) =>
    tokenBalances.map(t => ({ [Number(t.tokenId)]: ownerAddress }))
  ).reduce((acc, x) => Object.assign(acc, x), {});

  const minters = await getMinters(nftAddress);

  const holders = minters.map(mint => Object.assign(mint, {owner: ownersMap[mint.tokenId]}))

  // TODO add more data to return value 
  // const { nfts } = await alchemy.nft.getNftsForContract(nftAddress);

  return holders;
}

/**
 * @see https://docs.alchemy.com/docs/how-to-get-minters-of-an-nft-collection#checking-if-the-minters-still-hold-the-nft
 */
async function getMinters(nftAddress) {
  const minters = [];
  let pageKey;

  let firstCall = true;

  while (firstCall || pageKey) {
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
      minters.push({tokenId: parseInt(transfer.tokenId)}); // adding the `to` address to the `minters` array.
    }

    pageKey = res.pageKey; // Setting the pageKey from the response of the API call.
  }

  return minters;
}
