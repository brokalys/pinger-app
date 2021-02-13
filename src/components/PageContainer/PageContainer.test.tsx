import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import PageContainer from "./PageContainer";

describe("PageContainer", () => {
  it("shows children content", () => {
    render(
      <PageContainer>
        <p>Children Text</p>
      </PageContainer>,
      { wrapper: Router },
    );

    expect(screen.getByText("Children Text")).toBeInTheDocument();
  });

  it("shows all the required footer links", () => {
    render(<PageContainer />, { wrapper: Router });

    expect(screen.getByText("Lietošanas noteikumi")).toBeInTheDocument();
    expect(screen.getByText("Privātuma politika")).toBeInTheDocument();
  });
});
