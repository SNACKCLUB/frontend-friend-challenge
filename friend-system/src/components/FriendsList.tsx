import React from "react";
import useFriends from "../hooks/useFriends";
import FriendCard from "./FriendCard";

const FriendsList = () => {
  const { friends, loading, removeFriend } = useFriends();

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center text-[#D6B4FC] mb-6">
        FRIENDS LIST
      </h1>

      {loading ? (
        <p className="text-gray-300 text-center">Loading friends...</p>
      ) : friends.length === 0 ? (
        <p className="text-gray-400 text-center">
          You don’t have any friends yet. <br />
          Start adding new friends in the Explore tab!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
          {friends.map((friend) => (
            <FriendCard
              key={friend.id}
              friend={friend}
              isFriend={true}
              actionType="friend"
              onAction={() => removeFriend(friend.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsList;
