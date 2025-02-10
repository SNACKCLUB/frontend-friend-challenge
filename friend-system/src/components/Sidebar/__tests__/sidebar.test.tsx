import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../Sidebar";
import useAuth from "../../../hooks/useAuth";
import { useRouter } from "next/router";
import { fakeDB } from "../../../mock-api/fakeDatabase";

jest.mock("../../../hooks/useAuth", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../mock-api/fakeDatabase", () => ({
  fakeDB: {
    findUser: jest.fn().mockReturnValue({
      id: 1,
      name: "Test User",
      avatar: "/images/avatar.png",
    }),
  },
}));

describe("Sidebar Component", () => {
  const mockSetActiveTab = jest.fn();
  const mockSetIsSidebarOpen = jest.fn();
  const mockLogout = jest.fn();
  const mockUpdatePendingRequests = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      user: "test-user",
      logout: mockLogout,
      pendingRequests: 3,
      updatePendingRequests: mockUpdatePendingRequests,
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("Should render user info when logged in", () => {
    render(
      <Sidebar
        activeTab="friends"
        setActiveTab={mockSetActiveTab}
        setIsSidebarOpen={mockSetIsSidebarOpen}
      />
    );

    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  it("Should highlight the active tab", () => {
    render(
      <Sidebar
        activeTab="requests"
        setActiveTab={mockSetActiveTab}
        setIsSidebarOpen={mockSetIsSidebarOpen}
      />
    );

    expect(screen.getByRole("button", { name: "Requests" })).toHaveClass("bg-[#7D00FF]");
  });

  it("Should call setActiveTab and close sidebar when clicking Friends", () => {
    render(
      <Sidebar
        activeTab="requests"
        setActiveTab={mockSetActiveTab}
        setIsSidebarOpen={mockSetIsSidebarOpen}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Friends" }));

    expect(mockSetActiveTab).toHaveBeenCalledWith("friends");
    expect(mockSetIsSidebarOpen).toHaveBeenCalledWith(false);
  });

  it("Should call updatePendingRequests when clicking Requests", () => {
    render(
      <Sidebar
        activeTab="friends"
        setActiveTab={mockSetActiveTab}
        setIsSidebarOpen={mockSetIsSidebarOpen}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Requests" }));

    expect(mockSetActiveTab).toHaveBeenCalledWith("requests");
    expect(mockSetIsSidebarOpen).toHaveBeenCalledWith(false);
    expect(mockUpdatePendingRequests).toHaveBeenCalledTimes(1);
  });

  it("Should display badge when there are pending requests", () => {
    render(
      <Sidebar
        activeTab="requests"
        setActiveTab={mockSetActiveTab}
        setIsSidebarOpen={mockSetIsSidebarOpen}
      />
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("Should call setActiveTab and close sidebar when clicking Explore", () => {
    render(
      <Sidebar
        activeTab="friends"
        setActiveTab={mockSetActiveTab}
        setIsSidebarOpen={mockSetIsSidebarOpen}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Explore" }));

    expect(mockSetActiveTab).toHaveBeenCalledWith("explore");
    expect(mockSetIsSidebarOpen).toHaveBeenCalledWith(false);
  });

  it("Should call logout and redirect when clicking Logout", () => {
    render(
      <Sidebar
        activeTab="friends"
        setActiveTab={mockSetActiveTab}
        setIsSidebarOpen={mockSetIsSidebarOpen}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Logout" }));

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockSetIsSidebarOpen).toHaveBeenCalledWith(false);
    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
