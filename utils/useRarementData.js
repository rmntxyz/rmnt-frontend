import { getProvider } from "@wagmi/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export const chainId =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? 137 : 80001;

export default function useRarementData(
  rarementAddress,
  rarementABI,
  scopes = []
) {
  const [contract, setContract] = useState(null);
  const [rarementInfo, setRarementInfo] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const readRarementInfo = async () => {
      setIsError(false);
      setIsLoaded(false);
      setIsLoading(true);

      try {
        const provider = getProvider({ chainId });
        const rarementContract = new ethers.Contract(
          rarementAddress,
          rarementABI,
          provider
        );
        const info = await rarementContract.rarementInfo();
        const supply = await rarementContract.totalSupply();

        setContract(rarementContract);
        setTotalSupply(supply);
        setRarementInfo(info);

        setIsLoading(false);
        setIsLoaded(true);
      } catch (e) {
        setIsError(true);
      }
    };

    readRarementInfo();
  }, [...scopes]);

  return { contract, rarementInfo, totalSupply, isError, isLoading, isLoaded };
}
