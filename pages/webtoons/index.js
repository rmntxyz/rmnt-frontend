import { webtoonData } from "../../homeComps/Homedata";
import ListItem from "../../homeComps/List/ListItem";


export default function Webtoons() {
  return (<div className="container mx-auto flex flex-col my-5 md:grid md:grid-cols-2 md:my-10 xl:grid-cols-4">
{webtoonData
  .sort((a,b) => b.id - a.id)
  .sort((a, b) => a.minted - b.minted).map((item, idx) => (
 <ListItem key={item.id} item={item} />
))}
  </div>)
}