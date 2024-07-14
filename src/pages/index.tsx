import { HashRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "react-router-scroll-top";
import PageContainer from "components/PageContainer";
import Home from "./Home";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions";
import Pingers from "./Pingers";

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
            <Route path="/pingers/:id,:unsubscribe_key">
              <Pingers />
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
