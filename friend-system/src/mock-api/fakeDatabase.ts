interface User {
  id: number;
  name: string;
  friends: string[];
}

let users: User[] = [
  { id: 1, name: "Carlos", friends: ["Eduardo", "Luisa"] },
  { id: 2, name: "Eduardo", friends: ["Carlos"] },
  { id: 3, name: "Luisa", friends: ["Carlos"] }
];

let nextId = users.length + 1;

export const fakeDB = {
  getUsers: () => users,
  
  findUser: (name: string) => users.find(user => user.name.toLowerCase() === name.toLowerCase()),

  addUser: (name: string) => {
    if (fakeDB.findUser(name)) return false;
    
    const newUser: User = { id: nextId++, name, friends: [] };
    users.push(newUser);
    
    return true;
  }
};
