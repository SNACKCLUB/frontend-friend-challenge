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

export interface SidebarProps {
  activeTab: "friends" | "requests" | "explore";
  setActiveTab: (tab: "friends" | "requests" | "explore") => void;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
