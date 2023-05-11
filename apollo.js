import { ApolloClient, InMemoryCache } from "@apollo/client";

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
  cache: new InMemoryCache(),
  // defaultOptions: defaultOptions
});

export default client;
