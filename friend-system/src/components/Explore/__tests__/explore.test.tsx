import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Explore from "../Explore";
import { fakeDB } from "../../../mock-api/fakeDatabase";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

jest.mock("../../../hooks/useAuth", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../mock-api/fakeDatabase", () => ({
  fakeDB: {
    findUser: jest.fn(),
    getUsers: jest.fn(),
    sendFriendRequest: jest.fn(),
  },
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    warn: jest.fn(),
  },
}));

describe("Explore Component", () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: "test-user",
    });

    (fakeDB.findUser as jest.Mock).mockReturnValue({
      name: "test-user",
      friends: ["User One"],
      friendRequests: ["User Three"],
    });

    (fakeDB.getUsers as jest.Mock).mockReturnValue([
      { id: 2, name: "User Two", avatar: "/images/avatar2.png" },
      { id: 3, name: "User Three", avatar: "/images/avatar3.png" },
    ]);
  });

  it("Should display 'Pending' badge for users with pending requests", () => {
    render(<Explore />);

    expect(screen.queryAllByText("Pending").length).toBeGreaterThan(0);
  });

  it("Should call sendFriendRequest when clicking 'Add Friend'", () => {
    render(<Explore />);

    const addFriendButtons = screen.getAllByRole("button", { name: "Add Friend" });
    fireEvent.click(addFriendButtons[0]); // Clica no primeiro botão

    expect(fakeDB.sendFriendRequest).toHaveBeenCalledWith("test-user", "User Two"); // Corrigido aqui
  });

  it("Should show a toast success message when sending a friend request", () => {
    (fakeDB.sendFriendRequest as jest.Mock).mockReturnValue(true);

    render(<Explore />);
    const addFriendButtons = screen.getAllByRole("button", { name: "Add Friend" });
    fireEvent.click(addFriendButtons[0]);

    expect(toast.success).toHaveBeenCalledWith("Friend request sent to User Two! 🎉");
  });

  it("Should show a toast warning message if the friend request is already sent", () => {
    (fakeDB.sendFriendRequest as jest.Mock).mockReturnValue(false);

    render(<Explore />);
    const addFriendButtons = screen.getAllByRole("button", { name: "Add Friend" });
    fireEvent.click(addFriendButtons[0]);

    expect(toast.warn).toHaveBeenCalledWith("You already sent a request to this user.");
  });
});
