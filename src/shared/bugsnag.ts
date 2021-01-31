import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import React from "react";

const apiKey = process.env.REACT_APP_BUGSNAG_KEY;
let ErrorBoundary: any = ({ children }: { children: React.ReactNode }) =>
  children;

if (apiKey) {
  Bugsnag.start({
    apiKey,
    plugins: [new BugsnagPluginReact()],
  });

  ErrorBoundary = Bugsnag.getPlugin("react")!.createErrorBoundary(React);
}

export default ErrorBoundary;
