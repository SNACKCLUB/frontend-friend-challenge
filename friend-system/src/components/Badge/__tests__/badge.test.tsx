import React from "react";
import { render, screen } from "@testing-library/react";
import Badge from "../Badge"; 

describe("Badge Component", () => {
  it("Should render correctly when count is greater than 0", () => {
    render(<Badge count={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("Should does not render when count is 0", () => {
    const { container } = render(<Badge count={0} />);
    expect(container.firstChild).toBeNull();
  });

  it("Should does not render when count is negative", () => {
    const { container } = render(<Badge count={-3} />);
    expect(container.firstChild).toBeNull();
  });

  it("Should renders with the correct text", () => {
    render(<Badge count={10} />);
    expect(screen.getByText("10")).toBeInTheDocument();
  });
});
