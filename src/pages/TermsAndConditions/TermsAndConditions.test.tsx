import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import TermsAndConditions from "./TermsAndConditions";

describe("TermsAndConditions", () => {
  beforeEach(() => {
    render(<TermsAndConditions />, { wrapper: Router });
  });

  it("shows content text", () => {
    expect(screen.getByText("Lietošanas noteikumi")).toBeInTheDocument();
  });

  it("shows a link to return back", () => {
    expect(screen.getByText("Atgriezties")).toBeInTheDocument();
  });
});
