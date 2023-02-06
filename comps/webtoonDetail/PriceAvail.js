import { Eth } from "../../utils/svgs";

export default function PriceAvail({ avatars, exchangeRate }) {
  //Determine the number of all avatars and available avatars
  const all = avatars.length;
  const available = avatars.filter(
    (avatar) => !avatar.attributes.owned_by.data
  ).length;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <Eth />
        <div className="font-bold text-sm">
          {parseFloat(avatars[0]?.attributes.price_in_wei) / Math.pow(10, 18)}{" "}
          ETH
        </div>
        <div className="text-white/50 text-sm">
          (≈{" "}
          {(
            (exchangeRate * parseFloat(avatars[0]?.attributes.price_in_wei)) /
            Math.pow(10, 18)
          ).toFixed(3)}{" "}
          USD)
        </div>
      </div>
      <div className="ml-4">
        {available === 0 ? (
          <span className="text-sm text-white/50 ml-1">(Soldout)</span>
        ) : (
          <div>
            <span className="font-bold"></span>
            <span>
              {available}/{all}
            </span>
            <span className="text-sm text-white/50 ml-1">(Available)</span>
          </div>
        )}
      </div>
    </div>
  );
}
