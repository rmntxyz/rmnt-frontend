import { gql } from "@apollo/client";
import client from "../../apollo";
import Seo from "../../comps/layout/SEO";
import Desc from "../../comps/profile/Desc";
import NFT from "../../comps/profile/NFT";
import Webtoons from "../../comps/profile/Webtoons";
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

const GET_ARTIST_DATA = gql`
  query Artist($name: String!) {
    artist(name: $name) {
      name
      description
      profile_image
      background_image
      email
      instagram
      twitter
      wallet_address
      opensea
      collection
      webtoons {
        webtoon_id
        title
        volume
        cover_image
        NFTs {
          nft_id
          name
          image
          webtoon {
            webtoon_id
            title
            volume
          }
          user {
            user_id
            profile_image
            wallet_address
            name
          }
        }
      }
    }
  }
`;

export async function getServerSideProps(context) {
  const { name } = context.query;
  const { data } = await client.query({
    query: GET_ARTIST_DATA,
    variables: {
      name: name,
    },
  });
  return {
    props: {
      artist: data.artist,
    },
  };
}

export default function Artist({ artist }) {
  return (
    <div className="overflow-x-hidden">
      <Seo title={artist.name} />
      <main>
        <Desc props={artist} />
        <Webtoons webtoons={artist.webtoons} artist={artist.name} />
        <NFT artist={artist} />
      </main>
    </div>
  );
}
