import { Eth } from "../../../utils/svgs";

export default function PriceAvail({ avatar, exchangeRate }) {
  //TODO Determine the number of all avatars and available avatars

  const all = 0
  const available = 0;

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <Eth />
          <div className="font-bold text-sm">
            {parseFloat(avatar?.attributes.price_in_wei) / Math.pow(10, 18)}{" "}
            ETH
          </div>
          <div className="text-white/50 text-sm">
            (≈{" "}
            {(
              (exchangeRate * parseFloat(avatar?.attributes.price_in_wei)) /
              Math.pow(10, 18)
            ).toFixed(3)}{" "}
            USD)
          </div>
        </div>
        <div className="ml-4">
          <div>
            <span className="font-bold">Availability {available}</span>
            <span>/{all}</span>
          </div>
        </div>
      </div>
      <button
        aria-label="Collect NFT"
        className="py-3 mt-8"
        disabled={available === 0}
      >
        <span
          className={`${
            available === 0
              ? "bg-white/20"
              : "border-2 bg-mintGreen border-mintGreen hover:bg-navBg hover:text-white duration-200"
          } px-8 py-3   text-navBg text-base leading-tight font-bold rounded-3xl`}
        >
          {available === 0 ? "Soldout" : "Collect"}
        </span>
      </button>
    </div>
  );
}
