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
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  //https://gist.github.com/alexandrebodin/fedc71c8513bfbb6283cc90ae62755c5
  //https://www.apollographql.com/docs/react/data/file-uploads/
  link: createUploadLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT }),
  cache: new InMemoryCache(),
  // defaultOptions: defaultOptions
});

export default client;
