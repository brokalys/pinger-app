import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import PrivacyPolicy from "./PrivacyPolicy";

describe("PrivacyPolicy", () => {
  beforeEach(() => {
    render(<PrivacyPolicy />, { wrapper: Router });
  });

  it("shows content text", () => {
    expect(screen.getByText("Privātuma politika")).toBeInTheDocument();
  });

  it("shows a link to return back", () => {
    expect(screen.getByText("Atgriezties")).toBeInTheDocument();
  });
});
