import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Bugsnag from "@bugsnag/js";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map((data) => {
      Bugsnag.notify(`[GraphQL error]: Message: ${data.message}`, (event) => {
        event.addMetadata("data", data);
      });
    });
  }

  if (networkError) {
    Bugsnag.notify(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: "https://api.brokalys.com",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
});

export default client;
