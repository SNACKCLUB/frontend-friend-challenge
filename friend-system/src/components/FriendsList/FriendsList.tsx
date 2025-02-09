import React from "react";
import useFriends from "../../hooks/useFriends";
import FriendCard from "../FriendCard";

const FriendsList = () => {
  const { friends, loading, removeFriend } = useFriends();

  const TITLE = "FRIENDS LIST";
  const LOADING_TEXT = "Loading friends...";
  const EMPTY_FRIENDS_TEXT =
    "You don’t have any friends yet. Start adding new friends in the Explore tab!";

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center text-[#D6B4FC] mb-6">
        {TITLE}
      </h1>

      {loading && (
        <p className="text-gray-300 text-center">{LOADING_TEXT}</p>
      )}

      {!loading && friends.length === 0 && (
        <p className="text-gray-400 text-center">{EMPTY_FRIENDS_TEXT}</p>
      )}

      {!loading && friends.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
          {friends.map((friend) => (
            <FriendCard
              key={friend.id}
              friend={friend}
              isFriend
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
