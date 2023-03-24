import { useEffect, useState } from "react";
import { Eth } from "../../../utils/svgs";
import { ethers } from 'ethers'
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import { ConnectButton } from "0xpass";

export default function Collectability({ avatar, rarementABI, exchangeRate }) {
  //TODO Determine the number of all avatars and available avatars
  const [ isLoading, setIsLoading ] = useState(true);
  const { isConnected, isConnecting } = useAccount();

  const rarement = avatar.attributes.rarement?.data.attributes;
  const {contractAddress} = rarement; 

  console.log(rarementABI);
  const { config } = usePrepareContractWrite({
   address: contractAddress,
   abi: rarementABI,
   functionName: 'mint',
   overrides: {
    value: ethers.utils.parseEther('0.002')
   },
   args: [1]
  });

  const { write: collect, isSuccess, data } = useContractWrite(config);

  useEffect(() => {
    if (isConnected) {
      setIsLoading(false);
    }
  }, [isConnected])

  // FIXME
  const collected = 0;

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <Eth />
          <div className="font-bold text-sm">
            {parseFloat(rarement.price) / Math.pow(10, 18)}{" "}
            MATIC
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
      {
        isConnecting ?
          <button
            aria-label="Collect NFT"
            className="animate-pulse px-8 py-3 mt-8 w-32 h-12 bg-white/20 text-navBg text-base leading-tight font-bold rounded-3xl"
          >
          </button> :

        isConnected ?
          <button
            onClick={() => collect?.()}
            aria-label="Collect NFT"
            // disabled={collected === rarement.maxSupply}
            disabled={!collect || isLoading || isSuccess || collected === rarement.maxSupply}
            className={`${
                collected === rarement.maxSupply 
                  ? "bg-white/20" :
                    isSuccess ? "bg-mintGreen" :
                      "border-2 bg-mintGreen border-mintGreen hover:bg-navBg hover:text-white duration-200"
              } px-8 py-3 mt-8 text-navBg text-base leading-tight font-bold rounded-3xl`}
          >
            {
              collected === rarement.maxSupply ?
                // "Soldout" : "Collect"
                "Soldout" :
                (isSuccess ? "Collected!!" : "Collect")
            }
          </button> :

          <ConnectButton.Custom>
            {({ openConnectModal }) => {
              return <button
                onClick={openConnectModal}
                aria-label="Connect Wallet"
                className= "border-2 bg-mintGreen border-mintGreen hover:bg-navBg hover:text-white duration-200 px-8 py-3 mt-8 text-navBg text-base leading-tight font-bold rounded-3xl"
              >Connect Wallet</button>
            }}
          </ConnectButton.Custom>
      }
    </div>
  );
}
