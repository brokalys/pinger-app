import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

export default function TermsAndConditions() {
  return (
    <>
      <h1>Lietošanas noteikumi</h1>

      <Link to="/">
        <Icon name="arrow left" /> Atgriezties
      </Link>
    </>
  );
}
