import { User } from "../types";

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
  { id: 1, name: "Carlos", friends: ["Cibele", "Eduardo", "Luisa", "Gabriel"], avatar: avatars[1] },
  { id: 2, name: "Cibele", friends: ["Carlos", "Eduardo", "Luisa", "Gabriel"], avatar: avatars[0] },
  { id: 3, name: "Eduardo", friends: ["Carlos", "Cibele", "Luisa", "Gabriel"], avatar: avatars[2] },
  { id: 4, name: "Luisa", friends: ["Carlos", "Cibele", "Eduardo", "Gabriel"], avatar: avatars[4] },
  { id: 5, name: "Gabriel", friends: ["Carlos"], avatar: avatars[3] },
];

let nextId = users.length + 1;

export const fakeDB = {
  getUsers: () => users,
  
  findUser: (name: string) => users.find(user => user.name.toLowerCase() === name.toLowerCase()),

  addUser: (name: string, avatar: string) => {
    if (fakeDB.findUser(name)) return false;

    const newUser: User = { id: nextId++, name, friends: [], avatar };
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

  getAvatars: () => avatars
};
