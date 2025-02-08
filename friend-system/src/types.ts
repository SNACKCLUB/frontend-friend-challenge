export interface User {
  id: number;
  name: string;
  friends: string[];
}

export interface Friend {
  id: number;
  name: string;
}

export interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (name: string) => Promise<boolean>;
  logout: () => void;
}
