import { getProvider } from "@wagmi/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const chainId = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 137 : 80001;

export default function useCollectibility(rarement, rarementABI) {
  const { contractAddress, maxSupply } = rarement;

  const [totalSupply, setTotalSupply] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const provider = getProvider({ chainId });
  const contract = new ethers.Contract(contractAddress, rarementABI, provider);

  useEffect(() => {
    const readTotalSupply = async () => {
      const value = await contract.totalSupply();

      setIsLoading(false);
      setTotalSupply(value);
    };

    readTotalSupply();
  }, )

  return { totalSupply, maxSupply, isLoading };
}
