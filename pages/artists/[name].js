import { gql } from "@apollo/client";
import client from "../../apollo";
import Desc from "../../comps/profile/Desc";
import NFT from "../../comps/profile/NFT";
import Webtoons from "../../comps/profile/Webtoons";
import Seo from "../../comps/SEO";
// import { artistsUrl, NFTsUrl, usersUrl, webtoonsUrl } from "../../comps/URLs";

// export async function getServerSideProps(context) {
//   const { name } = context.query;
//   const artistRes = await fetch(artistsUrl + name);
//   const artist = await artistRes.json();
//   const webtoonsRes = await fetch(webtoonsUrl);
//   const webtoons = await webtoonsRes.json();
//   const artistWebtoons = webtoons.filter(
//     (item) => item.artist_id === artist.id
//   );
//   const NFTsRes = await fetch(NFTsUrl);
//   const NFTs = await NFTsRes.json();
//   const artistNFTs = NFTs.filter((item) => item.created_by === artist.name);
//   const usersRes = await fetch(usersUrl);
//   const users = await usersRes.json();
//   return {
//     props: {
//       artist: artist,
//       webtoons: artistWebtoons,
//       NFTs: artistNFTs,
//       users: users,
//     },
//   };
// }

export async function getServerSideProps(context) {
  const { name } = context.query;
  const { data } = await client.query({
    query: gql`
      query Artist($name: String!) {
        artist(name: $name) {
          name
          description
          profile_picture
          background_picture
          email
          instagram
          twitter
          wallet_address
          opensea
          collection
          webtoons {
            id
            title
            volume
            pages
            collectors
          }
          NFTs {
            id
            webtoon_id
            name
            owned_by
            image_address
            editions_title
            user {
              id
              profile_picture
            }
          }
        }
      }
    `,
    variables: {
      name: name,
    },
  });
  return {
    props: {
      artist: data.artist,
      users: data.artist.NFTs.map((NFT) => NFT.user),
    },
  };
}

export default function Artist({ artist, users }) {
  return (
    <div className="overflow-x-hidden">
      <Seo title={artist.name} />
      <Desc props={artist} />
      <Webtoons webtoons={artist.webtoons} users={users} artist={artist.name} />
      <NFT users={users} artist={artist} />
    </div>
  );
}
