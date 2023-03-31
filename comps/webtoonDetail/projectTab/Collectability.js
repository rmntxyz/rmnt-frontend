import { useEffect, useState } from "react";
import { ethers, BigNumber } from "ethers";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useSigner,
} from "wagmi";
import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
  fetchBalance,
  fetchSigner,
} from "@wagmi/core";
import { ConnectButton } from "0xpass";
import { Polygon } from "../../../utils/svgs";
import useRarementData from "../../../utils/useRarementData";

import CollectButton from "./CollectButton";

function weiToEther(wei, precision = 2) {
  wei = Math.floor(wei);
  return Number.parseFloat(ethers.utils.formatEther(wei)).toFixed(precision);
}

export default function Collectability({ avatar, rarementABI, exchangeRate }) {
  const { isConnected, address } = useAccount();
  const { data: signer } = useSigner();

  const rarement = avatar.attributes.rarement?.data.attributes;

  const { contract, rarementInfo, totalSupply, isLoaded } = useRarementData(
    rarement.contractAddress,
    rarementABI
  );

  const [onCollect, setOnCollect] = useState(null);
  // const [balance, setBalance] = useState(BigNumber.from(0));
  // const [estimatedCost, setEstimatedCost] = useState(BigNumber.from(0));
  const [quantity, setQuantity] = useState(1);
  const [holdingCount, setHoldingCount] = useState(0);
  const [isCollected, setIsCollected] = useState(false);
  const [isCollecting, setIsCollecting] = useState(false);
  const [isCollectError, setIsCollectError] = useState(false);
  const [isButtonReady, setIsButtonReady] = useState(false);

  useEffect(() => {
    const prepareCollect = async () => {
      if (!isLoaded || !signer) {
        return;
      }
      setIsButtonReady(false);

      const address = signer.getAddress(); 
      const count = await contract.balanceOf(address);
      setHoldingCount(count.toNumber());

      // const { value: balance } = await fetchBalance({ address });
      // setBalance(balance);

      // this is function returning a function...
      // because to pass arg to setOnCollect() as function
      const handler = () => async () => {
        try {
          setIsCollecting(true);

          const config = await prepareWriteContract({
            signer,
            address: rarement.contractAddress,
            abi: rarementABI,
            functionName: "mint",
            overrides: {
              value: rarementInfo.price.mul(quantity),
            },
            args: [quantity],
          });

          const { hash } = await writeContract(config);
          
          const receipt = await waitForTransaction({
            hash: hash,
            timeout: 2_000,
          });

          setIsCollected(true);

        } catch (e) {
          setIsCollectError(true);

        } finally {
          setIsCollecting(false);

          setTimeout(() => {
            setIsCollectError(false);
            setIsCollected(false);
          }, 3000);
        }
      };

      setOnCollect(handler);
      setIsButtonReady(true);
    };

    prepareCollect();
  }, [isLoaded, signer, quantity]);

  return (
    <div>
      {rarementInfo ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <Polygon />
              <div className="font-bold text-sm">{weiToEther(rarementInfo.price.toNumber(), 3)} MATIC</div>
              <div className="text-white/50 text-sm">
                ≈ {weiToEther(rarementInfo.price.toNumber() * exchangeRate, 2)} USD
              </div>
              <div></div>
          </div>
          <div className="ml-4">
            <div>
              <span className="font-bold">Collected {totalSupply}</span>
              <span>/{rarementInfo.maxSupply}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1">
            Loading...
          </div>
        </div>
      )}
      {isConnected ? (
        <CollectButton
          onCollect={onCollect}
          isReady={isButtonReady}
          isCollecting={isCollecting}
          isCollected={isCollected}
          isCollectError={isCollectError}
          // notEnoughBalance={balance.lt(estimatedCost)}
          supplyLimitReached={rarementInfo?.maxSupply === totalSupply}
          holdingLimitReached={rarementInfo?.maxMintablePerAccount === holdingCount}
        ></CollectButton>
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
