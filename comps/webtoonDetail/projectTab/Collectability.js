import { useEffect, useState } from "react";
import { ethers, BigNumber } from "ethers";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
} from "wagmi";
import { ConnectButton } from "0xpass";
import { Polygon } from "../../../utils/svgs";

export default function Collectability({ avatar, rarementABI, exchangeRate }) {
  const [isLoading, setIsLoading] = useState(true);
  const { isConnected, isConnecting } = useAccount();

  const rarement = avatar.attributes.rarement?.data.attributes;
  const { contractAddress, price, maxSupply } = rarement;

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: rarementABI,
    functionName: "mint",
    overrides: {
      value: BigNumber.from(price),
    },
    args: [1],
  });

  const { write: collect, isSuccess } = useContractWrite(config);

  const {
    data: totalSupply,
    isError: isReadingError,
    isLoading: isReading,
  } = useContractRead({
    address: contractAddress,
    abi: rarementABI,
    functionName: "totalSupply",
  });

  useEffect(() => {
    if (isConnected && !isReading) {
      setIsLoading(false);
    }
  }, [isConnected, isReading]);

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <Polygon />
          <div className="font-bold text-sm">
            {ethers.utils.formatEther(price)} MATIC
          </div>
          <div className="text-white/50 text-sm">
            ≈ {exchangeRate * ethers.utils.formatEther(price)} USD
          </div>
        </div>
        <div className="ml-4">
          <div>
            <span className="font-bold">Collected {totalSupply}</span>
            <span>/{maxSupply}</span>
          </div>
        </div>
      </div>
      {isConnecting ? (
        <button
          aria-label="Collect NFT"
          className="animate-pulse px-8 py-3 mt-8 w-32 h-12 bg-white/20 text-navBg text-base leading-tight font-bold rounded-3xl"
        ></button>
      ) : isConnected ? (
        <button
          onClick={() => collect?.()}
          aria-label="Collect NFT"
          // disabled={totalSupply === maxSupply}
          disabled={
            !collect || isLoading || isSuccess || totalSupply === maxSupply
          }
          className={`${
            totalSupply === maxSupply
              ? "bg-white/20"
              : isSuccess
              ? "bg-mintGreen"
              : "border-2 bg-mintGreen border-mintGreen hover:bg-navBg hover:text-white duration-200"
          } px-8 py-3 mt-8 text-navBg text-base leading-tight font-bold rounded-3xl`}
        >
          {totalSupply === maxSupply
            ? // "Soldout" : "Collect"
              "Soldout"
            : isSuccess
            ? "Collected!!"
            : "Collect"}
        </button>
      ) : (
        <ConnectButton.Custom>
          {({ openConnectModal }) => {
            return (
              <button
                onClick={openConnectModal}
                aria-label="Connect Wallet"
                className="border-2 bg-mintGreen border-mintGreen hover:bg-navBg hover:text-white duration-200 px-8 py-3 mt-8 text-navBg text-base leading-tight font-bold rounded-3xl"
              >
                Connect Wallet
              </button>
            );
          }}
        </ConnectButton.Custom>
      )}
    </div>
  );
}
