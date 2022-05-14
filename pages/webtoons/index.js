import { webtoonData } from "../../comps/Homedata";
import ListItem from "../../comps/home/List/ListItem";

export default function Webtoons() {
  return (
    <div className="container mx-auto">
      <div className="grid mx-8 my-10 gap-x-5 gap-y-10 sm:grid-cols-2 sm:my-20 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
        {webtoonData
          .sort((a, b) => b.id - a.id)
          .sort((a, b) => a.minted - b.minted)
          .map((item, idx) => (
            <ListItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}
