import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { fakeDB } from "../mock-api/fakeDatabase";
import Button from "./Button";
import Badge from "./Badge";

interface SidebarProps {
  activeTab: "friends" | "requests" | "explore";
  setActiveTab: (tab: "friends" | "requests" | "explore") => void;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ activeTab, setActiveTab, setIsSidebarOpen }: SidebarProps) => {
  const { user, logout, pendingRequests, updatePendingRequests } = useAuth();
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
          onClick={() => {
            setActiveTab("friends");
            setIsSidebarOpen(false);
          }}
        >
          Friends
        </Button>

        <Button
          variant={activeTab === "requests" ? "primary" : "sidebar"}
          onClick={() => {
            setActiveTab("requests");
            setIsSidebarOpen(false);
            updatePendingRequests();
          }}
          className="relative"
        >
          Requests
          {pendingRequests > 0 && <Badge count={pendingRequests} />}
        </Button>

        <Button
          variant={activeTab === "explore" ? "primary" : "sidebar"}
          onClick={() => {
            setActiveTab("explore");
            setIsSidebarOpen(false);
          }}
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
