import { render, screen } from "@testing-library/react";
import PriceTypeLabel from "./PriceTypeLabel";

describe("PriceTypeLabel", () => {
  it("shows EUR label by default", () => {
    render(<PriceTypeLabel />);

    expect(screen.getByText("EUR", { exact: true })).toBeInTheDocument();
  });

  it("shows EUR/m2 label for SQM prices", () => {
    render(<PriceTypeLabel type="SQM" />);

    expect(screen.getByText("EUR/m")).toBeInTheDocument();
  });
});
