import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rmnt-test-apollo-server.herokuapp.com/",
  cache: new InMemoryCache(),
});

export default client;
