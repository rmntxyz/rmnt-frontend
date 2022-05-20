import ListItem from "../../comps/home/List/ListItem";
import { webtoonsUrl } from "../../comps/URLs";

export async function getStaticProps() {
  const webtoonsRes = await fetch(webtoonsUrl);
  const webtoonsData = await webtoonsRes.json();
  return { props: { webtoonsData } };
}

export default function Webtoons({ webtoonsData }) {
  return (
    <div className="container mx-auto">
      <div className="grid mx-8 my-10 gap-x-5 gap-y-10 sm:grid-cols-2 sm:my-20 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
        {webtoonsData
          .sort((a, b) => b.id - a.id)
          .sort((a, b) => b.undropped.length - a.undropped.length)
          .map((item) => (
            <ListItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}
