import Seo from "../../comps/SEO";
import { artistsUrl } from "../../comps/URLs";

export async function getServerSideProps(context) {
  const { name } = context.query;
  const artistRes = await fetch(artistsUrl + name);
  const artist = await artistRes.json();
  return { props: artist };
}

export default function Artist(props) {
  return (
    <div className="mt-20 overflow-x-hidden">
      <Seo title={props.name} />
      <div>{props.name}</div>
    </div>
  );
}
