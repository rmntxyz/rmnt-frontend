import { ApolloClient, InMemoryCache } from "@apollo/client";

// const defaultOptions = {
//   watchQuery: {
//     fetchPolicy: 'network-only',
//     errorPolicy: 'ignore',
//   },
//   query: {
//     fetchPolicy: 'network-only',
//     errorPolicy: 'all',
//   },
// }

const client = new ApolloClient({
  uri: "https://rmnt-test-apollo-server.herokuapp.com/",
  cache: new InMemoryCache(),
  // defaultOptions: defaultOptions
});

export default client;
