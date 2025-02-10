export interface User {
  id: number;
  name: string;
  friends: string[];
  avatar: string;
  friendRequests: string[];
}

export interface Friend {
  id: number;
  name: string;
  avatar: string;
}

export interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (name: string) => Promise<boolean>;
  logout: () => void;
  pendingRequests: number;
  updatePendingRequests: () => void;
}

export interface SidebarProps {
  activeTab: "friends" | "requests" | "explore";
  setActiveTab: (tab: "friends" | "requests" | "explore") => void;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
