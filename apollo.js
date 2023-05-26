import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

// const defaultOptions = {
//   watchQuery: {
//     // fetchPolicy: 'network-only',
//     errorPolicy: 'ignore',
//   },
//   query: {
//     // fetchPolicy: 'network-only',
//     errorPolicy: 'all',
//   },
// }

const client = new ApolloClient({
  // uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  //https://www.apollographql.com/docs/react/data/file-uploads/
  //https://www.apollographql.com/blog/graphql/file-uploads/with-react-hooks-typescript-amazon-s3-tutorial/
  link: createUploadLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT }),
  cache: new InMemoryCache(),
  // defaultOptions: defaultOptions
});

export default client;
