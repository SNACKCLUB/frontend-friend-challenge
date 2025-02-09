import React from "react";
import { Friend } from "../types";
import Button from "./Button";

interface FriendCardProps {
  friend: Friend;
  isFriend?: boolean;
  actionType: "friend" | "request" | "explore";
  onAction: () => void;
  onSecondaryAction?: () => void;
  isPending?: boolean;
}

const FriendCard = ({ friend, isFriend, actionType, onAction, onSecondaryAction, isPending }: FriendCardProps) => {
  return (
    <div className="bg-[#240046] rounded-2xl p-6 shadow-lg text-white flex flex-col items-center gap-4 w-64 relative border-4 border-[#7D00FF] transition-transform hover:scale-105">
      <div className="relative w-full h-48 bg-[#180026] rounded-xl overflow-hidden">
        <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-xl font-semibold mt-3 text-center">{friend.name}</h3>

      {isFriend && (
        <span className="text-sm px-4 py-1 rounded-full font-medium bg-green-600">Friend</span>
      )}

      {actionType === "friend" && isFriend && (
        <Button
          variant="secondary"
          onClick={onAction}
          className="px-4 py-2 text-md rounded-lg w-full"
        >
          Remove
        </Button>
      )}

      {actionType === "request" && (
        <>
          <span className="text-sm px-4 py-1 rounded-full font-medium bg-yellow-600">Pending</span>
          <div className="flex gap-2 w-full">
            <Button
              variant="primary"
              onClick={onAction}
              className="px-4 py-2 text-md rounded-lg flex-1"
            >
              Accept
            </Button>
            <Button
              variant="secondary"
              onClick={onSecondaryAction}
              className="px-4 py-2 text-md rounded-lg flex-1"
            >
              Decline
            </Button>
          </div>
        </>
      )}

      {actionType === "explore" && !isFriend && !isPending && (
        <Button
          variant="primary"
          onClick={onAction}
          className="px-4 py-2 text-md rounded-lg w-full"
        >
          Add Friend
        </Button>
      )}

      {actionType === "explore" && isPending && (
        <span className="text-sm px-4 py-1 rounded-full font-medium bg-yellow-600">Pending</span>
      )}
    </div>
  );
};

export default FriendCard;
