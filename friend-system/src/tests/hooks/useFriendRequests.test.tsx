import { renderHook, act, waitFor } from "@testing-library/react";
import useFriendRequests from "../../hooks/useFriendRequests";
import useAuth from "../../hooks/useAuth";
import { fakeDB as actualFakeDB } from "../../mock-api/fakeDatabase";

jest.mock("../../hooks/useAuth.ts", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../mock-api/fakeDatabase.ts", () => ({
  __esModule: true,
  getFriendRequests: jest.fn(),
  findUser: jest.fn(),
  acceptFriendRequest: jest.fn(),
  declineFriendRequest: jest.fn(),
}));

const fakeDB = require("../../mock-api/fakeDatabase");

describe("useFriendRequests Hook", () => {
  const mockUser = "test-user";
  const mockFriend = {
    id: 1,
    name: "Carlos",
    avatar: "/images/1.png",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should initialize with loading=true and an empty request list", async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
    (fakeDB.getFriendRequests as jest.Mock).mockReturnValue([]);

    const { result } = renderHook(() => useFriendRequests());

    await waitFor(() => {
      expect(result.current.requests).toEqual([]);
      expect(result.current.loading).toBe(false);
    });
  });

  it("Should set loading=false if user is null", async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });

    const { result } = renderHook(() => useFriendRequests());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.requests).toEqual([]);
    });
  });

  // it("Should fetch friend requests when user exists", async () => {
  //   (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
  //   (fakeDB.getFriendRequests as jest.Mock).mockReturnValue(["Carlos"]);
  //   (fakeDB.findUser as jest.Mock).mockReturnValue(mockFriend);

  //   const { result } = renderHook(() => useFriendRequests());

  //   await waitFor(() => {
  //     expect(result.current.requests).toEqual([mockFriend]);
  //     expect(result.current.loading).toBe(false);
  //   });
  // });

  // it("Should handle error when fetching friend requests", async () => {
  //   (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
  //   (fakeDB.getFriendRequests as jest.Mock).mockImplementation(() => {
  //     throw new Error("Database error");
  //   });

  //   const { result } = renderHook(() => useFriendRequests());

  //   await waitFor(() => {
  //     expect(result.current.error).toBe("Database error");
  //     expect(result.current.loading).toBe(false);
  //   });
  // });

  // it("Should accept a friend request successfully", async () => {
  //   const mockUpdatePendingRequests = jest.fn();
  //   (useAuth as jest.Mock).mockReturnValue({ user: mockUser, updatePendingRequests: mockUpdatePendingRequests });
  //   (fakeDB.getFriendRequests as jest.Mock).mockReturnValue(["Carlos"]);
  //   (fakeDB.findUser as jest.Mock).mockReturnValue(mockFriend);
  //   (fakeDB.acceptFriendRequest as jest.Mock).mockReturnValue(true);

  //   const { result } = renderHook(() => useFriendRequests());

  //   act(() => {
  //     result.current.acceptRequest("Carlos");
  //   });

  //   await waitFor(() => {
  //     expect(fakeDB.acceptFriendRequest).toHaveBeenCalledWith(mockUser, "Carlos", mockUpdatePendingRequests);
  //     expect(result.current.requests).toEqual([]);
  //   });
  // });

  // it("Should decline a friend request successfully", async () => {
  //   const mockUpdatePendingRequests = jest.fn();
  //   (useAuth as jest.Mock).mockReturnValue({ user: mockUser, updatePendingRequests: mockUpdatePendingRequests });
  //   (fakeDB.getFriendRequests as jest.Mock).mockReturnValue(["Carlos"]);
  //   (fakeDB.findUser as jest.Mock).mockReturnValue(mockFriend);
  //   (fakeDB.declineFriendRequest as jest.Mock).mockReturnValue(true);

  //   const { result } = renderHook(() => useFriendRequests());

  //   act(() => {
  //     result.current.declineRequest("Carlos");
  //   });

  //   await waitFor(() => {
  //     expect(fakeDB.declineFriendRequest).toHaveBeenCalledWith(mockUser, "Carlos", mockUpdatePendingRequests);
  //     expect(mockUpdatePendingRequests).toHaveBeenCalledTimes(1);
  //     expect(result.current.requests).toEqual([]);
  //   });
  // });

  it("Should not accept a request if user is not logged in", async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });

    const { result } = renderHook(() => useFriendRequests());

    act(() => {
      result.current.acceptRequest("Carlos");
    });

    await waitFor(() => {
      expect(fakeDB.acceptFriendRequest).not.toHaveBeenCalled();
    });
  });

  it("Should not decline a request if user is not logged in", async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });

    const { result } = renderHook(() => useFriendRequests());

    act(() => {
      result.current.declineRequest("Carlos");
    });

    await waitFor(() => {
      expect(fakeDB.declineFriendRequest).not.toHaveBeenCalled();
    });
  });
});
