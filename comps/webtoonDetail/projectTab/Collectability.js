import { useEffect, useState } from "react";
import { Eth } from "../../../utils/svgs";
import { ethers } from 'ethers'

export default function Collectability({ avatar, rarementABI, exchangeRate }) {
  //TODO Determine the number of all avatars and available avatars
  const [rarementContract, setRarementContract] = useState(null);

  const rarement = avatar.attributes.rarement?.data.attributes;
  const {contractAddress} = rarement; 
  const { ethereum } = global;

  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const rarementContract = new ethers.Contract(
      contractAddress,
      rarementABI,
      signer
    );

    rarementContract
    //let nftTx = await nftContract.createEternalNFT()
				//console.log('Mining....', nftTx.hash)
				//setMiningStatus(0)

				//let tx = await nftTx.wait()
				//setLoadingState(1)
				//console.log('Mined!', tx)
				//let event = tx.events[0]
				//let value = event.args[2]
				//let tokenId = value.toNumber()
  }

  const collected = 0;

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <Eth />
          <div className="font-bold text-sm">
            {parseFloat(rarement.price) / Math.pow(10, 18)}{" "}
            ETH
          </div>
          <div className="text-white/50 text-sm">
            (≈{" "}
            {(
              (exchangeRate * parseFloat(rarement.price)) /
              Math.pow(10, 18)
            ).toFixed(3)}{" "}
            USD)
          </div>
        </div>
        <div className="ml-4">
          <div>
            <span className="font-bold">Collected {collected}</span>
            <span>/{rarement.maxSupply}</span>
          </div>
        </div>
      </div>
      <button
        aria-label="Collect NFT"
        className="py-3 mt-8"
        disabled={collected === rarement.maxSupply}
      >
        <span
          className={`${
            collected === rarement.maxSupply 
              ? "bg-white/20"
              : "border-2 bg-mintGreen border-mintGreen hover:bg-navBg hover:text-white duration-200"
          } px-8 py-3   text-navBg text-base leading-tight font-bold rounded-3xl`}
        >
          {collected === rarement.maxSupply ? "Soldout" : "Collect"}
        </span>
      </button>
    </div>
  );
}
