import { render, screen } from "@testing-library/react";
import SupportButton from "./SupportButton";

describe("SupportButton", () => {
  it("renders a button", () => {
    render(<SupportButton />);

    expect(screen.getByText("Atbalstīt šo projektu")).toBeInTheDocument();
  });
});
