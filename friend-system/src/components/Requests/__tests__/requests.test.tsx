import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Requests from "../Requests";
import useFriendRequests from "../../../hooks/useFriendRequests";

jest.mock("../../../hooks/useFriendRequests");

describe("Requests Component", () => {
  const mockAcceptRequest = jest.fn();
  const mockDeclineRequest = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should display loading state", () => {
    (useFriendRequests as jest.Mock).mockReturnValue({
      requests: [],
      loading: true,
      acceptRequest: mockAcceptRequest,
      declineRequest: mockDeclineRequest,
    });

    render(<Requests />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("Should display 'No pending requests' when request list is empty", () => {
    (useFriendRequests as jest.Mock).mockReturnValue({
      requests: [],
      loading: false,
      acceptRequest: mockAcceptRequest,
      declineRequest: mockDeclineRequest,
    });

    render(<Requests />);

    expect(screen.getByText("No pending requests.")).toBeInTheDocument();
  });

  it("Should display friend requests when they exist", () => {
    (useFriendRequests as jest.Mock).mockReturnValue({
      requests: [
        { id: 1, name: "John Doe", avatar: "/images/johndoe.png" },
      ],
      loading: false,
      acceptRequest: mockAcceptRequest,
      declineRequest: mockDeclineRequest,
    });

    render(<Requests />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "John Doe" })).toHaveAttribute("src", "/images/johndoe.png");
    expect(screen.getByRole("button", { name: "Accept Friend Request" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Decline Friend Request" })).toBeInTheDocument();
  });

  it("Should call acceptRequest when clicking 'Accept' button", () => {
    (useFriendRequests as jest.Mock).mockReturnValue({
      requests: [
        { id: 1, name: "John Doe", avatar: "/images/johndoe.png" },
      ],
      loading: false,
      acceptRequest: mockAcceptRequest,
      declineRequest: mockDeclineRequest,
    });

    render(<Requests />);

    fireEvent.click(screen.getByRole("button", { name: "Accept Friend Request" }));

    expect(mockAcceptRequest).toHaveBeenCalledWith("John Doe");
  });

  it("Should call declineRequest when clicking 'Decline' button", () => {
    (useFriendRequests as jest.Mock).mockReturnValue({
      requests: [
        { id: 1, name: "John Doe", avatar: "/images/johndoe.png" },
      ],
      loading: false,
      acceptRequest: mockAcceptRequest,
      declineRequest: mockDeclineRequest,
    });

    render(<Requests />);

    fireEvent.click(screen.getByRole("button", { name: "Decline Friend Request" }));

    expect(mockDeclineRequest).toHaveBeenCalledWith("John Doe");
  });
});
