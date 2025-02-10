import React from "react";
import { renderHook, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../context/authContext";
import { loginUser } from "../../services/authService";
import { fakeDB } from "../../mock-api/fakeDatabase";
import { ReactNode } from "react";

jest.mock("../../services/authService", () => ({
  loginUser: jest.fn(),
}));

const mockedFakeDB = {
  findUser: jest.fn(),
};

jest.mock("../../mock-api/fakeDatabase", () => mockedFakeDB);

const mockChildren = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe("useAuth Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("Should throw an error if used outside AuthProvider", () => {
    expect(() => renderHook(() => useAuth())).toThrow(
      new Error("useAuth must be used within an AuthProvider")
    );
  });

  it("Should initialize with null user and token", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: mockChildren });

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.pendingRequests).toBe(0);
  });

  // it("Should restore user and token from localStorage", () => {
  //   localStorage.setItem("user", "Carlos");
  //   localStorage.setItem("token", "fake-token");

  //   mockedFakeDB.findUser.mockReturnValue({ friendRequests: ["User1", "User2"] });

  //   const { result } = renderHook(() => useAuth(), { wrapper: mockChildren });

  //   expect(result.current.user).toBe("Carlos");
  //   expect(result.current.token).toBe("fake-token");
  //   expect(result.current.pendingRequests).toBe(2);
  // });

  // it("Should login successfully and update localStorage", async () => {
  //   (loginUser as jest.Mock).mockResolvedValue({ success: true, token: "new-token" });
  //   mockedFakeDB.findUser.mockReturnValue({ friendRequests: ["User1", "User2"] });

  //   const { result } = renderHook(() => useAuth(), { wrapper: mockChildren });

  //   await act(async () => {
  //     const success = await result.current.login("Carlos");
  //     expect(success).toBe(true);
  //   });

  //   expect(result.current.user).toBe("Carlos");
  //   expect(result.current.token).toBe("new-token");
  //   expect(result.current.pendingRequests).toBe(2);
  //   expect(localStorage.getItem("user")).toBe("Carlos");
  //   expect(localStorage.getItem("token")).toBe("new-token");
  // });

  it("Should not login if authentication fails", async () => {
    (loginUser as jest.Mock).mockResolvedValue({ success: false });

    const { result } = renderHook(() => useAuth(), { wrapper: mockChildren });

    await act(async () => {
      const success = await result.current.login("Carlos");
      expect(success).toBe(false);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
  });

  // it("Should logout and clear localStorage", () => {
  //   localStorage.setItem("user", "Carlos");
  //   localStorage.setItem("token", "fake-token");

  //   const { result } = renderHook(() => useAuth(), { wrapper: mockChildren });

  //   act(() => {
  //     result.current.logout();
  //   });

  //   expect(result.current.user).toBeNull();
  //   expect(result.current.token).toBeNull();
  //   expect(result.current.pendingRequests).toBe(0);
  //   expect(localStorage.getItem("user")).toBeNull();
  //   expect(localStorage.getItem("token")).toBeNull();
  // });

  // it("Should update pendingRequests when user changes", () => {
  //   mockedFakeDB.findUser.mockReturnValue({ friendRequests: ["User1", "User2", "User3"] });

  //   const { result } = renderHook(() => useAuth(), { wrapper: mockChildren });

  //   act(() => {
  //     result.current.updatePendingRequests();
  //   });

  //   expect(result.current.pendingRequests).toBe(3);
  // });

  it("Should reset pendingRequests to 0 if user is not found", () => {
    mockedFakeDB.findUser.mockReturnValue(null);

    const { result } = renderHook(() => useAuth(), { wrapper: mockChildren });

    act(() => {
      result.current.updatePendingRequests();
    });

    expect(result.current.pendingRequests).toBe(0);
  });
});
