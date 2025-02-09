import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { fakeDB } from "../mock-api/fakeDatabase";
import Button from "./Button";

interface SidebarProps {
  activeTab: "friends" | "requests" | "explore";
  setActiveTab: (tab: "friends" | "requests" | "explore") => void;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ activeTab, setActiveTab, setIsSidebarOpen }: SidebarProps) => {
  const { user, logout, pendingRequests } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setIsSidebarOpen(false);
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
          variant={activeTab === "friends" ? "primary" : "sidebar"}
          onClick={() => setActiveTab("friends")}
        >
          Friends
        </Button>
        <Button
          variant={activeTab === "requests" ? "primary" : "sidebar"}
          onClick={() => setActiveTab("requests")}
          className="relative"
        >
          Requests
          {pendingRequests > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {pendingRequests}
            </span>
          )}
        </Button>
        <Button
          variant={activeTab === "explore" ? "primary" : "sidebar"}
          onClick={() => setActiveTab("explore")}
        >
          Explore
        </Button>
      </nav>

      <div className="mt-auto w-full flex justify-center pb-6">
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
