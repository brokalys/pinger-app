import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
// @todo: re-enable when the issue is fixed and a new version of formatic-ui is released
// @see: https://github.com/Semantic-Org/Semantic-UI-React/issues/4227
// import 'semantic-ui-css/semantic.min.css';
import client from "shared/apollo-client";
import ErrorBoundary from "shared/bugsnag";
import "./index.css";
import App from "./pages";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root"),
);
