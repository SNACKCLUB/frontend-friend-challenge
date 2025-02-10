import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button Component", () => {
  it("Should render the button with default variant (primary)", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-[#7D00FF] text-white hover:brightness-110 shadow-md");
  });

  it("Should render the button with a custom class", () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toHaveClass("custom-class");
  });

  describe.each([
    ["primary", "bg-[#7D00FF] text-white hover:brightness-110 shadow-md"],
    ["secondary", "bg-[#2D0A40] text-gray-300 hover:bg-[#3B1153]"],
    ["sidebar", "bg-[#2D0A40] text-gray-300 hover:bg-[#3B1153] text-left"],
    ["danger", "bg-red-600 text-white hover:bg-red-700 shadow-md"],
  ] as const)("Button Component Variants", (variant, expectedClass) => {
    it(`Should render the button with ${variant} variant`, () => {
      render(<Button variant={variant}>Click me</Button>);
      const button = screen.getByRole("button", { name: /click me/i });

      expect(button).toHaveClass(expectedClass);
    });
  });

  it("Should handle click events correctly", () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Click me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("Should render disabled button when 'disabled' prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: /disabled/i });

    expect(button).toBeDisabled();
  });

  it("Should set 'aria-label' to 'button' when children is not a string", () => {
    render(
      <Button>
        <span>🔔</span>
      </Button>
    );
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("aria-label", "button");
  });
});
