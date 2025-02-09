import { SidebarProps } from "../types";
import Button from "./Button";
import { FiMenu } from "react-icons/fi";

const Sidebar = ({ activeTab, setActiveTab, setIsSidebarOpen }: SidebarProps) => {
  return (
    <>
      <div className="w-64 bg-[#180026] p-6 flex flex-col gap-4 min-h-screen md:min-h-full">
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
          }}
        >
          Requests
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
      </div>
    </>
  );
};

export default Sidebar;
