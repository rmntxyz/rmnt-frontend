import Desc from "../../comps/artistProfile/Desc";
import NFT from "../../comps/artistProfile/NFT";
import Webtoons from "../../comps/artistProfile/Webtoons";
import Seo from "../../comps/SEO";
import { artistsUrl, NFTsUrl, usersUrl, webtoonsUrl } from "../../comps/URLs";

export async function getServerSideProps(context) {
  const { name } = context.query;
  const artistRes = await fetch(artistsUrl + name);
  const artist = await artistRes.json();
  const webtoonsRes = await fetch(webtoonsUrl);
  const webtoons = await webtoonsRes.json();
  const artistWebtoons = webtoons.filter(
    (item) => item.artist_id === artist.id
  );
  const NFTsRes = await fetch(NFTsUrl);
  const NFTs = await NFTsRes.json();
  const artist_NFTs = NFTs.filter((item) => item.created_by === artist.name);
  const usersRes = await fetch(usersUrl);
  const users = await usersRes.json();
  return {
    props: {
      artist: artist,
      webtoons: artistWebtoons,
      NFTs: artist_NFTs,
      users: users,
    },
  };
}

export default function Artist({ artist, webtoons, NFTs, users }) {
  return (
    <div className="overflow-x-hidden">
      <Seo title={artist.name} />
      <Desc artist={artist} />
      <Webtoons webtoons={webtoons} users={users} artist={artist.name} />
      <NFT NFTs={NFTs} users={users} webtoons={webtoons} artist={artist} />
    </div>
  );
}
