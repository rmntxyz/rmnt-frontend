import { gql } from "@apollo/client";
import client from "../../apollo";
import Seo from "../../comps/layout/SEO";
import Desc from "../../comps/profile/Desc";
import UserNFT from "../../comps/profile/UserNFT";
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
  const { user_id } = context.query;
  const { data } = await client.query({
    query: gql`
      query User($userId: String!) {
        user(user_id: $userId) {
          user_id
          profile_image
          name
          wallet_address
          NFTs {
            edition
            nft_id
            name
            image
            webtoon {
              webtoon_id
              title
              volume
              NFTs {
                name
                user {
                  user_id
                  name
                  profile_image
                  wallet_address
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      userId: user_id,
    },
  });
  return {
    props: {
      user: data.user,
    },
  };
}

export default function User({ user }) {
  return (
    <div className="overflow-x-hidden">
      <Seo title="Rarement" />
      <main>
        <Desc props={user} />
        <UserNFT user={user} />
      </main>
    </div>
  );
}
