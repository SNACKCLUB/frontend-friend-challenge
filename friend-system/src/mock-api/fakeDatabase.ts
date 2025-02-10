import { User } from "../types";
import { sanitizeInput } from "../utils/sanitize";

const avatars = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
  "/images/4.png",
  "/images/5.png",
];

const loadUsers = (): User[] => {
  if (typeof window !== "undefined") {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  }
  return [];
};

let users: User[] = loadUsers().length > 0 ? loadUsers() : [
  { id: 1, name: "Carlos", friends: ["Cibele", "Eduardo", "Luisa", "Gabriel"], friendRequests: [], avatar: avatars[1] },
  { id: 2, name: "Cibele", friends: ["Carlos", "Eduardo", "Luisa", "Gabriel"], friendRequests: [], avatar: avatars[0] },
  { id: 3, name: "Eduardo", friends: ["Carlos", "Cibele", "Luisa", "Gabriel"], friendRequests: [], avatar: avatars[2] },
  { id: 4, name: "Luisa", friends: ["Carlos", "Cibele", "Eduardo", "Gabriel"], friendRequests: [], avatar: avatars[4] },
  { id: 5, name: "Gabriel", friends: ["Carlos"], friendRequests: [], avatar: avatars[3] },
];

let nextId = users.length + 1;

export const fakeDB = {
  getUsers: () => users,

  findUser: (name: string) => users.find(user => user.name.toLowerCase() === name.toLowerCase()),

  addUser: (name: string, avatar: string) => {
    const safeName = sanitizeInput(name);
    if (fakeDB.findUser(safeName)) return false;

    const newUser: User = { id: nextId++, name: safeName, friends: [], friendRequests: [], avatar };
    users.push(newUser);

    if (typeof window !== "undefined") {
      localStorage.setItem("users", JSON.stringify(users));
    }

    return true;
  },

  removeFriend: (userName: string, friendId: number) => {
    const user = fakeDB.findUser(userName);
    const friend = users.find(u => u.id === friendId);
  
    if (!user || !friend) return;
  
    user.friends = user.friends.filter(name => name !== friend.name);
    friend.friends = friend.friends.filter(name => name !== user.name);
  
    if (typeof window !== "undefined") {
      localStorage.setItem("users", JSON.stringify(users));
    }
  
    return true;
  },

  getAvatars: () => avatars,

  sendFriendRequest: (from: string, to: string, updatePendingRequests?: () => void) => {
    const safeFrom = sanitizeInput(from);
    const safeTo = sanitizeInput(to);

    const sender = fakeDB.findUser(safeFrom);
    const receiver = fakeDB.findUser(safeTo);
  
    if (!sender || !receiver) return false;
  
    if (!receiver.friendRequests.includes(from)) {
      receiver.friendRequests.push(from);
      
      if (typeof window !== "undefined") {
        localStorage.setItem("users", JSON.stringify(users));
      }
  
      if (updatePendingRequests) updatePendingRequests();
      
      return true;
    }
  
    return false;
  },  

  getFriendRequests: (userName: string) => {
    const user = fakeDB.findUser(userName);
    return user ? user.friendRequests : [];
  },

  acceptFriendRequest: (userName: string, friendName: string, updatePendingRequests: () => void) => {
    const safeUser = sanitizeInput(userName);
    const safeFriend = sanitizeInput(friendName);

    const user = fakeDB.findUser(safeUser);
    const friend = fakeDB.findUser(safeFriend);
  
    if (!user || !friend) return false;
  
    user.friends.push(friend.name);
    friend.friends.push(user.name);
  
    user.friendRequests = user.friendRequests.filter(name => name !== friend.name);
  
    if (typeof window !== "undefined") {
      localStorage.setItem("users", JSON.stringify(users));
    }
  
    updatePendingRequests();
    return true;
  },

  declineFriendRequest: (userName: string, friendName: string, updatePendingRequests: () => void) => {
    const user = fakeDB.findUser(userName);
    
    if (!user) return false;
  
    user.friendRequests = user.friendRequests.filter(name => name !== friendName);
  
    if (typeof window !== "undefined") {
      localStorage.setItem("users", JSON.stringify(users));
    }
  
    updatePendingRequests();
    return true;
  },  
};
