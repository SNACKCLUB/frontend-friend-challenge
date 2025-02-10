import { fakeDB } from "../../mock-api/fakeDatabase";
import { User } from "../../types";

const initialUsers: User[] = [
  { id: 1, name: "Carlos", friends: ["Cibele", "Eduardo", "Luisa", "Gabriel"], friendRequests: [], avatar: "/images/2.png" },
  { id: 2, name: "Cibele", friends: ["Carlos", "Eduardo", "Luisa", "Gabriel"], friendRequests: [], avatar: "/images/1.png" },
  { id: 3, name: "Eduardo", friends: ["Carlos", "Cibele", "Luisa", "Gabriel"], friendRequests: [], avatar: "/images/3.png" },
  { id: 4, name: "Luisa", friends: ["Carlos", "Cibele", "Eduardo", "Gabriel"], friendRequests: [], avatar: "/images/5.png" },
  { id: 5, name: "Gabriel", friends: ["Carlos"], friendRequests: [], avatar: "/images/4.png" },
];

describe("fakeDB", () => {
  beforeEach(() => {
    localStorage.clear();
    (fakeDB as any).users = JSON.parse(JSON.stringify(initialUsers));
  });

  it("Should retrieve all users", () => {
    const users = fakeDB.getUsers();
    expect(users).toHaveLength(5);
  });

  it("Should find an existing user", () => {
    const user = fakeDB.findUser("Carlos");
    expect(user).toBeDefined();
    expect(user?.name).toBe("Carlos");
  });

  it("Should return undefined for non-existing user", () => {
    const user = fakeDB.findUser("NonExistent");
    expect(user).toBeUndefined();
  });

  it("Should add a new user", () => {
    const success = fakeDB.addUser("NewUser", "/images/new.png");
    expect(success).toBe(true);

    const newUser = fakeDB.findUser("NewUser");
    expect(newUser).toBeDefined();
    expect(newUser?.avatar).toBe("/images/new.png");
  });

  it("Should not add a user with an existing name", () => {
    const success = fakeDB.addUser("Carlos", "/images/new.png");
    expect(success).toBe(false);
  });

  it("Should remove a friend", () => {
    const success = fakeDB.removeFriend("Carlos", 5);
    expect(success).toBe(true);

    const carlos = fakeDB.findUser("Carlos");
    const gabriel = fakeDB.findUser("Gabriel");

    expect(carlos?.friends).not.toContain("Gabriel");
    expect(gabriel?.friends).not.toContain("Carlos");
  });

  it("Should not remove a friend if user does not exist", () => {
    const success = fakeDB.removeFriend("NonExistent", 5);
    expect(success).toBeUndefined();
  });

  it("Should send a friend request", () => {
    const success = fakeDB.sendFriendRequest("Carlos", "Gabriel");
    expect(success).toBe(true);

    const gabriel = fakeDB.findUser("Gabriel");
    expect(gabriel?.friendRequests).toContain("Carlos");
  });

  it("Should not send a duplicate friend request", () => {
    fakeDB.sendFriendRequest("Carlos", "Gabriel");
    const success = fakeDB.sendFriendRequest("Carlos", "Gabriel");
    expect(success).toBe(false);
  });

  it("Should retrieve friend requests", () => {
    fakeDB.sendFriendRequest("Carlos", "Gabriel");
    const requests = fakeDB.getFriendRequests("Gabriel");
    expect(requests).toContain("Carlos");
  });

  it("Should accept a friend request", () => {
    fakeDB.sendFriendRequest("Carlos", "Gabriel");
    const success = fakeDB.acceptFriendRequest("Gabriel", "Carlos", jest.fn());
    expect(success).toBe(true);

    const carlos = fakeDB.findUser("Carlos");
    const gabriel = fakeDB.findUser("Gabriel");

    expect(carlos?.friends).toContain("Gabriel");
    expect(gabriel?.friends).toContain("Carlos");
    expect(gabriel?.friendRequests).not.toContain("Carlos");
  });

  it("Should decline a friend request", () => {
    fakeDB.sendFriendRequest("Carlos", "Gabriel");
    const success = fakeDB.declineFriendRequest("Gabriel", "Carlos", jest.fn());
    expect(success).toBe(true);

    const gabriel = fakeDB.findUser("Gabriel");
    expect(gabriel?.friendRequests).not.toContain("Carlos");
  });
});
