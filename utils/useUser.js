import { gql, useQuery } from "@apollo/client";
import { useAccount } from "wagmi";

export default function useUser() {
  //Get user's address & ID (temporary)
  const { address } = useAccount();
  if (!address) return null;
  const USER_ID = gql`
    query User($username: String!) {
      usersPermissionsUsers(filters: { username: { eq: $username } }) {
        data {
          id
        }
      }
    }
  `;

  const { data: userData } = useQuery(USER_ID, {
    variables: {
      username: address,
    },
  });
  const loggedInUser = userData ? userData.usersPermissionsUsers.data[0] : null;

  return loggedInUser;
}
