import { gql } from "@apollo/client";
import client from "../../apollo";
import Desc from "../../comps/profile/Desc";
import UserNFT from "../../comps/profile/UserNFT";
import Seo from "../../comps/SEO";
// import { NFTsUrl, usersUrl, webtoonsUrl } from "../../comps/URLs";

// export async function getServerSideProps(context) {
//   const { id } = context.query;
//   const usersRes = await fetch(usersUrl);
//   const users = await usersRes.json();
//   const NFTsRes = await fetch(NFTsUrl);
//   const NFTs = await NFTsRes.json();
//   const webtoonsRes = await fetch(webtoonsUrl);
//   const webtoons = await webtoonsRes.json();
//   const userNFTs = NFTs.filter((item) => item.owned_by === parseInt(id));
//   return {
//     props: {
//       user: users.find((user) => user.id === parseInt(id)),
//       NFTs: userNFTs,
//       users: users,
//       webtoons: webtoons,
//     },
//   };
// }

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { data } = await client.query({
    query: gql`
      query User($userId: Int!) {
        user(id: $userId) {
          id
          profile_picture
          name
          wallet_address
          NFTs {
            name
            editions_title
            image_address
            webtoon_id
          }
        }
        allWebtoons {
          id
          title
          volume
        }
        allNFTs {
          editions_title
          owned_by
        }
        allUsers {
          id
          profile_picture
          wallet_address
          name
        }
      }
    `,
    variables: {
      userId: parseInt(id),
    },
  });
  return {
    props: {
      user: data.user,
      NFTs: data.allNFTs,
      users: data.allUsers,
      webtoons: data.allWebtoons,
    },
  };
}

export default function User({ user, NFTs, users, webtoons }) {
  return (
    <div className="overflow-x-hidden">
      <Seo title="Rarement" />
      <Desc props={user} />
      <UserNFT user={user} NFTs={NFTs} users={users} webtoons={webtoons} />
    </div>
  );
}
