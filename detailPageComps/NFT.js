import { faCheckCircle, faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import ListTimer from "../homeComps/List/ListTimer";

export default function NFT({ nft }) {
  const editions = nft.length
  const unminted = nft.filter((item) => item.minted === false);
  const lastUnminted =
    unminted.length > 0 ? unminted[unminted.length - 1] : null;

  return (
    <div className="bg-lightBeige">
      <div className="flex">
        <div>NFT</div>
        {lastUnminted ? (
          <ListTimer
            targetTime={lastUnminted.targetTime}
            className="bg-white text-black"
          />
        ) : null}
      </div>
      <div className="overflow-x-auto flex">
      {nft.map((item) => (
        <div key={item.id} className="">
          {item.sold ? (
            <div className="bg-ourBlack text-white">
              <FontAwesomeIcon icon={faCheckCircle} />
              Soldout
            </div>
          ) : (
            <div className="bg-mediumBeige text-ourBlack">
              <FontAwesomeIcon icon={faCircleDot} />
              Available
            </div>
          )}
          <div>
            <Image width={268} height={268} src={item.file} layout="responsive"/>
            <div>#{("0" +item.id).slice(-2)}. {item.name}</div>
            <div>{item.price} ETH</div>
            <div>Edition {item.edition} of {editions}</div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
