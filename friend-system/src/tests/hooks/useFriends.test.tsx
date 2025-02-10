import { renderHook, act } from "@testing-library/react";
import useFriends from "../../hooks/useFriends";
import useAuth from "../../hooks/useAuth";
import { fakeDB } from "../../mock-api/fakeDatabase";

jest.mock("../../hooks/useAuth.ts", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../mock-api/fakeDatabase.ts");

describe("useFriends Hook", () => {
  const mockUser = "test-user";
  const mockFriend = {
    id: 1,
    name: "Carlos",
    avatar: "/images/1.png",
    friends: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (fakeDB.findUser as jest.Mock).mockImplementation((user) => {
      if (user === mockUser) {
        return { friends: ["Carlos"] };
      }
      return mockFriend;
    });

    (fakeDB.removeFriend as jest.Mock).mockReturnValue(true);
  });

  it("Should initialize with loading=true and an empty friend list", () => {
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });

    const { result } = renderHook(() => useFriends());

    expect(result.current.friends).toEqual([{ id: 1, name: "Carlos", avatar: "/images/1.png", friends: [] }]);
    expect(result.current.loading).toBe(false);
  });

  it("Should set loading=false if user is null", () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });

    const { result } = renderHook(() => useFriends());

    expect(result.current.loading).toBe(false);
    expect(result.current.friends).toEqual([]);
  });

  it("Should fetch friends when user exists", async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });

    const { result } = renderHook(() => useFriends());

    expect(result.current.friends).toEqual([mockFriend]);
    expect(result.current.loading).toBe(false);
  });

  it("Should handle error when user is not found", async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
    (fakeDB.findUser as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useFriends());

    expect(result.current.error).toBe("User not found");
    expect(result.current.loading).toBe(false);
  });

  it("Should remove a friend successfully", () => {
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });

    const { result } = renderHook(() => useFriends());

    act(() => {
      result.current.removeFriend(1);
    });

    expect(fakeDB.removeFriend).toHaveBeenCalledWith(mockUser, 1);
    expect(result.current.friends).toEqual([]);
  });

  it("Should not remove a friend if operation fails", () => {
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });

    (fakeDB.removeFriend as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() => useFriends());

    act(() => {
      result.current.removeFriend(1);
    });

    expect(result.current.friends).toEqual([{ id: 1, name: "Carlos", avatar: "/images/1.png", friends: [] }]);
  });

  it("Should not remove a friend if user is not logged in", () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });

    const { result } = renderHook(() => useFriends());

    act(() => {
      result.current.removeFriend(1);
    });

    expect(result.current.friends).toEqual([]);
  });
});
