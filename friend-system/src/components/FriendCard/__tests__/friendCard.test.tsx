import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FriendCard from "../FriendCard";
import { Friend } from "../../../types";

const mockFriend: Friend = {
  id: 1,
  name: "John Doe",
  avatar: "/images/johndoe.png",
};

describe("FriendCard Component", () => {
  it("Should render friend details correctly", () => {
    render(
      <FriendCard 
        friend={mockFriend} 
        actionType="explore" 
        onAction={jest.fn()} 
      />
    );

    expect(screen.getByText(mockFriend.name)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: mockFriend.name })).toHaveAttribute("src", mockFriend.avatar);
  });

  it("Should display 'Friend' badge when isFriend is true", () => {
    render(
      <FriendCard 
        friend={mockFriend} 
        isFriend 
        actionType="friend" 
        onAction={jest.fn()} 
      />
    );

    expect(screen.getByText("Friend")).toBeInTheDocument();
  });

  it("Should display 'Pending' badge when isPending is true", () => {
    render(
      <FriendCard 
        friend={mockFriend} 
        isPending 
        actionType="explore" 
        onAction={jest.fn()} 
      />
    );

    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("Should display 'Remove' button when actionType is 'friend' and isFriend is true", () => {
    render(
      <FriendCard 
        friend={mockFriend} 
        isFriend 
        actionType="friend" 
        onAction={jest.fn()} 
      />
    );

    expect(screen.getByRole("button", { name: "Remove Friend" })).toBeInTheDocument();
  });

  it("Should call onAction when clicking 'Remove' button", () => {
    const onActionMock = jest.fn();
    
    render(
      <FriendCard 
        friend={mockFriend} 
        isFriend 
        actionType="friend" 
        onAction={onActionMock} 
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Remove Friend" }));

    expect(onActionMock).toHaveBeenCalledTimes(1);
  });

  it("Should display 'Accept' and 'Decline' buttons when actionType is 'request'", () => {
    render(
      <FriendCard 
        friend={mockFriend} 
        actionType="request" 
        onAction={jest.fn()} 
        onSecondaryAction={jest.fn()} 
      />
    );

    expect(screen.getByRole("button", { name: "Accept Friend Request" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Decline Friend Request" })).toBeInTheDocument();
  });

  it("Should call correct functions when clicking 'Accept' and 'Decline' buttons", () => {
    const onAcceptMock = jest.fn();
    const onDeclineMock = jest.fn();
    
    render(
      <FriendCard 
        friend={mockFriend} 
        actionType="request" 
        onAction={onAcceptMock} 
        onSecondaryAction={onDeclineMock} 
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Accept Friend Request" }));
    expect(onAcceptMock).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "Decline Friend Request" }));
    expect(onDeclineMock).toHaveBeenCalledTimes(1);
  });

  it("Should display 'Add Friend' button when actionType is 'explore'", () => {
    render(
      <FriendCard 
        friend={mockFriend} 
        actionType="explore" 
        onAction={jest.fn()} 
      />
    );

    expect(screen.getByRole("button", { name: "Add Friend" })).toBeInTheDocument();
  });

  it("Should call onAction when clicking 'Add Friend' button", () => {
    const onActionMock = jest.fn();
    
    render(
      <FriendCard 
        friend={mockFriend} 
        actionType="explore" 
        onAction={onActionMock} 
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Add Friend" }));

    expect(onActionMock).toHaveBeenCalledTimes(1);
  });
});
