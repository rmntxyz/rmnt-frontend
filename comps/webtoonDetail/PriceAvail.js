import { Eth } from "../../utils/svgs";

export default function PriceAvail({ item, exchangeRate }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <Eth />
        <div className="font-bold text-sm">
          {parseFloat(item.attributes.price_in_wei) / Math.pow(10, 18)} ETH
        </div>
        <div
          className="text-white/50 text-sm"
          style={{
            visibility:
              item.attributes.sold_timestamp?.toString().length > 0
                ? "hidden"
                : "visible",
          }}
        >
          (≈{" "}
          {(
            (exchangeRate * parseFloat(item.attributes.price_in_wei)) /
            Math.pow(10, 18)
          ).toFixed(3)}{" "}
          USD)
        </div>
      </div>
      <div className="ml-4">
        {item.attributes.sold_timestamp?.toString().length > 0 ? (
          <span className="text-sm text-white/50 ml-1">(Soldout)</span>
        ) : (
          <div>
            <span className="font-bold"></span>
            <span>/{item.attributes.quantity}</span>
            <span className="text-sm text-white/50 ml-1">(Available)</span>
          </div>
        )}
      </div>
    </div>
  );
}
