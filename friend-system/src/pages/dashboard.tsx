import React from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import FriendsList from "../components/FriendsList";
import Requests from "../components/Requests";
import Explore from "../components/Explore";
import { FiMenu } from "react-icons/fi";
import Button from "../components/Button";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"friends" | "requests" | "explore">("friends");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <section className="flex h-screen bg-gradient-to-b from-[#1A0033] to-[#0D001A] text-white">
      <aside className="hidden md:block w-64 bg-[#180026] p-6">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} setIsSidebarOpen={setIsSidebarOpen} />
      </aside>

      <Button
        className="md:hidden fixed top-4 left-4 z-50 w-12 h-12 flex items-center justify-center bg-[#7D00FF] text-white rounded-md shadow-lg"
        variant="primary"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FiMenu size={22} />
      </Button>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex">
          <div className="w-64 bg-[#180026] p-6">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} setIsSidebarOpen={setIsSidebarOpen} />
          </div>
          <div className="flex-1" onClick={() => setIsSidebarOpen(false)} />
        </div>
      )}

      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === "friends" && <FriendsList />}
        {activeTab === "requests" && <Requests />}
        {activeTab === "explore" && <Explore />}
      </main>
    </section>
  );
};

export default Dashboard;
