import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Bugsnag from "@bugsnag/js";
import packageJson from "../../package.json";
import { setContext } from "@apollo/client/link/context";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((data) => {
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
  uri: process.env.REACT_APP_API_URL,
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    "X-Api-Key": process.env.REACT_APP_BROKALYS_API_KEY,
  },
}));

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, authLink, httpLink]),
  version: packageJson.version,
});

export default client;
