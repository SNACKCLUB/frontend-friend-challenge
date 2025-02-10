import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FriendsList from "../FriendsList";
import useFriends from "../../../hooks/useFriends";
import FriendCard from "../../FriendCard";
import { Friend } from "../../../types";

jest.mock("../../../hooks/useFriends");

jest.mock("../../FriendCard", () => ({
  __esModule: true,
  default: ({ onAction }: { onAction: () => void }) => (
    <button data-testid="friend-card" onClick={onAction}>
      Mocked FriendCard
    </button>
  ),
}));

const mockFriends: Friend[] = [
  { id: 1, name: "John Doe", avatar: "/images/johndoe.png" },
  { id: 2, name: "Jane Doe", avatar: "/images/janedoe.png" },
];

describe("FriendsList Component", () => {
  it("Should render the title correctly", () => {
    (useFriends as jest.Mock).mockReturnValue({
      friends: [],
      loading: false,
      removeFriend: jest.fn(),
    });

    render(<FriendsList />);

    expect(screen.getByText("FRIENDS LIST")).toBeInTheDocument();
  });

  it("Should display loading state when loading is true", () => {
    (useFriends as jest.Mock).mockReturnValue({
      friends: [],
      loading: true,
      removeFriend: jest.fn(),
    });

    render(<FriendsList />);

    expect(screen.getByText("Loading friends...")).toBeInTheDocument();
  });

  it("Should display empty message when there are no friends", () => {
    (useFriends as jest.Mock).mockReturnValue({
      friends: [],
      loading: false,
      removeFriend: jest.fn(),
    });

    render(<FriendsList />);

    expect(
      screen.getByText("You don’t have any friends yet. Start adding new friends in the Explore tab!")
    ).toBeInTheDocument();
  });

  it("Should render FriendCard components when friends are present", () => {
    (useFriends as jest.Mock).mockReturnValue({
      friends: mockFriends,
      loading: false,
      removeFriend: jest.fn(),
    });

    render(<FriendsList />);

    expect(screen.getAllByTestId("friend-card")).toHaveLength(mockFriends.length);
  });

  it("Should call removeFriend when clicking remove button on FriendCard", () => {
    const removeFriendMock = jest.fn();
    (useFriends as jest.Mock).mockReturnValue({
      friends: mockFriends,
      loading: false,
      removeFriend: removeFriendMock,
    });
  
    render(<FriendsList />);
  
    const friendCards = screen.getAllByTestId("friend-card");
    fireEvent.click(friendCards[0]);
  
    expect(removeFriendMock).toHaveBeenCalledTimes(1);
    expect(removeFriendMock).toHaveBeenCalledWith(mockFriends[0].id);
  });
  
});
