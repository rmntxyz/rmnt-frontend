// importing the Alchemy SDK
import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

const networkMap = {
  137: Network.MATIC_MAINNET,
  80001: Network.MATIC_MUMBAI
}

// function to get all the minters of the NFT Collection
export function useHolders(nftAddress, chainId, max = 100, first = 7) {
  const [holders, setHolders] = useState([]);
  const [orderInfo, setOrderInfo] = useState({ minters: [], ownersMap: {} });
  const [noMore, setNoMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [next, setLoadingNext] = useState(null);

  const config = {
    apiKey: process.env.NEXT_PUBLIC_POLYGON_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
    network: networkMap[chainId] // Replace with the network your NFT contract is deployed to.
  };

  const alchemy = new Alchemy(config);

  useEffect(() => {
    // setIsLoading(true);

    if (!nftAddress) {
      return;
    }

    const fetchMinters = async () => {
      const { owners } = await alchemy.nft.getOwnersForContract(nftAddress, {
        withTokenBalances: true,
      });
      const ownersMap = owners
        .flatMap(({ ownerAddress, tokenBalances }) =>
          tokenBalances.map((t) => ({ [Number(t.tokenId)]: ownerAddress }))
        )
        .reduce((acc, x) => Object.assign(acc, x), {});

      // for minting order
      const minters = await getMinters(alchemy, nftAddress, max);
      setOrderInfo({ minters, ownersMap });
    };

    fetchMinters();
  }, []);

  useEffect(() => {
    const { minters, ownersMap } = orderInfo;

    if (minters.length === 0) {
      return;
    }

    const fetchHolders = async (start, end) => {
      setIsLoading(true);
      const result = await Promise.all(
        minters.slice(start, end).map(async (ordered) => {
          const { tokenId } = ordered;
          const metadata = await alchemy.nft.getNftMetadata(
            nftAddress,
            tokenId,
            {
              tokenType: "ERC721",
            }
          );

          const owner = ownersMap[tokenId];
          const imageUrl = metadata.media.find(
            (m) => m.format === "png"
          )?.thumbnail;
          const { timeLastUpdated } = metadata;

          return { tokenId, owner, imageUrl, timeLastUpdated };
        })
      );
      setHolders([...holders, ...result]);
      setIsLoading(false);
    };

    fetchHolders(0, first);
  }, [orderInfo]);

  useEffect(() => {
    const { minters, ownersMap } = orderInfo;

    if (holders.length === 0 || minters.length === 0) {
      return;
    }

    const next = () => async (more) => {
      if (noMore || isLoading) {
        return;
      }

      const start = holders.length;
      const end = holders.length + more;

      setIsLoading(true);
      const result = await Promise.all(
        minters.slice(start, end).map(async (ordered) => {
          const { tokenId } = ordered;
          const metadata = await alchemy.nft.getNftMetadata(
            nftAddress,
            tokenId,
            {
              tokenType: "ERC721",
            }
          );

          const owner = ownersMap[tokenId];
          const imageUrl = metadata.media.find(
            (m) => m.format === "png"
          )?.thumbnail;
          const { timeLastUpdated } = metadata;

          return { tokenId, owner, imageUrl, timeLastUpdated };
        })
      );
      setHolders([...holders, ...result]);
      setIsLoading(false);
    };

    setNoMore(holders.length >= minters.length);
    setLoadingNext(next);
  }, [holders]);

  return { holders, isLoading, noMore, next };
}

/**
 * @see https://docs.alchemy.com/docs/how-to-get-minters-of-an-nft-collection#checking-if-the-minters-still-hold-the-nft
 */
async function getMinters(alchemy, nftAddress, quantity) {
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
