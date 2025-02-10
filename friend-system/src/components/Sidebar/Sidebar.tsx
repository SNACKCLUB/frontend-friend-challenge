import React from "react";
import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";
import { fakeDB } from "../../mock-api/fakeDatabase";
import Button from "../Button";
import Badge from "../Badge";

interface SidebarProps {
  activeTab: "friends" | "requests" | "explore";
  setActiveTab: (tab: "friends" | "requests" | "explore") => void;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TABS = {
  FRIENDS: "friends",
  REQUESTS: "requests",
  EXPLORE: "explore",
} as const;

const Sidebar = ({ activeTab, setActiveTab, setIsSidebarOpen }: SidebarProps) => {
  const { user, logout, pendingRequests, updatePendingRequests } = useAuth();
  const router = useRouter();

  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    logout();
    closeSidebar();
    router.push("/login");
  };

  const loggedUser = user ? fakeDB.findUser(user) : null;

  return (
    <aside className="w-64 bg-[#1A0033] min-h-screen flex flex-col items-center py-6 shadow-lg">
      {loggedUser && (
        <div className="flex flex-col items-center mb-6">
          <img
            src={loggedUser.avatar}
            alt={loggedUser.name}
            className="w-20 h-20 rounded-full border-4 border-[#7D00FF] shadow-lg"
          />
          <p className="mt-2 text-lg font-semibold text-white">{loggedUser.name}</p>
        </div>
      )}

      <nav className="w-full flex flex-col items-center gap-4">
        <Button
          variant={activeTab === TABS.FRIENDS ? "primary" : "sidebar"}
          onClick={() => {
            setActiveTab(TABS.FRIENDS);
            closeSidebar();
          }}
          aria-label="Friends"
        >
          Friends
        </Button>

        <Button
          variant={activeTab === TABS.REQUESTS ? "primary" : "sidebar"}
          onClick={() => {
            setActiveTab(TABS.REQUESTS);
            closeSidebar();
            updatePendingRequests();
          }}
          className="relative"
          aria-label="Requests"
        >
          Requests
          {pendingRequests > 0 && <Badge count={pendingRequests} />}
        </Button>

        <Button
          variant={activeTab === TABS.EXPLORE ? "primary" : "sidebar"}
          onClick={() => {
            setActiveTab(TABS.EXPLORE);
            closeSidebar();
          }}
          aria-label="Explore"
        >
          Explore
        </Button>
      </nav>

      <div className="mt-auto w-full flex justify-center pb-6">
        <Button variant="danger" onClick={handleLogout} aria-label="Logout">
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
