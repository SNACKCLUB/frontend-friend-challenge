import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../hooks/useAuth";
import { User, Friend } from "../types";
import { fakeDB } from "../mock-api/fakeDatabase";
import FriendCard from "./FriendCard";

const Explore = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<Friend[]>([]);
  const [friends, setFriends] = useState<string[]>([]);
  const [pendingRequests, setPendingRequests] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;

    const currentUser = fakeDB.findUser(user);
    if (!currentUser) return;

    setFriends(currentUser.friends);
    setPendingRequests(currentUser.friendRequests);

    const allUsers: User[] = fakeDB
      .getUsers()
      .filter((u) => u.name !== user);

    const formattedUsers: Friend[] = allUsers.map((u) => ({
      id: u.id,
      name: u.name,
      avatar: u.avatar,
    }));

    setUsers(formattedUsers);
  }, [user]);

  const sendFriendRequest = (targetUser: string) => {
    if (!user) return;

    const success = fakeDB.sendFriendRequest(user, targetUser);
    if (success) {
      toast.success(`Friend request sent to ${targetUser}! 🎉`);
      setPendingRequests([...pendingRequests, targetUser]);
    } else {
      toast.warn("You already sent a request to this user.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Explore Users</h2>
      {users.length === 0 ? (
        <p className="text-gray-300">No users available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((u) => (
            <FriendCard
              key={u.id}
              friend={u}
              actionType="explore"
              isFriend={friends.includes(u.name)}
              isPending={pendingRequests.includes(u.name)}
              onAction={() => sendFriendRequest(u.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
