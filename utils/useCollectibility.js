import { useContractRead } from "wagmi";

export default function useCollectibility(rarement, rarementABI) {
  const { contractAddress, price, maxSupply } = rarement;
  const {
    data: totalSupply,
    isError: isReadingError,
    isLoading: isReading,
  } = useContractRead({
    address: contractAddress,
    abi: rarementABI,
    functionName: "totalSupply",
  });

  return { totalSupply, maxSupply, isReading };
}
