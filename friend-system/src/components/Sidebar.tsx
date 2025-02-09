import useAuth from "../hooks/useAuth";
import { fakeDB } from "../mock-api/fakeDatabase";

interface SidebarProps {
  activeTab: "friends" | "requests" | "explore";
  setActiveTab: (tab: "friends" | "requests" | "explore") => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const { user } = useAuth();
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
        <button
          className={`w-5/6 py-3 rounded-lg text-lg font-semibold transition ${
            activeTab === "friends" ? "bg-[#7D00FF] text-white" : "bg-[#240046] text-gray-300 hover:bg-[#350065]"
          }`}
          onClick={() => setActiveTab("friends")}
        >
          Friends
        </button>
        <button
          className={`w-5/6 py-3 rounded-lg text-lg font-semibold transition ${
            activeTab === "requests" ? "bg-[#7D00FF] text-white" : "bg-[#240046] text-gray-300 hover:bg-[#350065]"
          }`}
          onClick={() => setActiveTab("requests")}
        >
          Requests
        </button>
        <button
          className={`w-5/6 py-3 rounded-lg text-lg font-semibold transition ${
            activeTab === "explore" ? "bg-[#7D00FF] text-white" : "bg-[#240046] text-gray-300 hover:bg-[#350065]"
          }`}
          onClick={() => setActiveTab("explore")}
        >
          Explore
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
