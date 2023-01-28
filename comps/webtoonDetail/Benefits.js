import { RoundFilter } from "../../utils/svgs";

export default function Benefits() {
  return (
    <div className="mt-7 flex flex-col gap-4">
      <div className="text-2xl font-bold">Benefits</div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <RoundFilter />
        <div className="box aspect-square">
          <div className="innerBox"></div>
        </div>
        <div className="relative ">
          <div className="innerBox"></div>
        </div>
      </div>
    </div>
  );
}
