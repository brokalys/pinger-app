import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "react-router-scroll-top";
import PageContainer from "components/PageContainer";
import Home from "./Home";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions";

export default function Routes() {
  return (
    <Router>
      <ScrollToTop>
        <PageContainer>
          <Switch>
            <Route path="/terms-and-conditions">
              <TermsAndConditions />
            </Route>
            <Route path="/privacy-policy">
              <PrivacyPolicy />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </PageContainer>
      </ScrollToTop>
    </Router>
  );
}
